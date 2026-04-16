// // server/src/controllers/promocodeController.js
// import { PromoCode } from '../models/Promocode.js';  // Make sure filename matches exactly
// import { UserPromoUsage } from '../models/UserPromoUsage.js';

// export const promoController = {
//     // Get all promocodes (with filters)
//     async getAllPromoCodes(req, res) {
//         try {
//             const { active, page = 1, limit = 10 } = req.query;
//             const filter = {};
            
//             if (active !== undefined) filter.active = active === 'true';
            
//             const promoCodes = await PromoCode.find(filter)
//                 .sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit);
            
//             const total = await PromoCode.countDocuments(filter);
            
//             res.json({
//                 success: true,
//                 data: promoCodes,
//                 total,
//                 page: parseInt(page),
//                 totalPages: Math.ceil(total / limit)
//             });
//         } catch (error) {
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Get single promo code
//     async getPromoCodeById(req, res) {
//         try {
//             const promoCode = await PromoCode.findById(req.params.id);
//             if (!promoCode) {
//                 return res.status(404).json({ success: false, error: 'Promo code not found' });
//             }
//             res.json({ success: true, data: promoCode });
//         } catch (error) {
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Create new promo code
//     async createPromoCode(req, res) {
//         try {
//             const { code, discountType, discountValue, minOrder, expiryDate, usageLimit, perUserLimit, active } = req.body;
            
//             // Check if code already exists
//             const existingCode = await PromoCode.findOne({ code: code.toUpperCase() });
//             if (existingCode) {
//                 return res.status(400).json({ success: false, error: 'Promo code already exists' });
//             }
            
//             const promoCode = new PromoCode({
//                 code: code.toUpperCase(),
//                 discountType,
//                 discountValue,
//                 minOrder: minOrder || 0,
//                 expiryDate,
//                 usageLimit: usageLimit || 100,
//                 perUserLimit: perUserLimit || 1,
//                 active: active !== undefined ? active : true
//             });
            
//             await promoCode.save();
//             res.status(201).json({ success: true, data: promoCode });
//         } catch (error) {
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Update promo code
//     async updatePromoCode(req, res) {
//         try {
//             const promoCode = await PromoCode.findByIdAndUpdate(
//                 req.params.id,
//                 req.body,
//                 { new: true, runValidators: true }
//             );
            
//             if (!promoCode) {
//                 return res.status(404).json({ success: false, error: 'Promo code not found' });
//             }
            
//             res.json({ success: true, data: promoCode });
//         } catch (error) {
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Delete promo code
//     async deletePromoCode(req, res) {
//         try {
//             const promoCode = await PromoCode.findByIdAndDelete(req.params.id);
//             if (!promoCode) {
//                 return res.status(404).json({ success: false, error: 'Promo code not found' });
//             }
//             res.json({ success: true, message: 'Promo code deleted successfully' });
//         } catch (error) {
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Validate and apply promo code (for frontend)
//     async validatePromoCode(req, res) {
//         try {
//             const { code, cartTotal, userId } = req.body;
            
//             // Find promo code
//             const promoCode = await PromoCode.findOne({ 
//                 code: code.toUpperCase(),
//                 active: true
//             });
            
//             if (!promoCode) {
//                 return res.status(400).json({ 
//                     success: false, 
//                     error: 'Invalid promo code' 
//                 });
//             }
            
//             // Check expiry
//             if (new Date() > promoCode.expiryDate) {
//                 return res.status(400).json({ 
//                     success: false, 
//                     error: 'Promo code has expired' 
//                 });
//             }
            
//             // Check usage limit
//             if (promoCode.usedCount >= promoCode.usageLimit) {
//                 return res.status(400).json({ 
//                     success: false, 
//                     error: 'Promo code usage limit reached' 
//                 });
//             }
            
//             // Check user usage limit (if UserPromoUsage model exists)
//             if (userId && UserPromoUsage) {
//                 const userUsage = await UserPromoUsage.countDocuments({
//                     userId,
//                     promoCodeId: promoCode._id
//                 });
                
//                 if (userUsage >= promoCode.perUserLimit) {
//                     return res.status(400).json({ 
//                         success: false, 
//                         error: `You have already used this promo code ${promoCode.perUserLimit} time(s)` 
//                     });
//                 }
//             }
            
//             // Check minimum order
//             if (cartTotal < promoCode.minOrder) {
//                 return res.status(400).json({ 
//                     success: false, 
//                     error: `Minimum order amount of ₹${promoCode.minOrder} required` 
//                 });
//             }
            
//             // Calculate discount
//             const discount = promoCode.calculateDiscount(cartTotal);
            
//             res.json({
//                 success: true,
//                 data: {
//                     promoCode,
//                     discount,
//                     finalTotal: cartTotal - discount
//                 }
//             });
//         } catch (error) {
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Apply promo to order (during checkout)
//     async applyPromoToOrder(req, res) {
//         try {
//             const { promoCodeId, userId, orderId, cartTotal } = req.body;
            
//             const promoCode = await PromoCode.findById(promoCodeId);
//             if (!promoCode || !promoCode.isValid) {
//                 return res.status(400).json({ success: false, error: 'Invalid promo code' });
//             }
            
//             const discount = promoCode.calculateDiscount(cartTotal);
            
//             // Increment usage count
//             promoCode.usedCount += 1;
//             await promoCode.save();
            
//             // Record user usage (if UserPromoUsage model exists)
//             if (UserPromoUsage && userId) {
//                 const userUsage = new UserPromoUsage({
//                     userId,
//                     promoCodeId,
//                     orderId,
//                     discountAmount: discount
//                 });
//                 await userUsage.save();
//             }
            
//             res.json({
//                 success: true,
//                 data: { discount, promoCode }
//             });
//         } catch (error) {
//             res.status(500).json({ success: false, error: error.message });
//         }
//     }
// };






// // server/src/controllers/promocodeController.js
// import { PromoCode } from '../models/Promocode.js';
// import { UserPromoUsage } from '../models/UserPromoUsage.js';

// export const promoController = {
//     // Get all promocodes (with filters)
//     async getAllPromoCodes(req, res) {
//         try {
//             const { active, page = 1, limit = 10 } = req.query;
//             const filter = {};
            
//             if (active !== undefined) filter.active = active === 'true';
            
//             const promoCodes = await PromoCode.find(filter)
//                 .sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit);
            
//             const total = await PromoCode.countDocuments(filter);
            
//             res.json({
//                 success: true,
//                 data: promoCodes,
//                 total,
//                 page: parseInt(page),
//                 totalPages: Math.ceil(total / limit)
//             });
//         } catch (error) {
//             console.error('Get all promocodes error:', error);
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Get single promo code
//     async getPromoCodeById(req, res) {
//         try {
//             const promoCode = await PromoCode.findById(req.params.id);
//             if (!promoCode) {
//                 return res.status(404).json({ success: false, error: 'Promo code not found' });
//             }
//             res.json({ success: true, data: promoCode });
//         } catch (error) {
//             console.error('Get promo by ID error:', error);
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Create new promo code
//     async createPromoCode(req, res) {
//         try {
//             const { code, discountType, discountValue, minOrder, expiryDate, usageLimit, perUserLimit, active } = req.body;
            
//             // Check if code already exists
//             const existingCode = await PromoCode.findOne({ code: code.toUpperCase() });
//             if (existingCode) {
//                 return res.status(400).json({ success: false, error: 'Promo code already exists' });
//             }
            
//             const promoCode = new PromoCode({
//                 code: code.toUpperCase(),
//                 discountType,
//                 discountValue,
//                 minOrder: minOrder || 0,
//                 expiryDate,
//                 usageLimit: usageLimit || 100,
//                 perUserLimit: perUserLimit || 1,
//                 active: active !== undefined ? active : true
//             });
            
//             await promoCode.save();
//             res.status(201).json({ success: true, data: promoCode });
//         } catch (error) {
//             console.error('Create promo code error:', error);
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
    
//     // Update promo code
//     async updatePromoCode(req, res) {
//         try {
//             const promoCode = await PromoCode.findByIdAndUpdate(
//                 req.params.id,
//                 req.body,
//                 { new: true, runValidators: true }
//             );
            
//             if (!promoCode) {
//                 return res.status(404).json({ success: false, error: 'Promo code not found' });
//             }
            
//             res.json({ success: true, data: promoCode });
//         } catch (error) {
//             console.error('Update promo code error:', error);
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Delete promo code
//     async deletePromoCode(req, res) {
//         try {
//             const promoCode = await PromoCode.findByIdAndDelete(req.params.id);
//             if (!promoCode) {
//                 return res.status(404).json({ success: false, error: 'Promo code not found' });
//             }
//             res.json({ success: true, message: 'Promo code deleted successfully' });
//         } catch (error) {
//             console.error('Delete promo code error:', error);
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Validate and apply promo code (for frontend)
//     async validatePromoCode(req, res) {
//         try {
//             const { code, cartTotal, userId } = req.body;
            
//             console.log('=== Validating Promo Code ===');
//             console.log('Code:', code);
//             console.log('Cart Total:', cartTotal);
            
//             // Find promo code
//             const promoCode = await PromoCode.findOne({ 
//                 code: code.toUpperCase(),
//                 active: true
//             });
            
//             if (!promoCode) {
//                 console.log('Promo code not found:', code);
//                 return res.status(400).json({ 
//                     success: false, 
//                     error: 'Invalid promo code' 
//                 });
//             }
            
//             console.log('Found promo code:', promoCode.code);
            
//             // Check expiry
//             const now = new Date();
//             if (now > promoCode.expiryDate) {
//                 console.log('Promo expired');
//                 return res.status(400).json({ 
//                     success: false, 
//                     error: 'Promo code has expired' 
//                 });
//             }
            
//             // Check usage limit
//             if (promoCode.usedCount >= promoCode.usageLimit) {
//                 console.log('Usage limit reached');
//                 return res.status(400).json({ 
//                     success: false, 
//                     error: 'Promo code usage limit reached' 
//                 });
//             }
            
//             // Check user usage limit
//             if (userId && UserPromoUsage) {
//                 const userUsage = await UserPromoUsage.countDocuments({
//                     userId,
//                     promoCodeId: promoCode._id
//                 });
                
//                 if (userUsage >= promoCode.perUserLimit) {
//                     return res.status(400).json({ 
//                         success: false, 
//                         error: `You have already used this promo code ${promoCode.perUserLimit} time(s)` 
//                     });
//                 }
//             }
            
//             // Check minimum order
//             if (cartTotal < promoCode.minOrder) {
//                 return res.status(400).json({ 
//                     success: false, 
//                     error: `Minimum order amount of ₹${promoCode.minOrder} required` 
//                 });
//             }
            
//             // Calculate discount using the model's method
//             const discount = promoCode.calculateDiscount(cartTotal);
//             console.log('Discount calculated:', discount);
            
//             res.json({
//                 success: true,
//                 data: {
//                     promoCode: {
//                         _id: promoCode._id,
//                         code: promoCode.code,
//                         discountType: promoCode.discountType,
//                         discountValue: promoCode.discountValue,
//                         minOrder: promoCode.minOrder
//                     },
//                     discount,
//                     finalTotal: cartTotal - discount
//                 }
//             });
//         } catch (error) {
//             console.error('Validate promo code error:', error);
//             res.status(500).json({ 
//                 success: false, 
//                 error: error.message 
//             });
//         }
//     },

    
    
//     // Apply promo to order (during checkout)
//     async applyPromoToOrder(req, res) {
//         try {
//             const { promoCodeId, userId, orderId, cartTotal } = req.body;
            
//             const promoCode = await PromoCode.findById(promoCodeId);
//             if (!promoCode || !promoCode.isValid) {
//                 return res.status(400).json({ success: false, error: 'Invalid promo code' });
//             }
            
//             const discount = promoCode.calculateDiscount(cartTotal);
            
//             // Increment usage count
//             promoCode.usedCount += 1;
//             await promoCode.save();
            
//             // Record user usage
//             if (UserPromoUsage && userId && orderId) {
//                 const userUsage = new UserPromoUsage({
//                     userId,
//                     promoCodeId,
//                     orderId,
//                     discountAmount: discount
//                 });
//                 await userUsage.save();
//             }
            
//             res.json({
//                 success: true,
//                 data: { discount, promoCode }
//             });
//         } catch (error) {
//             console.error('Apply promo to order error:', error);
//             res.status(500).json({ success: false, error: error.message });
//         }
//     }
// };













// // server/src/controllers/promocodeController.js
// import { PromoCode } from '../models/Promocode.js';
// import { UserPromoUsage } from '../models/UserPromoUsage.js';

// export const promoController = {
//     // Get all promocodes (with filters) - Admin only
//     async getAllPromoCodes(req, res) {
//         try {
//             const { active, page = 1, limit = 10 } = req.query;
//             const filter = {};
            
//             if (active !== undefined) filter.active = active === 'true';
            
//             const promoCodes = await PromoCode.find(filter)
//                 .sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit);
            
//             const total = await PromoCode.countDocuments(filter);
            
//             res.json({
//                 success: true,
//                 data: promoCodes,
//                 total,
//                 page: parseInt(page),
//                 totalPages: Math.ceil(total / limit)
//             });
//         } catch (error) {
//             console.error('Get all promocodes error:', error);
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Get active promo codes - Public (no auth required)
//     async getActivePromoCodes(req, res) {
//         try {
//             const now = new Date();
            
//             console.log('Fetching active promo codes...');
            
//             // Find all active and not expired promo codes
//             const promoCodes = await PromoCode.find({
//                 active: true,
//                 expiryDate: { $gt: now }
//             }).sort({ createdAt: -1 });
            
//             // Filter out fully used ones
//             const validPromos = promoCodes.filter(promo => promo.usedCount < promo.usageLimit);
            
//             console.log(`Found ${validPromos.length} active promo codes`);
            
//             // Remove sensitive info and format for frontend
//             const sanitizedPromos = validPromos.map(promo => ({
//                 _id: promo._id,
//                 code: promo.code,
//                 discountType: promo.discountType,
//                 discountValue: promo.discountValue,
//                 minOrder: promo.minOrder,
//                 expiryDate: promo.expiryDate,
//                 usageLimit: promo.usageLimit,
//                 usedCount: promo.usedCount,
//                 perUserLimit: promo.perUserLimit,
//                 active: promo.active
//             }));
            
//             res.json({
//                 success: true,
//                 data: sanitizedPromos,
//                 count: sanitizedPromos.length
//             });
//         } catch (error) {
//             console.error('Get active promocodes error:', error);
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Get single promo code
//     async getPromoCodeById(req, res) {
//         try {
//             const promoCode = await PromoCode.findById(req.params.id);
//             if (!promoCode) {
//                 return res.status(404).json({ success: false, error: 'Promo code not found' });
//             }
//             res.json({ success: true, data: promoCode });
//         } catch (error) {
//             console.error('Get promo by ID error:', error);
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Create new promo code
//     async createPromoCode(req, res) {
//         try {
//             const { code, discountType, discountValue, minOrder, expiryDate, usageLimit, perUserLimit, active } = req.body;
            
//             // Check if code already exists
//             const existingCode = await PromoCode.findOne({ code: code.toUpperCase() });
//             if (existingCode) {
//                 return res.status(400).json({ success: false, error: 'Promo code already exists' });
//             }
            
//             const promoCode = new PromoCode({
//                 code: code.toUpperCase(),
//                 discountType,
//                 discountValue,
//                 minOrder: minOrder || 0,
//                 expiryDate,
//                 usageLimit: usageLimit || 100,
//                 perUserLimit: perUserLimit || 1,
//                 active: active !== undefined ? active : true
//             });
            
//             await promoCode.save();
//             res.status(201).json({ success: true, data: promoCode });
//         } catch (error) {
//             console.error('Create promo code error:', error);
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Update promo code
//     async updatePromoCode(req, res) {
//         try {
//             const promoCode = await PromoCode.findByIdAndUpdate(
//                 req.params.id,
//                 req.body,
//                 { new: true, runValidators: true }
//             );
            
//             if (!promoCode) {
//                 return res.status(404).json({ success: false, error: 'Promo code not found' });
//             }
            
//             res.json({ success: true, data: promoCode });
//         } catch (error) {
//             console.error('Update promo code error:', error);
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Delete promo code
//     async deletePromoCode(req, res) {
//         try {
//             const promoCode = await PromoCode.findByIdAndDelete(req.params.id);
//             if (!promoCode) {
//                 return res.status(404).json({ success: false, error: 'Promo code not found' });
//             }
//             res.json({ success: true, message: 'Promo code deleted successfully' });
//         } catch (error) {
//             console.error('Delete promo code error:', error);
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Validate and apply promo code (for frontend)
//     async validatePromoCode(req, res) {
//         try {
//             const { code, cartTotal, userId } = req.body;
            
//             console.log('=== Validating Promo Code ===');
//             console.log('Code:', code);
//             console.log('Cart Total:', cartTotal);
            
//             // Find promo code
//             const promoCode = await PromoCode.findOne({ 
//                 code: code.toUpperCase(),
//                 active: true
//             });
            
//             if (!promoCode) {
//                 console.log('Promo code not found:', code);
//                 return res.status(400).json({ 
//                     success: false, 
//                     error: 'Invalid promo code' 
//                 });
//             }
            
//             console.log('Found promo code:', promoCode.code);
            
//             // Check expiry
//             const now = new Date();
//             if (now > promoCode.expiryDate) {
//                 console.log('Promo expired');
//                 return res.status(400).json({ 
//                     success: false, 
//                     error: 'Promo code has expired' 
//                 });
//             }
            
//             // Check usage limit
//             if (promoCode.usedCount >= promoCode.usageLimit) {
//                 console.log('Usage limit reached');
//                 return res.status(400).json({ 
//                     success: false, 
//                     error: 'Promo code usage limit reached' 
//                 });
//             }
            
//             // Check user usage limit
//             if (userId && UserPromoUsage) {
//                 const userUsage = await UserPromoUsage.countDocuments({
//                     userId,
//                     promoCodeId: promoCode._id
//                 });
                
//                 if (userUsage >= promoCode.perUserLimit) {
//                     return res.status(400).json({ 
//                         success: false, 
//                         error: `You have already used this promo code ${promoCode.perUserLimit} time(s)` 
//                     });
//                 }
//             }
            
//             // Check minimum order
//             if (cartTotal < promoCode.minOrder) {
//                 return res.status(400).json({ 
//                     success: false, 
//                     error: `Minimum order amount of ₹${promoCode.minOrder} required` 
//                 });
//             }
            
//             // Calculate discount using the model's method
//             const discount = promoCode.calculateDiscount(cartTotal);
//             console.log('Discount calculated:', discount);
            
//             res.json({
//                 success: true,
//                 data: {
//                     promoCode: {
//                         _id: promoCode._id,
//                         code: promoCode.code,
//                         discountType: promoCode.discountType,
//                         discountValue: promoCode.discountValue,
//                         minOrder: promoCode.minOrder
//                     },
//                     discount,
//                     finalTotal: cartTotal - discount
//                 }
//             });
//         } catch (error) {
//             console.error('Validate promo code error:', error);
//             res.status(500).json({ 
//                 success: false, 
//                 error: error.message 
//             });
//         }
//     },

//     // Apply promo to order (during checkout)
//     async applyPromoToOrder(req, res) {
//         try {
//             const { promoCodeId, userId, orderId, cartTotal } = req.body;
            
//             const promoCode = await PromoCode.findById(promoCodeId);
//             if (!promoCode || !promoCode.isValid) {
//                 return res.status(400).json({ success: false, error: 'Invalid promo code' });
//             }
            
//             const discount = promoCode.calculateDiscount(cartTotal);
            
//             // Increment usage count
//             promoCode.usedCount += 1;
//             await promoCode.save();
            
//             // Record user usage
//             if (UserPromoUsage && userId && orderId) {
//                 const userUsage = new UserPromoUsage({
//                     userId,
//                     promoCodeId,
//                     orderId,
//                     discountAmount: discount
//                 });
//                 await userUsage.save();
//             }
            
//             res.json({
//                 success: true,
//                 data: { discount, promoCode }
//             });
//         } catch (error) {
//             console.error('Apply promo to order error:', error);
//             res.status(500).json({ success: false, error: error.message });
//         }
//     }
// };







import { PromoCode } from '../models/Promocode.js';
import { UserPromoUsage } from '../models/UserPromoUsage.js';

export const promoController = {
  // Get all promocodes (admin only)
  async getAllPromoCodes(req, res) {
    try {
      const { active, page = 1, limit = 10 } = req.query;
      const filter = {};
      if (active !== undefined) filter.active = active === 'true';

      const promoCodes = await PromoCode.find(filter)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await PromoCode.countDocuments(filter);

      res.json({
        success: true,
        data: promoCodes,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / limit)
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get active promo codes (public, with optional userId filtering)
  async getActivePromoCodes(req, res) {
    try {
      const now = new Date();
      const { userId } = req.query;

      let promoCodes = await PromoCode.find({
        active: true,
        expiryDate: { $gt: now }
      }).sort({ createdAt: -1 });

      // Remove globally used up codes
      promoCodes = promoCodes.filter(p => p.usedCount < p.usageLimit);

      // If userId provided, filter out codes where user has reached perUserLimit
      if (userId) {
        const userUsages = await UserPromoUsage.find({ userId });
        const usageMap = new Map();
        userUsages.forEach(usage => {
          const id = usage.promoCodeId.toString();
          usageMap.set(id, (usageMap.get(id) || 0) + 1);
        });
        promoCodes = promoCodes.filter(promo => {
          const used = usageMap.get(promo._id.toString()) || 0;
          return used < promo.perUserLimit;
        });
      }

      const sanitized = promoCodes.map(p => ({
        _id: p._id,
        code: p.code,
        discountType: p.discountType,
        discountValue: p.discountValue,
        minOrder: p.minOrder,
        expiryDate: p.expiryDate,
        usageLimit: p.usageLimit,
        usedCount: p.usedCount,
        perUserLimit: p.perUserLimit,
        active: p.active
      }));

      res.json({ success: true, data: sanitized, count: sanitized.length });
    } catch (error) {
      console.error('Get active promocodes error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get single promo by ID (admin)
  async getPromoCodeById(req, res) {
    try {
      const promo = await PromoCode.findById(req.params.id);
      if (!promo) return res.status(404).json({ success: false, error: 'Not found' });
      res.json({ success: true, data: promo });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Create new promo code (admin)
  async createPromoCode(req, res) {
    try {
      const { code, discountType, discountValue, minOrder, expiryDate, usageLimit, perUserLimit, active } = req.body;

      const existing = await PromoCode.findOne({ code: code.toUpperCase() });
      if (existing) return res.status(400).json({ success: false, error: 'Code already exists' });

      const promo = new PromoCode({
        code: code.toUpperCase(),
        discountType,
        discountValue,
        minOrder: minOrder || 0,
        expiryDate,
        usageLimit: usageLimit || 100,
        perUserLimit: perUserLimit || 1,
        active: active !== undefined ? active : true
      });

      await promo.save();
      res.status(201).json({ success: true, data: promo });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update promo code (admin)
  async updatePromoCode(req, res) {
    try {
      const promo = await PromoCode.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!promo) return res.status(404).json({ success: false, error: 'Not found' });
      res.json({ success: true, data: promo });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete promo code (admin)
  async deletePromoCode(req, res) {
    try {
      const promo = await PromoCode.findByIdAndDelete(req.params.id);
      if (!promo) return res.status(404).json({ success: false, error: 'Not found' });
      res.json({ success: true, message: 'Deleted' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Validate promo code (before applying)
  async validatePromoCode(req, res) {
    try {
      const { code, cartTotal, userId } = req.body;

      const promoCode = await PromoCode.findOne({
        code: code.toUpperCase(),
        active: true
      });

      if (!promoCode) {
        return res.status(400).json({ success: false, error: 'Invalid promo code' });
      }

      const now = new Date();
      if (now > promoCode.expiryDate) {
        return res.status(400).json({ success: false, error: 'Promo code expired' });
      }

      if (promoCode.usedCount >= promoCode.usageLimit) {
        return res.status(400).json({ success: false, error: 'Usage limit reached' });
      }

      if (userId) {
        const userUsageCount = await UserPromoUsage.countDocuments({
          userId,
          promoCodeId: promoCode._id
        });
        if (userUsageCount >= promoCode.perUserLimit) {
          return res.status(400).json({
            success: false,
            error: `You have already used this promo code ${promoCode.perUserLimit} time(s)`
          });
        }
      }

      if (cartTotal < promoCode.minOrder) {
        return res.status(400).json({
          success: false,
          error: `Minimum order amount of ₹${promoCode.minOrder} required`
        });
      }

      const discount = promoCode.calculateDiscount(cartTotal);

      res.json({
        success: true,
        data: {
          promoCode: {
            _id: promoCode._id,
            code: promoCode.code,
            discountType: promoCode.discountType,
            discountValue: promoCode.discountValue,
            minOrder: promoCode.minOrder
          },
          discount,
          finalTotal: cartTotal - discount
        }
      });
    } catch (error) {
      console.error('Validate promo error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Apply promo to order (after payment success)
  async applyPromoToOrder(req, res) {
    try {
      const { promoCodeId, userId, orderId, cartTotal } = req.body;

      const promoCode = await PromoCode.findById(promoCodeId);
      if (!promoCode || !promoCode.active || promoCode.expiryDate < new Date()) {
        return res.status(400).json({ success: false, error: 'Invalid promo code' });
      }

      if (promoCode.usedCount >= promoCode.usageLimit) {
        return res.status(400).json({ success: false, error: 'Usage limit reached' });
      }

      // Check per‑user limit again
      const userUsageCount = await UserPromoUsage.countDocuments({ userId, promoCodeId });
      if (userUsageCount >= promoCode.perUserLimit) {
        return res.status(400).json({ success: false, error: 'You have reached your personal limit for this code' });
      }

      const discount = promoCode.calculateDiscount(cartTotal);

      // Increment global counter
      promoCode.usedCount += 1;
      await promoCode.save();

      // Record user usage
      const userUsage = new UserPromoUsage({
        userId,
        promoCodeId,
        orderId,
        discountAmount: discount
      });
      await userUsage.save();

      res.json({
        success: true,
        data: { discount, promoCode }
      });
    } catch (error) {
      console.error('Apply promo error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

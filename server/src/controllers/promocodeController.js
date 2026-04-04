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








// server/src/controllers/promocodeController.js
import { PromoCode } from '../models/Promocode.js';
import { UserPromoUsage } from '../models/UserPromoUsage.js';

export const promoController = {
    // Get all promocodes (with filters) - Admin only
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
            console.error('Get all promocodes error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Get active promo codes - Public (no auth required)
    async getActivePromoCodes(req, res) {
        try {
            const now = new Date();
            
            console.log('Fetching active promo codes...');
            
            // Find all active and not expired promo codes
            const promoCodes = await PromoCode.find({
                active: true,
                expiryDate: { $gt: now }
            }).sort({ createdAt: -1 });
            
            // Filter out fully used ones
            const validPromos = promoCodes.filter(promo => promo.usedCount < promo.usageLimit);
            
            console.log(`Found ${validPromos.length} active promo codes`);
            
            // Remove sensitive info and format for frontend
            const sanitizedPromos = validPromos.map(promo => ({
                _id: promo._id,
                code: promo.code,
                discountType: promo.discountType,
                discountValue: promo.discountValue,
                minOrder: promo.minOrder,
                expiryDate: promo.expiryDate,
                usageLimit: promo.usageLimit,
                usedCount: promo.usedCount,
                perUserLimit: promo.perUserLimit,
                active: promo.active
            }));
            
            res.json({
                success: true,
                data: sanitizedPromos,
                count: sanitizedPromos.length
            });
        } catch (error) {
            console.error('Get active promocodes error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Get single promo code
    async getPromoCodeById(req, res) {
        try {
            const promoCode = await PromoCode.findById(req.params.id);
            if (!promoCode) {
                return res.status(404).json({ success: false, error: 'Promo code not found' });
            }
            res.json({ success: true, data: promoCode });
        } catch (error) {
            console.error('Get promo by ID error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Create new promo code
    async createPromoCode(req, res) {
        try {
            const { code, discountType, discountValue, minOrder, expiryDate, usageLimit, perUserLimit, active } = req.body;
            
            // Check if code already exists
            const existingCode = await PromoCode.findOne({ code: code.toUpperCase() });
            if (existingCode) {
                return res.status(400).json({ success: false, error: 'Promo code already exists' });
            }
            
            const promoCode = new PromoCode({
                code: code.toUpperCase(),
                discountType,
                discountValue,
                minOrder: minOrder || 0,
                expiryDate,
                usageLimit: usageLimit || 100,
                perUserLimit: perUserLimit || 1,
                active: active !== undefined ? active : true
            });
            
            await promoCode.save();
            res.status(201).json({ success: true, data: promoCode });
        } catch (error) {
            console.error('Create promo code error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Update promo code
    async updatePromoCode(req, res) {
        try {
            const promoCode = await PromoCode.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            
            if (!promoCode) {
                return res.status(404).json({ success: false, error: 'Promo code not found' });
            }
            
            res.json({ success: true, data: promoCode });
        } catch (error) {
            console.error('Update promo code error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Delete promo code
    async deletePromoCode(req, res) {
        try {
            const promoCode = await PromoCode.findByIdAndDelete(req.params.id);
            if (!promoCode) {
                return res.status(404).json({ success: false, error: 'Promo code not found' });
            }
            res.json({ success: true, message: 'Promo code deleted successfully' });
        } catch (error) {
            console.error('Delete promo code error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Validate and apply promo code (for frontend)
    async validatePromoCode(req, res) {
        try {
            const { code, cartTotal, userId } = req.body;
            
            console.log('=== Validating Promo Code ===');
            console.log('Code:', code);
            console.log('Cart Total:', cartTotal);
            
            // Find promo code
            const promoCode = await PromoCode.findOne({ 
                code: code.toUpperCase(),
                active: true
            });
            
            if (!promoCode) {
                console.log('Promo code not found:', code);
                return res.status(400).json({ 
                    success: false, 
                    error: 'Invalid promo code' 
                });
            }
            
            console.log('Found promo code:', promoCode.code);
            
            // Check expiry
            const now = new Date();
            if (now > promoCode.expiryDate) {
                console.log('Promo expired');
                return res.status(400).json({ 
                    success: false, 
                    error: 'Promo code has expired' 
                });
            }
            
            // Check usage limit
            if (promoCode.usedCount >= promoCode.usageLimit) {
                console.log('Usage limit reached');
                return res.status(400).json({ 
                    success: false, 
                    error: 'Promo code usage limit reached' 
                });
            }
            
            // Check user usage limit
            if (userId && UserPromoUsage) {
                const userUsage = await UserPromoUsage.countDocuments({
                    userId,
                    promoCodeId: promoCode._id
                });
                
                if (userUsage >= promoCode.perUserLimit) {
                    return res.status(400).json({ 
                        success: false, 
                        error: `You have already used this promo code ${promoCode.perUserLimit} time(s)` 
                    });
                }
            }
            
            // Check minimum order
            if (cartTotal < promoCode.minOrder) {
                return res.status(400).json({ 
                    success: false, 
                    error: `Minimum order amount of ₹${promoCode.minOrder} required` 
                });
            }
            
            // Calculate discount using the model's method
            const discount = promoCode.calculateDiscount(cartTotal);
            console.log('Discount calculated:', discount);
            
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
            console.error('Validate promo code error:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    },

    // Apply promo to order (during checkout)
    async applyPromoToOrder(req, res) {
        try {
            const { promoCodeId, userId, orderId, cartTotal } = req.body;
            
            const promoCode = await PromoCode.findById(promoCodeId);
            if (!promoCode || !promoCode.isValid) {
                return res.status(400).json({ success: false, error: 'Invalid promo code' });
            }
            
            const discount = promoCode.calculateDiscount(cartTotal);
            
            // Increment usage count
            promoCode.usedCount += 1;
            await promoCode.save();
            
            // Record user usage
            if (UserPromoUsage && userId && orderId) {
                const userUsage = new UserPromoUsage({
                    userId,
                    promoCodeId,
                    orderId,
                    discountAmount: discount
                });
                await userUsage.save();
            }
            
            res.json({
                success: true,
                data: { discount, promoCode }
            });
        } catch (error) {
            console.error('Apply promo to order error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
};
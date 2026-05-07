// import { Offer } from '../models/Offer.js';

// export const offerController = {
//     // Get all offers
//     async getAllOffers(req, res) {
//         try {
//             const { active, page = 1, limit = 10 } = req.query;
//             const filter = {};
            
//             if (active !== undefined) filter.active = active === 'true';
            
//             const offers = await Offer.find(filter)
//                 .sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit);
            
//             const total = await Offer.countDocuments(filter);
            
//             res.json({
//                 success: true,
//                 data: offers,
//                 total,
//                 page: parseInt(page),
//                 totalPages: Math.ceil(total / limit)
//             });
//         } catch (error) {
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Get active offers (for frontend display)
//     async getActiveOffers(req, res) {
//         try {
//             const now = new Date();
//             const offers = await Offer.find({
//                 active: true,
//                 startDate: { $lte: now },
//                 endDate: { $gte: now }
//             }).sort({ createdAt: -1 });
            
//             res.json({ success: true, data: offers });
//         } catch (error) {
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Get single offer
//     async getOfferById(req, res) {
//         try {
//             const offer = await Offer.findById(req.params.id);
//             if (!offer) {
//                 return res.status(404).json({ success: false, error: 'Offer not found' });
//             }
//             res.json({ success: true, data: offer });
//         } catch (error) {
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Create new offer
//     async createOffer(req, res) {
//         try {
//             const { title, description, discountType, discountValue, appliesTo, startDate, endDate, minPurchase, maxDiscount, active } = req.body;
            
//             const offer = new Offer({
//                 title,
//                 description,
//                 discountType,
//                 discountValue,
//                 appliesTo,
//                 startDate,
//                 endDate,
//                 minPurchase: minPurchase || 0,
//                 maxDiscount: maxDiscount || null,
//                 active: active !== undefined ? active : true
//             });
            
//             await offer.save();
//             res.status(201).json({ success: true, data: offer });
//         } catch (error) {
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Update offer
//     async updateOffer(req, res) {
//         try {
//             const offer = await Offer.findByIdAndUpdate(
//                 req.params.id,
//                 req.body,
//                 { new: true, runValidators: true }
//             );
            
//             if (!offer) {
//                 return res.status(404).json({ success: false, error: 'Offer not found' });
//             }
            
//             res.json({ success: true, data: offer });
//         } catch (error) {
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Delete offer
//     async deleteOffer(req, res) {
//         try {
//             const offer = await Offer.findByIdAndDelete(req.params.id);
//             if (!offer) {
//                 return res.status(404).json({ success: false, error: 'Offer not found' });
//             }
//             res.json({ success: true, message: 'Offer deleted successfully' });
//         } catch (error) {
//             res.status(500).json({ success: false, error: error.message });
//         }
//     },
    
//     // Validate offer for cart (for frontend)
//     async validateOffer(req, res) {
//         try {
//             const { offerId, cartTotal, userType, cartItems } = req.body;
            
//             const offer = await Offer.findById(offerId);
//             if (!offer || !offer.isCurrentlyActive) {
//                 return res.status(400).json({ 
//                     success: false, 
//                     error: 'Offer is not active' 
//                 });
//             }
            
//             const discount = offer.calculateDiscount(cartTotal, userType, cartItems);
            
//             if (discount === 0) {
//                 return res.status(400).json({ 
//                     success: false, 
//                     error: 'You are not eligible for this offer' 
//                 });
//             }
            
//             res.json({
//                 success: true,
//                 data: {
//                     offer,
//                     discount,
//                     finalTotal: cartTotal - discount
//                 }
//             });
//         } catch (error) {
//             res.status(500).json({ success: false, error: error.message });
//         }
//     }
// };





import { Offer } from '../models/Offer.js';

export const offerController = {
    // Get all offers
    async getAllOffers(req, res) {
        try {
            const { active, page = 1, limit = 10 } = req.query;
            const filter = {};
            
            if (active !== undefined) filter.active = active === 'true';
            
            const offers = await Offer.find(filter)
                .sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit);
            
            const total = await Offer.countDocuments(filter);
            
            res.json({
                success: true,
                data: offers,
                total,
                page: parseInt(page),
                totalPages: Math.ceil(total / limit)
            });
        } catch (error) {
            console.error('Get all offers error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Get active offers (for frontend display)
    async getActiveOffers(req, res) {
        try {
            const now = new Date();
            console.log('Fetching active offers. Current time:', now);
            
            const offers = await Offer.find({
                active: true,
                startDate: { $lte: now },
                endDate: { $gte: now }
            }).sort({ createdAt: -1 });
            
            console.log(`Found ${offers.length} active offers`);
            
            res.json({ success: true, data: offers });
        } catch (error) {
            console.error('Get active offers error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Get single offer
    async getOfferById(req, res) {
        try {
            const offer = await Offer.findById(req.params.id);
            if (!offer) {
                return res.status(404).json({ success: false, error: 'Offer not found' });
            }
            res.json({ success: true, data: offer });
        } catch (error) {
            console.error('Get offer by ID error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Create new offer
    async createOffer(req, res) {
        try {
            const { title, description, discountType, discountValue, appliesTo, startDate, endDate, minPurchase, maxDiscount, active } = req.body;
            
            const offer = new Offer({
                title,
                description,
                discountType,
                discountValue,
                appliesTo,
                startDate,
                endDate,
                minPurchase: minPurchase || 0,
                maxDiscount: maxDiscount || null,
                active: active !== undefined ? active : true
            });
            
            await offer.save();
            console.log('Offer created:', offer.title);
            res.status(201).json({ success: true, data: offer });
        } catch (error) {
            console.error('Create offer error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Update offer
    async updateOffer(req, res) {
        try {
            const offer = await Offer.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            
            if (!offer) {
                return res.status(404).json({ success: false, error: 'Offer not found' });
            }
            
            console.log('Offer updated:', offer.title);
            res.json({ success: true, data: offer });
        } catch (error) {
            console.error('Update offer error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Delete offer
    async deleteOffer(req, res) {
        try {
            const offer = await Offer.findByIdAndDelete(req.params.id);
            if (!offer) {
                return res.status(404).json({ success: false, error: 'Offer not found' });
            }
            console.log('Offer deleted:', offer.title);
            res.json({ success: true, message: 'Offer deleted successfully' });
        } catch (error) {
            console.error('Delete offer error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Validate offer for cart (for frontend)
    async validateOffer(req, res) {
        try {
            const { offerId, cartTotal, userType, cartItems } = req.body;
            
            console.log('=== VALIDATING OFFER ===');
            console.log('Offer ID:', offerId);
            console.log('Cart Total:', cartTotal);
            console.log('User Type:', userType);
            console.log('Cart Items:', JSON.stringify(cartItems, null, 2));
            
            const offer = await Offer.findById(offerId);
            
            if (!offer) {
                console.log('Offer not found');
                return res.status(400).json({ 
                    success: false, 
                    error: 'Offer not found' 
                });
            }
            
            console.log('Found Offer:', offer.title);
            console.log('Offer active:', offer.active);
            console.log('Start Date:', offer.startDate);
            console.log('End Date:', offer.endDate);
            console.log('Current Date:', new Date());
            
            // Check if offer is active (manually, not using virtual)
            const now = new Date();
            const isActive = offer.active && 
                           now >= new Date(offer.startDate) && 
                           now <= new Date(offer.endDate);
            
            if (!isActive) {
                console.log('Offer is not active or date range invalid');
                return res.status(400).json({ 
                    success: false, 
                    error: 'Offer is not active' 
                });
            }
            
            // Check minimum purchase
            if (cartTotal < offer.minPurchase) {
                console.log(`Minimum purchase not met: ${cartTotal} < ${offer.minPurchase}`);
                return res.status(400).json({ 
                    success: false, 
                    error: `Minimum purchase of ₹${offer.minPurchase} required` 
                });
            }
            
            // Check appliesTo condition
            if (offer.appliesTo === 'student' && userType !== 'student') {
                console.log('Student offer but user is not student');
                return res.status(400).json({ 
                    success: false, 
                    error: 'This offer is only for students' 
                });
            }
            
            if (offer.appliesTo === 'bw') {
                // Check if all items are B&W
                const hasColor = cartItems.some(item => {
                    const printColor = item.printColor || item.color;
                    return printColor === 'color';
                });
                if (hasColor) {
                    console.log('Color items found, not eligible for BW offer');
                    return res.status(400).json({ 
                        success: false, 
                        error: 'This offer is only for black & white prints' 
                    });
                }
            }
            
            if (offer.appliesTo === 'color') {
                // Check if any color items exist
                const hasColor = cartItems.some(item => {
                    const printColor = item.printColor || item.color;
                    return printColor === 'color';
                });
                if (!hasColor) {
                    console.log('No color items found, not eligible for color offer');
                    return res.status(400).json({ 
                        success: false, 
                        error: 'This offer requires at least one color print' 
                    });
                }
            }
            
            // Calculate discount
            let discount = 0;
            if (offer.discountType === 'percentage') {
                discount = (cartTotal * offer.discountValue) / 100;
                console.log(`Percentage discount: ${offer.discountValue}% of ${cartTotal} = ${discount}`);
            } else {
                discount = offer.discountValue;
                console.log(`Fixed discount: ₹${discount}`);
            }
            
            // Apply max discount cap if exists
            if (offer.maxDiscount && discount > offer.maxDiscount) {
                console.log(`Applying max discount cap: ₹${offer.maxDiscount}`);
                discount = offer.maxDiscount;
            }
            
            // Ensure discount doesn't exceed cart total
            discount = Math.min(discount, cartTotal);
            console.log('Final discount:', discount);
            
            if (discount === 0) {
                console.log('Discount is 0 - user not eligible');
                return res.status(400).json({ 
                    success: false, 
                    error: 'You are not eligible for this offer' 
                });
            }
            
            res.json({
                success: true,
                data: {
                    offer: {
                        _id: offer._id,
                        title: offer.title,
                        description: offer.description,
                        discountType: offer.discountType,
                        discountValue: offer.discountValue,
                        appliesTo: offer.appliesTo,
                        minPurchase: offer.minPurchase
                    },
                    discount,
                    finalTotal: cartTotal - discount
                }
            });
        } catch (error) {
            console.error('Validate offer error:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    }
};
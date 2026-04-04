// // server/src/models/PromoCode.js
// import mongoose from 'mongoose';

// const promoSchema = new mongoose.Schema({
//     code: {
//         type: String,
//         required: true,
//         unique: true,
//         uppercase: true,
//         trim: true
//     },
//     discountType: {
//         type: String,
//         enum: ['percentage', 'fixed'],
//         required: true
//     },
//     discountValue: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     minOrder: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     expiryDate: {
//         type: Date,
//         required: true
//     },
//     usageLimit: {
//         type: Number,
//         default: 100,
//         min: 1
//     },
//     usedCount: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     perUserLimit: {
//         type: Number,
//         default: 1,
//         min: 1
//     },
//     active: {
//         type: Boolean,
//         default: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Index for faster queries
// promoSchema.index({ code: 1, active: 1 });
// promoSchema.index({ expiryDate: 1 });

// // Virtual to check if promo is valid
// promoSchema.virtual('isValid').get(function() {
//     const now = new Date();
//     return this.active && 
//            this.expiryDate > now && 
//            this.usedCount < this.usageLimit;
// });

// // Method to apply discount
// promoSchema.methods.calculateDiscount = function(amount) {
//     if (amount < this.minOrder) return 0;
    
//     let discount = 0;
//     if (this.discountType === 'percentage') {
//         discount = (amount * this.discountValue) / 100;
//     } else {
//         discount = this.discountValue;
//     }
    
//     return Math.min(discount, amount);
// };

// // Make sure to export as PromoCode
// export const PromoCode = mongoose.model('Promocode', promoSchema);



// server/src/models/Promocode.js
import mongoose from 'mongoose';

const promoSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true
    },
    discountValue: {
        type: Number,
        required: true,
        min: 0
    },
    minOrder: {
        type: Number,
        default: 0,
        min: 0
    },
    expiryDate: {
        type: Date,
        required: true
    },
    usageLimit: {
        type: Number,
        default: 100,
        min: 1
    },
    usedCount: {
        type: Number,
        default: 0,
        min: 0
    },
    perUserLimit: {
        type: Number,
        default: 1,
        min: 1
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
promoSchema.index({ code: 1, active: 1 });
promoSchema.index({ expiryDate: 1 });

// Virtual to check if promo is valid
promoSchema.virtual('isValid').get(function() {
    const now = new Date();
    return this.active && 
           this.expiryDate > now && 
           this.usedCount < this.usageLimit;
});

// Method to apply discount
promoSchema.methods.calculateDiscount = function(amount) {
    if (amount < this.minOrder) return 0;
    
    let discount = 0;
    if (this.discountType === 'percentage') {
        discount = (amount * this.discountValue) / 100;
    } else {
        discount = this.discountValue;
    }
    
    return Math.min(discount, amount);
};

// IMPORTANT: Export as PromoCode (capital P, capital C)
export const PromoCode = mongoose.model('PromoCode', promoSchema);
//                                        ^^^^^^^^ Collection name in MongoDB
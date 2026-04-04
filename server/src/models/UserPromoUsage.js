import mongoose from 'mongoose';

const userPromoUsageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    promoCodeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PromoCode',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: null
    },
    discountAmount: {
        type: Number,
        required: true,
        min: 0
    },
    usedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Ensure user can't use same promo multiple times (based on your perUserLimit logic)
userPromoUsageSchema.index({ userId: 1, promoCodeId: 1 }, { unique: true });

// Index for faster queries
userPromoUsageSchema.index({ userId: 1, usedAt: -1 });
userPromoUsageSchema.index({ promoCodeId: 1 });

export const UserPromoUsage = mongoose.model('UserPromoUsage', userPromoUsageSchema);
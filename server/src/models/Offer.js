// import mongoose from 'mongoose';

// const offerSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         required: true
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
//     appliesTo: {
//         type: String,
//         enum: ['all', 'bw', 'color', 'student'],
//         required: true
//     },
//     startDate: {
//         type: Date,
//         required: true
//     },
//     endDate: {
//         type: Date,
//         required: true
//     },
//     minPurchase: {
//         type: Number,
//         default: 0
//     },
//     maxDiscount: {
//         type: Number,
//         default: null
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

// // Index for active offers
// offerSchema.index({ active: 1, startDate: 1, endDate: 1 });

// // Virtual to check if offer is currently active
// offerSchema.virtual('isCurrentlyActive').get(function() {
//     const now = new Date();
//     return this.active && 
//            now >= this.startDate && 
//            now <= this.endDate;
// });

// // Method to calculate discount based on cart items
// offerSchema.methods.calculateDiscount = function(cartTotal, userType, cartItems) {
//     if (cartTotal < this.minPurchase) return 0;
    
//     // Check appliesTo condition
//     if (this.appliesTo === 'student' && userType !== 'student') return 0;
//     if (this.appliesTo === 'bw') {
//         // Check if all items are B&W
//         const hasColor = cartItems.some(item => item.type === 'color');
//         if (hasColor) return 0;
//     }
//     if (this.appliesTo === 'color') {
//         // Check if any color items exist
//         const hasColor = cartItems.some(item => item.type === 'color');
//         if (!hasColor) return 0;
//     }
    
//     let discount = 0;
//     if (this.discountType === 'percentage') {
//         discount = (cartTotal * this.discountValue) / 100;
//     } else {
//         discount = this.discountValue;
//     }
    
//     // Apply max discount cap if exists
//     if (this.maxDiscount && discount > this.maxDiscount) {
//         discount = this.maxDiscount;
//     }
    
//     return Math.min(discount, cartTotal);
// };

// export const Offer = mongoose.model('Offer', offerSchema);




import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
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
    appliesTo: {
        type: String,
        enum: ['all', 'bw', 'color', 'student'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    minPurchase: {
        type: Number,
        default: 0
    },
    maxDiscount: {
        type: Number,
        default: null
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

// Index for active offers
offerSchema.index({ active: 1, startDate: 1, endDate: 1 });

// Virtual to check if offer is currently active
offerSchema.virtual('isCurrentlyActive').get(function() {
    const now = new Date();
    return this.active && 
           now >= this.startDate && 
           now <= this.endDate;
});

// Method to calculate discount based on cart items
offerSchema.methods.calculateDiscount = function(cartTotal, userType, cartItems) {
    console.log('=== OFFER CALCULATE DISCOUNT ===');
    console.log('Cart Total:', cartTotal);
    console.log('User Type:', userType);
    console.log('Applies To:', this.appliesTo);
    console.log('Min Purchase:', this.minPurchase);
    
    if (cartTotal < this.minPurchase) {
        console.log('Min purchase not met:', cartTotal, '<', this.minPurchase);
        return 0;
    }
    
    // Check appliesTo condition
    if (this.appliesTo === 'student' && userType !== 'student') {
        console.log('Not a student, skipping student offer');
        return 0;
    }
    
    if (this.appliesTo === 'bw') {
        // Check if all items are B&W (printColor === 'bw')
        const hasColor = cartItems.some(item => {
            const printColor = item.printColor || item.color;
            return printColor === 'color';
        });
        if (hasColor) {
            console.log('Has color items, not eligible for BW offer');
            return 0;
        }
        console.log('All items are B&W, eligible for BW offer');
    }
    
    if (this.appliesTo === 'color') {
        // Check if any color items exist
        const hasColor = cartItems.some(item => {
            const printColor = item.printColor || item.color;
            return printColor === 'color';
        });
        if (!hasColor) {
            console.log('No color items, not eligible for color offer');
            return 0;
        }
        console.log('Has color items, eligible for color offer');
    }
    
    let discount = 0;
    if (this.discountType === 'percentage') {
        discount = (cartTotal * this.discountValue) / 100;
        console.log(`Percentage discount: ${this.discountValue}% of ${cartTotal} = ${discount}`);
    } else {
        discount = this.discountValue;
        console.log(`Fixed discount: ₹${discount}`);
    }
    
    // Apply max discount cap if exists
    if (this.maxDiscount && discount > this.maxDiscount) {
        console.log(`Applying max discount cap: ₹${this.maxDiscount}`);
        discount = this.maxDiscount;
    }
    
    // Ensure discount doesn't exceed cart total
    discount = Math.min(discount, cartTotal);
    console.log('Final discount:', discount);
    
    return discount;
};

export const Offer = mongoose.model('Offer', offerSchema);
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    razorpayOrderId: {
        type: String,
        required: true,
        unique: true
        // Remove index: true from here if it exists
    },
    razorpayPaymentId: {
        type: String,
        sparse: true
    },
    razorpaySignature: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    status: {
        type: String,
        enum: ['created', 'attempted', 'paid', 'failed', 'refunded'],
        default: 'created'
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'upi', 'netbanking', 'wallet', 'emi',null],
        // default: null
    },
    receipt: {
        type: String
    },
    notes: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    refundDetails: {
        refundId: String,
        amount: Number,
        reason: String,
        status: String
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, {
    timestamps: true
});

// Only use schema.index() for indexes, don't also use index: true in field definitions
// paymentSchema.index({ razorpayOrderId: 1 }, { unique: true });
paymentSchema.index({ orderId: 1 });
paymentSchema.index({ userId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ createdAt: -1 }); // For sorting by date

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
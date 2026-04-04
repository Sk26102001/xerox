import express from 'express';
import {
    createRazorpayOrder,
    verifyPayment,
    getPaymentStatus,
    initiateRefund,
    razorpayWebhook
} from '../controllers/paymentController.js';
import auth from '../middleware/auth.js'; // Changed to import default export

const router = express.Router();

// Protected routes (require authentication)
router.post('/create-order', auth, createRazorpayOrder);
// router.post('/verify-payment', auth, verifyPayment);
router.post('/verify-payment', verifyPayment);
router.get('/status/:orderId', auth, getPaymentStatus);
router.post('/refund', auth, initiateRefund);
// 🔥 Add this
router.post("/webhook", razorpayWebhook);
// Public webhook endpoint (no authentication)
router.post('/webhook', express.raw({ type: 'application/json' }), razorpayWebhook);

export default router;
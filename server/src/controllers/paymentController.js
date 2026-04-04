// import razorpay from "../config/razorpay.js";
// import crypto from "crypto";

// export const createOrder = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const order = await razorpay.orders.create({
//       amount: amount * 100,
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     });

//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const verifyPayment = (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(body)
//     .digest("hex");

//   if (expectedSignature === razorpay_signature) {
//     res.json({ success: true });
//   } else {
//     res.status(400).json({ success: false });
//   }
// };





// import razorpayInstance from '../config/razorpay.js';
// import Payment from '../models/Payment.js';
// import Order from '../models/Order.js';
// import crypto from 'crypto';

// // Create Razorpay Order
// export const createRazorpayOrder = async (req, res) => {
//     try {
//         const { orderId } = req.body;
//         const userId = req.user.id;

//         // Fetch order details
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Order not found'
//             });
//         }

//         // Verify order belongs to user
//         if (order.userId.toString() !== userId){
//             return res.status(403).json({
//                 success: false,
//                 message: 'Unauthorized'
//             });
//         }

//         // Check if payment already exists
//         const existingPayment = await Payment.findOne({ 
//             orderId: orderId,
//             status: { $in: ['created', 'attempted'] }
//         });

//         if (existingPayment) {
//             return res.status(200).json({
//                 success: true,
//                 // orderId: existingPayment.razorpayOrderId,
//                  razorpayOrderId: existingPayment.razorpayOrderId, 
//                  orderId: orderId,
//                 amount: existingPayment.amount,
//                 currency: existingPayment.currency,
//                 key: process.env.RAZORPAY_KEY_ID
//             });
//         }

//         // Create Razorpay order options
//         const options = {
//             amount: Math.round(order.totalAmount * 100), // Convert to paise
//             currency: 'INR',
//             receipt: `order_${orderId}`,
//             notes: {
//                 orderId: orderId.toString(),
//                 userId: userId.toString(),
//                 orderNumber: order.orderNumber || `ORD-${orderId}`
//             },
//             payment_capture: 1 // Auto capture payment
//         };

//         // Create order in Razorpay
//         const razorpayOrder = await razorpayInstance.orders.create(options);

//         // Save payment record
//         const payment = new Payment({
//             orderId: orderId,
//             userId: userId,
//             razorpayOrderId: razorpayOrder.id,
//             amount: razorpayOrder.amount,
//             currency: razorpayOrder.currency,
//             status: 'created',
//             receipt: razorpayOrder.receipt,
//             notes: razorpayOrder.notes
//         });

//         await payment.save();

//         res.status(200).json({
//             success: true,
//             // orderId: razorpayOrder.id,
//              orderId: orderId,
//               razorpayOrderId: razorpayOrder.id,
//             amount: razorpayOrder.amount,
//             currency: razorpayOrder.currency,
//             key: process.env.RAZORPAY_KEY_ID,
//             amountInRupees: razorpayOrder.amount / 100
//         });

//     } catch (error) {
//         console.error('Error creating Razorpay order:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to create payment order',
//             error: error.message
//         });
//     }
// };

// // Verify Payment
// export const verifyPayment = async (req, res) => {
//     try {
//         const {
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature,
//             orderId
//         } = req.body;

//         // Verify signature
//         const body = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSignature = crypto
//             .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//             .update(body.toString())
//             .digest('hex');

//         const isSignatureValid = expectedSignature === razorpay_signature;

//         if (!isSignatureValid) {
//             // Update payment status to failed
//             await Payment.findOneAndUpdate(
//                 { razorpayOrderId: razorpay_order_id },
//                 {
//                     razorpayPaymentId: razorpay_payment_id,
//                     razorpaySignature: razorpay_signature,
//                     status: 'failed',
//                     metadata: {
//                         verificationFailed: true,
//                         timestamp: new Date()
//                     }
//                 }
//             );

//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid payment signature'
//             });
//         }

//         // Fetch payment details from Razorpay
//         const payment = await razorpayInstance.payments.fetch(razorpay_payment_id);

//         // Update payment record
//         const updatedPayment = await Payment.findOneAndUpdate(
//             { razorpayOrderId: razorpay_order_id },
//             {
//                 razorpayPaymentId: razorpay_payment_id,
//                 razorpaySignature: razorpay_signature,
//                 status: 'paid',
//                 paymentMethod: payment.method,
//                 metadata: {
//                     ...payment,
//                     verificationTime: new Date()
//                 }
//             },
//             { new: true }
//         );

//         // Update order status
//         if (updatedPayment) {
//             await Order.findByIdAndUpdate(
//                 updatedPayment.orderId,
//                 {
//                     paymentStatus: 'paid',
//                     paymentId: razorpay_payment_id,
//                     status: 'processing' // or 'confirmed'
//                 }
//             );
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Payment verified successfully',
//             paymentId: razorpay_payment_id,
//             orderId: updatedPayment.orderId
//         });

//     } catch (error) {
//         console.error('Error verifying payment:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to verify payment',
//             error: error.message
//         });
//     }
// };

// // Get Payment Status
// export const getPaymentStatus = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const userId = req.user.id;

//         // const payment = await Payment.findOne({ 
//         //     orderId: orderId,
//         //     userId: userId 
//         // }).populate('orderId', 'orderNumber totalAmount');

//         const payment = await Payment.findOne({
//     $or: [
//         { orderId: orderId },
//         { razorpayOrderId: orderId }
//     ],
//     userId: userId
// }).populate('orderId', 'orderNumber totalAmount');

//         if (!payment) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Payment not found'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             payment: {
//                 status: payment.status,
//                 amount: payment.amount / 100,
//                 currency: payment.currency,
//                 razorpayOrderId: payment.razorpayOrderId,
//                 razorpayPaymentId: payment.razorpayPaymentId,
//                 createdAt: payment.createdAt,
//                 orderDetails: payment.orderId
//             }
//         });

//     } catch (error) {
//         console.error('Error fetching payment status:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to fetch payment status'
//         });
//     }
// };

// // Initiate Refund
// export const initiateRefund = async (req, res) => {
//     try {
//         const { paymentId, amount, reason } = req.body;
//         const userId = req.user.id;

//         // Check if user is admin or order owner
//         const payment = await Payment.findOne({ 
//             razorpayPaymentId: paymentId 
//         }).populate('orderId');

//         if (!payment) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Payment not found'
//             });
//         }

//         // Verify authorization (admin only or order owner)
//         const isAdmin = req.user.role === 'admin';
//         const isOwner = payment.userId.toString() === userId;

//         if (!isAdmin && !isOwner) {
//             return res.status(403).json({
//                 success: false,
//                 message: 'Unauthorized to initiate refund'
//             });
//         }

//         // Check if already refunded
//         if (payment.status === 'refunded') {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Payment already refunded'
//             });
//         }

//         // Initiate refund with Razorpay
//         const refundAmount = amount ? Math.round(amount * 100) : payment.amount;
        
//         const refund = await razorpayInstance.payments.refund(paymentId, {
//             amount: refundAmount,
//             notes: {
//                 reason: reason || 'Customer requested refund',
//                 initiatedBy: userId,
//                 orderId: payment.orderId._id.toString()
//             }
//         });

//         // Update payment record
//         payment.status = 'refunded';
//         payment.refundDetails = {
//             refundId: refund.id,
//             amount: refundAmount,
//             reason: reason || 'Customer requested refund',
//             status: refund.status
//         };
//         await payment.save();

//         // Update order status
//         await Order.findByIdAndUpdate(
//             payment.orderId,
//             {
//                 paymentStatus: 'refunded',
//                 status: 'refunded'
//             }
//         );

//         res.status(200).json({
//             success: true,
//             message: 'Refund initiated successfully',
//             refund: refund
//         });

//     } catch (error) {
//         console.error('Error initiating refund:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to initiate refund',
//             error: error.message
//         });
//     }
// };

// // Webhook Handler for Razorpay Events
// export const razorpayWebhook = async (req, res) => {
//     try {
//         const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
//         const razorpaySignature = req.headers['x-razorpay-signature'];

//         // Verify webhook signature
//         const body = JSON.stringify(req.body);
//         const expectedSignature = crypto
//             .createHmac('sha256', webhookSecret)
//             .update(body)
//             .digest('hex');

//         if (expectedSignature !== razorpaySignature) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid webhook signature'
//             });
//         }

//         const { event, payload } = req.body;

//         switch (event) {
//             case 'payment.captured':
//                 // Handle payment captured event
//                 const paymentId = payload.payment.entity.id;
//                 const orderId = payload.payment.entity.order_id;
                
//                 await Payment.findOneAndUpdate(
//                     { razorpayOrderId: orderId },
//                     {
//                         razorpayPaymentId: paymentId,
//                         status: 'paid',
//                         metadata: payload.payment.entity
//                     }
//                 );
//                 break;

//             case 'payment.failed':
//                 // Handle payment failed event
//                 const failedPaymentId = payload.payment.entity.id;
//                 const failedOrderId = payload.payment.entity.order_id;
                
//                 await Payment.findOneAndUpdate(
//                     { razorpayOrderId: failedOrderId },
//                     {
//                         razorpayPaymentId: failedPaymentId,
//                         status: 'failed',
//                         metadata: payload.payment.entity
//                     }
//                 );
//                 break;

//             case 'refund.created':
//                 // Handle refund created event
//                 const refundId = payload.refund.entity.id;
//                 const refundPaymentId = payload.refund.entity.payment_id;
                
//                 await Payment.findOneAndUpdate(
//                     { razorpayPaymentId: refundPaymentId },
//                     {
//                         status: 'refunded',
//                         'refundDetails.refundId': refundId,
//                         'refundDetails.status': 'created'
//                     }
//                 );
//                 break;

//             default:
//                 console.log(`Unhandled event: ${event}`);
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Webhook processed successfully'
//         });

//     } catch (error) {
//         console.error('Error processing webhook:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to process webhook'
//         });
//     }
// };









// // controllers/paymentController.js
// import razorpayInstance from '../config/razorpay.js';
// import { createShipment } from '../services/fshipService.js'; // 👈 add this
// import Payment from '../models/Payment.js';
// import Order from '../models/Order.js';
// import crypto from 'crypto';

// // Create Razorpay Order
// export const createRazorpayOrder = async (req, res) => {
//     try {
//         const { orderId } = req.body;
//         const userId = req.user.id;

//         // Fetch order details
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Order not found'
//             });
//         }

//         // Verify order belongs to user
//         if (order.userId.toString() !== userId) {
//             return res.status(403).json({
//                 success: false,
//                 message: 'Unauthorized'
//             });
//         }

//         // Check if payment already exists
//         let existingPayment = await Payment.findOne({ 
//             orderId: orderId,
//             status: { $in: ['created', 'attempted'] }
//         });

//         if (existingPayment) {
//             return res.status(200).json({
//                 success: true,
//                 razorpayOrderId: existingPayment.razorpayOrderId,
//                 orderId: orderId,
//                 amount: existingPayment.amount,
//                 currency: existingPayment.currency,
//                 key: process.env.RAZORPAY_KEY_ID
//             });
//         }

//         // Create Razorpay order options
//         const options = {
//             amount: Math.round(order.totalAmount * 100),
//             currency: 'INR',
//             receipt: `order_${orderId}`,
//             notes: {
//                 orderId: orderId.toString(),
//                 userId: userId.toString(),
//                 orderNumber: order.orderNumber || `ORD-${orderId}`
//             },
//             payment_capture: 1
//         };

//         // Create order in Razorpay
//         const razorpayOrder = await razorpayInstance.orders.create(options);

//         // Create payment record
//         const payment = new Payment({
//             orderId: orderId,
//             userId: userId,
//             razorpayOrderId: razorpayOrder.id,
//             amount: razorpayOrder.amount,
//             currency: razorpayOrder.currency,
//             status: 'created',
//             receipt: razorpayOrder.receipt,
//             notes: razorpayOrder.notes
//         });

//         const savedPayment = await payment.save();
//         console.log("✅ Payment created:", savedPayment._id);

//         // ✅ CRITICAL: Link payment to order
//         order.payment = savedPayment._id;
//         await order.save();
//         console.log("✅ Order linked to payment:", order._id);

//         res.status(200).json({
//             success: true,
//             orderId: orderId,
//             razorpayOrderId: razorpayOrder.id,
//             amount: razorpayOrder.amount,
//             currency: razorpayOrder.currency,
//             key: process.env.RAZORPAY_KEY_ID,
//             amountInRupees: razorpayOrder.amount / 100
//         });

//     } catch (error) {
//         console.error('Error creating Razorpay order:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to create payment order',
//             error: error.message
//         });
//     }
// };

// // Verify Payment
// // export const verifyPayment = async (req, res) => {
// //     try {
// //         const {
// //             razorpay_order_id,
// //             razorpay_payment_id,
// //             razorpay_signature,
// //             orderId
// //         } = req.body;

// //         // Verify signature
// //         const body = razorpay_order_id + "|" + razorpay_payment_id;
// //         const expectedSignature = crypto
// //             .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
// //             .update(body.toString())
// //             .digest('hex');

// //         const isSignatureValid = expectedSignature === razorpay_signature;

// //         if (!isSignatureValid) {
// //             await Payment.findOneAndUpdate(
// //                 { razorpayOrderId: razorpay_order_id },
// //                 {
// //                     razorpayPaymentId: razorpay_payment_id,
// //                     razorpaySignature: razorpay_signature,
// //                     status: 'failed',
// //                     metadata: {
// //                         verificationFailed: true,
// //                         timestamp: new Date()
// //                     }
// //                 }
// //             );

// //             return res.status(400).json({
// //                 success: false,
// //                 message: 'Invalid payment signature'
// //             });
// //         }

// //         // Fetch payment details from Razorpay
// //         const paymentDetails = await razorpayInstance.payments.fetch(razorpay_payment_id);

// //         // Update payment record
// //         const updatedPayment = await Payment.findOneAndUpdate(
// //             { razorpayOrderId: razorpay_order_id },
// //             {
// //                 razorpayPaymentId: razorpay_payment_id,
// //                 razorpaySignature: razorpay_signature,
// //                 status: 'paid',
// //                 paymentMethod: paymentDetails.method,
// //                 metadata: {
// //                     ...paymentDetails,
// //                     verificationTime: new Date()
// //                 }
// //             },
// //             { new: true }
// //         );

// //         // ✅ Update order status and ensure payment reference exists
// //         if (updatedPayment) {
// //             const order = await Order.findById(updatedPayment.orderId);
// //             if (order) {
// //                 order.paymentStatus = 'paid';
// //                 order.paymentId = razorpay_payment_id;
// //                 order.status = 'processing';
                
// //                 // Ensure payment is linked (in case it wasn't linked earlier)
// //                 if (!order.payment) {
// //                     order.payment = updatedPayment._id;
// //                 }
                
// //                 await order.save();
// //                 console.log("✅ Order updated:", order._id);
// //             }
// //         }

// //         res.status(200).json({
// //             success: true,
// //             message: 'Payment verified successfully',
// //             paymentId: razorpay_payment_id,
// //             orderId: updatedPayment.orderId
// //         });

// //     } catch (error) {
// //         console.error('Error verifying payment:', error);
// //         res.status(500).json({
// //             success: false,
// //             message: 'Failed to verify payment',
// //             error: error.message
// //         });
// //     }
// // };

// export const verifyPayment = async (req, res) => {
//     try {
//         const {
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature,
//         } = req.body;

//         // 🔐 Signature verification
//         const body = razorpay_order_id + "|" + razorpay_payment_id;

//         const expectedSignature = crypto
//             .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//             .update(body)
//             .digest('hex');

//         if (expectedSignature !== razorpay_signature) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid payment signature'
//             });
//         }

//         // 🔍 Find payment
//         const payment = await Payment.findOne({
//             razorpayOrderId: razorpay_order_id
//         });

//         if (!payment) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Payment not found'
//             });
//         }

//         // 🚫 Prevent duplicate processing
//         if (payment.status === 'paid') {
//             return res.status(200).json({
//                 success: true,
//                 message: 'Payment already processed'
//             });
//         }

//         // 🔄 Update payment
//         payment.status = 'paid';
//         payment.razorpayPaymentId = razorpay_payment_id;
//         payment.razorpaySignature = razorpay_signature;
//         await payment.save();

//         // 📦 Get order
//         const order = await Order.findById(payment.orderId);

//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Order not found'
//             });
//         }

//         // ✅ Update order status
//         order.paymentStatus = 'paid';
//         order.status = 'processing';

//         // 🚚 CREATE SHIPMENT (ONLY ONCE)
//         if (!order.shipmentCreated) {
//             try {
//                 // const shipmentRes = await createShipment({
//                 //     orderNumber: order.orderNumber,
//                 //     customerName: order.customer?.name || "Customer",
//                 //     phone: order.customer?.phone || "9999999999",
//                 //     address: order.customer?.address || "Default Address",
//                 //     pincode: order.customer?.pincode || "000000",
//                 //     amount: order.totalAmount
//                 // });

//                 const warehouseId = process.env.FSHIP_WAREHOUSE_ID;

//                 const shipmentRes = await createShipment(order, warehouseId);

//                 // ✅ SAVE SHIPMENT DETAILS (VERY IMPORTANT)
//                 order.shipment = {
//                     waybill: shipmentRes?.waybill || null,
//                     status: shipmentRes?.order_status || "created"
//                 };

//                 order.shipmentCreated = true;

//                 console.log("🚚 Shipment created:", shipmentRes);

//             } catch (err) {
//                 console.error("❌ Shipment error:", err.response?.data || err.message);
//             }
//         }

//         await order.save();

//         res.status(200).json({
//             success: true,
//             message: 'Payment verified successfully',
//             paymentId: razorpay_payment_id,
//             orderId: order._id
//         });

//     } catch (error) {
//         console.error("🔥 Verify Payment Error:", error);

//         res.status(500).json({
//             success: false,
//             message: 'Verification failed'
//         });
//     }
// };

// // Get Payment Status
// export const getPaymentStatus = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const userId = req.user.id;

//         const payment = await Payment.findOne({
//             $or: [
//                 { orderId: orderId },
//                 { razorpayOrderId: orderId }
//             ],
//             userId: userId
//         }).populate('orderId', 'orderNumber totalAmount');

//         if (!payment) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Payment not found'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             payment: {
//                 status: payment.status,
//                 amount: payment.amount / 100,
//                 currency: payment.currency,
//                 razorpayOrderId: payment.razorpayOrderId,
//                 razorpayPaymentId: payment.razorpayPaymentId,
//                 paymentMethod: payment.paymentMethod,
//                 createdAt: payment.createdAt,
//                 orderDetails: payment.orderId
//             }
//         });

//     } catch (error) {
//         console.error('Error fetching payment status:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to fetch payment status'
//         });
//     }
// };

// // Initiate Refund
// export const initiateRefund = async (req, res) => {
//     try {
//         const { paymentId, amount, reason } = req.body;
//         const userId = req.user.id;

//         const payment = await Payment.findOne({ 
//             razorpayPaymentId: paymentId 
//         }).populate('orderId');

//         if (!payment) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Payment not found'
//             });
//         }

//         const isAdmin = req.user.role === 'admin';
//         const isOwner = payment.userId.toString() === userId;

//         if (!isAdmin && !isOwner) {
//             return res.status(403).json({
//                 success: false,
//                 message: 'Unauthorized to initiate refund'
//             });
//         }

//         if (payment.status === 'refunded') {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Payment already refunded'
//             });
//         }

//         const refundAmount = amount ? Math.round(amount * 100) : payment.amount;
        
//         const refund = await razorpayInstance.payments.refund(paymentId, {
//             amount: refundAmount,
//             notes: {
//                 reason: reason || 'Customer requested refund',
//                 initiatedBy: userId,
//                 orderId: payment.orderId._id.toString()
//             }
//         });

//         payment.status = 'refunded';
//         payment.refundDetails = {
//             refundId: refund.id,
//             amount: refundAmount,
//             reason: reason || 'Customer requested refund',
//             status: refund.status
//         };
//         await payment.save();

//         await Order.findByIdAndUpdate(
//             payment.orderId,
//             {
//                 paymentStatus: 'refunded',
//                 status: 'cancelled'
//             }
//         );

//         res.status(200).json({
//             success: true,
//             message: 'Refund initiated successfully',
//             refund: refund
//         });

//     } catch (error) {
//         console.error('Error initiating refund:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to initiate refund',
//             error: error.message
//         });
//     }
// };

// // Webhook Handler for Razorpay Events
// // export const razorpayWebhook = async (req, res) => {
// //     try {
// //         const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
// //         const razorpaySignature = req.headers['x-razorpay-signature'];

// //         const body = JSON.stringify(req.body);
// //         const expectedSignature = crypto
// //             .createHmac('sha256', webhookSecret)
// //             .update(body)
// //             .digest('hex');

// //         if (expectedSignature !== razorpaySignature) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: 'Invalid webhook signature'
// //             });
// //         }

// //         const { event, payload } = req.body;

// //         switch (event) {
// //             case 'payment.captured':
// //                 const paymentId = payload.payment.entity.id;
// //                 const orderId = payload.payment.entity.order_id;
                
// //                 const updatedPayment = await Payment.findOneAndUpdate(
// //                     { razorpayOrderId: orderId },
// //                     {
// //                         razorpayPaymentId: paymentId,
// //                         status: 'paid',
// //                         paymentMethod: payload.payment.entity.method,
// //                         metadata: payload.payment.entity
// //                     },
// //                     { new: true }
// //                 );
                
// //                 // Link payment to order if not already linked
// //                 if (updatedPayment) {
// //                     await Order.findByIdAndUpdate(
// //                         updatedPayment.orderId,
// //                         {
// //                             payment: updatedPayment._id,
// //                             paymentStatus: 'paid',
// //                             paymentId: paymentId
// //                         }
// //                     );
// //                 }
// //                 break;

// //             case 'payment.failed':
// //                 const failedPaymentId = payload.payment.entity.id;
// //                 const failedOrderId = payload.payment.entity.order_id;
                
// //                 await Payment.findOneAndUpdate(
// //                     { razorpayOrderId: failedOrderId },
// //                     {
// //                         razorpayPaymentId: failedPaymentId,
// //                         status: 'failed',
// //                         metadata: payload.payment.entity
// //                     }
// //                 );
// //                 break;

// //             case 'refund.created':
// //                 const refundId = payload.refund.entity.id;
// //                 const refundPaymentId = payload.refund.entity.payment_id;
                
// //                 await Payment.findOneAndUpdate(
// //                     { razorpayPaymentId: refundPaymentId },
// //                     {
// //                         status: 'refunded',
// //                         'refundDetails.refundId': refundId,
// //                         'refundDetails.status': 'created'
// //                     }
// //                 );
// //                 break;

// //             default:
// //                 console.log(`Unhandled event: ${event}`);
// //         }

// //         res.status(200).json({
// //             success: true,
// //             message: 'Webhook processed successfully'
// //         });

// //     } catch (error) {
// //         console.error('Error processing webhook:', error);
// //         res.status(500).json({
// //             success: false,
// //             message: 'Failed to process webhook'
// //         });
// //     }
// // };




// export const razorpayWebhook = async (req, res) => {
//     try {
//         const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
//         const razorpaySignature = req.headers['x-razorpay-signature'];

//         // 🔐 Step 1: Verify webhook signature
//         const body = JSON.stringify(req.body);

//         const expectedSignature = crypto
//             .createHmac('sha256', webhookSecret)
//             .update(body)
//             .digest('hex');

//         if (expectedSignature !== razorpaySignature) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid webhook signature'
//             });
//         }

//         const { event, payload } = req.body;

//         console.log("📩 Webhook received:", event);

//         // 🔥 HANDLE EVENTS
//         switch (event) {

//             // ✅ PAYMENT SUCCESS
//             case 'payment.captured': {
//                 const paymentEntity = payload.payment.entity;

//                 const razorpayOrderId = paymentEntity.order_id;
//                 const razorpayPaymentId = paymentEntity.id;

//                 // 🔍 Find payment
//                 const existingPayment = await Payment.findOne({
//                     razorpayOrderId: razorpayOrderId
//                 });

//                 if (!existingPayment) {
//                     console.log("❌ Payment not found");
//                     break;
//                 }

//                 // 🚫 IMPORTANT: Prevent duplicate updates
//                 if (existingPayment.status === 'paid') {
//                     console.log("⚠️ Payment already processed (skipping)");
//                     break;
//                 }

//                 // ✅ Update payment
//                 const updatedPayment = await Payment.findOneAndUpdate(
//                     { razorpayOrderId: razorpayOrderId },
//                     {
//                         razorpayPaymentId: razorpayPaymentId,
//                         status: 'paid',
//                         paymentMethod: paymentEntity.method,
//                         metadata: paymentEntity
//                     },
//                     { new: true }
//                 );

//                 console.log("✅ Payment updated via webhook");

//                 // ✅ Update order (NO shipment here)
//                 if (updatedPayment) {
//                     await Order.findByIdAndUpdate(
//                         updatedPayment.orderId,
//                         {
//                             paymentStatus: 'paid',
//                             paymentId: razorpayPaymentId,
//                             status: 'processing'
//                         }
//                     );

//                     console.log("✅ Order updated via webhook");
//                 }

//                 break;
//             }

//             // ❌ PAYMENT FAILED
//             case 'payment.failed': {
//                 const paymentEntity = payload.payment.entity;

//                 await Payment.findOneAndUpdate(
//                     { razorpayOrderId: paymentEntity.order_id },
//                     {
//                         razorpayPaymentId: paymentEntity.id,
//                         status: 'failed',
//                         metadata: paymentEntity
//                     }
//                 );

//                 console.log("❌ Payment marked as failed");
//                 break;
//             }

//             // 💸 REFUND CREATED
//             case 'refund.created': {
//                 const refundEntity = payload.refund.entity;

//                 await Payment.findOneAndUpdate(
//                     { razorpayPaymentId: refundEntity.payment_id },
//                     {
//                         status: 'refunded',
//                         'refundDetails.refundId': refundEntity.id,
//                         'refundDetails.status': refundEntity.status
//                     }
//                 );

//                 console.log("💸 Refund processed");
//                 break;
//             }

//             default:
//                 console.log(`⚠️ Unhandled event: ${event}`);
//         }

//         // ✅ Always respond 200 (IMPORTANT for Razorpay)
//         res.status(200).json({
//             success: true,
//             message: 'Webhook processed successfully'
//         });

//     } catch (error) {
//         console.error('🔥 Webhook error:', error);

//         res.status(500).json({
//             success: false,
//             message: 'Webhook processing failed'
//         });
//     }
// };






// // controllers/paymentController.js
// import razorpayInstance from '../config/razorpay.js';
// import { createShipment } from '../services/fshipService.js';
// import Payment from '../models/Payment.js';
// import Order from '../models/Order.js';
// import crypto from 'crypto';

// // Create Razorpay Order
// export const createRazorpayOrder = async (req, res) => {
//     try {
//         const { orderId, amount } = req.body;  // ← Get amount from request
//         const userId = req.user.id;

//         // Fetch order details
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Order not found'
//             });
//         }

//         // Verify order belongs to user
//         if (order.userId.toString() !== userId) {
//             return res.status(403).json({
//                 success: false,
//                 message: 'Unauthorized'
//             });
//         }

//         // Determine which amount to use for payment
//         // Priority: 1. Amount from request (discounted), 2. order.finalAmount, 3. order.totalAmount
//         const paymentAmount = amount || order.finalAmount || order.totalAmount;
        
//         console.log('=== CREATE RAZORPAY ORDER ===');
//         console.log('Order ID:', orderId);
//         console.log('Order Number:', order.orderNumber);
//         console.log('Total Amount (Original):', order.totalAmount);
//         console.log('Final Amount (Discounted):', order.finalAmount);
//         console.log('Payment Amount (to charge):', paymentAmount);
//         console.log('Amount from request:', amount);

//         // Check if payment already exists
//         let existingPayment = await Payment.findOne({ 
//             orderId: orderId,
//             status: { $in: ['created', 'attempted'] }
//         });

//         if (existingPayment) {
//             return res.status(200).json({
//                 success: true,
//                 razorpayOrderId: existingPayment.razorpayOrderId,
//                 orderId: orderId,
//                 amount: existingPayment.amount,
//                 currency: existingPayment.currency,
//                 key: process.env.RAZORPAY_KEY_ID,
//                 amountInRupees: existingPayment.amount / 100
//             });
//         }

//         // Create Razorpay order options with the discounted amount
//         const options = {
//             amount: Math.round(paymentAmount * 100),  // ← Use discounted amount
//             currency: 'INR',
//             receipt: `order_${orderId}`,
//             notes: {
//                 orderId: orderId.toString(),
//                 userId: userId.toString(),
//                 orderNumber: order.orderNumber || `ORD-${orderId}`,
//                 originalAmount: order.totalAmount,
//                 discountedAmount: paymentAmount,
//                 discountSaved: order.totalAmount - paymentAmount
//             },
//             payment_capture: 1
//         };

//         console.log('Razorpay Order Options:', options);

//         // Create order in Razorpay
//         const razorpayOrder = await razorpayInstance.orders.create(options);

//         // Create payment record
//         const payment = new Payment({
//             orderId: orderId,
//             userId: userId,
//             razorpayOrderId: razorpayOrder.id,
//             amount: razorpayOrder.amount,
//             currency: razorpayOrder.currency,
//             status: 'created',
//             receipt: razorpayOrder.receipt,
//             notes: razorpayOrder.notes
//         });

//         const savedPayment = await payment.save();
//         console.log("✅ Payment created:", savedPayment._id);

//         // Link payment to order
//         order.payment = savedPayment._id;
//         await order.save();
//         console.log("✅ Order linked to payment:", order._id);

//         res.status(200).json({
//             success: true,
//             orderId: orderId,
//             razorpayOrderId: razorpayOrder.id,
//             amount: razorpayOrder.amount,
//             currency: razorpayOrder.currency,
//             key: process.env.RAZORPAY_KEY_ID,
//             amountInRupees: razorpayOrder.amount / 100
//         });

//     } catch (error) {
//         console.error('Error creating Razorpay order:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to create payment order',
//             error: error.message
//         });
//     }
// };

// // Verify Payment
// export const verifyPayment = async (req, res) => {
//     try {
//         const {
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature,
//             finalAmount,        // ← Add these from frontend
//             totalDiscount,      // ← Add these from frontend
//             discountsApplied    // ← Add these from frontend
//         } = req.body;

//         console.log('=== VERIFY PAYMENT ===');
//         console.log('Razorpay Order ID:', razorpay_order_id);
//         console.log('Razorpay Payment ID:', razorpay_payment_id);
//         console.log('Final Amount from frontend:', finalAmount);
//         console.log('Total Discount:', totalDiscount);
//         console.log('Discounts Applied:', discountsApplied);

//         // 🔐 Signature verification
//         const body = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSignature = crypto
//             .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//             .update(body)
//             .digest('hex');

//         if (expectedSignature !== razorpay_signature) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid payment signature'
//             });
//         }

//         // 🔍 Find payment
//         const payment = await Payment.findOne({
//             razorpayOrderId: razorpay_order_id
//         });

//         if (!payment) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Payment not found'
//             });
//         }

//         // 🚫 Prevent duplicate processing
//         if (payment.status === 'paid') {
//             return res.status(200).json({
//                 success: true,
//                 message: 'Payment already processed'
//             });
//         }

//         // 🔄 Update payment
//         payment.status = 'paid';
//         payment.razorpayPaymentId = razorpay_payment_id;
//         payment.razorpaySignature = razorpay_signature;
//         await payment.save();

//         // 📦 Get order
//         const order = await Order.findById(payment.orderId);

//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Order not found'
//             });
//         }

//         // ✅ Update order with discount information
//         order.paymentStatus = 'paid';
//         order.status = 'processing';
        
//         // Update discount fields if provided from frontend
//         if (finalAmount !== undefined) {
//             order.finalAmount = finalAmount;
//         }
//         if (totalDiscount !== undefined) {
//             order.discountAmount = totalDiscount;
//         }
//         if (discountsApplied) {
//             order.discountsApplied = {
//                 promo: discountsApplied.promo || null,
//                 offer: discountsApplied.offer || null,
//                 totalDiscount: totalDiscount || 0
//             };
//         }

//         console.log('Order updated with discounts:');
//         console.log('- Original Amount:', order.totalAmount);
//         console.log('- Final Amount:', order.finalAmount);
//         console.log('- Discount Amount:', order.discountAmount);

//         // 🚚 CREATE SHIPMENT (ONLY ONCE)
//         if (!order.shipmentCreated && order.deliveryType === 'courier') {
//             try {
//                 const warehouseId = process.env.FSHIP_WAREHOUSE_ID;
//                 const shipmentRes = await createShipment(order, warehouseId);

//                 // ✅ SAVE SHIPMENT DETAILS
//                 order.shipment = {
//                     waybill: shipmentRes?.waybill || null,
//                     status: shipmentRes?.order_status || "created"
//                 };
//                 order.shipmentCreated = true;

//                 console.log("🚚 Shipment created:", shipmentRes);
//             } catch (err) {
//                 console.error("❌ Shipment error:", err.response?.data || err.message);
//             }
//         }

//         await order.save();

//         res.status(200).json({
//             success: true,
//             message: 'Payment verified successfully',
//             paymentId: razorpay_payment_id,
//             orderId: order._id,
//             finalAmount: order.finalAmount,
//             discountAmount: order.discountAmount
//         });

//     } catch (error) {
//         console.error("🔥 Verify Payment Error:", error);
//         res.status(500).json({
//             success: false,
//             message: 'Verification failed'
//         });
//     }
// };

// // Get Payment Status
// export const getPaymentStatus = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const userId = req.user.id;

//         const payment = await Payment.findOne({
//             $or: [
//                 { orderId: orderId },
//                 { razorpayOrderId: orderId }
//             ],
//             userId: userId
//         }).populate('orderId', 'orderNumber totalAmount finalAmount discountAmount discountsApplied');

//         if (!payment) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Payment not found'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             payment: {
//                 status: payment.status,
//                 amount: payment.amount / 100,
//                 currency: payment.currency,
//                 razorpayOrderId: payment.razorpayOrderId,
//                 razorpayPaymentId: payment.razorpayPaymentId,
//                 paymentMethod: payment.paymentMethod,
//                 createdAt: payment.createdAt,
//                 orderDetails: payment.orderId
//             }
//         });

//     } catch (error) {
//         console.error('Error fetching payment status:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to fetch payment status'
//         });
//     }
// };

// // Initiate Refund
// export const initiateRefund = async (req, res) => {
//     try {
//         const { paymentId, amount, reason } = req.body;
//         const userId = req.user.id;

//         const payment = await Payment.findOne({ 
//             razorpayPaymentId: paymentId 
//         }).populate('orderId');

//         if (!payment) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Payment not found'
//             });
//         }

//         const isAdmin = req.user.role === 'admin';
//         const isOwner = payment.userId.toString() === userId;

//         if (!isAdmin && !isOwner) {
//             return res.status(403).json({
//                 success: false,
//                 message: 'Unauthorized to initiate refund'
//             });
//         }

//         if (payment.status === 'refunded') {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Payment already refunded'
//             });
//         }

//         const refundAmount = amount ? Math.round(amount * 100) : payment.amount;
        
//         const refund = await razorpayInstance.payments.refund(paymentId, {
//             amount: refundAmount,
//             notes: {
//                 reason: reason || 'Customer requested refund',
//                 initiatedBy: userId,
//                 orderId: payment.orderId._id.toString()
//             }
//         });

//         payment.status = 'refunded';
//         payment.refundDetails = {
//             refundId: refund.id,
//             amount: refundAmount,
//             reason: reason || 'Customer requested refund',
//             status: refund.status
//         };
//         await payment.save();

//         await Order.findByIdAndUpdate(
//             payment.orderId,
//             {
//                 paymentStatus: 'refunded',
//                 status: 'cancelled'
//             }
//         );

//         res.status(200).json({
//             success: true,
//             message: 'Refund initiated successfully',
//             refund: refund
//         });

//     } catch (error) {
//         console.error('Error initiating refund:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to initiate refund',
//             error: error.message
//         });
//     }
// };

// // Webhook Handler for Razorpay Events
// export const razorpayWebhook = async (req, res) => {
//     try {
//         const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
//         const razorpaySignature = req.headers['x-razorpay-signature'];

//         const body = JSON.stringify(req.body);
//         const expectedSignature = crypto
//             .createHmac('sha256', webhookSecret)
//             .update(body)
//             .digest('hex');

//         if (expectedSignature !== razorpaySignature) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid webhook signature'
//             });
//         }

//         const { event, payload } = req.body;
//         console.log("📩 Webhook received:", event);

//         switch (event) {
//             case 'payment.captured': {
//                 const paymentEntity = payload.payment.entity;
//                 const razorpayOrderId = paymentEntity.order_id;
//                 const razorpayPaymentId = paymentEntity.id;

//                 const existingPayment = await Payment.findOne({
//                     razorpayOrderId: razorpayOrderId
//                 });

//                 if (!existingPayment) {
//                     console.log("❌ Payment not found");
//                     break;
//                 }

//                 if (existingPayment.status === 'paid') {
//                     console.log("⚠️ Payment already processed (skipping)");
//                     break;
//                 }

//                 const updatedPayment = await Payment.findOneAndUpdate(
//                     { razorpayOrderId: razorpayOrderId },
//                     {
//                         razorpayPaymentId: razorpayPaymentId,
//                         status: 'paid',
//                         paymentMethod: paymentEntity.method,
//                         metadata: paymentEntity
//                     },
//                     { new: true }
//                 );

//                 console.log("✅ Payment updated via webhook");

//                 if (updatedPayment) {
//                     await Order.findByIdAndUpdate(
//                         updatedPayment.orderId,
//                         {
//                             paymentStatus: 'paid',
//                             paymentId: razorpayPaymentId,
//                             status: 'processing'
//                         }
//                     );
//                     console.log("✅ Order updated via webhook");
//                 }
//                 break;
//             }

//             case 'payment.failed': {
//                 const paymentEntity = payload.payment.entity;
//                 await Payment.findOneAndUpdate(
//                     { razorpayOrderId: paymentEntity.order_id },
//                     {
//                         razorpayPaymentId: paymentEntity.id,
//                         status: 'failed',
//                         metadata: paymentEntity
//                     }
//                 );
//                 console.log("❌ Payment marked as failed");
//                 break;
//             }

//             case 'refund.created': {
//                 const refundEntity = payload.refund.entity;
//                 await Payment.findOneAndUpdate(
//                     { razorpayPaymentId: refundEntity.payment_id },
//                     {
//                         status: 'refunded',
//                         'refundDetails.refundId': refundEntity.id,
//                         'refundDetails.status': refundEntity.status
//                     }
//                 );
//                 console.log("💸 Refund processed");
//                 break;
//             }

//             default:
//                 console.log(`⚠️ Unhandled event: ${event}`);
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Webhook processed successfully'
//         });

//     } catch (error) {
//         console.error('🔥 Webhook error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Webhook processing failed'
//         });
//     }
// };







// controllers/paymentController.js
import razorpayInstance from '../config/razorpay.js';
import { createShipment } from '../services/fshipService.js';
import Payment from '../models/Payment.js';
import Order from '../models/Order.js';
import crypto from 'crypto';

// Create Razorpay Order
export const createRazorpayOrder = async (req, res) => {
    try {
        const { orderId, amount } = req.body;
        const userId = req.user.id;

        // Fetch order details
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Verify order belongs to user
        if (order.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        // Determine which amount to use for payment
        const paymentAmount = amount || order.finalAmount || order.totalAmount;
        
        console.log('=== CREATE RAZORPAY ORDER ===');
        console.log('Order ID:', orderId);
        console.log('Order Number:', order.orderNumber);
        console.log('Total Amount (Original):', order.totalAmount);
        console.log('Final Amount (Discounted):', order.finalAmount);
        console.log('Payment Amount (to charge):', paymentAmount);

        // Check if payment already exists
        let existingPayment = await Payment.findOne({ 
            orderId: orderId,
            status: { $in: ['created', 'attempted'] }
        });

        if (existingPayment) {
            return res.status(200).json({
                success: true,
                razorpayOrderId: existingPayment.razorpayOrderId,
                orderId: orderId,
                amount: existingPayment.amount,
                currency: existingPayment.currency,
                key: process.env.RAZORPAY_KEY_ID,
                amountInRupees: existingPayment.amount / 100
            });
        }

        // Create Razorpay order options with the discounted amount
        const options = {
            amount: Math.round(paymentAmount * 100),
            currency: 'INR',
            receipt: `order_${orderId}`,
            notes: {
                orderId: orderId.toString(),
                userId: userId.toString(),
                orderNumber: order.orderNumber || `ORD-${orderId}`,
                originalAmount: order.totalAmount,
                discountedAmount: paymentAmount,
                discountSaved: order.totalAmount - paymentAmount
            },
            payment_capture: 1
        };

        console.log('Razorpay Order Options:', options);

        // Create order in Razorpay
        const razorpayOrder = await razorpayInstance.orders.create(options);

        // Create payment record
        const payment = new Payment({
            orderId: orderId,
            userId: userId,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            status: 'created',
            receipt: razorpayOrder.receipt,
            notes: razorpayOrder.notes
        });

        const savedPayment = await payment.save();
        console.log("✅ Payment created:", savedPayment._id);

        // Link payment to order
        order.payment = savedPayment._id;
        await order.save();
        console.log("✅ Order linked to payment:", order._id);

        res.status(200).json({
            success: true,
            orderId: orderId,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID,
            amountInRupees: razorpayOrder.amount / 100
        });

    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create payment order',
            error: error.message
        });
    }
};

// Verify Payment

export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            finalAmount,
            totalDiscount,
            discountsApplied
        } = req.body;

        console.log('=== VERIFY PAYMENT ===');
        console.log('Razorpay Order ID:', razorpay_order_id);
        console.log('Razorpay Payment ID:', razorpay_payment_id);
        console.log('Final Amount from frontend:', finalAmount);
        console.log('Total Discount:', totalDiscount);

        // 🔐 Signature verification
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }

        // 🔍 Find payment
        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id
        });

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }

        // 🚫 Prevent duplicate processing
        if (payment.status === 'paid') {
            console.log('⚠️ Payment already processed');
            return res.status(200).json({
                success: true,
                message: 'Payment already verified'
            });
        }

        // 🔄 Update payment
        payment.status = 'paid';
        payment.razorpayPaymentId = razorpay_payment_id;
        payment.razorpaySignature = razorpay_signature;
        await payment.save();
        console.log('✅ Payment record updated to paid');

        // 📦 Get order
        const order = await Order.findById(payment.orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        console.log('=== ORDER BEFORE UPDATE ===');
        console.log('Order Number:', order.orderNumber);
        console.log('Current paymentStatus:', order.paymentStatus);
        console.log('Current status:', order.status);

        // ✅ Update order with payment information
        order.paymentStatus = 'paid';
        order.status = 'processing';
        order.paymentId = razorpay_payment_id;
        order.razorpayPaymentId = razorpay_payment_id;
        // order.paymentMode = 'online';
        order.paymentMode = 'upi';
        
        // Update discount fields if provided from frontend
        if (finalAmount !== undefined) {
            order.finalAmount = finalAmount;
        }
        if (totalDiscount !== undefined) {
            order.discountAmount = totalDiscount;
        }
        if (discountsApplied) {
            order.discountsApplied = {
                promo: discountsApplied.promo || null,
                offer: discountsApplied.offer || null,
                totalDiscount: totalDiscount || 0
            };
        }

        // Add to status history
        if (!order.statusHistory) {
            order.statusHistory = [];
        }
        order.statusHistory.push({
            status: order.status,
            changedBy: order.userId,
            changedAt: new Date(),
            note: `Payment completed. Payment Status: ${order.paymentStatus}, Amount: ₹${order.finalAmount || order.totalAmount}`
        });

        const savedOrder = await order.save();
        
        console.log('=== ORDER AFTER UPDATE ===');
        console.log('Updated paymentStatus:', savedOrder.paymentStatus);
        console.log('Updated status:', savedOrder.status);
        console.log('Updated finalAmount:', savedOrder.finalAmount);
        console.log('✅ Order updated successfully');

        // 🚚 CREATE SHIPMENT (ONLY ONCE for courier)
        if (!order.shipmentCreated && order.deliveryType === 'courier') {
            try {
                const warehouseId = process.env.FSHIP_WAREHOUSE_ID;
                const shipmentRes = await createShipment(order, warehouseId);
                order.shipment = {
                    waybill: shipmentRes?.waybill || null,
                    status: shipmentRes?.order_status || "created"
                };
                order.shipmentCreated = true;
                await order.save();
                console.log("🚚 Shipment created:", shipmentRes);
            } catch (err) {
                console.error("❌ Shipment error:", err.response?.data || err.message);
            }
        }

        res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            paymentId: razorpay_payment_id,
            orderId: order._id,
            finalAmount: order.finalAmount,
            discountAmount: order.discountAmount,
            paymentStatus: order.paymentStatus
        });

    } catch (error) {
        console.error("🔥 Verify Payment Error:", error);
        res.status(500).json({
            success: false,
            message: 'Verification failed',
            error: error.message
        });
    }
};

// Get Payment Status
export const getPaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        // ✅ First, check the order's payment status directly
        const order = await Order.findById(orderId);
        
        if (order && order.paymentStatus === 'paid') {
            console.log(`Order ${order.orderNumber} has payment status: ${order.paymentStatus}`);
            return res.status(200).json({
                success: true,
                payment: {
                    status: 'paid',
                    amount: (order.finalAmount || order.totalAmount) * 100,
                    currency: 'INR',
                    razorpayOrderId: order.razorpayOrderId,
                    razorpayPaymentId: order.razorpayPaymentId,
                    createdAt: order.createdAt,
                    orderDetails: {
                        _id: order._id,
                        orderNumber: order.orderNumber,
                        totalAmount: order.totalAmount,
                        finalAmount: order.finalAmount,
                        discountAmount: order.discountAmount
                    }
                }
            });
        }

        // Fallback to payment collection
        const payment = await Payment.findOne({
            $or: [
                { orderId: orderId },
                { razorpayOrderId: orderId }
            ],
            userId: userId
        }).populate('orderId', 'orderNumber totalAmount finalAmount discountAmount discountsApplied');

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }

        res.status(200).json({
            success: true,
            payment: {
                status: payment.status,
                amount: payment.amount / 100,
                currency: payment.currency,
                razorpayOrderId: payment.razorpayOrderId,
                razorpayPaymentId: payment.razorpayPaymentId,
                paymentMethod: payment.paymentMethod,
                createdAt: payment.createdAt,
                orderDetails: payment.orderId
            }
        });

    } catch (error) {
        console.error('Error fetching payment status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payment status'
        });
    }
};

// Initiate Refund
export const initiateRefund = async (req, res) => {
    try {
        const { paymentId, amount, reason } = req.body;
        const userId = req.user.id;

        const payment = await Payment.findOne({ 
            razorpayPaymentId: paymentId 
        }).populate('orderId');

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }

        const isAdmin = req.user.role === 'admin';
        const isOwner = payment.userId.toString() === userId;

        if (!isAdmin && !isOwner) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to initiate refund'
            });
        }

        if (payment.status === 'refunded') {
            return res.status(400).json({
                success: false,
                message: 'Payment already refunded'
            });
        }

        const refundAmount = amount ? Math.round(amount * 100) : payment.amount;
        
        const refund = await razorpayInstance.payments.refund(paymentId, {
            amount: refundAmount,
            notes: {
                reason: reason || 'Customer requested refund',
                initiatedBy: userId,
                orderId: payment.orderId._id.toString()
            }
        });

        payment.status = 'refunded';
        payment.refundDetails = {
            refundId: refund.id,
            amount: refundAmount,
            reason: reason || 'Customer requested refund',
            status: refund.status
        };
        await payment.save();

        await Order.findByIdAndUpdate(
            payment.orderId,
            {
                paymentStatus: 'refunded',
                status: 'cancelled'
            }
        );

        res.status(200).json({
            success: true,
            message: 'Refund initiated successfully',
            refund: refund
        });

    } catch (error) {
        console.error('Error initiating refund:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to initiate refund',
            error: error.message
        });
    }
};

// Webhook Handler for Razorpay Events
export const razorpayWebhook = async (req, res) => {
    try {
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        const razorpaySignature = req.headers['x-razorpay-signature'];

        const body = JSON.stringify(req.body);
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpaySignature) {
            return res.status(400).json({
                success: false,
                message: 'Invalid webhook signature'
            });
        }

        const { event, payload } = req.body;
        console.log("📩 Webhook received:", event);

        switch (event) {
            case 'payment.captured': {
                const paymentEntity = payload.payment.entity;
                const razorpayOrderId = paymentEntity.order_id;
                const razorpayPaymentId = paymentEntity.id;

                const existingPayment = await Payment.findOne({
                    razorpayOrderId: razorpayOrderId
                });

                if (!existingPayment) {
                    console.log("❌ Payment not found");
                    break;
                }

                if (existingPayment.status === 'paid') {
                    console.log("⚠️ Payment already processed (skipping)");
                    break;
                }

                const updatedPayment = await Payment.findOneAndUpdate(
                    { razorpayOrderId: razorpayOrderId },
                    {
                        razorpayPaymentId: razorpayPaymentId,
                        status: 'paid',
                        paymentMethod: paymentEntity.method,
                        metadata: paymentEntity
                    },
                    { new: true }
                );

                console.log("✅ Payment updated via webhook");

                if (updatedPayment) {
                    // Also update the order's payment status
                    await Order.findByIdAndUpdate(
                        updatedPayment.orderId,
                        {
                            paymentStatus: 'paid',
                            paymentId: razorpayPaymentId,
                            razorpayPaymentId: razorpayPaymentId,
                            status: 'processing',
                            paymentMode: 'upi'
                        }
                    );
                    console.log("✅ Order updated via webhook");
                }
                break;
            }

            case 'payment.failed': {
                const paymentEntity = payload.payment.entity;
                await Payment.findOneAndUpdate(
                    { razorpayOrderId: paymentEntity.order_id },
                    {
                        razorpayPaymentId: paymentEntity.id,
                        status: 'failed',
                        metadata: paymentEntity
                    }
                );
                console.log("❌ Payment marked as failed");
                break;
            }

            case 'refund.created': {
                const refundEntity = payload.refund.entity;
                await Payment.findOneAndUpdate(
                    { razorpayPaymentId: refundEntity.payment_id },
                    {
                        status: 'refunded',
                        'refundDetails.refundId': refundEntity.id,
                        'refundDetails.status': refundEntity.status
                    }
                );
                console.log("💸 Refund processed");
                break;
            }

            default:
                console.log(`⚠️ Unhandled event: ${event}`);
        }

        res.status(200).json({
            success: true,
            message: 'Webhook processed successfully'
        });

    } catch (error) {
        console.error('🔥 Webhook error:', error);
        res.status(500).json({
            success: false,
            message: 'Webhook processing failed'
        });
    }
};
// import express from "express";
// import {
//   createOrder,
//   getOrders,
//   updateOrderStatus
// } from "../controllers/orderController.js";
// import auth from "../middleware/auth.js";

// const router = express.Router();

// router.post("/", auth, createOrder);
// router.get("/", auth, getOrders);
// router.put("/:id", auth, updateOrderStatus);

// export default router;



// import express from "express";
// import { createOrderAfterPayment } from "../controllers/orderController.js";
// import authMiddleware from "../middleware/auth.js";

// const router = express.Router();

// router.post("/create", authMiddleware, createOrderAfterPayment);






// // export default router;
// import express from 'express';
// import {
//   createOrderFromCart,
//   getOrders,
//   getOrderById,
//   updateOrderStatus,
//   cancelOrder,
//    trackOrder  // Add this import
// } from '../controllers/orderController.js';
// import auth from '../middleware/auth.js'; // ✅ Default import - matches your auth.js
// import adminAuth from "../middleware/adminAuth.js";
// import Order from "../models/Order.js";

// const router = express.Router();


// // Public route - No authentication required for tracking
// router.get('/track/:orderNumber', trackOrder);  // Add this line

// // Protected routes (all order routes require authentication)
// router.post('/create-from-cart', auth, createOrderFromCart);
// router.get('/', auth, getOrders);
// router.get('/:id', auth, getOrderById);
// router.put('/:id/status', auth, updateOrderStatus);
// router.post('/:id/cancel', auth, cancelOrder);


// // ✅ ADMIN: Get ALL orders
// router.get("/admin/all", auth, adminAuth, async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       orders
//     });
//   } catch (error) {
//     console.error("Admin orders error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch all orders"
//     });
//   }
// });


// export default router;




// import express from 'express';
// import {
//   createOrderFromCart,
//   getOrders,
//   getOrderById,
//   updateOrderStatus,
//   cancelOrder,
//   trackOrder,
//   // updatePaymentStatus,
//   // downloadFile
// } from '../controllers/orderController.js';

// import auth from '../middleware/auth.js';
// import adminAuth from "../middleware/adminAuth.js";
// import Order from "../models/Order.js";

// const router = express.Router();

// // ✅ Public route
// router.get('/track/:orderNumber', trackOrder);

// // ✅ ADMIN: Get ALL orders (KEEP THIS ABOVE :id)
// router.get("/admin/all", auth, adminAuth, async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       orders
//     });
//   } catch (error) {
//     console.error("Admin orders error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch all orders"
//     });
//   }
// });

// // router.get('/:orderId/file/:fileId', auth, downloadFile);

// // ✅ Protected routes
// router.post('/create-from-cart', auth, createOrderFromCart);
// router.get('/', auth, getOrders);



// // 👇 KEEP THIS LAST
// router.get('/:id', auth, getOrderById);


// router.put('/:id/status', auth, updateOrderStatus);
// // router.put('/:id/payment', auth, updatePaymentStatus);
// router.post('/:id/cancel', auth, cancelOrder);

// export default router;




// import express from 'express';
// import {
//   createOrderFromCart,
//   getOrders,
//   getOrderById,
//   updateOrderStatus,
//   cancelOrder,
//   trackOrder,
//   updatePaymentStatus
// } from '../controllers/orderController.js';
// import auth from '../middleware/auth.js';
// import adminAuth from "../middleware/adminAuth.js";
// import Order from "../models/Order.js";

// const router = express.Router();

// // ✅ Public route
// router.get('/track/:orderNumber', trackOrder);

// // ✅ ADMIN: Get ALL orders (KEEP THIS ABOVE :id)
// router.get("/admin/all", auth, adminAuth, async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       orders
//     });
//   } catch (error) {
//     console.error("Admin orders error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch all orders"
//     });
//   }
// });

// // ✅ Protected routes
// router.post('/create-from-cart', auth, createOrderFromCart);
// router.get('/', auth, getOrders);

// // 👇 KEEP THESE LAST - Dynamic routes
// router.get('/:id', auth, getOrderById);
// router.put('/:id/status', auth, updateOrderStatus);
// router.put('/:id/payment', auth, updatePaymentStatus);
// router.post('/:id/cancel', auth, cancelOrder);

// export default router;





// import express from 'express';
// import {
//   createOrderFromCart,
//   getOrders,
//   getOrderById,
//   updateOrderStatus,
//   cancelOrder,
//   trackOrder,
//   updatePaymentStatus,
//   updateOrderAmount  // ← ADD THIS IMPORT
// } from '../controllers/orderController.js';
// import auth from '../middleware/auth.js';
// import adminAuth from "../middleware/adminAuth.js";
// import Order from "../models/Order.js";

// const router = express.Router();

// // ✅ Public route
// router.get('/track/:orderNumber', trackOrder);

// // ✅ ADMIN: Get ALL orders (KEEP THIS ABOVE :id)
// router.get("/admin/all", auth, adminAuth, async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       orders
//     });
//   } catch (error) {
//     console.error("Admin orders error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch all orders"
//     });
//   }
// });

// // ✅ Protected routes
// router.post('/create-from-cart', auth, createOrderFromCart);
// router.get('/', auth, getOrders);

// // ✅ Route to update order amount when discounts are applied
// router.put('/:orderId/amount', auth, updateOrderAmount);  // ← ADD THIS ROUTE

// // 👇 KEEP THESE LAST - Dynamic routes
// router.get('/:id', auth, getOrderById);
// router.put('/:id/status', auth, updateOrderStatus);
// router.put('/:id/payment', auth, updatePaymentStatus);
// router.post('/:id/cancel', auth, cancelOrder);

// export default router;





// import express from 'express';
// import {
//   createOrderFromCart,
//   getOrders,
//   getOrderById,
//   updateOrderStatus,
//   cancelOrder,
//   trackOrder,
//   updatePaymentStatus,
//   updateOrderAmount,
//   updateOrderAddress
// } from '../controllers/orderController.js';
// import auth from '../middleware/auth.js';
// import adminAuth from "../middleware/adminAuth.js";
// import Order from "../models/Order.js";

// const router = express.Router();

// // ✅ Public route
// router.get('/track/:orderNumber', trackOrder);

// // ✅ ADMIN: Get ALL orders (KEEP THIS ABOVE :id)
// router.get("/admin/all", auth, adminAuth, async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       orders
//     });
//   } catch (error) {
//     console.error("Admin orders error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch all orders"
//     });
//   }
// });


// // Get shipping label for order (Admin only)
// router.get('/:orderId/label', auth, adminAuth, async (req, res) => {
//   try {
//     const { orderId } = req.params;
    
//     const order = await Order.findById(orderId);
    
//     if (!order) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Order not found" 
//       });
//     }
    
//     // Check if shipment exists and has waybill
//     if (!order.fship || !order.fship.waybill) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "No shipping label available for this order" 
//       });
//     }
    
//     // If label URL exists in database, fetch it
//     if (order.fship.labelUrl) {
//       // Fetch the label from Fship URL
//       const response = await axios.get(order.fship.labelUrl, {
//         responseType: 'stream'
//       });
      
//       res.setHeader('Content-Type', 'application/pdf');
//       res.setHeader('Content-Disposition', `attachment; filename=shipping-label-${order.orderNumber}.pdf`);
//       response.data.pipe(res);
//     } else {
//       // Generate new label from Fship API
//       const labelResponse = await generateShippingLabel(order.fship.waybill);
      
//       if (labelResponse.status && labelResponse.labelurl) {
//         // Save label URL to order
//         order.fship.labelUrl = labelResponse.labelurl;
//         await order.save();
        
//         // Fetch and return the label
//         const labelData = await axios.get(labelResponse.labelurl, {
//           responseType: 'stream'
//         });
        
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename=shipping-label-${order.orderNumber}.pdf`);
//         labelData.data.pipe(res);
//       } else {
//         res.status(404).json({ 
//           success: false, 
//           message: "Failed to generate shipping label" 
//         });
//       }
//     }
    
//   } catch (error) {
//     console.error("Label download error:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to fetch shipping label",
//       error: error.message 
//     });
//   }
// });

// // ✅ Protected routes
// router.post('/create-from-cart', auth, createOrderFromCart);
// router.get('/', auth, getOrders);



// // ✅ Route to update order amount when discounts are applied
// router.put('/:orderId/amount', auth, updateOrderAmount);

// router.put('/:id/address', auth, updateOrderAddress);

// // ✅ Route to update delivery address for an existing order (if needed)
// router.put('/:orderId/address', auth, async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { address, pincode, city, state, landmark, addressType } = req.body;
//     const userId = req.user.id;
    
//     const order = await Order.findOne({ _id: orderId, userId: userId });
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found'
//       });
//     }
    
//     // Only allow address update for pending orders
//     if (order.status !== 'pending') {
//       return res.status(400).json({
//         success: false,
//         message: 'Cannot update address for non-pending orders'
//       });
//     }
    
//     // Update address fields
//     if (address !== undefined) order.customer.address = address;
//     if (pincode !== undefined) order.customer.pincode = pincode;
//     if (city !== undefined) order.customer.city = city;
//     if (state !== undefined) order.customer.state = state;
//     if (landmark !== undefined) order.customer.landmark = landmark;
//     if (addressType !== undefined) order.customer.addressType = addressType;
    
//     await order.save();
    
//     res.json({
//       success: true,
//       message: 'Order address updated successfully',
//       order
//     });
    
//   } catch (error) {
//     console.error('Error updating order address:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to update order address'
//     });
//   }
// });

// // 👇 KEEP THESE LAST - Dynamic routes
// router.get('/:id', auth, getOrderById);
// router.put('/:id/status', auth, updateOrderStatus);
// router.put('/:id/payment', auth, updatePaymentStatus);
// router.post('/:id/cancel', auth, cancelOrder);

// export default router;










// import express from 'express';
// import axios from 'axios';
// import {
//   createOrderFromCart,
//   getOrders,
//   getOrderById,
//   updateOrderStatus,
//   cancelOrder,
//   trackOrder,
//   updatePaymentStatus,
//   updateOrderAmount,
//   updateOrderAddress
// } from '../controllers/orderController.js';
// import auth from '../middleware/auth.js';
// import adminAuth from "../middleware/adminAuth.js";
// import Order from "../models/Order.js";
// import { generateShippingLabel } from '../services/fshipService.js';

// const router = express.Router();

// // ✅ Public route - uses RegExp to support slashes in order IDs like ORD/0192/30-04-2026
// router.get(/^\/track\/(.+)$/, trackOrder);



// // router.get('/order/track/:orderId', (req, res) => {
// //   const { orderId } = req.params;
// // });
// // router.get('/track', trackOrder);

// // ✅ ADMIN: Get ALL orders (KEEP THIS ABOVE :id)
// router.get("/admin/all", auth, adminAuth, async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       orders
//     });
//   } catch (error) {
//     console.error("Admin orders error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch all orders"
//     });
//   }
// });

// // ✅ GET SHIPPING DETAILS FOR ORDER (Admin only)
// router.get('/:orderId/shipping', auth, adminAuth, async (req, res) => {
//   try {
//     const { orderId } = req.params;
    
//     const order = await Order.findById(orderId);
    
//     if (!order) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Order not found" 
//       });
//     }
    
//     // Get shipping details from order (support both fship and shipment schemas)
//     const shippingData = {
//       waybill: order.fship?.waybill || order.shipment?.waybill || null,
//       courier: order.fship?.courier || order.shipment?.courier || null,
//       courierId: order.fship?.courierId || order.deliveryPartner || null,
//       shippingCharge: order.fship?.shippingCharge || order.deliveryCharge || null,
//       status: order.fship?.status || order.shipment?.status || 'pending',
//       labelUrl: order.fship?.labelUrl || order.shipment?.labelUrl || null,
//       pickupRegistered: order.fship?.pickupStatus === 'registered' || order.shipment?.pickupRegistered || false,
//       lastUpdated: order.fship?.lastUpdated || order.shipment?.lastUpdated || null,
//       createdAt: order.createdAt,
//       updatedAt: order.updatedAt
//     };
    
//     res.status(200).json({
//       success: true,
//       data: shippingData
//     });
    
//   } catch (error) {
//     console.error("Shipping details error:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to fetch shipping details",
//       error: error.message 
//     });
//   }
// });

// // ✅ GET SHIPPING LABEL FOR ORDER (Admin only)
// router.get('/:orderId/label', auth, adminAuth, async (req, res) => {
//   try {
//     const { orderId } = req.params;
    
//     console.log('=== GET SHIPPING LABEL ===');
//     console.log('Order ID:', orderId);
    
//     const order = await Order.findById(orderId);
    
//     if (!order) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Order not found" 
//       });
//     }
    
//     // Get waybill from order (support both fship and shipment schemas)
//     const waybill = order.fship?.waybill || order.shipment?.waybill;
//     const existingLabelUrl = order.fship?.labelUrl || order.shipment?.labelUrl;
    
//     console.log('Waybill:', waybill);
//     console.log('Existing Label URL:', existingLabelUrl);
    
//     if (!waybill) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "No shipping label available - shipment not created" 
//       });
//     }
    
//     // If label URL exists in database, fetch it
//     if (existingLabelUrl) {
//       try {
//         console.log('Fetching existing label from:', existingLabelUrl);
//         const response = await axios.get(existingLabelUrl, {
//           responseType: 'arraybuffer'
//         });
        
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename=shipping-label-${order.orderNumber}.pdf`);
//         res.send(Buffer.from(response.data));
//         return;
//       } catch (fetchError) {
//         console.error('Error fetching existing label:', fetchError.message);
//         // Fall through to generate new label
//       }
//     }
    
//     // Generate new label from FShip API
//     console.log('Generating new label for waybill:', waybill);
    
//     try {
//       const labelResponse = await generateShippingLabel(waybill);
      
//       console.log('Label Response:', labelResponse);
      
//       if (labelResponse.status && labelResponse.labelurl) {
//         // Save label URL to order (update both possible schema locations)
//         if (order.fship) {
//           order.fship.labelUrl = labelResponse.labelurl;
//         } else if (order.shipment) {
//           order.shipment.labelUrl = labelResponse.labelurl;
//         } else {
//           order.fship = { labelUrl: labelResponse.labelurl };
//         }
//         await order.save();
        
//         // Fetch and return the label
//         const labelData = await axios.get(labelResponse.labelurl, {
//           responseType: 'arraybuffer'
//         });
        
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename=shipping-label-${order.orderNumber}.pdf`);
//         res.send(Buffer.from(labelData.data));
//       } else {
//         res.status(404).json({ 
//           success: false, 
//           message: labelResponse.response || "Failed to generate shipping label" 
//         });
//       }
//     } catch (genError) {
//       console.error('Generate label error:', genError.response?.data || genError.message);
//       res.status(500).json({ 
//         success: false, 
//         message: "Failed to generate shipping label",
//         error: genError.response?.data || genError.message
//       });
//     }
    
//   } catch (error) {
//     console.error("Label download error:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to fetch shipping label",
//       error: error.message 
//     });
//   }
// });

// // ✅ Protected routes
// router.post('/create-from-cart', auth, createOrderFromCart);
// router.get('/', auth, getOrders);

// // ✅ Route to update order amount when discounts are applied
// router.put('/:orderId/amount', auth, updateOrderAmount);

// router.put('/:id/address', auth, updateOrderAddress);

// // ✅ Route to update delivery address for an existing order
// router.put('/:orderId/address', auth, async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { address, pincode, city, state, landmark, addressType } = req.body;
//     const userId = req.user.id;
    
//     const order = await Order.findOne({ _id: orderId, userId: userId });
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found'
//       });
//     }
    
//     // Only allow address update for pending orders
//     if (order.status !== 'pending') {
//       return res.status(400).json({
//         success: false,
//         message: 'Cannot update address for non-pending orders'
//       });
//     }
    
//     // Update address fields
//     if (address !== undefined) order.customer.address = address;
//     if (pincode !== undefined) order.customer.pincode = pincode;
//     if (city !== undefined) order.customer.city = city;
//     if (state !== undefined) order.customer.state = state;
//     if (landmark !== undefined) order.customer.landmark = landmark;
//     if (addressType !== undefined) order.customer.addressType = addressType;
    
//     await order.save();
    
//     res.json({
//       success: true,
//       message: 'Order address updated successfully',
//       order
//     });
    
//   } catch (error) {
//     console.error('Error updating order address:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to update order address'
//     });
//   }
// });

// // 👇 KEEP THESE LAST - Dynamic routes
// router.get('/:id', auth, getOrderById);
// router.put('/:id/status', auth, updateOrderStatus);
// router.put('/:id/payment', auth, updatePaymentStatus);
// router.post('/:id/cancel', auth, cancelOrder);

// export default router;



// import express from "express";
// import {
//   createOrder,
//   getOrders,
//   updateOrderStatus
// } from "../controllers/orderController.js";
// import auth from "../middleware/auth.js";

// const router = express.Router();

// router.post("/", auth, createOrder);
// router.get("/", auth, getOrders);
// router.put("/:id", auth, updateOrderStatus);

// export default router;



// import express from "express";
// import { createOrderAfterPayment } from "../controllers/orderController.js";
// import authMiddleware from "../middleware/auth.js";

// const router = express.Router();

// router.post("/create", authMiddleware, createOrderAfterPayment);






// // export default router;
// import express from 'express';
// import {
//   createOrderFromCart,
//   getOrders,
//   getOrderById,
//   updateOrderStatus,
//   cancelOrder,
//    trackOrder  // Add this import
// } from '../controllers/orderController.js';
// import auth from '../middleware/auth.js'; // ✅ Default import - matches your auth.js
// import adminAuth from "../middleware/adminAuth.js";
// import Order from "../models/Order.js";

// const router = express.Router();


// // Public route - No authentication required for tracking
// router.get('/track/:orderNumber', trackOrder);  // Add this line

// // Protected routes (all order routes require authentication)
// router.post('/create-from-cart', auth, createOrderFromCart);
// router.get('/', auth, getOrders);
// router.get('/:id', auth, getOrderById);
// router.put('/:id/status', auth, updateOrderStatus);
// router.post('/:id/cancel', auth, cancelOrder);


// // ✅ ADMIN: Get ALL orders
// router.get("/admin/all", auth, adminAuth, async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       orders
//     });
//   } catch (error) {
//     console.error("Admin orders error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch all orders"
//     });
//   }
// });


// export default router;




// import express from 'express';
// import {
//   createOrderFromCart,
//   getOrders,
//   getOrderById,
//   updateOrderStatus,
//   cancelOrder,
//   trackOrder,
//   // updatePaymentStatus,
//   // downloadFile
// } from '../controllers/orderController.js';

// import auth from '../middleware/auth.js';
// import adminAuth from "../middleware/adminAuth.js";
// import Order from "../models/Order.js";

// const router = express.Router();

// // ✅ Public route
// router.get('/track/:orderNumber', trackOrder);

// // ✅ ADMIN: Get ALL orders (KEEP THIS ABOVE :id)
// router.get("/admin/all", auth, adminAuth, async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       orders
//     });
//   } catch (error) {
//     console.error("Admin orders error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch all orders"
//     });
//   }
// });

// // router.get('/:orderId/file/:fileId', auth, downloadFile);

// // ✅ Protected routes
// router.post('/create-from-cart', auth, createOrderFromCart);
// router.get('/', auth, getOrders);



// // 👇 KEEP THIS LAST
// router.get('/:id', auth, getOrderById);


// router.put('/:id/status', auth, updateOrderStatus);
// // router.put('/:id/payment', auth, updatePaymentStatus);
// router.post('/:id/cancel', auth, cancelOrder);

// export default router;




// import express from 'express';
// import {
//   createOrderFromCart,
//   getOrders,
//   getOrderById,
//   updateOrderStatus,
//   cancelOrder,
//   trackOrder,
//   updatePaymentStatus
// } from '../controllers/orderController.js';
// import auth from '../middleware/auth.js';
// import adminAuth from "../middleware/adminAuth.js";
// import Order from "../models/Order.js";

// const router = express.Router();

// // ✅ Public route
// router.get('/track/:orderNumber', trackOrder);

// // ✅ ADMIN: Get ALL orders (KEEP THIS ABOVE :id)
// router.get("/admin/all", auth, adminAuth, async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       orders
//     });
//   } catch (error) {
//     console.error("Admin orders error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch all orders"
//     });
//   }
// });

// // ✅ Protected routes
// router.post('/create-from-cart', auth, createOrderFromCart);
// router.get('/', auth, getOrders);

// // 👇 KEEP THESE LAST - Dynamic routes
// router.get('/:id', auth, getOrderById);
// router.put('/:id/status', auth, updateOrderStatus);
// router.put('/:id/payment', auth, updatePaymentStatus);
// router.post('/:id/cancel', auth, cancelOrder);

// export default router;





// import express from 'express';
// import {
//   createOrderFromCart,
//   getOrders,
//   getOrderById,
//   updateOrderStatus,
//   cancelOrder,
//   trackOrder,
//   updatePaymentStatus,
//   updateOrderAmount  // ← ADD THIS IMPORT
// } from '../controllers/orderController.js';
// import auth from '../middleware/auth.js';
// import adminAuth from "../middleware/adminAuth.js";
// import Order from "../models/Order.js";

// const router = express.Router();

// // ✅ Public route
// router.get('/track/:orderNumber', trackOrder);

// // ✅ ADMIN: Get ALL orders (KEEP THIS ABOVE :id)
// router.get("/admin/all", auth, adminAuth, async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       orders
//     });
//   } catch (error) {
//     console.error("Admin orders error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch all orders"
//     });
//   }
// });

// // ✅ Protected routes
// router.post('/create-from-cart', auth, createOrderFromCart);
// router.get('/', auth, getOrders);

// // ✅ Route to update order amount when discounts are applied
// router.put('/:orderId/amount', auth, updateOrderAmount);  // ← ADD THIS ROUTE

// // 👇 KEEP THESE LAST - Dynamic routes
// router.get('/:id', auth, getOrderById);
// router.put('/:id/status', auth, updateOrderStatus);
// router.put('/:id/payment', auth, updatePaymentStatus);
// router.post('/:id/cancel', auth, cancelOrder);

// export default router;





// import express from 'express';
// import {
//   createOrderFromCart,
//   getOrders,
//   getOrderById,
//   updateOrderStatus,
//   cancelOrder,
//   trackOrder,
//   updatePaymentStatus,
//   updateOrderAmount,
//   updateOrderAddress
// } from '../controllers/orderController.js';
// import auth from '../middleware/auth.js';
// import adminAuth from "../middleware/adminAuth.js";
// import Order from "../models/Order.js";

// const router = express.Router();

// // ✅ Public route
// router.get('/track/:orderNumber', trackOrder);

// // ✅ ADMIN: Get ALL orders (KEEP THIS ABOVE :id)
// router.get("/admin/all", auth, adminAuth, async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       orders
//     });
//   } catch (error) {
//     console.error("Admin orders error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch all orders"
//     });
//   }
// });


// // Get shipping label for order (Admin only)
// router.get('/:orderId/label', auth, adminAuth, async (req, res) => {
//   try {
//     const { orderId } = req.params;
    
//     const order = await Order.findById(orderId);
    
//     if (!order) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Order not found" 
//       });
//     }
    
//     // Check if shipment exists and has waybill
//     if (!order.fship || !order.fship.waybill) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "No shipping label available for this order" 
//       });
//     }
    
//     // If label URL exists in database, fetch it
//     if (order.fship.labelUrl) {
//       // Fetch the label from Fship URL
//       const response = await axios.get(order.fship.labelUrl, {
//         responseType: 'stream'
//       });
      
//       res.setHeader('Content-Type', 'application/pdf');
//       res.setHeader('Content-Disposition', `attachment; filename=shipping-label-${order.orderNumber}.pdf`);
//       response.data.pipe(res);
//     } else {
//       // Generate new label from Fship API
//       const labelResponse = await generateShippingLabel(order.fship.waybill);
      
//       if (labelResponse.status && labelResponse.labelurl) {
//         // Save label URL to order
//         order.fship.labelUrl = labelResponse.labelurl;
//         await order.save();
        
//         // Fetch and return the label
//         const labelData = await axios.get(labelResponse.labelurl, {
//           responseType: 'stream'
//         });
        
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename=shipping-label-${order.orderNumber}.pdf`);
//         labelData.data.pipe(res);
//       } else {
//         res.status(404).json({ 
//           success: false, 
//           message: "Failed to generate shipping label" 
//         });
//       }
//     }
    
//   } catch (error) {
//     console.error("Label download error:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to fetch shipping label",
//       error: error.message 
//     });
//   }
// });

// // ✅ Protected routes
// router.post('/create-from-cart', auth, createOrderFromCart);
// router.get('/', auth, getOrders);



// // ✅ Route to update order amount when discounts are applied
// router.put('/:orderId/amount', auth, updateOrderAmount);

// router.put('/:id/address', auth, updateOrderAddress);

// // ✅ Route to update delivery address for an existing order (if needed)
// router.put('/:orderId/address', auth, async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { address, pincode, city, state, landmark, addressType } = req.body;
//     const userId = req.user.id;
    
//     const order = await Order.findOne({ _id: orderId, userId: userId });
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found'
//       });
//     }
    
//     // Only allow address update for pending orders
//     if (order.status !== 'pending') {
//       return res.status(400).json({
//         success: false,
//         message: 'Cannot update address for non-pending orders'
//       });
//     }
    
//     // Update address fields
//     if (address !== undefined) order.customer.address = address;
//     if (pincode !== undefined) order.customer.pincode = pincode;
//     if (city !== undefined) order.customer.city = city;
//     if (state !== undefined) order.customer.state = state;
//     if (landmark !== undefined) order.customer.landmark = landmark;
//     if (addressType !== undefined) order.customer.addressType = addressType;
    
//     await order.save();
    
//     res.json({
//       success: true,
//       message: 'Order address updated successfully',
//       order
//     });
    
//   } catch (error) {
//     console.error('Error updating order address:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to update order address'
//     });
//   }
// });

// // 👇 KEEP THESE LAST - Dynamic routes
// router.get('/:id', auth, getOrderById);
// router.put('/:id/status', auth, updateOrderStatus);
// router.put('/:id/payment', auth, updatePaymentStatus);
// router.post('/:id/cancel', auth, cancelOrder);

// export default router;










import express from 'express';
import axios from 'axios';
import {
  createOrderFromCart,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  trackOrder,
  updatePaymentStatus,
  updateOrderAmount,
  updateOrderAddress
} from '../controllers/orderController.js';
import auth from '../middleware/auth.js';
import adminAuth from "../middleware/adminAuth.js";
import Order from "../models/Order.js";
import { generateShippingLabel } from '../services/fshipService.js';

const router = express.Router();

// ✅ Public route
router.get('/track/:orderNumber', trackOrder);

// ✅ ADMIN: Get ALL orders (KEEP THIS ABOVE :id)
router.get("/admin/all", auth, adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error("Admin orders error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders"
    });
  }
});

// ✅ GET SHIPPING DETAILS FOR ORDER (Admin only)
router.get('/:orderId/shipping', auth, adminAuth, async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }
    
    // Get shipping details from order (support both fship and shipment schemas)
    const shippingData = {
      waybill: order.fship?.waybill || order.shipment?.waybill || null,
      courier: order.fship?.courier || order.shipment?.courier || null,
      courierId: order.fship?.courierId || order.deliveryPartner || null,
      shippingCharge: order.fship?.shippingCharge || order.deliveryCharge || null,
      status: order.fship?.status || order.shipment?.status || 'pending',
      labelUrl: order.fship?.labelUrl || order.shipment?.labelUrl || null,
      pickupRegistered: order.fship?.pickupStatus === 'registered' || order.shipment?.pickupRegistered || false,
      lastUpdated: order.fship?.lastUpdated || order.shipment?.lastUpdated || null,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    };
    
    res.status(200).json({
      success: true,
      data: shippingData
    });
    
  } catch (error) {
    console.error("Shipping details error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch shipping details",
      error: error.message 
    });
  }
});

// ✅ GET SHIPPING LABEL FOR ORDER (Admin only)
router.get('/:orderId/label', auth, adminAuth, async (req, res) => {
  try {
    const { orderId } = req.params;
    
    console.log('=== GET SHIPPING LABEL ===');
    console.log('Order ID:', orderId);
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }
    
    // Get waybill from order (support both fship and shipment schemas)
    const waybill = order.fship?.waybill || order.shipment?.waybill;
    const existingLabelUrl = order.fship?.labelUrl || order.shipment?.labelUrl;
    
    console.log('Waybill:', waybill);
    console.log('Existing Label URL:', existingLabelUrl);
    
    if (!waybill) {
      return res.status(404).json({ 
        success: false, 
        message: "No shipping label available - shipment not created" 
      });
    }
    
    // If label URL exists in database, fetch it
    if (existingLabelUrl) {
      try {
        console.log('Fetching existing label from:', existingLabelUrl);
        const response = await axios.get(existingLabelUrl, {
          responseType: 'arraybuffer'
        });
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=shipping-label-${order.orderNumber}.pdf`);
        res.send(Buffer.from(response.data));
        return;
      } catch (fetchError) {
        console.error('Error fetching existing label:', fetchError.message);
        // Fall through to generate new label
      }
    }
    
    // Generate new label from FShip API
    console.log('Generating new label for waybill:', waybill);
    
    try {
      const labelResponse = await generateShippingLabel(waybill);
      
      console.log('Label Response:', labelResponse);
      
      if (labelResponse.status && labelResponse.labelurl) {
        // Save label URL to order (update both possible schema locations)
        if (order.fship) {
          order.fship.labelUrl = labelResponse.labelurl;
        } else if (order.shipment) {
          order.shipment.labelUrl = labelResponse.labelurl;
        } else {
          order.fship = { labelUrl: labelResponse.labelurl };
        }
        await order.save();
        
        // Fetch and return the label
        const labelData = await axios.get(labelResponse.labelurl, {
          responseType: 'arraybuffer'
        });
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=shipping-label-${order.orderNumber}.pdf`);
        res.send(Buffer.from(labelData.data));
      } else {
        res.status(404).json({ 
          success: false, 
          message: labelResponse.response || "Failed to generate shipping label" 
        });
      }
    } catch (genError) {
      console.error('Generate label error:', genError.response?.data || genError.message);
      res.status(500).json({ 
        success: false, 
        message: "Failed to generate shipping label",
        error: genError.response?.data || genError.message
      });
    }
    
  } catch (error) {
    console.error("Label download error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch shipping label",
      error: error.message 
    });
  }
});

// ✅ Protected routes
router.post('/create-from-cart', auth, createOrderFromCart);
router.get('/', auth, getOrders);

// ✅ Route to update order amount when discounts are applied
router.put('/:orderId/amount', auth, updateOrderAmount);

router.put('/:id/address', auth, updateOrderAddress);

// ✅ Route to update delivery address for an existing order
router.put('/:orderId/address', auth, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { address, pincode, city, state, landmark, addressType } = req.body;
    const userId = req.user.id;
    
    const order = await Order.findOne({ _id: orderId, userId: userId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Only allow address update for pending orders
    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update address for non-pending orders'
      });
    }
    
    // Update address fields
    if (address !== undefined) order.customer.address = address;
    if (pincode !== undefined) order.customer.pincode = pincode;
    if (city !== undefined) order.customer.city = city;
    if (state !== undefined) order.customer.state = state;
    if (landmark !== undefined) order.customer.landmark = landmark;
    if (addressType !== undefined) order.customer.addressType = addressType;
    
    await order.save();
    
    res.json({
      success: true,
      message: 'Order address updated successfully',
      order
    });
    
  } catch (error) {
    console.error('Error updating order address:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update order address'
    });
  }
});

// 👇 KEEP THESE LAST - Dynamic routes
router.get('/:id', auth, getOrderById);
router.put('/:id/status', auth, updateOrderStatus);
router.put('/:id/payment', auth, updatePaymentStatus);
router.post('/:id/cancel', auth, cancelOrder);

export default router;
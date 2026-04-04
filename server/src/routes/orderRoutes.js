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





import express from 'express';
import {
  createOrderFromCart,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  trackOrder,
  updatePaymentStatus,
  updateOrderAmount  // ← ADD THIS IMPORT
} from '../controllers/orderController.js';
import auth from '../middleware/auth.js';
import adminAuth from "../middleware/adminAuth.js";
import Order from "../models/Order.js";

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

// ✅ Protected routes
router.post('/create-from-cart', auth, createOrderFromCart);
router.get('/', auth, getOrders);

// ✅ Route to update order amount when discounts are applied
router.put('/:orderId/amount', auth, updateOrderAmount);  // ← ADD THIS ROUTE

// 👇 KEEP THESE LAST - Dynamic routes
router.get('/:id', auth, getOrderById);
router.put('/:id/status', auth, updateOrderStatus);
router.put('/:id/payment', auth, updatePaymentStatus);
router.post('/:id/cancel', auth, cancelOrder);

export default router;
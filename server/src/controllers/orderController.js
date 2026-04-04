

// // controllers/orderController.js
// import Order from '../models/Order.js';
// import Cart from '../models/Cart.js';
// import Payment from '../models/Payment.js'; // Add this import
// import { generateOrderNumber } from "../utils/generateOrderNumber.js";
// import {
//   createShipment,
//   shipOrder,
//   generateShippingLabel,
//   registerPickup
// } from '../services/fshipService.js';
// // Create order from cart
// export const createOrderFromCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { items, customer, orderMode, deliveryType, totalAmount, cartId } = req.body;

//     // Validate required fields
//     if (!items || !items.length) {
//       return res.status(400).json({
//         success: false,
//         message: "No items in order"
//       });
//     }

//     if (!customer || !customer.name || !customer.phone) {
//       return res.status(400).json({
//         success: false,
//         message: "Customer name and phone are required"
//       });
//     }

//     const orderNumber = await generateOrderNumber();

//     // Create order
//     const order = new Order({
//       userId,
//       items: items.map(item => ({
//         pages: item.pages || 0,
//         copies: item.copies || 1,
//         paperSize: item.paperSize || "A4",
//         paperType: item.paperType || "70gsm_normal",
//         printColor: item.printColor || "bw",
//         printSide: item.printSide || "double",
//         bindingType: item.bindingType || "none",
//         lamination: item.lamination || "none",
//         instructions: item.instructions || "",
//         files: item.files || []
//       })),
//       customer: {
//         name: customer.name,
//         phone: customer.phone,
//         address: customer.address || "",
//         pincode: customer.pincode || "",
//         city: customer.city || "",
//         state: customer.state || ""
//       },
//       orderMode: orderMode || "single",
//       deliveryType: deliveryType || "pickup",
//       totalAmount: totalAmount || 0,
//       orderNumber,
//       paymentStatus: 'pending',
//       status: 'pending',
//       cartId: cartId || null
//       // payment field will be added later when payment is created
//     });

//     const savedOrder = await order.save();
//     console.log("✅ Order created:", savedOrder._id, savedOrder.orderNumber);

//     // Clear the cart if cartId is provided
//     if (cartId) {
//       await Cart.findByIdAndDelete(cartId);
//       console.log("Cart cleared:", cartId);
//     }

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       order: {
//         _id: savedOrder._id,
//         orderNumber: savedOrder.orderNumber,
//         totalAmount: savedOrder.totalAmount,
//         items: savedOrder.items,
//         customer: savedOrder.customer,
//         createdAt: savedOrder.createdAt
//       }
//     });

//   } catch (error) {
//     console.error("Error creating order from cart:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create order",
//       error: error.message
//     });
//   }
// };

// // ✅ FIXED: Get all orders with payment details
// export const getOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;
    
//     // CHANGE: populate('payment') not 'paymentId'
//     const orders = await Order.find({ userId })
//       .populate('payment') // ✅ This is correct now
//       .sort({ createdAt: -1 });
    
//     // Transform orders to include payment method
//     const transformedOrders = orders.map(order => {
//       const orderObj = order.toObject();
//       return {
//         ...orderObj,
//         paymentMethod: order.payment?.paymentMethod,
//         razorpayPaymentId: order.payment?.razorpayPaymentId,
//         paymentStatus: order.payment?.status || order.paymentStatus
//       };
//     });
    
//     res.status(200).json({
//       success: true,
//       orders: transformedOrders
//     });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch orders"
//     });
//   }
// };

// // ✅ FIXED: Get single order with payment details
// export const getOrderById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     // CHANGE: populate('payment') not 'paymentId'
//     const order = await Order.findOne({ _id: id, userId })
//       .populate('payment'); // ✅ This is correct now
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }
    
//     // Transform to include payment method
//     const transformedOrder = {
//       ...order.toObject(),
//       paymentMethod: order.payment?.paymentMethod,
//       razorpayPaymentId: order.payment?.razorpayPaymentId,
//       paymentDetails: order.payment
//     };
    
//     res.status(200).json({
//       success: true,
//       order: transformedOrder
//     });
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch order"
//     });
//   }
// };

// // Update order status
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;
//     const userId = req.user.id;
    
//     const order = await Order.findOne({ _id: id, userId });
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }
    
//     order.status = status;
//     await order.save();
    
//     res.status(200).json({
//       success: true,
//       message: "Order status updated",
//       order
//     });
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update order status"
//     });
//   }
// };

// // Cancel order
// export const cancelOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const order = await Order.findOne({ _id: id, userId });
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }
    
//     if (order.status === 'completed') {
//       return res.status(400).json({
//         success: false,
//         message: "Cannot cancel completed order"
//       });
//     }
    
//     if (order.status === 'cancelled') {
//       return res.status(400).json({
//         success: false,
//         message: "Order is already cancelled"
//       });
//     }
    
//     order.status = 'cancelled';
//     await order.save();
    
//     res.status(200).json({
//       success: true,
//       message: "Order cancelled successfully",
//       order
//     });
//   } catch (error) {
//     console.error("Error cancelling order:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to cancel order"
//     });
//   }
// };



// // controllers/orderController.js
// import Order from '../models/Order.js';
// import Cart from '../models/Cart.js';
// import Payment from '../models/Payment.js';
// import { generateOrderNumber } from "../utils/generateOrderNumber.js";
// import {
//   createShipment,
//   generateShippingLabel,
//   registerPickup, 
//    getShipmentStatus,
//   getTrackingHistory
// } from '../services/fshipService.js';

// // ------------------- CREATE ORDER FROM CART -------------------
// export const createOrderFromCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { items, customer, orderMode, deliveryType, totalAmount, cartId } = req.body;

//     // Validation
//     if (!items || !items.length)
//       return res.status(400).json({ success: false, message: "No items in order" });
//     if (!customer || !customer.name || !customer.phone)
//       return res.status(400).json({ success: false, message: "Customer name and phone are required" });

//     // Generate unique order number
//     const orderNumber = await generateOrderNumber();

//     // Map items to ensure defaults
//     const mappedItems = items.map(item => ({
//       pages: item.pages || 0,
//       copies: item.copies || 1,
//       paperSize: item.paperSize || "A4",
//       paperType: item.paperType || "70gsm_normal",
//       printColor: item.printColor || "bw",
//       printSide: item.printSide || "double",
//       bindingType: item.bindingType || "none",
//       lamination: item.lamination || "none",
//       instructions: item.instructions || "",
//       files: item.files || []
//     }));

//     // Create order
//     const order = new Order({
//       userId,
//       items: mappedItems,
//       customer,
//       orderMode: orderMode || "single",
//       deliveryType: deliveryType || "pickup",
//       totalAmount: totalAmount || 0,
//       orderNumber,
//       paymentStatus: 'pending',
//       status: 'pending',
//       cartId: cartId || null,
//       fship: {} // Initialize fship field
//     });

//     const savedOrder = await order.save();

//     // Clear cart if provided
//     if (cartId) await Cart.findByIdAndDelete(cartId);

//     // ------------------- FSHIP INTEGRATION -------------------
//     try {
//       const fshipResponse = await createShipment(savedOrder, process.env.FSHIP_WAREHOUSE_ID);

//       // Generate shipping label
//       const labelResponse = await generateShippingLabel(fshipResponse.waybill);
//       // Register pickup
//       const pickupResponse = await registerPickup([fshipResponse.waybill]);

//       // Save shipment info in order
//       savedOrder.fship = {
//         apiOrderId: fshipResponse.apiOrderId || null,
//         waybill: fshipResponse.waybill || null,
//         courier: fshipResponse.courierName || null,
//         status: fshipResponse.status || "created",
//         labelUrl: labelResponse?.labelUrl || null,
//         pickupStatus: pickupResponse?.status || null
//       };

//       await savedOrder.save();
//       console.log("✅ FShip shipment created:", savedOrder.fship);
//     } catch (fshipError) {
//       console.error("❌ FShip shipment error:", fshipError.response?.data || fshipError.message);
//     }

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       order: savedOrder
//     });

//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ success: false, message: "Failed to create order", error: error.message });
//   }
// };

// // ------------------- GET ALL ORDERS -------------------
// export const getOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const orders = await Order.find({ userId })
//       .populate('payment')
//       .sort({ createdAt: -1 });

//     const transformedOrders = orders.map(order => ({
//       ...order.toObject(),
//       paymentMethod: order.payment?.paymentMethod,
//       razorpayPaymentId: order.payment?.razorpayPaymentId,
//       paymentStatus: order.payment?.status || order.paymentStatus
//     }));

//     res.status(200).json({ success: true, orders: transformedOrders });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch orders" });
//   }
// };

// // ------------------- GET ORDER BY ID -------------------
// export const getOrderById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;

//     const order = await Order.findOne({ _id: id, userId })
//       .populate('payment');

//     if (!order)
//       return res.status(404).json({ success: false, message: "Order not found" });

//     const transformedOrder = {
//       ...order.toObject(),
//       paymentMethod: order.payment?.paymentMethod,
//       razorpayPaymentId: order.payment?.razorpayPaymentId,
//       paymentDetails: order.payment
//     };

//     res.status(200).json({ success: true, order: transformedOrder });
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch order" });
//   }
// };

// // ------------------- UPDATE ORDER STATUS -------------------
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;
//     const userId = req.user.id;

//     const order = await Order.findOne({ _id: id, userId });
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });

//     order.status = status;
//     await order.save();

//     res.status(200).json({ success: true, message: "Order status updated", order });
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     res.status(500).json({ success: false, message: "Failed to update order status" });
//   }
// };

// // ------------------- CANCEL ORDER -------------------
// export const cancelOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;

//     const order = await Order.findOne({ _id: id, userId });
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });

//     if (order.status === 'completed')
//       return res.status(400).json({ success: false, message: "Cannot cancel completed order" });

//     if (order.status === 'cancelled')
//       return res.status(400).json({ success: false, message: "Order is already cancelled" });

//     order.status = 'cancelled';
//     await order.save();

//     res.status(200).json({ success: true, message: "Order cancelled successfully", order });
//   } catch (error) {
//     console.error("Error cancelling order:", error);
//     res.status(500).json({ success: false, message: "Failed to cancel order" });
//   }
// };



// // ------------------- TRACK ORDER BY ORDER NUMBER -------------------
// export const trackOrder = async (req, res) => {
//   try {
//     const { orderNumber } = req.params;
    
//     console.log("=== Track Order Request ===");
//     console.log("Order Number:", orderNumber);
    
//     if (!orderNumber) {
//       return res.status(400).json({
//         success: false,
//         message: "Order number is required"
//       });
//     }
    
//     // Find order by orderNumber
//     const order = await Order.findOne({ orderNumber });
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }
    
//     console.log("Order found:", order.orderNumber);
//     console.log("Delivery Type:", order.deliveryType);
//     console.log("Shipment waybill:", order.fship?.waybill);
    
//     // Prepare basic order info
//     const firstItem = order.items && order.items[0] || {};
    
//     let currentLocation = 'Processing';
//     let expectedDelivery = 'Pending';
//     let courierName = order.fship?.courier || 'Not assigned';
//     let currentStatus = order.status;
//     let trackingHistory = [];
//     let waybill = order.fship?.waybill || null;
    
//     // If shipment exists and has waybill, fetch live tracking
//     if (order.fship?.waybill && order.deliveryType === 'courier') {
//       try {
//         // Get current status from fship
//         const statusResponse = await getShipmentStatus(order.fship.waybill);
        
//         if (statusResponse.status && statusResponse.summary) {
//           currentLocation = statusResponse.summary.location || 'Shipping Hub';
//           expectedDelivery = statusResponse.summary.lastscanned || 'Pending';
//           courierName = statusResponse.summary.fulfilledby || order.fship.courier;
//           currentStatus = statusResponse.summary.status;
//           waybill = order.fship.waybill;
          
//           // Update order with latest tracking info
//           await Order.updateOne(
//             { orderNumber },
//             {
//               $set: {
//                 'fship.status': currentStatus,
//                 'fship.lastUpdated': new Date(),
//                 'fship.trackingData': statusResponse.summary
//               }
//             }
//           );
//         }
        
//         // Get tracking history
//         const historyResponse = await getTrackingHistory(order.fship.waybill);
//         if (historyResponse.status && historyResponse.trackingdata) {
//           trackingHistory = historyResponse.trackingdata.map(scan => ({
//             date: scan.DateandTime,
//             status: scan.Status,
//             location: scan.Location,
//             remark: scan.Remark
//           }));
//         }
//       } catch (error) {
//         console.error("Error fetching tracking from fship:", error.message);
//       }
//     }
    
//     // Map status for frontend display
//     let frontendStatus = 'pending';
//     if (currentStatus === 'Delivered') {
//       frontendStatus = 'completed';
//     } else if (currentStatus === 'Out for Delivery' || currentStatus === 'In Transit') {
//       frontendStatus = 'dispatched';
//     } else if (order.fship?.waybill) {
//       frontendStatus = 'printing';
//     } else if (order.status === 'processing') {
//       frontendStatus = 'confirmed';
//     } else if (order.status === 'completed') {
//       frontendStatus = 'completed';
//     }
    
//     // Calculate estimated ready time (for store pickup)
//     let estimatedReady = 'Pending';
//     if (order.deliveryType === 'pickup') {
//       const createdDate = new Date(order.createdAt);
//       const hoursPassed = (new Date() - createdDate) / (1000 * 60 * 60);
//       if (hoursPassed < 4) {
//         estimatedReady = 'Today by 5:00 PM';
//       } else if (hoursPassed < 24) {
//         estimatedReady = 'Tomorrow by 5:00 PM';
//       } else {
//         estimatedReady = 'Within 2-3 days';
//       }
//     } else {
//       estimatedReady = expectedDelivery;
//     }
    
//     res.status(200).json({
//       success: true,
//       data: {
//         orderId: order.orderNumber,
//         status: frontendStatus,
//         createdAt: order.createdAt.toLocaleString(),
//         estimatedReady: estimatedReady,
//         items: {
//           pages: firstItem.pages || 0,
//           copies: firstItem.copies || 0,
//           paperSize: firstItem.paperSize || 'A4',
//           printColor: firstItem.printColor === 'color' ? 'Color' : 'B&W',
//           bindingType: firstItem.bindingType || 'Perfect Glue'
//         },
//         amount: order.totalAmount,
//         deliveryType: order.deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup',
//         waybill: waybill,
//         courierName: courierName,
//         currentLocation: currentLocation,
//         trackingHistory: trackingHistory
//       },
//       message: "Order tracked successfully"
//     });
    
//   } catch (error) {
//     console.error("Track order error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to track order",
//       error: error.message
//     });
//   }
// };














// // controllers/orderController.js
// import Order from '../models/Order.js';
// import Cart from '../models/Cart.js';
// import Payment from '../models/Payment.js';
// import { generateOrderNumber } from "../utils/generateOrderNumber.js";
// import {
//   createShipment,
//   generateShippingLabel,
//   registerPickup, 
//   getShipmentStatus,
//   getTrackingHistory
// } from '../services/fshipService.js';
// import path from 'path';
// import fs from 'fs';
// import multer from 'multer';
// import crypto from 'crypto';





// // // Ensure uploads directory exists
// // const uploadDir = 'uploads';
// // if (!fs.existsSync(uploadDir)) {
// //   fs.mkdirSync(uploadDir);
// // }

// // // Configure multer for file upload
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, uploadDir);
// //   },
// //   filename: function (req, file, cb) {
// //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// //     cb(null, uniqueSuffix + '-' + file.originalname);
// //   }
// // });

// // const upload = multer({ 
// //   storage: storage,
// //   limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
// // });

// // // Upload file endpoint
// // export const uploadFile = async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ success: false, message: "No file uploaded" });
// //     }
    
// //     // Generate URL for the file
// //     const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
// //     res.json({
// //       success: true,
// //       url: fileUrl,
// //       file: {
// //         name: req.file.originalname,
// //         size: req.file.size,
// //         type: req.file.mimetype,
// //         filename: req.file.filename
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Upload error:', error);
// //     res.status(500).json({ success: false, message: "Upload failed" });
// //   }
// // };

// // export const uploadSingleFile = upload.single('file');


// // Ensure uploads directory exists
// const uploadDir = 'uploads';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     // Generate unique filename with timestamp and random string
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname);
//     cb(null, uniqueSuffix + ext);
//   }
// });

// // File filter to accept only specific file types
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only PDF and images are allowed.'), false);
//   }
// };

// // Configure multer
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
//   fileFilter: fileFilter
// });

// // Upload file endpoint
// export const uploadFile = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }
    
//     // Generate URL for the uploaded file
//     const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
//     res.json({
//       success: true,
//       url: fileUrl,
//       file: {
//         name: req.file.originalname,
//         size: req.file.size,
//         type: req.file.mimetype,
//         filename: req.file.filename,
//         url: fileUrl
//       }
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ success: false, message: "Upload failed" });
//   }
// };

// // Download file by filename
// export const downloadFile = async (req, res) => {
//   try {
//     const { filename } = req.params;
//     const filePath = path.join(uploadDir, filename);
    
//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ success: false, message: "File not found" });
//     }
    
//     res.download(filePath);
//   } catch (error) {
//     console.error('Download error:', error);
//     res.status(500).json({ success: false, message: "Failed to download file" });
//   }
// };

// export const uploadSingleFile = upload.single('file');



// // ------------------- CREATE ORDER FROM CART -------------------
// export const createOrderFromCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { items, customer, orderMode, deliveryType, totalAmount, cartId } = req.body;

//     // Validation
//     if (!items || !items.length)
//       return res.status(400).json({ success: false, message: "No items in order" });
//     if (!customer || !customer.name || !customer.phone)
//       return res.status(400).json({ success: false, message: "Customer name and phone are required" });

//     // Generate unique order number
//     const orderNumber = await generateOrderNumber();

//     // Map items to ensure defaults
//     const mappedItems = items.map(item => ({
//       pages: item.pages || 0,
//       copies: item.copies || 1,
//       paperSize: item.paperSize || "A4",
//       paperType: item.paperType || "70gsm_normal",
//       printColor: item.printColor || "bw",
//       printSide: item.printSide || "double",
//       bindingType: item.bindingType || "none",
//       lamination: item.lamination || "none",
//       instructions: item.instructions || "",
//       files: item.files || []
//     }));

//     // Create order
//     const order = new Order({
//       userId,
//       items: mappedItems,
//       customer,
//       orderMode: orderMode || "single",
//       deliveryType: deliveryType || "pickup",
//       totalAmount: totalAmount || 0,
//       orderNumber,
//       paymentStatus: 'pending',
//       status: 'pending',
//       cartId: cartId || null,
//       fship: {} // Initialize fship field
//     });

//     const savedOrder = await order.save();

//     // Clear cart if provided
//     if (cartId) await Cart.findByIdAndDelete(cartId);

//     // ------------------- FSHIP INTEGRATION (Only for Courier) -------------------
//     if (deliveryType === 'courier') {
//       try {
//         console.log("📦 Creating shipment for courier delivery...");
        
//         const fshipResponse = await createShipment(savedOrder, process.env.FSHIP_WAREHOUSE_ID);
        
//         console.log("FShip Response:", fshipResponse);
        
//         // Generate shipping label
//         let labelUrl = null;
//         if (fshipResponse.waybill) {
//           const labelResponse = await generateShippingLabel(fshipResponse.waybill);
//           labelUrl = labelResponse?.resultDetails?.[fshipResponse.waybill]?.labelUrl || 
//                      labelResponse?.labelUrl || null;
//           console.log("Label URL:", labelUrl);
//         }
        
//         // Register pickup
//         let pickupStatus = null;
//         if (fshipResponse.waybill) {
//           const pickupResponse = await registerPickup([fshipResponse.waybill]);
//           pickupStatus = pickupResponse?.status || null;
//           console.log("Pickup Status:", pickupStatus);
//         }
        
//         // Save shipment info in order
//         savedOrder.fship = {
//           apiOrderId: fshipResponse.apiorderid || null,
//           waybill: fshipResponse.waybill || null,
//           courier: fshipResponse.usedCourier?.name || fshipResponse.courierName || null,
//           status: fshipResponse.order_status === 'success' ? 'Booked' : 'created',
//           labelUrl: labelUrl,
//           pickupStatus: pickupStatus,
//           lastUpdated: new Date()
//         };
        
//         await savedOrder.save();
//         console.log("✅ FShip shipment created:", savedOrder.fship);
        
//       } catch (fshipError) {
//         console.error("❌ FShip shipment error:", fshipError.response?.data || fshipError.message);
//         // Don't fail order creation for shipping errors
//       }
//     } else {
//       console.log("📍 Store pickup order - No shipment created");
//       savedOrder.fship = {
//         status: 'store_pickup',
//         lastUpdated: new Date()
//       };
//       await savedOrder.save();
//     }

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       order: savedOrder
//     });

//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ success: false, message: "Failed to create order", error: error.message });
//   }
// };

// // ------------------- GET ALL ORDERS -------------------
// export const getOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const orders = await Order.find({ userId })
//       .populate('payment')
//       .sort({ createdAt: -1 });

//     const transformedOrders = orders.map(order => ({
//       ...order.toObject(),
//       paymentMethod: order.payment?.paymentMethod,
//       razorpayPaymentId: order.payment?.razorpayPaymentId,
//       paymentStatus: order.payment?.status || order.paymentStatus
//     }));

//     res.status(200).json({ success: true, orders: transformedOrders });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch orders" });
//   }
// };

// // ------------------- GET ORDER BY ID -------------------
// // export const getOrderById = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const userId = req.user.id;

// //     const order = await Order.findOne({ _id: id, userId })
// //       .populate('payment');

// //     if (!order)
// //       return res.status(404).json({ success: false, message: "Order not found" });

// //     const transformedOrder = {
// //       ...order.toObject(),
// //       paymentMethod: order.payment?.paymentMethod,
// //       razorpayPaymentId: order.payment?.razorpayPaymentId,
// //       paymentDetails: order.payment
// //     };

// //     res.status(200).json({ success: true, order: transformedOrder });
// //   } catch (error) {
// //     console.error("Error fetching order:", error);
// //     res.status(500).json({ success: false, message: "Failed to fetch order" });
// //   }
// // };


// export const getOrderById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
//     const userRole = req.user.role; // 👈 make sure this exists in auth middleware

//     let order;

//     // ✅ ADMIN → can access any order
//     if (userRole === "admin") {
//       order = await Order.findById(id).populate('payment');
//     } else {
//       // ✅ NORMAL USER → only their own orders
//       order = await Order.findOne({ _id: id, userId }).populate('payment');
//     }

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }

//     const transformedOrder = {
//       ...order.toObject(),
//       paymentMethod: order.payment?.paymentMethod,
//       razorpayPaymentId: order.payment?.razorpayPaymentId,
//       paymentDetails: order.payment
//     };

//     res.status(200).json({
//       success: true,
//       order: transformedOrder
//     });

//   } catch (error) {
//     console.error("Error fetching order:", error);

//     // 🔥 Handle invalid ObjectId error
//     if (error.name === "CastError") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid order ID"
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch order"
//     });
//   }
// };

// // ------------------- UPDATE ORDER STATUS -------------------
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;
//     const userId = req.user.id;

//     const order = await Order.findOne({ _id: id, userId });
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });

//     order.status = status;
//     await order.save();

//     res.status(200).json({ success: true, message: "Order status updated", order });
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     res.status(500).json({ success: false, message: "Failed to update order status" });
//   }
// };

// // ------------------- CANCEL ORDER -------------------
// export const cancelOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;

//     const order = await Order.findOne({ _id: id, userId });
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });

//     if (order.status === 'completed')
//       return res.status(400).json({ success: false, message: "Cannot cancel completed order" });

//     if (order.status === 'cancelled')
//       return res.status(400).json({ success: false, message: "Order is already cancelled" });

//     order.status = 'cancelled';
//     await order.save();

//     res.status(200).json({ success: true, message: "Order cancelled successfully", order });
//   } catch (error) {
//     console.error("Error cancelling order:", error);
//     res.status(500).json({ success: false, message: "Failed to cancel order" });
//   }
// };

// // ------------------- TRACK ORDER BY ORDER NUMBER -------------------
// // controllers/orderController.js - Fix the trackOrder function

// export const trackOrder = async (req, res) => {
//   try {
//     // Get the encoded order number from URL and decode it
//     const encodedOrderNumber = req.params.orderNumber;
//     const orderNumber = decodeURIComponent(encodedOrderNumber);
    
//     console.log("=== Track Order Request ===");
//     console.log("Encoded:", encodedOrderNumber);
//     console.log("Decoded:", orderNumber);
    
//     if (!orderNumber) {
//       return res.status(400).json({
//         success: false,
//         message: "Order number is required"
//       });
//     }
    
//     // Find order by orderNumber (using decoded value)
//     const order = await Order.findOne({ orderNumber: orderNumber });
    
//     console.log("Order found:", order ? "YES" : "NO");
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }
    
//     // Prepare basic order info
//     const firstItem = order.items && order.items[0] || {};
    
//     let currentLocation = 'Processing';
//     let expectedDelivery = 'Pending';
//     let courierName = order.fship?.courier || 'Not assigned';
//     let currentStatus = order.status;
//     let trackingHistory = [];
//     let waybill = order.fship?.waybill || null;
    
//     // If shipment exists and has waybill, fetch live tracking
//     if (order.fship?.waybill && order.deliveryType === 'courier') {
//       try {
//         const statusResponse = await getShipmentStatus(order.fship.waybill);
        
//         if (statusResponse.status && statusResponse.summary) {
//           currentLocation = statusResponse.summary.location || 'Shipping Hub';
//           expectedDelivery = statusResponse.summary.lastscanned || 'Pending';
//           courierName = statusResponse.summary.fulfilledby || order.fship.courier;
//           currentStatus = statusResponse.summary.status;
//           waybill = order.fship.waybill;
//         }
        
//         const historyResponse = await getTrackingHistory(order.fship.waybill);
//         if (historyResponse.status && historyResponse.trackingdata) {
//           trackingHistory = historyResponse.trackingdata.map(scan => ({
//             date: scan.DateandTime,
//             status: scan.Status,
//             location: scan.Location,
//             remark: scan.Remark
//           }));
//         }
//       } catch (error) {
//         console.error("Error fetching tracking:", error.message);
//       }
//     }
    
//     // Map status for frontend display
//     let frontendStatus = 'pending';
//     if (currentStatus === 'Delivered') {
//       frontendStatus = 'completed';
//     } else if (currentStatus === 'Out for Delivery' || currentStatus === 'In Transit') {
//       frontendStatus = 'dispatched';
//     } else if (order.fship?.waybill) {
//       frontendStatus = 'printing';
//     } else if (order.status === 'processing') {
//       frontendStatus = 'confirmed';
//     } else if (order.status === 'completed') {
//       frontendStatus = 'completed';
//     }
    
//     // Calculate estimated ready time
//     let estimatedReady = 'Pending';
//     if (order.deliveryType === 'pickup') {
//       const createdDate = new Date(order.createdAt);
//       const hoursPassed = (new Date() - createdDate) / (1000 * 60 * 60);
//       if (hoursPassed < 4) {
//         estimatedReady = 'Today by 5:00 PM';
//       } else if (hoursPassed < 24) {
//         estimatedReady = 'Tomorrow by 5:00 PM';
//       } else {
//         estimatedReady = 'Within 2-3 days';
//       }
//     } else {
//       estimatedReady = expectedDelivery;
//     }
    
//     res.status(200).json({
//       success: true,
//       data: {
//         orderId: order.orderNumber,
//         status: frontendStatus,
//         createdAt: order.createdAt.toLocaleString(),
//         estimatedReady: estimatedReady,
//         items: {
//           pages: firstItem.pages || 0,
//           copies: firstItem.copies || 0,
//           paperSize: firstItem.paperSize || 'A4',
//           printColor: firstItem.printColor === 'color' ? 'Color' : 'B&W',
//           bindingType: firstItem.bindingType || 'Perfect Glue'
//         },
//         amount: order.totalAmount,
//         deliveryType: order.deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup',
//         waybill: waybill,
//         courierName: courierName,
//         currentLocation: currentLocation,
//         trackingHistory: trackingHistory
//       },
//       message: "Order tracked successfully"
//     });
    
//   } catch (error) {
//     console.error("Track order error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to track order",
//       error: error.message
//     });
//   }
// };



// // Update payment status
// export const updatePaymentStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { paymentStatus } = req.body;
    
//     const order = await Order.findById(id);
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }
    
//     order.paymentStatus = paymentStatus;
//     await order.save();
    
//     res.status(200).json({
//       success: true,
//       message: "Payment status updated",
//       order
//     });
//   } catch (error) {
//     console.error("Error updating payment status:", error);
//     res.status(500).json({ success: false, message: "Failed to update payment status" });
//   }
// };












// import Order from '../models/Order.js';
// import Cart from '../models/Cart.js';
// import Payment from '../models/Payment.js';
// import { generateOrderNumber } from "../utils/generateOrderNumber.js";
// import {
//   createShipment,
//   generateShippingLabel,
//   registerPickup, 
//   getShipmentStatus,
//   getTrackingHistory
// } from '../services/fshipService.js';
// import path from 'path';
// import fs from 'fs';
// import multer from 'multer';

// // Ensure uploads directory exists
// const uploadDir = 'uploads';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname);
//     cb(null, uniqueSuffix + ext);
//   }
// });

// // File filter to accept only specific file types
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only PDF and images are allowed.'), false);
//   }
// };

// // Configure multer
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
//   fileFilter: fileFilter
// });

// // Upload file endpoint
// export const uploadFile = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }
    
//     const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
//     res.json({
//       success: true,
//       url: fileUrl,
//       file: {
//         name: req.file.originalname,
//         size: req.file.size,
//         type: req.file.mimetype,
//         filename: req.file.filename,
//         url: fileUrl
//       }
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ success: false, message: "Upload failed" });
//   }
// };

// // Download file by filename
// export const downloadFile = async (req, res) => {
//   try {
//     const { filename } = req.params;
//     const filePath = path.join(uploadDir, filename);
    
//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ success: false, message: "File not found" });
//     }
    
//     res.download(filePath);
//   } catch (error) {
//     console.error('Download error:', error);
//     res.status(500).json({ success: false, message: "Failed to download file" });
//   }
// };

// export const uploadSingleFile = upload.single('file');

// // ------------------- CREATE ORDER FROM CART -------------------
// export const createOrderFromCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { items, customer, orderMode, deliveryType, totalAmount, cartId } = req.body;

//     if (!items || !items.length)
//       return res.status(400).json({ success: false, message: "No items in order" });
//     if (!customer || !customer.name || !customer.phone)
//       return res.status(400).json({ success: false, message: "Customer name and phone are required" });

//     const orderNumber = await generateOrderNumber();

//     const mappedItems = items.map(item => ({
//       pages: item.pages || 0,
//       copies: item.copies || 1,
//       paperSize: item.paperSize || "A4",
//       paperType: item.paperType || "70gsm_normal",
//       printColor: item.printColor || "bw",
//       printSide: item.printSide || "double",
//       bindingType: item.bindingType || "none",
//       lamination: item.lamination || "none",
//       instructions: item.instructions || "",
//       files: item.files || []
//     }));

//     const order = new Order({
//       userId,
//       items: mappedItems,
//       customer,
//       orderMode: orderMode || "single",
//       deliveryType: deliveryType || "pickup",
//       totalAmount: totalAmount || 0,
//       orderNumber,
//       paymentStatus: 'pending',
//       status: 'pending',
//       cartId: cartId || null,
//       fship: {}
//     });

//     const savedOrder = await order.save();

//     if (cartId) await Cart.findByIdAndDelete(cartId);

//     if (deliveryType === 'courier') {
//       try {
//         console.log("📦 Creating shipment for courier delivery...");
//         const fshipResponse = await createShipment(savedOrder, process.env.FSHIP_WAREHOUSE_ID);
        
//         let labelUrl = null;
//         if (fshipResponse.waybill) {
//           const labelResponse = await generateShippingLabel(fshipResponse.waybill);
//           labelUrl = labelResponse?.resultDetails?.[fshipResponse.waybill]?.labelUrl || 
//                      labelResponse?.labelUrl || null;
//         }
        
//         let pickupStatus = null;
//         if (fshipResponse.waybill) {
//           const pickupResponse = await registerPickup([fshipResponse.waybill]);
//           pickupStatus = pickupResponse?.status || null;
//         }
        
//         savedOrder.fship = {
//           apiOrderId: fshipResponse.apiorderid || null,
//           waybill: fshipResponse.waybill || null,
//           courier: fshipResponse.usedCourier?.name || fshipResponse.courierName || null,
//           status: fshipResponse.order_status === 'success' ? 'Booked' : 'created',
//           labelUrl: labelUrl,
//           pickupStatus: pickupStatus,
//           lastUpdated: new Date()
//         };
        
//         await savedOrder.save();
//         console.log("✅ FShip shipment created:", savedOrder.fship);
//       } catch (fshipError) {
//         console.error("❌ FShip shipment error:", fshipError.response?.data || fshipError.message);
//       }
//     } else {
//       console.log("📍 Store pickup order - No shipment created");
//       savedOrder.fship = { status: 'store_pickup', lastUpdated: new Date() };
//       await savedOrder.save();
//     }

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       order: savedOrder
//     });

//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ success: false, message: "Failed to create order", error: error.message });
//   }
// };

// // ------------------- GET ALL ORDERS (User's own orders) -------------------
// export const getOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const orders = await Order.find({ userId })
//       .populate('payment')
//       .sort({ createdAt: -1 });

//     const transformedOrders = orders.map(order => ({
//       ...order.toObject(),
//       paymentMethod: order.payment?.paymentMethod,
//       razorpayPaymentId: order.payment?.razorpayPaymentId,
//       paymentStatus: order.payment?.status || order.paymentStatus
//     }));

//     res.status(200).json({ success: true, orders: transformedOrders });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch orders" });
//   }
// };

// // ------------------- GET ORDER BY ID -------------------
// export const getOrderById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
//     const userRole = req.user.role;

//     console.log('=== GET ORDER BY ID ===');
//     console.log('Order ID:', id);
//     console.log('User Role:', userRole);

//     let order;

//     // ✅ ADMIN → can access any order
//     if (userRole === "admin") {
//       order = await Order.findById(id).populate('payment');
//     } else {
//       // ✅ NORMAL USER → only their own orders
//       order = await Order.findOne({ _id: id, userId }).populate('payment');
//     }

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }

//     const transformedOrder = {
//       ...order.toObject(),
//       paymentMethod: order.payment?.paymentMethod,
//       razorpayPaymentId: order.payment?.razorpayPaymentId,
//       paymentDetails: order.payment
//     };

//     res.status(200).json({
//       success: true,
//       order: transformedOrder
//     });

//   } catch (error) {
//     console.error("Error fetching order:", error);

//     if (error.name === "CastError") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid order ID"
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch order"
//     });
//   }
// };

// // ------------------- UPDATE ORDER STATUS -------------------


// // ------------------- UPDATE ORDER STATUS -------------------
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;
//     const userId = req.user.id;
//     const userRole = req.user.role;

//     console.log('=== UPDATE ORDER STATUS ===');
//     console.log('Order ID:', id);
//     console.log('New Status:', status);
//     console.log('User ID:', userId);
//     console.log('User Role:', userRole);

//     // ✅ Validate status against all possible statuses
//     const validStatuses = ['pending', 'processing', 'printing', 'ready', 'dispatched', 'completed', 'cancelled'];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
//       });
//     }

//     // ✅ Check if order exists and user has permission
//     let order;
//     if (userRole === 'admin') {
//       order = await Order.findById(id);
//     } else {
//       order = await Order.findOne({ _id: id, userId });
//     }

//     if (!order) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Order not found" 
//       });
//     }

//     // ✅ Check if order is already cancelled
//     if (order.status === 'cancelled') {
//       return res.status(400).json({
//         success: false,
//         message: "Cannot update status of cancelled order"
//       });
//     }

//     // ✅ Update the status
//     const oldStatus = order.status;
//     order.status = status;
    
//     // Add status history if you want to track changes
//     if (!order.statusHistory) {
//       order.statusHistory = [];
//     }
//     order.statusHistory.push({
//       status: status,
//       changedBy: userId,
//       changedAt: new Date(),
//       note: `Status changed from ${oldStatus} to ${status}`
//     });
    
//     await order.save();

//     console.log('✅ Order status updated successfully from', oldStatus, 'to', status);

//     // 🚀 BROADCAST REAL-TIME UPDATE VIA WEBSOCKET
//     try {
//       // Get the broadcast function from app settings
//       const broadcastOrderUpdate = req.app.get('broadcastOrderUpdate');
      
//       if (broadcastOrderUpdate) {
//         // Broadcast using orderNumber (this is what customers see in tracking page)
//         broadcastOrderUpdate(order.orderNumber, status);
//         console.log(`📡 Broadcasted status update for order: ${order.orderNumber} (${oldStatus} → ${status})`);
//       } else {
//         console.warn('⚠️ broadcastOrderUpdate function not found in app settings');
//       }
//     } catch (broadcastError) {
//       console.error('❌ Error broadcasting WebSocket update:', broadcastError);
//       // Don't fail the request if broadcasting fails
//     }

//     res.status(200).json({ 
//       success: true, 
//       message: `Order status updated from ${oldStatus} to ${status}`, 
//       order 
//     });
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to update order status",
//       error: error.message 
//     });
//   }
// };
// // controllers/orderController.js - Update the updateOrderStatus function

// // export const updateOrderStatus = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { status } = req.body;
// //     const userId = req.user.id;
// //     const userRole = req.user.role;

// //     console.log('=== UPDATE ORDER STATUS ===');
// //     console.log('Order ID:', id);
// //     console.log('New Status:', status);
// //     console.log('User ID:', userId);
// //     console.log('User Role:', userRole);

// //     // ✅ Validate status against all possible statuses
// //     const validStatuses = ['pending', 'processing', 'printing', 'ready', 'dispatched', 'completed', 'cancelled'];
// //     if (!validStatuses.includes(status)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
// //       });
// //     }

// //     // ✅ Check if order exists and user has permission
// //     let order;
// //     if (userRole === 'admin') {
// //       order = await Order.findById(id);
// //     } else {
// //       order = await Order.findOne({ _id: id, userId });
// //     }

// //     if (!order) {
// //       return res.status(404).json({ 
// //         success: false, 
// //         message: "Order not found" 
// //       });
// //     }

// //     // ✅ Check if order is already cancelled
// //     if (order.status === 'cancelled') {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Cannot update status of cancelled order"
// //       });
// //     }

// //     // ✅ Update the status
// //     const oldStatus = order.status;
// //     order.status = status;
    
// //     // Add status history if you want to track changes
// //     if (!order.statusHistory) {
// //       order.statusHistory = [];
// //     }
// //     order.statusHistory.push({
// //       status: status,
// //       changedBy: userId,
// //       changedAt: new Date(),
// //       note: `Status changed from ${oldStatus} to ${status}`
// //     });
    
// //     await order.save();

// //     console.log('✅ Order status updated successfully from', oldStatus, 'to', status);

// //     res.status(200).json({ 
// //       success: true, 
// //       message: `Order status updated from ${oldStatus} to ${status}`, 
// //       order 
// //     });
// //   } catch (error) {
// //     console.error("Error updating order status:", error);
// //     res.status(500).json({ 
// //       success: false, 
// //       message: "Failed to update order status",
// //       error: error.message 
// //     });
// //   }
// // };



// // export const updateOrderStatus = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { status } = req.body;
// //     const userId = req.user.id;
// //     const userRole = req.user.role;

// //     console.log('=== UPDATE ORDER STATUS ===');
// //     console.log('Order ID:', id);
// //     console.log('New Status:', status);
// //     console.log('User ID:', userId);
// //     console.log('User Role:', userRole);

// //     // ✅ ADMIN → can update any order
// //     // ✅ REGULAR USER → can only update their own orders
// //     let order;
// //     if (userRole === 'admin') {
// //       order = await Order.findById(id);
// //     } else {
// //       order = await Order.findOne({ _id: id, userId });
// //     }

// //     if (!order) {
// //       return res.status(404).json({ 
// //         success: false, 
// //         message: "Order not found" 
// //       });
// //     }

// //     // Validate status
// //     const validStatuses = ['pending', 'processing', 'printing', 'ready', 'dispatched', 'completed', 'cancelled'];
// //     if (!validStatuses.includes(status)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
// //       });
// //     }

// //     order.status = status;
// //     await order.save();

// //     console.log('✅ Order status updated successfully');

// //     res.status(200).json({ 
// //       success: true, 
// //       message: "Order status updated", 
// //       order 
// //     });
// //   } catch (error) {
// //     console.error("Error updating order status:", error);
// //     res.status(500).json({ 
// //       success: false, 
// //       message: "Failed to update order status",
// //       error: error.message 
// //     });
// //   }
// // };

// // ------------------- CANCEL ORDER -------------------
// export const cancelOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
//     const userRole = req.user.role;

//     console.log('=== CANCEL ORDER ===');
//     console.log('Order ID:', id);
//     console.log('User Role:', userRole);

//     // ✅ ADMIN → can cancel any order
//     // ✅ REGULAR USER → can only cancel their own orders
//     let order;
//     if (userRole === 'admin') {
//       order = await Order.findById(id);
//     } else {
//       order = await Order.findOne({ _id: id, userId });
//     }

//     if (!order) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Order not found" 
//       });
//     }

//     if (order.status === 'completed') {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Cannot cancel completed order" 
//       });
//     }

//     if (order.status === 'cancelled') {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Order is already cancelled" 
//       });
//     }

//     order.status = 'cancelled';
//     await order.save();

//     console.log('✅ Order cancelled successfully');

//     res.status(200).json({ 
//       success: true, 
//       message: "Order cancelled successfully", 
//       order 
//     });
//   } catch (error) {
//     console.error("Error cancelling order:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to cancel order",
//       error: error.message 
//     });
//   }
// };

// // ------------------- UPDATE PAYMENT STATUS -------------------
// export const updatePaymentStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { paymentStatus } = req.body;
//     const userRole = req.user.role;

//     console.log('=== UPDATE PAYMENT STATUS ===');
//     console.log('Order ID:', id);
//     console.log('New Payment Status:', paymentStatus);
//     console.log('User Role:', userRole);

//     // Only admin can update payment status
//     if (userRole !== 'admin') {
//       return res.status(403).json({
//         success: false,
//         message: "Only admin can update payment status"
//       });
//     }
    
//     const order = await Order.findById(id);
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }
    
//     const validStatuses = ['pending', 'paid', 'failed', 'refunded'];
//     if (!validStatuses.includes(paymentStatus)) {
//       return res.status(400).json({
//         success: false,
//         message: `Invalid payment status. Must be one of: ${validStatuses.join(', ')}`
//       });
//     }
    
//     order.paymentStatus = paymentStatus;
//     await order.save();
    
//     res.status(200).json({
//       success: true,
//       message: "Payment status updated",
//       order
//     });
//   } catch (error) {
//     console.error("Error updating payment status:", error);
//     res.status(500).json({ success: false, message: "Failed to update payment status" });
//   }
// };

// // ------------------- TRACK ORDER BY ORDER NUMBER -------------------
// export const trackOrder = async (req, res) => {
//   try {
//     const encodedOrderNumber = req.params.orderNumber;
//     const orderNumber = decodeURIComponent(encodedOrderNumber);
    
//     console.log("=== Track Order Request ===");
//     console.log("Encoded:", encodedOrderNumber);
//     console.log("Decoded:", orderNumber);
    
//     if (!orderNumber) {
//       return res.status(400).json({
//         success: false,
//         message: "Order number is required"
//       });
//     }
    
//     const order = await Order.findOne({ orderNumber: orderNumber });
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }
    
//     const firstItem = order.items && order.items[0] || {};
    
//     let currentLocation = 'Processing';
//     let expectedDelivery = 'Pending';
//     let courierName = order.fship?.courier || 'Not assigned';
//     let currentStatus = order.status;
//     let trackingHistory = [];
//     let waybill = order.fship?.waybill || null;
    
//     if (order.fship?.waybill && order.deliveryType === 'courier') {
//       try {
//         const statusResponse = await getShipmentStatus(order.fship.waybill);
        
//         if (statusResponse.status && statusResponse.summary) {
//           currentLocation = statusResponse.summary.location || 'Shipping Hub';
//           expectedDelivery = statusResponse.summary.lastscanned || 'Pending';
//           courierName = statusResponse.summary.fulfilledby || order.fship.courier;
//           currentStatus = statusResponse.summary.status;
//           waybill = order.fship.waybill;
//         }
        
//         const historyResponse = await getTrackingHistory(order.fship.waybill);
//         if (historyResponse.status && historyResponse.trackingdata) {
//           trackingHistory = historyResponse.trackingdata.map(scan => ({
//             date: scan.DateandTime,
//             status: scan.Status,
//             location: scan.Location,
//             remark: scan.Remark
//           }));
//         }
//       } catch (error) {
//         console.error("Error fetching tracking:", error.message);
//       }
//     }
    
//     let frontendStatus = 'pending';
//     if (currentStatus === 'Delivered') {
//       frontendStatus = 'completed';
//     } else if (currentStatus === 'Out for Delivery' || currentStatus === 'In Transit') {
//       frontendStatus = 'dispatched';
//     } else if (order.fship?.waybill) {
//       frontendStatus = 'printing';
//     } else if (order.status === 'processing') {
//       frontendStatus = 'confirmed';
//     } else if (order.status === 'completed') {
//       frontendStatus = 'completed';
//     }
    
//     let estimatedReady = 'Pending';
//     if (order.deliveryType === 'pickup') {
//       const createdDate = new Date(order.createdAt);
//       const hoursPassed = (new Date() - createdDate) / (1000 * 60 * 60);
//       if (hoursPassed < 4) {
//         estimatedReady = 'Today by 5:00 PM';
//       } else if (hoursPassed < 24) {
//         estimatedReady = 'Tomorrow by 5:00 PM';
//       } else {
//         estimatedReady = 'Within 2-3 days';
//       }
//     } else {
//       estimatedReady = expectedDelivery;
//     }
    
//     res.status(200).json({
//       success: true,
//       data: {
//         orderId: order.orderNumber,
//         status: frontendStatus,
//         createdAt: order.createdAt.toLocaleString(),
//         estimatedReady: estimatedReady,
//         items: {
//           pages: firstItem.pages || 0,
//           copies: firstItem.copies || 0,
//           paperSize: firstItem.paperSize || 'A4',
//           printColor: firstItem.printColor === 'color' ? 'Color' : 'B&W',
//           bindingType: firstItem.bindingType || 'Perfect Glue'
//         },
//         amount: order.totalAmount,
//         deliveryType: order.deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup',
//         waybill: waybill,
//         courierName: courierName,
//         currentLocation: currentLocation,
//         trackingHistory: trackingHistory
//       },
//       message: "Order tracked successfully"
//     });
    
//   } catch (error) {
//     console.error("Track order error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to track order",
//       error: error.message
//     });
//   }
// };
















// import Order from '../models/Order.js';
// import Cart from '../models/Cart.js';
// import Payment from '../models/Payment.js';
// import { generateOrderNumber } from "../utils/generateOrderNumber.js";
// import {
//   createShipment,
//   generateShippingLabel,
//   registerPickup, 
//   getShipmentStatus,
//   getTrackingHistory
// } from '../services/fshipService.js';
// import path from 'path';
// import fs from 'fs';
// import multer from 'multer';

// // Ensure uploads directory exists
// const uploadDir = 'uploads';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname);
//     cb(null, uniqueSuffix + ext);
//   }
// });

// // File filter to accept only specific file types
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only PDF and images are allowed.'), false);
//   }
// };

// // Configure multer
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
//   fileFilter: fileFilter
// });

// // Upload file endpoint
// export const uploadFile = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }
    
//     const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
//     res.json({
//       success: true,
//       url: fileUrl,
//       file: {
//         name: req.file.originalname,
//         size: req.file.size,
//         type: req.file.mimetype,
//         filename: req.file.filename,
//         url: fileUrl
//       }
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ success: false, message: "Upload failed" });
//   }
// };

// // Download file by filename
// export const downloadFile = async (req, res) => {
//   try {
//     const { filename } = req.params;
//     const filePath = path.join(uploadDir, filename);
    
//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ success: false, message: "File not found" });
//     }
    
//     res.download(filePath);
//   } catch (error) {
//     console.error('Download error:', error);
//     res.status(500).json({ success: false, message: "Failed to download file" });
//   }
// };

// export const uploadSingleFile = upload.single('file');

// // ------------------- CREATE ORDER FROM CART -------------------
// export const createOrderFromCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { items, customer, orderMode, deliveryType, totalAmount, cartId, paymentMode } = req.body;

//     if (!items || !items.length)
//       return res.status(400).json({ success: false, message: "No items in order" });
//     if (!customer || !customer.name || !customer.phone)
//       return res.status(400).json({ success: false, message: "Customer name and phone are required" });

//     const orderNumber = await generateOrderNumber();

//     const mappedItems = items.map(item => ({
//       pages: item.pages || 0,
//       copies: item.copies || 1,
//       paperSize: item.paperSize || "A4",
//       paperType: item.paperType || "70gsm_normal",
//       printColor: item.printColor || "bw",
//       printSide: item.printSide || "double",
//       bindingType: item.bindingType || "none",
//       lamination: item.lamination || "none",
//       instructions: item.instructions || "",
//       files: item.files || []
//     }));

//     const order = new Order({
//       userId,
//       items: mappedItems,
//       customer,
//       orderMode: orderMode || "single",
//       deliveryType: deliveryType || "pickup",
//       totalAmount: totalAmount || 0,
//       orderNumber,
//       paymentStatus: 'pending',
//       paymentMode: paymentMode || 'cod', // Add payment mode
//       status: 'pending',
//       cartId: cartId || null,
//       fship: {}
//     });

//     const savedOrder = await order.save();

//     if (cartId) await Cart.findByIdAndDelete(cartId);

//     if (deliveryType === 'courier') {
//       try {
//         console.log("📦 Creating shipment for courier delivery...");
//         const fshipResponse = await createShipment(savedOrder, process.env.FSHIP_WAREHOUSE_ID);
        
//         let labelUrl = null;
//         if (fshipResponse.waybill) {
//           const labelResponse = await generateShippingLabel(fshipResponse.waybill);
//           labelUrl = labelResponse?.resultDetails?.[fshipResponse.waybill]?.labelUrl || 
//                      labelResponse?.labelUrl || null;
//         }
        
//         let pickupStatus = null;
//         if (fshipResponse.waybill) {
//           const pickupResponse = await registerPickup([fshipResponse.waybill]);
//           pickupStatus = pickupResponse?.status || null;
//         }
        
//         savedOrder.fship = {
//           apiOrderId: fshipResponse.apiorderid || null,
//           waybill: fshipResponse.waybill || null,
//           courier: fshipResponse.usedCourier?.name || fshipResponse.courierName || null,
//           status: fshipResponse.order_status === 'success' ? 'Booked' : 'created',
//           labelUrl: labelUrl,
//           pickupStatus: pickupStatus,
//           lastUpdated: new Date()
//         };
        
//         await savedOrder.save();
//         console.log("✅ FShip shipment created:", savedOrder.fship);
//       } catch (fshipError) {
//         console.error("❌ FShip shipment error:", fshipError.response?.data || fshipError.message);
//       }
//     } else {
//       console.log("📍 Store pickup order - No shipment created");
//       savedOrder.fship = { status: 'store_pickup', lastUpdated: new Date() };
//       await savedOrder.save();
//     }

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       order: savedOrder
//     });

//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ success: false, message: "Failed to create order", error: error.message });
//   }
// };

// // ------------------- GET ALL ORDERS (User's own orders) -------------------
// export const getOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const orders = await Order.find({ userId })
//       .populate('payment')
//       .sort({ createdAt: -1 });

//     const transformedOrders = orders.map(order => ({
//       ...order.toObject(),
//       paymentMethod: order.payment?.paymentMethod,
//       razorpayPaymentId: order.payment?.razorpayPaymentId || order.razorpayPaymentId,
//       paymentStatus: order.payment?.status || order.paymentStatus,
//       paymentMode: order.paymentMode || order.payment?.paymentMethod || 'cod' // Include payment mode
//     }));

//     res.status(200).json({ success: true, orders: transformedOrders });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch orders" });
//   }
// };

// // ------------------- GET ORDER BY ID -------------------
// export const getOrderById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
//     const userRole = req.user.role;

//     console.log('=== GET ORDER BY ID ===');
//     console.log('Order ID:', id);
//     console.log('User Role:', userRole);

//     let order;

//     // ✅ ADMIN → can access any order
//     if (userRole === "admin") {
//       order = await Order.findById(id).populate('payment');
//     } else {
//       // ✅ NORMAL USER → only their own orders
//       order = await Order.findOne({ _id: id, userId }).populate('payment');
//     }

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }

//     const transformedOrder = {
//       ...order.toObject(),
//       paymentMethod: order.payment?.paymentMethod,
//       razorpayPaymentId: order.payment?.razorpayPaymentId || order.razorpayPaymentId,
//       paymentDetails: order.payment,
//       paymentMode: order.paymentMode || order.payment?.paymentMethod || 'cod' // Include payment mode
//     };

//     res.status(200).json({
//       success: true,
//       order: transformedOrder
//     });

//   } catch (error) {
//     console.error("Error fetching order:", error);

//     if (error.name === "CastError") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid order ID"
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch order"
//     });
//   }
// };

// // ------------------- UPDATE ORDER STATUS -------------------
// // In updateOrderStatus function, ensure the broadcast is using orderNumber
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;
//     const userId = req.user.id;
//     const userRole = req.user.role;

//     console.log('=== UPDATE ORDER STATUS ===');
//     console.log('Order ID:', id);
//     console.log('New Status:', status);
//     console.log('User ID:', userId);
//     console.log('User Role:', userRole);

//     // ✅ Validate status against all possible statuses
//     const validStatuses = ['pending', 'processing', 'printing', 'ready', 'dispatched', 'completed', 'cancelled'];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
//       });
//     }

//     // ✅ Check if order exists and user has permission
//     let order;
//     if (userRole === 'admin') {
//       order = await Order.findById(id);
//     } else {
//       order = await Order.findOne({ _id: id, userId });
//     }

//     if (!order) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Order not found" 
//       });
//     }

//     // ✅ Check if order is already cancelled
//     if (order.status === 'cancelled') {
//       return res.status(400).json({
//         success: false,
//         message: "Cannot update status of cancelled order"
//       });
//     }

//     // ✅ Update the status
//     const oldStatus = order.status;
//     order.status = status;
    
//     // Add status history if you want to track changes
//     if (!order.statusHistory) {
//       order.statusHistory = [];
//     }
//     order.statusHistory.push({
//       status: status,
//       changedBy: userId,
//       changedAt: new Date(),
//       note: `Status changed from ${oldStatus} to ${status}`
//     });
    
//     await order.save();

//     console.log('✅ Order status updated successfully from', oldStatus, 'to', status);

//     // 🚀 BROADCAST REAL-TIME UPDATE VIA WEBSOCKET
//     try {
//       const broadcastOrderUpdate = req.app.get('broadcastOrderUpdate');
      
//       if (broadcastOrderUpdate) {
//         // Broadcast using orderNumber (this is what customers see in tracking page)
//         console.log(`📡 Attempting to broadcast for order number: ${order.orderNumber}`);
//         broadcastOrderUpdate(order.orderNumber, status);
//         console.log(`📡 Broadcasted status update for order: ${order.orderNumber} (${oldStatus} → ${status})`);
//       } else {
//         console.warn('⚠️ broadcastOrderUpdate function not found in app settings');
//       }
//     } catch (broadcastError) {
//       console.error('❌ Error broadcasting WebSocket update:', broadcastError);
//     }

//     res.status(200).json({ 
//       success: true, 
//       message: `Order status updated from ${oldStatus} to ${status}`, 
//       order 
//     });
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to update order status",
//       error: error.message 
//     });
//   }
// };

// // ------------------- CANCEL ORDER -------------------
// export const cancelOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
//     const userRole = req.user.role;

//     console.log('=== CANCEL ORDER ===');
//     console.log('Order ID:', id);
//     console.log('User Role:', userRole);

//     let order;
//     if (userRole === 'admin') {
//       order = await Order.findById(id);
//     } else {
//       order = await Order.findOne({ _id: id, userId });
//     }

//     if (!order) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Order not found" 
//       });
//     }

//     if (order.status === 'completed') {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Cannot cancel completed order" 
//       });
//     }

//     if (order.status === 'cancelled') {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Order is already cancelled" 
//       });
//     }

//     order.status = 'cancelled';
//     await order.save();

//     console.log('✅ Order cancelled successfully');

//     res.status(200).json({ 
//       success: true, 
//       message: "Order cancelled successfully", 
//       order 
//     });
//   } catch (error) {
//     console.error("Error cancelling order:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to cancel order",
//       error: error.message 
//     });
//   }
// };

// // ------------------- UPDATE PAYMENT STATUS -------------------
// export const updatePaymentStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { paymentStatus, paymentMode, paymentId, razorpayPaymentId } = req.body;
//     const userRole = req.user.role;

//     console.log('=== UPDATE PAYMENT STATUS ===');
//     console.log('Order ID:', id);
//     console.log('New Payment Status:', paymentStatus);
//     console.log('Payment Mode:', paymentMode);
//     console.log('User Role:', userRole);

//     // Only admin can update payment status
//     if (userRole !== 'admin') {
//       return res.status(403).json({
//         success: false,
//         message: "Only admin can update payment status"
//       });
//     }
    
//     const order = await Order.findById(id);
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }
    
//     const validStatuses = ['pending', 'paid', 'failed', 'refunded'];
//     if (!validStatuses.includes(paymentStatus)) {
//       return res.status(400).json({
//         success: false,
//         message: `Invalid payment status. Must be one of: ${validStatuses.join(', ')}`
//       });
//     }
    
//     // Update payment fields
//     order.paymentStatus = paymentStatus;
//     if (paymentMode) order.paymentMode = paymentMode;
//     if (paymentId) order.paymentId = paymentId;
//     if (razorpayPaymentId) order.razorpayPaymentId = razorpayPaymentId;
    
//     await order.save();
    
//     res.status(200).json({
//       success: true,
//       message: "Payment status updated",
//       order: {
//         ...order.toObject(),
//         paymentMode: order.paymentMode,
//         paymentId: order.paymentId,
//         razorpayPaymentId: order.razorpayPaymentId
//       }
//     });
//   } catch (error) {
//     console.error("Error updating payment status:", error);
//     res.status(500).json({ success: false, message: "Failed to update payment status" });
//   }
// };

// // ------------------- HANDLE PAYMENT SUCCESS (Webhook) -------------------
// export const handlePaymentSuccess = async (req, res) => {
//   try {
//     const { orderId, paymentId, paymentMode, razorpayPaymentId, razorpayOrderId } = req.body;
    
//     if (!orderId) {
//       return res.status(400).json({ success: false, message: "Order ID is required" });
//     }
    
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }
    
//     // Update order with payment details
//     order.paymentStatus = 'paid';
//     order.paymentMode = paymentMode || 'upi';
//     order.paymentId = paymentId;
//     order.razorpayPaymentId = razorpayPaymentId;
//     if (razorpayOrderId) order.razorpayOrderId = razorpayOrderId;
    
//     await order.save();
    
//     console.log(`✅ Payment recorded for order ${order.orderNumber}: ${paymentMode} - ${paymentId}`);
    
//     res.status(200).json({
//       success: true,
//       message: "Payment recorded successfully",
//       order: {
//         orderNumber: order.orderNumber,
//         paymentStatus: order.paymentStatus,
//         paymentMode: order.paymentMode
//       }
//     });
//   } catch (error) {
//     console.error("Error handling payment success:", error);
//     res.status(500).json({ success: false, message: "Failed to record payment" });
//   }
// };

// // ------------------- TRACK ORDER BY ORDER NUMBER -------------------
// // ------------------- TRACK ORDER BY ORDER NUMBER -------------------
// export const trackOrder = async (req, res) => {
//   try {
//     const encodedOrderNumber = req.params.orderNumber;
//     const orderNumber = decodeURIComponent(encodedOrderNumber);
    
//     console.log("=== Track Order Request ===");
//     console.log("Encoded:", encodedOrderNumber);
//     console.log("Decoded:", orderNumber);
    
//     if (!orderNumber) {
//       return res.status(400).json({
//         success: false,
//         message: "Order number is required"
//       });
//     }
    
//     const order = await Order.findOne({ orderNumber: orderNumber });
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }
    
//     const firstItem = order.items && order.items[0] || {};
    
//     let currentLocation = 'Processing';
//     let expectedDelivery = 'Pending';
//     let courierName = order.fship?.courier || 'Not assigned';
//     let trackingHistory = [];
//     let waybill = order.fship?.waybill || null;
    
//     if (order.fship?.waybill && order.deliveryType === 'courier') {
//       try {
//         const statusResponse = await getShipmentStatus(order.fship.waybill);
        
//         if (statusResponse.status && statusResponse.summary) {
//           currentLocation = statusResponse.summary.location || 'Shipping Hub';
//           expectedDelivery = statusResponse.summary.lastscanned || 'Pending';
//           courierName = statusResponse.summary.fulfilledby || order.fship.courier;
//           waybill = order.fship.waybill;
//         }
        
//         const historyResponse = await getTrackingHistory(order.fship.waybill);
//         if (historyResponse.status && historyResponse.trackingdata) {
//           trackingHistory = historyResponse.trackingdata.map(scan => ({
//             date: scan.DateandTime,
//             status: scan.Status,
//             location: scan.Location,
//             remark: scan.Remark
//           }));
//         }
//       } catch (error) {
//         console.error("Error fetching tracking:", error.message);
//       }
//     }
    
//     // FIX: Directly use order.status instead of mapping to frontendStatus
//     // This ensures the tracking page receives the exact status from the database
//     let frontendStatus = order.status;
    
//     // Only override if there's shipment status that's more accurate
//     if (order.fship?.waybill && order.deliveryType === 'courier') {
//       // Keep the original order status for now, don't override
//       // Let the tracking page handle the display mapping
//       frontendStatus = order.status;
//     }
    
//     let estimatedReady = 'Pending';
//     if (order.deliveryType === 'pickup') {
//       const createdDate = new Date(order.createdAt);
//       const hoursPassed = (new Date() - createdDate) / (1000 * 60 * 60);
//       if (hoursPassed < 4) {
//         estimatedReady = 'Today by 5:00 PM';
//       } else if (hoursPassed < 24) {
//         estimatedReady = 'Tomorrow by 5:00 PM';
//       } else {
//         estimatedReady = 'Within 2-3 days';
//       }
//     } else {
//       estimatedReady = expectedDelivery;
//     }
    
//     console.log(`📦 Order ${order.orderNumber} status: ${frontendStatus}`);
    
//     res.status(200).json({
//       success: true,
//       data: {
//         orderId: order.orderNumber,
//         status: frontendStatus, // Now returns actual status like 'processing', 'printing', etc.
//         createdAt: order.createdAt.toLocaleString(),
//         estimatedReady: estimatedReady,
//         items: {
//           pages: firstItem.pages || 0,
//           copies: firstItem.copies || 0,
//           paperSize: firstItem.paperSize || 'A4',
//           printColor: firstItem.printColor === 'color' ? 'Color' : 'B&W',
//           bindingType: firstItem.bindingType || 'Perfect Glue'
//         },
//         amount: order.totalAmount,
//         deliveryType: order.deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup',
//         waybill: waybill,
//         courierName: courierName,
//         currentLocation: currentLocation,
//         trackingHistory: trackingHistory
//       },
//       message: "Order tracked successfully"
//     });
    
//   } catch (error) {
//     console.error("Track order error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to track order",
//       error: error.message
//     });
//   }
// };












import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Payment from '../models/Payment.js';
import { generateOrderNumber } from "../utils/generateOrderNumber.js";
import {
  createShipment,
  generateShippingLabel,
  registerPickup, 
  getShipmentStatus,
  getTrackingHistory
} from '../services/fshipService.js';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

// File filter to accept only specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and images are allowed.'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: fileFilter
});

// Upload file endpoint
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.json({
      success: true,
      url: fileUrl,
      file: {
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype,
        filename: req.file.filename,
        url: fileUrl
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

// Download file by filename
export const downloadFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadDir, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: "File not found" });
    }
    
    res.download(filePath);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ success: false, message: "Failed to download file" });
  }
};

export const uploadSingleFile = upload.single('file');

// ------------------- CREATE ORDER FROM CART -------------------
export const createOrderFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      items, 
      customer, 
      orderMode, 
      deliveryType, 
      totalAmount, 
      finalAmount,      // ← NEW: Final amount after discounts
      discountAmount,   // ← NEW: Total discount amount
      discountsApplied, // ← NEW: Details of applied discounts
      cartId, 
      paymentMode 
    } = req.body;

    if (!items || !items.length)
      return res.status(400).json({ success: false, message: "No items in order" });
    if (!customer || !customer.name || !customer.phone)
      return res.status(400).json({ success: false, message: "Customer name and phone are required" });

    const orderNumber = await generateOrderNumber();

    const mappedItems = items.map(item => ({
      pages: item.pages || 0,
      copies: item.copies || 1,
      paperSize: item.paperSize || "A4",
      paperType: item.paperType || "70gsm_normal",
      printColor: item.printColor || "bw",
      printSide: item.printSide || "double",
      bindingType: item.bindingType || "none",
      lamination: item.lamination || "none",
      instructions: item.instructions || "",
      files: item.files || []
    }));

    // Calculate final amount if not provided
    const calculatedFinalAmount = finalAmount !== undefined ? finalAmount : (totalAmount || 0);
    const calculatedDiscountAmount = discountAmount !== undefined ? discountAmount : ((totalAmount || 0) - calculatedFinalAmount);

    const order = new Order({
      userId,
      items: mappedItems,
      customer,
      orderMode: orderMode || "single",
      deliveryType: deliveryType || "pickup",
      totalAmount: totalAmount || 0,
      finalAmount: calculatedFinalAmount,           // ← NEW: Store discounted amount
      discountAmount: calculatedDiscountAmount,     // ← NEW: Store total discount
      discountsApplied: {                           // ← NEW: Store discount details
        promo: discountsApplied?.promo || null,
        offer: discountsApplied?.offer || null,
        totalDiscount: calculatedDiscountAmount
      },
      orderNumber,
      paymentStatus: 'pending',
      paymentMode: paymentMode || 'upi',
      status: 'pending',
      cartId: cartId || null,
      fship: {},
      statusHistory: [{
        status: 'pending',
        changedBy: userId,
        changedAt: new Date(),
        note: `Order created. Original: ₹${totalAmount}, Final: ₹${calculatedFinalAmount}, Discount: ₹${calculatedDiscountAmount}`
      }]
    });

    const savedOrder = await order.save();

    if (cartId) await Cart.findByIdAndDelete(cartId);

    if (deliveryType === 'courier') {
      try {
        console.log("📦 Creating shipment for courier delivery...");
        const fshipResponse = await createShipment(savedOrder, process.env.FSHIP_WAREHOUSE_ID);
        
        let labelUrl = null;
        if (fshipResponse.waybill) {
          const labelResponse = await generateShippingLabel(fshipResponse.waybill);
          labelUrl = labelResponse?.resultDetails?.[fshipResponse.waybill]?.labelUrl || 
                     labelResponse?.labelUrl || null;
        }
        
        let pickupStatus = null;
        if (fshipResponse.waybill) {
          const pickupResponse = await registerPickup([fshipResponse.waybill]);
          pickupStatus = pickupResponse?.status || null;
        }
        
        savedOrder.fship = {
          apiOrderId: fshipResponse.apiorderid || null,
          waybill: fshipResponse.waybill || null,
          courier: fshipResponse.usedCourier?.name || fshipResponse.courierName || null,
          status: fshipResponse.order_status === 'success' ? 'Booked' : 'created',
          labelUrl: labelUrl,
          pickupStatus: pickupStatus,
          lastUpdated: new Date()
        };
        
        await savedOrder.save();
        console.log("✅ FShip shipment created:", savedOrder.fship);
      } catch (fshipError) {
        console.error("❌ FShip shipment error:", fshipError.response?.data || fshipError.message);
      }
    } else {
      console.log("📍 Store pickup order - No shipment created");
      savedOrder.fship = { status: 'store_pickup', lastUpdated: new Date() };
      await savedOrder.save();
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: {
        _id: savedOrder._id,
        orderNumber: savedOrder.orderNumber,
        totalAmount: savedOrder.totalAmount,
        finalAmount: savedOrder.finalAmount,
        discountAmount: savedOrder.discountAmount,
        discountsApplied: savedOrder.discountsApplied
      }
    });

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Failed to create order", error: error.message });
  }
};

// ------------------- UPDATE ORDER AMOUNT (when discounts applied after creation) -------------------
export const updateOrderAmount = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { finalAmount, discountAmount, discountsApplied } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    console.log('=== UPDATE ORDER AMOUNT ===');
    console.log('Order ID:', orderId);
    console.log('Final Amount:', finalAmount);
    console.log('Discount Amount:', discountAmount);

    // Find order - admin can update any, users only their own
    let order;
    if (userRole === 'admin') {
      order = await Order.findById(orderId);
    } else {
      order = await Order.findOne({ _id: orderId, userId });
    }

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Update discount fields
    if (finalAmount !== undefined) order.finalAmount = finalAmount;
    if (discountAmount !== undefined) order.discountAmount = discountAmount;
    if (discountsApplied) {
      order.discountsApplied = {
        promo: discountsApplied.promo || null,
        offer: discountsApplied.offer || null,
        totalDiscount: discountAmount || 0
      };
    }

    // Add to status history
    order.statusHistory.push({
      status: order.status,
      changedBy: userId,
      changedAt: new Date(),
      note: `Order amount updated: Final ₹${order.finalAmount}, Discount ₹${order.discountAmount}`
    });

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order amount updated successfully",
      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        finalAmount: order.finalAmount,
        discountAmount: order.discountAmount,
        discountsApplied: order.discountsApplied
      }
    });

  } catch (error) {
    console.error("Error updating order amount:", error);
    res.status(500).json({ success: false, message: "Failed to update order amount", error: error.message });
  }
};

// ------------------- GET ALL ORDERS (User's own orders) -------------------
export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .populate('payment')
      .sort({ createdAt: -1 });

    const transformedOrders = orders.map(order => ({
      ...order.toObject(),
      paymentMethod: order.payment?.paymentMethod,
      razorpayPaymentId: order.payment?.razorpayPaymentId || order.razorpayPaymentId,
      paymentStatus: order.payment?.status || order.paymentStatus,
      paymentMode: order.paymentMode || order.payment?.paymentMethod || 'upi',
      displayAmount: order.finalAmount || order.totalAmount  // ← Show discounted amount
    }));

    res.status(200).json({ success: true, orders: transformedOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// ------------------- GET ORDER BY ID -------------------
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    console.log('=== GET ORDER BY ID ===');
    console.log('Order ID:', id);
    console.log('User Role:', userRole);

    let order;

    if (userRole === "admin") {
      order = await Order.findById(id).populate('payment');
    } else {
      order = await Order.findOne({ _id: id, userId }).populate('payment');
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    const transformedOrder = {
      ...order.toObject(),
      paymentMethod: order.payment?.paymentMethod,
      razorpayPaymentId: order.payment?.razorpayPaymentId || order.razorpayPaymentId,
      paymentDetails: order.payment,
      paymentMode: order.paymentMode || order.payment?.paymentMethod || 'cod',
      originalAmount: order.totalAmount,
      paidAmount: order.finalAmount,  // ← Show discounted amount paid
      discountAmount: order.discountAmount,
      discountsApplied: order.discountsApplied
    };

    res.status(200).json({
      success: true,
      order: transformedOrder
    });

  } catch (error) {
    console.error("Error fetching order:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch order"
    });
  }
};

// ------------------- UPDATE ORDER STATUS -------------------
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    console.log('=== UPDATE ORDER STATUS ===');
    console.log('Order ID:', id);
    console.log('New Status:', status);
    console.log('User ID:', userId);
    console.log('User Role:', userRole);

    const validStatuses = ['pending', 'processing', 'printing', 'ready', 'dispatched', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    let order;
    if (userRole === 'admin') {
      order = await Order.findById(id);
    } else {
      order = await Order.findOne({ _id: id, userId });
    }

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    if (order.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: "Cannot update status of cancelled order"
      });
    }

    const oldStatus = order.status;
    order.status = status;
    
    if (!order.statusHistory) {
      order.statusHistory = [];
    }
    order.statusHistory.push({
      status: status,
      changedBy: userId,
      changedAt: new Date(),
      note: `Status changed from ${oldStatus} to ${status}`
    });
    
    await order.save();

    console.log('✅ Order status updated successfully from', oldStatus, 'to', status);

    try {
      const broadcastOrderUpdate = req.app.get('broadcastOrderUpdate');
      
      if (broadcastOrderUpdate) {
        console.log(`📡 Attempting to broadcast for order number: ${order.orderNumber}`);
        broadcastOrderUpdate(order.orderNumber, status);
        console.log(`📡 Broadcasted status update for order: ${order.orderNumber} (${oldStatus} → ${status})`);
      } else {
        console.warn('⚠️ broadcastOrderUpdate function not found in app settings');
      }
    } catch (broadcastError) {
      console.error('❌ Error broadcasting WebSocket update:', broadcastError);
    }

    res.status(200).json({ 
      success: true, 
      message: `Order status updated from ${oldStatus} to ${status}`, 
      order 
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update order status",
      error: error.message 
    });
  }
};

// ------------------- CANCEL ORDER -------------------
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    console.log('=== CANCEL ORDER ===');
    console.log('Order ID:', id);
    console.log('User Role:', userRole);

    let order;
    if (userRole === 'admin') {
      order = await Order.findById(id);
    } else {
      order = await Order.findOne({ _id: id, userId });
    }

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    if (order.status === 'completed') {
      return res.status(400).json({ 
        success: false, 
        message: "Cannot cancel completed order" 
      });
    }

    if (order.status === 'cancelled') {
      return res.status(400).json({ 
        success: false, 
        message: "Order is already cancelled" 
      });
    }

    order.status = 'cancelled';
    await order.save();

    console.log('✅ Order cancelled successfully');

    res.status(200).json({ 
      success: true, 
      message: "Order cancelled successfully", 
      order 
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to cancel order",
      error: error.message 
    });
  }
};

// ------------------- UPDATE PAYMENT STATUS -------------------
export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, paymentMode, paymentId, razorpayPaymentId } = req.body;
    const userRole = req.user.role;

    console.log('=== UPDATE PAYMENT STATUS ===');
    console.log('Order ID:', id);
    console.log('New Payment Status:', paymentStatus);
    console.log('Payment Mode:', paymentMode);
    console.log('User Role:', userRole);

    if (userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Only admin can update payment status"
      });
    }
    
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    
    const validStatuses = ['pending', 'paid', 'failed', 'refunded'];
    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid payment status. Must be one of: ${validStatuses.join(', ')}`
      });
    }
    
    order.paymentStatus = paymentStatus;
    if (paymentMode) order.paymentMode = paymentMode;
    if (paymentId) order.paymentId = paymentId;
    if (razorpayPaymentId) order.razorpayPaymentId = razorpayPaymentId;
    
    await order.save();
    
    res.status(200).json({
      success: true,
      message: "Payment status updated",
      order: {
        ...order.toObject(),
        paymentMode: order.paymentMode,
        paymentId: order.paymentId,
        razorpayPaymentId: order.razorpayPaymentId
      }
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ success: false, message: "Failed to update payment status" });
  }
};

// ------------------- HANDLE PAYMENT SUCCESS (Webhook) -------------------
export const handlePaymentSuccess = async (req, res) => {
  try {
    const { orderId, paymentId, paymentMode, razorpayPaymentId, razorpayOrderId } = req.body;
    
    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }
    
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    
    order.paymentStatus = 'paid';
    order.paymentMode = paymentMode || 'upi';
    order.paymentId = paymentId;
    order.razorpayPaymentId = razorpayPaymentId;
    if (razorpayOrderId) order.razorpayOrderId = razorpayOrderId;
    
    await order.save();
    
    console.log(`✅ Payment recorded for order ${order.orderNumber}: ₹${order.finalAmount} (${paymentMode}) - ${paymentId}`);
    
    res.status(200).json({
      success: true,
      message: "Payment recorded successfully",
      order: {
        orderNumber: order.orderNumber,
        amount: order.finalAmount,
        paymentStatus: order.paymentStatus,
        paymentMode: order.paymentMode
      }
    });
  } catch (error) {
    console.error("Error handling payment success:", error);
    res.status(500).json({ success: false, message: "Failed to record payment" });
  }
};

// ------------------- TRACK ORDER BY ORDER NUMBER -------------------
export const trackOrder = async (req, res) => {
  try {
    const encodedOrderNumber = req.params.orderNumber;
    const orderNumber = decodeURIComponent(encodedOrderNumber);
    
    console.log("=== Track Order Request ===");
    console.log("Encoded:", encodedOrderNumber);
    console.log("Decoded:", orderNumber);
    
    if (!orderNumber) {
      return res.status(400).json({
        success: false,
        message: "Order number is required"
      });
    }
    
    const order = await Order.findOne({ orderNumber: orderNumber });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    
    const firstItem = order.items && order.items[0] || {};
    
    let currentLocation = 'Processing';
    let expectedDelivery = 'Pending';
    let courierName = order.fship?.courier || 'Not assigned';
    let trackingHistory = [];
    let waybill = order.fship?.waybill || null;
    
    if (order.fship?.waybill && order.deliveryType === 'courier') {
      try {
        const statusResponse = await getShipmentStatus(order.fship.waybill);
        
        if (statusResponse.status && statusResponse.summary) {
          currentLocation = statusResponse.summary.location || 'Shipping Hub';
          expectedDelivery = statusResponse.summary.lastscanned || 'Pending';
          courierName = statusResponse.summary.fulfilledby || order.fship.courier;
          waybill = order.fship.waybill;
        }
        
        const historyResponse = await getTrackingHistory(order.fship.waybill);
        if (historyResponse.status && historyResponse.trackingdata) {
          trackingHistory = historyResponse.trackingdata.map(scan => ({
            date: scan.DateandTime,
            status: scan.Status,
            location: scan.Location,
            remark: scan.Remark
          }));
        }
      } catch (error) {
        console.error("Error fetching tracking:", error.message);
      }
    }
    
    let frontendStatus = order.status;
    
    let estimatedReady = 'Pending';
    if (order.deliveryType === 'pickup') {
      const createdDate = new Date(order.createdAt);
      const hoursPassed = (new Date() - createdDate) / (1000 * 60 * 60);
      if (hoursPassed < 4) {
        estimatedReady = 'Today by 5:00 PM';
      } else if (hoursPassed < 24) {
        estimatedReady = 'Tomorrow by 5:00 PM';
      } else {
        estimatedReady = 'Within 2-3 days';
      }
    } else {
      estimatedReady = expectedDelivery;
    }
    
    console.log(`📦 Order ${order.orderNumber} status: ${frontendStatus}, Amount: ₹${order.finalAmount} (Discounted from ₹${order.totalAmount})`);
    
    res.status(200).json({
      success: true,
      data: {
        orderId: order.orderNumber,
        status: frontendStatus,
        createdAt: order.createdAt.toLocaleString(),
        estimatedReady: estimatedReady,
        items: {
          pages: firstItem.pages || 0,
          copies: firstItem.copies || 0,
          paperSize: firstItem.paperSize || 'A4',
          printColor: firstItem.printColor === 'color' ? 'Color' : 'B&W',
          bindingType: firstItem.bindingType || 'Perfect Glue'
        },
        amount: order.finalAmount,  // ← Show discounted amount
        originalAmount: order.totalAmount,  // ← Show original amount
        discountAmount: order.discountAmount,  // ← Show discount
        deliveryType: order.deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup',
        waybill: waybill,
        courierName: courierName,
        currentLocation: currentLocation,
        trackingHistory: trackingHistory
      },
      message: "Order tracked successfully"
    });
    
  } catch (error) {
    console.error("Track order error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to track order",
      error: error.message
    });
  }
};
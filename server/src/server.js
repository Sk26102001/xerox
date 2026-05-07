// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import cartRoutes from "./routes/cartRoutes.js";

// import authRoutes from "./routes/authRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import pricingRoutes from "./routes/pricingRoutes.js";
// import promocodeRoutes from "./routes/promocodeRoutes.js";
// import offerRoutes from "./routes/offerRoutes.js";
// import reportRoutes from "./routes/reportRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// // import paymentRoutes from "./routes/payment.js";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/order", orderRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/pricing", pricingRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/promocode", promocodeRoutes);
// app.use("/api/offers", offerRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/payment", paymentRoutes);
// // app.use("/api/payment", paymentRoutes);

// app.get("/", (req, res) => {
//   res.send("Print Shop API Running");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// // import { sendOtpEmail } from "./utils/sendEmail.js";

// import connectDB from "./config/db.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import pricingRoutes from "./routes/pricingRoutes.js";
// import promocodeRoutes from "./routes/promocodeRoutes.js";
// import offerRoutes from "./routes/offerRoutes.js";
// import reportRoutes from "./routes/reportRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js"; // Make sure this imports correctly

// dotenv.config();
// connectDB();

// const app = express();

// // Configure CORS with exposed headers to fix the x-rtb-fingerprint-id issue
// app.use(cors({
//     origin: ['http://localhost:8080'], // Add your frontend URLs
//     credentials: true,
//     exposedHeaders: ['x-rtb-fingerprint-id'] // This solves the header issue
// }));

// // Parse JSON bodies
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/order", orderRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/pricing", pricingRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/promocode", promocodeRoutes);
// app.use("/api/offers", offerRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/payment", paymentRoutes); // Use the payment routes

// app.get("/", (req, res) => {
//   res.send("Print Shop API Running");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Razorpay integration ready`);
// });





// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

// import path from 'path';
// import { fileURLToPath } from 'url';
// import middleware from "./middleware/auth.js";
// // import { uploadFile, uploadSingleFile } from './controllers/orderController.js';
// // import { sendOtpEmail } from "./utils/sendEmail.js";
// import { uploadFile, downloadFile, uploadSingleFile } from './controllers/orderController.js';



// import connectDB from "./config/db.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import pricingRoutes from "./routes/pricingRoutes.js";
// import promocodeRoutes from "./routes/promocodeRoutes.js";
// import offerRoutes from "./routes/offerRoutes.js";
// import reportRoutes from "./routes/reportRoutes.js";
// import shippingRoutes from "./routes/shippingRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js"; // Make sure this imports correctly

// // ✅ Load environment variables FIRST
// dotenv.config();

// // ✅ Verify Razorpay keys are loaded
// // console.log('🔧 Environment Check:');
// // console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID ? '✓ Present' : '✗ Missing');
// // console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? '✓ Present' : '✗ Missing');
// // console.log('PORT:', process.env.PORT || 5000);

// connectDB();

// const app = express();

// // ✅ Configure CORS with ALL your frontend origins
// const allowedOrigins = [

// // React default
//     'http://localhost:8080' ,
//     'http://localhost:8081' // Your current origin

// ];

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(cors({
//     origin: function (origin, callback) {
//         // Allow requests with no origin (like mobile apps or curl requests)
//         if (!origin) return callback(null, true);
        
//         if (allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             console.log('Blocked CORS request from:', origin);
//             callback(null, true); // For development, allow all
//             // callback(new Error('Not allowed by CORS')); // For production
//         }
//     },
//     credentials: true,
//     // exposedHeaders: ['x-rtb-fingerprint-id']
// }));

// // Parse JSON bodies
// app.use(express.json());

// // ✅ Add request logging middleware (for debugging)
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

// app.post('/api/upload', auth, uploadSingleFile, uploadFile);
// app.get('/api/uploads/:filename', downloadFile);


// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/order", orderRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/pricing", pricingRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/promocode", promocodeRoutes);
// app.use("/api/offers", offerRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/shipping", shippingRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // app.post('/api/upload', auth, uploadSingleFile, uploadFile);
// app.get("/", (req, res) => {
//     res.json({ 
//         message: "Print Shop API Running",
//         razorpayConfigured: !!process.env.RAZORPAY_KEY_ID
//     });
// });

// // ✅ Health check endpoint for Razorpay
// app.get("/api/health", (req, res) => {
//     res.json({
//         status: 'ok',
//         razorpay: {
//             configured: !!process.env.RAZORPAY_KEY_ID,
//             keyId: process.env.RAZORPAY_KEY_ID ? process.env.RAZORPAY_KEY_ID.slice(0, 10) + '...' : null
//         }
//     });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`\n✅ Server running on port ${PORT}`);
//     // console.log(`📍 API URL: http://localhost:${PORT}/api`);
//     console.log(`💳 Razorpay integration: ${process.env.RAZORPAY_KEY_ID ? '✅ Ready' : '❌ Missing keys'}`);
//     // console.log(`🌐 CORS enabled for: ${allowedOrigins.join(', ')}\n`);
// });





// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import path from 'path';
// import { fileURLToPath } from 'url';
// import connectDB from "./config/db.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import pricingRoutes from "./routes/pricingRoutes.js";
// import promocodeRoutes from "./routes/promocodeRoutes.js";
// import offerRoutes from "./routes/offerRoutes.js";
// import reportRoutes from "./routes/reportRoutes.js";
// import shippingRoutes from "./routes/shippingRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import auth from "./middleware/auth.js";
// import { uploadFile, uploadSingleFile } from './controllers/orderController.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();
// connectDB();

// const app = express();

// // Configure CORS
// const allowedOrigins = ['http://localhost:8080', 'http://localhost:8081'];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(null, true);
//     }
//   },
//   credentials: true,
// }));

// app.use(express.json());

// // Request logging
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/order", orderRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/pricing", pricingRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/promocode", promocodeRoutes);
// app.use("/api/offers", offerRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/shipping", shippingRoutes);
// app.use("/api/payment", paymentRoutes);

// // ✅ FILE UPLOAD ROUTE
// app.post('/api/upload', auth, uploadSingleFile, uploadFile);

// // ✅ SERVE UPLOADED FILES
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.get("/", (req, res) => {
//   res.json({ message: "Print Shop API Running" });
// });

// app.get("/api/health", (req, res) => {
//   res.json({ status: 'ok' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`\n✅ Server running on port ${PORT}`);
//   console.log(`📁 Uploads directory: ${path.join(__dirname, 'uploads')}`);
// });





// import express from "express";
// import dotenv from "dotenv";
// import http from 'http';
// import cors from "cors";
// import path from 'path';
// import { fileURLToPath } from 'url';
// import connectDB from "./config/db.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import pricingRoutes from "./routes/pricingRoutes.js";
// import promocodeRoutes from "./routes/promocodeRoutes.js";
// import offerRoutes from "./routes/offerRoutes.js";
// import reportRoutes from "./routes/reportRoutes.js";
// import shippingRoutes from "./routes/shippingRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import auth from "./middleware/auth.js";
// import { uploadFile, uploadSingleFile } from './controllers/orderController.js';
// import { setupWebSocketServer, broadcastOrderUpdate } from './websocket.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();
// connectDB();

// const app = express();

// // // Setup WebSocket server
// // const wss = setupWebSocketServer(server);

// // // Make broadcast function available to your order controllers
// // app.set('broadcastOrderUpdate', broadcastOrderUpdate);

// // IMPORTANT: Create HTTP server AFTER setting up express app
// const server = http.createServer(app);

// // ============ WEBSOCKET SETUP ============
// console.log('Setting up WebSocket server...');
// const wss = setupWebSocketServer(server);

// // Make broadcast function available to all routes via app settings
// app.set('broadcastOrderUpdate', broadcastOrderUpdate);
// console.log('✅ WebSocket broadcast function registered');


// // Configure CORS
// const allowedOrigins = ['http://localhost:8080', 'http://localhost:8081'];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(null, true);
//     }
//   },
//   credentials: true,
// }));

// app.use(express.json());

// // Request logging
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// // ✅ IMPORTANT: Serve static files from uploads directory - Put this BEFORE your routes
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ✅ Also serve from root uploads if needed
// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/order", orderRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/pricing", pricingRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/promocode", promocodeRoutes);
// app.use("/api/offers", offerRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/shipping", shippingRoutes);
// app.use("/api/payment", paymentRoutes);

// // File upload route
// app.post('/api/upload', auth, uploadSingleFile, uploadFile);

// app.get("/", (req, res) => {
//   res.json({ message: "Print Shop API Running" });
// });

// app.get("/api/health", (req, res) => {
//   res.json({ status: 'ok' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`\n✅ Server running on port ${PORT}`);
//   console.log(`📁 Uploads directory: ${path.join(__dirname, 'uploads')}`);
//   console.log(`🔗 Static files available at: http://localhost:${PORT}/uploads/`);
// });






import express from "express";
import dotenv from "dotenv";
import http from 'http';
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from "./config/db.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import promocodeRoutes from "./routes/promocodeRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import testimonialRoutes from './routes/testimonialRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import auth from "./middleware/auth.js";
import { uploadFile, uploadSingleFile } from './controllers/orderController.js';
import { setupWebSocketServer, broadcastOrderUpdate } from './websocket.js';

// At the top of server.js, after other imports
global.tempOrders = new Map();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// Configure CORS
const allowedOrigins = [
  'http://localhost:8080', 
  'http://localhost:8081',
  'http://localhost:5173',
  'http://localhost:3000',
  // 'http://localhost:5000',
  'https://bookprinters.in',
  'https://www.bookprinters.in',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
}));

app.use(express.json());

app.use(
  "/api/payment/webhook",
  express.raw({ type: "application/json" })
);

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// ============ CREATE HTTP SERVER ============
// Create HTTP server BEFORE setting up WebSocket
const server = http.createServer(app);

// ============ WEBSOCKET SETUP - MUST BE BEFORE ROUTES ============
console.log('Setting up WebSocket server...');
const wss = setupWebSocketServer(server);

// Make broadcast function available to all routes via app settings
app.set('broadcastOrderUpdate', broadcastOrderUpdate);
console.log('✅ WebSocket broadcast function registered');

// ============ ROUTES - AFTER WEBSOCKET SETUP ============
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/promocode", promocodeRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/payment", paymentRoutes);
app.use('/api/contact', contactRoutes);

// File upload route
app.post('/api/upload', auth, uploadSingleFile, uploadFile);

app.get("/", (req, res) => {
  res.json({ message: "Print Shop API Running" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: 'ok' });
});

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;

// Use server.listen() NOT app.listen()
server.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`🔌 WebSocket server ready at ws://localhost:${PORT}`);
  console.log(`📁 Uploads directory: ${path.join(__dirname, 'uploads')}`);
  console.log(`🔗 Static files available at: http://localhost:${PORT}/uploads/`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
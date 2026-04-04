// import express from "express";
// import {
//   addToCart,
//   getCart,
//   deleteCartItem,
//   updateCartItem,
//   clearCart
// } from "../controllers/cartController.js";

// import auth from "../middleware/auth.js"; // ✅ import

// const router = express.Router();

// // 🔥 PROTECTED ROUTES
// router.post("/", auth, addToCart);
// router.get("/", auth, getCart);
// router.put("/item/:id", auth, updateCartItem);
// router.delete("/item/:id", auth, deleteCartItem);
// router.delete("/clear", auth, clearCart);

// export default router;



// import express from "express";
// import {
//   addToCart,
//   getCart,
//   deleteCartItem,
//   updateCartItem,
//   clearCart
// } from "../controllers/cartController.js";
// import auth from "../middleware/auth.js";

// const router = express.Router();

// // 🔥 ALL ROUTES ARE PROTECTED
// router.post("/", auth, addToCart);          // Save cart
// router.get("/", auth, getCart);             // Get cart
// router.put("/item/:id", auth, updateCartItem);  // Update item quantity
// router.delete("/item/:id", auth, deleteCartItem); // Delete item
// router.delete("/", auth, clearCart);        // Clear entire cart

// export default router;



import express from "express";
import {
  addToCart,
  replaceCart,
  getCart,
  deleteCartItem,
  updateCartItem,
  clearCart
} from "../controllers/cartController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// 🔥 ALL ROUTES ARE PROTECTED
router.post("/", auth, addToCart);           // Add items to cart (append)
router.put("/replace", auth, replaceCart);   // Replace entire cart
router.get("/", auth, getCart);              // Get cart
router.put("/item/:id", auth, updateCartItem); // Update item quantity
router.delete("/item/:id", auth, deleteCartItem); // Delete item
router.delete("/", auth, clearCart);         // Clear entire cart

export default router;
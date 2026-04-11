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







// import express from "express";
// import {
//   addToCart,
//   replaceCart,
//   getCart,
//   deleteCartItem,
//   updateCartItem,
//   clearCart
// } from "../controllers/cartController.js";
// import auth from "../middleware/auth.js";

// const router = express.Router();

// // 🔥 ALL ROUTES ARE PROTECTED
// // In cartRoutes.js
// router.put('/address', auth, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { address, pincode, city, state, landmark, addressType } = req.body;
    
//     const cart = await Cart.findOne({ user: userId });
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
    
//     cart.customer = {
//       ...cart.customer,
//       address,
//       pincode,
//       city,
//       state,
//       landmark,
//       addressType
//     };
    
//     await cart.save();
    
//     res.json({ success: true, cart });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// router.post("/", auth, addToCart);           // Add items to cart (append)
// router.put("/replace", auth, replaceCart);   // Replace entire cart
// router.get("/", auth, getCart);              // Get cart
// router.put("/item/:id", auth, updateCartItem); // Update item quantity
// router.delete("/item/:id", auth, deleteCartItem); // Delete item
// router.delete("/", auth, clearCart);         // Clear entire cart

// export default router;



import express from "express";
import {
  addToCart,
  replaceCart,
  getCart,
  deleteCartItem,
  updateCartItem,
  clearCart,
  updateCartAddress,      // ✅ ADDED
  updateDeliveryPartner   // ✅ ADDED
} from "../controllers/cartController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ✅ Address update route (PUT, not POST)
router.put('/address', auth, updateCartAddress);

// ✅ Delivery partner update route
router.put('/delivery-partner', auth, updateDeliveryPartner);

// Other cart routes
router.post("/", auth, addToCart);           // Add items to cart (append)
router.put("/replace", auth, replaceCart);   // Replace entire cart
router.get("/", auth, getCart);              // Get cart
router.put("/item/:id", auth, updateCartItem); // Update item quantity
router.delete("/item/:id", auth, deleteCartItem); // Delete item
router.delete("/", auth, clearCart);         // Clear entire cart

export default router;
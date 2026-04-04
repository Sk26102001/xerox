// import express from "express";
// import { register, login } from "../controllers/authController.js";
// import { forgotPassword, resetPassword } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// export default router;





// import express from "express";
// import { register, login, forgotPassword, resetPassword } from "../controllers/authController.js";

// const router = express.Router();

// // Public routes (no auth required)
// router.post("/register", register);
// router.post("/login", login);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// // Optional: if you later add email verification or other public endpoints
// // router.post("/verify-email", verifyEmail);

// export default router;


import express from "express";
import { 
  register, 
  login, 
  forgotPassword, 
  resetPassword,
  getCurrentUser,
  updateProfile
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Public routes (no auth required)
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes (auth required)
router.get("/me", auth, getCurrentUser);
router.put("/update-profile", auth, updateProfile);

export default router;
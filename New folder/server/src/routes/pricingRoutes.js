// import express from "express";
// import Pricing from "../models/Pricing.js";

// const router = express.Router();

// router.get("/", async (req, res) => {
//   const pricing = await Pricing.find();
//   res.json(pricing);
// });

// router.post("/", async (req, res) => {
//   const pricing = await Pricing.create(req.body);
//   res.json(pricing);
// });

// export default router;


// routes/pricingRoutes.js
import express from 'express';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';
import { getPricing, updatePricing } from '../controllers/pricingController.js';

const router = express.Router();

// Get current pricing (public - no auth required)
router.get('/', getPricing);

// Update pricing (admin only)
router.put('/', auth, adminAuth, updatePricing);

export default router;
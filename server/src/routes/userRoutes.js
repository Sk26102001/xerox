import express from "express";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", auth, adminAuth, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;
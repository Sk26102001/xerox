import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.get("/revenue", async (req, res) => {
  const orders = await Order.find();

  const revenue = orders.reduce((acc, item) => acc + item.price, 0);

  res.json({ revenue });
});

export default router;
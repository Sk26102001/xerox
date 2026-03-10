import express from "express";
import Pricing from "../models/Pricing.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pricing = await Pricing.find();
  res.json(pricing);
});

router.post("/", async (req, res) => {
  const pricing = await Pricing.create(req.body);
  res.json(pricing);
});

export default router;
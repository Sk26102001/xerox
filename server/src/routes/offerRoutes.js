import express from "express";
import Offer from "../models/Offer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const offer = await Offer.create(req.body);
  res.json(offer);
});

router.get("/", async (req, res) => {
  const offers = await Offer.find();
  res.json(offers);
});

export default router;
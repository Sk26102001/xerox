import express from "express";
import Promocode from "../models/Promocode.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const code = await Promocode.create(req.body);
  res.json(code);
});

router.get("/", async (req, res) => {
  const codes = await Promocode.find();
  res.json(codes);
});

export default router;
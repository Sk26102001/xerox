import Promocode from "../models/Promocode.js";

export const createPromocode = async (req, res) => {
  try {
    const code = await Promocode.create(req.body);
    res.json(code);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPromocodes = async (req, res) => {
  try {
    const codes = await Promocode.find();
    res.json(codes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
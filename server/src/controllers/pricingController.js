import Pricing from "../models/Pricing.js";

export const getPricing = async (req, res) => {
  try {
    const pricing = await Pricing.find();
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPricing = async (req, res) => {
  try {
    const pricing = await Pricing.create(req.body);
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
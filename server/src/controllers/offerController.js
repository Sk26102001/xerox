import Offer from "../models/Offer.js";

export const createOffer = async (req, res) => {
  try {
    const offer = await Offer.create(req.body);
    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
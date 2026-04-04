// import Pricing from "../models/Pricing.js";

// export const getPricing = async (req, res) => {
//   try {
//     const pricing = await Pricing.find();
//     res.json(pricing);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const createPricing = async (req, res) => {
//   try {
//     const pricing = await Pricing.create(req.body);
//     res.json(pricing);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// controllers/pricingController.js
import Pricing from '../models/Pricing.js';
import { defaultPricingConfig } from '../data/pricingData.js';

// Get current pricing
export const getPricing = async (req, res) => {
  try {
    let pricing = await Pricing.findOne();
    
    if (!pricing) {
      // Create default pricing if not exists
      pricing = await Pricing.create(defaultPricingConfig);
    }
    
    res.status(200).json({
      success: true,
      data: pricing
    });
  } catch (error) {
    console.error('Error fetching pricing:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pricing',
      error: error.message
    });
  }
};

// Update pricing (admin only)
export const updatePricing = async (req, res) => {
  try {
    const updateData = req.body;
    
    let pricing = await Pricing.findOne();
    
    if (!pricing) {
      pricing = new Pricing(updateData);
    } else {
      // Update existing pricing
      Object.assign(pricing, updateData);
    }
    
    await pricing.save();
    
    res.status(200).json({
      success: true,
      message: 'Pricing updated successfully',
      data: pricing
    });
  } catch (error) {
    console.error('Error updating pricing:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update pricing',
      error: error.message
    });
  }
};
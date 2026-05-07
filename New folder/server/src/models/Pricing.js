// import mongoose from "mongoose";

// const pricingSchema = new mongoose.Schema({
//   product: String,
//   price: Number
// });

// export default mongoose.model("Pricing", pricingSchema);



// models/Pricing.js
import mongoose from 'mongoose';

const priceTableSchema = new mongoose.Schema({
  A4: {
    below50: {
      '70gsm_normal': { type: Number, default: 0 },
      '70gsm_premium': { type: Number, default: 0 },
      '80gsm_sunshine': { type: Number, default: 0 },
      '100gsm_sunshine': { type: Number, default: 0 },
      '100gsm_natural': { type: Number, default: 0 },
      '80gsm_bond': { type: Number, default: 0 },
      '100gsm_bond': { type: Number, default: 0 }
    },
    '50to150': {
      '70gsm_normal': { type: Number, default: 0 },
      '70gsm_premium': { type: Number, default: 0 },
      '80gsm_sunshine': { type: Number, default: 0 },
      '100gsm_sunshine': { type: Number, default: 0 },
      '100gsm_natural': { type: Number, default: 0 },
      '80gsm_bond': { type: Number, default: 0 },
      '100gsm_bond': { type: Number, default: 0 }
    },
    above150: {
      '70gsm_normal': { type: Number, default: 0 },
      '70gsm_premium': { type: Number, default: 0 },
      '80gsm_sunshine': { type: Number, default: 0 },
      '100gsm_sunshine': { type: Number, default: 0 },
      '100gsm_natural': { type: Number, default: 0 },
      '80gsm_bond': { type: Number, default: 0 },
      '100gsm_bond': { type: Number, default: 0 }
    }
  },
  B5: {
    below50: {
      '70gsm_normal': { type: Number, default: 0 },
      '70gsm_premium': { type: Number, default: 0 },
      '80gsm_sunshine': { type: Number, default: 0 },
      '100gsm_sunshine': { type: Number, default: 0 },
      '100gsm_natural': { type: Number, default: 0 },
      '80gsm_bond': { type: Number, default: 0 },
      '100gsm_bond': { type: Number, default: 0 }
    },
    '50to150': {
      '70gsm_normal': { type: Number, default: 0 },
      '70gsm_premium': { type: Number, default: 0 },
      '80gsm_sunshine': { type: Number, default: 0 },
      '100gsm_sunshine': { type: Number, default: 0 },
      '100gsm_natural': { type: Number, default: 0 },
      '80gsm_bond': { type: Number, default: 0 },
      '100gsm_bond': { type: Number, default: 0 }
    },
    above150: {
      '70gsm_normal': { type: Number, default: 0 },
      '70gsm_premium': { type: Number, default: 0 },
      '80gsm_sunshine': { type: Number, default: 0 },
      '100gsm_sunshine': { type: Number, default: 0 },
      '100gsm_natural': { type: Number, default: 0 },
      '80gsm_bond': { type: Number, default: 0 },
      '100gsm_bond': { type: Number, default: 0 }
    }
  },
  A5: {
    below50: {
      '70gsm_normal': { type: Number, default: 0 },
      '70gsm_premium': { type: Number, default: 0 },
      '80gsm_sunshine': { type: Number, default: 0 },
      '100gsm_sunshine': { type: Number, default: 0 },
      '100gsm_natural': { type: Number, default: 0 },
      '80gsm_bond': { type: Number, default: 0 },
      '100gsm_bond': { type: Number, default: 0 }
    },
    '50to150': {
      '70gsm_normal': { type: Number, default: 0 },
      '70gsm_premium': { type: Number, default: 0 },
      '80gsm_sunshine': { type: Number, default: 0 },
      '100gsm_sunshine': { type: Number, default: 0 },
      '100gsm_natural': { type: Number, default: 0 },
      '80gsm_bond': { type: Number, default: 0 },
      '100gsm_bond': { type: Number, default: 0 }
    },
    above150: {
      '70gsm_normal': { type: Number, default: 0 },
      '70gsm_premium': { type: Number, default: 0 },
      '80gsm_sunshine': { type: Number, default: 0 },
      '100gsm_sunshine': { type: Number, default: 0 },
      '100gsm_natural': { type: Number, default: 0 },
      '80gsm_bond': { type: Number, default: 0 },
      '100gsm_bond': { type: Number, default: 0 }
    }
  },
  '6x9': {
    below50: {
      '70gsm_normal': { type: Number, default: 0 },
      '70gsm_premium': { type: Number, default: 0 },
      '80gsm_sunshine': { type: Number, default: 0 },
      '100gsm_sunshine': { type: Number, default: 0 },
      '100gsm_natural': { type: Number, default: 0 },
      '80gsm_bond': { type: Number, default: 0 },
      '100gsm_bond': { type: Number, default: 0 }
    },
    '50to150': {
      '70gsm_normal': { type: Number, default: 0 },
      '70gsm_premium': { type: Number, default: 0 },
      '80gsm_sunshine': { type: Number, default: 0 },
      '100gsm_sunshine': { type: Number, default: 0 },
      '100gsm_natural': { type: Number, default: 0 },
      '80gsm_bond': { type: Number, default: 0 },
      '100gsm_bond': { type: Number, default: 0 }
    },
    above150: {
      '70gsm_normal': { type: Number, default: 0 },
      '70gsm_premium': { type: Number, default: 0 },
      '80gsm_sunshine': { type: Number, default: 0 },
      '100gsm_sunshine': { type: Number, default: 0 },
      '100gsm_natural': { type: Number, default: 0 },
      '80gsm_bond': { type: Number, default: 0 },
      '100gsm_bond': { type: Number, default: 0 }
    }
  }
});

const pricingSchema = new mongoose.Schema({
  doubleSidePrices: { type: priceTableSchema, required: true },
  singleSidePrices: { type: priceTableSchema, required: true },
  bindingPrices: {
    soft_cover: { type: Number, default: 0 },
    perfect_glue: { type: Number, default: 20 },
    hardbound: { type: Number, default: 70 },
    hardbound_flipper: { type: Number, default: 95 },
    spiral: { type: Number, default: 20 },
    centre_staple: { type: Number, default: 5 },
    corner_staple: { type: Number, default: 5 }
  },
  colorMultiplier: { type: Number, default: 6 },
  gstRate: { type: Number, default: 0.05 }
}, { timestamps: true });

const Pricing = mongoose.model('Pricing', pricingSchema);
export default Pricing;
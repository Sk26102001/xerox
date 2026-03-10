import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema({
  product: String,
  price: Number
});

export default mongoose.model("Pricing", pricingSchema);
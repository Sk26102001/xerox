import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: String,
  description: String,
  discount: Number,
  validTill: Date
});

export default mongoose.model("Offer", offerSchema);
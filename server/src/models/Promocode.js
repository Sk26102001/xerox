import mongoose from "mongoose";

const promocodeSchema = new mongoose.Schema({
  code: String,
  discount: Number,
  expiryDate: Date
});

export default mongoose.model("Promocode", promocodeSchema);
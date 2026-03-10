import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import promocodeRoutes from "./routes/promocodeRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
// import paymentRoutes from "./routes/payment.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/promocode", promocodeRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/reports", reportRoutes);
// app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Print Shop API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
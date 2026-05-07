import Counter from "../models/Counter.js";

export const generateOrderNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "order" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  // Format number → 0001
  const padded = String(counter.seq).padStart(4, "0");

  // Format date → 19-03-2026
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const date = `${day}-${month}-${year}`;

  return `ORD-${padded}-${date}`;
};
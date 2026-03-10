import Order from "../models/Order.js";

export const getRevenue = async (req, res) => {
  try {
    const orders = await Order.find();

    const revenue = orders.reduce((total, order) => {
      return total + order.price;
    }, 0);

    res.json({ revenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
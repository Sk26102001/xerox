import axios from "axios";

export const createShipment = async (orderId: string) => {
  const res = await axios.post(
    "http://localhost:5000/api/shipping/create-shipment",
    { orderId }
  );
  return res.data;
};
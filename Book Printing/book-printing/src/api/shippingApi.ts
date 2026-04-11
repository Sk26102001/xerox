import axios from "axios";

export const createShipment = async (orderId: string) => {
  const res = await axios.post(
    "https://bookprinters.in/api/api/shipping/create-shipment",
    { orderId }
  );
  return res.data;
};
// import axios from "axios";

// // ✅ BASE URLs
// const CART_API = "http://localhost:5000/api/cart";
// const ORDER_API = "http://localhost:5000/api/orders";

// // ✅ AUTH HEADER (VERY IMPORTANT)
// const getAuthHeader = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`
//   }
// });

// // 🛒 SAVE TO CART
// export const saveToCart = (data: any) => {
//   return axios.post(CART_API, data, getAuthHeader());
// };

// // 🛒 GET CART
// export const getCart = () => {
//   return axios.get(CART_API, getAuthHeader());
// };

// // 🧾 UPDATE ITEM
// export const updateCartItem = (id: string, copies: number) => {
//   return axios.put(`${CART_API}/item/${id}`, { copies }, getAuthHeader());
// };

// // 🗑 DELETE ITEM
// export const deleteCartItem = (id: string) => {
//   return axios.delete(`${CART_API}/item/${id}`, getAuthHeader());
// };

// // 🧾 CREATE ORDER (CHECKOUT STEP)
// export const createOrder = () => {
//   return axios.post(ORDER_API, {}, getAuthHeader());
// };





// import axios from "axios";

// const API_URL = "http://localhost:5000/api";

// // ✅ Create axios instance with auth header
// const api = axios.create({
//   baseURL: API_URL,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // 🛒 SAVE TO CART
// export const saveToCart = async (data: any) => {
//   try {
//     const response = await api.post("/cart", data);
//     return response;
//   } catch (error) {
//     console.error("Save to cart error:", error);
//     throw error;
//   }
// };

// // 🛒 GET CART
// export const getCart = async () => {
//   try {
//     const response = await api.get("/cart");
//     return response;
//   } catch (error) {
//     console.error("Get cart error:", error);
//     throw error;
//   }
// };

// // 🧾 UPDATE ITEM
// export const updateCartItem = async (id: string, copies: number) => {
//   try {
//     const response = await api.put(`/cart/item/${id}`, { copies });
//     return response;
//   } catch (error) {
//     console.error("Update item error:", error);
//     throw error;
//   }
// };

// // 🗑 DELETE ITEM
// export const deleteCartItem = async (id: string) => {
//   try {
//     const response = await api.delete(`/cart/item/${id}`);
//     return response;
//   } catch (error) {
//     console.error("Delete item error:", error);
//     throw error;
//   }
// };

// // 🧾 CREATE ORDER
// export const createOrder = async () => {
//   try {
//     const response = await api.post("/orders");
//     return response;
//   } catch (error) {
//     console.error("Create order error:", error);
//     throw error;
//   }
// };

// // 🗑 CLEAR CART
// export const clearCart = async () => {
//   try {
//     const response = await api.delete("/cart");
//     return response;
//   } catch (error) {
//     console.error("Clear cart error:", error);
//     throw error;
//   }
// };






import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'https://bookprinters.in/api/api';

// ✅ Create axios instance with auth header
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🛒 ADD TO CART (APPENDS ITEMS)
export const addToCart = async (data: any) => {
  try {
    const response = await api.post("/cart", data);
    return response;
  } catch (error) {
    console.error("Add to cart error:", error);
    throw error;
  }
};

// 🛒 REPLACE CART (REPLACES ALL ITEMS)
export const replaceCart = async (data: any) => {
  try {
    const response = await api.put("/cart/replace", data);
    return response;
  } catch (error) {
    console.error("Replace cart error:", error);
    throw error;
  }
};

// 🛒 GET CART
export const getCart = async () => {
  try {
    const response = await api.get("/cart");
    return response;
  } catch (error) {
    console.error("Get cart error:", error);
    throw error;
  }
};

// 🧾 UPDATE ITEM
export const updateCartItem = async (id: string, copies: number) => {
  try {
    const response = await api.put(`/cart/item/${id}`, { copies });
    return response;
  } catch (error) {
    console.error("Update item error:", error);
    throw error;
  }
};

// 🗑 DELETE ITEM
export const deleteCartItem = async (id: string) => {
  try {
    const response = await api.delete(`/cart/item/${id}`);
    return response;
  } catch (error) {
    console.error("Delete item error:", error);
    throw error;
  }
};

// 🧾 CREATE ORDER
// export const createOrder = async () => {
//   try {
//     const response = await api.post("/orders");
//     return response;
//   } catch (error) {
//     console.error("Create order error:", error);
//     throw error;
//   }
// };

// 🧾 CREATE FINAL ORDER AFTER PAYMENT
export const createOrderAfterPayment = async (paymentId: string) => {
  try {
    const response = await api.post("/order/create", { paymentId });
    return response;
  } catch (error) {
    console.error("Create order error:", error);
    throw error;
  }
};

// 🗑 CLEAR CART
export const clearCart = async () => {
  try {
    const response = await api.delete("/cart");
    return response;
  } catch (error) {
    console.error("Clear cart error:", error);
    throw error;
  }
};




// import axios from "axios";

// const API_URL = "http://localhost:5000/api";

// // ✅ Create axios instance with auth header
// const api = axios.create({
//   baseURL: API_URL,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // 🛒 ADD TO CART (APPENDS ITEMS)
// export const addToCart = async (data: any) => {
//   try {
//     const response = await api.post("/cart", data);
//     return response;
//   } catch (error) {
//     console.error("Add to cart error:", error);
//     throw error;
//   }
// };

// // 🛒 REPLACE CART (REPLACES ALL ITEMS)
// export const replaceCart = async (data: any) => {
//   try {
//     const response = await api.put("/cart/replace", data);
//     return response;
//   } catch (error) {
//     console.error("Replace cart error:", error);
//     throw error;
//   }
// };

// // 🛒 GET CART
// export const getCart = async () => {
//   try {
//     const response = await api.get("/cart");
//     return response;
//   } catch (error) {
//     console.error("Get cart error:", error);
//     throw error;
//   }
// };

// // 🧾 UPDATE ITEM
// export const updateCartItem = async (id: string, copies: number) => {
//   try {
//     const response = await api.put(`/cart/item/${id}`, { copies });
//     return response;
//   } catch (error) {
//     console.error("Update item error:", error);
//     throw error;
//   }
// };

// // 🗑 DELETE ITEM
// export const deleteCartItem = async (id: string) => {
//   try {
//     const response = await api.delete(`/cart/item/${id}`);
//     return response;
//   } catch (error) {
//     console.error("Delete item error:", error);
//     throw error;
//   }
// };

// // 🧾 CREATE FINAL ORDER AFTER PAYMENT
// export const createOrderAfterPayment = async (paymentId: string) => {
//   try {
//     const response = await api.post("/order/create", { paymentId });
//     return response;
//   } catch (error) {
//     console.error("Create order error:", error);
//     throw error;
//   }
// };

// // 🗑 CLEAR CART
// export const clearCart = async () => {
//   try {
//     const response = await api.delete("/cart");
//     return response;
//   } catch (error) {
//     console.error("Clear cart error:", error);
//     throw error;
//   }
// };

// // ========== 📦 ORDER FUNCTIONS WITH PAYMENT ==========

// // 📋 GET ALL ORDERS FOR CURRENT USER (WITH PAYMENT DETAILS)
// export const getUserOrders = async () => {
//   try {
//     const response = await api.get("/orders/my-orders");
//     return response.data; // Returns { success: true, data: orders[] }
//   } catch (error) {
//     console.error("Get user orders error:", error);
//     throw error;
//   }
// };

// // 🔍 GET SINGLE ORDER BY ID (WITH PAYMENT DETAILS)
// export const getOrderById = async (orderId: string) => {
//   try {
//     const response = await api.get(`/orders/${orderId}`);
//     return response.data; // Returns { success: true, data: order }
//   } catch (error) {
//     console.error("Get order by ID error:", error);
//     throw error;
//   }
// };

// // 📊 GET ORDER SUMMARY WITH PAYMENT METHOD
// export const getOrderSummary = async (orderId: string) => {
//   try {
//     const response = await api.get(`/orders/${orderId}/summary`);
//     return response.data; // Returns simplified order with payment method
//   } catch (error) {
//     console.error("Get order summary error:", error);
//     throw error;
//   }
// };

// // 💰 GET PAYMENT DETAILS FOR AN ORDER
// export const getOrderPaymentDetails = async (orderId: string) => {
//   try {
//     const response = await api.get(`/orders/${orderId}/payment`);
//     return response.data; // Returns payment details
//   } catch (error) {
//     console.error("Get payment details error:", error);
//     throw error;
//   }
// };

// // 📋 GET ORDERS BY STATUS (WITH PAYMENT)
// export const getOrdersByStatus = async (status: string) => {
//   try {
//     const response = await api.get(`/orders/status/${status}`);
//     return response.data;
//   } catch (error) {
//     console.error("Get orders by status error:", error);
//     throw error;
//   }
// };

// // 📊 GET ORDERS WITH DATE RANGE
// export const getOrdersByDateRange = async (startDate: string, endDate: string) => {
//   try {
//     const response = await api.get(`/orders/date-range`, {
//       params: { startDate, endDate }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Get orders by date range error:", error);
//     throw error;
//   }
// };

// // 🔄 CANCEL ORDER
// export const cancelOrder = async (orderId: string, reason?: string) => {
//   try {
//     const response = await api.put(`/orders/${orderId}/cancel`, { reason });
//     return response.data;
//   } catch (error) {
//     console.error("Cancel order error:", error);
//     throw error;
//   }
// };

// // 📝 UPDATE ORDER STATUS (Admin)
// export const updateOrderStatus = async (orderId: string, status: string) => {
//   try {
//     const response = await api.put(`/orders/${orderId}/status`, { status });
//     return response.data;
//   } catch (error) {
//     console.error("Update order status error:", error);
//     throw error;
//   }
// };
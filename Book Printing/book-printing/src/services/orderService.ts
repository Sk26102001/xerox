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






// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || 'https://bookprinters.in/api/api';

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

// // 🧾 CREATE ORDER
// // export const createOrder = async () => {
// //   try {
// //     const response = await api.post("/orders");
// //     return response;
// //   } catch (error) {
// //     console.error("Create order error:", error);
// //     throw error;
// //   }
// // };

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




import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'https://bookprinters.in/api/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`📡 ${config.method?.toUpperCase()} ${config.url}`, config.data);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response:`, response.status);
    return response;
  },
  (error) => {
    console.error(`❌ Error:`, error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// 🛒 ADD TO CART - FIXED ENDPOINT
export const addToCart = async (data: any) => {
  try {
    // ✅ Use /cart/add endpoint (not /cart)
    const response = await api.post("/cart/add", data);
    return response;
  } catch (error) {
    console.error("Add to cart error:", error);
    throw error;
  }
};

// 🛒 REPLACE CART
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

// 🧾 UPDATE ITEM QUANTITY
export const updateCartItem = async (id: string, copies: number) => {
  try {
    const response = await api.put(`/cart/item/${id}`, { copies });
    return response;
  } catch (error) {
    console.error("Update item error:", error);
    throw error;
  }
};

// 🗑 DELETE ITEM FROM CART
export const deleteCartItem = async (id: string) => {
  try {
    const response = await api.delete(`/cart/item/${id}`);
    return response;
  } catch (error) {
    console.error("Delete item error:", error);
    throw error;
  }
};

// 📦 UPDATE DELIVERY CHARGE
export const updateDeliveryCharge = async (deliveryCharge: number) => {
  try {
    const response = await api.put("/cart/delivery-charge", { deliveryCharge });
    return response;
  } catch (error) {
    console.error("Update delivery charge error:", error);
    throw error;
  }
};

// 📍 UPDATE DELIVERY ADDRESS
export const updateCartAddress = async (addressData: {
  address: string;
  pincode: string;
  city: string;
  state: string;
  landmark?: string;
  addressType?: 'Home' | 'Office';
}) => {
  try {
    const response = await api.put("/cart/address", addressData);
    return response;
  } catch (error) {
    console.error("Update address error:", error);
    throw error;
  }
};

// 🧾 CREATE ORDER FROM CART
export const createOrderFromCart = async (orderData: any) => {
  try {
    const response = await api.post("/order/create-from-cart", orderData);
    return response;
  } catch (error) {
    console.error("Create order error:", error);
    throw error;
  }
};

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
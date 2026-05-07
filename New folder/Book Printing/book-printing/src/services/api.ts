// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || 'https://bookprinters.in/api/api';

// const api = axios.create({
//   baseURL: API_URL,
// });

// // auth interceptor
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // CART APIs ONLY
// export const addToCart = (data: any) => api.post("/cart", data);
// export const getCart = () => api.get("/cart");
// export const clearCart = () => api.delete("/cart");

// export const updateCartItem = (id: string, copies: number) =>
//   api.put(`/cart/item/${id}`, { copies });

// export const deleteCartItem = (id: string) =>
//   api.delete(`/cart/item/${id}`);




// api/api.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'https://bookprinters.in/api/api';

const api = axios.create({
  baseURL: API_URL,
});

// auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`📡 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.response?.status}`, error.response?.data);
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ✅ CART APIs - FIXED ENDPOINTS
export const addToCart = (data: any) => api.post("/cart/add", data);  // Changed from "/cart" to "/cart/add"
export const getCart = () => api.get("/cart");
export const clearCart = () => api.delete("/cart");

export const updateCartItem = (id: string, copies: number) =>
  api.put(`/cart/item/${id}`, { copies });

export const deleteCartItem = (id: string) =>
  api.delete(`/cart/item/${id}`);

// ✅ Additional cart functions
export const updateDeliveryCharge = (deliveryCharge: number) =>
  api.put("/cart/delivery-charge", { deliveryCharge });

export const updateCartAddress = (addressData: any) =>
  api.put("/cart/address", addressData);

export const replaceCart = (data: any) => api.put("/cart/replace", data);
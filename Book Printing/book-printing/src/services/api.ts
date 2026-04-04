import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// CART APIs ONLY
export const addToCart = (data: any) => api.post("/cart", data);
export const getCart = () => api.get("/cart");
export const clearCart = () => api.delete("/cart");

export const updateCartItem = (id: string, copies: number) =>
  api.put(`/cart/item/${id}`, { copies });

export const deleteCartItem = (id: string) =>
  api.delete(`/cart/item/${id}`);
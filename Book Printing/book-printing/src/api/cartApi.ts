// src/api/cartApi.ts
import { API } from "./api";
import { CartData, ApiResponse } from "../types/cart";

export const fetchCart = async (): Promise<CartData> => {
  try {
    const response = await API.get<CartData>("/cart");
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const saveCartToServer = async (cartData: CartData): Promise<CartData> => {
  try {
    const response = await API.post<CartData>("/cart", cartData);
    return response.data;
  } catch (error) {
    console.error("Error saving cart:", error);
    throw error;
  }
};

export const removeCartItemFromServer = async (itemId: string): Promise<CartData> => {
  try {
    const response = await API.delete<CartData>(`/cart/item/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing item:", error);
    throw error;
  }
};

export const updateCartItemQuantityOnServer = async (
  itemId: string, 
  copies: number
): Promise<CartData> => {
  try {
    const response = await API.put<CartData>(`/cart/item/${itemId}`, { copies });
    return response.data;
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw error;
  }
};

export const clearCartOnServer = async (): Promise<{ message: string }> => {
  try {
    const response = await API.delete<{ message: string }>("/cart");
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};
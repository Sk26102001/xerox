// src/store/cartStore.ts
import { create } from "zustand";
import { persist, PersistOptions, createJSONStorage } from "zustand/middleware";
import { 
  fetchCart, 
  saveCartToServer, 
  removeCartItemFromServer, 
  updateCartItemQuantityOnServer,
  clearCartOnServer
} from "../api/cartApi";
import { CartData } from "../types/cart";

interface CartState {
  cart: CartData | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  loadCart: () => Promise<void>;
  saveCart: (cartData: CartData) => Promise<CartData>;
  updateQuantity: (itemId: string, copies: number) => Promise<CartData>;
  removeItem: (itemId: string) => Promise<CartData>;
  clearCart: () => Promise<void>;
  getItemCount: () => number;
  getTotal: () => number;
  getPrintingCost: () => number;
  getGst: () => number;
}

type CartPersist = PersistOptions<CartState, Pick<CartState, 'cart'>>;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      loading: false,
      error: null,

      loadCart: async () => {
        set({ loading: true, error: null });
        try {
          const cart = await fetchCart();
          set({ cart, loading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || error.message, 
            loading: false 
          });
          console.error("Failed to load cart:", error);
        }
      },

      saveCart: async (cartData: CartData) => {
        set({ loading: true, error: null });
        try {
          const updatedCart = await saveCartToServer(cartData);
          set({ cart: updatedCart, loading: false });
          return updatedCart;
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || error.message, 
            loading: false 
          });
          throw error;
        }
      },

      updateQuantity: async (itemId: string, copies: number) => {
        set({ loading: true, error: null });
        try {
          const updatedCart = await updateCartItemQuantityOnServer(itemId, copies);
          set({ cart: updatedCart, loading: false });
          return updatedCart;
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || error.message, 
            loading: false 
          });
          throw error;
        }
      },

      removeItem: async (itemId: string) => {
        set({ loading: true, error: null });
        try {
          const updatedCart = await removeCartItemFromServer(itemId);
          set({ cart: updatedCart, loading: false });
          return updatedCart;
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || error.message, 
            loading: false 
          });
          throw error;
        }
      },

      clearCart: async () => {
        set({ loading: true, error: null });
        try {
          await clearCartOnServer();
          set({ cart: null, loading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || error.message, 
            loading: false 
          });
          throw error;
        }
      },

      getItemCount: () => {
        const { cart } = get();
        return cart?.items?.length || 0;
      },

      getTotal: () => {
        const { cart } = get();
        return cart?.totals?.totalWithDelivery || 0;
      },

      getPrintingCost: () => {
        const { cart } = get();
        return cart?.totals?.printingCost || 0;
      },

      getGst: () => {
        const { cart } = get();
        return cart?.totals?.gst || 0;
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    } as CartPersist
  )
);
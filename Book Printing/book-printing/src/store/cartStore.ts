import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { PaperSize, PaperType, PrintColor, PrintSide, BindingType } from '@/lib/pricingData';

export interface CartItem {
  id: string;
  files: Array<{
    name: string;
    size: number;
    type: string;
    // you can store File only temporarily – better to upload to server and keep only URLs
  }>;
  pages: number;
  copies: number;
  paperSize: PaperSize;
  paperType: PaperType;
  printColor: PrintColor;
  printSide: PrintSide;
  bindingType: BindingType;
  lamination: 'none' | 'glossy' | 'matt' | 'velvate';
  instructions: string;
  // optional: calculated price snapshot
  calculatedPrice?: {
    pricePerPage: number;
    printingCost: number;
    bindingCost: number;
    gst: number;
    grandTotal: number;
  };
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...item,
              id: crypto.randomUUID(), // or Date.now().toString() + Math.random()
            },
          ],
        })),

      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((it) =>
            it.id === id ? { ...it, ...updates } : it
          ),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((it) => it.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      itemCount: () => get().items.length,

      subtotal: () => {
        // If you store calculatedPrice → sum it
        // Otherwise re-calculate using calculatePrice()
        return get().items.reduce((sum, item) => {
          // Option A: use stored price (recommended)
          if (item.calculatedPrice) return sum + item.calculatedPrice.grandTotal;
          
          // Option B: re-calculate on the fly (less performant but always fresh)
          // const price = calculatePrice({ pages: item.pages, copies: item.copies, ... });
          // return sum + price.grandTotal;
          
          return sum;
        }, 0);
      },
    }),
    {
      name: 'bookprinters-cart',               // key in localStorage
      storage: createJSONStorage(() => localStorage),
      // partialize: (state) => ({ items: state.items }), // if you want to save only items
    }
  )
);
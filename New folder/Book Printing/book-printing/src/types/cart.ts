// src/types/cart.ts
export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'done' | 'error';
  url?: string;
  progress?: number;
}

export interface CartItem {
  id: string;
  pages: number;
  copies: number;
  paperSize?: string;
  paperType?: string;
  printColor?: 'bw' | 'color';
  printSide?: 'single' | 'double';
  bindingType?: string;
  lamination?: string;
  instructions?: string;
  files?: UploadedFile[];
}

export interface CartTotals {
  printingCost: number;
  gst: number;
  totalWithDelivery: number;
}

export interface CustomerInfo {
  name?: string;
  phone?: string;
  address?: string;
  pincode?: string;
  city?: string;
  state?: string;
}

export interface CartData {
  items: CartItem[];
  orderMode: 'single' | 'bulk';
  deliveryType: 'pickup' | 'courier';
  customer: CustomerInfo;
  totals: CartTotals;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
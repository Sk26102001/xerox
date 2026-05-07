export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: string;
  totalOrders: number;
  totalSpending: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  fileName: string;
  fileType: string;
  totalPages: number;
  printType: 'bw' | 'color';
  copies: number;
  paperSize: string;
  paperType: string;
  printSide: 'single' | 'double';
  bindingType: string;
  bindingCost: number;
  laminationCost: number;
  deliveryType: 'pickup' | 'delivery';
  address?: string;
  promocode?: string;
  discount: number;
  perPageCost: number;
  printingCost: number;
  gst: number;
  totalCost: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'received' | 'processing' | 'printing' | 'ready' | 'completed' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'cod';

export interface Pricing {
  bwPrice: number;
  colorPrice: number;
  bindingPrice: number;
  laminationPrice: number;
  doubleSidedDiscount: number;
  urgentFee: number;
}

export interface Promocode {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  appliesTo: 'all' | 'bw' | 'color' | 'student';
  startDate: string;
  endDate: string;
  active: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isAdmin: boolean;
}

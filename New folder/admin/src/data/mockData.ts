import { User, Order, Pricing, Promocode, Offer } from '@/types';

export const mockPricing: Pricing = {
  bwPrice: 0.50,
  colorPrice: 5.00,
  bindingPrice: 20,
  laminationPrice: 30,
  doubleSidedDiscount: 10,
  urgentFee: 50,
};

export const mockUsers: User[] = [
  { id: 'u1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', role: 'user', createdAt: '2025-11-15', totalOrders: 12, totalSpending: 2450 },
  { id: 'u2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 87654 32109', role: 'user', createdAt: '2025-12-01', totalOrders: 8, totalSpending: 1820 },
  { id: 'u3', name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 76543 21098', role: 'user', createdAt: '2026-01-10', totalOrders: 5, totalSpending: 960 },
  { id: 'u4', name: 'Sneha Reddy', email: 'sneha@example.com', phone: '+91 65432 10987', role: 'user', createdAt: '2026-01-20', totalOrders: 15, totalSpending: 3200 },
  { id: 'u5', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 54321 09876', role: 'user', createdAt: '2026-02-05', totalOrders: 3, totalSpending: 540 },
  { id: 'admin1', name: 'Admin User', email: 'admin@printshop.com', phone: '+91 99999 99999', role: 'admin', createdAt: '2025-01-01', totalOrders: 0, totalSpending: 0 },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001', userId: 'u1', userName: 'Rahul Sharma', userEmail: 'rahul@example.com', userPhone: '+91 98765 43210',
    fileName: 'thesis.pdf', fileType: 'PDF', totalPages: 120, printType: 'bw', copies: 2,
    paperSize: 'A4', paperType: '70 GSM', printSide: 'double', bindingType: 'Perfect Glue Binding',
    bindingCost: 20, laminationCost: 0, deliveryType: 'pickup', discount: 0,
    perPageCost: 0.50, printingCost: 120, gst: 25.20, totalCost: 165.20,
    status: 'completed', paymentStatus: 'paid', paymentMethod: 'Razorpay', transactionId: 'TXN001',
    createdAt: '2026-02-20', updatedAt: '2026-02-21',
  },
  {
    id: 'ORD-002', userId: 'u2', userName: 'Priya Patel', userEmail: 'priya@example.com', userPhone: '+91 87654 32109',
    fileName: 'brochure.pdf', fileType: 'PDF', totalPages: 16, printType: 'color', copies: 50,
    paperSize: 'A4', paperType: '100 GSM', printSide: 'double', bindingType: 'Staple Binding',
    bindingCost: 0, laminationCost: 30, deliveryType: 'delivery', address: '123 MG Road, Mumbai',
    discount: 50, perPageCost: 5.00, printingCost: 4000, gst: 716.40, totalCost: 4696.40,
    status: 'processing', paymentStatus: 'paid', paymentMethod: 'UPI', transactionId: 'TXN002',
    createdAt: '2026-02-28', updatedAt: '2026-02-28',
  },
  {
    id: 'ORD-003', userId: 'u3', userName: 'Amit Kumar', userEmail: 'amit@example.com', userPhone: '+91 76543 21098',
    fileName: 'notes.docx', fileType: 'DOCX', totalPages: 45, printType: 'bw', copies: 1,
    paperSize: 'A4', paperType: '70 GSM', printSide: 'single', bindingType: 'Spiral Binding',
    bindingCost: 30, laminationCost: 0, deliveryType: 'pickup', discount: 0,
    perPageCost: 0.50, printingCost: 22.50, gst: 9.45, totalCost: 61.95,
    status: 'received', paymentStatus: 'pending',
    createdAt: '2026-03-01', updatedAt: '2026-03-01',
  },
  {
    id: 'ORD-004', userId: 'u4', userName: 'Sneha Reddy', userEmail: 'sneha@example.com', userPhone: '+91 65432 10987',
    fileName: 'report.pdf', fileType: 'PDF', totalPages: 80, printType: 'color', copies: 3,
    paperSize: 'A3', paperType: '100 GSM', printSide: 'double', bindingType: 'Hard Cover Binding',
    bindingCost: 100, laminationCost: 30, deliveryType: 'delivery', address: '456 Anna Salai, Chennai',
    promocode: 'SAVE10', discount: 130, perPageCost: 5.00, printingCost: 1200, gst: 216,
    totalCost: 1416, status: 'printing', paymentStatus: 'paid', paymentMethod: 'Card', transactionId: 'TXN004',
    createdAt: '2026-03-01', updatedAt: '2026-03-02',
  },
  {
    id: 'ORD-005', userId: 'u5', userName: 'Vikram Singh', userEmail: 'vikram@example.com', userPhone: '+91 54321 09876',
    fileName: 'presentation.pdf', fileType: 'PDF', totalPages: 30, printType: 'color', copies: 5,
    paperSize: 'A4', paperType: '100 GSM', printSide: 'single', bindingType: 'No Binding',
    bindingCost: 0, laminationCost: 0, deliveryType: 'pickup', discount: 0,
    perPageCost: 5.00, printingCost: 750, gst: 135, totalCost: 885,
    status: 'ready', paymentStatus: 'cod',
    createdAt: '2026-03-02', updatedAt: '2026-03-02',
  },
  {
    id: 'ORD-006', userId: 'u1', userName: 'Rahul Sharma', userEmail: 'rahul@example.com', userPhone: '+91 98765 43210',
    fileName: 'invoice.pdf', fileType: 'PDF', totalPages: 5, printType: 'bw', copies: 10,
    paperSize: 'A4', paperType: '70 GSM', printSide: 'single', bindingType: 'No Binding',
    bindingCost: 0, laminationCost: 0, deliveryType: 'pickup', discount: 0,
    perPageCost: 0.50, printingCost: 25, gst: 4.50, totalCost: 29.50,
    status: 'cancelled', paymentStatus: 'failed',
    createdAt: '2026-02-25', updatedAt: '2026-02-25',
  },
];

export const mockPromocodes: Promocode[] = [
  { id: 'p1', code: 'SAVE10', discountType: 'percentage', discountValue: 10, minOrder: 100, expiryDate: '2026-06-30', usageLimit: 100, usedCount: 23, active: true },
  { id: 'p2', code: 'PRINT50', discountType: 'fixed', discountValue: 50, minOrder: 200, expiryDate: '2026-04-30', usageLimit: 50, usedCount: 12, active: true },
  { id: 'p3', code: 'FIRST20', discountType: 'percentage', discountValue: 20, minOrder: 50, expiryDate: '2026-12-31', usageLimit: 500, usedCount: 89, active: true },
  { id: 'p4', code: 'EXPIRED5', discountType: 'fixed', discountValue: 5, minOrder: 10, expiryDate: '2025-12-31', usageLimit: 10, usedCount: 10, active: false },
];

export const mockOffers: Offer[] = [
  { id: 'o1', title: 'Student Special', description: '15% off for students on all orders', discountType: 'percentage', discountValue: 15, appliesTo: 'student', startDate: '2026-01-01', endDate: '2026-06-30', active: true },
  { id: 'o2', title: 'Color Print Sale', description: 'Flat ₹2 off per color page', discountType: 'fixed', discountValue: 2, appliesTo: 'color', startDate: '2026-03-01', endDate: '2026-03-31', active: true },
  { id: 'o3', title: 'Weekend B&W Bonanza', description: '20% off on B&W prints', discountType: 'percentage', discountValue: 20, appliesTo: 'bw', startDate: '2026-03-01', endDate: '2026-03-15', active: false },
];

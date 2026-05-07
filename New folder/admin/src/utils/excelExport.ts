import * as XLSX from 'xlsx';
import { Order } from '@/types';

export function exportOrdersToExcel(orders: Order[]) {
  const data = orders.map(o => ({
    'Order ID': o.id,
    'Customer': o.userName,
    'Email': o.userEmail,
    'Phone': o.userPhone,
    'File': o.fileName,
    'File Type': o.fileType,
    'Pages': o.totalPages,
    'Print Type': o.printType === 'bw' ? 'B&W' : 'Color',
    'Copies': o.copies,
    'Paper Size': o.paperSize,
    'Paper Type': o.paperType,
    'Print Side': o.printSide,
    'Binding': o.bindingType,
    'Delivery': o.deliveryType,
    'Address': o.address || '',
    'Per Page (₹)': o.perPageCost,
    'Printing (₹)': o.printingCost,
    'Binding (₹)': o.bindingCost,
    'Discount (₹)': o.discount,
    'GST (₹)': o.gst,
    'Total (₹)': o.totalCost,
    'Status': o.status,
    'Payment': o.paymentStatus,
    'Payment Method': o.paymentMethod || '',
    'Transaction ID': o.transactionId || '',
    'Order Date': o.createdAt,
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Orders');

  // Auto-width columns
  const colWidths = Object.keys(data[0] || {}).map(key => ({
    wch: Math.max(key.length, ...data.map(r => String((r as any)[key]).length)) + 2,
  }));
  ws['!cols'] = colWidths;

  XLSX.writeFile(wb, `Orders_${new Date().toISOString().split('T')[0]}.xlsx`);
}

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Order } from '@/types';
import { GST_RATE } from '@/data/pricingData';

export function generateInvoicePDF(order: Order) {
  const doc = new jsPDF();
  const gstPercent = GST_RATE * 100;

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 105, 20, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('PrintShop', 14, 35);
  doc.text('Professional Printing Services', 14, 40);

  // Invoice details
  doc.setFont('helvetica', 'bold');
  doc.text(`Invoice #: ${order.id}`, 140, 35);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${order.createdAt}`, 140, 40);
  doc.text(`Status: ${order.status.toUpperCase()}`, 140, 45);
  doc.text(`Payment: ${order.paymentStatus.toUpperCase()}`, 140, 50);

  // Customer info
  doc.setDrawColor(200);
  doc.line(14, 55, 196, 55);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To:', 14, 62);
  doc.setFont('helvetica', 'normal');
  doc.text(order.userName, 14, 68);
  doc.text(order.userEmail, 14, 73);
  doc.text(order.userPhone, 14, 78);
  if (order.address) doc.text(order.address, 14, 83);

  // Order details table
  const startY = order.address ? 90 : 85;
  autoTable(doc, {
    startY,
    head: [['Description', 'Details']],
    body: [
      ['File', `${order.fileName} (${order.fileType})`],
      ['Pages', String(order.totalPages)],
      ['Print Type', order.printType === 'bw' ? 'Black & White' : 'Color'],
      ['Copies', String(order.copies)],
      ['Paper', `${order.paperSize} - ${order.paperType}`],
      ['Print Side', order.printSide === 'double' ? 'Double Sided' : 'Single Sided'],
      ['Binding', order.bindingType],
      ['Delivery', order.deliveryType === 'pickup' ? 'Pickup' : 'Delivery'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [0, 188, 212] },
    styles: { fontSize: 9 },
  });

  // Cost breakdown table
  const costY = (doc as any).lastAutoTable.finalY + 10;
  const costRows: (string | number)[][] = [
    ['Per Page Cost', `₹${order.perPageCost.toFixed(2)}`],
    ['Printing Cost', `₹${order.printingCost.toFixed(2)}`],
    ['Binding Cost', `₹${order.bindingCost.toFixed(2)}`],
  ];
  if (order.discount > 0) costRows.push(['Discount', `-₹${order.discount.toFixed(2)}`]);
  costRows.push([`GST (${gstPercent}%)`, `₹${order.gst.toFixed(2)}`]);
  costRows.push(['TOTAL', `₹${order.totalCost.toFixed(2)}`]);

  autoTable(doc, {
    startY: costY,
    head: [['Item', 'Amount']],
    body: costRows,
    theme: 'grid',
    headStyles: { fillColor: [0, 188, 212] },
    styles: { fontSize: 9 },
    columnStyles: { 1: { halign: 'right' } },
    didParseCell: (data) => {
      if (data.row.index === costRows.length - 1 && data.section === 'body') {
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fontSize = 11;
      }
    },
  });

  if (order.transactionId) {
    const txnY = (doc as any).lastAutoTable.finalY + 8;
    doc.setFontSize(9);
    doc.text(`Transaction ID: ${order.transactionId}`, 14, txnY);
  }

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128);
  doc.text('Thank you for your business!', 105, 285, { align: 'center' });

  doc.save(`Invoice-${order.id}.pdf`);
}

// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// import { FileText, Download, Eye, Clock, CheckCircle, Printer, Truck, Package, Filter } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// interface Order {
//   id: string;
//   date: string;
//   pages: number;
//   copies: number;
//   paperSize: string;
//   printColor: string;
//   bindingType: string;
//   amount: number;
//   status: 'pending' | 'printing' | 'ready' | 'completed' | 'dispatched';
//   deliveryType: string;
// }

// const mockOrders: Order[] = [
//   {
//     id: 'BP20260219001',
//     date: '2026-02-19',
//     pages: 200,
//     copies: 2,
//     paperSize: 'A4',
//     printColor: 'B&W',
//     bindingType: 'Perfect Glue',
//     amount: 425.60,
//     status: 'printing',
//     deliveryType: 'Store Pickup',
//   },
//   {
//     id: 'BP20260215002',
//     date: '2026-02-15',
//     pages: 350,
//     copies: 5,
//     paperSize: 'B5',
//     printColor: 'B&W',
//     bindingType: 'Hardbound',
//     amount: 1280.50,
//     status: 'completed',
//     deliveryType: 'Courier',
//   },
//   {
//     id: 'BP20260210003',
//     date: '2026-02-10',
//     pages: 120,
//     copies: 1,
//     paperSize: 'A5',
//     printColor: 'Color',
//     bindingType: 'Spiral',
//     amount: 840.00,
//     status: 'completed',
//     deliveryType: 'Store Pickup',
//   },
//   {
//     id: 'BP20260201004',
//     date: '2026-02-01',
//     pages: 500,
//     copies: 10,
//     paperSize: 'A4',
//     printColor: 'B&W',
//     bindingType: 'Perfect Glue',
//     amount: 3150.00,
//     status: 'completed',
//     deliveryType: 'Courier',
//   },
// ];

// const statusColors: Record<Order['status'], string> = {
//   pending: 'bg-yellow-100 text-yellow-700',
//   printing: 'bg-blue-100 text-blue-700',
//   ready: 'bg-green-100 text-green-700',
//   dispatched: 'bg-purple-100 text-purple-700',
//   completed: 'bg-primary/10 text-primary',
// };

// const statusIcons: Record<Order['status'], any> = {
//   pending: Clock,
//   printing: Printer,
//   ready: CheckCircle,
//   dispatched: Truck,
//   completed: CheckCircle,
// };

// // Invoice Generator Component
// // function InvoiceModal({ order, onClose }: { order: Order; onClose: () => void }) {
// //   const gst = order.amount / 1.18 * 0.18;
// //   const baseAmount = order.amount - gst;
// // //   const totalGstRate = 0.14; // 5% + 9%
// // // const baseAmount = order.amount / (1 + totalGstRate);
// // // const cgst = baseAmount * 0.05;
// // // const sgst = baseAmount * 0.09;

// //   const handlePrint = () => {
// //     window.print();
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
// //       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
// //         {/* Invoice */}
// //         <div id="invoice-print" className="p-8">
// //           {/* Header */}
// //           <div className="flex justify-between items-start border-b-2 border-secondary pb-6 mb-6">
// //             <div>
// //               <h1 className="text-xl font-black text-secondary">Shree Education and Publication private limited</h1>
// //               <p className="text-muted-foreground text-sm">Where Ideas Ink Themselves</p>
// //               <p className="text-muted-foreground text-sm mt-1">Rajasthan, India</p>
// //               <p className="text-muted-foreground text-sm">GSTIN: 08ABECS6515Q1ZP</p>
// //             </div>
// //             <div className="text-right">
// //               <div className="bg-primary text-white px-4 py-2 rounded-lg">
// //                 <p className="text-xs opacity-80">TAX INVOICE</p>
// //                 <p className="font-bold">#{order.id}</p>
// //               </div>
// //               <p className="text-muted-foreground text-sm mt-2">Date: {order.date}</p>
// //             </div>
// //           </div>

// //           {/* Customer */}
// //           <div className="grid grid-cols-2 gap-6 mb-6">
// //             <div>
// //               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Bill To</p>
// //               <p className="font-semibold text-foreground">Customer Name</p>
// //               <p className="text-muted-foreground text-sm">customer@email.com</p>
// //               <p className="text-muted-foreground text-sm">+91 XXXXX XXXXX</p>
// //             </div>
// //             <div className="text-right">
// //               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Order Info</p>
// //               <p className="text-sm text-muted-foreground">Delivery: {order.deliveryType}</p>
// //               <p className="text-sm text-muted-foreground">Payment: Razorpay</p>
// //             </div>
// //           </div>

// //           {/* Items Table */}
// //           <table className="w-full mb-6">
// //             <thead>
// //               <tr className="bg-secondary text-white">
// //                 <th className="p-3 text-left text-sm font-semibold rounded-tl-lg">Description</th>
// //                 <th className="p-3 text-center text-sm font-semibold">Qty</th>
// //                 <th className="p-3 text-right text-sm font-semibold">Rate</th>
// //                 <th className="p-3 text-right text-sm font-semibold rounded-tr-lg">Amount</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               <tr className="border-b border-border">
// //                 <td className="p-3 text-sm">
// //                   <p className="font-medium">{order.printColor} Printing — {order.paperSize}</p>
// //                   <p className="text-muted-foreground text-xs">{order.pages} pages × {order.copies} copies × {order.bindingType} binding</p>
// //                 </td>
// //                 <td className="p-3 text-center text-sm">{order.copies}</td>
// //                 <td className="p-3 text-right text-sm">₹{(baseAmount / order.copies).toFixed(2)}</td>
// //                 <td className="p-3 text-right text-sm font-medium">₹{baseAmount.toFixed(2)}</td>
// //               </tr>
// //             </tbody>
// //           </table>

// //           {/* Totals */}
// //           <div className="flex justify-end">
// //             <div className="w-56 space-y-2">
// //               <div className="flex justify-between text-sm">
// //                 <span className="text-muted-foreground">Subtotal</span>
// //                 <span>₹{baseAmount.toFixed(2)}</span>
// //               </div>
// //               <div className="flex justify-between text-sm">
// //                 <span className="text-muted-foreground">CGST (5%)</span>
// //                 <span>₹{(gst / 2).toFixed(2)}</span>
// //               </div>
// //               <div className="flex justify-between text-sm">
// //                 <span className="text-muted-foreground">SGST (9%)</span>
// //                 <span>₹{(gst / 2).toFixed(2)}</span>
// //               </div>
// //               <div className="flex justify-between font-black text-lg border-t-2 border-secondary pt-2 mt-2">
// //                 <span>TOTAL</span>
// //                 <span className="text-primary">₹{order.amount.toFixed(2)}</span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Footer */}
// //           <div className="mt-8 pt-6 border-t border-border text-center">
// //             <p className="text-muted-foreground text-xs">Thank you for choosing BookPrinters.in</p>
// //             <p className="text-muted-foreground text-xs">This is a computer-generated invoice and does not require a physical signature.</p>
// //           </div>
// //         </div>

// //         {/* Actions */}
// //         <div className="px-8 pb-6 flex gap-3 no-print">
// //           <button
// //             onClick={onClose}
// //             className="flex-1 border border-border text-foreground font-medium py-2.5 rounded-lg hover:bg-muted transition-all duration-200"
// //           >
// //             Close
// //           </button>
// //           <button
// //             onClick={handlePrint}
// //             className="flex-1 bg-primary text-primary-foreground font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2"
// //           >
// //             <Download className="h-4 w-4" /> Download / Print
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// function InvoiceModal({ order, onClose }: { order: Order; onClose: () => void }) {
//   // 5% total GST (2.5% CGST + 2.5% SGST)
//   const totalGstRate = 0.05;
//   const baseAmount = order.amount / (1 + totalGstRate);
//   const gst = order.amount - baseAmount;
//   const cgst = gst / 2;   // 2.5%
//   const sgst = gst / 2;   // 2.5%

//   // const handlePrint = () => {
//   //   window.print();


// const handleDownload = async () => {
//   const invoice = document.getElementById("invoice-print");
//   if (!invoice) return;

//   const canvas = await html2canvas(invoice, {
//     scale: 2,
//     useCORS: true,
//   });

//   const imgData = canvas.toDataURL("image/png");

//   const pdf = new jsPDF("p", "mm", "a4");

//   const pdfWidth = 210;  // A4 width in mm
//   const pdfHeight = 297; // A4 height in mm

//   // Calculate image ratio
//   const imgWidth = pdfWidth;
//   const imgHeight = (canvas.height * imgWidth) / canvas.width;

//   // If content is taller than A4, scale it down
//   const finalHeight =
//     imgHeight > pdfHeight ? pdfHeight : imgHeight;

//   pdf.addImage(
//     imgData,
//     "PNG",
//     0,
//     0,
//     pdfWidth,
//     finalHeight
//   );

//   pdf.save(`Invoice-${order.id}.pdf`);
// };
//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
//         {/* Invoice Content */}
//         <div
//   id="invoice-print"
//   className="p-8 md:p-10 bg-white w-[794px] mx-auto"
// >
//           {/* Header */}
//           <div className="flex justify-between items-start border-b-2 border-secondary pb-6 mb-6">
//             <div>
//               <h1 className="text-xl font-black text-secondary">
//                 Shree Education and Publication private limited
//               </h1>
//               <p className="text-muted-foreground text-sm mt-1">
//                 Mother’s School Campus
// Gaddi Maliyan, Jonsganj Road

//               </p>
//               <p className="text-muted-foreground text-sm">
//                  AJMER, Rajasthan – 305001
// India
//               </p>
//               <p className="text-muted-foreground text-sm mt-1">
//                 Phone: 7230001405 | Email: shreedupub@gmail.com
//               </p>
//               <p className="text-muted-foreground text-sm font-medium mt-1">
//                 GSTIN: 08ABECS6515Q1ZP
//               </p>
//             </div>
//             <div className="text-right">
//               <div className="bg-primary text-white px-5 py-3 rounded-lg inline-block">
//                 <p className="text-xs opacity-90">TAX INVOICE</p>
//                 <p className="font-bold text-lg">#{order.id }</p>
//               </div>
//               <p className="text-muted-foreground text-sm mt-3">
//                 Date: {order.date || "07-02-2026"}
//               </p>
//               <p className="text-muted-foreground text-sm">
//                 Place of Supply: 09-Uttar Pradesh
//               </p>
//             </div>
//           </div>

//           {/* Bill To / Ship To */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="md:col-span-2">
//               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
//                 Bill To / Ship To
//               </p>
//               <p className="font-semibold">Diwakar Education Hub</p>
//               <p className="text-muted-foreground text-sm">
//                 NA NA NA Barampur Kiratpur
//               </p>
//               <p className="text-muted-foreground text-sm">
//                 Contact No: 7310762592
//               </p>
//               <p className="text-muted-foreground text-sm font-medium">
//                 GSTIN: 09GAIPS3840G1ZB
//               </p>
//               <p className="text-muted-foreground text-sm">State: 09-Uttar Pradesh</p>
//             </div>

//             <div>
//               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
//                 Invoice Details
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 Invoice No: {order.id }
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 Date: {order.date || "07-02-2026"}
//               </p>
//             </div>
//           </div>

//           {/* Items Table */}
//           <table className="w-full mb-8 text-sm">
//             <thead>
//               <tr className="bg-secondary text-white">
//                 <th className="p-3 text-left rounded-tl-lg">#</th>
//                 <th className="p-3 text-left">Item name</th>
//                 <th className="p-3 text-center">HSN/SAC</th>
//                 <th className="p-3 text-center">Quantity</th>
//                 <th className="p-3 text-right">Price/unit</th>
//                 <th className="p-3 text-right rounded-tr-lg">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-b">
//                 <td className="p-3">1</td>
//                 <td className="p-3">UGC NET Psychology PYQ</td>
//                 <td className="p-3 text-center">—</td>
//                 <td className="p-3 text-center">50</td>
//                 <td className="p-3 text-right">₹165.00</td>
//                 <td className="p-3 text-right font-medium">₹8,250.00</td>
//               </tr>
//               <tr className="border-b">
//                 <td className="p-3">2</td>
//                 <td className="p-3">CUET PG English Theory Book</td>
//                 <td className="p-3 text-center">—</td>
//                 <td className="p-3 text-center">50</td>
//                 <td className="p-3 text-right">₹116.00</td>
//                 <td className="p-3 text-right font-medium">₹5,800.00</td>
//               </tr>
//               <tr className="border-b">
//                 <td className="p-3">3</td>
//                 <td className="p-3">JAILIB Hindi Medium education</td>
//                 <td className="p-3 text-center">—</td>
//                 <td className="p-3 text-center">30</td>
//                 <td className="p-3 text-right">₹169.00</td>
//                 <td className="p-3 text-right font-medium">₹5,070.00</td>
//               </tr>
//               <tr className="border-b">
//                 <td className="p-3">4</td>
//                 <td className="p-3">CUET ug physical education</td>
//                 <td className="p-3 text-center">—</td>
//                 <td className="p-3 text-center">50</td>
//                 <td className="p-3 text-right">₹92.00</td>
//                 <td className="p-3 text-right font-medium">₹4,600.00</td>
//               </tr>
//               <tr className="border-b">
//                 <td className="p-3">5</td>
//                 <td className="p-3">JAILIB English Medium</td>
//                 <td className="p-3 text-center">—</td>
//                 <td className="p-3 text-center">30</td>
//                 <td className="p-3 text-right">₹184.00</td>
//                 <td className="p-3 text-right font-medium">₹5,520.00</td>
//               </tr>
//               <tr className="font-bold bg-gray-50">
//                 <td colSpan={5} className="p-3 text-right">
//                   Total
//                 </td>
//                 <td className="p-3 text-right">₹29,240.00</td>
//               </tr>
//             </tbody>
//           </table>

//           {/* Amount in Words & Totals */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
//             <div>
//               <p className="font-medium">
//                 Invoice Amount In Words:
//               </p>
//               <p className="text-lg font-semibold text-secondary mt-1">
//                 Twenty Nine Thousand Two Hundred and Forty Rupees only
//               </p>
//             </div>

//             <div className="w-64 space-y-2 text-right">
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Sub Total</span>
//                 <span>₹{baseAmount.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">CGST (2.5%)</span>
//                 <span>₹{cgst.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">SGST (2.5%)</span>
//                 <span>₹{sgst.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-black text-lg border-t-2 border-secondary pt-2 mt-2">
//                 <span>TOTAL</span>
//                 <span className="text-primary">₹{order.amount.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           {/* Payment Mode & Bank Details */}
//           <div className="grid md:grid-cols-2 gap-8 mb-8">
//             <div>
//               <p className="font-medium mb-2">Payment Mode</p>
//               <p className="text-muted-foreground">
//                 Shree Education And Publication Private Limited
//               </p>
//             </div>

//             <div>
//               <p className="font-medium mb-2">Bank Details</p>
//               <p className="text-sm text-muted-foreground">
//                 <strong>Name:</strong> State Bank Of India, Chandervardai, Ajmer
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 <strong>Account No:</strong> 39918178182
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 <strong>IFSC Code:</strong> SBIN0032089
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 <strong>Account Holder:</strong> Shree Education And Publication Private Limited
//               </p>
//             </div>
//           </div>

//           {/* Terms & Authorized Signatory */}
//           <div className="grid md:grid-cols-2 gap-8 mb-8">
//             <div>
//               <p className="font-medium mb-2">Terms and conditions</p>
//               <p className="text-sm text-muted-foreground">
//                 Thank you for doing business with us.
//               </p>
//             </div>

//             <div className="text-right">
//               <p className="font-medium mb-2">For: Shree Education and Publication private limited</p>
//               <div className="mt-10 border-t border-gray-400 w-48 ml-auto pt-2">
//                 <p className="text-sm">Authorized Signatory</p>
//               </div>
//             </div>
//           </div>

//           {/* Acknowledgment */}
//           <div className="border-t-2 border-secondary pt-6 mt-10 text-center">
//             <h4 className="font-bold text-lg mb-4">Acknowledgment</h4>
//             <p className="text-muted-foreground">
//               Shree Education and Publication private limited
//             </p>
//             <div className="mt-8 grid md:grid-cols-2 gap-6 text-left text-sm">
//               <div>
//                 <p><strong>Invoice To:</strong> Diwakar Education Hub</p>
//                 <p>NA NA NA Barampur Kiratpur</p>
//               </div>
//               <div>
//                 <p><strong>Invoice Details:</strong></p>
//                 <p>Invoice No: 107</p>
//                 <p>Invoice Date: 07-02-2026</p>
//                 <p>Total: ₹{order.amount.toFixed(2)}</p>
//               </div>
//             </div>
//             <div className="mt-10 border-t border-dashed pt-6">
//               <p className="text-muted-foreground text-sm">
//                 Receiver's Seal & Sign .......................................................
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons (non-printable) */}
//         <div className="px-8 pb-8 flex gap-4 no-print">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-border text-foreground font-medium py-3 rounded-lg hover:bg-muted transition-all"
//           >
//             Close
//           </button>
//           <button
//             onClick={handleDownload}
//             className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
//           >
//             <Download className="h-4 w-4" /> Print / Download
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// export default function OrderHistoryPage() {
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [filter, setFilter] = useState<'all' | Order['status']>('all');

//   const filteredOrders = filter === 'all' ? mockOrders : mockOrders.filter((o) => o.status === filter);

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <div className="pt-20">
//         {/* Header */}
//         <div className="bg-secondary py-10">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Order History</h1>
//               <p className="text-white/60">View and manage all your past orders</p>
//             </div>
//             <Link
//               to="/order"
//               className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105"
//             >
//               <Package className="h-4 w-4" /> New Order
//             </Link>
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Stats Row */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
//             {[
//               { label: 'Total Orders', value: mockOrders.length, icon: Package },
//               { label: 'Completed', value: mockOrders.filter(o => o.status === 'completed').length, icon: CheckCircle },
//               { label: 'In Progress', value: mockOrders.filter(o => o.status !== 'completed').length, icon: Printer },
//               { label: 'Total Spent', value: `₹${mockOrders.reduce((a, o) => a + o.amount, 0).toFixed(0)}`, icon: FileText },
//             ].map((stat) => (
//               <div key={stat.label} className="bg-white rounded-xl border border-border p-4 shadow-sm">
//                 <div className="flex items-center gap-3">
//                   <div className="bg-primary/10 p-2 rounded-lg">
//                     <stat.icon className="h-4 w-4 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-xl font-black text-foreground">{stat.value}</p>
//                     <p className="text-xs text-muted-foreground">{stat.label}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Filters */}
//           <div className="flex items-center gap-2 mb-6 flex-wrap">
//             <Filter className="h-4 w-4 text-muted-foreground" />
//             {(['all', 'printing', 'completed', 'pending'] as const).map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
//                   filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
//                 }`}
//               >
//                 {f.charAt(0).toUpperCase() + f.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* Orders Table */}
//           <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-muted/50 border-b border-border">
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Order ID</th>
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Date</th>
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Details</th>
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Status</th>
//                     <th className="text-right p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Amount</th>
//                     <th className="text-right p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredOrders.map((order, i) => {
//                     const StatusIcon = statusIcons[order.status];
//                     return (
//                       <tr
//                         key={order.id}
//                         className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-150"
//                         style={{ animationDelay: `${i * 0.05}s` }}
//                       >
//                         <td className="p-4">
//                           <p className="font-mono font-bold text-foreground text-sm">{order.id}</p>
//                           <p className="text-xs text-muted-foreground">{order.deliveryType}</p>
//                         </td>
//                         <td className="p-4">
//                           <p className="text-sm text-foreground">{order.date}</p>
//                         </td>
//                         <td className="p-4">
//                           <p className="text-sm font-medium text-foreground">
//                             {order.pages} pages × {order.copies} copies
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             {order.paperSize} · {order.printColor} · {order.bindingType}
//                           </p>
//                         </td>
//                         <td className="p-4">
//                           <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
//                             <StatusIcon className="h-3 w-3" />
//                             {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                           </span>
//                         </td>
//                         <td className="p-4 text-right">
//                           <p className="font-bold text-foreground">₹{order.amount.toFixed(2)}</p>
//                           <p className="text-xs text-muted-foreground">incl. GST</p>
//                         </td>
//                         <td className="p-4 text-right">
//                           <div className="flex items-center justify-end gap-2">
//                             <Link
//                               to={`/tracking?orderId=${order.id}`}
//                               className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
//                               title="Track Order"
//                             >
//                               <Eye className="h-4 w-4" />
//                             </Link>
//                             <button
//                               onClick={() => setSelectedOrder(order)}
//                               className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200"
//                             >
//                               <FileText className="h-3.5 w-3.5" />
//                               Invoice
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>

//               {filteredOrders.length === 0 && (
//                 <div className="text-center py-12">
//                   <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
//                   <p className="text-muted-foreground font-medium">No orders found</p>
//                   <Link to="/order" className="text-primary text-sm hover:underline mt-1 inline-block">
//                     Place your first order
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />

//       {/* Invoice Modal */}
//       {selectedOrder && (
//         <InvoiceModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
//       )}
//     </div>
//   );
// }












// import { useState, useEffect, useMemo } from 'react';
// import { Link } from 'react-router-dom';

// import { FileText, Download, Eye, Clock, CheckCircle, Printer, Truck, Package, Filter } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import axios from "axios";

// interface Order {
//   id: string;
//   date: string;
//   pages: number;
//   copies: number;
//   paperSize: string;
//   printColor: string;
//   bindingType: string;
//   amount: number;
//   status: 'pending' | 'printing' | 'ready' | 'completed' | 'dispatched';
//   deliveryType: string;
// }

// const statusColors: Record<Order['status'], string> = {
//   pending: 'bg-yellow-100 text-yellow-700',
//   printing: 'bg-blue-100 text-blue-700',
//   ready: 'bg-green-100 text-green-700',
//   dispatched: 'bg-purple-100 text-purple-700',
//   completed: 'bg-primary/10 text-primary',
// };

// const statusIcons: Record<Order['status'], any> = {
//   pending: Clock,
//   printing: Printer,
//   ready: CheckCircle,
//   dispatched: Truck,
//   completed: CheckCircle,
// };

// function InvoiceModal({ order, onClose }: { order: Order; onClose: () => void }) {
//   const totalGstRate = 0.05;
//   const baseAmount = order.amount / (1 + totalGstRate);
//   const gst = order.amount - baseAmount;
//   const cgst = gst / 2;
//   const sgst = gst / 2;

//   const handleDownload = async () => {
//     const invoice = document.getElementById("invoice-print");
//     if (!invoice) return;

//     const canvas = await html2canvas(invoice, {
//       scale: 2,
//       useCORS: true,
//     });

//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");
//     const pdfWidth = 210;
//     const pdfHeight = 297;
//     const imgHeight = (canvas.height * pdfWidth) / canvas.width;
//     const finalHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, finalHeight);
//     pdf.save(`Invoice-${order.id}.pdf`);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
//         {/* Invoice Content */}
//         <div id="invoice-print" className="p-8 md:p-10 bg-white w-[794px] mx-auto">
//           {/* Header */}
//           <div className="flex justify-between items-start border-b-2 border-secondary pb-6 mb-6">
//             <div>
//               <h1 className="text-xl font-black text-secondary">
//                 Shree Education and Publication private limited
//               </h1>
//               <p className="text-muted-foreground text-sm mt-1">
//                 Mother’s School Campus
//                 Gaddi Maliyan, Jonsganj Road
//               </p>
//               <p className="text-muted-foreground text-sm">
//                 AJMER, Rajasthan – 305001
//                 India
//               </p>
//               <p className="text-muted-foreground text-sm mt-1">
//                 Phone: 7230001405 | Email: shreedupub@gmail.com
//               </p>
//               <p className="text-muted-foreground text-sm font-medium mt-1">
//                 GSTIN: 08ABECS6515Q1ZP
//               </p>
//             </div>
//             <div className="text-right">
//               <div className="bg-primary text-white px-5 py-3 rounded-lg inline-block">
//                 <p className="text-xs opacity-90">TAX INVOICE</p>
//                 <p className="font-bold text-lg">#{order.id}</p>
//               </div>
//               <p className="text-muted-foreground text-sm mt-3">
//                 Date: {order.date}
//               </p>
//               <p className="text-muted-foreground text-sm">
//                 Place of Supply: 09-Uttar Pradesh
//               </p>
//             </div>
//           </div>

//           {/* Bill To / Ship To */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="md:col-span-2">
//               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
//                 Bill To / Ship To
//               </p>
//               <p className="font-semibold">Diwakar Education Hub</p>
//               <p className="text-muted-foreground text-sm">
//                 NA NA NA Barampur Kiratpur
//               </p>
//               <p className="text-muted-foreground text-sm">
//                 Contact No: 7310762592
//               </p>
//               <p className="text-muted-foreground text-sm font-medium">
//                 GSTIN: 09GAIPS3840G1ZB
//               </p>
//               <p className="text-muted-foreground text-sm">State: 09-Uttar Pradesh</p>
//             </div>

//             <div>
//               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
//                 Invoice Details
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 Invoice No: {order.id}
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 Date: {order.date}
//               </p>
//             </div>
//           </div>

//           {/* Items Table */}
//           <table className="w-full mb-8 text-sm">
//             <thead>
//               <tr className="bg-secondary text-white">
//                 <th className="p-3 text-left rounded-tl-lg">#</th>
//                 <th className="p-3 text-left">Item name</th>
//                 <th className="p-3 text-center">HSN/SAC</th>
//                 <th className="p-3 text-center">Quantity</th>
//                 <th className="p-3 text-right">Price/unit</th>
//                 <th className="p-3 text-right rounded-tr-lg">Amount</th>
//                  </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b">
//                   <td className="p-3">1</td>
//                   <td className="p-3">
//                     {order.printColor} Printing — {order.paperSize}
//                     <p className="text-muted-foreground text-xs">
//                       {order.pages} pages × {order.copies} copies × {order.bindingType} binding
//                     </p>
//                   </td>
//                   <td className="p-3 text-center">—</td>
//                   <td className="p-3 text-center">{order.copies}</td>
//                   <td className="p-3 text-right">₹{(baseAmount / order.copies).toFixed(2)}</td>
//                   <td className="p-3 text-right font-medium">₹{baseAmount.toFixed(2)}</td>
//                 </tr>
//               </tbody>
//             </table>

//           {/* Amount in Words & Totals */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
//             <div>
//               <p className="font-medium">
//                 Invoice Amount In Words:
//               </p>
//               <p className="text-lg font-semibold text-secondary mt-1">
//                 {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(order.amount)} only
//               </p>
//             </div>

//             <div className="w-64 space-y-2 text-right">
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Sub Total</span>
//                 <span>₹{baseAmount.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">CGST (2.5%)</span>
//                 <span>₹{cgst.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">SGST (2.5%)</span>
//                 <span>₹{sgst.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-black text-lg border-t-2 border-secondary pt-2 mt-2">
//                 <span>TOTAL</span>
//                 <span className="text-primary">₹{order.amount.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           {/* Payment Mode & Bank Details */}
//           <div className="grid md:grid-cols-2 gap-8 mb-8">
//             <div>
//               <p className="font-medium mb-2">Payment Mode</p>
//               <p className="text-muted-foreground">
//                 Shree Education And Publication Private Limited
//               </p>
//             </div>

//             <div>
//               <p className="font-medium mb-2">Bank Details</p>
//               <p className="text-sm text-muted-foreground">
//                 <strong>Name:</strong> State Bank Of India, Chandervardai, Ajmer
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 <strong>Account No:</strong> 39918178182
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 <strong>IFSC Code:</strong> SBIN0032089
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 <strong>Account Holder:</strong> Shree Education And Publication Private Limited
//               </p>
//             </div>
//           </div>

//           {/* Terms & Authorized Signatory */}
//           <div className="grid md:grid-cols-2 gap-8 mb-8">
//             <div>
//               <p className="font-medium mb-2">Terms and conditions</p>
//               <p className="text-sm text-muted-foreground">
//                 Thank you for doing business with us.
//               </p>
//             </div>

//             <div className="text-right">
//               <p className="font-medium mb-2">For: Shree Education and Publication private limited</p>
//               <div className="mt-10 border-t border-gray-400 w-48 ml-auto pt-2">
//                 <p className="text-sm">Authorized Signatory</p>
//               </div>
//             </div>
//           </div>

//           {/* Acknowledgment */}
//           <div className="border-t-2 border-secondary pt-6 mt-10 text-center">
//             <h4 className="font-bold text-lg mb-4">Acknowledgment</h4>
//             <p className="text-muted-foreground">
//               Shree Education and Publication private limited
//             </p>
//             <div className="mt-8 grid md:grid-cols-2 gap-6 text-left text-sm">
//               <div>
//                 <p><strong>Invoice To:</strong> Diwakar Education Hub</p>
//                 <p>NA NA NA Barampur Kiratpur</p>
//               </div>
//               <div>
//                 <p><strong>Invoice Details:</strong></p>
//                 <p>Invoice No: {order.id}</p>
//                 <p>Invoice Date: {order.date}</p>
//                 <p>Total: ₹{order.amount.toFixed(2)}</p>
//               </div>
//             </div>
//             <div className="mt-10 border-t border-dashed pt-6">
//               <p className="text-muted-foreground text-sm">
//                 Receiver's Seal & Sign .......................................................
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons (non-printable) */}
//         <div className="px-8 pb-8 flex gap-4 no-print">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-border text-foreground font-medium py-3 rounded-lg hover:bg-muted transition-all"
//           >
//             Close
//           </button>
//           <button
//             onClick={handleDownload}
//             className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
//           >
//             <Download className="h-4 w-4" /> Print / Download
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function OrderHistoryPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [filter, setFilter] = useState<'all' | Order['status']>('all');

//   // Try different API URLs
//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const token = localStorage.getItem("token");
        
//         console.log("Token:", token);
//         console.log("API_URL:", API_URL);
        
//         if (!token) {
//           setError("Please login to view your orders");
//           setLoading(false);
//           return;
//         }

//         // Try to fetch orders
//         const response = await axios.get(`${API_URL}/order`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         console.log("Full API Response:", response);
//         console.log("Response data:", response.data);
//         console.log("Response status:", response.status);

//         // Extract orders from response
//         let ordersData = [];
        
//         if (response.data && response.data.orders && Array.isArray(response.data.orders)) {
//           ordersData = response.data.orders;
//           console.log("Found orders in response.data.orders:", ordersData.length);
//         } else if (response.data && Array.isArray(response.data)) {
//           ordersData = response.data;
//           console.log("Found orders in response.data array:", ordersData.length);
//         } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
//           ordersData = response.data.data;
//           console.log("Found orders in response.data.data:", ordersData.length);
//         } else {
//           console.log("No orders array found in response. Response structure:", Object.keys(response.data));
//           ordersData = [];
//         }

//         // Transform MongoDB orders to match UI Order interface
//         const transformedOrders = ordersData.map((order: any) => {
//           console.log("Processing order:", order);
          
//           const firstItem = order.items && order.items[0] ? order.items[0] : null;
          
//           // Map status
//           let uiStatus: Order['status'] = 'pending';
//           switch (order.status) {
//             case 'pending':
//               uiStatus = 'pending';
//               break;
//             case 'processing':
//               uiStatus = 'printing';
//               break;
//               case 'completed':
//                 uiStatus = 'completed';
//                 break;
//               default:
//                 uiStatus = 'pending';
//             }
  
//             // Map print color
//             const printColorMap: Record<string, string> = {
//               'bw': 'B&W',
//               'color': 'Color'
//             };
  
//             return {
//               id: order.orderNumber || order._id?.slice(-8) || 'N/A',
//               date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA'),
//               pages: firstItem?.pages || 0,
//               copies: firstItem?.copies || 1,
//               paperSize: firstItem?.paperSize || "A4",
//               printColor: printColorMap[firstItem?.printColor] || "B&W",
//               bindingType: firstItem?.bindingType || "None",
//               amount: order.totalAmount || 0,
//               status: uiStatus,
//               deliveryType: order.deliveryType === 'pickup' ? 'Store Pickup' : 'Courier'
//             };
//           });
  
//           console.log("Transformed orders:", transformedOrders);
//           setOrders(transformedOrders);
          
//         } catch (err: any) {
//           console.error("Error fetching orders:", err);
//           console.error("Error response:", err.response);
//           console.error("Error message:", err.message);
          
//           if (err.response?.status === 401) {
//             setError("Session expired. Please login again.");
//           } else if (err.response?.status === 404) {
//             setError(`API endpoint not found: ${API_URL}/orders. Please check if your backend server is running on port 5000.`);
//           } else if (err.code === 'ERR_NETWORK') {
//             setError(`Cannot connect to backend server at ${API_URL}. Please make sure the server is running.`);
//           } else {
//             setError(err.response?.data?.message || "Failed to fetch orders. Please try again.");
//           }
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchOrders();
//     }, []);
  
//     const filteredOrders = filter === 'all' ? orders : orders.filter((o) => o.status === filter);
//     const totalSpent = orders.reduce((sum, o) => sum + o.amount, 0);
//     const completedOrders = orders.filter(o => o.status === 'completed').length;
//     const inProgressOrders = orders.filter(o => o.status !== 'completed').length;
  
//     if (loading) {
//       return (
//         <div className="min-h-screen bg-background">
//           <Navbar />
//           <div className="pt-20">
//             <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//               <div className="text-center">Loading orders...</div>
//             </div>
//           </div>
//           <Footer />
//         </div>
//       );
//     }
  
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
  
//         <div className="pt-20">
//           {/* Header */}
//           <div className="bg-secondary py-10">
//             <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Order History</h1>
//                 <p className="text-white/60">View and manage all your past orders</p>
//               </div>
//               <Link
//                 to="/order"
//                 className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105"
//               >
//                 <Package className="h-4 w-4" /> New Order
//               </Link>
//             </div>
//           </div>
  
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             {/* Error Message */}
//             {error && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-red-700 font-medium">{error}</p>
//                 {error.includes("404") && (
//                   <p className="text-sm text-red-600 mt-2">
//                     Make sure your backend server is running on port 5000 and the orders route is properly set up.
//                   </p>
//                 )}
//               </div>
//             )}
  
//             {/* Stats Row */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
//               {[
//                 { label: 'Total Orders', value: orders.length, icon: Package },
//                 { label: 'Completed', value: completedOrders, icon: CheckCircle },
//                 { label: 'In Progress', value: inProgressOrders, icon: Printer },
//                 { label: 'Total Spent', value: `₹${totalSpent.toFixed(0)}`, icon: FileText },
//               ].map((stat) => (
//                 <div key={stat.label} className="bg-white rounded-xl border border-border p-4 shadow-sm">
//                   <div className="flex items-center gap-3">
//                     <div className="bg-primary/10 p-2 rounded-lg">
//                       <stat.icon className="h-4 w-4 text-primary" />
//                     </div>
//                     <div>
//                       <p className="text-xl font-black text-foreground">{stat.value}</p>
//                       <p className="text-xs text-muted-foreground">{stat.label}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
  
//             {/* Filters */}
//             <div className="flex items-center gap-2 mb-6 flex-wrap">
//               <Filter className="h-4 w-4 text-muted-foreground" />
//               {(['all', 'printing', 'completed', 'pending'] as const).map((f) => (
//                 <button
//                   key={f}
//                   onClick={() => setFilter(f)}
//                   className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
//                     filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
//                   }`}
//                 >
//                   {f.charAt(0).toUpperCase() + f.slice(1)}
//                 </button>
//               ))}
//             </div>
  
//             {/* Orders Table */}
//             <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="bg-muted/50 border-b border-border">
//                       <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Order ID</th>
//                       <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Date</th>
//                       <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Details</th>
//                       <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Status</th>
//                       <th className="text-right p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Amount</th>
//                       <th className="text-right p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredOrders.map((order, i) => {
//                       const StatusIcon = statusIcons[order.status];
//                       return (
//                         <tr
//                           key={order.id}
//                           className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-150"
//                           style={{ animationDelay: `${i * 0.05}s` }}
//                         >
//                           <td className="p-4">
//                             <p className="font-mono font-bold text-foreground text-sm">{order.id}</p>
//                             <p className="text-xs text-muted-foreground">{order.deliveryType}</p>
//                           </td>
//                           <td className="p-4">
//                             <p className="text-sm text-foreground">{order.date}</p>
//                           </td>
//                           <td className="p-4">
//                             <p className="text-sm font-medium text-foreground">
//                               {order.pages} pages × {order.copies} copies
//                             </p>
//                             <p className="text-xs text-muted-foreground">
//                               {order.paperSize} · {order.printColor} · {order.bindingType}
//                             </p>
//                           </td>
//                           <td className="p-4">
//                             <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
//                               <StatusIcon className="h-3 w-3" />
//                               {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                             </span>
//                           </td>
//                           <td className="p-4 text-right">
//                             <p className="font-bold text-foreground">₹{order.amount.toFixed(2)}</p>
//                             <p className="text-xs text-muted-foreground">incl. GST</p>
//                           </td>
//                           <td className="p-4 text-right">
//                             <div className="flex items-center justify-end gap-2">
//                               <Link
//                                 to={`/tracking?orderId=${order.id}`}
//                                 className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
//                                 title="Track Order"
//                               >
//                                 <Eye className="h-4 w-4" />
//                               </Link>
//                               <button
//                                 onClick={() => setSelectedOrder(order)}
//                                 className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200"
//                               >
//                                 <FileText className="h-3.5 w-3.5" />
//                                 Invoice
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
  
//                 {filteredOrders.length === 0 && !error && (
//                   <div className="text-center py-12">
//                     <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
//                     <p className="text-muted-foreground font-medium">No orders found</p>
//                     <Link to="/order" className="text-primary text-sm hover:underline mt-1 inline-block">
//                       Place your first order
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
  
//         <Footer />
  
//         {/* Invoice Modal */}
//         {selectedOrder && (
//           <InvoiceModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
//         )}
//       </div>
//     );
//   }













// import { useState, useEffect, useMemo } from 'react';
// import { Link } from 'react-router-dom';

// import { FileText, Download, Eye, Clock, CheckCircle, Printer, Truck, Package, Filter } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import axios from "axios";

// interface OrderItem {
//   pages: number;
//   copies: number;
//   paperSize: string;
//   printColor: string;
//   bindingType: string;
//   fileName?: string;
// }

// interface Order {
//   id: string;
//   date: string;
//   pages: number;
//   copies: number;
//   paperSize: string;
//   printColor: string;
//   bindingType: string;
//   amount: number;
//   status: 'pending' | 'printing' | 'ready' | 'completed' | 'dispatched';
//   deliveryType: string;
//   items?: OrderItem[];
// }

// const statusColors: Record<Order['status'], string> = {
//   pending: 'bg-yellow-100 text-yellow-700',
//   printing: 'bg-blue-100 text-blue-700',
//   ready: 'bg-green-100 text-green-700',
//   dispatched: 'bg-purple-100 text-purple-700',
//   completed: 'bg-primary/10 text-primary',
// };

// const statusIcons: Record<Order['status'], any> = {
//   pending: Clock,
//   printing: Printer,
//   ready: CheckCircle,
//   dispatched: Truck,
//   completed: CheckCircle,
// };

// function InvoiceModal({ order, onClose }: { order: Order; onClose: () => void }) {
//   const totalGstRate = 0.05;
//   const baseAmount = order.amount / (1 + totalGstRate);
//   const gst = order.amount - baseAmount;
//   const cgst = gst / 2;
//   const sgst = gst / 2;

//   const handleDownload = async () => {
//     const invoice = document.getElementById("invoice-print");
//     if (!invoice) return;

//     const canvas = await html2canvas(invoice, {
//       scale: 2,
//       useCORS: true,
//     });

//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");
//     const pdfWidth = 210;
//     const pdfHeight = 297;
//     const imgHeight = (canvas.height * pdfWidth) / canvas.width;
//     const finalHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, finalHeight);
//     pdf.save(`Invoice-${order.id}.pdf`);
//   };

//   // Check if order has multiple items
//   const hasMultipleItems = order.items && order.items.length > 0;
//   const items = hasMultipleItems ? order.items : [{
//     pages: order.pages || 0,
//     copies: order.copies || 1,
//     paperSize: order.paperSize || "A4",
//     printColor: order.printColor || "B&W",
//     bindingType: order.bindingType || "None"
//   }];

//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
//         {/* Invoice Content */}
//         <div id="invoice-print" className="p-8 md:p-10 bg-white w-[794px] mx-auto">
//           {/* Header */}
//           <div className="flex justify-between items-start border-b-2 border-secondary pb-6 mb-6">
//             <div>
//               <h1 className="text-xl font-black text-secondary">
//                 Shree Education and Publication private limited
//               </h1>
//               <p className="text-muted-foreground text-sm mt-1">
//                 Mother’s School Campus
//                 Gaddi Maliyan, Jonsganj Road
//               </p>
//               <p className="text-muted-foreground text-sm">
//                 AJMER, Rajasthan – 305001
//                 India
//               </p>
//               <p className="text-muted-foreground text-sm mt-1">
//                 Phone: 7230001405 | Email: shreedupub@gmail.com
//               </p>
//               <p className="text-muted-foreground text-sm font-medium mt-1">
//                 GSTIN: 08ABECS6515Q1ZP
//               </p>
//             </div>
//             <div className="text-right">
//               <div className="bg-primary text-white px-5 py-3 rounded-lg inline-block">
//                 <p className="text-xs opacity-90">TAX INVOICE</p>
//                 <p className="font-bold text-lg">#{order.id}</p>
//               </div>
//               <p className="text-muted-foreground text-sm mt-3">
//                 Date: {order.date}
//               </p>
//               <p className="text-muted-foreground text-sm">
//                 Place of Supply: 09-Uttar Pradesh
//               </p>
//             </div>
//           </div>

//           {/* Bill To / Ship To */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="md:col-span-2">
//               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
//                 Bill To / Ship To
//               </p>
//               <p className="font-semibold">Diwakar Education Hub</p>
//               <p className="text-muted-foreground text-sm">
//                 NA NA NA Barampur Kiratpur
//               </p>
//               <p className="text-muted-foreground text-sm">
//                 Contact No: 7310762592
//               </p>
//               <p className="text-muted-foreground text-sm font-medium">
//                 GSTIN: 09GAIPS3840G1ZB
//               </p>
//               <p className="text-muted-foreground text-sm">State: 09-Uttar Pradesh</p>
//             </div>

//             <div>
//               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
//                 Invoice Details
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 Invoice No: {order.id}
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 Date: {order.date}
//               </p>
//             </div>
//           </div>

//           {/* Items Table - Now showing all items */}
//           <table className="w-full mb-8 text-sm">
//             <thead>
//               <tr className="bg-secondary text-white">
//                 <th className="p-3 text-left rounded-tl-lg">#</th>
//                 <th className="p-3 text-left">Item name</th>
//                 <th className="p-3 text-center">Pages</th>
//                 <th className="p-3 text-center">Copies</th>
//                 <th className="p-3 text-center">Paper Size</th>
//                 <th className="p-3 text-center">Print Color</th>
//                 <th className="p-3 text-right">Binding</th>
//                 <th className="p-3 text-right rounded-tr-lg">Amount</th>
//                </tr>
//             </thead>
//             <tbody>
//               {items.map((item, index) => {
//                 // Calculate price per item (simplified distribution)
//                 const itemAmount = order.amount / items.length;
                
//                 return (
//                   <tr key={index} className="border-b hover:bg-gray-50">
//                     <td className="p-3">{index + 1}</td>
//                     <td className="p-3">
//                       <p className="font-medium">{item.fileName || `Item ${index + 1}`}</p>
//                       <p className="text-xs text-muted-foreground">
//                         {item.bindingType} binding
//                       </p>
//                     </td>
//                     <td className="p-3 text-center">{item.pages}</td>
//                     <td className="p-3 text-center">{item.copies}</td>
//                     <td className="p-3 text-center">{item.paperSize}</td>
//                     <td className="p-3 text-center">{item.printColor}</td>
//                     <td className="p-3 text-right">{item.bindingType}</td>
//                     <td className="p-3 text-right font-medium">₹{itemAmount.toFixed(2)}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           {/* Amount in Words & Totals */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
//             <div>
//               <p className="font-medium">
//                 Invoice Amount In Words:
//               </p>
//               <p className="text-lg font-semibold text-secondary mt-1">
//                 {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(order.amount)} only
//               </p>
//             </div>

//             <div className="w-64 space-y-2 text-right">
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Sub Total</span>
//                 <span>₹{baseAmount.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">CGST (2.5%)</span>
//                 <span>₹{cgst.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">SGST (2.5%)</span>
//                 <span>₹{sgst.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-black text-lg border-t-2 border-secondary pt-2 mt-2">
//                 <span>TOTAL</span>
//                 <span className="text-primary">₹{order.amount.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           {/* Payment Mode & Bank Details */}
//           <div className="grid md:grid-cols-2 gap-8 mb-8">
//             <div>
//               <p className="font-medium mb-2">Payment Mode</p>
//               <p className="text-muted-foreground">
//                 Shree Education And Publication Private Limited
//               </p>
//             </div>

//             <div>
//               <p className="font-medium mb-2">Bank Details</p>
//               <p className="text-sm text-muted-foreground">
//                 <strong>Name:</strong> State Bank Of India, Chandervardai, Ajmer
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 <strong>Account No:</strong> 39918178182
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 <strong>IFSC Code:</strong> SBIN0032089
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 <strong>Account Holder:</strong> Shree Education And Publication Private Limited
//               </p>
//             </div>
//           </div>

//           {/* Terms & Authorized Signatory */}
//           <div className="grid md:grid-cols-2 gap-8 mb-8">
//             <div>
//               <p className="font-medium mb-2">Terms and conditions</p>
//               <p className="text-sm text-muted-foreground">
//                 Thank you for doing business with us.
//               </p>
//             </div>

//             <div className="text-right">
//               <p className="font-medium mb-2">For: Shree Education and Publication private limited</p>
//               <div className="mt-10 border-t border-gray-400 w-48 ml-auto pt-2">
//                 <p className="text-sm">Authorized Signatory</p>
//               </div>
//             </div>
//           </div>

//           {/* Acknowledgment */}
//           <div className="border-t-2 border-secondary pt-6 mt-10 text-center">
//             <h4 className="font-bold text-lg mb-4">Acknowledgment</h4>
//             <p className="text-muted-foreground">
//               Shree Education and Publication private limited
//             </p>
//             <div className="mt-8 grid md:grid-cols-2 gap-6 text-left text-sm">
//               <div>
//                 <p><strong>Invoice To:</strong> Diwakar Education Hub</p>
//                 <p>NA NA NA Barampur Kiratpur</p>
//               </div>
//               <div>
//                 <p><strong>Invoice Details:</strong></p>
//                 <p>Invoice No: {order.id}</p>
//                 <p>Invoice Date: {order.date}</p>
//                 <p>Total: ₹{order.amount.toFixed(2)}</p>
//               </div>
//             </div>
//             <div className="mt-10 border-t border-dashed pt-6">
//               <p className="text-muted-foreground text-sm">
//                 Receiver's Seal & Sign .......................................................
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons (non-printable) */}
//         <div className="px-8 pb-8 flex gap-4 no-print">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-border text-foreground font-medium py-3 rounded-lg hover:bg-muted transition-all"
//           >
//             Close
//           </button>
//           <button
//             onClick={handleDownload}
//             className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
//           >
//             <Download className="h-4 w-4" /> Print / Download
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function OrderHistoryPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [filter, setFilter] = useState<'all' | Order['status']>('all');

//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const token = localStorage.getItem("token");
        
//         console.log("Token:", token);
//         console.log("API_URL:", API_URL);
        
//         if (!token) {
//           setError("Please login to view your orders");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`${API_URL}/order`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         console.log("Full API Response:", response);
//         console.log("Response data:", response.data);

//         // Extract orders from response
//         let ordersData = [];
        
//         if (response.data && response.data.orders && Array.isArray(response.data.orders)) {
//           ordersData = response.data.orders;
//           console.log("Found orders in response.data.orders:", ordersData.length);
//         } else if (response.data && Array.isArray(response.data)) {
//           ordersData = response.data;
//           console.log("Found orders in response.data array:", ordersData.length);
//         } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
//           ordersData = response.data.data;
//           console.log("Found orders in response.data.data:", ordersData.length);
//         } else {
//           console.log("No orders array found in response. Response structure:", Object.keys(response.data));
//           ordersData = [];
//         }

//         // Transform MongoDB orders to match UI Order interface
//         const transformedOrders = ordersData.map((order: any) => {
//           console.log("Processing order:", order);
          
//           // Map all items
//           const printColorMap: Record<string, string> = {
//             'bw': 'B&W',
//             'color': 'Color'
//           };
          
//           const items = order.items?.map((item: any) => ({
//             pages: item.pages || 0,
//             copies: item.copies || 1,
//             paperSize: item.paperSize || "A4",
//             printColor: printColorMap[item.printColor] || "B&W",
//             bindingType: item.bindingType || "None",
//             fileName: item.files?.[0]?.name || `Document ${item.pages} pages`
//           })) || [];
          
//           // For backward compatibility, get first item data
//           const firstItem = items[0] || {
//             pages: 0,
//             copies: 1,
//             paperSize: "A4",
//             printColor: "B&W",
//             bindingType: "None"
//           };
          
//           // Map status
//           let uiStatus: Order['status'] = 'pending';
//           switch (order.status) {
//             case 'pending':
//               uiStatus = 'pending';
//               break;
//             case 'processing':
//               uiStatus = 'printing';
//               break;
//             case 'completed':
//               uiStatus = 'completed';
//               break;
//             default:
//               uiStatus = 'pending';
//           }

//           return {
//             id: order.orderNumber || order._id?.slice(-8) || 'N/A',
//             date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA'),
//             pages: firstItem.pages,
//             copies: firstItem.copies,
//             paperSize: firstItem.paperSize,
//             printColor: firstItem.printColor,
//             bindingType: firstItem.bindingType,
//             amount: order.totalAmount || 0,
//             status: uiStatus,
//             deliveryType: order.deliveryType === 'pickup' ? 'Store Pickup' : 'Courier',
//             items: items // Add all items to the order
//           };
//         });

//         console.log("Transformed orders:", transformedOrders);
//         setOrders(transformedOrders);
        
//       } catch (err: any) {
//         console.error("Error fetching orders:", err);
//         console.error("Error response:", err.response);
//         console.error("Error message:", err.message);
        
//         if (err.response?.status === 401) {
//           setError("Session expired. Please login again.");
//         } else if (err.response?.status === 404) {
//           setError(`API endpoint not found: ${API_URL}/order. Please check if your backend server is running on port 5000.`);
//         } else if (err.code === 'ERR_NETWORK') {
//           setError(`Cannot connect to backend server at ${API_URL}. Please make sure the server is running.`);
//         } else {
//           setError(err.response?.data?.message || "Failed to fetch orders. Please try again.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const filteredOrders = filter === 'all' ? orders : orders.filter((o) => o.status === filter);
//   const totalSpent = orders.reduce((sum, o) => sum + o.amount, 0);
//   const completedOrders = orders.filter(o => o.status === 'completed').length;
//   const inProgressOrders = orders.filter(o => o.status !== 'completed').length;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="pt-20">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="text-center">Loading orders...</div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <div className="pt-20">
//         {/* Header */}
//         <div className="bg-secondary py-10">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Order History</h1>
//               <p className="text-white/60">View and manage all your past orders</p>
//             </div>
//             <Link
//               to="/order"
//               className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105"
//             >
//               <Package className="h-4 w-4" /> New Order
//             </Link>
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Error Message */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-700 font-medium">{error}</p>
//               {error.includes("404") && (
//                 <p className="text-sm text-red-600 mt-2">
//                   Make sure your backend server is running on port 5000 and the order route is properly set up.
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Stats Row */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
//             {[
//               { label: 'Total Orders', value: orders.length, icon: Package },
//               { label: 'Completed', value: completedOrders, icon: CheckCircle },
//               { label: 'In Progress', value: inProgressOrders, icon: Printer },
//               { label: 'Total Spent', value: `₹${totalSpent.toFixed(0)}`, icon: FileText },
//             ].map((stat) => (
//               <div key={stat.label} className="bg-white rounded-xl border border-border p-4 shadow-sm">
//                 <div className="flex items-center gap-3">
//                   <div className="bg-primary/10 p-2 rounded-lg">
//                     <stat.icon className="h-4 w-4 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-xl font-black text-foreground">{stat.value}</p>
//                     <p className="text-xs text-muted-foreground">{stat.label}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Filters */}
//           <div className="flex items-center gap-2 mb-6 flex-wrap">
//             <Filter className="h-4 w-4 text-muted-foreground" />
//             {(['all', 'printing', 'completed', 'pending'] as const).map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
//                   filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
//                 }`}
//               >
//                 {f.charAt(0).toUpperCase() + f.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* Orders Table */}
//           <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-muted/50 border-b border-border">
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Order ID</th>
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Date</th>
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Details</th>
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Status</th>
//                     <th className="text-right p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Amount</th>
//                     <th className="text-right p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Actions</th>
//                    </tr>
//                 </thead>
//                 <tbody>
//                   {filteredOrders.map((order, i) => {
//                     const StatusIcon = statusIcons[order.status];
//                     return (
//                       <tr
//                         key={order.id}
//                         className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-150"
//                         style={{ animationDelay: `${i * 0.05}s` }}
//                       >
//                         <td className="p-4">
//                           <p className="font-mono font-bold text-foreground text-sm">{order.id}</p>
//                           <p className="text-xs text-muted-foreground">{order.deliveryType}</p>
//                         </td>
//                         <td className="p-4">
//                           <p className="text-sm text-foreground">{order.date}</p>
//                         </td>
//                         <td className="p-4">
//                           <p className="text-sm font-medium text-foreground">
//                             {order.pages} pages × {order.copies} copies
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             {order.paperSize} · {order.printColor} · {order.bindingType}
//                           </p>
//                         </td>
//                         <td className="p-4">
//                           <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
//                             <StatusIcon className="h-3 w-3" />
//                             {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                           </span>
//                         </td>
//                         <td className="p-4 text-right">
//                           <p className="font-bold text-foreground">₹{order.amount.toFixed(2)}</p>
//                           <p className="text-xs text-muted-foreground">incl. GST</p>
//                         </td>
//                         <td className="p-4 text-right">
//                           <div className="flex items-center justify-end gap-2">
//                             <Link
//                               to={`/tracking?orderId=${order.id}`}
//                               className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
//                               title="Track Order"
//                             >
//                               <Eye className="h-4 w-4" />
//                             </Link>
//                             <button
//                               onClick={() => setSelectedOrder(order)}
//                               className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200"
//                             >
//                               <FileText className="h-3.5 w-3.5" />
//                               Invoice
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>

//               {filteredOrders.length === 0 && !error && (
//                 <div className="text-center py-12">
//                   <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
//                   <p className="text-muted-foreground font-medium">No orders found</p>
//                   <Link to="/order" className="text-primary text-sm hover:underline mt-1 inline-block">
//                     Place your first order
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />

//       {/* Invoice Modal */}
//       {selectedOrder && (
//         <InvoiceModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
//       )}
//     </div>
//   );
// }














// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FileText, Download, Eye, Clock, CheckCircle, Printer, Truck, Package, Filter, CreditCard, Wallet, FileCog,  CircleX } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import axios from "axios";
// import InvoiceModal from '@/components/InvoiceModal';

// interface OrderItem {
//   pages: number;
//   copies: number;
//   paperSize: string;
//   printColor: string;
//   bindingType: string;
//   fileName?: string;
// }

// interface Order {
//   id: string;
//   date: string;
//   pages: number;
//   copies: number;
//   paperSize: string;
//   printColor: string;
//   bindingType: string;
//   amount: number;
//   // status: 'pending' | 'printing' | 'ready' | 'completed' | 'dispatched';
//   status: 'pending' | 'processing' | 'printing' | 'ready' | 'dispatched' | 'completed' | 'cancelled';
//   paymentStatus: string;
//   deliveryType: string;
//   paymentMode?: 'upi' | 'card' | 'bank' | 'cod';
//   // paymentStatus?: 'paid' | 'pending' | 'failed';
//   razorpayOrderId?: string;
//   razorpayPaymentId?: string;
//   items?: OrderItem[];
//   customer?: {
//     name: string;
//     phone: string;
//     address?: string;
//     pincode?: string;
//     city?: string;
//     state?: string;
//     gstin?: string;
//   };
// }

// const statusColors: Record<Order['status'], string> = {
//   pending: 'bg-yellow-100 text-yellow-700',
//   processing: 'bg-blue-100 text-blue-700',
//   printing: 'bg-blue-100 text-blue-700',
//   ready: 'bg-green-100 text-green-700',
//   dispatched: 'bg-purple-100 text-purple-700',
//   completed: 'bg-primary/10 text-primary',
//   cancelled: 'bg-red-100 text-red-700',
// };

// const statusIcons: Record<Order['status'], any> = {
//   pending: Clock,
//   processing: FileCog,
//   printing: Printer,
//   ready: CheckCircle,
//   dispatched: Truck,
//   completed: CheckCircle,
//   cancelled: CircleX
// };

// // function InvoiceModal({ order, onClose }: { order: Order; onClose: () => void }) {
// //   const totalGstRate = 0.05;
// //   const baseAmount = order.amount / (1 + totalGstRate);
// //   const gst = order.amount - baseAmount;
// //   const cgst = gst / 2;
// //   const sgst = gst / 2;

// //       // Add this function at the top of your InvoiceModal component, before the return statement
// // const numberToWords = (num: number) => {
// //   const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
// //   const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
// //   const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  
// //   const convertToWords = (n: number): string => {
// //     if (n === 0) return '';
// //     if (n < 10) return ones[n];
// //     if (n < 20) return teens[n - 10];
// //     if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
// //     if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertToWords(n % 100) : '');
// //     if (n < 100000) return convertToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + convertToWords(n % 1000) : '');
// //     if (n < 10000000) return convertToWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + convertToWords(n % 100000) : '');
// //     return convertToWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 !== 0 ? ' ' + convertToWords(n % 10000000) : '');
// //   };
  
// //   const rupees = Math.floor(num);
// //   const paise = Math.round((num - rupees) * 100);
  
// //   let words = convertToWords(rupees);
// //   words = words.charAt(0).toUpperCase() + words.slice(1);
  
// //   if (paise > 0) {
// //     words += ` and ${convertToWords(paise)} Paise`;
// //   }
  
// //   return words + ' Rupees Only';
// // };



// //   const handleDownload = async () => {
// //     const invoice = document.getElementById("invoice-print");
// //     if (!invoice) return;

// //     const canvas = await html2canvas(invoice, {
// //       scale: 2,
// //       useCORS: true,
// //     });


// //     const imgData = canvas.toDataURL("image/png");

// //     const pdf = new jsPDF("p", "mm", "a4");
// //     const pdfWidth = 210;
// //     const pdfHeight = 297;
// //     const imgHeight = (canvas.height * pdfWidth) / canvas.width;
// //     const finalHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;

// //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, finalHeight);
// //     pdf.save(`Invoice-${order.id}.pdf`);
// //   };

// //   // Check if order has multiple items
// //   const hasMultipleItems = order.items && order.items.length > 0;
// //   const items = hasMultipleItems ? order.items : [{
// //     pages: order.pages || 0,
// //     copies: order.copies || 1,
// //     paperSize: order.paperSize || "A4",
// //     printColor: order.printColor || "B&W",
// //     bindingType: order.bindingType || "None"
// //   }];

// //   // Get customer details from order data
// //   const customerName = order.customer?.name || "Customer";
// //   const customerPhone = order.customer?.phone || "N/A";
// //   const customerAddress = order.customer?.address || "";
// //   const customerCity = order.customer?.city || "";
// //   const customerPincode = order.customer?.pincode || "";
// //   const customerState = order.customer?.state || "";
// //   const customerGstin = order.customer?.gstin || "";
  
// //   const fullAddress = customerAddress ? 
// //     `${customerAddress}, ${customerCity} - ${customerPincode}, ${customerState}` : 
// //     "Address not provided";
  
// //   const isCourier = order.deliveryType === 'Courier' || order.deliveryType === 'courier';
// //   const paymentMode = order.paymentMode || 'cod';
// //   const paymentStatus = order.paymentStatus || 'pending';

// //   // Get payment mode display details
// //   const getPaymentDetails = () => {
// //     switch (paymentMode) {
// //       case 'upi':
// //         return {
// //           icon: Wallet,
// //           title: 'UPI Payment',
// //           description: 'Paid via UPI',
// //           transactionId: order.razorpayPaymentId,
// //           showBankDetails: false,
// //           bankDetails: null
// //         };
// //       case 'card':
// //         return {
// //           icon: CreditCard,
// //           title: 'Card Payment',
// //           description: 'Paid via Credit/Debit Card',
// //           transactionId: order.razorpayPaymentId,
// //           showBankDetails: false,
// //           bankDetails: null
// //         };
// //       case 'bank':
// //         return {
// //           icon: FileText,
// //           title: 'Bank Transfer',
// //           description: 'Payment via Bank Transfer',
// //           transactionId: order.razorpayPaymentId,
// //           showBankDetails: true,
// //           bankDetails: {
// //             bank: 'State Bank Of India, Chandervardai, Ajmer',
// //             accountNo: '39918178182',
// //             ifsc: 'SBIN0032089',
// //             holder: 'Shree Education And Publication Private Limited'
// //           }
// //         };
// //       default:
// //         return {
// //           icon: Package,
// //           title: 'Cash on Delivery',
// //           description: 'Payment to be made at the time of delivery/pickup',
// //           transactionId: null,
// //           showBankDetails: false,
// //           bankDetails: null
// //         };
// //     }
// //   };

// //   const paymentDetails = getPaymentDetails();
// //   const PaymentIcon = paymentDetails.icon;

// //   return (
// //     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
// //       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
// //         {/* Invoice Content */}
// //         <div id="invoice-print" className="p-8 md:p-10 bg-white w-[794px] mx-auto">
// //           {/* Header */}
// //           <div className="flex justify-between items-start border-b-2 border-secondary pb-6 mb-6">
// //             <div>
// //               <h1 className="text-xl font-black text-secondary">
// //                 Shree Education and Publication private limited
// //               </h1>
// //               <p className="text-muted-foreground text-sm mt-1">
// //                 Mother’s School Campus
// //                 Gaddi Maliyan, Jonsganj Road
// //               </p>
// //               <p className="text-muted-foreground text-sm">
// //                 Ajmer, Rajasthan – 305001
// //                 India
// //               </p>
// //               <p className="text-muted-foreground text-sm mt-1">
// //                 Phone: 7230001405 | Email: shreedupub@gmail.com
// //               </p>
// //               <p className="text-muted-foreground text-sm font-medium mt-1">
// //                 GSTIN: 08ABECS6515Q1ZP
// //               </p>
// //             </div>
// //             <div className="text-right">
// //               <div className="bg-primary text-white px-5 py-3 rounded-lg inline-block">
// //                 <p className="text-xs opacity-90">TAX INVOICE</p>
// //                 <p className="font-bold text-lg">#{order.id}</p>
// //               </div>
// //               <p className="text-muted-foreground text-sm mt-3">
// //                 Date: {order.date}
// //               </p>
// //               {/* <p className="text-muted-foreground text-sm">
// //                 Place of Supply: {customerState || '08-Rajasthan'}
// //               </p> */}
// //                  {isCourier ? (
// //                 <p className="text-muted-foreground text-sm">
// //                   Place of Supply: {customerState || '08-Rajasthan'}
// //                 </p>
// //               ) : (
// //                 <p className="text-muted-foreground text-sm">
// //                    Place of Supply: Store Pickup
// //                 </p>
// //               )}
// //             </div>
// //           </div>

// //           {/* Bill To / Ship To - Dynamic based on delivery type */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //             <div className="md:col-span-2">
// //               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
// //                 {isCourier ? 'Bill To / Ship To' : 'Bill To'}
// //               </p>
// //               <p className="font-semibold text-lg">{customerName}</p>
// //               {isCourier ? (
// //                 <>
// //                   <p className="text-muted-foreground text-sm mt-1">{fullAddress}</p>
                  
// //                   <p className="text-muted-foreground text-sm">Contact No: {customerPhone}</p>
// //                 </>
// //               ) : (
// //                 <>
// //                   <p className="text-muted-foreground text-sm">Contact No: {customerPhone}</p>
// //                   <p className="text-muted-foreground text-sm mt-2 font-medium">
// //                     Pickup Location: Mother’s School Campus,Gaddi Maliyan, Jonsganj Road, Ajmer, Rajasthan
// //                   </p>
                 
// //                 </>
// //               )}
// //               {customerGstin && (
// //                 <p className="text-muted-foreground text-sm font-medium mt-2">
// //                   GSTIN: {customerGstin}
// //                 </p>
// //               )}
// //               {isCourier ? (
// //                 <p className="text-muted-foreground text-sm">State: {customerState || '08-Rajasthan'}</p>
// //               ) : (
// //                 <p className="text-muted-foreground text-sm">State: Rajasthan</p>
// //               )}
// //             </div>

// //             <div>
// //               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
// //                 Invoice Details
// //               </p>
// //               <p className="text-sm text-muted-foreground">
// //                 Invoice No: {order.id}
// //               </p>
// //               <p className="text-sm text-muted-foreground">
// //                 Date: {order.date}
// //               </p>
// //               <p className="text-sm text-muted-foreground">
// //                 Delivery: {order.deliveryType}
// //               </p>
// //               <p className="text-sm text-muted-foreground mt-2">
// //                 Payment Status: 
// //                 <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
// //                   paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
// //                 }`}>
// //                   {paymentStatus === 'paid' ? 'Paid' : 'Pending'}
// //                 </span>
// //               </p>
// //               {paymentDetails.transactionId && (
// //                 <p className="text-sm text-muted-foreground mt-1">
// //                   Transaction ID: {paymentDetails.transactionId}
// //                 </p>
// //               )}
// //             </div>
// //           </div>

// //           {/* Items Table */}
// //           <table className="w-full mb-8 text-sm">
// //             <thead>
// //               <tr className="bg-secondary text-white">
// //                 <th className="p-3 text-left rounded-tl-lg">#</th>
// //                 <th className="p-3 text-left">Item name</th>
// //                 <th className="p-3 text-center">Pages</th>
// //                 <th className="p-3 text-center">Copies</th>
// //                 <th className="p-3 text-center">Paper Size</th>
// //                 <th className="p-3 text-center">Print Color</th>
// //                 <th className="p-3 text-right">Binding</th>
// //                 <th className="p-3 text-right rounded-tr-lg">Amount</th>
// //                </tr>
// //             </thead>
// //             <tbody>
// //               {items.map((item, index) => {
// //                 const itemAmount = order.amount / items.length;
                
// //                 return (
// //                   <tr key={index} className="border-b hover:bg-gray-50">
// //                     <td className="p-3">{index + 1}</td>
// //                     <td className="p-3">
// //                       <p className="font-medium">{item.fileName || `Item ${index + 1}`}</p>
// //                       <p className="text-xs text-muted-foreground">
// //                         {item.bindingType} binding
// //                       </p>
// //                     </td>
// //                     <td className="p-3 text-center">{item.pages}</td>
// //                     <td className="p-3 text-center">{item.copies}</td>
// //                     <td className="p-3 text-center">{item.paperSize}</td>
// //                     <td className="p-3 text-center">{item.printColor}</td>
// //                     <td className="p-3 text-right">{item.bindingType}</td>
// //                     <td className="p-3 text-right font-medium">₹{itemAmount.toFixed(2)}</td>
// //                   </tr>
// //                 );
// //               })}
// //             </tbody>
// //           </table>

// //           {/* Amount in Words & Totals */}
// //     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
// //       <div>
// //         <p className="font-medium">
// //           Invoice Amount In Words:
// //         </p>
// //         <p className="text-lg font-semibold text-secondary mt-1">
// //           {numberToWords(order.amount)}
// //         </p>
// //       </div>

// //             <div className="w-64 space-y-2 text-right">
// //               <div className="flex justify-between">
// //                 <span className="text-muted-foreground">Sub Total</span>
// //                 <span>₹{baseAmount.toFixed(2)}</span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span className="text-muted-foreground">CGST (2.5%)</span>
// //                 <span>₹{cgst.toFixed(2)}</span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span className="text-muted-foreground">SGST (2.5%)</span>
// //                 <span>₹{sgst.toFixed(2)}</span>
// //               </div>
// //               <div className="flex justify-between font-black text-lg border-t-2 border-secondary pt-2 mt-2">
// //                 <span>TOTAL</span>
// //                 <span className="text-primary">₹{order.amount.toFixed(2)}</span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Payment Details - Display actual payment method used */}
// //           <div className="grid md:grid-cols-2 gap-8 mb-8">
// //             <div>
// //               <p className="font-medium mb-2">Payment Details</p>
// //               <div className="flex items-center gap-2">
// //                 <PaymentIcon className="h-5 w-5 text-primary" />
// //                 <p className="text-muted-foreground font-medium">
// //                   {paymentDetails.title}
// //                 </p>
// //               </div>
// //               <p className="text-sm text-muted-foreground mt-1">
// //                 {paymentDetails.description}
// //               </p>
// //               {paymentStatus === 'pending' && paymentMode === 'cod' && (
// //                 <p className="text-sm text-amber-600 mt-1">
// //                   * Payment to be made at the time of {isCourier ? 'delivery' : 'pickup'}
// //                 </p>
// //               )}
// //             </div>

// //             {/* Show Bank Details ONLY if payment mode is Bank Transfer */}
// //             {paymentDetails.showBankDetails && paymentDetails.bankDetails && (
// //               <div>
// //                 <p className="font-medium mb-2">Bank Details</p>
// //                 <p className="text-sm text-muted-foreground">
// //                   <strong>Bank:</strong> {paymentDetails.bankDetails.bank}
// //                 </p>
// //                 <p className="text-sm text-muted-foreground">
// //                   <strong>Account No:</strong> {paymentDetails.bankDetails.accountNo}
// //                 </p>
// //                 <p className="text-sm text-muted-foreground">
// //                   <strong>IFSC Code:</strong> {paymentDetails.bankDetails.ifsc}
// //                 </p>
// //                 <p className="text-sm text-muted-foreground">
// //                   <strong>Account Holder:</strong> {paymentDetails.bankDetails.holder}
// //                 </p>
// //               </div>
// //             )}
// //           </div>

// //           {/* Terms & Authorized Signatory */}
// //           <div className="grid md:grid-cols-2 gap-8 mb-8">
// //             <div>
// //               <p className="font-medium mb-2">Terms and conditions</p>
// //               <p className="text-sm text-muted-foreground">
// //                 Thank you for doing business with us. For any queries, please contact our support team.
// //               </p>
// //               <p className="text-sm text-muted-foreground mt-1">
// //                 Delivery: {isCourier ? 'Courier delivery within 3-5 business days' : 'Store pickup available during business hours'}
// //               </p>
// //             </div>

// //             <div className="text-right">
// //               <p className="font-medium mb-2">For: Shree Education and Publication private limited</p>
// //               <div className="mt-10 border-t border-gray-400 w-48 ml-auto pt-2">
// //                 <p className="text-sm">Authorized Signatory</p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Acknowledgment */}
// //           <div className="border-t-2 border-secondary pt-6 mt-10 text-center">
// //             <h4 className="font-bold text-lg mb-4">Acknowledgment</h4>
// //             <p className="text-muted-foreground">
// //               Shree Education and Publication private limited
// //             </p>
// //             <div className="mt-8 grid md:grid-cols-2 gap-6 text-left text-sm">
// //               <div>
// //                 <p><strong>Invoice To:</strong> {customerName}</p>
// //                 {isCourier ? (
// //                   <p>{fullAddress}</p>
// //                 ) : (
// //                   <p>Store Pickup - {customerName}</p>
// //                 )}
// //                 <p>Phone: {customerPhone}</p>
// //               </div>
// //               <div>
// //                 <p><strong>Invoice Details:</strong></p>
// //                 <p>Invoice No: {order.id}</p>
// //                 <p>Invoice Date: {order.date}</p>
// //                 <p>Payment Mode: {paymentDetails.title.toUpperCase()}</p>
// //                 <p>Payment Status: {paymentStatus === 'paid' ? 'PAID' : 'PENDING'}</p>
// //                 <p>Total: ₹{order.amount.toFixed(2)}</p>
// //               </div>
// //             </div>
// //             <div className="mt-10 border-t border-dashed pt-6">
// //               <p className="text-muted-foreground text-sm">
// //                 Receiver's Seal & Sign .......................................................
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Action Buttons (non-printable) */}
// //         <div className="px-8 pb-8 flex gap-4 no-print">
// //           <button
// //             onClick={onClose}
// //             className="flex-1 border border-border text-foreground font-medium py-3 rounded-lg hover:bg-muted transition-all"
// //           >
// //             Close
// //           </button>
// //           <button
// //             onClick={handleDownload}
// //             className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
// //           >
// //             <Download className="h-4 w-4" /> Print / Download
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// export default function OrderHistoryPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [filter, setFilter] = useState<'all' | Order['status']>('all');

//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const token = localStorage.getItem("token");
        
//         if (!token) {
//           setError("Please login to view your orders");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`${API_URL}/order`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         let ordersData = [];
        
//         if (response.data && response.data.orders && Array.isArray(response.data.orders)) {
//           ordersData = response.data.orders;
//         } else if (response.data && Array.isArray(response.data)) {
//           ordersData = response.data;
//         } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
//           ordersData = response.data.data;
//         } else {
//           ordersData = [];
//         }

//         const transformedOrders = ordersData.map((order: any) => {
//           const printColorMap: Record<string, string> = {
//             'bw': 'B&W',
//             'color': 'Color'
//           };
          
//           const items = order.items?.map((item: any) => ({
//             pages: item.pages || 0,
//             copies: item.copies || 1,
//             paperSize: item.paperSize || "A4",
//             printColor: printColorMap[item.printColor] || "B&W",
//             bindingType: item.bindingType || "None",
//             fileName: item.files?.[0]?.name || `Document ${item.pages} pages`
//           })) || [];
          
//           const firstItem = items[0] || {
//             pages: 0,
//             copies: 1,
//             paperSize: "A4",
//             printColor: "B&W",
//             bindingType: "None"
//           };
          
//           // let uiStatus: Order['status'] = 'pending';
//           // switch (order.status) {
//           //   case 'pending':
//           //     uiStatus = 'pending';
//           //     break;
//           //   case 'processing':
//           //     uiStatus = 'printing';
//           //     break;
//           //   case 'completed':
//           //     uiStatus = 'completed';
//           //     break;
//           //   default:
//           //     uiStatus = 'pending';
//           // }

//             // FIX: Map all statuses correctly including cancelled
//   let uiStatus: Order['status'] = 'pending';
//   switch (order.status) {
//     case 'pending':
//       uiStatus = 'pending';
//       break;
//     case 'processing':
//       uiStatus = 'processing'; // Changed from 'printing' to 'processing'
//       break;
//     case 'printing':
//       uiStatus = 'printing';
//       break;
//     case 'ready':
//       uiStatus = 'ready';
//       break;
//     case 'dispatched':
//       uiStatus = 'dispatched';
//       break;
//     case 'completed':
//       uiStatus = 'completed';
//       break;
//     case 'cancelled':
//       uiStatus = 'cancelled'; // Add this case for cancelled orders
//       break;
//     default:
//       uiStatus = 'pending';
//   }


//           return {
//             id: order.orderNumber || order._id?.slice(-8) || 'N/A',
//             date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA'),
//             pages: firstItem.pages,
//             copies: firstItem.copies,
//             paperSize: firstItem.paperSize,
//             printColor: firstItem.printColor,
//             bindingType: firstItem.bindingType,
//             amount: order.finalAmount || 0,
//             status: uiStatus,
//             deliveryType: order.deliveryType === 'pickup' ? 'Store Pickup' : 'Courier',
//             paymentMode: order.paymentMode || 'cod',
//             paymentStatus: order.paymentStatus || 'pending',
//             razorpayOrderId: order.razorpayOrderId,
//             razorpayPaymentId: order.razorpayPaymentId,
//             items: items,
//             customer: order.customer || {
//               name: order.customerName || 'Customer',
//               phone: order.customerPhone || 'N/A',
//               address: order.address,
//               pincode: order.pincode,
//               city: order.city,
//               state: order.state,
//               gstin: order.gstin
//             }
//           };
//         });

//         setOrders(transformedOrders);
        
//       } catch (err: any) {
//         console.error("Error fetching orders:", err);
        
//         if (err.response?.status === 401) {
//           setError("Session expired. Please login again.");
//         } else if (err.code === 'ERR_NETWORK') {
//           setError(`Cannot connect to backend server at ${API_URL}. Please make sure the server is running.`);
//         } else {
//           setError(err.response?.data?.message || "Failed to fetch orders. Please try again.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const filteredOrders = filter === 'all' ? orders : orders.filter((o) => o.status === filter);
//   const totalSpent = orders.reduce((sum, o) => sum + o.amount, 0);
//   const completedOrders = orders.filter(o => o.status === 'completed').length;
//   const inProgressOrders = orders.filter(o => o.status !== 'completed').length;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="pt-20">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="text-center">Loading orders...</div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <div className="pt-20">
//         {/* Header */}
//         <div className="bg-secondary py-10">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Order History</h1>
//               <p className="text-white/60">View and manage all your past orders</p>
//             </div>
//             <Link
//               to="/order"
//               className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105"
//             >
//               <Package className="h-4 w-4" /> New Order
//             </Link>
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Error Message */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-700 font-medium">{error}</p>
//             </div>
//           )}

//           {/* Stats Row */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
//             {[
//               { label: 'Total Orders', value: orders.length, icon: Package },
//               { label: 'Completed', value: completedOrders, icon: CheckCircle },
//               { label: 'In Progress', value: inProgressOrders, icon: Printer },
//               { label: 'Total Spent', value: `₹${totalSpent.toFixed(0)}`, icon: FileText },
//             ].map((stat) => (
//               <div key={stat.label} className="bg-white rounded-xl border border-border p-4 shadow-sm">
//                 <div className="flex items-center gap-3">
//                   <div className="bg-primary/10 p-2 rounded-lg">
//                     <stat.icon className="h-4 w-4 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-xl font-black text-foreground">{stat.value}</p>
//                     <p className="text-xs text-muted-foreground">{stat.label}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Filters */}
//           <div className="flex items-center gap-2 mb-6 flex-wrap">
//             <Filter className="h-4 w-4 text-muted-foreground" />
//             {(['all', 'printing', 'completed', 'pending'] as const).map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
//                   filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
//                 }`}
//               >
//                 {f.charAt(0).toUpperCase() + f.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* Orders Table */}
//           <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-muted/50 border-b border-border">
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Order ID</th>
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Date</th>
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Details</th>
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Order Status</th>
//                     <th className="text-right p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Amount</th>
//                     <th className="text-right p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredOrders.map((order, i) => {
//                     const StatusIcon = statusIcons[order.status];
//                     return (
//                       <tr
//                         key={order.id}
//                         className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-150"
//                       >
//                         <td className="p-4">
//                           <p className="font-mono font-bold text-foreground text-sm">{order.id}</p>
//                           <p className="text-xs text-muted-foreground">{order.deliveryType}</p>
//                         </td>
//                         <td className="p-4">
//                           <p className="text-sm text-foreground">{order.date}</p>
//                         </td>
//                         <td className="p-4">
//                           <p className="text-sm font-medium text-foreground">
//                             {order.pages} pages × {order.copies} copies
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             {order.paperSize} · {order.printColor} · {order.bindingType}
//                           </p>
//                         </td>
//                         <td className="p-4">
//                           <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
//                             <StatusIcon className="h-3 w-3" />
//                             {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                           </span>
//                         </td>
//                         <td className="p-4 text-right">
//                           <p className="font-bold text-foreground">₹{order.amount.toFixed(2)}</p>
//                           <p className="text-xs text-muted-foreground">incl. GST</p>
//                         </td>
//                         <td className="p-4 text-right">
//                           <div className="flex items-center justify-end gap-2">
//                            <Link
//   to={`/tracking?orderId=${encodeURIComponent(order.id)}`}
//   className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
//   title="Track Order"
// >
//   <Eye className="h-4 w-4" />
// </Link>
//                             <button
//                               onClick={() => setSelectedOrder(order)}
//                               className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200"
//                             >
//                               <FileText className="h-3.5 w-3.5" />
//                               Invoice
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>

//               {filteredOrders.length === 0 && !error && (
//                 <div className="text-center py-12">
//                   <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
//                   <p className="text-muted-foreground font-medium">No orders found</p>
//                   <Link to="/order" className="text-primary text-sm hover:underline mt-1 inline-block">
//                     Place your first order
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />

//       {/* Invoice Modal */}
//       {selectedOrder && (
//         <InvoiceModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
//       )}
//     </div>
//   );
// }





import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Eye, Clock, CheckCircle, Printer, Truck, Package, Filter, CreditCard, Wallet, FileCog,  CircleX } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import InvoiceModal from '@/components/InvoiceModal';

interface OrderItem {
  pages: number;
  copies: number;
  paperSize: string;
  printColor: string;
  bindingType: string;
  fileName?: string;
}

interface Order {
  id: string;
  date: string;
  pages: number;
  copies: number;
  paperSize: string;
  printColor: string;
  bindingType: string;
  amount: number;  // This will be the discounted amount
  originalAmount?: number;  // Original amount before discount
  discountAmount?: number;  // Total discount applied
  status: 'pending' | 'processing' | 'printing' | 'ready' | 'dispatched' | 'completed' | 'cancelled';
  paymentStatus: string;
  deliveryType: string;
  paymentMode?: 'upi' | 'card' | 'bank' | 'cod';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  items?: OrderItem[];
  customer?: {
    name: string;
    phone: string;
    address?: string;
    pincode?: string;
    city?: string;
    state?: string;
    gstin?: string;
  };
  discountsApplied?: {
    promo?: { code: string; amount: number };
    offer?: { name: string; amount: number };
    totalDiscount: number;
  };
}

const statusColors: Record<Order['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  printing: 'bg-blue-100 text-blue-700',
  ready: 'bg-green-100 text-green-700',
  dispatched: 'bg-purple-100 text-purple-700',
  completed: 'bg-primary/10 text-primary',
  cancelled: 'bg-red-100 text-red-700',
};

const statusIcons: Record<Order['status'], any> = {
  pending: Clock,
  processing: FileCog,
  printing: Printer,
  ready: CheckCircle,
  dispatched: Truck,
  completed: CheckCircle,
  cancelled: CircleX
};

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<'all' | Order['status']>('all');

  // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
   const API_URL = import.meta.env.VITE_API_URL ||  "https://bookprinters.in/api/api";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("Please login to view your orders");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        let ordersData = [];
        
        if (response.data && response.data.orders && Array.isArray(response.data.orders)) {
          ordersData = response.data.orders;
        } else if (response.data && Array.isArray(response.data)) {
          ordersData = response.data;
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          ordersData = response.data.data;
        } else {
          ordersData = [];
        }

        const transformedOrders = ordersData.map((order: any) => {
          const printColorMap: Record<string, string> = {
            'bw': 'B&W',
            'color': 'Color'
          };
          
          const items = order.items?.map((item: any) => ({
            pages: item.pages || 0,
            copies: item.copies || 1,
            paperSize: item.paperSize || "A4",
            printColor: printColorMap[item.printColor] || "B&W",
            bindingType: item.bindingType || "None",
            fileName: item.files?.[0]?.name || `Document ${item.pages} pages`
          })) || [];
          
          const firstItem = items[0] || {
            pages: 0,
            copies: 1,
            paperSize: "A4",
            printColor: "B&W",
            bindingType: "None"
          };
          
          // Map status
          let uiStatus: Order['status'] = 'pending';
          switch (order.status) {
            case 'pending':
              uiStatus = 'pending';
              break;
            case 'processing':
              uiStatus = 'processing';
              break;
            case 'printing':
              uiStatus = 'printing';
              break;
            case 'ready':
              uiStatus = 'ready';
              break;
            case 'dispatched':
              uiStatus = 'dispatched';
              break;
            case 'completed':
              uiStatus = 'completed';
              break;
            case 'cancelled':
              uiStatus = 'cancelled';
              break;
            default:
              uiStatus = 'pending';
          }

          // ✅ FIX: Use finalAmount (discounted amount) instead of totalAmount
          const discountedAmount = order.finalAmount || order.totalAmount || 0;
          const originalAmount = order.totalAmount || 0;
          const discountAmount = order.discountAmount || 0;

          console.log(`Order ${order.orderNumber}: Original: ₹${originalAmount}, Discounted: ₹${discountedAmount}, Saved: ₹${discountAmount}`);

          return {
            id: order.orderNumber || order._id?.slice(-8) || 'N/A',
            date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA'),
            pages: firstItem.pages,
            copies: firstItem.copies,
            paperSize: firstItem.paperSize,
            printColor: firstItem.printColor,
            bindingType: firstItem.bindingType,
            amount: discountedAmount,  // ← Use discounted amount
            originalAmount: originalAmount,  // ← Store original amount
            discountAmount: discountAmount,  // ← Store discount amount
            status: uiStatus,
            deliveryType: order.deliveryType === 'pickup' ? 'Store Pickup' : 'Courier',
            paymentMode: order.paymentMode || 'cod',
            paymentStatus: order.paymentStatus || 'pending',
            razorpayOrderId: order.razorpayOrderId,
            razorpayPaymentId: order.razorpayPaymentId,
            items: items,
            customer: order.customer || {
              name: order.customerName || 'Customer',
              phone: order.customerPhone || 'N/A',
              address: order.address,
              pincode: order.pincode,
              city: order.city,
              state: order.state,
              gstin: order.gstin
            },
            discountsApplied: order.discountsApplied || {
              promo: null,
              offer: null,
              totalDiscount: discountAmount
            }
          };
        });

        setOrders(transformedOrders);
        
      } catch (err: any) {
        console.error("Error fetching orders:", err);
        
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
        } else if (err.code === 'ERR_NETWORK') {
          setError(`Cannot connect to backend server at ${API_URL}. Please make sure the server is running.`);
        } else {
          setError(err.response?.data?.message || "Failed to fetch orders. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = filter === 'all' ? orders : orders.filter((o) => o.status === filter);
  // ✅ Use discounted amount for total spent calculation
  const totalSpent = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const inProgressOrders = orders.filter(o => o.status !== 'completed').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">Loading orders...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">
        {/* Header */}
        <div className="bg-secondary py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Order History</h1>
              <p className="text-white/60">View and manage all your past orders</p>
            </div>
            <Link
              to="/order"
              className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105"
            >
              <Package className="h-4 w-4" /> New Order
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Orders', value: orders.length, icon: Package },
              { label: 'Completed', value: completedOrders, icon: CheckCircle },
              { label: 'In Progress', value: inProgressOrders, icon: Printer },
              { label: 'Total Spent', value: `₹${totalSpent.toFixed(0)}`, icon: FileText },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-border p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {(['all', 'pending', 'processing', 'printing', 'ready', 'dispatched', 'completed', 'cancelled'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Order ID</th>
                    <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Date</th>
                    <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Details</th>
                    <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Order Status</th>
                    <th className="text-right p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Amount</th>
                    <th className="text-right p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, i) => {
                    const StatusIcon = statusIcons[order.status];
                    return (
                      <tr
                        key={order.id}
                        className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-150"
                      >
                        <td className="p-4">
                          <p className="font-mono font-bold text-foreground text-sm">{order.id}</p>
                          <p className="text-xs text-muted-foreground">{order.deliveryType}</p>
                         </td>
                        <td className="p-4">
                          <p className="text-sm text-foreground">{order.date}</p>
                         </td>
                        <td className="p-4">
                          <p className="text-sm font-medium text-foreground">
                            {order.pages} pages × {order.copies} copies
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.paperSize} · {order.printColor} · {order.bindingType}
                          </p>
                          {/* Show discount info if any */}
                          {order.discountAmount && order.discountAmount > 0 && (
                            <p className="text-xs text-green-600 mt-1">
                              Saved ₹{order.discountAmount.toFixed(2)}!
                            </p>
                          )}
                         </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                            <StatusIcon className="h-3 w-3" />
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                         </td>
                        <td className="p-4 text-right">
                          <p className="font-bold text-foreground">₹{order.amount.toFixed(2)}</p>
                          {order.originalAmount && order.originalAmount > order.amount && (
                            <p className="text-xs text-muted-foreground line-through">
                              ₹{order.originalAmount.toFixed(2)}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">incl. GST</p>
                         </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/tracking?orderId=${encodeURIComponent(order.id)}`}
                              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                              title="Track Order"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                            >
                              <FileText className="h-3.5 w-3.5" />
                              Invoice
                            </button>
                          </div>
                         </td>
                       </tr>
                    );
                  })}
                </tbody>
               </table>

              {filteredOrders.length === 0 && !error && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium">No orders found</p>
                  <Link to="/order" className="text-primary text-sm hover:underline mt-1 inline-block">
                    Place your first order
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Invoice Modal */}
      {selectedOrder && (
        <InvoiceModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}



// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FileText, Download, Eye, Clock, CheckCircle, Printer, Truck, Package, Filter, CreditCard, Wallet } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import axios from "axios";

// interface OrderItem {
//   pages: number;
//   copies: number;
//   paperSize: string;
//   printColor: string;
//   bindingType: string;
//   fileName?: string;
// }

// interface Payment {
//   _id: string;
//   paymentMethod: string;
//   status: string;
//   razorpayPaymentId?: string;
//   razorpayOrderId?: string;
//   amount: number;
// }

// interface Order {
//   id: string;
//   date: string;
//   pages: number;
//   copies: number;
//   paperSize: string;
//   printColor: string;
//   bindingType: string;
//   amount: number;
//   status: 'pending' | 'printing' | 'ready' | 'completed' | 'dispatched';
//   paymentStatus: string;
//   deliveryType: string;
//   razorpayOrderId?: string;
//   razorpayPaymentId?: string;
//   items?: OrderItem[];
//   payment?: Payment;
//   customer?: {
//     name: string;
//     phone: string;
//     address?: string;
//     pincode?: string;
//     city?: string;
//     state?: string;
//     gstin?: string;
//   };
// }

// const statusColors: Record<Order['status'], string> = {
//   pending: 'bg-yellow-100 text-yellow-700',
//   printing: 'bg-blue-100 text-blue-700',
//   ready: 'bg-green-100 text-green-700',
//   dispatched: 'bg-purple-100 text-purple-700',
//   completed: 'bg-primary/10 text-primary',
// };

// const statusIcons: Record<Order['status'], any> = {
//   pending: Clock,
//   printing: Printer,
//   ready: CheckCircle,
//   dispatched: Truck,
//   completed: CheckCircle,
// };

// function InvoiceModal({ order, onClose }: { order: Order; onClose: () => void }) {
//   const totalGstRate = 0.05;
//   const baseAmount = order.amount / (1 + totalGstRate);
//   const gst = order.amount - baseAmount;
//   const cgst = gst / 2;
//   const sgst = gst / 2;

//   const numberToWords = (num: number) => {
//     const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//     const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//     const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    
//     const convertToWords = (n: number): string => {
//       if (n === 0) return '';
//       if (n < 10) return ones[n];
//       if (n < 20) return teens[n - 10];
//       if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
//       if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertToWords(n % 100) : '');
//       if (n < 100000) return convertToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + convertToWords(n % 1000) : '');
//       if (n < 10000000) return convertToWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + convertToWords(n % 100000) : '');
//       return convertToWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 !== 0 ? ' ' + convertToWords(n % 10000000) : '');
//     };
    
//     const rupees = Math.floor(num);
//     const paise = Math.round((num - rupees) * 100);
    
//     let words = convertToWords(rupees);
//     words = words.charAt(0).toUpperCase() + words.slice(1);
    
//     if (paise > 0) {
//       words += ` and ${convertToWords(paise)} Paise`;
//     }
    
//     return words + ' Rupees Only';
//   };

//   const handleDownload = async () => {
//     const invoice = document.getElementById("invoice-print");
//     if (!invoice) return;

//     const canvas = await html2canvas(invoice, {
//       scale: 2,
//       useCORS: true,
//     });

//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");
//     const pdfWidth = 210;
//     const pdfHeight = 297;
//     const imgHeight = (canvas.height * pdfWidth) / canvas.width;
//     const finalHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, finalHeight);
//     pdf.save(`Invoice-${order.id}.pdf`);
//   };

//   // Check if order has multiple items
//   const hasMultipleItems = order.items && order.items.length > 0;
//   const items = hasMultipleItems ? order.items : [{
//     pages: order.pages || 0,
//     copies: order.copies || 1,
//     paperSize: order.paperSize || "A4",
//     printColor: order.printColor || "B&W",
//     bindingType: order.bindingType || "None"
//   }];

//   // Get customer details from order data
//   const customerName = order.customer?.name || "Customer";
//   const customerPhone = order.customer?.phone || "N/A";
//   const customerAddress = order.customer?.address || "";
//   const customerCity = order.customer?.city || "";
//   const customerPincode = order.customer?.pincode || "";
//   const customerState = order.customer?.state || "";
//   const customerGstin = order.customer?.gstin || "";
  
//   const fullAddress = customerAddress ? 
//     `${customerAddress}, ${customerCity} - ${customerPincode}, ${customerState}` : 
//     "Address not provided";
  
//   const isCourier = order.deliveryType === 'Courier' || order.deliveryType === 'courier';
  
//   // Get payment details from populated payment data
//   const payment = order.payment;
//   const actualPaymentMethod = payment?.paymentMethod || 'cod';
//   const paymentStatus = payment?.status || order.paymentStatus || 'pending';
//   const razorpayPaymentId = payment?.razorpayPaymentId || order.razorpayPaymentId;

//   console.log("Actual payment method from database:", actualPaymentMethod);

//   // Get payment mode display details based on actual payment method
//   const getPaymentDetails = () => {
//     switch (actualPaymentMethod) {
//       case 'upi':
//         return {
//           icon: Wallet,
//           title: 'UPI Payment',
//           description: 'Paid via UPI',
//           transactionId: razorpayPaymentId,
//           showBankDetails: false,
//           bankDetails: null
//         };
//       case 'card':
//         return {
//           icon: CreditCard,
//           title: 'Card Payment',
//           description: 'Paid via Credit/Debit Card',
//           transactionId: razorpayPaymentId,
//           showBankDetails: false,
//           bankDetails: null
//         };
//       case 'netbanking':
//         return {
//           icon: FileText,
//           title: 'Net Banking',
//           description: 'Paid via Net Banking',
//           transactionId: razorpayPaymentId,
//           showBankDetails: true,
//           bankDetails: {
//             bank: 'State Bank Of India, Chandervardai, Ajmer',
//             accountNo: '39918178182',
//             ifsc: 'SBIN0032089',
//             holder: 'Shree Education And Publication Private Limited'
//           }
//         };
//       case 'emi':
//         return {
//           icon: CreditCard,
//           title: 'EMI Payment',
//           description: 'Paid via EMI',
//           transactionId: razorpayPaymentId,
//           showBankDetails: false,
//           bankDetails: null
//         };
//       case 'wallet':
//         return {
//           icon: Wallet,
//           title: 'Wallet Payment',
//           description: 'Paid via Digital Wallet',
//           transactionId: razorpayPaymentId,
//           showBankDetails: false,
//           bankDetails: null
//         };
//       default:
//         return {
//           icon: Package,
//           title: 'Cash on Delivery',
//           description: 'Payment to be made at the time of delivery/pickup',
//           transactionId: null,
//           showBankDetails: false,
//           bankDetails: null
//         };
//     }
//   };

//   const paymentDetails = getPaymentDetails();
//   const PaymentIcon = paymentDetails.icon;

//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
//         {/* Invoice Content */}
//         <div id="invoice-print" className="p-8 md:p-10 bg-white w-[794px] mx-auto">
//           {/* Header */}
//           <div className="flex justify-between items-start border-b-2 border-secondary pb-6 mb-6">
//             <div>
//               <h1 className="text-xl font-black text-secondary">
//                 Shree Education and Publication private limited
//               </h1>
//               <p className="text-muted-foreground text-sm mt-1">
//                 Mother’s School Campus
//                 Gaddi Maliyan, Jonsganj Road
//               </p>
//               <p className="text-muted-foreground text-sm">
//                 Ajmer, Rajasthan – 305001
//                 India
//               </p>
//               <p className="text-muted-foreground text-sm mt-1">
//                 Phone: 7230001405 | Email: shreedupub@gmail.com
//               </p>
//               <p className="text-muted-foreground text-sm font-medium mt-1">
//                 GSTIN: 08ABECS6515Q1ZP
//               </p>
//             </div>
//             <div className="text-right">
//               <div className="bg-primary text-white px-5 py-3 rounded-lg inline-block">
//                 <p className="text-xs opacity-90">TAX INVOICE</p>
//                 <p className="font-bold text-lg">#{order.id}</p>
//               </div>
//               <p className="text-muted-foreground text-sm mt-3">
//                 Date: {order.date}
//               </p>
//               {isCourier ? (
//                 <p className="text-muted-foreground text-sm">
//                   Place of Supply: {customerState || '08-Rajasthan'}
//                 </p>
//               ) : (
//                 <p className="text-muted-foreground text-sm">
//                   Place of Supply: Store Pickup
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Bill To / Ship To - Dynamic based on delivery type */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="md:col-span-2">
//               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
//                 {isCourier ? 'Bill To / Ship To' : 'Bill To'}
//               </p>
//               <p className="font-semibold text-lg">{customerName}</p>
//               {isCourier ? (
//                 <>
//                   <p className="text-muted-foreground text-sm mt-1">{fullAddress}</p>
//                   <p className="text-muted-foreground text-sm">Contact No: {customerPhone}</p>
//                 </>
//               ) : (
//                 <>
//                   <p className="text-muted-foreground text-sm">Contact No: {customerPhone}</p>
//                   <p className="text-muted-foreground text-sm mt-2 font-medium">
//                     Pickup Location: Mother’s School Campus, Gaddi Maliyan, Jonsganj Road, Ajmer, Rajasthan
//                   </p>
//                 </>
//               )}
//               {customerGstin && (
//                 <p className="text-muted-foreground text-sm font-medium mt-2">
//                   GSTIN: {customerGstin}
//                 </p>
//               )}
//               {isCourier ? (
//                 <p className="text-muted-foreground text-sm">State: {customerState || '08-Rajasthan'}</p>
//               ) : (
//                 <p className="text-muted-foreground text-sm">State: Rajasthan</p>
//               )}
//             </div>

//             <div>
//               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
//                 Invoice Details
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 Invoice No: {order.id}
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 Date: {order.date}
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 Delivery: {order.deliveryType}
//               </p>
//               <p className="text-sm text-muted-foreground mt-2">
//                 Payment Status: 
//                 <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
//                   paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
//                 }`}>
//                   {paymentStatus === 'paid' ? 'Paid' : 'Pending'}
//                 </span>
//               </p>
//               {paymentDetails.transactionId && (
//                 <p className="text-sm text-muted-foreground mt-1">
//                   Transaction ID: {paymentDetails.transactionId}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Items Table */}
//           <table className="w-full mb-8 text-sm">
//             <thead>
//               <tr className="bg-secondary text-white">
//                 <th className="p-3 text-left rounded-tl-lg">#</th>
//                 <th className="p-3 text-left">Item name</th>
//                 <th className="p-3 text-center">Pages</th>
//                 <th className="p-3 text-center">Copies</th>
//                 <th className="p-3 text-center">Paper Size</th>
//                 <th className="p-3 text-center">Print Color</th>
//                 <th className="p-3 text-right">Binding</th>
//                 <th className="p-3 text-right rounded-tr-lg">Amount</th>
//                 </tr>
//             </thead>
//             <tbody>
//               {items.map((item, index) => {
//                 const itemAmount = order.amount / items.length;
                
//                 return (
//                   <tr key={index} className="border-b hover:bg-gray-50">
//                     <td className="p-3">{index + 1}</td>
//                     <td className="p-3">
//                       <p className="font-medium">{item.fileName || `Item ${index + 1}`}</p>
//                       <p className="text-xs text-muted-foreground">
//                         {item.bindingType} binding
//                       </p>
//                     </td>
//                     <td className="p-3 text-center">{item.pages}</td>
//                     <td className="p-3 text-center">{item.copies}</td>
//                     <td className="p-3 text-center">{item.paperSize}</td>
//                     <td className="p-3 text-center">{item.printColor}</td>
//                     <td className="p-3 text-right">{item.bindingType}</td>
//                     <td className="p-3 text-right font-medium">₹{itemAmount.toFixed(2)}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           {/* Amount in Words & Totals */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
//             <div>
//               <p className="font-medium">
//                 Invoice Amount In Words:
//               </p>
//               <p className="text-lg font-semibold text-secondary mt-1">
//                 {numberToWords(order.amount)}
//               </p>
//             </div>

//             <div className="w-64 space-y-2 text-right">
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Sub Total</span>
//                 <span>₹{baseAmount.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">CGST (2.5%)</span>
//                 <span>₹{cgst.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">SGST (2.5%)</span>
//                 <span>₹{sgst.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-black text-lg border-t-2 border-secondary pt-2 mt-2">
//                 <span>TOTAL</span>
//                 <span className="text-primary">₹{order.amount.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           {/* Payment Details - Display actual payment method from database */}
//           <div className="grid md:grid-cols-2 gap-8 mb-8">
//             <div>
//               <p className="font-medium mb-2">Payment Details</p>
//               <div className="flex items-center gap-2">
//                 <PaymentIcon className="h-5 w-5 text-primary" />
//                 <p className="text-muted-foreground font-medium">
//                   {paymentDetails.title}
//                 </p>
//               </div>
//               <p className="text-sm text-muted-foreground mt-1">
//                 {paymentDetails.description}
//               </p>
//               {paymentStatus === 'pending' && actualPaymentMethod === 'cod' && (
//                 <p className="text-sm text-amber-600 mt-1">
//                   * Payment to be made at the time of {isCourier ? 'delivery' : 'pickup'}
//                 </p>
//               )}
//             </div>

//             {/* Show Bank Details ONLY if payment mode is Net Banking */}
//             {paymentDetails.showBankDetails && paymentDetails.bankDetails && (
//               <div>
//                 <p className="font-medium mb-2">Bank Details</p>
//                 <p className="text-sm text-muted-foreground">
//                   <strong>Bank:</strong> {paymentDetails.bankDetails.bank}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   <strong>Account No:</strong> {paymentDetails.bankDetails.accountNo}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   <strong>IFSC Code:</strong> {paymentDetails.bankDetails.ifsc}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   <strong>Account Holder:</strong> {paymentDetails.bankDetails.holder}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Terms & Authorized Signatory */}
//           <div className="grid md:grid-cols-2 gap-8 mb-8">
//             <div>
//               <p className="font-medium mb-2">Terms and conditions</p>
//               <p className="text-sm text-muted-foreground">
//                 Thank you for doing business with us. For any queries, please contact our support team.
//               </p>
//               <p className="text-sm text-muted-foreground mt-1">
//                 Delivery: {isCourier ? 'Courier delivery within 3-5 business days' : 'Store pickup available during business hours'}
//               </p>
//             </div>

//             <div className="text-right">
//               <p className="font-medium mb-2">For: Shree Education and Publication private limited</p>
//               <div className="mt-10 border-t border-gray-400 w-48 ml-auto pt-2">
//                 <p className="text-sm">Authorized Signatory</p>
//               </div>
//             </div>
//           </div>

//           {/* Acknowledgment */}
//           <div className="border-t-2 border-secondary pt-6 mt-10 text-center">
//             <h4 className="font-bold text-lg mb-4">Acknowledgment</h4>
//             <p className="text-muted-foreground">
//               Shree Education and Publication private limited
//             </p>
//             <div className="mt-8 grid md:grid-cols-2 gap-6 text-left text-sm">
//               <div>
//                 <p><strong>Invoice To:</strong> {customerName}</p>
//                 {isCourier ? (
//                   <p>{fullAddress}</p>
//                 ) : (
//                   <p>Store Pickup - {customerName}</p>
//                 )}
//                 <p>Phone: {customerPhone}</p>
//               </div>
//               <div>
//                 <p><strong>Invoice Details:</strong></p>
//                 <p>Invoice No: {order.id}</p>
//                 <p>Invoice Date: {order.date}</p>
//                 <p>Payment Mode: {paymentDetails.title.toUpperCase()}</p>
//                 <p>Payment Status: {paymentStatus === 'paid' ? 'PAID' : 'PENDING'}</p>
//                 <p>Total: ₹{order.amount.toFixed(2)}</p>
//               </div>
//             </div>
//             <div className="mt-10 border-t border-dashed pt-6">
//               <p className="text-muted-foreground text-sm">
//                 Receiver's Seal & Sign .......................................................
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons (non-printable) */}
//         <div className="px-8 pb-8 flex gap-4 no-print">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-border text-foreground font-medium py-3 rounded-lg hover:bg-muted transition-all"
//           >
//             Close
//           </button>
//           <button
//             onClick={handleDownload}
//             className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
//           >
//             <Download className="h-4 w-4" /> Print / Download
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function OrderHistoryPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [filter, setFilter] = useState<'all' | Order['status']>('all');

//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const token = localStorage.getItem("token");
        
//         if (!token) {
//           setError("Please login to view your orders");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`${API_URL}/order`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         let ordersData = [];
        
//         if (response.data && response.data.orders && Array.isArray(response.data.orders)) {
//           ordersData = response.data.orders;
//         } else if (response.data && Array.isArray(response.data)) {
//           ordersData = response.data;
//         } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
//           ordersData = response.data.data;
//         } else {
//           ordersData = [];
//         }

//         const transformedOrders = ordersData.map((order: any) => {
//           const printColorMap: Record<string, string> = {
//             'bw': 'B&W',
//             'color': 'Color'
//           };
          
//           const items = order.items?.map((item: any) => ({
//             pages: item.pages || 0,
//             copies: item.copies || 1,
//             paperSize: item.paperSize || "A4",
//             printColor: printColorMap[item.printColor] || "B&W",
//             bindingType: item.bindingType || "None",
//             fileName: item.files?.[0]?.name || `Document ${item.pages} pages`
//           })) || [];
          
//           const firstItem = items[0] || {
//             pages: 0,
//             copies: 1,
//             paperSize: "A4",
//             printColor: "B&W",
//             bindingType: "None"
//           };
          
//           let uiStatus: Order['status'] = 'pending';
//           switch (order.status) {
//             case 'pending':
//               uiStatus = 'pending';
//               break;
//             case 'processing':
//               uiStatus = 'printing';
//               break;
//             case 'completed':
//               uiStatus = 'completed';
//               break;
//             default:
//               uiStatus = 'pending';
//           }

//           // Get payment details from populated paymentId
//           const payment = order.paymentId;
          
//           console.log("Order payment data:", payment);

//           return {
//             id: order.orderNumber || order._id?.slice(-8) || 'N/A',
//             date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA'),
//             pages: firstItem.pages,
//             copies: firstItem.copies,
//             paperSize: firstItem.paperSize,
//             printColor: firstItem.printColor,
//             bindingType: firstItem.bindingType,
//             amount: order.totalAmount || 0,
//             status: uiStatus,
//             deliveryType: order.deliveryType === 'pickup' ? 'Store Pickup' : 'Courier',
//             paymentStatus: order.paymentStatus || 'pending',
//             razorpayOrderId: order.razorpayOrderId,
//             razorpayPaymentId: order.razorpayPaymentId,
//             items: items,
//             payment: payment,
//             customer: order.customer || {
//               name: order.customerName || 'Customer',
//               phone: order.customerPhone || 'N/A',
//               address: order.address,
//               pincode: order.pincode,
//               city: order.city,
//               state: order.state,
//               gstin: order.gstin
//             }
//           };
//         });

//         console.log("Transformed orders with payment:", transformedOrders);
//         setOrders(transformedOrders);
        
//       } catch (err: any) {
//         console.error("Error fetching orders:", err);
        
//         if (err.response?.status === 401) {
//           setError("Session expired. Please login again.");
//         } else if (err.code === 'ERR_NETWORK') {
//           setError(`Cannot connect to backend server at ${API_URL}. Please make sure the server is running.`);
//         } else {
//           setError(err.response?.data?.message || "Failed to fetch orders. Please try again.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const filteredOrders = filter === 'all' ? orders : orders.filter((o) => o.status === filter);
//   const totalSpent = orders.reduce((sum, o) => sum + o.amount, 0);
//   const completedOrders = orders.filter(o => o.status === 'completed').length;
//   const inProgressOrders = orders.filter(o => o.status !== 'completed').length;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="pt-20">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="text-center">Loading orders...</div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <div className="pt-20">
//         {/* Header */}
//         <div className="bg-secondary py-10">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Order History</h1>
//               <p className="text-white/60">View and manage all your past orders</p>
//             </div>
//             <Link
//               to="/order"
//               className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105"
//             >
//               <Package className="h-4 w-4" /> New Order
//             </Link>
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Error Message */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-700 font-medium">{error}</p>
//             </div>
//           )}

//           {/* Stats Row */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
//             {[
//               { label: 'Total Orders', value: orders.length, icon: Package },
//               { label: 'Completed', value: completedOrders, icon: CheckCircle },
//               { label: 'In Progress', value: inProgressOrders, icon: Printer },
//               { label: 'Total Spent', value: `₹${totalSpent.toFixed(0)}`, icon: FileText },
//             ].map((stat) => (
//               <div key={stat.label} className="bg-white rounded-xl border border-border p-4 shadow-sm">
//                 <div className="flex items-center gap-3">
//                   <div className="bg-primary/10 p-2 rounded-lg">
//                     <stat.icon className="h-4 w-4 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-xl font-black text-foreground">{stat.value}</p>
//                     <p className="text-xs text-muted-foreground">{stat.label}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Filters */}
//           <div className="flex items-center gap-2 mb-6 flex-wrap">
//             <Filter className="h-4 w-4 text-muted-foreground" />
//             {(['all', 'printing', 'completed', 'pending'] as const).map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
//                   filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
//                 }`}
//               >
//                 {f.charAt(0).toUpperCase() + f.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* Orders Table */}
//           <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-muted/50 border-b border-border">
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Order ID</th>
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Date</th>
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Details</th>
//                     <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Status</th>
//                     <th className="text-right p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Amount</th>
//                     <th className="text-right p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredOrders.map((order, i) => {
//                     const StatusIcon = statusIcons[order.status];
//                     return (
//                       <tr
//                         key={order.id}
//                         className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-150"
//                       >
//                         <td className="p-4">
//                           <p className="font-mono font-bold text-foreground text-sm">{order.id}</p>
//                           <p className="text-xs text-muted-foreground">{order.deliveryType}</p>
//                         </td>
//                         <td className="p-4">
//                           <p className="text-sm text-foreground">{order.date}</p>
//                         </td>
//                         <td className="p-4">
//                           <p className="text-sm font-medium text-foreground">
//                             {order.pages} pages × {order.copies} copies
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             {order.paperSize} · {order.printColor} · {order.bindingType}
//                           </p>
//                         </td>
//                         <td className="p-4">
//                           <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
//                             <StatusIcon className="h-3 w-3" />
//                             {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                           </span>
//                         </td>
//                         <td className="p-4 text-right">
//                           <p className="font-bold text-foreground">₹{order.amount.toFixed(2)}</p>
//                           <p className="text-xs text-muted-foreground">incl. GST</p>
//                         </td>
//                         <td className="p-4 text-right">
//                           <div className="flex items-center justify-end gap-2">
//                             <Link
//                               to={`/tracking?orderId=${order.id}`}
//                               className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
//                               title="Track Order"
//                             >
//                               <Eye className="h-4 w-4" />
//                             </Link>
//                             <button
//                               onClick={() => setSelectedOrder(order)}
//                               className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200"
//                             >
//                               <FileText className="h-3.5 w-3.5" />
//                               Invoice
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>

//               {filteredOrders.length === 0 && !error && (
//                 <div className="text-center py-12">
//                   <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
//                   <p className="text-muted-foreground font-medium">No orders found</p>
//                   <Link to="/order" className="text-primary text-sm hover:underline mt-1 inline-block">
//                     Place your first order
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />

//       {/* Invoice Modal */}
//       {selectedOrder && (
//         <InvoiceModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
//       )}
//     </div>
//   );
// }
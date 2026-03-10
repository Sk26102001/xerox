import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Eye, Clock, CheckCircle, Printer, Truck, Package, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Order {
  id: string;
  date: string;
  pages: number;
  copies: number;
  paperSize: string;
  printColor: string;
  bindingType: string;
  amount: number;
  status: 'pending' | 'printing' | 'ready' | 'completed' | 'dispatched';
  deliveryType: string;
}

const mockOrders: Order[] = [
  {
    id: 'BP20260219001',
    date: '2026-02-19',
    pages: 200,
    copies: 2,
    paperSize: 'A4',
    printColor: 'B&W',
    bindingType: 'Perfect Glue',
    amount: 425.60,
    status: 'printing',
    deliveryType: 'Store Pickup',
  },
  {
    id: 'BP20260215002',
    date: '2026-02-15',
    pages: 350,
    copies: 5,
    paperSize: 'B5',
    printColor: 'B&W',
    bindingType: 'Hardbound',
    amount: 1280.50,
    status: 'completed',
    deliveryType: 'Courier',
  },
  {
    id: 'BP20260210003',
    date: '2026-02-10',
    pages: 120,
    copies: 1,
    paperSize: 'A5',
    printColor: 'Color',
    bindingType: 'Spiral',
    amount: 840.00,
    status: 'completed',
    deliveryType: 'Store Pickup',
  },
  {
    id: 'BP20260201004',
    date: '2026-02-01',
    pages: 500,
    copies: 10,
    paperSize: 'A4',
    printColor: 'B&W',
    bindingType: 'Perfect Glue',
    amount: 3150.00,
    status: 'completed',
    deliveryType: 'Courier',
  },
];

const statusColors: Record<Order['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  printing: 'bg-blue-100 text-blue-700',
  ready: 'bg-green-100 text-green-700',
  dispatched: 'bg-purple-100 text-purple-700',
  completed: 'bg-primary/10 text-primary',
};

const statusIcons: Record<Order['status'], any> = {
  pending: Clock,
  printing: Printer,
  ready: CheckCircle,
  dispatched: Truck,
  completed: CheckCircle,
};

// Invoice Generator Component
// function InvoiceModal({ order, onClose }: { order: Order; onClose: () => void }) {
//   const gst = order.amount / 1.18 * 0.18;
//   const baseAmount = order.amount - gst;
// //   const totalGstRate = 0.14; // 5% + 9%
// // const baseAmount = order.amount / (1 + totalGstRate);
// // const cgst = baseAmount * 0.05;
// // const sgst = baseAmount * 0.09;

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
//         {/* Invoice */}
//         <div id="invoice-print" className="p-8">
//           {/* Header */}
//           <div className="flex justify-between items-start border-b-2 border-secondary pb-6 mb-6">
//             <div>
//               <h1 className="text-xl font-black text-secondary">Shree Education and Publication private limited</h1>
//               <p className="text-muted-foreground text-sm">Where Ideas Ink Themselves</p>
//               <p className="text-muted-foreground text-sm mt-1">Rajasthan, India</p>
//               <p className="text-muted-foreground text-sm">GSTIN: 08ABECS6515Q1ZP</p>
//             </div>
//             <div className="text-right">
//               <div className="bg-primary text-white px-4 py-2 rounded-lg">
//                 <p className="text-xs opacity-80">TAX INVOICE</p>
//                 <p className="font-bold">#{order.id}</p>
//               </div>
//               <p className="text-muted-foreground text-sm mt-2">Date: {order.date}</p>
//             </div>
//           </div>

//           {/* Customer */}
//           <div className="grid grid-cols-2 gap-6 mb-6">
//             <div>
//               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Bill To</p>
//               <p className="font-semibold text-foreground">Customer Name</p>
//               <p className="text-muted-foreground text-sm">customer@email.com</p>
//               <p className="text-muted-foreground text-sm">+91 XXXXX XXXXX</p>
//             </div>
//             <div className="text-right">
//               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Order Info</p>
//               <p className="text-sm text-muted-foreground">Delivery: {order.deliveryType}</p>
//               <p className="text-sm text-muted-foreground">Payment: Razorpay</p>
//             </div>
//           </div>

//           {/* Items Table */}
//           <table className="w-full mb-6">
//             <thead>
//               <tr className="bg-secondary text-white">
//                 <th className="p-3 text-left text-sm font-semibold rounded-tl-lg">Description</th>
//                 <th className="p-3 text-center text-sm font-semibold">Qty</th>
//                 <th className="p-3 text-right text-sm font-semibold">Rate</th>
//                 <th className="p-3 text-right text-sm font-semibold rounded-tr-lg">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-b border-border">
//                 <td className="p-3 text-sm">
//                   <p className="font-medium">{order.printColor} Printing — {order.paperSize}</p>
//                   <p className="text-muted-foreground text-xs">{order.pages} pages × {order.copies} copies × {order.bindingType} binding</p>
//                 </td>
//                 <td className="p-3 text-center text-sm">{order.copies}</td>
//                 <td className="p-3 text-right text-sm">₹{(baseAmount / order.copies).toFixed(2)}</td>
//                 <td className="p-3 text-right text-sm font-medium">₹{baseAmount.toFixed(2)}</td>
//               </tr>
//             </tbody>
//           </table>

//           {/* Totals */}
//           <div className="flex justify-end">
//             <div className="w-56 space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-muted-foreground">Subtotal</span>
//                 <span>₹{baseAmount.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-muted-foreground">CGST (5%)</span>
//                 <span>₹{(gst / 2).toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-muted-foreground">SGST (9%)</span>
//                 <span>₹{(gst / 2).toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-black text-lg border-t-2 border-secondary pt-2 mt-2">
//                 <span>TOTAL</span>
//                 <span className="text-primary">₹{order.amount.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="mt-8 pt-6 border-t border-border text-center">
//             <p className="text-muted-foreground text-xs">Thank you for choosing BookPrinters.in</p>
//             <p className="text-muted-foreground text-xs">This is a computer-generated invoice and does not require a physical signature.</p>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="px-8 pb-6 flex gap-3 no-print">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-border text-foreground font-medium py-2.5 rounded-lg hover:bg-muted transition-all duration-200"
//           >
//             Close
//           </button>
//           <button
//             onClick={handlePrint}
//             className="flex-1 bg-primary text-primary-foreground font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2"
//           >
//             <Download className="h-4 w-4" /> Download / Print
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

function InvoiceModal({ order, onClose }: { order: Order; onClose: () => void }) {
  // 5% total GST (2.5% CGST + 2.5% SGST)
  const totalGstRate = 0.05;
  const baseAmount = order.amount / (1 + totalGstRate);
  const gst = order.amount - baseAmount;
  const cgst = gst / 2;   // 2.5%
  const sgst = gst / 2;   // 2.5%

  // const handlePrint = () => {
  //   window.print();


const handleDownload = async () => {
  const invoice = document.getElementById("invoice-print");
  if (!invoice) return;

  const canvas = await html2canvas(invoice, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = 210;  // A4 width in mm
  const pdfHeight = 297; // A4 height in mm

  // Calculate image ratio
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // If content is taller than A4, scale it down
  const finalHeight =
    imgHeight > pdfHeight ? pdfHeight : imgHeight;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    pdfWidth,
    finalHeight
  );

  pdf.save(`Invoice-${order.id}.pdf`);
};
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Invoice Content */}
        <div
  id="invoice-print"
  className="p-8 md:p-10 bg-white w-[794px] mx-auto"
>
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-secondary pb-6 mb-6">
            <div>
              <h1 className="text-xl font-black text-secondary">
                Shree Education and Publication private limited
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Mother’s School Campus
Gaddi Maliyan, Jonsganj Road

              </p>
              <p className="text-muted-foreground text-sm">
                 AJMER, Rajasthan – 305001
India
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Phone: 7230001405 | Email: shreedupub@gmail.com
              </p>
              <p className="text-muted-foreground text-sm font-medium mt-1">
                GSTIN: 08ABECS6515Q1ZP
              </p>
            </div>
            <div className="text-right">
              <div className="bg-primary text-white px-5 py-3 rounded-lg inline-block">
                <p className="text-xs opacity-90">TAX INVOICE</p>
                <p className="font-bold text-lg">#{order.id }</p>
              </div>
              <p className="text-muted-foreground text-sm mt-3">
                Date: {order.date || "07-02-2026"}
              </p>
              <p className="text-muted-foreground text-sm">
                Place of Supply: 09-Uttar Pradesh
              </p>
            </div>
          </div>

          {/* Bill To / Ship To */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                Bill To / Ship To
              </p>
              <p className="font-semibold">Diwakar Education Hub</p>
              <p className="text-muted-foreground text-sm">
                NA NA NA Barampur Kiratpur
              </p>
              <p className="text-muted-foreground text-sm">
                Contact No: 7310762592
              </p>
              <p className="text-muted-foreground text-sm font-medium">
                GSTIN: 09GAIPS3840G1ZB
              </p>
              <p className="text-muted-foreground text-sm">State: 09-Uttar Pradesh</p>
            </div>

            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                Invoice Details
              </p>
              <p className="text-sm text-muted-foreground">
                Invoice No: {order.id }
              </p>
              <p className="text-sm text-muted-foreground">
                Date: {order.date || "07-02-2026"}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full mb-8 text-sm">
            <thead>
              <tr className="bg-secondary text-white">
                <th className="p-3 text-left rounded-tl-lg">#</th>
                <th className="p-3 text-left">Item name</th>
                <th className="p-3 text-center">HSN/SAC</th>
                <th className="p-3 text-center">Quantity</th>
                <th className="p-3 text-right">Price/unit</th>
                <th className="p-3 text-right rounded-tr-lg">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">1</td>
                <td className="p-3">UGC NET Psychology PYQ</td>
                <td className="p-3 text-center">—</td>
                <td className="p-3 text-center">50</td>
                <td className="p-3 text-right">₹165.00</td>
                <td className="p-3 text-right font-medium">₹8,250.00</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">2</td>
                <td className="p-3">CUET PG English Theory Book</td>
                <td className="p-3 text-center">—</td>
                <td className="p-3 text-center">50</td>
                <td className="p-3 text-right">₹116.00</td>
                <td className="p-3 text-right font-medium">₹5,800.00</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">3</td>
                <td className="p-3">JAILIB Hindi Medium education</td>
                <td className="p-3 text-center">—</td>
                <td className="p-3 text-center">30</td>
                <td className="p-3 text-right">₹169.00</td>
                <td className="p-3 text-right font-medium">₹5,070.00</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">4</td>
                <td className="p-3">CUET ug physical education</td>
                <td className="p-3 text-center">—</td>
                <td className="p-3 text-center">50</td>
                <td className="p-3 text-right">₹92.00</td>
                <td className="p-3 text-right font-medium">₹4,600.00</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">5</td>
                <td className="p-3">JAILIB English Medium</td>
                <td className="p-3 text-center">—</td>
                <td className="p-3 text-center">30</td>
                <td className="p-3 text-right">₹184.00</td>
                <td className="p-3 text-right font-medium">₹5,520.00</td>
              </tr>
              <tr className="font-bold bg-gray-50">
                <td colSpan={5} className="p-3 text-right">
                  Total
                </td>
                <td className="p-3 text-right">₹29,240.00</td>
              </tr>
            </tbody>
          </table>

          {/* Amount in Words & Totals */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <p className="font-medium">
                Invoice Amount In Words:
              </p>
              <p className="text-lg font-semibold text-secondary mt-1">
                Twenty Nine Thousand Two Hundred and Forty Rupees only
              </p>
            </div>

            <div className="w-64 space-y-2 text-right">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sub Total</span>
                <span>₹{baseAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CGST (2.5%)</span>
                <span>₹{cgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">SGST (2.5%)</span>
                <span>₹{sgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-black text-lg border-t-2 border-secondary pt-2 mt-2">
                <span>TOTAL</span>
                <span className="text-primary">₹{order.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Mode & Bank Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="font-medium mb-2">Payment Mode</p>
              <p className="text-muted-foreground">
                Shree Education And Publication Private Limited
              </p>
            </div>

            <div>
              <p className="font-medium mb-2">Bank Details</p>
              <p className="text-sm text-muted-foreground">
                <strong>Name:</strong> State Bank Of India, Chandervardai, Ajmer
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Account No:</strong> 39918178182
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>IFSC Code:</strong> SBIN0032089
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Account Holder:</strong> Shree Education And Publication Private Limited
              </p>
            </div>
          </div>

          {/* Terms & Authorized Signatory */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="font-medium mb-2">Terms and conditions</p>
              <p className="text-sm text-muted-foreground">
                Thank you for doing business with us.
              </p>
            </div>

            <div className="text-right">
              <p className="font-medium mb-2">For: Shree Education and Publication private limited</p>
              <div className="mt-10 border-t border-gray-400 w-48 ml-auto pt-2">
                <p className="text-sm">Authorized Signatory</p>
              </div>
            </div>
          </div>

          {/* Acknowledgment */}
          <div className="border-t-2 border-secondary pt-6 mt-10 text-center">
            <h4 className="font-bold text-lg mb-4">Acknowledgment</h4>
            <p className="text-muted-foreground">
              Shree Education and Publication private limited
            </p>
            <div className="mt-8 grid md:grid-cols-2 gap-6 text-left text-sm">
              <div>
                <p><strong>Invoice To:</strong> Diwakar Education Hub</p>
                <p>NA NA NA Barampur Kiratpur</p>
              </div>
              <div>
                <p><strong>Invoice Details:</strong></p>
                <p>Invoice No: 107</p>
                <p>Invoice Date: 07-02-2026</p>
                <p>Total: ₹{order.amount.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-10 border-t border-dashed pt-6">
              <p className="text-muted-foreground text-sm">
                Receiver's Seal & Sign .......................................................
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons (non-printable) */}
        <div className="px-8 pb-8 flex gap-4 no-print">
          <button
            onClick={onClose}
            className="flex-1 border border-border text-foreground font-medium py-3 rounded-lg hover:bg-muted transition-all"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" /> Print / Download
          </button>
        </div>
      </div>
    </div>
  );
}


export default function OrderHistoryPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<'all' | Order['status']>('all');

  const filteredOrders = filter === 'all' ? mockOrders : mockOrders.filter((o) => o.status === filter);

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
          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Orders', value: mockOrders.length, icon: Package },
              { label: 'Completed', value: mockOrders.filter(o => o.status === 'completed').length, icon: CheckCircle },
              { label: 'In Progress', value: mockOrders.filter(o => o.status !== 'completed').length, icon: Printer },
              { label: 'Total Spent', value: `₹${mockOrders.reduce((a, o) => a + o.amount, 0).toFixed(0)}`, icon: FileText },
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
            {(['all', 'printing', 'completed', 'pending'] as const).map((f) => (
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
                    <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wide">Status</th>
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
                        style={{ animationDelay: `${i * 0.05}s` }}
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
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                            <StatusIcon className="h-3 w-3" />
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <p className="font-bold text-foreground">₹{order.amount.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">incl. GST</p>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/tracking?orderId=${order.id}`}
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

              {filteredOrders.length === 0 && (
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

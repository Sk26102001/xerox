// components/InvoiceModal.tsx
import { Download, FileText, Package, CreditCard, Wallet } from 'lucide-react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  amount: number;
  status: string;
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
}

interface InvoiceModalProps {
  order: Order;
  onClose: () => void;
}

const numberToWords = (num: number) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  
  const convertToWords = (n: number): string => {
    if (n === 0) return '';
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertToWords(n % 100) : '');
    if (n < 100000) return convertToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + convertToWords(n % 1000) : '');
    if (n < 10000000) return convertToWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + convertToWords(n % 100000) : '');
    return convertToWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 !== 0 ? ' ' + convertToWords(n % 10000000) : '');
  };
  
  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);
  
  let words = convertToWords(rupees);
  words = words.charAt(0).toUpperCase() + words.slice(1);
  
  if (paise > 0) {
    words += ` and ${convertToWords(paise)} Paise`;
  }
  
  return words + ' Rupees Only';
};

export default function InvoiceModal({ order, onClose }: InvoiceModalProps) {
  const totalGstRate = 0.05;
  const baseAmount = order.amount / (1 + totalGstRate);
  const gst = order.amount - baseAmount;
  const cgst = gst / 2;
  const sgst = gst / 2;

  const handleDownload = async () => {
    const invoice = document.getElementById("invoice-print");
    if (!invoice) return;

    const canvas = await html2canvas(invoice, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    const finalHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, finalHeight);
    pdf.save(`Invoice-${order.id}.pdf`);
  };

  // Check if order has multiple items
  const hasMultipleItems = order.items && order.items.length > 0;
  const items = hasMultipleItems ? order.items : [{
    pages: order.pages || 0,
    copies: order.copies || 1,
    paperSize: order.paperSize || "A4",
    printColor: order.printColor || "B&W",
    bindingType: order.bindingType || "None"
  }];

  // Get customer details from order data
  const customerName = order.customer?.name || "Customer";
  const customerPhone = order.customer?.phone || "N/A";
  const customerAddress = order.customer?.address || "";
  const customerCity = order.customer?.city || "";
  const customerPincode = order.customer?.pincode || "";
  const customerState = order.customer?.state || "";
  const customerGstin = order.customer?.gstin || "";
  
  const fullAddress = customerAddress ? 
    `${customerAddress}, ${customerCity} - ${customerPincode}, ${customerState}` : 
    "Address not provided";
  
  const isCourier = order.deliveryType === 'Courier' || order.deliveryType === 'courier';
  const paymentMode = order.paymentMode || 'cod';
  const paymentStatus = order.paymentStatus || 'pending';

  // Get payment mode display details
  const getPaymentDetails = () => {
    switch (paymentMode) {
      case 'upi':
        return {
          icon: Wallet,
          title: 'UPI Payment',
          description: 'Paid via UPI',
          transactionId: order.razorpayPaymentId,
          showBankDetails: false,
          bankDetails: null
        };
      case 'card':
        return {
          icon: CreditCard,
          title: 'Card Payment',
          description: 'Paid via Credit/Debit Card',
          transactionId: order.razorpayPaymentId,
          showBankDetails: false,
          bankDetails: null
        };
      case 'bank':
        return {
          icon: FileText,
          title: 'Bank Transfer',
          description: 'Payment via Bank Transfer',
          transactionId: order.razorpayPaymentId,
          showBankDetails: true,
          bankDetails: {
            bank: 'State Bank Of India, Chandervardai, Ajmer',
            accountNo: '39918178182',
            ifsc: 'SBIN0032089',
            holder: 'Shree Education And Publication Private Limited'
          }
        };
      default:
        return {
          icon: Package,
          title: 'Cash on Delivery',
          description: 'Payment to be made at the time of delivery/pickup',
          transactionId: null,
          showBankDetails: false,
          bankDetails: null
        };
    }
  };

  const paymentDetails = getPaymentDetails();
  const PaymentIcon = paymentDetails.icon;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Invoice Content */}
        <div id="invoice-print" className="p-8 md:p-10 bg-white w-[850px] mx-auto">
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
      Ajmer, Rajasthan – 305001
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
    <div className="bg-primary text-white px-5 py-3 rounded-lg inline-block max-w-full">
      <p className="text-xs opacity-90 whitespace-nowrap">TAX INVOICE</p>
      <p className="font-bold text-lg whitespace-nowrap">
        #{order.id}
      </p>
    </div>
    <p className="text-muted-foreground text-sm mt-3 whitespace-nowrap">
      Date: {order.date}
    </p>
    {isCourier ? (
      <p className="text-muted-foreground text-sm whitespace-nowrap">
        Place of Supply: {customerState || '08-Rajasthan'}
      </p>
    ) : (
      <p className="text-muted-foreground text-sm whitespace-nowrap">
        Place of Supply: Store Pickup
      </p>
    )}
  </div>
</div>

          {/* Bill To / Ship To */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                {isCourier ? 'Bill To / Ship To' : 'Bill To'}
              </p>
              <p className="font-semibold text-lg">{customerName}</p>
              {isCourier ? (
                <>
                  <p className="text-muted-foreground text-sm mt-1">{fullAddress}</p>
                  <p className="text-muted-foreground text-sm">Contact No: {customerPhone}</p>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground text-sm">Contact No: {customerPhone}</p>
                  <p className="text-muted-foreground text-sm mt-2 font-medium">
                    Pickup Location: Mother’s School Campus, Gaddi Maliyan, Jonsganj Road, Ajmer, Rajasthan
                  </p>
                </>
              )}
              {customerGstin && (
                <p className="text-muted-foreground text-sm font-medium mt-2">
                  GSTIN: {customerGstin}
                </p>
              )}
              {isCourier ? (
                <p className="text-muted-foreground text-sm">State: {customerState || '08-Rajasthan'}</p>
              ) : (
                <p className="text-muted-foreground text-sm">State: Rajasthan</p>
              )}
            </div>

            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                Invoice Details
              </p>
              <p className="text-sm text-muted-foreground">Invoice No: {order.id}</p>
              <p className="text-sm text-muted-foreground">Date: {order.date}</p>
              <p className="text-sm text-muted-foreground">Delivery: {order.deliveryType}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Payment Status: 
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                  paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                </span>
              </p>
              {paymentDetails.transactionId && (
                <p className="text-sm text-muted-foreground mt-1">
                  Transaction ID: {paymentDetails.transactionId}
                </p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full mb-8 text-sm">
            <thead>
              <tr className="bg-secondary text-white">
                <th className="p-3 text-left rounded-tl-lg">#</th>
                <th className="p-3 text-left">Item name</th>
                <th className="p-3 text-center">Pages</th>
                <th className="p-3 text-center">Copies</th>
                <th className="p-3 text-center">Paper Size</th>
                <th className="p-3 text-center">Print Color</th>
                <th className="p-3 text-right">Binding</th>
                <th className="p-3 text-right rounded-tr-lg">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const itemAmount = order.amount / items.length;
                
                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">
                      <p className="font-medium">{item.fileName || `Item ${index + 1}`}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.bindingType} binding
                      </p>
                    </td>
                    <td className="p-3 text-center">{item.pages}</td>
                    <td className="p-3 text-center">{item.copies}</td>
                    <td className="p-3 text-center">{item.paperSize}</td>
                    <td className="p-3 text-center">{item.printColor}</td>
                    <td className="p-3 text-right">{item.bindingType}</td>
                    <td className="p-3 text-right font-medium">₹{itemAmount.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Amount in Words & Totals */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <p className="font-medium">Invoice Amount In Words:</p>
              <p className="text-lg font-semibold text-secondary mt-1">
                {numberToWords(order.amount)}
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

          {/* Payment Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="font-medium mb-2">Payment Details</p>
              <div className="flex items-center gap-2">
                <PaymentIcon className="h-5 w-5 text-primary" />
                <p className="text-muted-foreground font-medium">
                  {paymentDetails.title}
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {paymentDetails.description}
              </p>
              {paymentStatus === 'pending' && paymentMode === 'cod' && (
                <p className="text-sm text-amber-600 mt-1">
                  * Payment to be made at the time of {isCourier ? 'delivery' : 'pickup'}
                </p>
              )}
            </div>

            {paymentDetails.showBankDetails && paymentDetails.bankDetails && (
              <div>
                <p className="font-medium mb-2">Bank Details</p>
                <p className="text-sm text-muted-foreground">
                  <strong>Bank:</strong> {paymentDetails.bankDetails.bank}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Account No:</strong> {paymentDetails.bankDetails.accountNo}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>IFSC Code:</strong> {paymentDetails.bankDetails.ifsc}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Account Holder:</strong> {paymentDetails.bankDetails.holder}
                </p>
              </div>
            )}
          </div>

          {/* Terms & Authorized Signatory */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="font-medium mb-2">Terms and conditions</p>
              <p className="text-sm text-muted-foreground">
                Thank you for doing business with us. For any queries, please contact our support team.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Delivery: {isCourier ? 'Courier delivery within 3-5 business days' : 'Store pickup available during business hours'}
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
                <p><strong>Invoice To:</strong> {customerName}</p>
                {isCourier ? (
                  <p>{fullAddress}</p>
                ) : (
                  <p>Store Pickup - {customerName}</p>
                )}
                <p>Phone: {customerPhone}</p>
              </div>
              <div>
                <p><strong>Invoice Details:</strong></p>
                <p>Invoice No: {order.id}</p>
                <p>Invoice Date: {order.date}</p>
                <p>Payment Mode: {paymentDetails.title.toUpperCase()}</p>
                <p>Payment Status: {paymentStatus === 'paid' ? 'PAID' : 'PENDING'}</p>
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

        {/* Action Buttons */}
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
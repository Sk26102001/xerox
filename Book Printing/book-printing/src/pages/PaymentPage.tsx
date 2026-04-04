// // src/pages/order/PaymentPage.tsx
// import { Link, useNavigate } from 'react-router-dom';
// import { useCartStore } from '@/store/cartStore'; // Adjust path if your store is elsewhere
// import {
//   CreditCard,
//   IndianRupee,
//   ArrowLeft,
//   CheckCircle,
//   Info,
//   Shield,
//   Truck,
//   Package,
//   AlertCircle,
//   ArrowRight,
// } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// export default function PaymentPage() {
//   const navigate = useNavigate();

//   // Pull real cart data from Zustand store
//   const items = useCartStore((state) => state.items);
//   const subtotal = useCartStore((state) => state.subtotal());

//   // Delivery type – for now hardcoded (you can add to store later)
//   const deliveryType: 'pickup' | 'courier' = 'courier'; // ← change as needed or pull from state

//   // Calculate final totals
//   const gst = subtotal * 0.05;
//   const shipping = deliveryType === 'courier' ? 80 : 0; // example: ₹80 for courier
//   const grandTotal = subtotal + gst + shipping;

//   const handlePayNow = () => {
//     // Placeholder for real Razorpay integration
//     alert(
//       `Initiating secure payment of ₹${grandTotal.toFixed(
//         2
//       )} via Razorpay...\n\nOrder ID will be generated on successful payment.`
//     );

//     // In real implementation:
//     // 1. Create Razorpay order via your backend API
//     // 2. Open Razorpay checkout
//     // 3. On success → clear cart, show success page
//     // Example skeleton:
//     /*
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY,
//       amount: Math.round(grandTotal * 100),
//       currency: 'INR',
//       name: 'BookPrinters.in',
//       description: `Payment for ${items.length} print job${items.length > 1 ? 's' : ''}`,
//       handler: (response) => {
//         console.log('Payment successful:', response);
//         useCartStore.getState().clearCart();
//         navigate('/order/success');
//       },
//     };
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//     */
//   };

//   // Empty cart protection
//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="flex items-center justify-center min-h-[70vh] px-4">
//           <div className="text-center max-w-md">
//             <AlertCircle className="h-20 w-20 text-amber-500 mx-auto mb-6" />
//             <h2 className="text-3xl font-black text-foreground mb-4">
//               Your Cart is Empty
//             </h2>
//             <p className="text-muted-foreground text-lg mb-10">
//               Please add printing items to your cart before proceeding to payment.
//             </p>
//             <Link
//               to="/order"
//               className="inline-flex items-center gap-3 bg-primary text-white font-bold px-10 py-5 rounded-xl hover:bg-primary/90 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
//             >
//               Go to Order Page <ArrowRight className="h-5 w-5" />
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       {/* Progress Steps */}
//       <div className="bg-secondary py-6">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="flex items-center justify-between max-w-md mx-auto">
//             {[1, 2, 3, 4].map((step) => (
//               <div key={step} className="flex items-center flex-1">
//                 <div
//                   className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
//                     step === 4
//                       ? 'bg-primary text-white ring-2 ring-primary/30'
//                       : 'bg-gray-200 text-gray-600'
//                   }`}
//                 >
//                   {step}
//                 </div>
//                 {step < 4 && (
//                   <div className={`flex-1 h-1 mx-2 ${step < 4 ? 'bg-primary' : 'bg-gray-200'}`} />
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-between mt-4 text-xs md:text-sm font-medium text-center text-muted-foreground">
//             <span>Upload & Options</span>
//             <span>Delivery Details</span>
//             <span>Review Order</span>
//             <span className="font-bold text-foreground">Payment</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
//           {/* Payment Form Section */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
//               <div className="bg-secondary px-6 py-6">
//                 <h2 className="text-2xl font-black text-white flex items-center gap-3">
//                   <CreditCard className="h-7 w-7" />
//                   Secure Payment
//                 </h2>
//                 <p className="text-white/80 mt-2 text-lg">
//                   Pay ₹{grandTotal.toFixed(2)} securely with Razorpay
//                 </p>
//               </div>

//               <div className="p-6 md:p-8">
//                 {/* Amount Highlight */}
//                 <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-10 text-center border border-primary/20 shadow-inner">
//                   <p className="text-muted-foreground text-base mb-3">Total Amount Due</p>
//                   <p className="text-5xl md:text-6xl font-black text-primary tracking-tight">
//                     ₹{grandTotal.toFixed(2)}
//                   </p>
//                   <p className="text-sm text-muted-foreground mt-4">
//                     Inclusive of GST • {deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup'}
//                   </p>
//                 </div>

//                 {/* Payment Options */}
//                 <div className="space-y-8">
//                   <div>
//                     <h3 className="text-xl font-bold text-foreground mb-5">Select Payment Method</h3>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                       {['UPI', 'Credit / Debit Card', 'Net Banking', 'Wallets', 'EMI', 'Cash on Delivery'].map(
//                         (method) => (
//                           <button
//                             key={method}
//                             className="p-5 border-2 border-border rounded-xl text-center hover:border-primary hover:bg-primary/5 transition-all duration-300 group shadow-sm hover:shadow-md"
//                           >
//                             <div className="text-3xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
//                               {method.includes('UPI') ? 'UPI' : method.includes('Card') ? '💳' : method.includes('Net') ? '🏦' : '💰'}
//                             </div>
//                             <span className="text-base font-semibold group-hover:text-primary transition-colors">
//                               {method}
//                             </span>
//                           </button>
//                         )
//                       )}
//                     </div>
//                   </div>

//                   {/* UPI – Most Popular */}
//                   <div className="bg-muted/40 rounded-2xl p-7 border border-border">
//                     <h4 className="font-bold text-xl text-foreground mb-4 flex items-center gap-3">
//                       <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
//                         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
//                         <path d="M13.5 7h-3v2H9v2h1.5v6h3v-6H15v-2h-1.5z" />
//                       </svg>
//                       Quick UPI Payment
//                     </h4>

//                     <input
//                       type="text"
//                       placeholder="yourname@upi"
//                       className="w-full px-5 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg mb-6"
//                     />

//                     <button
//                       onClick={handlePayNow}
//                       className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] text-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
//                     >
//                       Pay ₹{grandTotal.toFixed(2)} Now <CheckCircle className="h-6 w-6" />
//                     </button>
//                   </div>

//                   {/* Demo Notice */}
//                   <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
//                     <Info className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
//                     <p className="text-base text-amber-800">
//                       This is a demo payment interface. In production, clicking "Pay Now" will open the real Razorpay checkout window.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Back Navigation */}
//             <div className="flex gap-4">
//               <button
//                 onClick={() => navigate(-1)} // or '/order/review'
//                 className="flex-1 border-2 border-border text-foreground font-semibold py-5 rounded-xl hover:bg-muted transition-all duration-200 flex items-center justify-center gap-3 text-lg"
//               >
//                 <ArrowLeft className="h-5 w-5" /> Back to Review
//               </button>
//             </div>
//           </div>

//           {/* Order Summary Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-2xl border border-border sticky top-6 overflow-hidden">
//               <div className="bg-secondary px-6 py-6">
//                 <h3 className="text-xl font-black text-white flex items-center gap-3">
//                   <Package className="h-6 w-6" />
//                   Order Summary
//                 </h3>
//               </div>

//               <div className="p-6 space-y-5 text-base">
//                 <div className="flex justify-between text-muted-foreground">
//                   <span>Items in Cart</span>
//                   <span className="font-semibold text-foreground">{items.length}</span>
//                 </div>

//                 <div className="flex justify-between text-muted-foreground">
//                   <span>Delivery Method</span>
//                   <span className="font-semibold text-foreground">
//                     {deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup'}
//                   </span>
//                 </div>

//                 <div className="border-t border-border pt-5 mt-2 space-y-4">
//                   <div className="flex justify-between text-muted-foreground">
//                     <span>Subtotal</span>
//                     <span>₹{subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-muted-foreground">
//                     <span>GST (5%)</span>
//                     <span>₹{gst.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-muted-foreground">
//                     <span>Shipping</span>
//                     <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
//                       {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-2xl font-black pt-4 border-t">
//                     <span className="text-foreground">Total Payable</span>
//                     <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <div className="pt-6 text-sm text-muted-foreground text-center space-y-3">
//                   <div className="flex items-center justify-center gap-2">
//                     <Shield className="h-5 w-5 text-primary" />
//                     <span>100% Secure & Encrypted Payment</span>
//                   </div>
//                   <div className="flex items-center justify-center gap-2">
//                     <Truck className="h-5 w-5 text-primary" />
//                     <span>Pan-India Delivery • Official GST Invoice</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }














// // src/pages/order/PaymentPage.tsx
// import { Link, useNavigate } from 'react-router-dom';
// import { useCartStore } from '@/store/cartStore';
// import {
//   CreditCard,
//   IndianRupee,
//   ArrowLeft,
//   CheckCircle,
//   Info,
//   Shield,
//   Truck,
//   Package,
//   AlertCircle,
//   ArrowRight,
// } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// export default function PaymentPage() {
//   const navigate = useNavigate();

//   // Real cart data
//   const realItems = useCartStore((state) => state.items);
//   const realSubtotal = useCartStore((state) => state.subtotal());

//   // Use real data if available, otherwise fallback to dummy
//   const useDummy = realItems.length === 0;

//   const items = useDummy ? [
//     {
//       id: 'dummy-1',
//       title: 'Black & White Book Printing (A4)',
//       pages: 280,
//       copies: 5,
//       calculatedPrice: { grandTotal: 420 },
//       paperSize: 'A4',
//       printColor: 'bw',
//       printSide: 'double',
//       bindingType: 'perfect_glue',
//     },
//     {
//       id: 'dummy-2',
//       title: 'Color Textbook with Glossy Cover (6×9)',
//       pages: 180,
//       copies: 3,
//       calculatedPrice: { grandTotal: 1150 },
//       paperSize: '6x9',
//       printColor: 'color',
//       printSide: 'double',
//       bindingType: 'hard_bound',
//     },
//   ] : realItems;

//   const subtotal = useDummy ? items.reduce((sum, item) => sum + (item.calculatedPrice?.grandTotal || 0) * item.copies, 0) : realSubtotal;

//   // Delivery type – hardcoded for demo (you can make dynamic later)
//   const deliveryType: 'pickup' | 'courier' = 'courier';

//   // Dummy personal info (shown only in dummy mode)
//   const name = useDummy ? 'Sushant Kumar' : '';
//   const phone = useDummy ? '+91 98765 43210' : '';

//   const gst = subtotal * 0.05;
//   const shipping = deliveryType === 'courier' ? 80 : 0;
//   const grandTotal = subtotal + gst + shipping;

//   const handlePayNow = () => {
//     alert(
//       `Processing payment of ₹${grandTotal.toFixed(2)} via Razorpay...\n\n` +
//       `Order ID: BP${Date.now().toString().slice(-8)}\n` +
//       (useDummy ? '(This is demo data – real payment would use actual order)' : '')
//     );
//     // Real Razorpay code can go here later
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       {/* Progress Steps */}
//       <section className="relative bg-secondary py-12 md:py-24">
//   <div className="absolute inset-0 opacity-5 pointer-events-none">
//     <div
//       className="absolute inset-0"
//       style={{
//         backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
//         backgroundSize: '20px 20px',
//       }}
//     />
//   </div>

//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
//     <div className="text-center">
//       <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
//         <CreditCard className="h-5 w-5 text-primary" />
//         Secure Payment
//       </div>
//       <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
//         Complete Your Payment
//       </h1>
//       <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto">
//         Review your order total and pay securely with Razorpay — your prints will be processed immediately after confirmation.
//       </p>
//     </div>
//   </div>
// </section>


//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         {useDummy && (
//           <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-center text-amber-800">
//             <Info className="h-5 w-5 inline mr-2" />
//             <strong>Demo Mode Active:</strong> Showing dummy order data (real cart is empty)
//           </div>
//         )}

//         <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
//           {/* Payment Section */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
//               <div className="bg-secondary px-6 py-6">
//                 <h2 className="text-2xl font-black text-white flex items-center gap-3">
//                   <CreditCard className="h-7 w-7" />
//                   Secure Payment
//                 </h2>
//                 <p className="text-white/80 mt-2 text-lg">
//                   Pay ₹{grandTotal.toFixed(2)} securely with Razorpay
//                 </p>
//               </div>

//               <div className="p-6 md:p-8">
//                 {/* Amount Highlight */}
//                 <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-10 text-center border border-primary/20 shadow-inner">
//                   <p className="text-muted-foreground text-base mb-3">Amount to Pay</p>
//                   <p className="text-5xl md:text-6xl font-black text-primary tracking-tight">
//                     ₹{grandTotal.toFixed(2)}
//                   </p>
//                   <p className="text-sm text-muted-foreground mt-4">
//                     Inclusive of GST • {deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup'}
//                   </p>
//                 </div>

//                 {/* Payment Methods */}
//                 <div className="space-y-8">
//                   <div>
//                     <h3 className="text-xl font-bold text-foreground mb-5">Select Payment Method</h3>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                       {['UPI', 'Credit / Debit Card', 'Net Banking', 'Wallets', 'EMI', 'Cash on Delivery'].map(
//                         (method) => (
//                           <button
//                             key={method}
//                             className="p-5 border-2 border-border rounded-xl text-center hover:border-primary hover:bg-primary/5 transition-all duration-300 group shadow-sm hover:shadow-md"
//                           >
//                             <div className="text-3xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
//                               {method.includes('UPI') ? 'UPI' : method.includes('Card') ? '💳' : method.includes('Net') ? '🏦' : '💰'}
//                             </div>
//                             <span className="text-base font-semibold group-hover:text-primary transition-colors">
//                               {method}
//                             </span>
//                           </button>
//                         )
//                       )}
//                     </div>
//                   </div>

//                   {/* UPI Quick Pay */}
//                   <div className="bg-muted/40 rounded-2xl p-7 border border-border">
//                     <h4 className="font-bold text-xl text-foreground mb-4 flex items-center gap-3">
//                       <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
//                         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
//                         <path d="M13.5 7h-3v2H9v2h1.5v6h3v-6H15v-2h-1.5z" />
//                       </svg>
//                       Quick UPI Payment
//                     </h4>

//                     <input
//                       type="text"
//                       placeholder="yourname@upi"
//                       className="w-full px-5 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg mb-6"
//                     />

//                     <button
//                       onClick={handlePayNow}
//                       className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] text-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
//                     >
//                       Pay ₹{grandTotal.toFixed(2)} Now <CheckCircle className="h-6 w-6" />
//                     </button>
//                   </div>

//                   {/* Demo Notice */}
//                   <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
//                     <Info className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
//                     <p className="text-base text-amber-800">
//                       This is a demo payment interface. In production, clicking "Pay Now" will open the real Razorpay checkout window.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Back Navigation */}
//             <div className="flex gap-4">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="flex-1 border-2 border-border text-foreground font-semibold py-5 rounded-xl hover:bg-muted transition-all duration-200 flex items-center justify-center gap-3 text-lg"
//               >
//                 <ArrowLeft className="h-5 w-5" /> Back to Review
//               </button>
//             </div>
//           </div>

//           {/* Order Summary Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-2xl border border-border sticky top-6 overflow-hidden">
//               <div className="bg-secondary px-6 py-6">
//                 <h3 className="text-xl font-black text-white flex items-center gap-3">
//                   <Package className="h-6 w-6" />
//                   Order Summary
//                 </h3>
//               </div>

//               <div className="p-6 space-y-5 text-base">
//                 <div className="flex justify-between text-muted-foreground">
//                   <span>Items in Order</span>
//                   <span className="font-semibold text-foreground">{items.length}</span>
//                 </div>

//                 <div className="flex justify-between text-muted-foreground">
//                   <span>Name</span>
//                   <span className="font-medium truncate max-w-[60%]">{name || '—'}</span>
//                 </div>

//                 <div className="flex justify-between text-muted-foreground">
//                   <span>Phone</span>
//                   <span className="font-medium">{phone || '—'}</span>
//                 </div>

//                 <div className="flex justify-between text-muted-foreground">
//                   <span>Delivery</span>
//                   <span className="font-medium">
//                     {deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup'}
//                   </span>
//                 </div>

//                 <div className="border-t border-border pt-5 mt-2 space-y-4">
//                   <div className="flex justify-between text-muted-foreground">
//                     <span>Subtotal</span>
//                     <span>₹{subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-muted-foreground">
//                     <span>GST (5%)</span>
//                     <span>₹{gst.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-muted-foreground">
//                     <span>Shipping</span>
//                     <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
//                       {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-2xl font-black pt-4 border-t">
//                     <span className="text-foreground">Total Payable</span>
//                     <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <div className="pt-6 text-sm text-muted-foreground text-center space-y-3">
//                   <div className="flex items-center justify-center gap-2">
//                     <Shield className="h-5 w-5 text-primary" />
//                     <span>100% Secure & Encrypted Payment</span>
//                   </div>
//                   <div className="flex items-center justify-center gap-2">
//                     <Truck className="h-5 w-5 text-primary" />
//                     <span>Pan-India Delivery • Official GST Invoice</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }





// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { RazorpayButton } from '../components/RazorpayButton';
// import { PaymentStatus } from '../components/PaymentStatus';
// import { usePayment } from '../hooks/usePayment';

// interface CheckoutPageProps {
//     orderId?: string;
//     amount?: number;
//     orderNumber?: string;
// }

// const PaymentPage: React.FC<CheckoutPageProps> = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const [orderData, setOrderData] = useState<{
//         orderId: string;
//         amount: number;
//         orderNumber?: string;
//     }>({
//         orderId: '',
//         amount: 0,
//         orderNumber: ''
//     });
    
//     const [paymentCompleted, setPaymentCompleted] = useState(false);
//     const { paymentStatus, paymentDetails, getPaymentStatus, resetPaymentState } = usePayment();

//     useEffect(() => {
//         // Get data from location state
//         const state = location.state as CheckoutPageProps;
        
//         console.log('CheckoutPage - Location state:', state);
        
//         if (state && state.orderId && state.amount) {
//             setOrderData({
//                 orderId: state.orderId,
//                 amount: state.amount,
//                 orderNumber: state.orderNumber
//             });
//             setLoading(false);
//         } else {
//             // Try to get from localStorage if not in state
//             // const savedOrder = localStorage.getItem('pendingOrder');
//             // if (savedOrder) {
//             //     const parsedOrder = JSON.parse(savedOrder);
//             //     if (parsedOrder.orderId && parsedOrder.amount) {
//             //         setOrderData(parsedOrder);
//             //         setLoading(false);
//             //         return;
//             //     }
//             // }

//             if (state && state.orderId && state.amount) {
//     setOrderData({
//         orderId: state.orderId,
//         amount: state.amount,
//         orderNumber: state.orderNumber
//     });
//     setLoading(false);
// } else {
//     console.error('❌ No order data found');
//     navigate('/cart', { replace: true });
// }
            
//             // No order data, redirect to cart
//             console.error('No order data found');
//             navigate('/cart', { 
//                 replace: true,
//                 state: { error: 'No payment information found. Please try again.' }
//             });
//         }
//     }, [location, navigate]);





//     useEffect(() => {
//     if (!orderData.orderId) return;

//     const checkStatus = async () => {
//         try {
//             const res = await getPaymentStatus(orderData.orderId);

//             // 👉 ONLY proceed if payment exists
//             if (!res) {
//                 console.log("Payment not created yet");
//                 return;
//             }

//             console.log("Payment status:", res.payment.status);
//         } catch (error) {
//             console.log("Status check skipped");
//         }
//     };

//     // 👉 delay to allow backend payment creation
//     const timer = setTimeout(checkStatus, 3000);

//     return () => clearTimeout(timer);

// }, [orderData.orderId]);

// //     useEffect(() => {
// //     // if (!orderData.orderId) return; // ✅ IMPORTANT FIX
// // if (!orderData.orderId || orderData.orderId.length < 10) return;
// //     const checkStatus = async () => {
// //         try {
// //             await getPaymentStatus(orderData.orderId);
// //         } catch (error) {
// //             console.error("Error checking payment status:", error);
// //         }
// //     };

// //     checkStatus();
// // }, [orderData.orderId]);

//     // useEffect(() => {
//     //     // Check payment status if we have orderId
//     //     if (orderData.orderId) {
//     //         const checkStatus = async () => {
//     //             try {
//     //                 await getPaymentStatus(orderData.orderId);
//     //             } catch (error) {
//     //                 console.error('Error checking payment status:', error);
//     //             }
//     //         };
//     //         checkStatus();
//     //     }
//     // }, [orderData.orderId, getPaymentStatus]);

//     const handlePaymentSuccess = (paymentId: string, orderId: string) => {
//         setPaymentCompleted(true);
//         console.log('Payment successful:', { paymentId, orderId });
//         // Clear pending order from localStorage
//         localStorage.removeItem('pendingOrder');
//     };

//     const handlePaymentError = (error: any) => {
//         console.error('Payment error:', error);
//     };

//     const handleRetry = () => {
//         resetPaymentState();
//         setPaymentCompleted(false);
//     };

//     const handleContactSupport = () => {
//         navigate('/contact');
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">Loading payment details...</p>
//                 </div>
//             </div>
//         );
//     }

//     const { orderId, amount, orderNumber } = orderData;

//     // Determine if payment is already completed
//     const isPaymentCompleted = paymentStatus === 'paid' || paymentCompleted;
    
//     // Determine if payment button should be shown
//     const shouldShowPaymentButton = !isPaymentCompleted && (
//         !paymentStatus || 
//         paymentStatus === 'created' || 
//         paymentStatus === 'attempted' || 
//         paymentStatus === 'failed'
//     );
    
//     // Determine if payment status should be shown
//     const shouldShowPaymentStatus = paymentStatus && paymentStatus !== 'paid';

//     if (isPaymentCompleted) {
//         return (
//             <div className="max-w-md mx-auto mt-10">
//                 <PaymentStatus
//                     status="paid"
//                     amount={amount}
//                     paymentId={paymentDetails?.razorpayPaymentId}
//                     orderNumber={orderNumber}
//                 />
//                 <div className="mt-6 text-center">
//                     <button
//                         onClick={() => navigate('/history')}
//                         className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                     >
//                         View My Orders
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-md mx-auto mt-10 px-4">
//                 <div className="bg-white rounded-lg shadow-lg p-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>
                    
//                     <div className="mb-6">
//                         <div className="border-b pb-4 mb-4">
//                             <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
//                             <div className="mt-2 space-y-2">
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Order Number:</span>
//                                     <span className="font-medium">{orderNumber || 'N/A'}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Total Amount:</span>
//                                     <span className="text-xl font-bold text-purple-600">
//                                         ₹{amount.toFixed(2)}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         {shouldShowPaymentStatus && (
//                             <div className="mb-6">
//                                 <PaymentStatus
//                                     status={paymentStatus}
//                                     amount={amount}
//                                     paymentId={paymentDetails?.razorpayPaymentId}
//                                     orderNumber={orderNumber}
//                                     onRetry={handleRetry}
//                                     onContactSupport={handleContactSupport}
//                                 />
//                             </div>
//                         )}

//                         {shouldShowPaymentButton && (
//                             <div className="mt-6">
//                                 <RazorpayButton
//                                     orderId={orderId}
//                                     amount={amount}
//                                     onSuccess={handlePaymentSuccess}
//                                     onError={handlePaymentError}
//                                     buttonText="Pay with Razorpay"
//                                 />
//                             </div>
//                         )}

//                         <div className="mt-4 text-center text-sm text-gray-500">
//                             <p>Secure payment powered by Razorpay</p>
//                             <p className="mt-1">All major credit/debit cards, UPI, and net banking accepted</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;






// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { RazorpayButton } from '../components/RazorpayButton';
// import { PaymentStatus } from '../components/PaymentStatus';
// import { usePayment } from '../hooks/usePayment';
// import { toast } from 'sonner';

// interface CheckoutPageProps {
//     orderId?: string;
//     amount?: number;
//     orderNumber?: string;
// }

// const PaymentPage: React.FC<CheckoutPageProps> = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const [orderData, setOrderData] = useState<{
//         orderId: string;
//         amount: number;
//         orderNumber?: string;
//     }>({
//         orderId: '',
//         amount: 0,
//         orderNumber: ''
//     });
    
//     const [paymentCompleted, setPaymentCompleted] = useState(false);
//     const { paymentStatus, paymentDetails, getPaymentStatus, resetPaymentState } = usePayment();

//     // Get order data from location state or localStorage
//     useEffect(() => {
//         const state = location.state as CheckoutPageProps;
        
//         console.log('PaymentPage - Location state:', state);
        
//         if (state && state.orderId && state.amount) {
//             setOrderData({
//                 orderId: state.orderId,
//                 amount: state.amount,
//                 orderNumber: state.orderNumber
//             });
//             setLoading(false);
//         } else {
//             // Try to get from localStorage
//             const savedOrder = localStorage.getItem('pendingOrder');
//             if (savedOrder) {
//                 try {
//                     const parsedOrder = JSON.parse(savedOrder);
//                     if (parsedOrder.orderId && parsedOrder.amount) {
//                         setOrderData(parsedOrder);
//                         setLoading(false);
//                         return;
//                     }
//                 } catch (e) {
//                     console.error('Error parsing saved order:', e);
//                 }
//             }
            
//             // No order data, redirect to cart
//             console.error('❌ No order data found');
//             toast.error('No payment information found. Please try again.');
//             navigate('/cart', { replace: true });
//         }
//     }, [location, navigate]);

//     // Check payment status periodically
//     useEffect(() => {
//         // if (!orderData.orderId) return;

//         let isMounted = true;
//         let intervalId: NodeJS.Timeout;

//         const checkStatus = async () => {
//             try {
//                 const res = await getPaymentStatus(orderData.orderId);
                
//                 if (!isMounted) return;
                
//                 if (res && res.success && res.payment.status === 'paid') {
//                     console.log('✅ Payment is paid!');
//                     setPaymentCompleted(true);
//                     localStorage.removeItem('pendingOrder');
                    
//                     // Show success message
//                     toast.success('Payment successful!');
                    
//                     // Auto redirect after 2 seconds
//                     setTimeout(() => {
//                         if (isMounted) {
//                             navigate('/history');
//                         }
//                     }, 2000);
//                 } else if (res && res.success && res.payment.status === 'failed') {
//                     console.log('❌ Payment failed');
//                     toast.error('Payment failed. Please try again.');
//                 } else if (!res) {
//                     // Payment not created yet - this is normal
//                     console.log('⏳ Waiting for payment creation...');
//                 }
//             } catch (error) {
//                 console.error('Error checking payment status:', error);
//             }
//         };

//         // Check immediately
//         checkStatus();
        
//         // Then check every 3 seconds
//         // intervalId = setInterval(checkStatus, 3000);
        
//         return () => {
//             isMounted = false;
//             if (intervalId) clearInterval(intervalId);
//         };
//     }, [orderData.orderId, getPaymentStatus, navigate]);

//     const handlePaymentSuccess = (paymentId: string, orderId: string) => {
//         console.log('Payment successful:', { paymentId, orderId });
        
//         // Clear pending order from localStorage
//         localStorage.removeItem('pendingOrder');
        
//         // Show success message
//         toast.success('Payment successful! Redirecting...');
        
//         // Set payment completed
//         setPaymentCompleted(true);
        
//         // Auto redirect after 2 seconds
//         setTimeout(() => {
//             navigate('/history');
//         }, 2000);
//     };

//     const handlePaymentError = (error: any) => {
//         console.error('Payment error:', error);
//         toast.error('Payment failed. Please try again.');
//     };

//     const handleRetry = () => {
//         resetPaymentState();
//         setPaymentCompleted(false);
//     };

//     const handleContactSupport = () => {
//         navigate('/contact');
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">Loading payment details...</p>
//                 </div>
//             </div>
//         );
//     }

//     const { orderId, amount, orderNumber } = orderData;

//     // Determine if payment is already completed
//     const isPaymentCompleted = paymentStatus === 'paid' || paymentCompleted;
    
//     // Determine if payment button should be shown
//     const shouldShowPaymentButton = !isPaymentCompleted && (
//         !paymentStatus || 
//         paymentStatus === 'created' || 
//         paymentStatus === 'attempted' || 
//         paymentStatus === 'failed'
//     );
    
//     // Determine if payment status should be shown
//     const shouldShowPaymentStatus = paymentStatus && paymentStatus !== 'paid' && !paymentCompleted;

//     if (isPaymentCompleted) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-10">
//                 <div className="max-w-md mx-auto">
//                     <PaymentStatus
//                         status="paid"
//                         amount={amount}
//                         paymentId={paymentDetails?.razorpayPaymentId}
//                         orderNumber={orderNumber}
//                     />
//                     <div className="mt-6 text-center flex gap-4 justify-center">
//                         <button
//                             onClick={() => navigate('/history')}
//                             className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                         >
//                             View My Orders
//                         </button>
//                         <button
//                             onClick={() => navigate('/order')}
//                             className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
//                         >
//                             Place New Order
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-md mx-auto px-4">
//                 <div className="bg-white rounded-lg shadow-lg p-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>
                    
//                     <div className="mb-6">
//                         <div className="border-b pb-4 mb-4">
//                             <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
//                             <div className="mt-2 space-y-2">
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Order Number:</span>
//                                     <span className="font-medium">{orderNumber || 'N/A'}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Total Amount:</span>
//                                     <span className="text-xl font-bold text-purple-600">
//                                         ₹{amount.toFixed(2)}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         {shouldShowPaymentStatus && (
//                             <div className="mb-6">
//                                 <PaymentStatus
//                                     status={paymentStatus as any}
//                                     amount={amount}
//                                     paymentId={paymentDetails?.razorpayPaymentId}
//                                     orderNumber={orderNumber}
//                                     onRetry={handleRetry}
//                                     onContactSupport={handleContactSupport}
//                                 />
//                             </div>
//                         )}

//                         {shouldShowPaymentButton && (
//                             <div className="mt-6">
//                                 <RazorpayButton
//                                     orderId={orderId}
//                                     amount={amount}
//                                     onSuccess={handlePaymentSuccess}
//                                     onError={handlePaymentError}
//                                     buttonText="Pay with Razorpay"
//                                 />
//                             </div>
//                         )}

//                         <div className="mt-4 text-center text-sm text-gray-500">
//                             <p>Secure payment powered by Razorpay</p>
//                             <p className="mt-1">All major credit/debit cards, UPI, and net banking accepted</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;




// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { RazorpayButton } from '../components/RazorpayButton';
// import { PaymentStatus } from '../components/PaymentStatus';
// import { usePayment } from '../hooks/usePayment';
// import { toast } from 'sonner';
// import { createShipment } from "../api/shippingApi";

// interface CheckoutPageProps {
//     orderId?: string;
//     amount?: number;
//     orderNumber?: string;
// }

// const PaymentPage: React.FC<CheckoutPageProps> = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const [orderData, setOrderData] = useState<{
//         orderId: string;
//         amount: number;
//         orderNumber?: string;
//     }>({
//         orderId: '',
//         amount: 0,
//         orderNumber: ''
//     });
    
//     const [paymentCompleted, setPaymentCompleted] = useState(false);
//     const [paymentInitiated, setPaymentInitiated] = useState(false); // ✅ Track if payment was initiated
//     const statusCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
    
//     const { paymentStatus, paymentDetails, getPaymentStatus, resetPaymentState } = usePayment();

//     // Get order data from location state or localStorage
//     useEffect(() => {
//         const state = location.state as CheckoutPageProps;
        
//         console.log('PaymentPage - Location state:', state);
        
//         if (state && state.orderId && state.amount) {
//             setOrderData({
//                 orderId: state.orderId,
//                 amount: state.amount,
//                 orderNumber: state.orderNumber
//             });
//             setLoading(false);
//         } else {
//             // Try to get from localStorage
//             const savedOrder = localStorage.getItem('pendingOrder');
//             if (savedOrder) {
//                 try {
//                     const parsedOrder = JSON.parse(savedOrder);
//                     if (parsedOrder.orderId && parsedOrder.amount) {
//                         setOrderData(parsedOrder);
//                         setLoading(false);
//                         return;
//                     }
//                 } catch (e) {
//                     console.error('Error parsing saved order:', e);
//                 }
//             }
            
//             // No order data, redirect to cart
//             console.error('❌ No order data found');
//             toast.error('No payment information found. Please try again.');
//             navigate('/cart', { replace: true });
//         }
//     }, [location, navigate]);

//     // ✅ ONLY check payment status AFTER payment has been initiated
//     useEffect(() => {
//         if (!orderData.orderId || !paymentInitiated) return;

//         let isMounted = true;

//         const checkStatus = async () => {
//             try {
//                 const res = await getPaymentStatus(orderData.orderId);
                
//                 if (!isMounted) return;
                
//                 if (res && res.success && res.payment.status === 'paid') {
//                     console.log('✅ Payment is paid!');
//                     setPaymentCompleted(true);
//                     localStorage.removeItem('pendingOrder');
                    
//                     // Stop checking once paid
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
                    
//                     toast.success('Payment successful!');
                    
//                     // Auto redirect after 2 seconds
//                     setTimeout(() => {
//                         if (isMounted) {
//                             navigate('/history');
//                         }
//                     }, 2000);
//                 } else if (res && res.success && res.payment.status === 'failed') {
//                     console.log('❌ Payment failed');
//                     toast.error('Payment failed. Please try again.');
                    
//                     // Stop checking if failed
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
//                 } else {
//                     console.log('⏳ Waiting for payment completion...');
//                 }
//             } catch (error) {
//                 console.error('Error checking payment status:', error);
//             }
//         };

//         // Start checking only after payment is initiated
//         // Check every 3 seconds
//         statusCheckIntervalRef.current = setInterval(checkStatus, 3000);
        
//         return () => {
//             isMounted = false;
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//                 statusCheckIntervalRef.current = null;
//             }
//         };
//     }, [orderData.orderId, paymentInitiated, getPaymentStatus, navigate]);

//     // Cleanup on unmount
//     useEffect(() => {
//         return () => {
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, []);

//     const handlePaymentSuccess = (paymentId: string, orderId: string) => {
//         console.log('Payment successful:', { paymentId, orderId });
        
//         // Clear pending order from localStorage
//         localStorage.removeItem('pendingOrder');
        
//         // Show success message
//         toast.success('Payment successful! Redirecting...');
        
//         // Set payment completed
//         setPaymentCompleted(true);
        
//         // Stop checking
//         if (statusCheckIntervalRef.current) {
//             clearInterval(statusCheckIntervalRef.current);
//             statusCheckIntervalRef.current = null;
//         }
        
//         // Auto redirect after 2 seconds
//         setTimeout(() => {
//             navigate('/history');
//         }, 2000);
//     };

//     const handlePaymentInitiated = () => {
//         // ✅ Mark that payment has been initiated - now we can start checking status
//         console.log('Payment initiated, starting status check...');
//         setPaymentInitiated(true);
//     };

//     const handlePaymentError = (error: any) => {
//         console.error('Payment error:', error);
//         toast.error('Payment failed. Please try again.');
//         setPaymentInitiated(false); // Reset on error
//     };

//     const handleRetry = () => {
//         resetPaymentState();
//         setPaymentCompleted(false);
//         setPaymentInitiated(false); // Reset payment initiated flag
//     };

//     const handleContactSupport = () => {
//         navigate('/contact');
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">Loading payment details...</p>
//                 </div>
//             </div>
//         );
//     }

//     const { orderId, amount, orderNumber } = orderData;

//     // Determine if payment is already completed
//     const isPaymentCompleted = paymentStatus === 'paid' || paymentCompleted;
    
//     // Determine if payment button should be shown
//     const shouldShowPaymentButton = !isPaymentCompleted && !paymentInitiated && (
//         !paymentStatus || 
//         paymentStatus === 'created' || 
//         paymentStatus === 'attempted' || 
//         paymentStatus === 'failed'
//     );
    
//     // Show waiting state after payment initiated but before completed
//     const shouldShowWaitingState = paymentInitiated && !isPaymentCompleted;
    
//     // Determine if payment status should be shown
//     const shouldShowPaymentStatus = paymentStatus && paymentStatus !== 'paid' && !paymentCompleted && !paymentInitiated;

//     if (isPaymentCompleted) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-10">
//                 <div className="max-w-md mx-auto">
//                     <PaymentStatus
//                         status="paid"
//                         amount={amount}
//                         paymentId={paymentDetails?.razorpayPaymentId}
//                         orderNumber={orderNumber}
//                     />
//                     <div className="mt-6 text-center flex gap-4 justify-center">
//                         <button
//                             onClick={() => navigate('/history')}
//                             className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                         >
//                             View My Orders
//                         </button>
//                         <button
//                             onClick={() => navigate('/order')}
//                             className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
//                         >
//                             Place New Order
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (shouldShowWaitingState) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-10">
//                 <div className="max-w-md mx-auto px-4">
//                     <div className="bg-white rounded-lg shadow-lg p-6 text-center">
//                         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-2">Processing Payment</h3>
//                         <p className="text-gray-600 mb-4">
//                             Please complete the payment in the Razorpay window.
//                         </p>
//                         <p className="text-sm text-gray-500">
//                             Waiting for payment confirmation...
//                         </p>
//                         <button
//                             onClick={handleRetry}
//                             className="mt-6 text-purple-600 hover:text-purple-700 text-sm"
//                         >
//                             Cancel and try again
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-md mx-auto px-4">
//                 <div className="bg-white rounded-lg shadow-lg p-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>
                    
//                     <div className="mb-6">
//                         <div className="border-b pb-4 mb-4">
//                             <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
//                             <div className="mt-2 space-y-2">
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Order Number:</span>
//                                     <span className="font-medium">{orderNumber || 'N/A'}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Total Amount:</span>
//                                     <span className="text-xl font-bold text-purple-600">
//                                         ₹{amount.toFixed(2)}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         {shouldShowPaymentStatus && (
//                             <div className="mb-6">
//                                 <PaymentStatus
//                                     status={paymentStatus as any}
//                                     amount={amount}
//                                     paymentId={paymentDetails?.razorpayPaymentId}
//                                     orderNumber={orderNumber}
//                                     onRetry={handleRetry}
//                                     onContactSupport={handleContactSupport}
//                                 />
//                             </div>
//                         )}

//                         {shouldShowPaymentButton && (
//                             <div className="mt-6">
//                                 <RazorpayButton
//                                     orderId={orderId}
//                                     amount={amount}
//                                     onSuccess={handlePaymentSuccess}
//                                     onError={handlePaymentError}
//                                     onPaymentInitiated={handlePaymentInitiated}
//                                     buttonText="Pay with Razorpay"
//                                 />
//                             </div>
//                         )}

//                         <div className="mt-4 text-center text-sm text-gray-500">
//                             <p>Secure payment powered by Razorpay</p>
//                             <p className="mt-1">All major credit/debit cards, UPI, and net banking accepted</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;




// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { RazorpayButton } from '../components/RazorpayButton';
// import { PaymentStatus } from '../components/PaymentStatus';
// import { usePayment } from '../hooks/usePayment';
// import { toast } from 'sonner';
// import apiClient from "../api/apiClient";

// interface CheckoutPageProps {
//     orderId?: string;
//     amount?: number;
//     orderNumber?: string;
// }

// const PaymentPage: React.FC<CheckoutPageProps> = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(true);
//     const [orderData, setOrderData] = useState({
//         orderId: '',
//         amount: 0,
//         orderNumber: ''
//     });

//     const [paymentCompleted, setPaymentCompleted] = useState(false);
//     const [paymentInitiated, setPaymentInitiated] = useState(false);

//     const statusCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

//     const { paymentStatus, paymentDetails, getPaymentStatus, resetPaymentState } = usePayment();

//     // ✅ Get order data (NO localStorage)
//     useEffect(() => {
//         const state = location.state as CheckoutPageProps;

//         if (state?.orderId && state?.amount) {
//             setOrderData({
//                 orderId: state.orderId,
//                 amount: state.amount,
//                 orderNumber: state.orderNumber || ''
//             });
//             setLoading(false);
//         } else {
//             toast.error('Session expired. Please try again.');
//             navigate('/cart', { replace: true });
//         }
//     }, [location, navigate]);

//     // ✅ Payment Status Polling
//     useEffect(() => {
//         if (!orderData.orderId || !paymentInitiated) return;

//         let isMounted = true;

//         const checkStatus = async () => {
//             try {
//                 const res = await getPaymentStatus(orderData.orderId);

//                 if (!isMounted) return;

//                 if (res?.success && res.payment.status === 'paid') {
//                     setPaymentCompleted(true);

//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }

//                     toast.success('Payment successful!');

//                     setTimeout(() => {
//                         if (isMounted) navigate('/history');
//                     }, 2000);
//                 }

//                 if (res?.success && res.payment.status === 'failed') {
//                     toast.error('Payment failed');

//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
//                 }

//             } catch (error) {
//                 console.error('Status check error:', error);
//             }
//         };

//         statusCheckIntervalRef.current = setInterval(checkStatus, 3000);

//         return () => {
//             isMounted = false;
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, [orderData.orderId, paymentInitiated, getPaymentStatus, navigate]);

//     // ✅ Cleanup
//     useEffect(() => {
//         return () => {
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, []);

//     // ✅ PRODUCTION PAYMENT SUCCESS
// const handlePaymentSuccess = async (response: any) => {
//     try {
//         console.log("Razorpay Response:", response);

//         await apiClient.post('/payment/verify-payment', {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature
//         });

//         toast.success('Payment verified & order confirmed!');

//         setPaymentCompleted(true);

//         if (statusCheckIntervalRef.current) {
//             clearInterval(statusCheckIntervalRef.current);
//             statusCheckIntervalRef.current = null;
//         }

//         setTimeout(() => {
//             navigate('/history');
//         }, 2000);

//     } catch (error) {
//         console.error("Verification failed:", error);
//         toast.error("Payment verification failed!");
//     }
// };

//     const handlePaymentInitiated = () => {
//         setPaymentInitiated(true);
//     };

//     const handlePaymentError = () => {
//         toast.error('Payment failed. Try again.');
//         setPaymentInitiated(false);
//     };

//     const handleRetry = () => {
//         resetPaymentState();
//         setPaymentCompleted(false);
//         setPaymentInitiated(false);
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin h-12 w-12 border-b-2 border-purple-600 rounded-full"></div>
//             </div>
//         );
//     }

//     const { orderId, amount, orderNumber } = orderData;

//     const isPaymentCompleted = paymentStatus === 'paid' || paymentCompleted;

//     const shouldShowPaymentButton =
//         !isPaymentCompleted &&
//         !paymentInitiated &&
//         (!paymentStatus ||
//             paymentStatus === 'created' ||
//             paymentStatus === 'attempted' ||
//             paymentStatus === 'failed');

//     const shouldShowWaitingState = paymentInitiated && !isPaymentCompleted;

//     const shouldShowPaymentStatus =
//         paymentStatus && paymentStatus !== 'paid' && !paymentCompleted && !paymentInitiated;

//     // ✅ SUCCESS UI
//     if (isPaymentCompleted) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-10">
//                 <div className="max-w-md mx-auto">
//                     <PaymentStatus
//                         status="paid"
//                         amount={amount}
//                         paymentId={paymentDetails?.razorpayPaymentId}
//                         orderNumber={orderNumber}
//                     />

//                     <div className="mt-6 flex gap-4 justify-center">
//                         <button
//                             onClick={() => navigate('/history')}
//                             className="px-6 py-3 bg-purple-600 text-white rounded-lg"
//                         >
//                             View Orders
//                         </button>

//                         <button
//                             onClick={() => navigate('/order')}
//                             className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg"
//                         >
//                             New Order
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // ✅ WAITING UI
//     if (shouldShowWaitingState) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin h-16 w-16 border-b-2 border-purple-600 rounded-full mx-auto"></div>
//                     <p className="mt-4">Waiting for payment confirmation...</p>

//                     <button
//                         onClick={handleRetry}
//                         className="mt-4 text-purple-600"
//                     >
//                         Cancel & Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // ✅ MAIN UI
//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">

//                 <h2 className="text-2xl font-bold mb-6">Checkout</h2>

//                 <div className="mb-6">
//                     <p><strong>Order:</strong> {orderNumber || 'N/A'}</p>
//                     <p className="text-xl font-bold text-purple-600">₹{amount.toFixed(2)}</p>
//                 </div>

//                 {shouldShowPaymentStatus && (
//                     <PaymentStatus
//                         status={paymentStatus as any}
//                         amount={amount}
//                         paymentId={paymentDetails?.razorpayPaymentId}
//                         orderNumber={orderNumber}
//                         onRetry={handleRetry}
//                     />
//                 )}

//                 {shouldShowPaymentButton && (
//                     <RazorpayButton
//                         orderId={orderId}
//                         amount={amount}
//                         onSuccess={handlePaymentSuccess}
//                         onError={handlePaymentError}
//                         onPaymentInitiated={handlePaymentInitiated}
//                         buttonText="Pay Now"
//                     />
//                 )}

//                 <p className="text-sm text-center text-gray-500 mt-4">
//                     Secure payment powered by Razorpay
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;




// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { RazorpayButton } from '../components/RazorpayButton';
// import { PaymentStatus } from '../components/PaymentStatus';
// import { usePayment } from '../hooks/usePayment';
// import { toast } from 'sonner';
// import apiClient from "../api/apiClient";
// import { Tag, Gift, ChevronDown, ChevronUp, X } from 'lucide-react';

// interface CheckoutPageProps {
//     orderId?: string;
//     amount?: number;
//     orderNumber?: string;
// }

// interface AppliedDiscount {
//     type: 'promo' | 'offer';
//     code?: string;
//     name: string;
//     discountAmount: number;
//     originalAmount: number;
//     finalAmount: number;
// }

// const PaymentPage: React.FC<CheckoutPageProps> = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(true);
//     const [orderData, setOrderData] = useState({
//         orderId: '',
//         amount: 0,
//         orderNumber: ''
//     });

//     const [paymentCompleted, setPaymentCompleted] = useState(false);
//     const [paymentInitiated, setPaymentInitiated] = useState(false);
    
//     // Promo Code States
//     const [promoCode, setPromoCode] = useState('');
//     const [appliedPromo, setAppliedPromo] = useState<any>(null);
//     const [promoLoading, setPromoLoading] = useState(false);
//     const [showPromoInput, setShowPromoInput] = useState(false);
    
//     // Offers States
//     const [availableOffers, setAvailableOffers] = useState<any[]>([]);
//     const [selectedOffer, setSelectedOffer] = useState<any>(null);
//     const [offerLoading, setOfferLoading] = useState(false);
//     const [showOffers, setShowOffers] = useState(false);
    
//     // Discount States
//     const [appliedDiscount, setAppliedDiscount] = useState<AppliedDiscount | null>(null);
//     const [finalAmount, setFinalAmount] = useState(0);

//     const statusCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
//     const { paymentStatus, paymentDetails, getPaymentStatus, resetPaymentState } = usePayment();

//     // Get order data
//     useEffect(() => {
//         const state = location.state as CheckoutPageProps;
//         if (state?.orderId && state?.amount) {
//             setOrderData({
//                 orderId: state.orderId,
//                 amount: state.amount,
//                 orderNumber: state.orderNumber || ''
//             });
//             setFinalAmount(state.amount);
//             setLoading(false);
            
//             // Fetch available offers
//             fetchAvailableOffers();
//         } else {
//             toast.error('Session expired. Please try again.');
//             navigate('/cart', { replace: true });
//         }
//     }, [location, navigate]);

//     // Fetch available offers
//     const fetchAvailableOffers = async () => {
//         try {
//             setOfferLoading(true);
//             const response = await apiClient.get('/offers/active');
//             if (response.data.success) {
//                 setAvailableOffers(response.data.data);
//             }
//         } catch (error) {
//             console.error('Failed to fetch offers:', error);
//         } finally {
//             setOfferLoading(false);
//         }
//     };

//     // Validate and apply promo code
//     const handleApplyPromo = async () => {
//         if (!promoCode.trim()) {
//             toast.error('Please enter a promo code');
//             return;
//         }

//         try {
//             setPromoLoading(true);
//             const response = await apiClient.post('/promo/validate', {
//                 code: promoCode,
//                 cartTotal: orderData.amount,
//                 userId: localStorage.getItem('userId') // Get from your auth context
//             });

//             if (response.data.success) {
//                 const discount = response.data.data.discount;
//                 const newFinalAmount = orderData.amount - discount;
                
//                 setAppliedPromo(response.data.data.promoCode);
//                 setAppliedDiscount({
//                     type: 'promo',
//                     code: promoCode,
//                     name: response.data.data.promoCode.code,
//                     discountAmount: discount,
//                     originalAmount: orderData.amount,
//                     finalAmount: newFinalAmount
//                 });
//                 setFinalAmount(newFinalAmount);
                
//                 toast.success(`Promo code applied! You saved ₹${discount}`);
//                 setPromoCode('');
//                 setShowPromoInput(false);
//             }
//         } catch (error: any) {
//             console.error('Promo validation error:', error);
//             toast.error(error.response?.data?.error || 'Invalid promo code');
//         } finally {
//             setPromoLoading(false);
//         }
//     };

//     // Apply offer
//     const handleApplyOffer = async (offer: any) => {
//         try {
//             // Get cart items from localStorage or context
//             const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
//             const userType = localStorage.getItem('userType') || 'regular';
            
//             const response = await apiClient.post('/offers/validate', {
//                 offerId: offer._id,
//                 cartTotal: orderData.amount,
//                 userType: userType,
//                 cartItems: cartItems
//             });

//             if (response.data.success) {
//                 const discount = response.data.data.discount;
//                 const newFinalAmount = orderData.amount - discount;
                
//                 setSelectedOffer(offer);
//                 setAppliedDiscount({
//                     type: 'offer',
//                     name: offer.title,
//                     discountAmount: discount,
//                     originalAmount: orderData.amount,
//                     finalAmount: newFinalAmount
//                 });
//                 setFinalAmount(newFinalAmount);
                
//                 toast.success(`Offer applied! You saved ₹${discount}`);
//                 setShowOffers(false);
//             }
//         } catch (error: any) {
//             console.error('Offer validation error:', error);
//             toast.error(error.response?.data?.error || 'Cannot apply this offer');
//         }
//     };

//     // Remove discount
//     const handleRemoveDiscount = () => {
//         setAppliedPromo(null);
//         setSelectedOffer(null);
//         setAppliedDiscount(null);
//         setFinalAmount(orderData.amount);
//         toast.info('Discount removed');
//     };

//     // Payment Status Polling
//     useEffect(() => {
//         if (!orderData.orderId || !paymentInitiated) return;

//         let isMounted = true;

//         const checkStatus = async () => {
//             try {
//                 const res = await getPaymentStatus(orderData.orderId);
//                 if (!isMounted) return;

//                 if (res?.success && res.payment.status === 'paid') {
//                     setPaymentCompleted(true);
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
//                     toast.success('Payment successful!');
//                     setTimeout(() => {
//                         if (isMounted) navigate('/history');
//                     }, 2000);
//                 }

//                 if (res?.success && res.payment.status === 'failed') {
//                     toast.error('Payment failed');
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
//                 }
//             } catch (error) {
//                 console.error('Status check error:', error);
//             }
//         };

//         statusCheckIntervalRef.current = setInterval(checkStatus, 3000);
//         return () => {
//             isMounted = false;
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, [orderData.orderId, paymentInitiated, getPaymentStatus, navigate]);

//     // Cleanup
//     useEffect(() => {
//         return () => {
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, []);

//     // Payment Success Handler
//     const handlePaymentSuccess = async (response: any) => {
//         try {
//             console.log("Razorpay Response:", response);

//             // Include discount info in payment verification
//             const paymentData: any = {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 finalAmount: finalAmount,
//                 discountApplied: appliedDiscount ? {
//                     type: appliedDiscount.type,
//                     code: appliedDiscount.code,
//                     name: appliedDiscount.name,
//                     amount: appliedDiscount.discountAmount
//                 } : null
//             };

//             await apiClient.post('/payment/verify-payment', paymentData);
//             toast.success('Payment verified & order confirmed!');
//             setPaymentCompleted(true);

//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//                 statusCheckIntervalRef.current = null;
//             }

//             setTimeout(() => {
//                 navigate('/history');
//             }, 2000);
//         } catch (error) {
//             console.error("Verification failed:", error);
//             toast.error("Payment verification failed!");
//         }
//     };

//     const handlePaymentInitiated = () => {
//         setPaymentInitiated(true);
//     };

//     const handlePaymentError = () => {
//         toast.error('Payment failed. Try again.');
//         setPaymentInitiated(false);
//     };

//     const handleRetry = () => {
//         resetPaymentState();
//         setPaymentCompleted(false);
//         setPaymentInitiated(false);
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin h-12 w-12 border-b-2 border-purple-600 rounded-full"></div>
//             </div>
//         );
//     }

//     const { orderId, amount, orderNumber } = orderData;
//     const isPaymentCompleted = paymentStatus === 'paid' || paymentCompleted;

//     // Success UI
//     if (isPaymentCompleted) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-10">
//                 <div className="max-w-md mx-auto">
//                     <PaymentStatus
//                         status="paid"
//                         amount={finalAmount}
//                         paymentId={paymentDetails?.razorpayPaymentId}
//                         orderNumber={orderNumber}
//                     />
//                     <div className="mt-6 flex gap-4 justify-center">
//                         <button
//                             onClick={() => navigate('/history')}
//                             className="px-6 py-3 bg-purple-600 text-white rounded-lg"
//                         >
//                             View Orders
//                         </button>
//                         <button
//                             onClick={() => navigate('/order')}
//                             className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg"
//                         >
//                             New Order
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Waiting UI
//     if (paymentInitiated && !isPaymentCompleted) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin h-16 w-16 border-b-2 border-purple-600 rounded-full mx-auto"></div>
//                     <p className="mt-4">Waiting for payment confirmation...</p>
//                     <button onClick={handleRetry} className="mt-4 text-purple-600">
//                         Cancel & Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Main Checkout UI
//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold mb-6">Checkout</h2>
                    
//                     {/* Order Details */}
//                     <div className="mb-6 space-y-2">
//                         <p className="text-gray-600">Order Number: <span className="font-semibold">{orderNumber || 'N/A'}</span></p>
//                         <div className="border-t pt-3">
//                             <div className="flex justify-between items-center">
//                                 <span className="text-gray-600">Subtotal:</span>
//                                 <span className="font-semibold">₹{amount.toFixed(2)}</span>
//                             </div>
                            
//                             {/* Applied Discount */}
//                             {appliedDiscount && (
//                                 <div className="flex justify-between items-center text-green-600 mt-2">
//                                     <span className="flex items-center gap-1">
//                                         <Tag className="h-4 w-4" />
//                                         Discount ({appliedDiscount.name}):
//                                     </span>
//                                     <span>- ₹{appliedDiscount.discountAmount.toFixed(2)}</span>
//                                 </div>
//                             )}
                            
//                             {/* Final Amount */}
//                             <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
//                                 <span className="text-lg font-bold">Total:</span>
//                                 <span className="text-2xl font-bold text-purple-600">
//                                     ₹{finalAmount.toFixed(2)}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Promo Code Section */}
//                     <div className="mb-4">
//                         {appliedDiscount?.type === 'promo' ? (
//                             <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex justify-between items-center">
//                                 <div className="flex items-center gap-2">
//                                     <Tag className="h-4 w-4 text-green-600" />
//                                     <span className="text-sm text-green-700">
//                                         Promo code applied: <strong>{appliedDiscount.code}</strong>
//                                     </span>
//                                 </div>
//                                 <button
//                                     onClick={handleRemoveDiscount}
//                                     className="text-green-600 hover:text-green-800"
//                                 >
//                                     <X className="h-4 w-4" />
//                                 </button>
//                             </div>
//                         ) : (
//                             <div>
//                                 {!showPromoInput ? (
//                                     <button
//                                         onClick={() => setShowPromoInput(true)}
//                                         className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 transition"
//                                     >
//                                         <Tag className="h-4 w-4" />
//                                         Have a promo code?
//                                     </button>
//                                 ) : (
//                                     <div className="space-y-2">
//                                         <div className="flex gap-2">
//                                             <input
//                                                 type="text"
//                                                 value={promoCode}
//                                                 onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
//                                                 placeholder="Enter promo code"
//                                                 className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                                 disabled={promoLoading}
//                                             />
//                                             <button
//                                                 onClick={handleApplyPromo}
//                                                 disabled={promoLoading}
//                                                 className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
//                                             >
//                                                 {promoLoading ? 'Applying...' : 'Apply'}
//                                             </button>
//                                         </div>
//                                         <button
//                                             onClick={() => setShowPromoInput(false)}
//                                             className="text-sm text-gray-500 hover:text-gray-700"
//                                         >
//                                             Cancel
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>

//                     {/* Offers Section */}
//                     {availableOffers.length > 0 && !appliedDiscount && (
//                         <div className="mb-6">
//                             <button
//                                 onClick={() => setShowOffers(!showOffers)}
//                                 className="w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg"
//                             >
//                                 <div className="flex items-center gap-2">
//                                     <Gift className="h-5 w-5 text-orange-600" />
//                                     <span className="font-medium">Available Offers</span>
//                                 </div>
//                                 {showOffers ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                             </button>
                            
//                             {showOffers && (
//                                 <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
//                                     {offerLoading ? (
//                                         <div className="text-center py-4">Loading offers...</div>
//                                     ) : (
//                                         availableOffers.map((offer) => (
//                                             <div
//                                                 key={offer._id}
//                                                 className="border rounded-lg p-3 hover:shadow-md transition cursor-pointer"
//                                                 onClick={() => handleApplyOffer(offer)}
//                                             >
//                                                 <div className="flex justify-between items-start">
//                                                     <div className="flex-1">
//                                                         <h4 className="font-semibold text-gray-800">{offer.title}</h4>
//                                                         <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
//                                                         <div className="flex gap-2 mt-2">
//                                                             <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
//                                                                 {offer.discountType === 'percentage' 
//                                                                     ? `${offer.discountValue}% OFF` 
//                                                                     : `₹${offer.discountValue} OFF`}
//                                                             </span>
//                                                             {offer.minPurchase > 0 && (
//                                                                 <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                                                                     Min. ₹{offer.minPurchase}
//                                                                 </span>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                     <button className="text-purple-600 text-sm font-medium">
//                                                         Apply
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* Payment Button */}
//                     {(!paymentStatus || paymentStatus === 'created' || paymentStatus === 'attempted' || paymentStatus === 'failed') && (
//                         <RazorpayButton
//                             orderId={orderId}
//                             amount={finalAmount}
//                             onSuccess={handlePaymentSuccess}
//                             onError={handlePaymentError}
//                             onPaymentInitiated={handlePaymentInitiated}
//                             buttonText={`Pay ₹${finalAmount.toFixed(2)}`}
//                         />
//                     )}

//                     {/* Payment Status Display */}
//                    {/* Payment Status Display */}
// {/* Payment Status Display */}
// {(() => {
//     // Don't show if no status
//     if (!paymentStatus) return null;
//     // Don't show if payment is completed

//     // Don't show if payment is initiated
//     if (paymentInitiated) return null;
    
//     return (
//         <div className="mt-4">
//             <PaymentStatus
//                 status={paymentStatus}
//                 amount={finalAmount}
//                 paymentId={paymentDetails?.razorpayPaymentId}
//                 orderNumber={orderNumber}
//                 onRetry={handleRetry}
//                 onContactSupport={() => {
//                     toast.info('Please contact support for assistance');
//                 }}
//             />
//         </div>
//     );
// })()}

//                     <p className="text-sm text-center text-gray-500 mt-4">
//                         Secure payment powered by Razorpay
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;










// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { RazorpayButton } from '../components/RazorpayButton';
// import { PaymentStatus } from '../components/PaymentStatus';
// import { usePayment } from '../hooks/usePayment';
// import { toast } from 'sonner';
// import apiClient from "../api/apiClient";
// import { Tag, Gift, ChevronDown, ChevronUp, X } from 'lucide-react';

// interface CheckoutPageProps {
//     orderId?: string;
//     amount?: number;
//     orderNumber?: string;
// }

// interface AppliedDiscount {
//     type: 'promo' | 'offer';
//     code?: string;
//     name: string;
//     discountAmount: number;
//     originalAmount: number;
//     finalAmount: number;
// }

// const PaymentPage: React.FC<CheckoutPageProps> = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(true);
//     const [orderData, setOrderData] = useState({
//         orderId: '',
//         amount: 0,
//         orderNumber: ''
//     });

//     const [paymentCompleted, setPaymentCompleted] = useState(false);
//     const [paymentInitiated, setPaymentInitiated] = useState(false);
    
//     // Promo Code States
//     const [promoCode, setPromoCode] = useState('');
//     const [appliedPromo, setAppliedPromo] = useState<any>(null);
//     const [promoLoading, setPromoLoading] = useState(false);
//     const [showPromoInput, setShowPromoInput] = useState(false);
    
//     // Offers States
//     const [availableOffers, setAvailableOffers] = useState<any[]>([]);
//     const [selectedOffer, setSelectedOffer] = useState<any>(null);
//     const [offerLoading, setOfferLoading] = useState(false);
//     const [showOffers, setShowOffers] = useState(false);
    
//     // Discount States
//     const [appliedDiscount, setAppliedDiscount] = useState<AppliedDiscount | null>(null);
//     const [finalAmount, setFinalAmount] = useState(0);

//     const statusCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
//     const { paymentStatus, paymentDetails, getPaymentStatus, resetPaymentState } = usePayment();

//     // Get order data
//     useEffect(() => {
//         const state = location.state as CheckoutPageProps;
//         if (state?.orderId && state?.amount) {
//             setOrderData({
//                 orderId: state.orderId,
//                 amount: state.amount,
//                 orderNumber: state.orderNumber || ''
//             });
//             setFinalAmount(state.amount);
//             setLoading(false);
            
//             // Fetch available offers
//             fetchAvailableOffers();
//         } else {
//             toast.error('Session expired. Please try again.');
//             navigate('/cart', { replace: true });
//         }
//     }, [location, navigate]);

//     // Fetch available offers
//     const fetchAvailableOffers = async () => {
//         try {
//             setOfferLoading(true);
//             const response = await apiClient.get('/offers/active');
//             if (response.data.success) {
//                 setAvailableOffers(response.data.data);
//             }
//         } catch (error) {
//             console.error('Failed to fetch offers:', error);
//         } finally {
//             setOfferLoading(false);
//         }
//     };

//     // Validate and apply promo code
//     const handleApplyPromo = async () => {
//         if (!promoCode.trim()) {
//             toast.error('Please enter a promo code');
//             return;
//         }

//         try {
//             setPromoLoading(true);
//             // FIXED: Changed from '/promo/validate' to '/promocode/validate'
//             const response = await apiClient.post('/promocode/validate', {
//                 code: promoCode,
//                 cartTotal: orderData.amount,
//                 userId: localStorage.getItem('userId')
//             });

//             console.log('Promo response:', response.data);

//             if (response.data.success) {
//                 const discount = response.data.data.discount;
//                 const newFinalAmount = orderData.amount - discount;
                
//                 setAppliedPromo(response.data.data.promoCode);
//                 setAppliedDiscount({
//                     type: 'promo',
//                     code: promoCode,
//                     name: response.data.data.promoCode.code,
//                     discountAmount: discount,
//                     originalAmount: orderData.amount,
//                     finalAmount: newFinalAmount
//                 });
//                 setFinalAmount(newFinalAmount);
                
//                 toast.success(`Promo code applied! You saved ₹${discount}`);
//                 setPromoCode('');
//                 setShowPromoInput(false);
//             } else {
//                 toast.error(response.data?.error || 'Invalid promo code');
//             }
//         } catch (error: any) {
//             console.error('Promo validation error:', error);
//             console.error('Error response:', error.response?.data);
            
//             // Handle specific error messages
//             if (error.response?.data?.error) {
//                 toast.error(error.response.data.error);
//             } else if (error.response?.data?.message) {
//                 toast.error(error.response.data.message);
//             } else {
//                 toast.error('Failed to apply promo code');
//             }
//         } finally {
//             setPromoLoading(false);
//         }
//     };

//     // Apply offer
//     const handleApplyOffer = async (offer: any) => {
//         try {
//             // Get cart items from localStorage or context
//             const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
//             const userType = localStorage.getItem('userType') || 'regular';
            
//             const response = await apiClient.post('/offers/validate', {
//                 offerId: offer._id,
//                 cartTotal: orderData.amount,
//                 userType: userType,
//                 cartItems: cartItems
//             });

//             if (response.data.success) {
//                 const discount = response.data.data.discount;
//                 const newFinalAmount = orderData.amount - discount;
                
//                 setSelectedOffer(offer);
//                 setAppliedDiscount({
//                     type: 'offer',
//                     name: offer.title,
//                     discountAmount: discount,
//                     originalAmount: orderData.amount,
//                     finalAmount: newFinalAmount
//                 });
//                 setFinalAmount(newFinalAmount);
                
//                 toast.success(`Offer applied! You saved ₹${discount}`);
//                 setShowOffers(false);
//             } else {
//                 toast.error(response.data?.error || 'Cannot apply this offer');
//             }
//         } catch (error: any) {
//             console.error('Offer validation error:', error);
//             toast.error(error.response?.data?.error || 'Cannot apply this offer');
//         }
//     };

//     // Remove discount
//     const handleRemoveDiscount = () => {
//         setAppliedPromo(null);
//         setSelectedOffer(null);
//         setAppliedDiscount(null);
//         setFinalAmount(orderData.amount);
//         toast.info('Discount removed');
//     };

//     // Payment Status Polling
//     useEffect(() => {
//         if (!orderData.orderId || !paymentInitiated) return;

//         let isMounted = true;

//         const checkStatus = async () => {
//             try {
//                 const res = await getPaymentStatus(orderData.orderId);
//                 if (!isMounted) return;

//                 if (res?.success && res.payment.status === 'paid') {
//                     setPaymentCompleted(true);
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
//                     toast.success('Payment successful!');
//                     setTimeout(() => {
//                         if (isMounted) navigate('/history');
//                     }, 2000);
//                 }

//                 if (res?.success && res.payment.status === 'failed') {
//                     toast.error('Payment failed');
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
//                 }
//             } catch (error) {
//                 console.error('Status check error:', error);
//             }
//         };

//         statusCheckIntervalRef.current = setInterval(checkStatus, 3000);
//         return () => {
//             isMounted = false;
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, [orderData.orderId, paymentInitiated, getPaymentStatus, navigate]);

//     // Cleanup
//     useEffect(() => {
//         return () => {
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, []);

//     // Payment Success Handler
//     const handlePaymentSuccess = async (response: any) => {
//         try {
//             console.log("Razorpay Response:", response);

//             // Include discount info in payment verification
//             const paymentData: any = {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 finalAmount: finalAmount,
//                 discountApplied: appliedDiscount ? {
//                     type: appliedDiscount.type,
//                     code: appliedDiscount.code,
//                     name: appliedDiscount.name,
//                     amount: appliedDiscount.discountAmount
//                 } : null
//             };

//             await apiClient.post('/payment/verify-payment', paymentData);
//             toast.success('Payment verified & order confirmed!');
//             setPaymentCompleted(true);

//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//                 statusCheckIntervalRef.current = null;
//             }

//             setTimeout(() => {
//                 navigate('/history');
//             }, 2000);
//         } catch (error) {
//             console.error("Verification failed:", error);
//             toast.error("Payment verification failed!");
//         }
//     };

//     const handlePaymentInitiated = () => {
//         setPaymentInitiated(true);
//     };

//     const handlePaymentError = () => {
//         toast.error('Payment failed. Try again.');
//         setPaymentInitiated(false);
//     };

//     const handleRetry = () => {
//         resetPaymentState();
//         setPaymentCompleted(false);
//         setPaymentInitiated(false);
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin h-12 w-12 border-b-2 border-purple-600 rounded-full"></div>
//             </div>
//         );
//     }

//     const { orderId, amount, orderNumber } = orderData;
//     const isPaymentCompleted = paymentStatus === 'paid' || paymentCompleted;

//     // Success UI
//     if (isPaymentCompleted) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-10">
//                 <div className="max-w-md mx-auto">
//                     <PaymentStatus
//                         status="paid"
//                         amount={finalAmount}
//                         paymentId={paymentDetails?.razorpayPaymentId}
//                         orderNumber={orderNumber}
//                     />
//                     <div className="mt-6 flex gap-4 justify-center">
//                         <button
//                             onClick={() => navigate('/history')}
//                             className="px-6 py-3 bg-purple-600 text-white rounded-lg"
//                         >
//                             View Orders
//                         </button>
//                         <button
//                             onClick={() => navigate('/order')}
//                             className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg"
//                         >
//                             New Order
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Waiting UI
//     if (paymentInitiated && !isPaymentCompleted) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin h-16 w-16 border-b-2 border-purple-600 rounded-full mx-auto"></div>
//                     <p className="mt-4">Waiting for payment confirmation...</p>
//                     <button onClick={handleRetry} className="mt-4 text-purple-600">
//                         Cancel & Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Main Checkout UI
//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold mb-6">Checkout</h2>
                    
//                     {/* Order Details */}
//                     <div className="mb-6 space-y-2">
//                         <p className="text-gray-600">Order Number: <span className="font-semibold">{orderNumber || 'N/A'}</span></p>
//                         <div className="border-t pt-3">
//                             <div className="flex justify-between items-center">
//                                 <span className="text-gray-600">Subtotal:</span>
//                                 <span className="font-semibold">₹{amount.toFixed(2)}</span>
//                             </div>
                            
//                             {/* Applied Discount */}
//                             {appliedDiscount && (
//                                 <div className="flex justify-between items-center text-green-600 mt-2">
//                                     <span className="flex items-center gap-1">
//                                         <Tag className="h-4 w-4" />
//                                         Discount ({appliedDiscount.name}):
//                                     </span>
//                                     <span>- ₹{appliedDiscount.discountAmount.toFixed(2)}</span>
//                                 </div>
//                             )}
                            
//                             {/* Final Amount */}
//                             <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
//                                 <span className="text-lg font-bold">Total:</span>
//                                 <span className="text-2xl font-bold text-purple-600">
//                                     ₹{finalAmount.toFixed(2)}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Promo Code Section */}
//                     <div className="mb-4">
//                         {appliedDiscount?.type === 'promo' ? (
//                             <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex justify-between items-center">
//                                 <div className="flex items-center gap-2">
//                                     <Tag className="h-4 w-4 text-green-600" />
//                                     <span className="text-sm text-green-700">
//                                         Promo code applied: <strong>{appliedDiscount.code}</strong>
//                                     </span>
//                                 </div>
//                                 <button
//                                     onClick={handleRemoveDiscount}
//                                     className="text-green-600 hover:text-green-800"
//                                 >
//                                     <X className="h-4 w-4" />
//                                 </button>
//                             </div>
//                         ) : (
//                             <div>
//                                 {!showPromoInput ? (
//                                     <button
//                                         onClick={() => setShowPromoInput(true)}
//                                         className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 transition"
//                                     >
//                                         <Tag className="h-4 w-4" />
//                                         Have a promo code?
//                                     </button>
//                                 ) : (
//                                     <div className="space-y-2">
//                                         <div className="flex gap-2">
//                                             <input
//                                                 type="text"
//                                                 value={promoCode}
//                                                 onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
//                                                 placeholder="Enter promo code"
//                                                 className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                                 disabled={promoLoading}
//                                             />
//                                             <button
//                                                 onClick={handleApplyPromo}
//                                                 disabled={promoLoading}
//                                                 className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
//                                             >
//                                                 {promoLoading ? 'Applying...' : 'Apply'}
//                                             </button>
//                                         </div>
//                                         <button
//                                             onClick={() => setShowPromoInput(false)}
//                                             className="text-sm text-gray-500 hover:text-gray-700"
//                                         >
//                                             Cancel
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>

//                     {/* Offers Section */}
//                     {availableOffers.length > 0 && !appliedDiscount && (
//                         <div className="mb-6">
//                             <button
//                                 onClick={() => setShowOffers(!showOffers)}
//                                 className="w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg"
//                             >
//                                 <div className="flex items-center gap-2">
//                                     <Gift className="h-5 w-5 text-orange-600" />
//                                     <span className="font-medium">Available Offers</span>
//                                 </div>
//                                 {showOffers ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                             </button>
                            
//                             {showOffers && (
//                                 <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
//                                     {offerLoading ? (
//                                         <div className="text-center py-4">Loading offers...</div>
//                                     ) : (
//                                         availableOffers.map((offer) => (
//                                             <div
//                                                 key={offer._id}
//                                                 className="border rounded-lg p-3 hover:shadow-md transition cursor-pointer"
//                                                 onClick={() => handleApplyOffer(offer)}
//                                             >
//                                                 <div className="flex justify-between items-start">
//                                                     <div className="flex-1">
//                                                         <h4 className="font-semibold text-gray-800">{offer.title}</h4>
//                                                         <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
//                                                         <div className="flex gap-2 mt-2">
//                                                             <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
//                                                                 {offer.discountType === 'percentage' 
//                                                                     ? `${offer.discountValue}% OFF` 
//                                                                     : `₹${offer.discountValue} OFF`}
//                                                             </span>
//                                                             {offer.minPurchase > 0 && (
//                                                                 <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                                                                     Min. ₹{offer.minPurchase}
//                                                                 </span>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                     <button className="text-purple-600 text-sm font-medium">
//                                                         Apply
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* Payment Button */}
//                     {(!paymentStatus || paymentStatus === 'created' || paymentStatus === 'attempted' || paymentStatus === 'failed') && (
//                         <RazorpayButton
//                             orderId={orderId}
//                             amount={finalAmount}
//                             onSuccess={handlePaymentSuccess}
//                             onError={handlePaymentError}
//                             onPaymentInitiated={handlePaymentInitiated}
//                             buttonText={`Pay ₹${finalAmount.toFixed(2)}`}
//                         />
//                     )}

//                     {/* Payment Status Display */}
//                     {(() => {
//                         // Don't show if no status
//                         if (!paymentStatus) return null;
//                         // Don't show if payment is initiated
//                         if (paymentInitiated) return null;
//                         // Don't show if payment is completed
                     
                        
//                         return (
//                             <div className="mt-4">
//                                 <PaymentStatus
//                                     status={paymentStatus}
//                                     amount={finalAmount}
//                                     paymentId={paymentDetails?.razorpayPaymentId}
//                                     orderNumber={orderNumber}
//                                     onRetry={handleRetry}
//                                     onContactSupport={() => {
//                                         toast.info('Please contact support for assistance');
//                                     }}
//                                 />
//                             </div>
//                         );
//                     })()}

//                     <p className="text-sm text-center text-gray-500 mt-4">
//                         Secure payment powered by Razorpay
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;








// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { RazorpayButton } from '../components/RazorpayButton';
// import { PaymentStatus } from '../components/PaymentStatus';
// import { usePayment } from '../hooks/usePayment';
// import { toast } from 'sonner';
// import apiClient from "../api/apiClient";
// import { Tag, Gift, ChevronDown, ChevronUp, X, Ticket, Percent, Copy } from 'lucide-react';

// interface CheckoutPageProps {
//     orderId?: string;
//     amount?: number;
//     orderNumber?: string;
// }

// interface AppliedDiscount {
//     type: 'promo' | 'offer';
//     code?: string;
//     name: string;
//     discountAmount: number;
// }

// const PaymentPage: React.FC<CheckoutPageProps> = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(true);
//     const [orderData, setOrderData] = useState({
//         orderId: '',
//         amount: 0,
//         orderNumber: ''
//     });

//     const [paymentCompleted, setPaymentCompleted] = useState(false);
//     const [paymentInitiated, setPaymentInitiated] = useState(false);
    
//     // Promo Code States
//     const [availablePromoCodes, setAvailablePromoCodes] = useState<any[]>([]);
//     const [appliedPromo, setAppliedPromo] = useState<any>(null);
//     const [promoLoading, setPromoLoading] = useState(false);
//     const [showPromoCodes, setShowPromoCodes] = useState(false);
    
//     // Offers States
//     const [availableOffers, setAvailableOffers] = useState<any[]>([]);
//     const [appliedOffer, setAppliedOffer] = useState<any>(null);
//     const [offerLoading, setOfferLoading] = useState(false);
//     const [showOffers, setShowOffers] = useState(false);
    
//     // Discount States - Now can have BOTH promo AND offer
//     const [appliedPromoDiscount, setAppliedPromoDiscount] = useState<AppliedDiscount | null>(null);
//     const [appliedOfferDiscount, setAppliedOfferDiscount] = useState<AppliedDiscount | null>(null);
//     const [finalAmount, setFinalAmount] = useState(0);
//     const [totalDiscount, setTotalDiscount] = useState(0);

//     const statusCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
//     const { paymentStatus, paymentDetails, getPaymentStatus, resetPaymentState } = usePayment();

//     // Calculate final amount whenever discounts change
//     const calculateFinalAmount = () => {
//         let discount = 0;
//         if (appliedPromoDiscount) discount += appliedPromoDiscount.discountAmount;
//         if (appliedOfferDiscount) discount += appliedOfferDiscount.discountAmount;
        
//         setTotalDiscount(discount);
//         setFinalAmount(orderData.amount - discount);
//     };

//     useEffect(() => {
//         calculateFinalAmount();
//     }, [appliedPromoDiscount, appliedOfferDiscount, orderData.amount]);

//     // Get order data
//     useEffect(() => {
//         const state = location.state as CheckoutPageProps;
//         if (state?.orderId && state?.amount) {
//             setOrderData({
//                 orderId: state.orderId,
//                 amount: state.amount,
//                 orderNumber: state.orderNumber || ''
//             });
//             setFinalAmount(state.amount);
//             setLoading(false);
            
//             // Fetch available promos and offers
//             fetchAvailablePromoCodes();
//             fetchAvailableOffers();
//         } else {
//             toast.error('Session expired. Please try again.');
//             navigate('/cart', { replace: true });
//         }
//     }, [location, navigate]);

//     // Fetch available promo codes
//     const fetchAvailablePromoCodes = async () => {
//         try {
//             setPromoLoading(true);
//             console.log('Fetching promo codes from: /promocode/active');
            
//             const response = await apiClient.get('/promocode/active');
//             console.log('Promo codes response:', response.data);
            
//             if (response.data.success) {
//                 setAvailablePromoCodes(response.data.data);
//                 console.log(`Found ${response.data.data.length} promo codes`);
//             }
//         } catch (error: any) {
//             console.error('Failed to fetch promocodes:', error);
//             toast.error('Failed to load promo codes');
//         } finally {
//             setPromoLoading(false);
//         }
//     };

//     // Fetch available offers
//     const fetchAvailableOffers = async () => {
//         try {
//             setOfferLoading(true);
//             const response = await apiClient.get('/offers/active');
//             if (response.data.success) {
//                 setAvailableOffers(response.data.data);
//             }
//         } catch (error) {
//             console.error('Failed to fetch offers:', error);
//         } finally {
//             setOfferLoading(false);
//         }
//     };

//     // Apply promo code
//     const handleApplyPromo = async (promoCodeItem: any) => {
//         // Allow promo even if offer is applied
//         if (appliedPromoDiscount) {
//             toast.error('Please remove current promo code first');
//             return;
//         }

//         try {
//             setPromoLoading(true);
            
//             // Calculate current total (original amount minus offer discount if any)
//             const currentTotal = orderData.amount - (appliedOfferDiscount?.discountAmount || 0);
            
//             const response = await apiClient.post('/promocode/validate', {
//                 code: promoCodeItem.code,
//                 cartTotal: currentTotal,
//                 userId: localStorage.getItem('userId')
//             });

//             if (response.data.success) {
//                 const discount = response.data.data.discount;
                
//                 setAppliedPromo(promoCodeItem);
//                 setAppliedPromoDiscount({
//                     type: 'promo',
//                     code: promoCodeItem.code,
//                     name: promoCodeItem.code,
//                     discountAmount: discount
//                 });
                
//                 toast.success(`Promo code applied! You saved ₹${discount}`);
//                 setShowPromoCodes(false);
//             } else {
//                 toast.error(response.data?.error || 'Cannot apply this promo code');
//             }
//         } catch (error: any) {
//             console.error('Promo validation error:', error);
//             toast.error(error.response?.data?.error || 'Failed to apply promo code');
//         } finally {
//             setPromoLoading(false);
//         }
//     };

//     // Apply offer
//     const handleApplyOffer = async (offer: any) => {
//         // Allow offer even if promo is applied
//         if (appliedOfferDiscount) {
//             toast.error('Please remove current offer first');
//             return;
//         }

//         try {
//             const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
//             const userType = localStorage.getItem('userType') || 'regular';
            
//             // Calculate current total (original amount minus promo discount if any)
//             const currentTotal = orderData.amount - (appliedPromoDiscount?.discountAmount || 0);
            
//             const response = await apiClient.post('/offers/validate', {
//                 offerId: offer._id,
//                 cartTotal: currentTotal,
//                 userType: userType,
//                 cartItems: cartItems
//             });

//             if (response.data.success) {
//                 const discount = response.data.data.discount;
                
//                 setAppliedOffer(offer);
//                 setAppliedOfferDiscount({
//                     type: 'offer',
//                     name: offer.title,
//                     discountAmount: discount
//                 });
                
//                 toast.success(`Offer applied! You saved ₹${discount}`);
//                 setShowOffers(false);
//             } else {
//                 toast.error(response.data?.error || 'Cannot apply this offer');
//             }
//         } catch (error: any) {
//             console.error('Offer validation error:', error);
//             toast.error(error.response?.data?.error || 'Cannot apply this offer');
//         }
//     };

//     // Remove promo discount
//     const handleRemovePromo = () => {
//         setAppliedPromo(null);
//         setAppliedPromoDiscount(null);
//         toast.info('Promo code removed');
//     };

//     // Remove offer discount
//     const handleRemoveOffer = () => {
//         setAppliedOffer(null);
//         setAppliedOfferDiscount(null);
//         toast.info('Offer removed');
//     };

//     // Remove all discounts
//     const handleRemoveAllDiscounts = () => {
//         setAppliedPromo(null);
//         setAppliedPromoDiscount(null);
//         setAppliedOffer(null);
//         setAppliedOfferDiscount(null);
//         toast.info('All discounts removed');
//     };

//     // Copy promo code to clipboard
//     const copyToClipboard = (code: string) => {
//         navigator.clipboard.writeText(code);
//         toast.success(`${code} copied to clipboard!`);
//     };

//     // Payment Status Polling
//     useEffect(() => {
//         if (!orderData.orderId || !paymentInitiated) return;

//         let isMounted = true;

//         const checkStatus = async () => {
//             try {
//                 const res = await getPaymentStatus(orderData.orderId);
//                 if (!isMounted) return;

//                 if (res?.success && res.payment.status === 'paid') {
//                     setPaymentCompleted(true);
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
//                     toast.success('Payment successful!');
//                     setTimeout(() => {
//                         if (isMounted) navigate('/history');
//                     }, 2000);
//                 }

//                 if (res?.success && res.payment.status === 'failed') {
//                     toast.error('Payment failed');
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
//                 }
//             } catch (error) {
//                 console.error('Status check error:', error);
//             }
//         };

//         statusCheckIntervalRef.current = setInterval(checkStatus, 3000);
//         return () => {
//             isMounted = false;
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, [orderData.orderId, paymentInitiated, getPaymentStatus, navigate]);

//     // Cleanup
//     useEffect(() => {
//         return () => {
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, []);

//     // Payment Success Handler
//     const handlePaymentSuccess = async (response: any) => {
//         try {
//             console.log("Razorpay Response:", response);

//             const paymentData: any = {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 finalAmount: finalAmount,
//                 totalDiscount: totalDiscount,
//                 discountsApplied: {
//                     promo: appliedPromoDiscount ? {
//                         code: appliedPromoDiscount.code,
//                         name: appliedPromoDiscount.name,
//                         amount: appliedPromoDiscount.discountAmount
//                     } : null,
//                     offer: appliedOfferDiscount ? {
//                         name: appliedOfferDiscount.name,
//                         amount: appliedOfferDiscount.discountAmount
//                     } : null
//                 }
//             };

//             await apiClient.post('/payment/verify-payment', paymentData);
//             toast.success('Payment verified & order confirmed!');
//             setPaymentCompleted(true);

//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//                 statusCheckIntervalRef.current = null;
//             }

//             setTimeout(() => {
//                 navigate('/history');
//             }, 2000);
//         } catch (error) {
//             console.error("Verification failed:", error);
//             toast.error("Payment verification failed!");
//         }
//     };

//     const handlePaymentInitiated = () => {
//         setPaymentInitiated(true);
//     };

//     const handlePaymentError = () => {
//         toast.error('Payment failed. Try again.');
//         setPaymentInitiated(false);
//     };

//     const handleRetry = () => {
//         resetPaymentState();
//         setPaymentCompleted(false);
//         setPaymentInitiated(false);
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin h-12 w-12 border-b-2 border-purple-600 rounded-full"></div>
//             </div>
//         );
//     }

//     const { orderId, amount, orderNumber } = orderData;
//     const isPaymentCompleted = paymentStatus === 'paid' || paymentCompleted;

//     // Success UI
//     if (isPaymentCompleted) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-10">
//                 <div className="max-w-md mx-auto">
//                     <PaymentStatus
//                         status="paid"
//                         amount={finalAmount}
//                         paymentId={paymentDetails?.razorpayPaymentId}
//                         orderNumber={orderNumber}
//                     />
//                     <div className="mt-6 flex gap-4 justify-center">
//                         <button
//                             onClick={() => navigate('/history')}
//                             className="px-6 py-3 bg-purple-600 text-white rounded-lg"
//                         >
//                             View Orders
//                         </button>
//                         <button
//                             onClick={() => navigate('/order')}
//                             className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg"
//                         >
//                             New Order
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Waiting UI
//     if (paymentInitiated && !isPaymentCompleted) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin h-16 w-16 border-b-2 border-purple-600 rounded-full mx-auto"></div>
//                     <p className="mt-4">Waiting for payment confirmation...</p>
//                     <button onClick={handleRetry} className="mt-4 text-purple-600">
//                         Cancel & Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Main Checkout UI
//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold mb-6">Checkout</h2>
                    
//                     {/* Order Details */}
//                     <div className="mb-6 space-y-2">
//                         <p className="text-gray-600">Order Number: <span className="font-semibold">{orderNumber || 'N/A'}</span></p>
//                         <div className="border-t pt-3">
//                             <div className="flex justify-between items-center">
//                                 <span className="text-gray-600">Subtotal:</span>
//                                 <span className="font-semibold">₹{amount.toFixed(2)}</span>
//                             </div>
                            
//                             {/* Applied Promo Discount */}
//                             {appliedPromoDiscount && (
//                                 <div className="flex justify-between items-center text-blue-600 mt-2">
//                                     <span className="flex items-center gap-1">
//                                         <Ticket className="h-4 w-4" />
//                                         Promo ({appliedPromoDiscount.code}):
//                                     </span>
//                                     <span>- ₹{appliedPromoDiscount.discountAmount.toFixed(2)}</span>
//                                 </div>
//                             )}
                            
//                             {/* Applied Offer Discount */}
//                             {appliedOfferDiscount && (
//                                 <div className="flex justify-between items-center text-orange-600 mt-2">
//                                     <span className="flex items-center gap-1">
//                                         <Gift className="h-4 w-4" />
//                                         Offer ({appliedOfferDiscount.name}):
//                                     </span>
//                                     <span>- ₹{appliedOfferDiscount.discountAmount.toFixed(2)}</span>
//                                 </div>
//                             )}
                            
//                             {/* Total Discount */}
//                             {totalDiscount > 0 && (
//                                 <div className="flex justify-between items-center text-green-600 mt-2 pt-2 border-t border-dashed">
//                                     <span className="font-medium">Total Discount:</span>
//                                     <span className="font-bold">- ₹{totalDiscount.toFixed(2)}</span>
//                                 </div>
//                             )}
                            
//                             {/* Final Amount */}
//                             <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
//                                 <span className="text-lg font-bold">Total:</span>
//                                 <span className="text-2xl font-bold text-purple-600">
//                                     ₹{finalAmount.toFixed(2)}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Applied Discounts Summary */}
//                     {(appliedPromoDiscount || appliedOfferDiscount) && (
//                         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//                             <div className="flex justify-between items-start mb-2">
//                                 <p className="font-semibold text-green-800">Applied Discounts:</p>
//                                 <button
//                                     onClick={handleRemoveAllDiscounts}
//                                     className="text-xs text-red-600 hover:text-red-800"
//                                 >
//                                     Remove All
//                                 </button>
//                             </div>
//                             {appliedPromoDiscount && (
//                                 <div className="flex justify-between items-center text-sm mb-2">
//                                     <span>Promo Code: <strong>{appliedPromoDiscount.code}</strong></span>
//                                     <div className="flex items-center gap-2">
//                                         <span className="text-green-600">-₹{appliedPromoDiscount.discountAmount.toFixed(2)}</span>
//                                         <button onClick={handleRemovePromo} className="text-red-500 hover:text-red-700">
//                                             <X className="h-3 w-3" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                             {appliedOfferDiscount && (
//                                 <div className="flex justify-between items-center text-sm">
//                                     <span>Offer: <strong>{appliedOfferDiscount.name}</strong></span>
//                                     <div className="flex items-center gap-2">
//                                         <span className="text-green-600">-₹{appliedOfferDiscount.discountAmount.toFixed(2)}</span>
//                                         <button onClick={handleRemoveOffer} className="text-red-500 hover:text-red-700">
//                                             <X className="h-3 w-3" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                             <div className="mt-2 pt-2 border-t border-green-200 flex justify-between font-bold">
//                                 <span>Total Savings:</span>
//                                 <span className="text-green-700">₹{totalDiscount.toFixed(2)}</span>
//                             </div>
//                         </div>
//                     )}

//                     {/* Promo Codes Section - Show if no promo applied */}
//                     {availablePromoCodes.length > 0 && !appliedPromoDiscount && (
//                         <div className="mb-6">
//                             <button
//                                 onClick={() => setShowPromoCodes(!showPromoCodes)}
//                                 className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
//                             >
//                                 <div className="flex items-center gap-2">
//                                     <Ticket className="h-5 w-5 text-blue-600" />
//                                     <span className="font-medium text-blue-800">Available Promo Codes</span>
//                                     <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
//                                         {availablePromoCodes.length}
//                                     </span>
//                                 </div>
//                                 {showPromoCodes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                             </button>
                            
//                             {showPromoCodes && (
//                                 <div className="mt-3 space-y-3 max-h-80 overflow-y-auto">
//                                     {promoLoading ? (
//                                         <div className="text-center py-4">Loading promo codes...</div>
//                                     ) : (
//                                         availablePromoCodes.map((promo) => (
//                                             <div
//                                                 key={promo._id}
//                                                 className="border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer bg-blue-50"
//                                                 onClick={() => handleApplyPromo(promo)}
//                                             >
//                                                 <div className="flex justify-between items-start">
//                                                     <div className="flex-1">
//                                                         <div className="flex items-center gap-2 mb-2">
//                                                             <Percent className="h-4 w-4 text-blue-600" />
//                                                             <h4 className="font-bold text-lg text-blue-800">{promo.code}</h4>
//                                                             <button
//                                                                 onClick={(e) => {
//                                                                     e.stopPropagation();
//                                                                     copyToClipboard(promo.code);
//                                                                 }}
//                                                                 className="text-xs bg-blue-200 hover:bg-blue-300 text-blue-800 px-2 py-1 rounded"
//                                                             >
//                                                                 <Copy className="h-3 w-3 inline" /> Copy
//                                                             </button>
//                                                         </div>
//                                                         <p className="text-sm text-gray-700">
//                                                             {promo.discountType === 'percentage' 
//                                                                 ? `${promo.discountValue}% OFF` 
//                                                                 : `₹${promo.discountValue} OFF`}
//                                                             {promo.minOrder > 0 && ` on min order ₹${promo.minOrder}`}
//                                                         </p>
//                                                         {promo.expiryDate && (
//                                                             <p className="text-xs text-gray-500 mt-1">
//                                                                 Valid till: {new Date(promo.expiryDate).toLocaleDateString()}
//                                                             </p>
//                                                         )}
//                                                     </div>
//                                                     <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
//                                                         Apply
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* Offers Section - Show if no offer applied */}
//                     {availableOffers.length > 0 && !appliedOfferDiscount && (
//                         <div className="mb-6">
//                             <button
//                                 onClick={() => setShowOffers(!showOffers)}
//                                 className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg border border-orange-200"
//                             >
//                                 <div className="flex items-center gap-2">
//                                     <Gift className="h-5 w-5 text-orange-600" />
//                                     <span className="font-medium text-orange-800">Available Offers</span>
//                                     <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
//                                         {availableOffers.length}
//                                     </span>
//                                 </div>
//                                 {showOffers ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                             </button>
                            
//                             {showOffers && (
//                                 <div className="mt-3 space-y-3 max-h-80 overflow-y-auto">
//                                     {offerLoading ? (
//                                         <div className="text-center py-4">Loading offers...</div>
//                                     ) : (
//                                         availableOffers.map((offer) => (
//                                             <div
//                                                 key={offer._id}
//                                                 className="border-2 border-orange-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer bg-orange-50"
//                                                 onClick={() => handleApplyOffer(offer)}
//                                             >
//                                                 <div className="flex justify-between items-start">
//                                                     <div className="flex-1">
//                                                         <h4 className="font-semibold text-gray-800">{offer.title}</h4>
//                                                         <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
//                                                         <div className="flex gap-2 mt-2">
//                                                             <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
//                                                                 {offer.discountType === 'percentage' 
//                                                                     ? `${offer.discountValue}% OFF` 
//                                                                     : `₹${offer.discountValue} OFF`}
//                                                             </span>
//                                                             {offer.minPurchase > 0 && (
//                                                                 <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                                                                     Min. ₹{offer.minPurchase}
//                                                                 </span>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                     <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700">
//                                                         Apply
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* Payment Button */}
//                     {(!paymentStatus || paymentStatus === 'created' || paymentStatus === 'attempted' || paymentStatus === 'failed') && (
//                         <RazorpayButton
//                             orderId={orderId}
//                             amount={finalAmount}
//                             onSuccess={handlePaymentSuccess}
//                             onError={handlePaymentError}
//                             onPaymentInitiated={handlePaymentInitiated}
//                             buttonText={`Pay ₹${finalAmount.toFixed(2)}`}
//                         />
//                     )}

//                     {/* Payment Status Display */}
//                     {(() => {
//                         if (!paymentStatus) return null;
//                         if (paymentInitiated) return null;
                        
//                         return (
//                             <div className="mt-4">
//                                 <PaymentStatus
//                                     status={paymentStatus}
//                                     amount={finalAmount}
//                                     paymentId={paymentDetails?.razorpayPaymentId}
//                                     orderNumber={orderNumber}
//                                     onRetry={handleRetry}
//                                     onContactSupport={() => {
//                                         toast.info('Please contact support for assistance');
//                                     }}
//                                 />
//                             </div>
//                         );
//                     })()}

//                     <p className="text-sm text-center text-gray-500 mt-4">
//                         Secure payment powered by Razorpay
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;












// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { RazorpayButton } from '../components/RazorpayButton';
// import { PaymentStatus } from '../components/PaymentStatus';
// import { usePayment } from '../hooks/usePayment';
// import { toast } from 'sonner';
// import apiClient from "../api/apiClient";
// import { Tag, Gift, ChevronDown, ChevronUp, X, Ticket, Percent, Copy } from 'lucide-react';

// interface CheckoutPageProps {
//     orderId?: string;
//     amount?: number;
//     orderNumber?: string;
// }

// interface AppliedDiscount {
//     type: 'promo' | 'offer';
//     code?: string;
//     name: string;
//     discountAmount: number;
// }

// const PaymentPage: React.FC<CheckoutPageProps> = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(true);
//     const [orderData, setOrderData] = useState({
//         orderId: '',
//         amount: 0,
//         orderNumber: ''
//     });

//     const [paymentCompleted, setPaymentCompleted] = useState(false);
//     const [paymentInitiated, setPaymentInitiated] = useState(false);
    
//     // Promo Code States
//     const [availablePromoCodes, setAvailablePromoCodes] = useState<any[]>([]);
//     const [appliedPromo, setAppliedPromo] = useState<any>(null);
//     const [promoLoading, setPromoLoading] = useState(false);
//     const [showPromoCodes, setShowPromoCodes] = useState(false);
    
//     // Offers States
//     const [availableOffers, setAvailableOffers] = useState<any[]>([]);
//     const [appliedOffer, setAppliedOffer] = useState<any>(null);
//     const [offerLoading, setOfferLoading] = useState(false);
//     const [showOffers, setShowOffers] = useState(false);
    
//     // Discount States - Now can have BOTH promo AND offer
//     const [appliedPromoDiscount, setAppliedPromoDiscount] = useState<AppliedDiscount | null>(null);
//     const [appliedOfferDiscount, setAppliedOfferDiscount] = useState<AppliedDiscount | null>(null);
//     const [finalAmount, setFinalAmount] = useState(0);
//     const [totalDiscount, setTotalDiscount] = useState(0);
//     const [updatingOrder, setUpdatingOrder] = useState(false);

//     const statusCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
//     const { paymentStatus, paymentDetails, getPaymentStatus, resetPaymentState } = usePayment();

//     // Function to update order amount in database
//     const updateOrderAmountInDB = async (finalAmt: number, discountAmt: number, discounts: any) => {
//         if (!orderData.orderId || updatingOrder) return;
        
//         try {
//             setUpdatingOrder(true);
//             console.log('Updating order amount in DB:', {
//                 orderId: orderData.orderId,
//                 finalAmount: finalAmt,
//                 discountAmount: discountAmt,
//                 discountsApplied: discounts
//             });
            
//             const response = await apiClient.put(`/order/${orderData.orderId}/amount`, {
//                 finalAmount: finalAmt,
//                 discountAmount: discountAmt,
//                 discountsApplied: discounts
//             });
            
//             if (response.data.success) {
//                 console.log('✅ Order amount updated successfully');
//             } else {
//                 console.error('Failed to update order amount:', response.data);
//             }
//         } catch (error) {
//             console.error('Error updating order amount:', error);
//         } finally {
//             setUpdatingOrder(false);
//         }
//     };

//     // Calculate final amount whenever discounts change and update DB
//     const calculateFinalAmount = () => {
//         let discount = 0;
//         if (appliedPromoDiscount) discount += appliedPromoDiscount.discountAmount;
//         if (appliedOfferDiscount) discount += appliedOfferDiscount.discountAmount;
        
//         const newTotalDiscount = discount;
//         const newFinalAmount = orderData.amount - discount;
        
//         setTotalDiscount(newTotalDiscount);
//         setFinalAmount(newFinalAmount);
        
//         // Update the order in the database
//         if (orderData.orderId && (appliedPromoDiscount || appliedOfferDiscount)) {
//             updateOrderAmountInDB(newFinalAmount, newTotalDiscount, {
//                 promo: appliedPromoDiscount ? {
//                     code: appliedPromoDiscount.code,
//                     name: appliedPromoDiscount.name,
//                     amount: appliedPromoDiscount.discountAmount
//                 } : null,
//                 offer: appliedOfferDiscount ? {
//                     name: appliedOfferDiscount.name,
//                     amount: appliedOfferDiscount.discountAmount
//                 } : null,
//                 totalDiscount: newTotalDiscount
//             });
//         } else if (orderData.orderId && !appliedPromoDiscount && !appliedOfferDiscount && totalDiscount > 0) {
//             // Remove discounts from order
//             updateOrderAmountInDB(orderData.amount, 0, {
//                 promo: null,
//                 offer: null,
//                 totalDiscount: 0
//             });
//         }
//     };

//     useEffect(() => {
//         calculateFinalAmount();
//     }, [appliedPromoDiscount, appliedOfferDiscount, orderData.amount]);

//     // Get order data
//     useEffect(() => {
//         const state = location.state as CheckoutPageProps;
//         if (state?.orderId && state?.amount) {
//             setOrderData({
//                 orderId: state.orderId,
//                 amount: state.amount,
//                 orderNumber: state.orderNumber || ''
//             });
//             setFinalAmount(state.amount);
//             setLoading(false);
            
//             // Fetch available promos and offers
//             fetchAvailablePromoCodes();
//             fetchAvailableOffers();
//         } else {
//             toast.error('Session expired. Please try again.');
//             navigate('/cart', { replace: true });
//         }
//     }, [location, navigate]);

//     // Fetch available promo codes
//     const fetchAvailablePromoCodes = async () => {
//         try {
//             setPromoLoading(true);
//             console.log('Fetching promo codes from: /promocode/active');
            
//             const response = await apiClient.get('/promocode/active');
//             console.log('Promo codes response:', response.data);
            
//             if (response.data.success) {
//                 setAvailablePromoCodes(response.data.data);
//                 console.log(`Found ${response.data.data.length} promo codes`);
//             }
//         } catch (error: any) {
//             console.error('Failed to fetch promocodes:', error);
//             toast.error('Failed to load promo codes');
//         } finally {
//             setPromoLoading(false);
//         }
//     };

//     // Fetch available offers
//     const fetchAvailableOffers = async () => {
//         try {
//             setOfferLoading(true);
//             const response = await apiClient.get('/offers/active');
//             if (response.data.success) {
//                 setAvailableOffers(response.data.data);
//             }
//         } catch (error) {
//             console.error('Failed to fetch offers:', error);
//         } finally {
//             setOfferLoading(false);
//         }
//     };

//     // Apply promo code
//     const handleApplyPromo = async (promoCodeItem: any) => {
//         // Allow promo even if offer is applied
//         if (appliedPromoDiscount) {
//             toast.error('Please remove current promo code first');
//             return;
//         }

//         try {
//             setPromoLoading(true);
            
//             // Calculate current total (original amount minus offer discount if any)
//             const currentTotal = orderData.amount - (appliedOfferDiscount?.discountAmount || 0);
            
//             const response = await apiClient.post('/promocode/validate', {
//                 code: promoCodeItem.code,
//                 cartTotal: currentTotal,
//                 userId: localStorage.getItem('userId')
//             });

//             if (response.data.success) {
//                 const discount = response.data.data.discount;
                
//                 setAppliedPromo(promoCodeItem);
//                 setAppliedPromoDiscount({
//                     type: 'promo',
//                     code: promoCodeItem.code,
//                     name: promoCodeItem.code,
//                     discountAmount: discount
//                 });
                
//                 toast.success(`Promo code applied! You saved ₹${discount}`);
//                 setShowPromoCodes(false);
//             } else {
//                 toast.error(response.data?.error || 'Cannot apply this promo code');
//             }
//         } catch (error: any) {
//             console.error('Promo validation error:', error);
//             toast.error(error.response?.data?.error || 'Failed to apply promo code');
//         } finally {
//             setPromoLoading(false);
//         }
//     };

//     // Apply offer
//     const handleApplyOffer = async (offer: any) => {
//         // Allow offer even if promo is applied
//         if (appliedOfferDiscount) {
//             toast.error('Please remove current offer first');
//             return;
//         }

//         try {
//             const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
//             const userType = localStorage.getItem('userType') || 'regular';
            
//             // Calculate current total (original amount minus promo discount if any)
//             const currentTotal = orderData.amount - (appliedPromoDiscount?.discountAmount || 0);
            
//             const response = await apiClient.post('/offers/validate', {
//                 offerId: offer._id,
//                 cartTotal: currentTotal,
//                 userType: userType,
//                 cartItems: cartItems
//             });

//             if (response.data.success) {
//                 const discount = response.data.data.discount;
                
//                 setAppliedOffer(offer);
//                 setAppliedOfferDiscount({
//                     type: 'offer',
//                     name: offer.title,
//                     discountAmount: discount
//                 });
                
//                 toast.success(`Offer applied! You saved ₹${discount}`);
//                 setShowOffers(false);
//             } else {
//                 toast.error(response.data?.error || 'Cannot apply this offer');
//             }
//         } catch (error: any) {
//             console.error('Offer validation error:', error);
//             toast.error(error.response?.data?.error || 'Cannot apply this offer');
//         }
//     };

//     // Remove promo discount
//     const handleRemovePromo = () => {
//         setAppliedPromo(null);
//         setAppliedPromoDiscount(null);
//         toast.info('Promo code removed');
//     };

//     // Remove offer discount
//     const handleRemoveOffer = () => {
//         setAppliedOffer(null);
//         setAppliedOfferDiscount(null);
//         toast.info('Offer removed');
//     };

//     // Remove all discounts
//     const handleRemoveAllDiscounts = () => {
//         setAppliedPromo(null);
//         setAppliedPromoDiscount(null);
//         setAppliedOffer(null);
//         setAppliedOfferDiscount(null);
//         toast.info('All discounts removed');
//     };

//     // Copy promo code to clipboard
//     const copyToClipboard = (code: string) => {
//         navigator.clipboard.writeText(code);
//         toast.success(`${code} copied to clipboard!`);
//     };

//     // Payment Status Polling
//     useEffect(() => {
//         if (!orderData.orderId || !paymentInitiated) return;

//         let isMounted = true;

//         const checkStatus = async () => {
//             try {
//                 const res = await getPaymentStatus(orderData.orderId);
//                 if (!isMounted) return;

//                 if (res?.success && res.payment.status === 'paid') {
//                     setPaymentCompleted(true);
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
//                     toast.success('Payment successful!');
//                     setTimeout(() => {
//                         if (isMounted) navigate('/history');
//                     }, 2000);
//                 }

//                 if (res?.success && res.payment.status === 'failed') {
//                     toast.error('Payment failed');
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
//                 }
//             } catch (error) {
//                 console.error('Status check error:', error);
//             }
//         };

//         statusCheckIntervalRef.current = setInterval(checkStatus, 3000);
//         return () => {
//             isMounted = false;
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, [orderData.orderId, paymentInitiated, getPaymentStatus, navigate]);

//     // Cleanup
//     useEffect(() => {
//         return () => {
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, []);

//     // Payment Success Handler
//     const handlePaymentSuccess = async (response: any) => {
//         try {
//             console.log("Razorpay Response:", response);

//             const paymentData: any = {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 finalAmount: finalAmount,
//                 totalDiscount: totalDiscount,
//                 discountsApplied: {
//                     promo: appliedPromoDiscount ? {
//                         code: appliedPromoDiscount.code,
//                         name: appliedPromoDiscount.name,
//                         amount: appliedPromoDiscount.discountAmount
//                     } : null,
//                     offer: appliedOfferDiscount ? {
//                         name: appliedOfferDiscount.name,
//                         amount: appliedOfferDiscount.discountAmount
//                     } : null
//                 }
//             };

//             await apiClient.post('/payment/verify-payment', paymentData);
//             toast.success('Payment verified & order confirmed!');
//             setPaymentCompleted(true);

//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//                 statusCheckIntervalRef.current = null;
//             }

//             setTimeout(() => {
//                 navigate('/history');
//             }, 2000);
//         } catch (error) {
//             console.error("Verification failed:", error);
//             toast.error("Payment verification failed!");
//         }
//     };

//     const handlePaymentInitiated = () => {
//         setPaymentInitiated(true);
//     };

//     const handlePaymentError = () => {
//         toast.error('Payment failed. Try again.');
//         setPaymentInitiated(false);
//     };

//     const handleRetry = () => {
//         resetPaymentState();
//         setPaymentCompleted(false);
//         setPaymentInitiated(false);
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin h-12 w-12 border-b-2 border-purple-600 rounded-full"></div>
//             </div>
//         );
//     }

//     const { orderId, amount, orderNumber } = orderData;
//     const isPaymentCompleted = paymentStatus === 'paid' || paymentCompleted;

//     // Success UI
//     if (isPaymentCompleted) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-10">
//                 <div className="max-w-md mx-auto">
//                     <PaymentStatus
//                         status="paid"
//                         amount={finalAmount}
//                         paymentId={paymentDetails?.razorpayPaymentId}
//                         orderNumber={orderNumber}
//                     />
//                     <div className="mt-6 flex gap-4 justify-center">
//                         <button
//                             onClick={() => navigate('/history')}
//                             className="px-6 py-3 bg-purple-600 text-white rounded-lg"
//                         >
//                             View Orders
//                         </button>
//                         <button
//                             onClick={() => navigate('/order')}
//                             className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg"
//                         >
//                             New Order
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Waiting UI
//     if (paymentInitiated && !isPaymentCompleted) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin h-16 w-16 border-b-2 border-purple-600 rounded-full mx-auto"></div>
//                     <p className="mt-4">Waiting for payment confirmation...</p>
//                     <button onClick={handleRetry} className="mt-4 text-purple-600">
//                         Cancel & Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Main Checkout UI
//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold mb-6">Checkout</h2>
                    
//                     {/* Updating Order Indicator */}
//                     {updatingOrder && (
//                         <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
//                             <div className="animate-spin inline-block h-4 w-4 border-b-2 border-yellow-600 rounded-full mr-2"></div>
//                             <span className="text-sm text-yellow-700">Updating order...</span>
//                         </div>
//                     )}
                    
//                     {/* Order Details */}
//                     <div className="mb-6 space-y-2">
//                         <p className="text-gray-600">Order Number: <span className="font-semibold">{orderNumber || 'N/A'}</span></p>
//                         <div className="border-t pt-3">
//                             <div className="flex justify-between items-center">
//                                 <span className="text-gray-600">Subtotal:</span>
//                                 <span className="font-semibold">₹{amount.toFixed(2)}</span>
//                             </div>
                            
//                             {/* Applied Promo Discount */}
//                             {appliedPromoDiscount && (
//                                 <div className="flex justify-between items-center text-blue-600 mt-2">
//                                     <span className="flex items-center gap-1">
//                                         <Ticket className="h-4 w-4" />
//                                         Promo ({appliedPromoDiscount.code}):
//                                     </span>
//                                     <span>- ₹{appliedPromoDiscount.discountAmount.toFixed(2)}</span>
//                                 </div>
//                             )}
                            
//                             {/* Applied Offer Discount */}
//                             {appliedOfferDiscount && (
//                                 <div className="flex justify-between items-center text-orange-600 mt-2">
//                                     <span className="flex items-center gap-1">
//                                         <Gift className="h-4 w-4" />
//                                         Offer ({appliedOfferDiscount.name}):
//                                     </span>
//                                     <span>- ₹{appliedOfferDiscount.discountAmount.toFixed(2)}</span>
//                                 </div>
//                             )}
                            
//                             {/* Total Discount */}
//                             {totalDiscount > 0 && (
//                                 <div className="flex justify-between items-center text-green-600 mt-2 pt-2 border-t border-dashed">
//                                     <span className="font-medium">Total Discount:</span>
//                                     <span className="font-bold">- ₹{totalDiscount.toFixed(2)}</span>
//                                 </div>
//                             )}
                            
//                             {/* Final Amount */}
//                             <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
//                                 <span className="text-lg font-bold">Total:</span>
//                                 <span className="text-2xl font-bold text-purple-600">
//                                     ₹{finalAmount.toFixed(2)}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Rest of your JSX remains the same... */}
//                     {/* Applied Discounts Summary */}
//                     {(appliedPromoDiscount || appliedOfferDiscount) && (
//                         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//                             <div className="flex justify-between items-start mb-2">
//                                 <p className="font-semibold text-green-800">Applied Discounts:</p>
//                                 <button
//                                     onClick={handleRemoveAllDiscounts}
//                                     className="text-xs text-red-600 hover:text-red-800"
//                                 >
//                                     Remove All
//                                 </button>
//                             </div>
//                             {appliedPromoDiscount && (
//                                 <div className="flex justify-between items-center text-sm mb-2">
//                                     <span>Promo Code: <strong>{appliedPromoDiscount.code}</strong></span>
//                                     <div className="flex items-center gap-2">
//                                         <span className="text-green-600">-₹{appliedPromoDiscount.discountAmount.toFixed(2)}</span>
//                                         <button onClick={handleRemovePromo} className="text-red-500 hover:text-red-700">
//                                             <X className="h-3 w-3" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                             {appliedOfferDiscount && (
//                                 <div className="flex justify-between items-center text-sm">
//                                     <span>Offer: <strong>{appliedOfferDiscount.name}</strong></span>
//                                     <div className="flex items-center gap-2">
//                                         <span className="text-green-600">-₹{appliedOfferDiscount.discountAmount.toFixed(2)}</span>
//                                         <button onClick={handleRemoveOffer} className="text-red-500 hover:text-red-700">
//                                             <X className="h-3 w-3" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                             <div className="mt-2 pt-2 border-t border-green-200 flex justify-between font-bold">
//                                 <span>Total Savings:</span>
//                                 <span className="text-green-700">₹{totalDiscount.toFixed(2)}</span>
//                             </div>
//                         </div>
//                     )}

//                     {/* Promo Codes Section - Show if no promo applied */}
//                     {availablePromoCodes.length > 0 && !appliedPromoDiscount && (
//                         <div className="mb-6">
//                             <button
//                                 onClick={() => setShowPromoCodes(!showPromoCodes)}
//                                 className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
//                             >
//                                 <div className="flex items-center gap-2">
//                                     <Ticket className="h-5 w-5 text-blue-600" />
//                                     <span className="font-medium text-blue-800">Available Promo Codes</span>
//                                     <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
//                                         {availablePromoCodes.length}
//                                     </span>
//                                 </div>
//                                 {showPromoCodes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                             </button>
                            
//                             {showPromoCodes && (
//                                 <div className="mt-3 space-y-3 max-h-80 overflow-y-auto">
//                                     {promoLoading ? (
//                                         <div className="text-center py-4">Loading promo codes...</div>
//                                     ) : (
//                                         availablePromoCodes.map((promo) => (
//                                             <div
//                                                 key={promo._id}
//                                                 className="border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer bg-blue-50"
//                                                 onClick={() => handleApplyPromo(promo)}
//                                             >
//                                                 <div className="flex justify-between items-start">
//                                                     <div className="flex-1">
//                                                         <div className="flex items-center gap-2 mb-2">
//                                                             <Percent className="h-4 w-4 text-blue-600" />
//                                                             <h4 className="font-bold text-lg text-blue-800">{promo.code}</h4>
//                                                             <button
//                                                                 onClick={(e) => {
//                                                                     e.stopPropagation();
//                                                                     copyToClipboard(promo.code);
//                                                                 }}
//                                                                 className="text-xs bg-blue-200 hover:bg-blue-300 text-blue-800 px-2 py-1 rounded"
//                                                             >
//                                                                 <Copy className="h-3 w-3 inline" /> Copy
//                                                             </button>
//                                                         </div>
//                                                         <p className="text-sm text-gray-700">
//                                                             {promo.discountType === 'percentage' 
//                                                                 ? `${promo.discountValue}% OFF` 
//                                                                 : `₹${promo.discountValue} OFF`}
//                                                             {promo.minOrder > 0 && ` on min order ₹${promo.minOrder}`}
//                                                         </p>
//                                                         {promo.expiryDate && (
//                                                             <p className="text-xs text-gray-500 mt-1">
//                                                                 Valid till: {new Date(promo.expiryDate).toLocaleDateString()}
//                                                             </p>
//                                                         )}
//                                                     </div>
//                                                     <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
//                                                         Apply
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* Offers Section - Show if no offer applied */}
//                     {availableOffers.length > 0 && !appliedOfferDiscount && (
//                         <div className="mb-6">
//                             <button
//                                 onClick={() => setShowOffers(!showOffers)}
//                                 className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg border border-orange-200"
//                             >
//                                 <div className="flex items-center gap-2">
//                                     <Gift className="h-5 w-5 text-orange-600" />
//                                     <span className="font-medium text-orange-800">Available Offers</span>
//                                     <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
//                                         {availableOffers.length}
//                                     </span>
//                                 </div>
//                                 {showOffers ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                             </button>
                            
//                             {showOffers && (
//                                 <div className="mt-3 space-y-3 max-h-80 overflow-y-auto">
//                                     {offerLoading ? (
//                                         <div className="text-center py-4">Loading offers...</div>
//                                     ) : (
//                                         availableOffers.map((offer) => (
//                                             <div
//                                                 key={offer._id}
//                                                 className="border-2 border-orange-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer bg-orange-50"
//                                                 onClick={() => handleApplyOffer(offer)}
//                                             >
//                                                 <div className="flex justify-between items-start">
//                                                     <div className="flex-1">
//                                                         <h4 className="font-semibold text-gray-800">{offer.title}</h4>
//                                                         <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
//                                                         <div className="flex gap-2 mt-2">
//                                                             <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
//                                                                 {offer.discountType === 'percentage' 
//                                                                     ? `${offer.discountValue}% OFF` 
//                                                                     : `₹${offer.discountValue} OFF`}
//                                                             </span>
//                                                             {offer.minPurchase > 0 && (
//                                                                 <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                                                                     Min. ₹{offer.minPurchase}
//                                                                 </span>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                     <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700">
//                                                         Apply
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* Payment Button */}
//                     {(!paymentStatus || paymentStatus === 'created' || paymentStatus === 'attempted' || paymentStatus === 'failed') && (
//                         <RazorpayButton
//                             orderId={orderId}
//                             amount={finalAmount}
//                             onSuccess={handlePaymentSuccess}
//                             onError={handlePaymentError}
//                             onPaymentInitiated={handlePaymentInitiated}
//                             buttonText={`Pay ₹${finalAmount.toFixed(2)}`}
//                         />
//                     )}

//                     {/* Payment Status Display */}
//                     {(() => {
//                         if (!paymentStatus) return null;
//                         if (paymentInitiated) return null;
                        
//                         return (
//                             <div className="mt-4">
//                                 <PaymentStatus
//                                     status={paymentStatus}
//                                     amount={finalAmount}
//                                     paymentId={paymentDetails?.razorpayPaymentId}
//                                     orderNumber={orderNumber}
//                                     onRetry={handleRetry}
//                                     onContactSupport={() => {
//                                         toast.info('Please contact support for assistance');
//                                     }}
//                                 />
//                             </div>
//                         );
//                     })()}

//                     <p className="text-sm text-center text-gray-500 mt-4">
//                         Secure payment powered by Razorpay
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;







// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { RazorpayButton } from '../components/RazorpayButton';
// import { PaymentStatus } from '../components/PaymentStatus';
// import { usePayment } from '../hooks/usePayment';
// import { toast } from 'sonner';
// import apiClient from "../api/apiClient";
// import { Tag, Gift, ChevronDown, ChevronUp, X, Ticket, Percent, Copy } from 'lucide-react';

// interface CheckoutPageProps {
//     orderId?: string;
//     amount?: number;
//     orderNumber?: string;
// }

// interface AppliedDiscount {
//     type: 'promo' | 'offer';
//     code?: string;
//     name: string;
//     discountAmount: number;
// }

// const PaymentPage: React.FC<CheckoutPageProps> = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(true);
//     const [orderData, setOrderData] = useState({
//         orderId: '',
//         amount: 0,
//         orderNumber: ''
//     });

//     const [paymentCompleted, setPaymentCompleted] = useState(false);
//     const [paymentInitiated, setPaymentInitiated] = useState(false);
    
//     // Promo Code States
//     const [availablePromoCodes, setAvailablePromoCodes] = useState<any[]>([]);
//     const [appliedPromo, setAppliedPromo] = useState<any>(null);
//     const [promoLoading, setPromoLoading] = useState(false);
//     const [showPromoCodes, setShowPromoCodes] = useState(false);
    
//     // Offers States
//     const [availableOffers, setAvailableOffers] = useState<any[]>([]);
//     const [appliedOffer, setAppliedOffer] = useState<any>(null);
//     const [offerLoading, setOfferLoading] = useState(false);
//     const [showOffers, setShowOffers] = useState(false);
    
//     // Discount States
//     const [appliedPromoDiscount, setAppliedPromoDiscount] = useState<AppliedDiscount | null>(null);
//     const [appliedOfferDiscount, setAppliedOfferDiscount] = useState<AppliedDiscount | null>(null);
//     const [finalAmount, setFinalAmount] = useState(0);
//     const [totalDiscount, setTotalDiscount] = useState(0);
//     const [updatingOrder, setUpdatingOrder] = useState(false);

//     const statusCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
//     const { paymentStatus, paymentDetails, getPaymentStatus, resetPaymentState } = usePayment();

//     // Function to update order amount in database - RETURNS PROMISE
//     const updateOrderAmountInDB = async (finalAmt: number, discountAmt: number, discounts: any): Promise<boolean> => {
//         if (!orderData.orderId || updatingOrder) return false;
        
//         try {
//             setUpdatingOrder(true);
//             console.log('Updating order amount in DB:', {
//                 orderId: orderData.orderId,
//                 finalAmount: finalAmt,
//                 discountAmount: discountAmt,
//                 discountsApplied: discounts
//             });
            
//             const response = await apiClient.put(`/order/${orderData.orderId}/amount`, {
//                 finalAmount: finalAmt,
//                 discountAmount: discountAmt,
//                 discountsApplied: discounts
//             });
            
//             if (response.data.success) {
//                 console.log('✅ Order amount updated successfully');
//                 // Update local state
//                 setOrderData(prev => ({
//                     ...prev,
//                     amount: finalAmt
//                 }));
//                 return true;
//             } else {
//                 console.error('Failed to update order amount:', response.data);
//                 return false;
//             }
//         } catch (error) {
//             console.error('Error updating order amount:', error);
//             return false;
//         } finally {
//             setUpdatingOrder(false);
//         }
//     };

//     // Update final amount and total discount when discounts change
//     useEffect(() => {
//         const discount = (appliedPromoDiscount?.discountAmount || 0) + (appliedOfferDiscount?.discountAmount || 0);
//         setTotalDiscount(discount);
//         setFinalAmount(orderData.amount - discount);
//     }, [appliedPromoDiscount, appliedOfferDiscount, orderData.amount]);

//     // Get order data
//     useEffect(() => {
//         const state = location.state as CheckoutPageProps;
//         if (state?.orderId && state?.amount) {
//             setOrderData({
//                 orderId: state.orderId,
//                 amount: state.amount,
//                 orderNumber: state.orderNumber || ''
//             });
//             setFinalAmount(state.amount);
//             setLoading(false);
            
//             fetchAvailablePromoCodes();
//             fetchAvailableOffers();
//         } else {
//             toast.error('Session expired. Please try again.');
//             navigate('/cart', { replace: true });
//         }
//     }, [location, navigate]);

//     // Fetch available promo codes
//     const fetchAvailablePromoCodes = async () => {
//         try {
//             setPromoLoading(true);
//             console.log('Fetching promo codes from: /promocode/active');
            
//             const response = await apiClient.get('/promocode/active');
//             console.log('Promo codes response:', response.data);
            
//             if (response.data.success) {
//                 setAvailablePromoCodes(response.data.data);
//                 console.log(`Found ${response.data.data.length} promo codes`);
//             } else {
//                 console.log('No promo codes found or API returned false');
//             }
//         } catch (error: any) {
//             console.error('Failed to fetch promocodes:', error);
//             console.error('Error status:', error.response?.status);
//             console.error('Error data:', error.response?.data);
//         } finally {
//             setPromoLoading(false);
//         }
//     };

//     // Fetch available offers
//     const fetchAvailableOffers = async () => {
//         try {
//             setOfferLoading(true);
//             const response = await apiClient.get('/offers/active');
//             if (response.data.success) {
//                 setAvailableOffers(response.data.data);
//                 console.log(`Found ${response.data.data.length} offers`);
//             }
//         } catch (error) {
//             console.error('Failed to fetch offers:', error);
//         } finally {
//             setOfferLoading(false);
//         }
//     };

//  // Apply promo code - FIXED sequential calculation
// const handleApplyPromo = async (promoCodeItem: any) => {
//     if (appliedPromoDiscount) {
//         toast.error('Please remove current promo code first');
//         return;
//     }

//     try {
//         setPromoLoading(true);
        
//         // ✅ Calculate current total after offer discount (if any)
//         const currentTotal = orderData.amount - (appliedOfferDiscount?.discountAmount || 0);
        
//         console.log('=== APPLYING PROMO CODE ===');
//         console.log('Original Amount:', orderData.amount);
//         console.log('Current Total (after offer):', currentTotal);
        
//         const response = await apiClient.post('/promocode/validate', {
//             code: promoCodeItem.code,
//             cartTotal: currentTotal,  // ← Use current total, not original
//             userId: localStorage.getItem('userId')
//         });

//         console.log('Promo validation response:', response.data);

//         if (response.data.success) {
//             // ✅ This discount is calculated on currentTotal
//             const discount = response.data.data.discount;
            
//             // ✅ Total discount = existing offer discount + new promo discount
//             const newTotalDiscount = (appliedOfferDiscount?.discountAmount || 0) + discount;
//             const newFinalAmount = orderData.amount - newTotalDiscount;
            
//             console.log('Discount calculated on current total:', discount);
//             console.log('Total Discount:', newTotalDiscount);
//             console.log('New Final Amount:', newFinalAmount);
            
//             setAppliedPromo(promoCodeItem);
//             setAppliedPromoDiscount({
//                 type: 'promo',
//                 code: promoCodeItem.code,
//                 name: promoCodeItem.code,
//                 discountAmount: discount
//             });
            
//             const updated = await updateOrderAmountInDB(newFinalAmount, newTotalDiscount, {
//                 promo: {
//                     type: 'promo',
//                     code: promoCodeItem.code,
//                     name: promoCodeItem.code,
//                     amount: discount
//                 },
//                 offer: appliedOfferDiscount ? {
//                     type: 'offer',
//                     name: appliedOfferDiscount.name,
//                     amount: appliedOfferDiscount.discountAmount
//                 } : null,
//                 totalDiscount: newTotalDiscount
//             });
            
//             if (updated) {
//                 toast.success(`Promo code applied! You saved ₹${discount}`);
//                 setShowPromoCodes(false);
//             } else {
//                 toast.error('Failed to apply discount. Please try again.');
//                 setAppliedPromo(null);
//                 setAppliedPromoDiscount(null);
//             }
//         } else {
//             toast.error(response.data?.error || 'Cannot apply this promo code');
//         }
//     } catch (error: any) {
//         console.error('Promo validation error:', error);
//         toast.error(error.response?.data?.error || 'Failed to apply promo code');
//     } finally {
//         setPromoLoading(false);
//     }
// };

// // Apply offer - FIXED sequential calculation
// const handleApplyOffer = async (offer: any) => {
//     if (appliedOfferDiscount) {
//         toast.error('Please remove current offer first');
//         return;
//     }

//     try {
//         const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
//         const userType = localStorage.getItem('userType') || 'regular';
        
//         // ✅ Calculate current total after promo discount (if any)
//         const currentTotal = orderData.amount - (appliedPromoDiscount?.discountAmount || 0);
        
//         console.log('=== APPLYING OFFER ===');
//         console.log('Original Amount:', orderData.amount);
//         console.log('Current Total (after promo):', currentTotal);
        
//         const response = await apiClient.post('/offers/validate', {
//             offerId: offer._id,
//             cartTotal: currentTotal,  // ← Use current total, not original
//             userType: userType,
//             cartItems: cartItems
//         });

//         console.log('Offer validation response:', response.data);

//         if (response.data.success) {
//             // ✅ This discount is calculated on currentTotal
//             const discount = response.data.data.discount;
            
//             // ✅ Total discount = existing promo discount + new offer discount
//             const newTotalDiscount = (appliedPromoDiscount?.discountAmount || 0) + discount;
//             const newFinalAmount = orderData.amount - newTotalDiscount;
            
//             console.log('Discount calculated on current total:', discount);
//             console.log('Total Discount:', newTotalDiscount);
//             console.log('New Final Amount:', newFinalAmount);
            
//             setAppliedOffer(offer);
//             setAppliedOfferDiscount({
//                 type: 'offer',
//                 name: offer.title,
//                 discountAmount: discount
//             });
            
//             const updated = await updateOrderAmountInDB(newFinalAmount, newTotalDiscount, {
//                 promo: appliedPromoDiscount ? {
//                     type: 'promo',
//                     code: appliedPromoDiscount.code,
//                     name: appliedPromoDiscount.name,
//                     amount: appliedPromoDiscount.discountAmount
//                 } : null,
//                 offer: {
//                     type: 'offer',
//                     name: offer.title,
//                     amount: discount
//                 },
//                 totalDiscount: newTotalDiscount
//             });
            
//             if (updated) {
//                 toast.success(`Offer applied! You saved ₹${discount}`);
//                 setShowOffers(false);
//             } else {
//                 toast.error('Failed to apply offer. Please try again.');
//                 setAppliedOffer(null);
//                 setAppliedOfferDiscount(null);
//             }
//         } else {
//             toast.error(response.data?.error || 'Cannot apply this offer');
//         }
//     } catch (error: any) {
//         console.error('Offer validation error:', error);
//         toast.error(error.response?.data?.error || 'Cannot apply this offer');
//     }
// };


//     // Remove promo discount
//     const handleRemovePromo = async () => {
//         const newTotalDiscount = appliedOfferDiscount?.discountAmount || 0;
//         const newFinalAmount = orderData.amount + (appliedPromoDiscount?.discountAmount || 0);
        
//         setAppliedPromo(null);
//         setAppliedPromoDiscount(null);
        
//         await updateOrderAmountInDB(newFinalAmount, newTotalDiscount, {
//             promo: null,
//             offer: appliedOfferDiscount ? {
//                 name: appliedOfferDiscount.name,
//                 amount: appliedOfferDiscount.discountAmount
//             } : null,
//             totalDiscount: newTotalDiscount
//         });
        
//         toast.info('Promo code removed');
//     };

//     // Remove offer discount
//     const handleRemoveOffer = async () => {
//         const newTotalDiscount = appliedPromoDiscount?.discountAmount || 0;
//         const newFinalAmount = orderData.amount + (appliedOfferDiscount?.discountAmount || 0);
        
//         setAppliedOffer(null);
//         setAppliedOfferDiscount(null);
        
//         await updateOrderAmountInDB(newFinalAmount, newTotalDiscount, {
//             promo: appliedPromoDiscount ? {
//                 code: appliedPromoDiscount.code,
//                 name: appliedPromoDiscount.name,
//                 amount: appliedPromoDiscount.discountAmount
//             } : null,
//             offer: null,
//             totalDiscount: newTotalDiscount
//         });
        
//         toast.info('Offer removed');
//     };

//     // Remove all discounts
//     const handleRemoveAllDiscounts = async () => {
//         setAppliedPromo(null);
//         setAppliedPromoDiscount(null);
//         setAppliedOffer(null);
//         setAppliedOfferDiscount(null);
        
//         await updateOrderAmountInDB(orderData.amount, 0, {
//             promo: null,
//             offer: null,
//             totalDiscount: 0
//         });
        
//         toast.info('All discounts removed');
//     };

//     // Copy promo code to clipboard
//     const copyToClipboard = (code: string) => {
//         navigator.clipboard.writeText(code);
//         toast.success(`${code} copied to clipboard!`);
//     };

//     // Payment Status Polling
//     useEffect(() => {
//         if (!orderData.orderId || !paymentInitiated) return;

//         let isMounted = true;

//         const checkStatus = async () => {
//             try {
//                 const res = await getPaymentStatus(orderData.orderId);
//                 if (!isMounted) return;

//                 if (res?.success && res.payment.status === 'paid') {
//                     setPaymentCompleted(true);
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
//                     toast.success('Payment successful!');
//                     setTimeout(() => {
//                         if (isMounted) navigate('/history');
//                     }, 2000);
//                 }

//                 if (res?.success && res.payment.status === 'failed') {
//                     toast.error('Payment failed');
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
//                 }
//             } catch (error) {
//                 console.error('Status check error:', error);
//             }
//         };

//         statusCheckIntervalRef.current = setInterval(checkStatus, 3000);
//         return () => {
//             isMounted = false;
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, [orderData.orderId, paymentInitiated, getPaymentStatus, navigate]);

//     // Cleanup
//     useEffect(() => {
//         return () => {
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, []);

//     // Payment Success Handler
//     const handlePaymentSuccess = async (response: any) => {
//         try {
//             console.log("Razorpay Response:", response);

//             const paymentData: any = {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 finalAmount: finalAmount,
//                 totalDiscount: totalDiscount,
//                 discountsApplied: {
//                     promo: appliedPromoDiscount ? {
//                         code: appliedPromoDiscount.code,
//                         name: appliedPromoDiscount.name,
//                         amount: appliedPromoDiscount.discountAmount
//                     } : null,
//                     offer: appliedOfferDiscount ? {
//                         name: appliedOfferDiscount.name,
//                         amount: appliedOfferDiscount.discountAmount
//                     } : null
//                 }
//             };

//             await apiClient.post('/payment/verify-payment', paymentData);
//             toast.success('Payment verified & order confirmed!');
//             setPaymentCompleted(true);

//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//                 statusCheckIntervalRef.current = null;
//             }

//             setTimeout(() => {
//                 navigate('/history');
//             }, 2000);
//         } catch (error) {
//             console.error("Verification failed:", error);
//             toast.error("Payment verification failed!");
//         }
//     };

//     const handlePaymentInitiated = () => {
//         setPaymentInitiated(true);
//     };

//     const handlePaymentError = () => {
//         toast.error('Payment failed. Try again.');
//         setPaymentInitiated(false);
//     };

//     const handleRetry = () => {
//         resetPaymentState();
//         setPaymentCompleted(false);
//         setPaymentInitiated(false);
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin h-12 w-12 border-b-2 border-purple-600 rounded-full"></div>
//             </div>
//         );
//     }

//     const { orderId, amount, orderNumber } = orderData;
//     const isPaymentCompleted = paymentStatus === 'paid' || paymentCompleted;

//     // Success UI
//     if (isPaymentCompleted) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-10">
//                 <div className="max-w-md mx-auto">
//                     <PaymentStatus
//                         status="paid"
//                         amount={finalAmount}
//                         paymentId={paymentDetails?.razorpayPaymentId}
//                         orderNumber={orderNumber}
//                     />
//                     <div className="mt-6 flex gap-4 justify-center">
//                         <button
//                             onClick={() => navigate('/history')}
//                             className="px-6 py-3 bg-purple-600 text-white rounded-lg"
//                         >
//                             View Orders
//                         </button>
//                         <button
//                             onClick={() => navigate('/order')}
//                             className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg"
//                         >
//                             New Order
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Waiting UI
//     if (paymentInitiated && !isPaymentCompleted) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin h-16 w-16 border-b-2 border-purple-600 rounded-full mx-auto"></div>
//                     <p className="mt-4">Waiting for payment confirmation...</p>
//                     <button onClick={handleRetry} className="mt-4 text-purple-600">
//                         Cancel & Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Main Checkout UI
//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold mb-6">Checkout</h2>
                    
//                     {/* Updating Order Indicator */}
//                     {updatingOrder && (
//                         <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
//                             <div className="animate-spin inline-block h-4 w-4 border-b-2 border-yellow-600 rounded-full mr-2"></div>
//                             <span className="text-sm text-yellow-700">Updating order...</span>
//                         </div>
//                     )}
                    
//                     {/* Debug Info - Remove after testing */}
//                     <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
//                         <p><strong>Debug:</strong></p>
//                         <p>Order ID: {orderId}</p>
//                         <p>Subtotal: ₹{amount}</p>
//                         <p>Final Amount: ₹{finalAmount}</p>
//                         <p>Promo Codes Available: {availablePromoCodes.length}</p>
//                         <p>Offers Available: {availableOffers.length}</p>
//                         <p>Applied Promo: {appliedPromoDiscount ? appliedPromoDiscount.code : 'None'}</p>
//                         <p>Applied Offer: {appliedOfferDiscount ? appliedOfferDiscount.name : 'None'}</p>
//                     </div>
                    
//                     {/* Order Details */}
//                     <div className="mb-6 space-y-2">
//                         <p className="text-gray-600">Order Number: <span className="font-semibold">{orderNumber || 'N/A'}</span></p>
//                         <div className="border-t pt-3">
//                             <div className="flex justify-between items-center">
//                                 <span className="text-gray-600">Subtotal:</span>
//                                 <span className="font-semibold">₹{amount.toFixed(2)}</span>
//                             </div>
                            
//                             {/* Applied Promo Discount */}
//                             {appliedPromoDiscount && (
//                                 <div className="flex justify-between items-center text-blue-600 mt-2">
//                                     <span className="flex items-center gap-1">
//                                         <Ticket className="h-4 w-4" />
//                                         Promo ({appliedPromoDiscount.code}):
//                                     </span>
//                                     <span>- ₹{appliedPromoDiscount.discountAmount.toFixed(2)}</span>
//                                 </div>
//                             )}
                            
//                             {/* Applied Offer Discount */}
//                             {appliedOfferDiscount && (
//                                 <div className="flex justify-between items-center text-orange-600 mt-2">
//                                     <span className="flex items-center gap-1">
//                                         <Gift className="h-4 w-4" />
//                                         Offer ({appliedOfferDiscount.name}):
//                                     </span>
//                                     <span>- ₹{appliedOfferDiscount.discountAmount.toFixed(2)}</span>
//                                 </div>
//                             )}
                            
//                             {/* Total Discount */}
//                             {totalDiscount > 0 && (
//                                 <div className="flex justify-between items-center text-green-600 mt-2 pt-2 border-t border-dashed">
//                                     <span className="font-medium">Total Discount:</span>
//                                     <span className="font-bold">- ₹{totalDiscount.toFixed(2)}</span>
//                                 </div>
//                             )}
                            
//                             {/* Final Amount */}
//                             <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
//                                 <span className="text-lg font-bold">Total:</span>
//                                 <span className="text-2xl font-bold text-purple-600">
//                                     ₹{finalAmount.toFixed(2)}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Promo Codes Section */}
//                     {availablePromoCodes.length > 0 && !appliedPromoDiscount && (
//                         <div className="mb-6">
//                             <button
//                                 onClick={() => setShowPromoCodes(!showPromoCodes)}
//                                 className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
//                             >
//                                 <div className="flex items-center gap-2">
//                                     <Ticket className="h-5 w-5 text-blue-600" />
//                                     <span className="font-medium text-blue-800">
//                                         Available Promo Codes ({availablePromoCodes.length})
//                                     </span>
//                                 </div>
//                                 {showPromoCodes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                             </button>
                            
//                             {showPromoCodes && (
//                                 <div className="mt-3 space-y-3 max-h-80 overflow-y-auto">
//                                     {promoLoading ? (
//                                         <div className="text-center py-4">Loading promo codes...</div>
//                                     ) : (
//                                         availablePromoCodes.map((promo) => (
//                                             <div
//                                                 key={promo._id}
//                                                 className="border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer bg-blue-50"
//                                                 onClick={() => handleApplyPromo(promo)}
//                                             >
//                                                 <div className="flex justify-between items-start">
//                                                     <div className="flex-1">
//                                                         <div className="flex items-center gap-2 mb-2">
//                                                             <Percent className="h-4 w-4 text-blue-600" />
//                                                             <h4 className="font-bold text-lg text-blue-800">{promo.code}</h4>
//                                                             <button
//                                                                 onClick={(e) => {
//                                                                     e.stopPropagation();
//                                                                     copyToClipboard(promo.code);
//                                                                 }}
//                                                                 className="text-xs bg-blue-200 hover:bg-blue-300 text-blue-800 px-2 py-1 rounded"
//                                                             >
//                                                                 <Copy className="h-3 w-3 inline" /> Copy
//                                                             </button>
//                                                         </div>
//                                                         <p className="text-sm text-gray-700">
//                                                             {promo.discountType === 'percentage' 
//                                                                 ? `${promo.discountValue}% OFF` 
//                                                                 : `₹${promo.discountValue} OFF`}
//                                                             {promo.minOrder > 0 && ` on min order ₹${promo.minOrder}`}
//                                                         </p>
//                                                         {promo.expiryDate && (
//                                                             <p className="text-xs text-gray-500 mt-1">
//                                                                 Valid till: {new Date(promo.expiryDate).toLocaleDateString()}
//                                                             </p>
//                                                         )}
//                                                     </div>
//                                                     <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
//                                                         Apply
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* Offers Section */}
//                     {availableOffers.length > 0 && !appliedOfferDiscount && (
//                         <div className="mb-6">
//                             <button
//                                 onClick={() => setShowOffers(!showOffers)}
//                                 className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg border border-orange-200"
//                             >
//                                 <div className="flex items-center gap-2">
//                                     <Gift className="h-5 w-5 text-orange-600" />
//                                     <span className="font-medium text-orange-800">
//                                         Available Offers ({availableOffers.length})
//                                     </span>
//                                 </div>
//                                 {showOffers ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                             </button>
                            
//                             {showOffers && (
//                                 <div className="mt-3 space-y-3 max-h-80 overflow-y-auto">
//                                     {offerLoading ? (
//                                         <div className="text-center py-4">Loading offers...</div>
//                                     ) : (
//                                         availableOffers.map((offer) => (
//                                             <div
//                                                 key={offer._id}
//                                                 className="border-2 border-orange-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer bg-orange-50"
//                                                 onClick={() => handleApplyOffer(offer)}
//                                             >
//                                                 <div className="flex justify-between items-start">
//                                                     <div className="flex-1">
//                                                         <h4 className="font-semibold text-gray-800">{offer.title}</h4>
//                                                         <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
//                                                         <div className="flex gap-2 mt-2">
//                                                             <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
//                                                                 {offer.discountType === 'percentage' 
//                                                                     ? `${offer.discountValue}% OFF` 
//                                                                     : `₹${offer.discountValue} OFF`}
//                                                             </span>
//                                                             {offer.minPurchase > 0 && (
//                                                                 <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                                                                     Min. ₹{offer.minPurchase}
//                                                                 </span>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                     <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700">
//                                                         Apply
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* Applied Discounts Summary */}
//                     {(appliedPromoDiscount || appliedOfferDiscount) && (
//                         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//                             <div className="flex justify-between items-start mb-2">
//                                 <p className="font-semibold text-green-800">Applied Discounts:</p>
//                                 <button
//                                     onClick={handleRemoveAllDiscounts}
//                                     className="text-xs text-red-600 hover:text-red-800"
//                                 >
//                                     Remove All
//                                 </button>
//                             </div>
//                             {appliedPromoDiscount && (
//                                 <div className="flex justify-between items-center text-sm mb-2">
//                                     <span>Promo Code: <strong>{appliedPromoDiscount.code}</strong></span>
//                                     <div className="flex items-center gap-2">
//                                         <span className="text-green-600">-₹{appliedPromoDiscount.discountAmount.toFixed(2)}</span>
//                                         <button onClick={handleRemovePromo} className="text-red-500 hover:text-red-700">
//                                             <X className="h-3 w-3" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                             {appliedOfferDiscount && (
//                                 <div className="flex justify-between items-center text-sm">
//                                     <span>Offer: <strong>{appliedOfferDiscount.name}</strong></span>
//                                     <div className="flex items-center gap-2">
//                                         <span className="text-green-600">-₹{appliedOfferDiscount.discountAmount.toFixed(2)}</span>
//                                         <button onClick={handleRemoveOffer} className="text-red-500 hover:text-red-700">
//                                             <X className="h-3 w-3" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                             <div className="mt-2 pt-2 border-t border-green-200 flex justify-between font-bold">
//                                 <span>Total Savings:</span>
//                                 <span className="text-green-700">₹{totalDiscount.toFixed(2)}</span>
//                             </div>
//                         </div>
//                     )}

//                     {/* Payment Button */}
//                     {(!paymentStatus || paymentStatus === 'created' || paymentStatus === 'attempted' || paymentStatus === 'failed') && (
//                         <RazorpayButton
//                             orderId={orderId}
//                             amount={finalAmount}
//                             onSuccess={handlePaymentSuccess}
//                             onError={handlePaymentError}
//                             onPaymentInitiated={handlePaymentInitiated}
//                             buttonText={`Pay ₹${finalAmount.toFixed(2)}`}
//                         />
//                     )}

//                     {/* Payment Status Display */}
//                     {(() => {
//                         if (!paymentStatus) return null;
//                         if (paymentInitiated) return null;
                        
//                         return (
//                             <div className="mt-4">
//                                 <PaymentStatus
//                                     status={paymentStatus}
//                                     amount={finalAmount}
//                                     paymentId={paymentDetails?.razorpayPaymentId}
//                                     orderNumber={orderNumber}
//                                     onRetry={handleRetry}
//                                     onContactSupport={() => {
//                                         toast.info('Please contact support for assistance');
//                                     }}
//                                 />
//                             </div>
//                         );
//                     })()}

//                     <p className="text-sm text-center text-gray-500 mt-4">
//                         Secure payment powered by Razorpay
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;





// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { RazorpayButton } from '../components/RazorpayButton';
// import { PaymentStatus } from '../components/PaymentStatus';
// import { usePayment } from '../hooks/usePayment';
// import { toast } from 'sonner';
// import apiClient from "../api/apiClient";
// import { Tag, Gift, ChevronDown, ChevronUp, X, Ticket, Percent, Copy } from 'lucide-react';

// interface CheckoutPageProps {
//     orderId?: string;
//     amount?: number;
//     orderNumber?: string;
// }

// interface AppliedDiscount {
//     type: 'promo' | 'offer';
//     code?: string;
//     name: string;
//     discountAmount: number;
// }

// const PaymentPage: React.FC<CheckoutPageProps> = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(true);
//     // ✅ Store original amount separately
//     const [originalAmount, setOriginalAmount] = useState(0);
//     const [orderData, setOrderData] = useState({
//         orderId: '',
//         orderNumber: ''
//     });

//     const [paymentCompleted, setPaymentCompleted] = useState(false);
//     const [paymentInitiated, setPaymentInitiated] = useState(false);
    
//     // Promo Code States
//     const [availablePromoCodes, setAvailablePromoCodes] = useState<any[]>([]);
//     const [appliedPromo, setAppliedPromo] = useState<any>(null);
//     const [promoLoading, setPromoLoading] = useState(false);
//     const [showPromoCodes, setShowPromoCodes] = useState(false);
    
//     // Offers States
//     const [availableOffers, setAvailableOffers] = useState<any[]>([]);
//     const [appliedOffer, setAppliedOffer] = useState<any>(null);
//     const [offerLoading, setOfferLoading] = useState(false);
//     const [showOffers, setShowOffers] = useState(false);
    
//     // Discount States
//     const [appliedPromoDiscount, setAppliedPromoDiscount] = useState<AppliedDiscount | null>(null);
//     const [appliedOfferDiscount, setAppliedOfferDiscount] = useState<AppliedDiscount | null>(null);
//     const [finalAmount, setFinalAmount] = useState(0);
//     const [totalDiscount, setTotalDiscount] = useState(0);
//     const [updatingOrder, setUpdatingOrder] = useState(false);

//     const statusCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
//     const { paymentStatus, paymentDetails, getPaymentStatus, resetPaymentState } = usePayment();

//     // Function to update order amount in database
//     const updateOrderAmountInDB = async (finalAmt: number, discountAmt: number, discounts: any): Promise<boolean> => {
//         if (!orderData.orderId || updatingOrder) return false;
        
//         try {
//             setUpdatingOrder(true);
//             console.log('Updating order amount in DB:', {
//                 orderId: orderData.orderId,
//                 finalAmount: finalAmt,
//                 discountAmount: discountAmt,
//                 discountsApplied: discounts
//             });
            
//             const response = await apiClient.put(`/order/${orderData.orderId}/amount`, {
//                 finalAmount: finalAmt,
//                 discountAmount: discountAmt,
//                 discountsApplied: discounts
//             });
            
//             if (response.data.success) {
//                 console.log('✅ Order amount updated successfully');
//                 return true;
//             } else {
//                 console.error('Failed to update order amount:', response.data);
//                 return false;
//             }
//         } catch (error) {
//             console.error('Error updating order amount:', error);
//             return false;
//         } finally {
//             setUpdatingOrder(false);
//         }
//     };

//     // Update final amount and total discount based on original amount
//     useEffect(() => {
//         const discount = (appliedPromoDiscount?.discountAmount || 0) + (appliedOfferDiscount?.discountAmount || 0);
//         setTotalDiscount(discount);
//         setFinalAmount(originalAmount - discount);
//     }, [appliedPromoDiscount, appliedOfferDiscount, originalAmount]);

//     // Get order data
//     useEffect(() => {
//         const state = location.state as CheckoutPageProps;
//         if (state?.orderId && state?.amount) {
//             setOrderData({
//                 orderId: state.orderId,
//                 orderNumber: state.orderNumber || ''
//             });
//             setOriginalAmount(state.amount);  // ✅ Store original amount
//             setFinalAmount(state.amount);
//             setLoading(false);
            
//             fetchAvailablePromoCodes();
//             fetchAvailableOffers();
//         } else {
//             toast.error('Session expired. Please try again.');
//             navigate('/cart', { replace: true });
//         }
//     }, [location, navigate]);

//     // Fetch available promo codes
//     const fetchAvailablePromoCodes = async () => {
//         try {
//             setPromoLoading(true);
//             const response = await apiClient.get('/promocode/active');
//             if (response.data.success) {
//                 setAvailablePromoCodes(response.data.data);
//                 console.log(`Found ${response.data.data.length} promo codes`);
//             }
//         } catch (error: any) {
//             console.error('Failed to fetch promocodes:', error);
//         } finally {
//             setPromoLoading(false);
//         }
//     };

//     // Fetch available offers
//     const fetchAvailableOffers = async () => {
//         try {
//             setOfferLoading(true);
//             const response = await apiClient.get('/offers/active');
//             if (response.data.success) {
//                 setAvailableOffers(response.data.data);
//             }
//         } catch (error) {
//             console.error('Failed to fetch offers:', error);
//         } finally {
//             setOfferLoading(false);
//         }
//     };

//     // Apply promo code - Calculate on original amount
//     const handleApplyPromo = async (promoCodeItem: any) => {
//         if (appliedPromoDiscount) {
//             toast.error('Please remove current promo code first');
//             return;
//         }

//         try {
//             setPromoLoading(true);
            
//             // ✅ Calculate on original amount, not current discounted amount
//             const currentTotal = originalAmount - (appliedOfferDiscount?.discountAmount || 0);
            
//             console.log('=== APPLYING PROMO CODE ===');
//             console.log('Original Amount:', originalAmount);
//             console.log('Current Total for calculation:', currentTotal);
            
//             const response = await apiClient.post('/promocode/validate', {
//                 code: promoCodeItem.code,
//                 cartTotal: currentTotal,
//                 userId: localStorage.getItem('userId')
//             });

//             console.log('Promo validation response:', response.data);

//             if (response.data.success) {
//                 const discount = response.data.data.discount;
                
//                 // ✅ Total discount = existing offer discount + new promo discount
//                 const newTotalDiscount = (appliedOfferDiscount?.discountAmount || 0) + discount;
//                 const newFinalAmount = originalAmount - newTotalDiscount;
                
//                 console.log('Discount calculated:', discount);
//                 console.log('Total Discount:', newTotalDiscount);
//                 console.log('New Final Amount:', newFinalAmount);
                
//                 setAppliedPromo(promoCodeItem);
//                 setAppliedPromoDiscount({
//                     type: 'promo',
//                     code: promoCodeItem.code,
//                     name: promoCodeItem.code,
//                     discountAmount: discount
//                 });
                
//                 const updated = await updateOrderAmountInDB(newFinalAmount, newTotalDiscount, {
//                     promo: {
//                         type: 'promo',
//                         code: promoCodeItem.code,
//                         name: promoCodeItem.code,
//                         amount: discount
//                     },
//                     offer: appliedOfferDiscount ? {
//                         type: 'offer',
//                         name: appliedOfferDiscount.name,
//                         amount: appliedOfferDiscount.discountAmount
//                     } : null,
//                     totalDiscount: newTotalDiscount
//                 });
                
//                 if (updated) {
//                     toast.success(`Promo code applied! You saved ₹${discount}`);
//                     setShowPromoCodes(false);
//                 } else {
//                     toast.error('Failed to apply discount. Please try again.');
//                     setAppliedPromo(null);
//                     setAppliedPromoDiscount(null);
//                 }
//             } else {
//                 toast.error(response.data?.error || 'Cannot apply this promo code');
//             }
//         } catch (error: any) {
//             console.error('Promo validation error:', error);
//             toast.error(error.response?.data?.error || 'Failed to apply promo code');
//         } finally {
//             setPromoLoading(false);
//         }
//     };

//     // Apply offer - Calculate on original amount
//     const handleApplyOffer = async (offer: any) => {
//         if (appliedOfferDiscount) {
//             toast.error('Please remove current offer first');
//             return;
//         }

//         try {
//             const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
//             const userType = localStorage.getItem('userType') || 'regular';
            
//             // ✅ Calculate on original amount, not current discounted amount
//             const currentTotal = originalAmount - (appliedPromoDiscount?.discountAmount || 0);
            
//             console.log('=== APPLYING OFFER ===');
//             console.log('Original Amount:', originalAmount);
//             console.log('Current Total for calculation:', currentTotal);
            
//             const response = await apiClient.post('/offers/validate', {
//                 offerId: offer._id,
//                 cartTotal: currentTotal,
//                 userType: userType,
//                 cartItems: cartItems
//             });

//             console.log('Offer validation response:', response.data);

//             if (response.data.success) {
//                 const discount = response.data.data.discount;
                
//                 const newTotalDiscount = (appliedPromoDiscount?.discountAmount || 0) + discount;
//                 const newFinalAmount = originalAmount - newTotalDiscount;
                
//                 console.log('Discount calculated:', discount);
//                 console.log('Total Discount:', newTotalDiscount);
//                 console.log('New Final Amount:', newFinalAmount);
                
//                 setAppliedOffer(offer);
//                 setAppliedOfferDiscount({
//                     type: 'offer',
//                     name: offer.title,
//                     discountAmount: discount
//                 });
                
//                 const updated = await updateOrderAmountInDB(newFinalAmount, newTotalDiscount, {
//                     promo: appliedPromoDiscount ? {
//                         type: 'promo',
//                         code: appliedPromoDiscount.code,
//                         name: appliedPromoDiscount.name,
//                         amount: appliedPromoDiscount.discountAmount
//                     } : null,
//                     offer: {
//                         type: 'offer',
//                         name: offer.title,
//                         amount: discount
//                     },
//                     totalDiscount: newTotalDiscount
//                 });
                
//                 if (updated) {
//                     toast.success(`Offer applied! You saved ₹${discount}`);
//                     setShowOffers(false);
//                 } else {
//                     toast.error('Failed to apply offer. Please try again.');
//                     setAppliedOffer(null);
//                     setAppliedOfferDiscount(null);
//                 }
//             } else {
//                 toast.error(response.data?.error || 'Cannot apply this offer');
//             }
//         } catch (error: any) {
//             console.error('Offer validation error:', error);
//             toast.error(error.response?.data?.error || 'Cannot apply this offer');
//         }
//     };

//     // Remove promo discount
//     const handleRemovePromo = async () => {
//         const newTotalDiscount = appliedOfferDiscount?.discountAmount || 0;
//         const newFinalAmount = originalAmount - newTotalDiscount;
        
//         setAppliedPromo(null);
//         setAppliedPromoDiscount(null);
        
//         await updateOrderAmountInDB(newFinalAmount, newTotalDiscount, {
//             promo: null,
//             offer: appliedOfferDiscount ? {
//                 type: 'offer',
//                 name: appliedOfferDiscount.name,
//                 amount: appliedOfferDiscount.discountAmount
//             } : null,
//             totalDiscount: newTotalDiscount
//         });
        
//         toast.info('Promo code removed');
//     };

//     // Remove offer discount
//     const handleRemoveOffer = async () => {
//         const newTotalDiscount = appliedPromoDiscount?.discountAmount || 0;
//         const newFinalAmount = originalAmount - newTotalDiscount;
        
//         setAppliedOffer(null);
//         setAppliedOfferDiscount(null);
        
//         await updateOrderAmountInDB(newFinalAmount, newTotalDiscount, {
//             promo: appliedPromoDiscount ? {
//                 type: 'promo',
//                 code: appliedPromoDiscount.code,
//                 name: appliedPromoDiscount.name,
//                 amount: appliedPromoDiscount.discountAmount
//             } : null,
//             offer: null,
//             totalDiscount: newTotalDiscount
//         });
        
//         toast.info('Offer removed');
//     };

//     // Remove all discounts
//     const handleRemoveAllDiscounts = async () => {
//         setAppliedPromo(null);
//         setAppliedPromoDiscount(null);
//         setAppliedOffer(null);
//         setAppliedOfferDiscount(null);
        
//         await updateOrderAmountInDB(originalAmount, 0, {
//             promo: null,
//             offer: null,
//             totalDiscount: 0
//         });
        
//         toast.info('All discounts removed');
//     };

//     // Copy promo code to clipboard
//     const copyToClipboard = (code: string) => {
//         navigator.clipboard.writeText(code);
//         toast.success(`${code} copied to clipboard!`);
//     };

//     // Payment Status Polling
//     useEffect(() => {
//         if (!orderData.orderId || !paymentInitiated) return;

//         let isMounted = true;

//         const checkStatus = async () => {
//             try {
//                 const res = await getPaymentStatus(orderData.orderId);
//                 if (!isMounted) return;

//                 if (res?.success && res.payment.status === 'paid') {
//                     setPaymentCompleted(true);
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
//                     toast.success('Payment successful!');
//                     setTimeout(() => {
//                         if (isMounted) navigate('/history');
//                     }, 2000);
//                 }

//                 if (res?.success && res.payment.status === 'failed') {
//                     toast.error('Payment failed');
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
//                 }
//             } catch (error) {
//                 console.error('Status check error:', error);
//             }
//         };

//         statusCheckIntervalRef.current = setInterval(checkStatus, 3000);
//         return () => {
//             isMounted = false;
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, [orderData.orderId, paymentInitiated, getPaymentStatus, navigate]);

//     // Cleanup
//     useEffect(() => {
//         return () => {
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, []);

//     // Payment Success Handler
//     const handlePaymentSuccess = async (response: any) => {
//         try {
//             console.log("Razorpay Response:", response);

//             const paymentData: any = {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 finalAmount: finalAmount,
//                 totalDiscount: totalDiscount,
//                 discountsApplied: {
//                     promo: appliedPromoDiscount ? {
//                         code: appliedPromoDiscount.code,
//                         name: appliedPromoDiscount.name,
//                         amount: appliedPromoDiscount.discountAmount
//                     } : null,
//                     offer: appliedOfferDiscount ? {
//                         name: appliedOfferDiscount.name,
//                         amount: appliedOfferDiscount.discountAmount
//                     } : null
//                 }
//             };

//             await apiClient.post('/payment/verify-payment', paymentData);
//             toast.success('Payment verified & order confirmed!');
//             setPaymentCompleted(true);

//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//                 statusCheckIntervalRef.current = null;
//             }

//             setTimeout(() => {
//                 navigate('/history');
//             }, 2000);
//         } catch (error) {
//             console.error("Verification failed:", error);
//             toast.error("Payment verification failed!");
//         }
//     };

//     const handlePaymentInitiated = () => {
//         setPaymentInitiated(true);
//     };

//     const handlePaymentError = () => {
//         toast.error('Payment failed. Try again.');
//         setPaymentInitiated(false);
//     };

//     const handleRetry = () => {
//         resetPaymentState();
//         setPaymentCompleted(false);
//         setPaymentInitiated(false);
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin h-12 w-12 border-b-2 border-purple-600 rounded-full"></div>
//             </div>
//         );
//     }

//     const { orderId, orderNumber } = orderData;
//     const isPaymentCompleted = paymentStatus === 'paid' || paymentCompleted;

//     // Success UI
//     if (isPaymentCompleted) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-10">
//                 <div className="max-w-md mx-auto">
//                     <PaymentStatus
//                         status="paid"
//                         amount={finalAmount}
//                         paymentId={paymentDetails?.razorpayPaymentId}
//                         orderNumber={orderNumber}
//                     />
//                     <div className="mt-6 flex gap-4 justify-center">
//                         <button
//                             onClick={() => navigate('/history')}
//                             className="px-6 py-3 bg-purple-600 text-white rounded-lg"
//                         >
//                             View Orders
//                         </button>
//                         <button
//                             onClick={() => navigate('/order')}
//                             className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg"
//                         >
//                             New Order
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Waiting UI
//     if (paymentInitiated && !isPaymentCompleted) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin h-16 w-16 border-b-2 border-purple-600 rounded-full mx-auto"></div>
//                     <p className="mt-4">Waiting for payment confirmation...</p>
//                     <button onClick={handleRetry} className="mt-4 text-purple-600">
//                         Cancel & Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Main Checkout UI
//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold mb-6">Checkout</h2>
                    
//                     {/* Updating Order Indicator */}
//                     {updatingOrder && (
//                         <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
//                             <div className="animate-spin inline-block h-4 w-4 border-b-2 border-yellow-600 rounded-full mr-2"></div>
//                             <span className="text-sm text-yellow-700">Updating order...</span>
//                         </div>
//                     )}
                    
//                     {/* Debug Info */}
//                     {/* <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
//                         <p><strong>Debug:</strong></p>
//                         <p>Order ID: {orderId}</p>
//                         <p>Original Amount: ₹{originalAmount}</p>
//                         <p>Final Amount: ₹{finalAmount}</p>
//                         <p>Total Discount: ₹{totalDiscount}</p>
//                         <p>Promo Codes Available: {availablePromoCodes.length}</p>
//                         <p>Offers Available: {availableOffers.length}</p>
//                         <p>Applied Promo: {appliedPromoDiscount ? `${appliedPromoDiscount.code} (₹${appliedPromoDiscount.discountAmount})` : 'None'}</p>
//                         <p>Applied Offer: {appliedOfferDiscount ? `${appliedOfferDiscount.name} (₹${appliedOfferDiscount.discountAmount})` : 'None'}</p>
//                     </div> */}
                    
//                     {/* Order Details */}
//                     <div className="mb-6 space-y-2">
//                         <p className="text-gray-600">Order Number: <span className="font-semibold">{orderNumber || 'N/A'}</span></p>
//                         <div className="border-t pt-3">
//                             <div className="flex justify-between items-center">
//                                 <span className="text-gray-600">Subtotal:</span>
//                                 <span className="font-semibold">₹{originalAmount.toFixed(2)}</span>
//                             </div>
                            
//                             {/* Applied Promo Discount */}
//                             {appliedPromoDiscount && (
//                                 <div className="flex justify-between items-center text-blue-600 mt-2">
//                                     <span className="flex items-center gap-1">
//                                         <Ticket className="h-4 w-4" />
//                                         Promo ({appliedPromoDiscount.code}):
//                                     </span>
//                                     <span>- ₹{appliedPromoDiscount.discountAmount.toFixed(2)}</span>
//                                 </div>
//                             )}
                            
//                             {/* Applied Offer Discount */}
//                             {appliedOfferDiscount && (
//                                 <div className="flex justify-between items-center text-orange-600 mt-2">
//                                     <span className="flex items-center gap-1">
//                                         <Gift className="h-4 w-4" />
//                                         Offer ({appliedOfferDiscount.name}):
//                                     </span>
//                                     <span>- ₹{appliedOfferDiscount.discountAmount.toFixed(2)}</span>
//                                 </div>
//                             )}
                            
//                             {/* Total Discount */}
//                             {totalDiscount > 0 && (
//                                 <div className="flex justify-between items-center text-green-600 mt-2 pt-2 border-t border-dashed">
//                                     <span className="font-medium">Total Discount:</span>
//                                     <span className="font-bold">- ₹{totalDiscount.toFixed(2)}</span>
//                                 </div>
//                             )}
                            
//                             {/* Final Amount */}
//                             <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
//                                 <span className="text-lg font-bold">Total:</span>
//                                 <span className="text-2xl font-bold text-purple-600">
//                                     ₹{finalAmount.toFixed(2)}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Promo Codes Section */}
//                     {availablePromoCodes.length > 0 && !appliedPromoDiscount && (
//                         <div className="mb-6">
//                             <button
//                                 onClick={() => setShowPromoCodes(!showPromoCodes)}
//                                 className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
//                             >
//                                 <div className="flex items-center gap-2">
//                                     <Ticket className="h-5 w-5 text-blue-600" />
//                                     <span className="font-medium text-blue-800">
//                                         Available Promo Codes ({availablePromoCodes.length})
//                                     </span>
//                                 </div>
//                                 {showPromoCodes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                             </button>
                            
//                             {showPromoCodes && (
//                                 <div className="mt-3 space-y-3 max-h-80 overflow-y-auto">
//                                     {promoLoading ? (
//                                         <div className="text-center py-4">Loading promo codes...</div>
//                                     ) : (
//                                         availablePromoCodes.map((promo) => (
//                                             <div
//                                                 key={promo._id}
//                                                 className="border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer bg-blue-50"
//                                                 onClick={() => handleApplyPromo(promo)}
//                                             >
//                                                 <div className="flex justify-between items-start">
//                                                     <div className="flex-1">
//                                                         <div className="flex items-center gap-2 mb-2">
//                                                             <Percent className="h-4 w-4 text-blue-600" />
//                                                             <h4 className="font-bold text-lg text-blue-800">{promo.code}</h4>
//                                                             <button
//                                                                 onClick={(e) => {
//                                                                     e.stopPropagation();
//                                                                     copyToClipboard(promo.code);
//                                                                 }}
//                                                                 className="text-xs bg-blue-200 hover:bg-blue-300 text-blue-800 px-2 py-1 rounded"
//                                                             >
//                                                                 <Copy className="h-3 w-3 inline" /> Copy
//                                                             </button>
//                                                         </div>
//                                                         <p className="text-sm text-gray-700">
//                                                             {promo.discountType === 'percentage' 
//                                                                 ? `${promo.discountValue}% OFF` 
//                                                                 : `₹${promo.discountValue} OFF`}
//                                                             {promo.minOrder > 0 && ` on min order ₹${promo.minOrder}`}
//                                                         </p>
//                                                         {promo.expiryDate && (
//                                                             <p className="text-xs text-gray-500 mt-1">
//                                                                 Valid till: {new Date(promo.expiryDate).toLocaleDateString()}
//                                                             </p>
//                                                         )}
//                                                     </div>
//                                                     <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
//                                                         Apply
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* Offers Section */}
//                     {availableOffers.length > 0 && !appliedOfferDiscount && (
//                         <div className="mb-6">
//                             <button
//                                 onClick={() => setShowOffers(!showOffers)}
//                                 className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg border border-orange-200"
//                             >
//                                 <div className="flex items-center gap-2">
//                                     <Gift className="h-5 w-5 text-orange-600" />
//                                     <span className="font-medium text-orange-800">
//                                         Available Offers ({availableOffers.length})
//                                     </span>
//                                 </div>
//                                 {showOffers ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                             </button>
                            
//                             {showOffers && (
//                                 <div className="mt-3 space-y-3 max-h-80 overflow-y-auto">
//                                     {offerLoading ? (
//                                         <div className="text-center py-4">Loading offers...</div>
//                                     ) : (
//                                         availableOffers.map((offer) => (
//                                             <div
//                                                 key={offer._id}
//                                                 className="border-2 border-orange-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer bg-orange-50"
//                                                 onClick={() => handleApplyOffer(offer)}
//                                             >
//                                                 <div className="flex justify-between items-start">
//                                                     <div className="flex-1">
//                                                         <h4 className="font-semibold text-gray-800">{offer.title}</h4>
//                                                         <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
//                                                         <div className="flex gap-2 mt-2">
//                                                             <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
//                                                                 {offer.discountType === 'percentage' 
//                                                                     ? `${offer.discountValue}% OFF` 
//                                                                     : `₹${offer.discountValue} OFF`}
//                                                             </span>
//                                                             {offer.minPurchase > 0 && (
//                                                                 <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                                                                     Min. ₹{offer.minPurchase}
//                                                                 </span>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                     <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700">
//                                                         Apply
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* Applied Discounts Summary */}
//                     {(appliedPromoDiscount || appliedOfferDiscount) && (
//                         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//                             <div className="flex justify-between items-start mb-2">
//                                 <p className="font-semibold text-green-800">Applied Discounts:</p>
//                                 <button
//                                     onClick={handleRemoveAllDiscounts}
//                                     className="text-xs text-red-600 hover:text-red-800"
//                                 >
//                                     Remove All
//                                 </button>
//                             </div>
//                             {appliedPromoDiscount && (
//                                 <div className="flex justify-between items-center text-sm mb-2">
//                                     <span>Promo Code: <strong>{appliedPromoDiscount.code}</strong></span>
//                                     <div className="flex items-center gap-2">
//                                         <span className="text-green-600">-₹{appliedPromoDiscount.discountAmount.toFixed(2)}</span>
//                                         <button onClick={handleRemovePromo} className="text-red-500 hover:text-red-700">
//                                             <X className="h-3 w-3" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                             {appliedOfferDiscount && (
//                                 <div className="flex justify-between items-center text-sm">
//                                     <span>Offer: <strong>{appliedOfferDiscount.name}</strong></span>
//                                     <div className="flex items-center gap-2">
//                                         <span className="text-green-600">-₹{appliedOfferDiscount.discountAmount.toFixed(2)}</span>
//                                         <button onClick={handleRemoveOffer} className="text-red-500 hover:text-red-700">
//                                             <X className="h-3 w-3" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                             <div className="mt-2 pt-2 border-t border-green-200 flex justify-between font-bold">
//                                 <span>Total Savings:</span>
//                                 <span className="text-green-700">₹{totalDiscount.toFixed(2)}</span>
//                             </div>
//                         </div>
//                     )}

//                     {/* Payment Button */}
//                     {(!paymentStatus || paymentStatus === 'created' || paymentStatus === 'attempted' || paymentStatus === 'failed') && (
//                         <RazorpayButton
//                             orderId={orderId}
//                             amount={finalAmount}
//                             onSuccess={handlePaymentSuccess}
//                             onError={handlePaymentError}
//                             onPaymentInitiated={handlePaymentInitiated}
//                             buttonText={`Pay ₹${finalAmount.toFixed(2)}`}
//                         />
//                     )}

//                     {/* Payment Status Display */}
//                     {(() => {
//                         if (!paymentStatus) return null;
//                         if (paymentInitiated) return null;
                        
//                         return (
//                             <div className="mt-4">
//                                 <PaymentStatus
//                                     status={paymentStatus}
//                                     amount={finalAmount}
//                                     paymentId={paymentDetails?.razorpayPaymentId}
//                                     orderNumber={orderNumber}
//                                     onRetry={handleRetry}
//                                     onContactSupport={() => {
//                                         toast.info('Please contact support for assistance');
//                                     }}
//                                 />
//                             </div>
//                         );
//                     })()}

//                     <p className="text-sm text-center text-gray-500 mt-4">
//                         Secure payment powered by Razorpay
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;







import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RazorpayButton } from '../components/RazorpayButton';
import { PaymentStatus } from '../components/PaymentStatus';
import { usePayment } from '../hooks/usePayment';
import { toast } from 'sonner';
import apiClient from "../api/apiClient";
import { Tag, Gift, ChevronDown, ChevronUp, X, Ticket, Percent, Copy } from 'lucide-react';

interface CheckoutPageProps {
    orderId?: string;
    amount?: number;
    orderNumber?: string;
}

interface AppliedDiscount {
    type: 'promo' | 'offer';
    code?: string;
    name: string;
    discountAmount: number;
}

const PaymentPage: React.FC<CheckoutPageProps> = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    // ✅ Store original amount separately
    const [originalAmount, setOriginalAmount] = useState(0);
    const [orderData, setOrderData] = useState({
        orderId: '',
        orderNumber: ''
    });

    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [paymentInitiated, setPaymentInitiated] = useState(false);
    
    // Promo Code States
    const [availablePromoCodes, setAvailablePromoCodes] = useState<any[]>([]);
    const [appliedPromo, setAppliedPromo] = useState<any>(null);
    const [promoLoading, setPromoLoading] = useState(false);
    const [showPromoCodes, setShowPromoCodes] = useState(false);
    
    // Offers States
    const [availableOffers, setAvailableOffers] = useState<any[]>([]);
    const [appliedOffer, setAppliedOffer] = useState<any>(null);
    const [offerLoading, setOfferLoading] = useState(false);
    const [showOffers, setShowOffers] = useState(false);
    
    // Discount States
    const [appliedPromoDiscount, setAppliedPromoDiscount] = useState<AppliedDiscount | null>(null);
    const [appliedOfferDiscount, setAppliedOfferDiscount] = useState<AppliedDiscount | null>(null);
    const [finalAmount, setFinalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [updatingOrder, setUpdatingOrder] = useState(false);

    const statusCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const { paymentStatus, paymentDetails, getPaymentStatus, resetPaymentState } = usePayment();

    // Function to update order amount in database
    const updateOrderAmountInDB = async (finalAmt: number, discountAmt: number, discounts: any): Promise<boolean> => {
        if (!orderData.orderId || updatingOrder) return false;
        
        try {
            setUpdatingOrder(true);
            console.log('Updating order amount in DB:', {
                orderId: orderData.orderId,
                finalAmount: finalAmt,
                discountAmount: discountAmt,
                discountsApplied: discounts
            });
            
            const response = await apiClient.put(`/order/${orderData.orderId}/amount`, {
                finalAmount: finalAmt,
                discountAmount: discountAmt,
                discountsApplied: discounts
            });
            
            if (response.data.success) {
                console.log('✅ Order amount updated successfully');
                return true;
            } else {
                console.error('Failed to update order amount:', response.data);
                return false;
            }
        } catch (error) {
            console.error('Error updating order amount:', error);
            return false;
        } finally {
            setUpdatingOrder(false);
        }
    };

    // Update final amount and total discount based on original amount
    useEffect(() => {
        const discount = (appliedPromoDiscount?.discountAmount || 0) + (appliedOfferDiscount?.discountAmount || 0);
        setTotalDiscount(discount);
        setFinalAmount(originalAmount - discount);
    }, [appliedPromoDiscount, appliedOfferDiscount, originalAmount]);

    // Get order data
    useEffect(() => {
        const state = location.state as CheckoutPageProps;
        if (state?.orderId && state?.amount) {
            setOrderData({
                orderId: state.orderId,
                orderNumber: state.orderNumber || ''
            });
            setOriginalAmount(state.amount);
            setFinalAmount(state.amount);
            setLoading(false);
            
            fetchAvailablePromoCodes();
            fetchAvailableOffers();
        } else {
            toast.error('Session expired. Please try again.');
            navigate('/cart', { replace: true });
        }
    }, [location, navigate]);

    // Fetch available promo codes
    const fetchAvailablePromoCodes = async () => {
        try {
            setPromoLoading(true);
            const response = await apiClient.get('/promocode/active');
            if (response.data.success) {
                setAvailablePromoCodes(response.data.data);
                console.log(`Found ${response.data.data.length} promo codes`);
            }
        } catch (error: any) {
            console.error('Failed to fetch promocodes:', error);
        } finally {
            setPromoLoading(false);
        }
    };

    // Fetch available offers
    const fetchAvailableOffers = async () => {
        try {
            setOfferLoading(true);
            const response = await apiClient.get('/offers/active');
            if (response.data.success) {
                setAvailableOffers(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch offers:', error);
        } finally {
            setOfferLoading(false);
        }
    };

    // Apply promo code - Calculate on original amount
    const handleApplyPromo = async (promoCodeItem: any) => {
        if (appliedPromoDiscount) {
            toast.error('Please remove current promo code first');
            return;
        }

        try {
            setPromoLoading(true);
            
            const currentTotal = originalAmount - (appliedOfferDiscount?.discountAmount || 0);
            
            console.log('=== APPLYING PROMO CODE ===');
            console.log('Original Amount:', originalAmount);
            console.log('Current Total for calculation:', currentTotal);
            
            const response = await apiClient.post('/promocode/validate', {
                code: promoCodeItem.code,
                cartTotal: currentTotal,
                userId: localStorage.getItem('userId')
            });

            console.log('Promo validation response:', response.data);

            if (response.data.success) {
                const discount = response.data.data.discount;
                
                const newTotalDiscount = (appliedOfferDiscount?.discountAmount || 0) + discount;
                const newFinalAmount = originalAmount - newTotalDiscount;
                
                console.log('Discount calculated:', discount);
                console.log('Total Discount:', newTotalDiscount);
                console.log('New Final Amount:', newFinalAmount);
                
                setAppliedPromo(promoCodeItem);
                setAppliedPromoDiscount({
                    type: 'promo',
                    code: promoCodeItem.code,
                    name: promoCodeItem.code,
                    discountAmount: discount
                });
                
                const updated = await updateOrderAmountInDB(newFinalAmount, newTotalDiscount, {
                    promo: {
                        type: 'promo',
                        code: promoCodeItem.code,
                        name: promoCodeItem.code,
                        amount: discount
                    },
                    offer: appliedOfferDiscount ? {
                        type: 'offer',
                        name: appliedOfferDiscount.name,
                        amount: appliedOfferDiscount.discountAmount
                    } : null,
                    totalDiscount: newTotalDiscount
                });
                
                if (updated) {
                    toast.success(`Promo code applied! You saved ₹${discount}`);
                    setShowPromoCodes(false);
                } else {
                    toast.error('Failed to apply discount. Please try again.');
                    setAppliedPromo(null);
                    setAppliedPromoDiscount(null);
                }
            } else {
                toast.error(response.data?.error || 'Cannot apply this promo code');
            }
        } catch (error: any) {
            console.error('Promo validation error:', error);
            toast.error(error.response?.data?.error || 'Failed to apply promo code');
        } finally {
            setPromoLoading(false);
        }
    };

    // Apply offer - Calculate on original amount
    const handleApplyOffer = async (offer: any) => {
        if (appliedOfferDiscount) {
            toast.error('Please remove current offer first');
            return;
        }

        try {
            const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
            const userType = localStorage.getItem('userType') || 'regular';
            
            const currentTotal = originalAmount - (appliedPromoDiscount?.discountAmount || 0);
            
            console.log('=== APPLYING OFFER ===');
            console.log('Original Amount:', originalAmount);
            console.log('Current Total for calculation:', currentTotal);
            
            const response = await apiClient.post('/offers/validate', {
                offerId: offer._id,
                cartTotal: currentTotal,
                userType: userType,
                cartItems: cartItems
            });

            console.log('Offer validation response:', response.data);

            if (response.data.success) {
                const discount = response.data.data.discount;
                
                const newTotalDiscount = (appliedPromoDiscount?.discountAmount || 0) + discount;
                const newFinalAmount = originalAmount - newTotalDiscount;
                
                console.log('Discount calculated:', discount);
                console.log('Total Discount:', newTotalDiscount);
                console.log('New Final Amount:', newFinalAmount);
                
                setAppliedOffer(offer);
                setAppliedOfferDiscount({
                    type: 'offer',
                    name: offer.title,
                    discountAmount: discount
                });
                
                const updated = await updateOrderAmountInDB(newFinalAmount, newTotalDiscount, {
                    promo: appliedPromoDiscount ? {
                        type: 'promo',
                        code: appliedPromoDiscount.code,
                        name: appliedPromoDiscount.name,
                        amount: appliedPromoDiscount.discountAmount
                    } : null,
                    offer: {
                        type: 'offer',
                        name: offer.title,
                        amount: discount
                    },
                    totalDiscount: newTotalDiscount
                });
                
                if (updated) {
                    toast.success(`Offer applied! You saved ₹${discount}`);
                    setShowOffers(false);
                } else {
                    toast.error('Failed to apply offer. Please try again.');
                    setAppliedOffer(null);
                    setAppliedOfferDiscount(null);
                }
            } else {
                toast.error(response.data?.error || 'Cannot apply this offer');
            }
        } catch (error: any) {
            console.error('Offer validation error:', error);
            toast.error(error.response?.data?.error || 'Cannot apply this offer');
        }
    };

    // Remove promo discount
    const handleRemovePromo = async () => {
        const newTotalDiscount = appliedOfferDiscount?.discountAmount || 0;
        const newFinalAmount = originalAmount - newTotalDiscount;
        
        setAppliedPromo(null);
        setAppliedPromoDiscount(null);
        
        await updateOrderAmountInDB(newFinalAmount, newTotalDiscount, {
            promo: null,
            offer: appliedOfferDiscount ? {
                type: 'offer',
                name: appliedOfferDiscount.name,
                amount: appliedOfferDiscount.discountAmount
            } : null,
            totalDiscount: newTotalDiscount
        });
        
        toast.info('Promo code removed');
    };

    // Remove offer discount
    const handleRemoveOffer = async () => {
        const newTotalDiscount = appliedPromoDiscount?.discountAmount || 0;
        const newFinalAmount = originalAmount - newTotalDiscount;
        
        setAppliedOffer(null);
        setAppliedOfferDiscount(null);
        
        await updateOrderAmountInDB(newFinalAmount, newTotalDiscount, {
            promo: appliedPromoDiscount ? {
                type: 'promo',
                code: appliedPromoDiscount.code,
                name: appliedPromoDiscount.name,
                amount: appliedPromoDiscount.discountAmount
            } : null,
            offer: null,
            totalDiscount: newTotalDiscount
        });
        
        toast.info('Offer removed');
    };

    // Remove all discounts
    const handleRemoveAllDiscounts = async () => {
        setAppliedPromo(null);
        setAppliedPromoDiscount(null);
        setAppliedOffer(null);
        setAppliedOfferDiscount(null);
        
        await updateOrderAmountInDB(originalAmount, 0, {
            promo: null,
            offer: null,
            totalDiscount: 0
        });
        
        toast.info('All discounts removed');
    };

    // Copy promo code to clipboard
    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
        toast.success(`${code} copied to clipboard!`);
    };

    // Payment Status Polling - IMPROVED
    useEffect(() => {
        if (!orderData.orderId) return;
        
        let isMounted = true;
        let pollCount = 0;
        const maxPolls = 20;

        const checkStatus = async () => {
            if (!isMounted) return;
            
            try {
                pollCount++;
                console.log(`Checking payment status (attempt ${pollCount})...`);
                
                const res = await getPaymentStatus(orderData.orderId);
                
                if (!isMounted) return;

                if (res?.success && res.payment?.status === 'paid') {
                    console.log('✅ Payment confirmed!');
                    setPaymentCompleted(true);
                    setPaymentInitiated(false);
                    
                    if (statusCheckIntervalRef.current) {
                        clearInterval(statusCheckIntervalRef.current);
                        statusCheckIntervalRef.current = null;
                    }
                    
                    toast.success('Payment successful!');
                    setTimeout(() => {
                        if (isMounted) navigate('/history');
                    }, 2000);
                    return;
                }
                
                if (res?.success && res.payment?.status === 'failed') {
                    console.log('❌ Payment failed');
                    toast.error('Payment failed');
                    setPaymentInitiated(false);
                    
                    if (statusCheckIntervalRef.current) {
                        clearInterval(statusCheckIntervalRef.current);
                        statusCheckIntervalRef.current = null;
                    }
                    return;
                }
                
                if (pollCount >= maxPolls) {
                    console.log('Polling timeout - stopping');
                    if (statusCheckIntervalRef.current) {
                        clearInterval(statusCheckIntervalRef.current);
                        statusCheckIntervalRef.current = null;
                    }
                    toast.info('Payment confirmation taking longer than expected. Please check your order status later.');
                }
                
            } catch (error) {
                console.error('Status check error:', error);
            }
        };

        // Start polling only after payment is initiated and not completed
        if (paymentInitiated && !paymentCompleted) {
            if (statusCheckIntervalRef.current) {
                clearInterval(statusCheckIntervalRef.current);
            }
            statusCheckIntervalRef.current = setInterval(checkStatus, 3000);
            checkStatus();
        }
        
        return () => {
            isMounted = false;
            if (statusCheckIntervalRef.current) {
                clearInterval(statusCheckIntervalRef.current);
            }
        };
    }, [orderData.orderId, paymentInitiated, paymentCompleted, getPaymentStatus, navigate]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (statusCheckIntervalRef.current) {
                clearInterval(statusCheckIntervalRef.current);
            }
        };
    }, []);

    // Payment Success Handler - FIXED VERSION
    // In PaymentPage.tsx, update handlePaymentSuccess
const handlePaymentSuccess = async (response: any, orderIdParam?: string) => {
    console.log("=== HANDLE PAYMENT SUCCESS CALLED ===");
    console.log("Response:", response);
    console.log("OrderId param:", orderIdParam);
    console.log("State orderId:", orderData.orderId);
    
    const currentOrderId = orderIdParam || orderData.orderId;
    
    if (!currentOrderId) {
        console.error("No orderId available!");
        toast.error("Order ID missing. Please contact support.");
        return;
    }
    
    try {
        console.log("Razorpay Success Response:", response);
        
        toast.loading("Verifying payment...", { id: "payment-verify" });
        
        // Store payment info for reference
        localStorage.setItem('lastPayment', JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            timestamp: Date.now()
        }));
        
        const paymentData: any = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            finalAmount: finalAmount,
            totalDiscount: totalDiscount,
            discountsApplied: {
                promo: appliedPromoDiscount ? {
                    code: appliedPromoDiscount.code,
                    name: appliedPromoDiscount.name,
                    amount: appliedPromoDiscount.discountAmount
                } : null,
                offer: appliedOfferDiscount ? {
                    name: appliedOfferDiscount.name,
                    amount: appliedOfferDiscount.discountAmount
                } : null
            }
        };

        console.log("Sending verification data:", paymentData);

        const result = await apiClient.post('/payment/verify-payment', paymentData);
        
        console.log("Verification result:", result.data);
        
        toast.dismiss("payment-verify");
        
        if (result.data.success) {
            toast.success('Payment verified & order confirmed!');
            setPaymentCompleted(true);
            setPaymentInitiated(false);
            
            if (statusCheckIntervalRef.current) {
                clearInterval(statusCheckIntervalRef.current);
                statusCheckIntervalRef.current = null;
            }
            
            setTimeout(() => {
                navigate('/history');
            }, 2000);
        } else {
            console.error("Verification failed:", result.data);
            toast.error("Verification failed. Please check order status.");
        }
    } catch (verifyError: any) {
        console.error("Verification API error:", verifyError);
        console.error("Error response:", verifyError.response?.data);
        toast.dismiss("payment-verify");
        
        toast.info("Payment received! Waiting for confirmation...");
    }
};
    

    const handlePaymentInitiated = () => {
        setPaymentInitiated(true);
    };

    const handlePaymentError = () => {
        toast.error('Payment failed. Try again.');
        setPaymentInitiated(false);
    };

    const handleRetry = () => {
        resetPaymentState();
        setPaymentCompleted(false);
        setPaymentInitiated(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-12 w-12 border-b-2 border-purple-600 rounded-full"></div>
            </div>
        );
    }

    const { orderId, orderNumber } = orderData;
    const isPaymentCompleted = paymentStatus === 'paid' || paymentCompleted;

    // Success UI
    if (isPaymentCompleted) {
        return (
            <div className="min-h-screen bg-gray-50 py-10">
                <div className="max-w-md mx-auto">
                    <PaymentStatus
                        status="paid"
                        amount={finalAmount}
                        paymentId={paymentDetails?.razorpayPaymentId}
                        orderNumber={orderNumber}
                    />
                    <div className="mt-6 flex gap-4 justify-center">
                        <button
                            onClick={() => navigate('/history')}
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg"
                        >
                            View Orders
                        </button>
                        <button
                            onClick={() => navigate('/order')}
                            className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg"
                        >
                            New Order
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Waiting UI
    if (paymentInitiated && !isPaymentCompleted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin h-16 w-16 border-b-2 border-purple-600 rounded-full mx-auto"></div>
                    <p className="mt-4">Waiting for payment confirmation...</p>
                    <button onClick={handleRetry} className="mt-4 text-purple-600">
                        Cancel & Retry
                    </button>
                </div>
            </div>
        );
    }

    // Main Checkout UI
    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Checkout</h2>
                    
                    {/* Updating Order Indicator */}
                    {updatingOrder && (
                        <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                            <div className="animate-spin inline-block h-4 w-4 border-b-2 border-yellow-600 rounded-full mr-2"></div>
                            <span className="text-sm text-yellow-700">Updating order...</span>
                        </div>
                    )}
                    
                    {/* Order Details */}
                    <div className="mb-6 space-y-2">
                        <p className="text-gray-600">Order Number: <span className="font-semibold">{orderNumber || 'N/A'}</span></p>
                        <div className="border-t pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-semibold">₹{originalAmount.toFixed(2)}</span>
                            </div>
                            
                            {/* Applied Promo Discount */}
                            {appliedPromoDiscount && (
                                <div className="flex justify-between items-center text-blue-600 mt-2">
                                    <span className="flex items-center gap-1">
                                        <Ticket className="h-4 w-4" />
                                        Promo ({appliedPromoDiscount.code}):
                                    </span>
                                    <span>- ₹{appliedPromoDiscount.discountAmount.toFixed(2)}</span>
                                </div>
                            )}
                            
                            {/* Applied Offer Discount */}
                            {appliedOfferDiscount && (
                                <div className="flex justify-between items-center text-orange-600 mt-2">
                                    <span className="flex items-center gap-1">
                                        <Gift className="h-4 w-4" />
                                        Offer ({appliedOfferDiscount.name}):
                                    </span>
                                    <span>- ₹{appliedOfferDiscount.discountAmount.toFixed(2)}</span>
                                </div>
                            )}
                            
                            {/* Total Discount */}
                            {totalDiscount > 0 && (
                                <div className="flex justify-between items-center text-green-600 mt-2 pt-2 border-t border-dashed">
                                    <span className="font-medium">Total Discount:</span>
                                    <span className="font-bold">- ₹{totalDiscount.toFixed(2)}</span>
                                </div>
                            )}
                            
                            {/* Final Amount */}
                            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                                <span className="text-lg font-bold">Total:</span>
                                <span className="text-2xl font-bold text-purple-600">
                                    ₹{finalAmount.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Promo Codes Section */}
                    {availablePromoCodes.length > 0 && !appliedPromoDiscount && (
                        <div className="mb-6">
                            <button
                                onClick={() => setShowPromoCodes(!showPromoCodes)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
                            >
                                <div className="flex items-center gap-2">
                                    <Ticket className="h-5 w-5 text-blue-600" />
                                    <span className="font-medium text-blue-800">
                                        Available Promo Codes ({availablePromoCodes.length})
                                    </span>
                                </div>
                                {showPromoCodes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </button>
                            
                            {showPromoCodes && (
                                <div className="mt-3 space-y-3 max-h-80 overflow-y-auto">
                                    {promoLoading ? (
                                        <div className="text-center py-4">Loading promo codes...</div>
                                    ) : (
                                        availablePromoCodes.map((promo) => (
                                            <div
                                                key={promo._id}
                                                className="border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer bg-blue-50"
                                                onClick={() => handleApplyPromo(promo)}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Percent className="h-4 w-4 text-blue-600" />
                                                            <h4 className="font-bold text-lg text-blue-800">{promo.code}</h4>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    copyToClipboard(promo.code);
                                                                }}
                                                                className="text-xs bg-blue-200 hover:bg-blue-300 text-blue-800 px-2 py-1 rounded"
                                                            >
                                                                <Copy className="h-3 w-3 inline" /> Copy
                                                            </button>
                                                        </div>
                                                        <p className="text-sm text-gray-700">
                                                            {promo.discountType === 'percentage' 
                                                                ? `${promo.discountValue}% OFF` 
                                                                : `₹${promo.discountValue} OFF`}
                                                            {promo.minOrder > 0 && ` on min order ₹${promo.minOrder}`}
                                                        </p>
                                                        {promo.expiryDate && (
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                Valid till: {new Date(promo.expiryDate).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                                                        Apply
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Offers Section */}
                    {availableOffers.length > 0 && !appliedOfferDiscount && (
                        <div className="mb-6">
                            <button
                                onClick={() => setShowOffers(!showOffers)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg border border-orange-200"
                            >
                                <div className="flex items-center gap-2">
                                    <Gift className="h-5 w-5 text-orange-600" />
                                    <span className="font-medium text-orange-800">
                                        Available Offers ({availableOffers.length})
                                    </span>
                                </div>
                                {showOffers ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </button>
                            
                            {showOffers && (
                                <div className="mt-3 space-y-3 max-h-80 overflow-y-auto">
                                    {offerLoading ? (
                                        <div className="text-center py-4">Loading offers...</div>
                                    ) : (
                                        availableOffers.map((offer) => (
                                            <div
                                                key={offer._id}
                                                className="border-2 border-orange-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer bg-orange-50"
                                                onClick={() => handleApplyOffer(offer)}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-800">{offer.title}</h4>
                                                        <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                                                        <div className="flex gap-2 mt-2">
                                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                                                {offer.discountType === 'percentage' 
                                                                    ? `${offer.discountValue}% OFF` 
                                                                    : `₹${offer.discountValue} OFF`}
                                                            </span>
                                                            {offer.minPurchase > 0 && (
                                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                                                    Min. ₹{offer.minPurchase}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700">
                                                        Apply
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Applied Discounts Summary */}
                    {(appliedPromoDiscount || appliedOfferDiscount) && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <p className="font-semibold text-green-800">Applied Discounts:</p>
                                <button
                                    onClick={handleRemoveAllDiscounts}
                                    className="text-xs text-red-600 hover:text-red-800"
                                >
                                    Remove All
                                </button>
                            </div>
                            {appliedPromoDiscount && (
                                <div className="flex justify-between items-center text-sm mb-2">
                                    <span>Promo Code: <strong>{appliedPromoDiscount.code}</strong></span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600">-₹{appliedPromoDiscount.discountAmount.toFixed(2)}</span>
                                        <button onClick={handleRemovePromo} className="text-red-500 hover:text-red-700">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {appliedOfferDiscount && (
                                <div className="flex justify-between items-center text-sm">
                                    <span>Offer: <strong>{appliedOfferDiscount.name}</strong></span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600">-₹{appliedOfferDiscount.discountAmount.toFixed(2)}</span>
                                        <button onClick={handleRemoveOffer} className="text-red-500 hover:text-red-700">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="mt-2 pt-2 border-t border-green-200 flex justify-between font-bold">
                                <span>Total Savings:</span>
                                <span className="text-green-700">₹{totalDiscount.toFixed(2)}</span>
                            </div>
                        </div>
                    )}

                    {/* Payment Button */}
                    {(!paymentStatus || paymentStatus === 'created' || paymentStatus === 'attempted' || paymentStatus === 'failed') && (
                        <RazorpayButton
                            orderId={orderId}
                            amount={finalAmount}
                            onSuccess={handlePaymentSuccess}
                            onError={handlePaymentError}
                            onPaymentInitiated={handlePaymentInitiated}
                            buttonText={`Pay ₹${finalAmount.toFixed(2)}`}
                        />
                    )}

                    {/* Payment Status Display */}
                    {(() => {
                        if (!paymentStatus) return null;
                        if (paymentInitiated) return null;
                        
                        return (
                            <div className="mt-4">
                                <PaymentStatus
                                    status={paymentStatus}
                                    amount={finalAmount}
                                    paymentId={paymentDetails?.razorpayPaymentId}
                                    orderNumber={orderNumber}
                                    onRetry={handleRetry}
                                    onContactSupport={() => {
                                        toast.info('Please contact support for assistance');
                                    }}
                                />
                            </div>
                        );
                    })()}

                    <p className="text-sm text-center text-gray-500 mt-4">
                        Secure payment powered by Razorpay
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
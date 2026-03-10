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


// src/pages/order/PaymentPage.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import {
  CreditCard,
  IndianRupee,
  ArrowLeft,
  CheckCircle,
  Info,
  Shield,
  Truck,
  Package,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PaymentPage() {
  const navigate = useNavigate();

  // Real cart data
  const realItems = useCartStore((state) => state.items);
  const realSubtotal = useCartStore((state) => state.subtotal());

  // Use real data if available, otherwise fallback to dummy
  const useDummy = realItems.length === 0;

  const items = useDummy ? [
    {
      id: 'dummy-1',
      title: 'Black & White Book Printing (A4)',
      pages: 280,
      copies: 5,
      calculatedPrice: { grandTotal: 420 },
      paperSize: 'A4',
      printColor: 'bw',
      printSide: 'double',
      bindingType: 'perfect_glue',
    },
    {
      id: 'dummy-2',
      title: 'Color Textbook with Glossy Cover (6×9)',
      pages: 180,
      copies: 3,
      calculatedPrice: { grandTotal: 1150 },
      paperSize: '6x9',
      printColor: 'color',
      printSide: 'double',
      bindingType: 'hard_bound',
    },
  ] : realItems;

  const subtotal = useDummy ? items.reduce((sum, item) => sum + (item.calculatedPrice?.grandTotal || 0) * item.copies, 0) : realSubtotal;

  // Delivery type – hardcoded for demo (you can make dynamic later)
  const deliveryType: 'pickup' | 'courier' = 'courier';

  // Dummy personal info (shown only in dummy mode)
  const name = useDummy ? 'Sushant Kumar' : '';
  const phone = useDummy ? '+91 98765 43210' : '';

  const gst = subtotal * 0.05;
  const shipping = deliveryType === 'courier' ? 80 : 0;
  const grandTotal = subtotal + gst + shipping;

  const handlePayNow = () => {
    alert(
      `Processing payment of ₹${grandTotal.toFixed(2)} via Razorpay...\n\n` +
      `Order ID: BP${Date.now().toString().slice(-8)}\n` +
      (useDummy ? '(This is demo data – real payment would use actual order)' : '')
    );
    // Real Razorpay code can go here later
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Progress Steps */}
      <section className="relative bg-secondary py-12 md:py-24">
  <div className="absolute inset-0 opacity-5 pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
        backgroundSize: '20px 20px',
      }}
    />
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
    <div className="text-center">
      <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
        <CreditCard className="h-5 w-5 text-primary" />
        Secure Payment
      </div>
      <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
        Complete Your Payment
      </h1>
      <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto">
        Review your order total and pay securely with Razorpay — your prints will be processed immediately after confirmation.
      </p>
    </div>
  </div>
</section>


      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {useDummy && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-center text-amber-800">
            <Info className="h-5 w-5 inline mr-2" />
            <strong>Demo Mode Active:</strong> Showing dummy order data (real cart is empty)
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Payment Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
              <div className="bg-secondary px-6 py-6">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <CreditCard className="h-7 w-7" />
                  Secure Payment
                </h2>
                <p className="text-white/80 mt-2 text-lg">
                  Pay ₹{grandTotal.toFixed(2)} securely with Razorpay
                </p>
              </div>

              <div className="p-6 md:p-8">
                {/* Amount Highlight */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-10 text-center border border-primary/20 shadow-inner">
                  <p className="text-muted-foreground text-base mb-3">Amount to Pay</p>
                  <p className="text-5xl md:text-6xl font-black text-primary tracking-tight">
                    ₹{grandTotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Inclusive of GST • {deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup'}
                  </p>
                </div>

                {/* Payment Methods */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-5">Select Payment Method</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {['UPI', 'Credit / Debit Card', 'Net Banking', 'Wallets', 'EMI', 'Cash on Delivery'].map(
                        (method) => (
                          <button
                            key={method}
                            className="p-5 border-2 border-border rounded-xl text-center hover:border-primary hover:bg-primary/5 transition-all duration-300 group shadow-sm hover:shadow-md"
                          >
                            <div className="text-3xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                              {method.includes('UPI') ? 'UPI' : method.includes('Card') ? '💳' : method.includes('Net') ? '🏦' : '💰'}
                            </div>
                            <span className="text-base font-semibold group-hover:text-primary transition-colors">
                              {method}
                            </span>
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* UPI Quick Pay */}
                  <div className="bg-muted/40 rounded-2xl p-7 border border-border">
                    <h4 className="font-bold text-xl text-foreground mb-4 flex items-center gap-3">
                      <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        <path d="M13.5 7h-3v2H9v2h1.5v6h3v-6H15v-2h-1.5z" />
                      </svg>
                      Quick UPI Payment
                    </h4>

                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full px-5 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg mb-6"
                    />

                    <button
                      onClick={handlePayNow}
                      className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] text-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      Pay ₹{grandTotal.toFixed(2)} Now <CheckCircle className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Demo Notice */}
                  <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
                    <Info className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
                    <p className="text-base text-amber-800">
                      This is a demo payment interface. In production, clicking "Pay Now" will open the real Razorpay checkout window.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Navigation */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 border-2 border-border text-foreground font-semibold py-5 rounded-xl hover:bg-muted transition-all duration-200 flex items-center justify-center gap-3 text-lg"
              >
                <ArrowLeft className="h-5 w-5" /> Back to Review
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl border border-border sticky top-6 overflow-hidden">
              <div className="bg-secondary px-6 py-6">
                <h3 className="text-xl font-black text-white flex items-center gap-3">
                  <Package className="h-6 w-6" />
                  Order Summary
                </h3>
              </div>

              <div className="p-6 space-y-5 text-base">
                <div className="flex justify-between text-muted-foreground">
                  <span>Items in Order</span>
                  <span className="font-semibold text-foreground">{items.length}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Name</span>
                  <span className="font-medium truncate max-w-[60%]">{name || '—'}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Phone</span>
                  <span className="font-medium">{phone || '—'}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className="font-medium">
                    {deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup'}
                  </span>
                </div>

                <div className="border-t border-border pt-5 mt-2 space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>GST (5%)</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                      {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-2xl font-black pt-4 border-t">
                    <span className="text-foreground">Total Payable</span>
                    <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-6 text-sm text-muted-foreground text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>100% Secure & Encrypted Payment</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    <span>Pan-India Delivery • Official GST Invoice</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
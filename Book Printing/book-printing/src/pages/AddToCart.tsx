





// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   ShoppingCart, Trash2, Plus, Minus, ArrowRight, Shield, Truck, 
//   CheckCircle, Printer, Package, FileText, Loader2
// } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { paperTypeLabels, bindingLabels, calculatePrice } from '@/lib/pricingData';
// import { toast } from 'sonner';

// interface CartItem {
//   _id: string;
//   pages: number;
//   copies: number;
//   paperSize?: string;
//   paperType?: string;
//   printColor?: 'bw' | 'color';
//   printSide?: 'single' | 'double';
//   bindingType?: string;
//   lamination?: string;
//   instructions?: string;
//   files?: Array<{
//     _id: string;
//     name: string;
//     size: number;
//     type: string;
//     status: string;
//   }>;
// }

// interface CartData {
//   items: CartItem[];
//   customer: {
//     name?: string;
//     phone?: string;
//     address?: string;
//     pincode?: string;
//     city?: string;
//     state?: string;
//   };
//   orderMode: 'single' | 'bulk';
//   deliveryType: 'pickup' | 'courier';
//   totals: {
//     printingCost: number;
//     gst: number;
//     totalWithDelivery: number;
//   };
// }

// // ✅ API with auth header
// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default function Cart() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [cartData, setCartData] = useState<CartData | null>(null);
//   const [isUpdating, setIsUpdating] = useState(false);

//   // ✅ Fetch cart on mount
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get('/cart');
//       console.log("Fetched cart:", response.data);
//       setCartData(response.data);
//     } catch (error: any) {
//       console.error("Error fetching cart:", error);
//       if (error.response?.status === 401) {
//         navigate('/login');
//       }
//       toast.error("Failed to load cart");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Calculate price for a single item using the same pricing function as order page
//   const calculateItemPrice = (item: CartItem) => {
//     try {
//       const priceData = calculatePrice({
//         pages: item.pages,
//         copies: item.copies,
//         paperSize: item.paperSize as any,
//         paperType: item.paperType as any,
//         printColor: item.printColor as any,
//         printSide: item.printSide as any,
//         bindingType: item.bindingType as any,
//       });
//       return priceData;
//     } catch (error) {
//       console.error("Error calculating price:", error);
//       return {
//         totalCost: 0,
//         grandTotal: 0,
//         pricePerPage: 0,
//         printingCost: 0,
//         bindingCost: 0,
//         gst: 0
//       };
//     }
//   };

//   // ✅ Update quantity
//   const updateQuantity = async (_id: string, newQty: number) => {
//     if (newQty < 1) return;
    
//     setIsUpdating(true);
//     try {
//       const response = await API.put(`/cart/item/${_id}`, { copies: newQty });
//       setCartData(response.data);
//       toast.success("Quantity updated");
//     } catch (error: any) {
//       console.error("Update failed:", error);
//       toast.error(error.response?.data?.message || "Failed to update quantity");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   // ✅ Remove item
//   const removeItem = async (_id: string) => {
//     setIsUpdating(true);
//     try {
//       await API.delete(`/cart/item/${_id}`);
//       const response = await API.get('/cart');
//       const updatedCart = response.data;
      
//       if (updatedCart.items && updatedCart.items.length > 0) {
//         setCartData(updatedCart);
//         toast.success("Item removed");
//       } else {
//         setCartData(null);
//         toast.success("Item removed");
//       }
//     } catch (error: any) {
//       console.error("Delete failed:", error);
//       toast.error("Failed to remove item");
//       fetchCart();
//     } finally {
//       setIsUpdating(false);
//     }
//   };


// const handleCheckout = async () => {
//   try {
//     if (!cartData) {
//       toast.error("Cart is empty");
//       return;
//     }

//     const payload = {
//       items: cartData.items,
//       customer: cartData.customer,
//       deliveryType: cartData.deliveryType,
//       orderMode: cartData.orderMode,
//       totalAmount: calculatedTotals?.grandTotal || total // ✅ FIXED KEY
//     };

//     console.log("Creating order with payload:", payload);

//     const res = await API.post('/order/create-from-cart', payload);

//     const orderData = res.data;

//     console.log("Created Order:", orderData);

//     // ✅ FIX: correct structure
//     const order = orderData.order;

//     if (!order?._id) {
//       throw new Error("Order ID missing from response");
//     }

//     // ✅ Save for payment page
//     localStorage.setItem("pendingOrder", JSON.stringify({
//       orderId: order._id,
//       amount: order.totalAmount,
//       orderNumber: order.orderNumber
//     }));

//     navigate('/checkout', {
//       state: {
//         orderId: order._id,
//         amount: order.totalAmount,
//         orderNumber: order.orderNumber
//       }
//     });

//   } catch (error: any) {
//     console.error("Checkout failed:", error);
//     toast.error(error.response?.data?.message || "Checkout failed");
//   }
// };



//   // ✅ Clear entire cart
//   const clearCart = async () => {
//     if (!window.confirm('Are you sure you want to clear your cart?')) return;
    
//     setIsUpdating(true);
//     try {
//       await API.delete('/cart');
//       setCartData(null);
//       toast.success("Cart cleared");
//     } catch (error: any) {
//       console.error("Clear failed:", error);
//       toast.error("Failed to clear cart");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   // ✅ Check if cart has items
//   const hasItems = cartData !== null && cartData.items && cartData.items.length > 0;

//   // Show loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center">
//             <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
//             <p className="text-muted-foreground">Loading your cart...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   // ✅ Show empty state when no items
//   if (!hasItems) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center max-w-md">
//             <ShoppingCart className="h-20 w-20 mx-auto mb-6 text-muted-foreground/70" strokeWidth={1.2} />
//             <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
//             <p className="text-muted-foreground mb-8">
//               You haven't added any printing orders yet.
//             </p>
//             <Link
//               to="/order"
//               className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 text-lg shadow-md transition-all duration-300 hover:scale-105"
//             >
//               Start New Order <ArrowRight className="h-5 w-5" />
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const total = cartData?.totals?.totalWithDelivery || 0;
//   const printingCost = cartData?.totals?.printingCost || 0;
//   const gst = cartData?.totals?.gst || 0;
//   const isBulk = cartData?.orderMode === 'bulk';
//   const deliveryType = cartData?.deliveryType || 'pickup';
//   const customer = cartData?.customer || {};

//   // Calculate totals using actual pricing function
//   const calculatedTotals = cartData?.items.reduce((sum, item) => {
//     const price = calculateItemPrice(item);
//     return {
//       printingCost: sum.printingCost + price.printingCost,
//       bindingCost: sum.bindingCost + price.bindingCost,
//       totalCost: sum.totalCost + price.totalCost,
//       gst: sum.gst + price.gst,
//       grandTotal: sum.grandTotal + price.grandTotal
//     };
//   }, { printingCost: 0, bindingCost: 0, totalCost: 0, gst: 0, grandTotal: 0 });

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       {/* Header Section */}
//       <section className="relative bg-secondary py-12 md:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center">
//             <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
//               <ShoppingCart className="h-5 w-5" />
//               Your Order Cart
//             </div>
//             <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
//               Review Your Printing Order
//             </h1>
//             <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto">
//               Modify quantities, remove items, or proceed to secure checkout
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="py-12 md:py-16 bg-background">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
//             {/* LEFT - Items List */}
//             <div className="lg:col-span-8 space-y-6">
              
//               {/* Customer & Delivery Info Card */}
//               <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
//                 <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
//                   <Package className="h-5 w-5 text-primary" />
//                   Customer & Delivery Details
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Name</span>
//                     <p className="font-medium text-foreground mt-1">{customer.name || '—'}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Phone</span>
//                     <p className="font-medium text-foreground mt-1">{customer.phone || '—'}</p>
//                   </div>
//                   <div className="sm:col-span-2">
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Method</span>
//                     <p className="font-medium text-foreground mt-1 flex items-center gap-2">
//                       {deliveryType === 'courier' ? (
//                         <>
//                           <Truck className="h-4 w-4 text-primary" />
//                           Courier Delivery
//                         </>
//                       ) : (
//                         <>
//                           <Package className="h-4 w-4 text-primary" />
//                           Store Pickup
//                         </>
//                       )}
//                     </p>
//                   </div>
//                   {deliveryType === 'courier' && customer.address && (
//                     <>
//                       <div className="sm:col-span-2">
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Address</span>
//                         <p className="font-medium text-foreground mt-1">{customer.address}</p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Pincode / City</span>
//                         <p className="font-medium text-foreground mt-1">
//                           {customer.pincode} {customer.city ? `, ${customer.city}` : ''}
//                         </p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">State</span>
//                         <p className="font-medium text-foreground mt-1">{customer.state || '—'}</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Order Items */}
//               {cartData?.items && cartData.items.length > 0 && cartData.items.map((item, index) => {
//                 const itemTitle = item.paperSize
//                   ? `${item.paperSize} • ${item.printColor?.toUpperCase()} • ${item.printSide} side`
//                   : `Custom Print Job ${index + 1}`;
                
//                 const files = item.files || [];
//                 const priceData = calculateItemPrice(item);

//                 return (
//                   <div
//                     key={item._id}
//                     className="bg-white rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6">
//                       {/* Thumbnail/Icon */}
//                       <div className="w-full sm:w-32 md:w-40 h-40 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center shrink-0">
//                         <Printer className="h-12 w-12 text-primary/60" strokeWidth={1.5} />
//                       </div>

//                       <div className="flex-1 flex flex-col">
//                         <div className="flex justify-between items-start gap-4 mb-3">
//                           <h3 className="font-bold text-lg md:text-xl leading-tight text-foreground">
//                             {itemTitle}
//                           </h3>
//                           <button
//                             onClick={() => removeItem(item._id)}
//                             disabled={isUpdating}
//                             className="text-red-500 hover:text-red-700 p-1.5 -mr-1.5 transition-colors disabled:opacity-50"
//                             aria-label="Remove item"
//                           >
//                             <Trash2 className="h-5 w-5" />
//                           </button>
//                         </div>

//                         <div className="text-sm text-muted-foreground mb-4 space-y-1">
//                           <p className="font-medium text-foreground">
//                             {item.pages} pages × {item.copies} copies
//                           </p>
//                           <p>
//                             {paperTypeLabels[item.paperType || ''] || item.paperType || '—'} •{' '}
//                             {item.printColor === 'bw' ? 'B&W' : 'Color'} •{' '}
//                             {item.printSide === 'double' ? 'Double' : 'Single'} sided
//                           </p>
//                           <p>
//                             Binding: {bindingLabels[item.bindingType || ''] || item.bindingType || '—'}
//                           </p>
//                           {item.lamination && item.lamination !== 'none' && (
//                             <p>Lamination: {item.lamination.charAt(0).toUpperCase() + item.lamination.slice(1)}</p>
//                           )}
//                         </div>

//                         {/* Uploaded files list */}
//                         {files.length > 0 && (
//                           <div className="mb-4 text-xs">
//                             <p className="text-muted-foreground mb-1 flex items-center gap-1">
//                               <FileText className="h-3 w-3" />
//                               Uploaded Files:
//                             </p>
//                             <ul className="space-y-1">
//                               {files.map(f => (
//                                 <li key={f._id} className="flex items-center gap-2 text-muted-foreground">
//                                   <FileText className="h-3 w-3 text-primary/70" />
//                                   <span className="truncate max-w-[200px]">{f.name}</span>
//                                   <span className="text-xs">
//                                     ({(f.size / 1024 / 1024).toFixed(1)} MB)
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                         <div className="mt-auto flex flex-wrap justify-between items-center gap-4 pt-2">
//                           <div className="flex border border-border rounded-lg overflow-hidden bg-muted/30">
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies - 1)}
//                               disabled={isUpdating || item.copies <= 1}
//                               className="px-4 py-2 hover:bg-muted transition-colors disabled:opacity-50"
//                             >
//                               <Minus className="h-4 w-4" />
//                             </button>
//                             <span className="px-5 py-2 font-semibold min-w-[3.5rem] text-center bg-white">
//                               {item.copies}
//                             </span>
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies + 1)}
//                               disabled={isUpdating}
//                               className="px-4 py-2 hover:bg-muted transition-colors"
//                             >
//                               <Plus className="h-4 w-4" />
//                             </button>
//                           </div>

//                           <div className="text-right">
//                             <div className="text-lg font-bold text-primary">
//                               ₹{priceData.grandTotal.toFixed(2)}
//                             </div>
//                             <div className="text-xs text-muted-foreground">
//                               ₹{priceData.pricePerPage.toFixed(2)}/page • ₹{priceData.bindingCost.toFixed(2)} binding
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}

//               {/* Footer Actions */}
//               <div className="flex justify-between items-center pt-4">
//                 <Link
//                   to="/order"
//                   className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group"
//                 >
//                   <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
//                   Continue Adding Orders
//                 </Link>
                
//                 <button
//                   onClick={clearCart}
//                   disabled={isUpdating}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50 transition-colors"
//                 >
//                   Clear Cart
//                 </button>
//               </div>
//             </div>

//             {/* RIGHT - Order Summary */}
//             <div className="lg:col-span-4">
//               <div className="bg-white rounded-xl shadow-lg border p-6 md:p-8 sticky top-6">
//                 <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
//                   <Package className="h-6 w-6 text-primary" />
//                   Order Summary
//                 </h2>

//                 <div className="space-y-4 text-sm">
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Items</span>
//                     <span className="font-semibold">{cartData?.items.length || 0}</span>
//                   </div>

//                   <div className="flex justify-between py-2 border-t">
//                     <span className="text-muted-foreground">Printing Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.printingCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Binding Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.bindingCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Subtotal</span>
//                     <span className="font-semibold">₹{calculatedTotals?.totalCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">GST (5%)</span>
//                     <span className="font-semibold">₹{calculatedTotals?.gst.toFixed(2) || '0.00'}</span>
//                   </div>

//                   {deliveryType === 'courier' && (
//                     <div className="flex justify-between py-2 border-t">
//                       <span className="text-muted-foreground">Delivery Charges</span>
//                       <span className="font-semibold text-green-600">Free</span>
//                     </div>
//                   )}

//                   <div className="border-t border-border pt-5 mt-4">
//                     <div className="flex justify-between items-center text-lg font-bold">
//                       <span className="text-foreground">Total Amount</span>
//                       <span className="text-primary text-2xl font-black">
//                         ₹{calculatedTotals?.grandTotal.toFixed(2) || total.toFixed(2)}
//                       </span>
//                     </div>
//                     <p className="text-xs text-muted-foreground text-center mt-2">
//                       Inclusive of all taxes
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-8 space-y-4">
//                   {/* <button
//                     // onClick={() => navigate('/checkout')}
// //                     

//                     className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5 group"
//                   >
//                     Proceed to Checkout 
//                     <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                   </button> */}

//                   <button
//   onClick={handleCheckout}
//   disabled={isUpdating}
//   className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5 group"
// >
//   Proceed to Checkout 
//   <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
// </button>

//                   <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
//                     <Shield className="h-4 w-4" />
//                     Secure checkout with Razorpay
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-6 border-t text-xs text-muted-foreground space-y-2">
//                   <div className="flex items-start gap-2">
//                     <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>GST invoice provided for every order</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>Pan-India delivery • Tracking provided</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   ShoppingCart, Trash2, Plus, Minus, ArrowRight, Shield, Truck, 
//   CheckCircle, Printer, Package, FileText, Clock, Zap, MapPin, 
//   AlertCircle, Edit2, X, Save
// } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { paperTypeLabels, bindingLabels, calculatePrice } from '@/lib/pricingData';
// import { toast } from 'sonner';

// interface CartItem {
//   _id: string;
//   pages: number;
//   copies: number;
//   paperSize?: string;
//   paperType?: string;
//   printColor?: 'bw' | 'color';
//   printSide?: 'single' | 'double';
//   bindingType?: string;
//   lamination?: string;
//   instructions?: string;
//   files?: Array<{
//     _id: string;
//     name: string;
//     size: number;
//     type: string;
//     status: string;
//   }>;
// }

// interface CartData {
//   items: CartItem[];
//   customer: {
//     name?: string;
//     phone?: string;
//     address?: string;
//     pincode?: string;
//     city?: string;
//     state?: string;
//     landmark?: string;
//     addressType?: 'Home' | 'Office';
//   };
//   orderMode: 'single' | 'bulk';
//   deliveryType: 'pickup' | 'courier';
//   deliveryPartner?: number;
//   deliveryCharge?: number;
//   totals: {
//     printingCost: number;
//     gst: number;
//     totalWithDelivery: number;
//   };
// }

// interface Courier {
//   id: number;
//   courierId: number;
//   courierName: string;
//   shippingCharge: number;
//   codCharge?: number;
//   rtoCharge?: number;
//   serviceMode?: string;
//   zoneName?: string;
//   expectedDelivery?: string;
// }

// // Calculate total weight of order (in kg for shipping API)
// // const calculateOrderWeight = (items: CartItem[]): number => {
// //   let totalWeightKg = 0;
  
// //   items.forEach(item => {
// //     const pagesWeight = (item.pages * item.copies * 5) / 1000;
// //     const bindingWeight = (50 * item.copies) / 1000;
// //     totalWeightKg += pagesWeight + bindingWeight;
// //   });
  
// //   totalWeightKg += 0.1;
// //   return Math.max(0.1, Math.round(totalWeightKg * 100) / 100);
// // };

// // const formatWeight = (kg: number): string => {
// //   if (kg >= 1) return `${kg.toFixed(2)} kg`;
// //   return `${(kg * 1000).toFixed(0)} g`;
// // };
// const calculateOrderWeight = (items: CartItem[]): number => {
//   let totalWeightKg = 0;

//   items.forEach(item => {
//     // Pages weight (5g per page)
//     const pagesWeight = (item.pages * item.copies * 5) / 1000;

//     // Binding weight ONLY if selected
//     const bindingWeight = item.bindingType
//       ? (50 * item.copies) / 1000
//       : 0;

//     totalWeightKg += pagesWeight + bindingWeight;
//   });

//   // Add packaging weight (100g)
//   totalWeightKg += 0.1;

//   // Minimum 100g, round to 2 decimal places
//   return Math.max(0.1, Math.round(totalWeightKg * 100) / 100);
// };

// const formatWeight = (kg: number): string => {
//   return kg >= 1
//     ? `${kg.toFixed(2)} kg`
//     : `${(kg * 1000).toFixed(0)} g`;
// };

// // ✅ API with auth header
// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'https://bookprinters.in/api/api',
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default function Cart() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [cartData, setCartData] = useState<CartData | null>(null);
//   const [selectedPartner, setSelectedPartner] = useState<number | null>(null);
//   const [updatingPartner, setUpdatingPartner] = useState(false);
//   const [serviceable, setServiceable] = useState<boolean | null>(null);
//   const [checkingServiceability, setCheckingServiceability] = useState(false);
//   const [availableCouriers, setAvailableCouriers] = useState<Courier[]>([]);
//   const [deliveryCharge, setDeliveryCharge] = useState<number>(0);
//   const [serviceabilityMessage, setServiceabilityMessage] = useState<string>('');
//   const [autoSelectInProgress, setAutoSelectInProgress] = useState(false);
  
//   // Address edit modal states
//   const [showAddressModal, setShowAddressModal] = useState(false);
//   const [editingAddress, setEditingAddress] = useState({
//     address: '',
//     pincode: '',
//     city: '',
//     state: '',
//     landmark: '',
//     addressType: 'Home' as 'Home' | 'Office'
//   });
//   const [updatingAddress, setUpdatingAddress] = useState(false);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   useEffect(() => {
//     if (cartData?.deliveryPartner) {
//       setSelectedPartner(cartData.deliveryPartner);
//     }
//   }, [cartData]);

//   useEffect(() => {
//     if (cartData?.deliveryType === 'courier' && cartData?.customer?.pincode && cartData?.items?.length > 0) {
//       checkServiceability();
//     }
//   }, [cartData?.customer?.pincode, cartData?.items]);

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get('/cart');
      
//       if (response.data && response.data.items && response.data.items.length > 0) {
//         setCartData(response.data);
//         if (response.data.deliveryPartner) {
//           setSelectedPartner(response.data.deliveryPartner);
//         }
//         if (response.data.deliveryCharge) {
//           setDeliveryCharge(response.data.deliveryCharge);
//         }
//       } else {
//         setCartData(null);
//       }
//     } catch (error: any) {
//       console.error("Error fetching cart:", error);
//       if (error.response?.status === 401) {
//         navigate('/login');
//       }
//       toast.error("Failed to load cart");
//       setCartData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Auto-select cheapest courier
//   const autoSelectCheapestCourier = async (couriers: Courier[]) => {
//     if (autoSelectInProgress) return;
    
//     setAutoSelectInProgress(true);
    
//     try {
//       if (couriers.length === 0) {
//         console.log('No couriers available for auto-selection');
//         return;
//       }
      
//       // Find cheapest courier
//       const cheapest = couriers.reduce((min, curr) => 
//         curr.shippingCharge < min.shippingCharge ? curr : min
//       );
      
//       console.log(`Auto-selecting cheapest courier: ${cheapest.courierName} (₹${cheapest.shippingCharge})`);
      
//       // Update state
//       setSelectedPartner(cheapest.id);
//       setDeliveryCharge(cheapest.shippingCharge);
      
//       // Update in backend
//       await API.put('/cart/delivery-partner', { 
//         deliveryPartner: cheapest.id,
//         deliveryCharge: cheapest.shippingCharge
//       });
      
//       // Refresh cart data to reflect changes
//       await fetchCart();
      
//       toast.success(`Delivery partner auto-selected: ${cheapest.courierName}`, {
//         duration: 3000,
//         icon: '🚚'
//       });
      
//     } catch (error: any) {
//       console.error("Failed to auto-select courier:", error);
//       // Don't show error toast for auto-selection failure
//     } finally {
//       setAutoSelectInProgress(false);
//     }
//   };

//   const checkServiceability = async () => {
//     if (!cartData?.customer?.pincode) return;
    
//     setCheckingServiceability(true);
//     setServiceable(null);
    
//     try {
//       const weight = calculateOrderWeight(cartData.items);
//       const response = await API.post('/shipping/check-delivery', {
//         pincode: cartData.customer.pincode,
//         warehousePincode: '305001',
//         weight: weight
//       });
      
//       if (response.data.success && response.data.data) {
//         const result = response.data.data;
//         setServiceable(result.serviceable);
//         setServiceabilityMessage(result.message);
        
//         if (result.serviceable && result.couriers?.list) {
//           // Map couriers to our format
//           const couriers = result.couriers.list.map((c: any) => ({
//             id: c.courierId,
//             courierId: c.courierId,
//             courierName: c.courierName,
//             shippingCharge: parseFloat(c.shippingCharge),
//             serviceMode: c.serviceMode,
//             zoneName: c.zoneName,
//             expectedDelivery: c.expectedDelivery
//           }));
          
//           setAvailableCouriers(couriers);
          
//           // AUTO-SELECT CHEAPEST COURIER (System handles it)
//           await autoSelectCheapestCourier(couriers);
          
//         } else {
//           setAvailableCouriers([]);
//           setDeliveryCharge(0);
//         }
//       } else {
//         setServiceable(false);
//         setServiceabilityMessage(response.data.message || 'Unable to check delivery');
//         setAvailableCouriers([]);
//       }
//     } catch (error: any) {
//       console.error("Serviceability check failed:", error);
//       setServiceable(false);
//       setServiceabilityMessage(error.response?.data?.message || 'Failed to check delivery availability');
//       setAvailableCouriers([]);
//     } finally {
//       setCheckingServiceability(false);
//     }
//   };

//   const updateDeliveryAddress = async () => {
//     if (!cartData) return;
    
//     setUpdatingAddress(true);
    
//     try {
//       // Validate pincode
//       if (!editingAddress.pincode || editingAddress.pincode.length !== 6) {
//         toast.error('Please enter a valid 6-digit pincode');
//         return;
//       }
      
//       if (!editingAddress.address) {
//         toast.error('Please enter your address');
//         return;
//       }
      
//       if (!editingAddress.city) {
//         toast.error('Please enter your city');
//         return;
//       }
      
//       if (!editingAddress.state) {
//         toast.error('Please enter your state');
//         return;
//       }
      
//       // Update address in cart
//       const response = await API.put('/cart/address', {
//         address: editingAddress.address,
//         pincode: editingAddress.pincode,
//         city: editingAddress.city,
//         state: editingAddress.state,
//         landmark: editingAddress.landmark,
//         addressType: editingAddress.addressType
//       });
      
//       if (response.data && response.data.cart) {
//         setCartData(response.data.cart);
//         setShowAddressModal(false);
//         toast.success('Delivery address updated successfully');
        
//         // Reset courier selection before re-checking
//         setSelectedPartner(null);
//         setDeliveryCharge(0);
//         setAvailableCouriers([]);
        
//         // Re-check serviceability with new pincode (this will auto-select new cheapest)
//         setTimeout(() => checkServiceability(), 500);
//       }
//     } catch (error: any) {
//       console.error("Failed to update address:", error);
//       toast.error(error.response?.data?.message || "Failed to update address");
//     } finally {
//       setUpdatingAddress(false);
//     }
//   };

//   const openAddressModal = () => {
//     if (cartData?.customer) {
//       setEditingAddress({
//         address: cartData.customer.address || '',
//         pincode: cartData.customer.pincode || '',
//         city: cartData.customer.city || '',
//         state: cartData.customer.state || '',
//         landmark: cartData.customer.landmark || '',
//         addressType: cartData.customer.addressType || 'Home'
//       });
//     }
//     setShowAddressModal(true);
//   };

//   const calculateItemPrice = (item: CartItem) => {
//     try {
//       const priceData = calculatePrice({
//         pages: item.pages,
//         copies: item.copies,
//         paperSize: item.paperSize as any,
//         paperType: item.paperType as any,
//         printColor: item.printColor as any,
//         printSide: item.printSide as any,
//         bindingType: item.bindingType as any,
//       });
//       return priceData;
//     } catch (error) {
//       console.error("Error calculating price:", error);
//       return {
//         totalCost: 0,
//         grandTotal: 0,
//         pricePerPage: 0,
//         printingCost: 0,
//         bindingCost: 0,
//         gst: 0
//       };
//     }
//   };

//   const updateQuantity = async (_id: string, newQty: number) => {
//     if (newQty < 1) return;
    
//     const previousCartData = cartData;
    
//     try {
//       if (cartData) {
//         const updatedItems = cartData.items.map(item => 
//           item._id === _id ? { ...item, copies: newQty } : item
//         );
//         setCartData({ ...cartData, items: updatedItems });
//       }
      
//       const response = await API.put(`/cart/item/${_id}`, { copies: newQty });
      
//       if (response.data && response.data.items) {
//         setCartData(response.data);
//       }
      
//       // Re-check serviceability as weight changed
//       await checkServiceability();
//       toast.success("Quantity updated");
//     } catch (error: any) {
//       console.error("Update failed:", error);
//       setCartData(previousCartData);
//       toast.error(error.response?.data?.message || "Failed to update quantity");
//     }
//   };

//   const removeItem = async (_id: string) => {
//     const previousCartData = cartData;
    
//     try {
//       if (cartData) {
//         const updatedItems = cartData.items.filter(item => item._id !== _id);
//         if (updatedItems.length > 0) {
//           setCartData({ ...cartData, items: updatedItems });
//         } else {
//           setCartData(null);
//         }
//       }
      
//       await API.delete(`/cart/item/${_id}`);
      
//       if (cartData && cartData.items.length > 1) {
//         await checkServiceability();
//       }
      
//       toast.success("Item removed");
//     } catch (error: any) {
//       console.error("Delete failed:", error);
//       setCartData(previousCartData);
//       toast.error(error.response?.data?.message || "Failed to remove item");
//     }
//   };

//   const handleCheckout = async () => {
//     try {
//       if (!cartData) {
//         toast.error("Cart is empty");
//         return;
//       }

//       if (cartData.deliveryType === 'courier') {
//         if (!cartData.customer?.pincode || !cartData.customer?.address) {
//           toast.error("Please add your delivery address");
//           openAddressModal();
//           return;
//         }
        
//         if (!selectedPartner) {
//           toast.error("No delivery partner available for your location");
//           return;
//         }
        
//         if (!serviceable) {
//           toast.error("Delivery not available to your pincode");
//           return;
//         }
//       }

//       const payload = {
//         items: cartData.items,
//         customer: cartData.customer,
//         deliveryType: cartData.deliveryType,
//         deliveryPartner: cartData.deliveryType === 'courier' ? selectedPartner : undefined,
//         deliveryCharge: cartData.deliveryType === 'courier' ? deliveryCharge : 0,
//         orderWeight: calculateOrderWeight(cartData.items),
//         orderMode: cartData.orderMode,
//         totalAmount: finalTotal
//       };

//       const res = await API.post('/order/create-from-cart', payload);
//       const orderData = res.data;
//       const order = orderData.order;

//       if (!order?._id) {
//         throw new Error("Order ID missing from response");
//       }

//       localStorage.setItem("pendingOrder", JSON.stringify({
//         orderId: order._id,
//         amount: finalTotal,
//         orderNumber: order.orderNumber,
//         deliveryPartner: selectedPartner,
//         deliveryCharge: deliveryCharge
//       }));

//       navigate('/checkout', {
//         state: {
//           orderId: order._id,
//           amount: finalTotal,
//           orderNumber: order.orderNumber,
//           deliveryPartner: selectedPartner,
//           deliveryCharge: deliveryCharge
//         }
//       });

//     } catch (error: any) {
//       console.error("Checkout failed:", error);
//       toast.error(error.response?.data?.message || "Checkout failed");
//     }
//   };

//   const clearCart = async () => {
//     if (!window.confirm('Are you sure you want to clear your cart?')) return;
    
//     const previousCartData = cartData;
    
//     try {
//       setCartData(null);
//       await API.delete('/cart');
//       toast.success("Cart cleared");
//     } catch (error: any) {
//       console.error("Clear failed:", error);
//       setCartData(previousCartData);
//       toast.error("Failed to clear cart");
//     }
//   };

//   const calculatedTotals = cartData?.items.reduce((sum, item) => {
//     const price = calculateItemPrice(item);
//     return {
//       printingCost: sum.printingCost + price.printingCost,
//       bindingCost: sum.bindingCost + price.bindingCost,
//       totalCost: sum.totalCost + price.totalCost,
//       gst: sum.gst + price.gst,
//       grandTotal: sum.grandTotal + price.grandTotal
//     };
//   }, { printingCost: 0, bindingCost: 0, totalCost: 0, gst: 0, grandTotal: 0 });

//   const total = cartData?.totals?.totalWithDelivery || 0;
//   const deliveryType = cartData?.deliveryType || 'pickup';
//   const customer = cartData?.customer || {};
//   const hasItems = cartData !== null && cartData.items && cartData.items.length > 0;
//   const orderWeight = hasItems ? calculateOrderWeight(cartData.items) : 0;
//   const finalTotal = (calculatedTotals?.grandTotal || 0) + deliveryCharge;

//   // Get selected courier details for display
//   const selectedCourierDetails = selectedPartner 
//     ? availableCouriers.find(c => c.id === selectedPartner)
//     : null;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center">
//             <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
//             <p className="text-muted-foreground">Loading your cart...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (!hasItems) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center max-w-md">
//             <ShoppingCart className="h-20 w-20 mx-auto mb-6 text-muted-foreground/70" strokeWidth={1.2} />
//             <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
//             <p className="text-muted-foreground mb-8">
//               You haven't added any printing orders yet.
//             </p>
//             <Link
//               to="/order"
//               className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 text-lg shadow-md transition-all duration-300 hover:scale-105"
//             >
//               Start New Order <ArrowRight className="h-5 w-5" />
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

//       {/* Address Edit Modal */}
//       {showAddressModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-bold">Edit Delivery Address</h3>
//                 <button onClick={() => setShowAddressModal(false)} className="p-1 hover:bg-gray-100 rounded">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Address *</label>
//                   <textarea
//                     value={editingAddress.address}
//                     onChange={(e) => setEditingAddress({...editingAddress, address: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
//                     rows={3}
//                     placeholder="Street address, apartment, building"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Landmark (Optional)</label>
//                   <input
//                     type="text"
//                     value={editingAddress.landmark}
//                     onChange={(e) => setEditingAddress({...editingAddress, landmark: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="Near some landmark"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Pincode *</label>
//                   <input
//                     type="text"
//                     value={editingAddress.pincode}
//                     onChange={(e) => setEditingAddress({...editingAddress, pincode: e.target.value.replace(/\D/g, '').slice(0, 6)})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="6-digit pincode"
//                     maxLength={6}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">City *</label>
//                   <input
//                     type="text"
//                     value={editingAddress.city}
//                     onChange={(e) => setEditingAddress({...editingAddress, city: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="City"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">State *</label>
//                   <input
//                     type="text"
//                     value={editingAddress.state}
//                     onChange={(e) => setEditingAddress({...editingAddress, state: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="State"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Address Type</label>
//                   <div className="flex gap-4">
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         value="Home"
//                         checked={editingAddress.addressType === 'Home'}
//                         onChange={() => setEditingAddress({...editingAddress, addressType: 'Home'})}
//                       />
//                       Home
//                     </label>
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         value="Office"
//                         checked={editingAddress.addressType === 'Office'}
//                         onChange={() => setEditingAddress({...editingAddress, addressType: 'Office'})}
//                       />
//                       Office
//                     </label>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={() => setShowAddressModal(false)}
//                   className="flex-1 py-2 border rounded-lg hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={updateDeliveryAddress}
//                   disabled={updatingAddress}
//                   className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
//                 >
//                   {updatingAddress ? 'Saving...' : 'Save Address'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <section className="relative bg-secondary py-12 md:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center">
//             <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
//               <ShoppingCart className="h-5 w-5" />
//               Your Order Cart
//             </div>
//             <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
//               Review Your Printing Order
//             </h1>
//             <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto">
//               Modify quantities, remove items, or proceed to secure checkout
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-12 md:py-16 bg-background">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
//             <div className="lg:col-span-8 space-y-6">
              
//               {/* Customer & Delivery Info Card with Edit Button */}
//               <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="font-bold text-lg flex items-center gap-2">
//                     <Package className="h-5 w-5 text-primary" />
//                     Customer & Delivery Details
//                   </h3>
//                   {deliveryType === 'courier' && (
//                     <button
//                       onClick={openAddressModal}
//                       className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
//                     >
//                       <Edit2 className="h-3 w-3" />
//                       Edit Address
//                     </button>
//                   )}
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Name</span>
//                     <p className="font-medium text-foreground mt-1">{customer.name || '—'}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Phone</span>
//                     <p className="font-medium text-foreground mt-1">{customer.phone || '—'}</p>
//                   </div>
//                   <div className="sm:col-span-2">
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Method</span>
//                     <p className="font-medium text-foreground mt-1 flex items-center gap-2">
//                       {deliveryType === 'courier' ? (
//                         <>
//                           <Truck className="h-4 w-4 text-primary" />
//                           Courier Delivery
//                         </>
//                       ) : (
//                         <>
//                           <Package className="h-4 w-4 text-primary" />
//                           Store Pickup
//                         </>
//                       )}
//                     </p>
//                   </div>
//                   {deliveryType === 'courier' && (
//                     <>
//                       <div className="sm:col-span-2">
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Address</span>
//                         <p className="font-medium text-foreground mt-1">{customer.address || '—'}</p>
//                         {customer.landmark && (
//                           <p className="text-xs text-muted-foreground mt-1">Landmark: {customer.landmark}</p>
//                         )}
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Pincode / City</span>
//                         <p className="font-medium text-foreground mt-1">
//                           {customer.pincode || '—'} {customer.city ? `, ${customer.city}` : ''}
//                         </p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">State</span>
//                         <p className="font-medium text-foreground mt-1">{customer.state || '—'}</p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Order Weight</span>
//                         <p className="font-medium text-foreground mt-1 flex items-center gap-1">
//                           <Package className="h-3 w-3" />
//                           {formatWeight(orderWeight)}
//                         </p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Delivery Partner Selection - Read Only / System Managed */}
//               {deliveryType === 'courier' && (
//                 <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-bold text-lg flex items-center gap-2">
//                       <Truck className="h-5 w-5 text-primary" />
//                       Delivery Partner (Auto-selected by System)
//                     </h3>
//                     {(checkingServiceability || autoSelectInProgress) && (
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
//                         {autoSelectInProgress ? 'Selecting best option...' : 'Checking...'}
//                       </div>
//                     )}
//                   </div>

//                   {!customer.pincode ? (
//                     <div className="text-center py-8 text-muted-foreground">
//                       <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
//                       <p>Please add your pincode to see delivery options</p>
//                       <button 
//                         onClick={openAddressModal}
//                         className="mt-3 text-primary hover:underline"
//                       >
//                         Add Address →
//                       </button>
//                     </div>
//                   ) : serviceable === false ? (
//                     <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
//                       <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
//                       <p className="text-red-700 font-medium">Delivery not available to {customer.pincode}</p>
//                       <p className="text-red-600 text-sm mt-1">{serviceabilityMessage}</p>
//                       <button 
//                         onClick={openAddressModal}
//                         className="mt-3 text-red-600 hover:text-red-700 underline text-sm"
//                       >
//                         Try different address →
//                       </button>
//                     </div>
//                   ) : availableCouriers.length === 0 && !checkingServiceability ? (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
//                       <p className="text-yellow-700">No couriers available for this pincode</p>
//                       <button 
//                         onClick={checkServiceability}
//                         className="mt-2 text-primary hover:underline text-sm"
//                       >
//                         Retry →
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       {/* Display selected courier info (read-only) */}
//                       {selectedCourierDetails && (
//                         <div className="bg-green-50 border border-green-200 rounded-lg p-5">
//                           <div className="flex items-start gap-3">
//                             <div className="bg-green-100 rounded-full p-2">
//                               <CheckCircle className="h-5 w-5 text-green-600" />
//                             </div>
//                             <div className="flex-1">
//                               {/* <p className="font-semibold text-green-800">Best Option Selected</p>
//                               <p className="text-sm text-green-700 mt-1">
//                                 System has automatically selected the cheapest delivery partner for your location.
//                               </p> */}
//                               <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
//                                 <div>
//                                   <span className="text-green-600">Courier Partner:</span>
//                                   <p className="font-medium text-green-800">{selectedCourierDetails.courierName}</p>
//                                 </div>
//                                 <div>
//                                   <span className="text-green-600">Delivery Charge:</span>
//                                   <p className="font-bold text-green-800 text-lg">₹{deliveryCharge.toFixed(2)}</p>
//                                 </div>
//                                 {selectedCourierDetails.expectedDelivery && (
//                                   <div className="col-span-2">
//                                     <span className="text-green-600">Expected Delivery:</span>
//                                     <p className="font-medium text-green-700">{selectedCourierDetails.expectedDelivery}</p>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                       {/* Show available couriers for transparency (but not selectable) */}
//                       {/* {availableCouriers.length > 1 && (
//                         <div className="mt-4">
//                           <p className="text-xs text-muted-foreground mb-2">Other available options (system managed):</p>
//                           <div className="space-y-2">
//                             {availableCouriers
//                               .filter(c => c.id !== selectedPartner)
//                               .map((courier) => (
//                                 <div key={courier.id} className="bg-gray-50 rounded-lg p-3 opacity-75">
//                                   <div className="flex justify-between items-center">
//                                     <div>
//                                       <p className="font-medium text-gray-600">{courier.courierName}</p>
//                                       {courier.expectedDelivery && (
//                                         <p className="text-xs text-gray-500">Est. {courier.expectedDelivery}</p>
//                                       )}
//                                     </div>
//                                     <p className="font-semibold text-gray-600">₹{courier.shippingCharge.toFixed(2)}</p>
//                                   </div>
//                                 </div>
//                               ))}
//                           </div>
//                           <p className="text-xs text-muted-foreground mt-2 text-center">
//                             Best price automatically selected to save you money
//                           </p>
//                         </div>
//                       )} */}
//                     </>
//                   )}
//                 </div>
//               )}

//               {/* Order Items */}
//               {cartData?.items.map((item, index) => {
//                 const itemTitle = item.paperSize
//                   ? `${item.paperSize} • ${item.printColor?.toUpperCase()} • ${item.printSide} side`
//                   : `Custom Print Job ${index + 1}`;
                
//                 const files = item.files || [];
//                 const priceData = calculateItemPrice(item);

//                 return (
//                   <div key={item._id} className="bg-white rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition-all duration-300">
//                     <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6">
//                       <div className="w-full sm:w-32 md:w-40 h-40 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center shrink-0">
//                         <Printer className="h-12 w-12 text-primary/60" strokeWidth={1.5} />
//                       </div>

//                       <div className="flex-1 flex flex-col">
//                         <div className="flex justify-between items-start gap-4 mb-3">
//                           <h3 className="font-bold text-lg md:text-xl leading-tight text-foreground">
//                             {itemTitle}
//                           </h3>
//                           <button
//                             onClick={() => removeItem(item._id)}
//                             className="text-red-500 hover:text-red-700 p-1.5 -mr-1.5 transition-colors"
//                           >
//                             <Trash2 className="h-5 w-5" />
//                           </button>
//                         </div>

//                         <div className="text-sm text-muted-foreground mb-4 space-y-1">
//                           <p className="font-medium text-foreground">
//                             {item.pages} pages × {item.copies} copies
//                           </p>
//                           <p>
//                             {paperTypeLabels[item.paperType || ''] || item.paperType || '—'} •{' '}
//                             {item.printColor === 'bw' ? 'B&W' : 'Color'} •{' '}
//                             {item.printSide === 'double' ? 'Double' : 'Single'} sided
//                           </p>
//                           <p>
//                             Binding: {bindingLabels[item.bindingType || ''] || item.bindingType || '—'}
//                           </p>
//                           {item.lamination && item.lamination !== 'none' && (
//                             <p>Lamination: {item.lamination.charAt(0).toUpperCase() + item.lamination.slice(1)}</p>
//                           )}
//                         </div>

//                         {files.length > 0 && (
//                           <div className="mb-4 text-xs">
//                             <p className="text-muted-foreground mb-1 flex items-center gap-1">
//                               <FileText className="h-3 w-3" />
//                               Uploaded Files:
//                             </p>
//                             <ul className="space-y-1">
//                               {files.map(f => (
//                                 <li key={f._id} className="flex items-center gap-2 text-muted-foreground">
//                                   <FileText className="h-3 w-3 text-primary/70" />
//                                   <span className="truncate max-w-[200px]">{f.name}</span>
//                                   <span className="text-xs">
//                                     ({(f.size / 1024 / 1024).toFixed(1)} MB)
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                         <div className="mt-auto flex flex-wrap justify-between items-center gap-4 pt-2">
//                           <div className="flex border border-border rounded-lg overflow-hidden bg-muted/30">
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies - 1)}
//                               disabled={item.copies <= 1}
//                               className="px-4 py-2 hover:bg-muted transition-colors disabled:opacity-50"
//                             >
//                               <Minus className="h-4 w-4" />
//                             </button>
//                             <span className="px-5 py-2 font-semibold min-w-[3.5rem] text-center bg-white">
//                               {item.copies}
//                             </span>
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies + 1)}
//                               className="px-4 py-2 hover:bg-muted transition-colors"
//                             >
//                               <Plus className="h-4 w-4" />
//                             </button>
//                           </div>

//                           <div className="text-right">
//                             <div className="text-lg font-bold text-primary">
//                               ₹{priceData.grandTotal.toFixed(2)}
//                             </div>
//                             <div className="text-xs text-muted-foreground">
//                               ₹{priceData.pricePerPage.toFixed(2)}/page
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}

//               <div className="flex justify-between items-center pt-4">
//                 <Link
//                   to="/order"
//                   className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group"
//                 >
//                   <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
//                   Continue Adding Orders
//                 </Link>
                
//                 <button
//                   onClick={clearCart}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
//                 >
//                   Clear Cart
//                 </button>
//               </div>
//             </div>

//             {/* RIGHT - Order Summary */}
//             <div className="lg:col-span-4">
//               <div className="bg-white rounded-xl shadow-lg border p-6 md:p-8 sticky top-6">
//                 <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
//                   <Package className="h-6 w-6 text-primary" />
//                   Order Summary
//                 </h2>

//                 <div className="space-y-4 text-sm">
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Items</span>
//                     <span className="font-semibold">{cartData?.items.length || 0}</span>
//                   </div>

//                   <div className="flex justify-between py-2 border-t">
//                     <span className="text-muted-foreground">Printing Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.printingCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Binding Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.bindingCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Subtotal</span>
//                     <span className="font-semibold">₹{calculatedTotals?.totalCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">GST (5%)</span>
//                     <span className="font-semibold">₹{calculatedTotals?.gst.toFixed(2) || '0.00'}</span>
//                   </div>

//                   {deliveryType === 'courier' && (
//                     <>
//                       <div className="flex justify-between py-2 border-t">
//                         <span className="text-muted-foreground">Order Weight</span>
//                         <span className="font-semibold">{formatWeight(orderWeight)}</span>
//                       </div>
                      
//                       <div className="flex justify-between py-2">
//                         <span className="text-muted-foreground">Delivery Partner</span>
//                         <span className="font-semibold text-green-600">
//                           {selectedCourierDetails?.courierName || 'Auto-selected'}
//                         </span>
//                       </div>

//                       <div className="flex justify-between py-2">
//                         <span className="text-muted-foreground">Delivery Charges</span>
//                         <span className="font-semibold text-primary">₹{deliveryCharge.toFixed(2)}</span>
//                       </div>
//                     </>
//                   )}

//                   <div className="border-t border-border pt-5 mt-4">
//                     <div className="flex justify-between items-center text-lg font-bold">
//                       <span className="text-foreground">Total Amount</span>
//                       <span className="text-primary text-2xl font-black">
//                         ₹{finalTotal.toFixed(2)}
//                       </span>
//                     </div>
//                     <p className="text-xs text-muted-foreground text-center mt-2">
//                       Inclusive of all taxes
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-8 space-y-4">
//                   <button
//                     onClick={handleCheckout}
//                     disabled={deliveryType === 'courier' && (!selectedPartner || serviceable === false)}
//                     className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5 group disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Proceed to Checkout 
//                     <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                   </button>

//                   <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
//                     <Shield className="h-4 w-4" />
//                     Secure checkout with Razorpay
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-6 border-t text-xs text-muted-foreground space-y-2">
//                   <div className="flex items-start gap-2">
//                     <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>GST invoice provided for every order</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>Real-time tracking </span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>Best delivery partner </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }







// import { useState, useEffect, useRef, useCallback } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   ShoppingCart, Trash2, Plus, Minus, ArrowRight, Shield, Truck, 
//   CheckCircle, Printer, Package, FileText, Clock, Zap, MapPin, 
//   AlertCircle, Edit2, X, Save
// } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { paperTypeLabels, bindingLabels, calculatePrice } from '@/lib/pricingData';
// import { toast } from 'sonner';

// interface CartItem {
//   _id: string;
//   pages: number;
//   copies: number;
//   paperSize?: string;
//   paperType?: string;
//   printColor?: 'bw' | 'color';
//   printSide?: 'single' | 'double';
//   bindingType?: string;
//   lamination?: string;
//   instructions?: string;
//   files?: Array<{
//     _id: string;
//     name: string;
//     size: number;
//     type: string;
//     status: string;
//   }>;
// }

// interface CartData {
//   items: CartItem[];
//   customer: {
//     name?: string;
//     phone?: string;
//     address?: string;
//     pincode?: string;
//     city?: string;
//     state?: string;
//     landmark?: string;
//     addressType?: 'Home' | 'Office';
//   };
//   orderMode: 'single' | 'bulk';
//   deliveryType: 'pickup' | 'courier';
//   deliveryPartner?: number;
//   deliveryCharge?: number;
//   totals: {
//     printingCost: number;
//     gst: number;
//     totalWithDelivery: number;
//   };
// }

// interface Courier {
//   id: number;
//   courierId: number;
//   courierName: string;
//   shippingCharge: number;
//   codCharge?: number;
//   rtoCharge?: number;
//   serviceMode?: string;
//   zoneName?: string;
//   expectedDelivery?: string;
// }

// // Replace the calculateOrderWeight function (around line 44-55)
// const calculateOrderWeight = (items: CartItem[]): number => {
//   let totalWeightKg = 0;

//   items.forEach(item => {
//     const totalPages = item.pages * (item.copies || 1);
    
//     // Paper weight based on type (in kg per page)
//     let paperWeightPerPage = 0.002; // 2g per page for normal paper
    
//     if (item.paperType === 'premium') {
//       paperWeightPerPage = 0.005; // 5g per page for premium
//     } else if (item.paperType === 'glossy') {
//       paperWeightPerPage = 0.004; // 4g per page for glossy
//     } else if (item.paperType === 'recycled') {
//       paperWeightPerPage = 0.0025; // 2.5g per page for recycled
//     }
    
//     let itemWeight = totalPages * paperWeightPerPage;
    
//     // Binding weight (in kg)
//     if (item.bindingType === 'spiral') {
//       itemWeight += 0.050; // 50g for spiral binding
//     } else if (item.bindingType === 'perfect') {
//       itemWeight += 0.080; // 80g for perfect binding
//     } else if (item.bindingType === 'hardcover') {
//       itemWeight += 0.200; // 200g for hardcover
//     } else if (item.bindingType === 'saddle') {
//       itemWeight += 0.030; // 30g for saddle stitch
//     }
    
//     // Lamination weight (in kg)
//     if (item.lamination === 'matte' || item.lamination === 'glossy') {
//       itemWeight += totalPages * 0.001; // 1g per page for lamination
//     }
    
//     totalWeightKg += itemWeight;
//   });

//   // Add packaging weight based on total weight
//   if (totalWeightKg > 2) {
//     totalWeightKg += 0.3; // 300g for heavy packages
//   } else if (totalWeightKg > 1) {
//     totalWeightKg += 0.2; // 200g for medium packages
//   } else {
//     totalWeightKg += 0.1; // 100g for light packages
//   }
  
//   // Round to 3 decimal places and ensure minimum 100g
//   return Math.max(0.1, Math.round(totalWeightKg * 1000) / 1000);
// };

// // Add this function after calculateOrderWeight (around line 55)
// const calculateItemWeight = (item: CartItem): number => {
//   const totalPages = item.pages * (item.copies || 1);
  
//   // Paper weight based on type (in kg)
//   let paperWeightPerPage = 0.002; // 2g per page for normal paper
  
//   if (item.paperType === 'premium') {
//     paperWeightPerPage = 0.005; // 5g per page for premium
//   } else if (item.paperType === 'glossy') {
//     paperWeightPerPage = 0.004; // 4g per page for glossy
//   } else if (item.paperType === 'recycled') {
//     paperWeightPerPage = 0.0025; // 2.5g per page for recycled
//   }
  
//   let weight = totalPages * paperWeightPerPage;
  
//   // Binding weight (in kg)
//   if (item.bindingType === 'spiral') {
//     weight += 0.050; // 50g
//   } else if (item.bindingType === 'perfect') {
//     weight += 0.080; // 80g
//   } else if (item.bindingType === 'hardcover') {
//     weight += 0.200; // 200g
//   } else if (item.bindingType === 'saddle') {
//     weight += 0.030; // 30g
//   }
  
//   // Lamination weight (in kg)
//   if (item.lamination === 'matte' || item.lamination === 'glossy') {
//     weight += totalPages * 0.001; // 1g per page
//   }
  
//   // Round to 3 decimal places
//   return Math.round(weight * 1000) / 1000;
// };

// const formatWeight = (kg: number): string => {
//   return kg >= 1 ? `${kg.toFixed(2)} kg` : `${(kg * 1000).toFixed(0)} g`;
// };

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'https://bookprinters.in/api/api',
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default function Cart() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [cartData, setCartData] = useState<CartData | null>(null);
//   const [selectedPartner, setSelectedPartner] = useState<number | null>(null);
//   const [serviceable, setServiceable] = useState<boolean | null>(null);
//   const [checkingServiceability, setCheckingServiceability] = useState(false);
//   const [availableCouriers, setAvailableCouriers] = useState<Courier[]>([]);
//   const [deliveryCharge, setDeliveryCharge] = useState<number>(0);
//   const [serviceabilityMessage, setServiceabilityMessage] = useState<string>('');
  
//   const [showAddressModal, setShowAddressModal] = useState(false);
//   const [editingAddress, setEditingAddress] = useState({
//     address: '',
//     pincode: '',
//     city: '',
//     state: '',
//     landmark: '',
//     addressType: 'Home' as 'Home' | 'Office'
//   });
//   const [updatingAddress, setUpdatingAddress] = useState(false);

//   const lastCheckedPincode = useRef<string>('');
//   const lastCheckedWeight = useRef<number>(0);
//   const serviceabilityCheckTimeout = useRef<NodeJS.Timeout | null>(null);
//   const isInitialMount = useRef(true);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   useEffect(() => {
//     if (cartData?.deliveryPartner) {
//       setSelectedPartner(cartData.deliveryPartner);
//     }
//     if (cartData?.deliveryCharge) {
//       setDeliveryCharge(cartData.deliveryCharge);
//     }
//   }, [cartData]);

//   useEffect(() => {
//     if (cartData?.deliveryType !== 'courier') return;
    
//     const pincode = cartData?.customer?.pincode;
//     const items = cartData?.items;
    
//     if (!pincode || pincode.length !== 6) return;
//     if (!items || items.length === 0) return;
    
//     const currentWeight = calculateOrderWeight(items);
    
//     const pincodeChanged = lastCheckedPincode.current !== pincode;
//     const weightChanged = Math.abs(lastCheckedWeight.current - currentWeight) > 0.01;
//     const isFirstCheck = lastCheckedPincode.current === '';
    
//     if (!isFirstCheck && !pincodeChanged && !weightChanged) {
//       console.log('Skipping serviceability check - no changes detected');
//       return;
//     }
    
//     if (serviceabilityCheckTimeout.current) {
//       clearTimeout(serviceabilityCheckTimeout.current);
//     }
    
//     serviceabilityCheckTimeout.current = setTimeout(() => {
//       checkServiceability();
//     }, 500);
    
//   }, [cartData?.customer?.pincode, cartData?.items, cartData?.deliveryType]);

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get('/cart');
      
//       if (response.data && response.data.items && response.data.items.length > 0) {
//         setCartData(response.data);
        
//         if (response.data.deliveryPartner && response.data.deliveryCharge) {
//           setSelectedPartner(response.data.deliveryPartner);
//           setDeliveryCharge(response.data.deliveryCharge);
//         }
//       } else {
//         setCartData(null);
//       }
//     } catch (error: any) {
//       console.error("Error fetching cart:", error);
//       if (error.response?.status === 401) {
//         navigate('/login');
//       }
//       toast.error("Failed to load cart");
//       setCartData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const autoSelectCheapestCourier = useCallback(async (couriers: Courier[]) => {
//     if (couriers.length === 0) return;
    
//     if (cartData?.deliveryPartner && cartData?.deliveryCharge) {
//       const existingPartner = couriers.find(c => c.id === cartData.deliveryPartner);
//       if (existingPartner) {
//         console.log('Using existing delivery partner from backend:', existingPartner.courierName);
//         setSelectedPartner(cartData.deliveryPartner);
//         setDeliveryCharge(cartData.deliveryCharge);
//         return;
//       }
//     }
    
//     const cheapest = couriers.reduce((min, curr) => 
//       curr.shippingCharge < min.shippingCharge ? curr : min
//     );
    
//     if (selectedPartner === cheapest.id && deliveryCharge === cheapest.shippingCharge) {
//       console.log('Already using cheapest courier, skipping update');
//       return;
//     }
    
//     console.log(`Auto-selecting cheapest courier: ${cheapest.courierName} (₹${cheapest.shippingCharge})`);
    
//     setSelectedPartner(cheapest.id);
//     setDeliveryCharge(cheapest.shippingCharge);
    
//     API.put('/cart/delivery-partner', { 
//       deliveryPartner: cheapest.id,
//       deliveryCharge: cheapest.shippingCharge
//     }).catch(err => console.error("Failed to save delivery partner:", err));
    
//     if (!cartData?.deliveryPartner) {
//       toast.success(`Delivery partner auto-selected: ${cheapest.courierName}`, {
//         duration: 3000,
//         icon: '🚚'
//       });
//     }
    
//   }, [cartData?.deliveryPartner, cartData?.deliveryCharge, selectedPartner, deliveryCharge]);

//   const checkServiceability = useCallback(async () => {
//     if (!cartData?.customer?.pincode) return;
    
//     const pincode = cartData.customer.pincode;
//     const weight = calculateOrderWeight(cartData.items);
    
//     lastCheckedPincode.current = pincode;
//     lastCheckedWeight.current = weight;
    
//     setCheckingServiceability(true);
    
//     try {
//       const response = await API.post('/shipping/check-delivery', {
//         pincode: pincode,
//         warehousePincode: '305001',
//         weight: weight
//       });
      
//       if (response.data.success && response.data.data) {
//         const result = response.data.data;
//         setServiceable(result.serviceable);
//         setServiceabilityMessage(result.message);
        
//         if (result.serviceable && result.couriers?.list) {
//           const couriers = result.couriers.list.map((c: any) => ({
//             id: c.courierId,
//             courierId: c.courierId,
//             courierName: c.courierName,
//             shippingCharge: parseFloat(c.shippingCharge),
//             serviceMode: c.serviceMode,
//             zoneName: c.zoneName,
//             expectedDelivery: c.expectedDelivery
//           }));
          
//           setAvailableCouriers(couriers);
//           await autoSelectCheapestCourier(couriers);
//         } else {
//           setAvailableCouriers([]);
//           setDeliveryCharge(0);
//         }
//       } else {
//         setServiceable(false);
//         setServiceabilityMessage(response.data.message || 'Unable to check delivery');
//         setAvailableCouriers([]);
//       }
//     } catch (error: any) {
//       console.error("Serviceability check failed:", error);
//       setServiceable(false);
//       setServiceabilityMessage(error.response?.data?.message || 'Failed to check delivery availability');
//       setAvailableCouriers([]);
//     } finally {
//       setCheckingServiceability(false);
//     }
//   }, [cartData?.customer?.pincode, cartData?.items, autoSelectCheapestCourier]);

//   const updateDeliveryAddress = async () => {
//     if (!cartData) return;
    
//     setUpdatingAddress(true);
    
//     try {
//       if (!editingAddress.pincode || editingAddress.pincode.length !== 6) {
//         toast.error('Please enter a valid 6-digit pincode');
//         return;
//       }
      
//       if (!editingAddress.address) {
//         toast.error('Please enter your address');
//         return;
//       }
      
//       if (!editingAddress.city) {
//         toast.error('Please enter your city');
//         return;
//       }
      
//       if (!editingAddress.state) {
//         toast.error('Please enter your state');
//         return;
//       }
      
//       const response = await API.put('/cart/address', {
//         address: editingAddress.address,
//         pincode: editingAddress.pincode,
//         city: editingAddress.city,
//         state: editingAddress.state,
//         landmark: editingAddress.landmark,
//         addressType: editingAddress.addressType
//       });
      
//       if (response.data && response.data.cart) {
//         setCartData(response.data.cart);
//         setShowAddressModal(false);
//         toast.success('Delivery address updated successfully');
        
//         setServiceable(null);
//         setAvailableCouriers([]);
//         setSelectedPartner(null);
//         setDeliveryCharge(0);
        
//         lastCheckedPincode.current = '';
//         lastCheckedWeight.current = 0;
//       }
//     } catch (error: any) {
//       console.error("Failed to update address:", error);
//       toast.error(error.response?.data?.message || "Failed to update address");
//     } finally {
//       setUpdatingAddress(false);
//     }
//   };

//   const openAddressModal = () => {
//     if (cartData?.customer) {
//       setEditingAddress({
//         address: cartData.customer.address || '',
//         pincode: cartData.customer.pincode || '',
//         city: cartData.customer.city || '',
//         state: cartData.customer.state || '',
//         landmark: cartData.customer.landmark || '',
//         addressType: cartData.customer.addressType || 'Home'
//       });
//     }
//     setShowAddressModal(true);
//   };

//   const calculateItemPrice = (item: CartItem) => {
//     try {
//       const priceData = calculatePrice({
//         pages: item.pages,
//         copies: item.copies,
//         paperSize: item.paperSize as any,
//         paperType: item.paperType as any,
//         printColor: item.printColor as any,
//         printSide: item.printSide as any,
//         bindingType: item.bindingType as any,
//       });
//       return priceData;
//     } catch (error) {
//       console.error("Error calculating price:", error);
//       return {
//         totalCost: 0,
//         grandTotal: 0,
//         pricePerPage: 0,
//         printingCost: 0,
//         bindingCost: 0,
//         gst: 0
//       };
//     }
//   };

//   const updateQuantity = async (_id: string, newQty: number) => {
//     if (newQty < 1) return;
    
//     const previousCartData = cartData;
    
//     try {
//       if (cartData) {
//         const updatedItems = cartData.items.map(item => 
//           item._id === _id ? { ...item, copies: newQty } : item
//         );
//         setCartData({ ...cartData, items: updatedItems });
//       }
      
//       const response = await API.put(`/cart/item/${_id}`, { copies: newQty });
      
//       if (response.data && response.data.items) {
//         setCartData(response.data);
//       }
      
//       lastCheckedWeight.current = 0;
//       toast.success("Quantity updated");
//     } catch (error: any) {
//       console.error("Update failed:", error);
//       setCartData(previousCartData);
//       toast.error(error.response?.data?.message || "Failed to update quantity");
//     }
//   };

//   const removeItem = async (_id: string) => {
//     const previousCartData = cartData;
    
//     try {
//       if (cartData) {
//         const updatedItems = cartData.items.filter(item => item._id !== _id);
//         if (updatedItems.length > 0) {
//           setCartData({ ...cartData, items: updatedItems });
//         } else {
//           setCartData(null);
//         }
//       }
      
//       await API.delete(`/cart/item/${_id}`);
//       lastCheckedWeight.current = 0;
//       toast.success("Item removed");
//     } catch (error: any) {
//       console.error("Delete failed:", error);
//       setCartData(previousCartData);
//       toast.error(error.response?.data?.message || "Failed to remove item");
//     }
//   };

//   // const handleCheckout = async () => {
//   //   try {
//   //     if (!cartData) {
//   //       toast.error("Cart is empty");
//   //       return;
//   //     }

//   //     if (cartData.deliveryType === 'courier') {
//   //       if (!cartData.customer?.pincode || !cartData.customer?.address) {
//   //         toast.error("Please add your delivery address");
//   //         openAddressModal();
//   //         return;
//   //       }
        
//   //       if (!selectedPartner) {
//   //         toast.error("No delivery partner available for your location");
//   //         return;
//   //       }
        
//   //       if (!serviceable) {
//   //         toast.error("Delivery not available to your pincode");
//   //         return;
//   //       }
//   //     }

//   //     const payload = {
//   //       items: cartData.items,
//   //       customer: cartData.customer,
//   //       deliveryType: cartData.deliveryType,
//   //       deliveryPartner: cartData.deliveryType === 'courier' ? selectedPartner : undefined,
//   //       deliveryCharge: cartData.deliveryType === 'courier' ? deliveryCharge : 0,
//   //       orderWeight: calculateOrderWeight(cartData.items),
//   //       orderMode: cartData.orderMode,
//   //       totalAmount: finalTotal
//   //     };

//   //     const res = await API.post('/order/create-from-cart', payload);
//   //     const orderData = res.data;
//   //     const order = orderData.order;

//   //     if (!order?._id) {
//   //       throw new Error("Order ID missing from response");
//   //     }

//   //     localStorage.setItem("pendingOrder", JSON.stringify({
//   //       orderId: order._id,
//   //       amount: finalTotal,
//   //       orderNumber: order.orderNumber,
//   //       deliveryPartner: selectedPartner,
//   //       deliveryCharge: deliveryCharge
//   //     }));

//   //     navigate('/checkout', {
//   //       state: {
//   //         orderId: order._id,
//   //         amount: finalTotal,
//   //         orderNumber: order.orderNumber,
//   //         deliveryPartner: selectedPartner,
//   //         deliveryCharge: deliveryCharge
//   //       }
//   //     });

//   //   } catch (error: any) {
//   //     console.error("Checkout failed:", error);
//   //     toast.error(error.response?.data?.message || "Checkout failed");
//   //   }
//   // };


  
// // Replace the handleCheckout function (around line 380-420)
// const handleCheckout = async () => {
//   try {
//     if (!cartData) {
//       toast.error("Cart is empty");
//       return;
//     }

//     if (cartData.deliveryType === 'courier') {
//       if (!cartData.customer?.pincode || !cartData.customer?.address) {
//         toast.error("Please add your delivery address");
//         openAddressModal();
//         return;
//       }
      
//       if (!selectedPartner) {
//         toast.error("No delivery partner available for your location");
//         return;
//       }
      
//       if (!serviceable) {
//         toast.error("Delivery not available to your pincode");
//         return;
//       }
//     }

//     // Calculate accurate data for shipping label
//     const itemsWithDetails = cartData.items.map(item => {
//       const priceData = calculateItemPrice(item);
//       return {
//         ...item,
//         productValue: priceData.grandTotal, // The actual amount that shows on shipping label
//         itemWeight: calculateItemWeight(item),
//         itemDetails: {
//           pages: item.pages,
//           copies: item.copies,
//           paperType: item.paperType,
//           printColor: item.printColor,
//           bindingType: item.bindingType,
//           lamination: item.lamination
//         }
//       };
//     });

//     const totalWeight = calculateOrderWeight(cartData.items);
//     const subtotal = calculatedTotals?.grandTotal || 0;
//     const totalAmount = subtotal + deliveryCharge;

//     const payload = {
//       items: itemsWithDetails,
//       customer: cartData.customer,
//       deliveryType: cartData.deliveryType,
//       deliveryPartner: cartData.deliveryType === 'courier' ? selectedPartner : undefined,
//       deliveryCharge: cartData.deliveryType === 'courier' ? deliveryCharge : 0,
//       orderWeight: totalWeight,
//       orderMode: cartData.orderMode,
//       totalAmount: totalAmount,
//       subtotal: subtotal,
//       // CRITICAL: These are for the shipping label
//       declaredValue: subtotal, // Product value without delivery charges
//       productValues: itemsWithDetails.map(i => i.productValue)
//     };

//     console.log("📦 CHECKOUT PAYLOAD FOR SHIPPING LABEL:", {
//       totalWeight: totalWeight + " kg",
//       declaredValue: "₹" + payload.declaredValue,
//       productValues: payload.productValues,
//       items: itemsWithDetails.map(i => ({
//         pages: i.pages,
//         copies: i.copies,
//         value: "₹" + i.productValue,
//         weight: i.itemWeight + " kg"
//       }))
//     });

//     const res = await API.post('/order/create-from-cart', payload);
//     const orderData = res.data;
//     const order = orderData.order;

//     if (!order?._id) {
//       throw new Error("Order ID missing from response");
//     }

//     localStorage.setItem("pendingOrder", JSON.stringify({
//       orderId: order._id,
//       amount: totalAmount,
//       orderNumber: order.orderNumber,
//       deliveryPartner: selectedPartner,
//       deliveryCharge: deliveryCharge,
//       orderWeight: totalWeight,
//       declaredValue: payload.declaredValue
//     }));

//     navigate('/checkout', {
//       state: {
//         orderId: order._id,
//         amount: totalAmount,
//         orderNumber: order.orderNumber,
//         deliveryPartner: selectedPartner,
//         deliveryCharge: deliveryCharge,
//         orderWeight: totalWeight,
//         declaredValue: payload.declaredValue
//       }
//     });

//   } catch (error: any) {
//     console.error("Checkout failed:", error);
//     toast.error(error.response?.data?.message || "Checkout failed");
//   }
// };
  

//   const clearCart = async () => {
//     if (!window.confirm('Are you sure you want to clear your cart?')) return;
    
//     const previousCartData = cartData;
    
//     try {
//       setCartData(null);
//       await API.delete('/cart');
//       toast.success("Cart cleared");
//     } catch (error: any) {
//       console.error("Clear failed:", error);
//       setCartData(previousCartData);
//       toast.error("Failed to clear cart");
//     }
//   };

//   const calculatedTotals = cartData?.items.reduce((sum, item) => {
//     const price = calculateItemPrice(item);
//     return {
//       printingCost: sum.printingCost + price.printingCost,
//       bindingCost: sum.bindingCost + price.bindingCost,
//       totalCost: sum.totalCost + price.totalCost  + sum.gst + price.gst,
//       gst: sum.gst + price.gst,
//       grandTotal: sum.grandTotal + price.grandTotal
//     };
//   }, { printingCost: 0, bindingCost: 0, totalCost: 0, gst: 0, grandTotal: 0 });

//   const deliveryType = cartData?.deliveryType || 'pickup';
//   const customer = cartData?.customer || {};
//   const hasItems = cartData !== null && cartData.items && cartData.items.length > 0;
//   const orderWeight = hasItems ? calculateOrderWeight(cartData.items) : 0;
//   const finalTotal = (calculatedTotals?.grandTotal || 0) + deliveryCharge;
//   const selectedCourierDetails = selectedPartner 
//     ? availableCouriers.find(c => c.id === selectedPartner)
//     : null;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center">
//             <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
//             <p className="text-muted-foreground">Loading your cart...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (!hasItems) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center max-w-md">
//             <ShoppingCart className="h-20 w-20 mx-auto mb-6 text-muted-foreground/70" strokeWidth={1.2} />
//             <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
//             <p className="text-muted-foreground mb-8">
//               You haven't added any printing orders yet.
//             </p>
//             <Link
//               to="/order"
//               className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 text-lg shadow-md transition-all duration-300 hover:scale-105"
//             >
//               Start New Order <ArrowRight className="h-5 w-5" />
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

//       {showAddressModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-bold">Edit Delivery Address</h3>
//                 <button onClick={() => setShowAddressModal(false)} className="p-1 hover:bg-gray-100 rounded">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Address *</label>
//                   <textarea
//                     value={editingAddress.address}
//                     onChange={(e) => setEditingAddress({...editingAddress, address: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
//                     rows={3}
//                     placeholder="Street address, apartment, building"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Landmark (Optional)</label>
//                   <input
//                     type="text"
//                     value={editingAddress.landmark}
//                     onChange={(e) => setEditingAddress({...editingAddress, landmark: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="Near some landmark"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Pincode *</label>
//                   <input
//                     type="text"
//                     value={editingAddress.pincode}
//                     onChange={(e) => setEditingAddress({...editingAddress, pincode: e.target.value.replace(/\D/g, '').slice(0, 6)})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="6-digit pincode"
//                     maxLength={6}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">City *</label>
//                   <input
//                     type="text"
//                     value={editingAddress.city}
//                     onChange={(e) => setEditingAddress({...editingAddress, city: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="City"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">State *</label>
//                   <input
//                     type="text"
//                     value={editingAddress.state}
//                     onChange={(e) => setEditingAddress({...editingAddress, state: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="State"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Address Type</label>
//                   <div className="flex gap-4">
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         value="Home"
//                         checked={editingAddress.addressType === 'Home'}
//                         onChange={() => setEditingAddress({...editingAddress, addressType: 'Home'})}
//                       />
//                       Home
//                     </label>
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         value="Office"
//                         checked={editingAddress.addressType === 'Office'}
//                         onChange={() => setEditingAddress({...editingAddress, addressType: 'Office'})}
//                       />
//                       Office
//                     </label>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={() => setShowAddressModal(false)}
//                   className="flex-1 py-2 border rounded-lg hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={updateDeliveryAddress}
//                   disabled={updatingAddress}
//                   className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
//                 >
//                   {updatingAddress ? 'Saving...' : 'Save Address'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <section className="relative bg-secondary py-12 md:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center">
//             <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
//               <ShoppingCart className="h-5 w-5" />
//               Your Order Cart
//             </div>
//             <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
//               Review Your Printing Order
//             </h1>
//             <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto">
//               Modify quantities, remove items, or proceed to secure checkout
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-12 md:py-16 bg-background">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
//             <div className="lg:col-span-8 space-y-6">
              
//               <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="font-bold text-lg flex items-center gap-2">
//                     <Package className="h-5 w-5 text-primary" />
//                     Customer & Delivery Details
//                   </h3>
//                   {deliveryType === 'courier' && (
//                     <button
//                       onClick={openAddressModal}
//                       className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
//                     >
//                       <Edit2 className="h-3 w-3" />
//                       Edit Address
//                     </button>
//                   )}
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Name</span>
//                     <p className="font-medium text-foreground mt-1">{customer.name || '—'}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Phone</span>
//                     <p className="font-medium text-foreground mt-1">{customer.phone || '—'}</p>
//                   </div>
//                   <div className="sm:col-span-2">
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Method</span>
//                     <p className="font-medium text-foreground mt-1 flex items-center gap-2">
//                       {deliveryType === 'courier' ? (
//                         <>
//                           <Truck className="h-4 w-4 text-primary" />
//                           Courier Delivery
//                         </>
//                       ) : (
//                         <>
//                           <Package className="h-4 w-4 text-primary" />
//                           Store Pickup
//                         </>
//                       )}
//                     </p>
//                   </div>
//                   {deliveryType === 'courier' && (
//                     <>
//                       <div className="sm:col-span-2">
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Address</span>
//                         <p className="font-medium text-foreground mt-1">{customer.address || '—'}</p>
//                         {customer.landmark && (
//                           <p className="text-xs text-muted-foreground mt-1">Landmark: {customer.landmark}</p>
//                         )}
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Pincode / City</span>
//                         <p className="font-medium text-foreground mt-1">
//                           {customer.pincode || '—'} {customer.city ? `, ${customer.city}` : ''}
//                         </p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">State</span>
//                         <p className="font-medium text-foreground mt-1">{customer.state || '—'}</p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Order Weight</span>
//                         <p className="font-medium text-foreground mt-1 flex items-center gap-1">
//                           <Package className="h-3 w-3" />
//                           {formatWeight(orderWeight)}
//                         </p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {deliveryType === 'courier' && (
//                 <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-bold text-lg flex items-center gap-2">
//                       <Truck className="h-5 w-5 text-primary" />
//                       Delivery Partner
//                     </h3>
//                     {(checkingServiceability) && (
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
//                         Checking...
//                       </div>
//                     )}
//                   </div>

//                   {!customer.pincode ? (
//                     <div className="text-center py-8 text-muted-foreground">
//                       <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
//                       <p>Please add your pincode to see delivery options</p>
//                       <button 
//                         onClick={openAddressModal}
//                         className="mt-3 text-primary hover:underline"
//                       >
//                         Add Address →
//                       </button>
//                     </div>
//                   ) : serviceable === false ? (
//                     <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
//                       <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
//                       <p className="text-red-700 font-medium">Delivery not available to {customer.pincode}</p>
//                       <p className="text-red-600 text-sm mt-1">{serviceabilityMessage}</p>
//                       <button 
//                         onClick={openAddressModal}
//                         className="mt-3 text-red-600 hover:text-red-700 underline text-sm"
//                       >
//                         Try different address →
//                       </button>
//                     </div>
//                   ) : availableCouriers.length === 0 && !checkingServiceability ? (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
//                       <p className="text-yellow-700">No couriers available for this pincode</p>
//                       <button 
//                         onClick={checkServiceability}
//                         className="mt-2 text-primary hover:underline text-sm"
//                       >
//                         Retry →
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       {selectedCourierDetails && (
//                         <div className="bg-green-50 border border-green-200 rounded-lg p-5">
//                           <div className="flex items-start gap-3">
//                             <div className="bg-green-100 rounded-full p-2">
//                               <CheckCircle className="h-5 w-5 text-green-600" />
//                             </div>
//                             <div className="flex-1">
//                               <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
//                                 <div>
//                                   <span className="text-green-600">Courier Partner:</span>
//                                   <p className="font-medium text-green-800">{selectedCourierDetails.courierName}</p>
//                                 </div>
//                                 <div>
//                                   <span className="text-green-600">Delivery Charge:</span>
//                                   <p className="font-bold text-green-800 text-lg">₹{deliveryCharge.toFixed(2)}</p>
//                                 </div>
//                                 {selectedCourierDetails.expectedDelivery && (
//                                   <div className="col-span-2">
//                                     <span className="text-green-600">Expected Delivery:</span>
//                                     <p className="font-medium text-green-700">{selectedCourierDetails.expectedDelivery}</p>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               )}

//               {cartData?.items.map((item, index) => {
//                 const itemTitle = item.paperSize
//                   ? `${item.paperSize} • ${item.printColor?.toUpperCase()} • ${item.printSide} side`
//                   : `Custom Print Job ${index + 1}`;
                
//                 const files = item.files || [];
//                 const priceData = calculateItemPrice(item);

//                 return (
//                   <div key={item._id} className="bg-white rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition-all duration-300">
//                     <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6">
//                       <div className="w-full sm:w-32 md:w-40 h-40 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center shrink-0">
//                         <Printer className="h-12 w-12 text-primary/60" strokeWidth={1.5} />
//                       </div>

//                       <div className="flex-1 flex flex-col">
//                         <div className="flex justify-between items-start gap-4 mb-3">
//                           <h3 className="font-bold text-lg md:text-xl leading-tight text-foreground">
//                             {itemTitle}
//                           </h3>
//                           <button
//                             onClick={() => removeItem(item._id)}
//                             className="text-red-500 hover:text-red-700 p-1.5 -mr-1.5 transition-colors"
//                           >
//                             <Trash2 className="h-5 w-5" />
//                           </button>
//                         </div>

//                         <div className="text-sm text-muted-foreground mb-4 space-y-1">
//                           <p className="font-medium text-foreground">
//                             {item.pages} pages × {item.copies} copies
//                           </p>
//                           <p>
//                             {paperTypeLabels[item.paperType || ''] || item.paperType || '—'} •{' '}
//                             {item.printColor === 'bw' ? 'B&W' : 'Color'} •{' '}
//                             {item.printSide === 'double' ? 'Double' : 'Single'} sided
//                           </p>
//                           <p>
//                             Binding: {bindingLabels[item.bindingType || ''] || item.bindingType || '—'}
//                           </p>
//                           {item.lamination && item.lamination !== 'none' && (
//                             <p>Lamination: {item.lamination.charAt(0).toUpperCase() + item.lamination.slice(1)}</p>
//                           )}
//                         </div>

//                         {files.length > 0 && (
//                           <div className="mb-4 text-xs">
//                             <p className="text-muted-foreground mb-1 flex items-center gap-1">
//                               <FileText className="h-3 w-3" />
//                               Uploaded Files:
//                             </p>
//                             <ul className="space-y-1">
//                               {files.map(f => (
//                                 <li key={f._id} className="flex items-center gap-2 text-muted-foreground">
//                                   <FileText className="h-3 w-3 text-primary/70" />
//                                   <span className="truncate max-w-[200px]">{f.name}</span>
//                                   <span className="text-xs">
//                                     ({(f.size / 1024 / 1024).toFixed(1)} MB)
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                         <div className="mt-auto flex flex-wrap justify-between items-center gap-4 pt-2">
//                           <div className="flex border border-border rounded-lg overflow-hidden bg-muted/30">
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies - 1)}
//                               disabled={item.copies <= 1}
//                               className="px-4 py-2 hover:bg-muted transition-colors disabled:opacity-50"
//                             >
//                               <Minus className="h-4 w-4" />
//                             </button>
//                             <span className="px-5 py-2 font-semibold min-w-[3.5rem] text-center bg-white">
//                               {item.copies}
//                             </span>
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies + 1)}
//                               className="px-4 py-2 hover:bg-muted transition-colors"
//                             >
//                               <Plus className="h-4 w-4" />
//                             </button>
//                           </div>

//                           <div className="text-right">
//                             <div className="text-lg font-bold text-primary">
//                               ₹{priceData.grandTotal.toFixed(2)}
//                             </div>
//                             <div className="text-xs text-muted-foreground">
//                               ₹{priceData.pricePerPage.toFixed(2)}/page
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}

//               <div className="flex justify-between items-center pt-4">
//                 <Link
//                   to="/order"
//                   className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group"
//                 >
//                   <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
//                   Continue Adding Orders
//                 </Link>
                
//                 <button
//                   onClick={clearCart}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
//                 >
//                   Clear Cart
//                 </button>
//               </div>
//             </div>

//             <div className="lg:col-span-4">
//               <div className="bg-white rounded-xl shadow-lg border p-6 md:p-8 sticky top-6">
//                 <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
//                   <Package className="h-6 w-6 text-primary" />
//                   Order Summary
//                 </h2>

//                 <div className="space-y-4 text-sm">
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Items</span>
//                     <span className="font-semibold">{cartData?.items.length || 0}</span>
//                   </div>

//                   <div className="flex justify-between py-2 border-t">
//                     <span className="text-muted-foreground">Printing Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.printingCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Binding Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.bindingCost.toFixed(2) || '0.00'}</span>
//                   </div>
//                           <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">GST (5%)</span>
//                     <span className="font-semibold">₹{calculatedTotals?.gst.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Subtotal</span>
//                     <span className="font-semibold">₹{calculatedTotals?.totalCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   {/* <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">GST (5%)</span>
//                     <span className="font-semibold">₹{calculatedTotals?.gst.toFixed(2) || '0.00'}</span>
//                   </div> */}

//                   {deliveryType === 'courier' && (
//                     <>
//                       <div className="flex justify-between py-2 border-t">
//                         <span className="text-muted-foreground">Order Weight</span>
//                         <span className="font-semibold">{formatWeight(orderWeight)}</span>
//                       </div>
                      
//                       <div className="flex justify-between py-2">
//                         <span className="text-muted-foreground">Delivery Partner</span>
//                         <span className="font-semibold text-green-600">
//                           {selectedCourierDetails?.courierName || 'Auto-selected'}
//                         </span>
//                       </div>

//                       <div className="flex justify-between py-2">
//                         <span className="text-muted-foreground">Delivery Charges</span>
//                         <span className="font-semibold text-primary">₹{deliveryCharge.toFixed(2)}</span>
//                       </div>
//                     </>
//                   )}

//                   <div className="border-t border-border pt-5 mt-4">
//                     <div className="flex justify-between items-center text-lg font-bold">
//                       <span className="text-foreground">Total Amount</span>
//                       <span className="text-primary text-2xl font-black">
//                         ₹{finalTotal.toFixed(2)}
//                       </span>
//                     </div>
//                     <p className="text-xs text-muted-foreground text-center mt-2">
//                       Inclusive of all taxes
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-8 space-y-4">
//                   <button
//                     onClick={handleCheckout}
//                     disabled={deliveryType === 'courier' && (!selectedPartner || serviceable === false)}
//                     className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5 group disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Proceed to Checkout 
//                     <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                   </button>

//                   <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
//                     <Shield className="h-4 w-4" />
//                     Secure checkout with Razorpay
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-6 border-t text-xs text-muted-foreground space-y-2">
//                   <div className="flex items-start gap-2">
//                     <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>GST invoice provided for every order</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>Real-time tracking</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>Best delivery partner</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }
















// import { useState, useEffect, useRef, useCallback } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   ShoppingCart, Trash2, Plus, Minus, ArrowRight, Shield, Truck, 
//   CheckCircle, Printer, Package, FileText, Clock, Zap, MapPin, 
//   AlertCircle, Edit2, X, Save
// } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { paperTypeLabels, bindingLabels, calculatePrice } from '@/lib/pricingData';
// import { toast } from 'sonner';

// interface CartItem {
//   _id: string;
//   pages: number;
//   copies: number;
//   paperSize?: string;
//   paperType?: string;
//   printColor?: 'bw' | 'color';
//   printSide?: 'single' | 'double';
//   bindingType?: string;
//   lamination?: string;
//   instructions?: string;
//   files?: Array<{
//     _id: string;
//     name: string;
//     size: number;
//     type: string;
//     status: string;
//   }>;
// }

// interface CartData {
//   items: CartItem[];
//   customer: {
//     name?: string;
//     phone?: string;
//     address?: string;
//     pincode?: string;
//     city?: string;
//     state?: string;
//     landmark?: string;
//     addressType?: 'Home' | 'Office';
//   };
//   orderMode: 'single' | 'bulk';
//   deliveryType: 'pickup' | 'courier';
//   deliveryPartner?: number;
//   deliveryCharge?: number;
//   totals: {
//     printingCost: number;
//     gst: number;
//     totalWithDelivery: number;
//   };
// }

// interface Courier {
//   id: number;
//   courierId: number;
//   courierName: string;
//   shippingCharge: number;
//   codCharge?: number;
//   rtoCharge?: number;
//   serviceMode?: string;
//   zoneName?: string;
//   expectedDelivery?: string;
// }

// const calculateOrderWeight = (items: CartItem[]): number => {
//   let totalWeightKg = 0;

//   items.forEach(item => {
//     const totalPages = item.pages * (item.copies || 1);
    
//     let paperWeightPerPage = 0.002;
    
//     if (item.paperType === 'premium') {
//       paperWeightPerPage = 0.005;
//     } else if (item.paperType === 'glossy') {
//       paperWeightPerPage = 0.004;
//     } else if (item.paperType === 'recycled') {
//       paperWeightPerPage = 0.0025;
//     }
    
//     let itemWeight = totalPages * paperWeightPerPage;
    
//     if (item.bindingType === 'spiral') {
//       itemWeight += 0.050;
//     } else if (item.bindingType === 'perfect') {
//       itemWeight += 0.080;
//     } else if (item.bindingType === 'hardcover') {
//       itemWeight += 0.200;
//     } else if (item.bindingType === 'saddle') {
//       itemWeight += 0.030;
//     }
    
//     if (item.lamination === 'matte' || item.lamination === 'glossy') {
//       itemWeight += totalPages * 0.001;
//     }
    
//     totalWeightKg += itemWeight;
//   });

//   if (totalWeightKg > 2) {
//     totalWeightKg += 0.3;
//   } else if (totalWeightKg > 1) {
//     totalWeightKg += 0.2;
//   } else {
//     totalWeightKg += 0.1;
//   }
  
//   return Math.max(0.1, Math.round(totalWeightKg * 1000) / 1000);
// };

// const calculateItemWeight = (item: CartItem): number => {
//   const totalPages = item.pages * (item.copies || 1);
  
//   let paperWeightPerPage = 0.002;
  
//   if (item.paperType === 'premium') {
//     paperWeightPerPage = 0.005;
//   } else if (item.paperType === 'glossy') {
//     paperWeightPerPage = 0.004;
//   } else if (item.paperType === 'recycled') {
//     paperWeightPerPage = 0.0025;
//   }
  
//   let weight = totalPages * paperWeightPerPage;
  
//   if (item.bindingType === 'spiral') {
//     weight += 0.050;
//   } else if (item.bindingType === 'perfect') {
//     weight += 0.080;
//   } else if (item.bindingType === 'hardcover') {
//     weight += 0.200;
//   } else if (item.bindingType === 'saddle') {
//     weight += 0.030;
//   }
  
//   if (item.lamination === 'matte' || item.lamination === 'glossy') {
//     weight += totalPages * 0.001;
//   }
  
//   return Math.round(weight * 1000) / 1000;
// };

// const formatWeight = (kg: number): string => {
//   return kg >= 1 ? `${kg.toFixed(2)} kg` : `${(kg * 1000).toFixed(0)} g`;
// };

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'https://bookprinters.in/api/api',
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default function Cart() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [cartData, setCartData] = useState<CartData | null>(null);
//   const [selectedPartner, setSelectedPartner] = useState<number | null>(null);
//   const [serviceable, setServiceable] = useState<boolean | null>(null);
//   const [checkingServiceability, setCheckingServiceability] = useState(false);
//   const [availableCouriers, setAvailableCouriers] = useState<Courier[]>([]);
//   const [deliveryCharge, setDeliveryCharge] = useState<number>(0);
//   const [serviceabilityMessage, setServiceabilityMessage] = useState<string>('');
  
//   const [showAddressModal, setShowAddressModal] = useState(false);
//   const [editingAddress, setEditingAddress] = useState({
//     address: '',
//     pincode: '',
//     city: '',
//     state: '',
//     landmark: '',
//     addressType: 'Home' as 'Home' | 'Office'
//   });
//   const [updatingAddress, setUpdatingAddress] = useState(false);

//   const lastCheckedPincode = useRef<string>('');
//   const lastCheckedWeight = useRef<number>(0);
//   const serviceabilityCheckTimeout = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   useEffect(() => {
//     if (cartData?.deliveryPartner) {
//       setSelectedPartner(cartData.deliveryPartner);
//     }
//     if (cartData?.deliveryCharge) {
//       setDeliveryCharge(cartData.deliveryCharge);
//     }
//   }, [cartData]);

//   useEffect(() => {
//     if (cartData?.deliveryType !== 'courier') return;
    
//     const pincode = cartData?.customer?.pincode;
//     const items = cartData?.items;
    
//     if (!pincode || pincode.length !== 6) return;
//     if (!items || items.length === 0) return;
    
//     const currentWeight = calculateOrderWeight(items);
    
//     const pincodeChanged = lastCheckedPincode.current !== pincode;
//     const weightChanged = Math.abs(lastCheckedWeight.current - currentWeight) > 0.01;
//     const isFirstCheck = lastCheckedPincode.current === '';
    
//     if (!isFirstCheck && !pincodeChanged && !weightChanged) {
//       console.log('Skipping serviceability check - no changes detected');
//       return;
//     }
    
//     if (serviceabilityCheckTimeout.current) {
//       clearTimeout(serviceabilityCheckTimeout.current);
//     }
    
//     serviceabilityCheckTimeout.current = setTimeout(() => {
//       checkServiceability();
//     }, 500);
    
//   }, [cartData?.customer?.pincode, cartData?.items, cartData?.deliveryType]);

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get('/cart');
      
//       if (response.data && response.data.items && response.data.items.length > 0) {
//         setCartData(response.data);
        
//         if (response.data.deliveryPartner && response.data.deliveryCharge) {
//           setSelectedPartner(response.data.deliveryPartner);
//           setDeliveryCharge(response.data.deliveryCharge);
//         }
//       } else {
//         setCartData(null);
//       }
//     } catch (error: any) {
//       console.error("Error fetching cart:", error);
//       if (error.response?.status === 401) {
//         navigate('/login');
//       }
//       toast.error("Failed to load cart");
//       setCartData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ FIXED: Auto-select cheapest courier - always use current API response
//   const autoSelectCheapestCourier = useCallback(async (couriers: Courier[]) => {
//     if (couriers.length === 0) return;
    
//     // Always get the cheapest from current API response
//     const cheapest = couriers.reduce((min, curr) => 
//       curr.shippingCharge < min.shippingCharge ? curr : min
//     );
    
//     console.log(`✅ Auto-selecting cheapest courier: ${cheapest.courierName} (₹${cheapest.shippingCharge})`);
    
//     // Always update with the new rate from API
//     setSelectedPartner(cheapest.id);
//     setDeliveryCharge(cheapest.shippingCharge);
    
//     // Save to cart
//     try {
//       await API.put('/cart/delivery-partner', { 
//         deliveryPartner: cheapest.id,
//         deliveryCharge: cheapest.shippingCharge
//       });
//       console.log("✅ Saved new delivery partner to cart");
//     } catch (err) {
//       console.error("Failed to save delivery partner:", err);
//     }
    
//   }, []);

//   // ✅ FIXED: Check serviceability with proper logging
//   const checkServiceability = useCallback(async () => {
//     if (!cartData?.customer?.pincode) return;
    
//     const pincode = cartData.customer.pincode;
//     const weight = calculateOrderWeight(cartData.items);
    
//     console.log("🔍 Checking serviceability with weight:", weight, "kg");
    
//     lastCheckedPincode.current = pincode;
//     lastCheckedWeight.current = weight;
    
//     setCheckingServiceability(true);
    
//     try {
//       const response = await API.post('/shipping/check-delivery', {
//         pincode: pincode,
//         warehousePincode: '305001',
//         weight: weight
//       });
      
//       console.log("📦 Backend response received");
      
//       if (response.data.success && response.data.data) {
//         const result = response.data.data;
//         setServiceable(result.serviceable);
//         setServiceabilityMessage(result.message);
        
//         if (result.serviceable && result.couriers?.list && result.couriers.list.length > 0) {
//           const couriers = result.couriers.list.map((c: any) => ({
//             id: c.courierId,
//             courierId: c.courierId,
//             courierName: c.courierName,
//             shippingCharge: parseFloat(c.shippingCharge),
//             serviceMode: c.serviceMode,
//             zoneName: c.zoneName,
//             expectedDelivery: c.expectedDelivery
//           }));
          
//           console.log("📦 Available couriers:", couriers.map(c => `${c.courierName}: ₹${c.shippingCharge}`));
          
//           setAvailableCouriers(couriers);
//           await autoSelectCheapestCourier(couriers);
//         } else {
//           setAvailableCouriers([]);
//           setDeliveryCharge(0);
//         }
//       }
//     } catch (error: any) {
//       console.error("Serviceability check failed:", error);
//       setServiceable(false);
//       setServiceabilityMessage(error.response?.data?.message || 'Failed to check delivery availability');
//       setAvailableCouriers([]);
//     } finally {
//       setCheckingServiceability(false);
//     }
//   }, [cartData?.customer?.pincode, cartData?.items, autoSelectCheapestCourier]);

//   const updateDeliveryAddress = async () => {
//     if (!cartData) return;
    
//     setUpdatingAddress(true);
    
//     try {
//       if (!editingAddress.pincode || editingAddress.pincode.length !== 6) {
//         toast.error('Please enter a valid 6-digit pincode');
//         return;
//       }
      
//       if (!editingAddress.address) {
//         toast.error('Please enter your address');
//         return;
//       }
      
//       if (!editingAddress.city) {
//         toast.error('Please enter your city');
//         return;
//       }
      
//       if (!editingAddress.state) {
//         toast.error('Please enter your state');
//         return;
//       }
      
//       const response = await API.put('/cart/address', {
//         address: editingAddress.address,
//         pincode: editingAddress.pincode,
//         city: editingAddress.city,
//         state: editingAddress.state,
//         landmark: editingAddress.landmark,
//         addressType: editingAddress.addressType
//       });
      
//       if (response.data && response.data.cart) {
//         setCartData(response.data.cart);
//         setShowAddressModal(false);
//         toast.success('Delivery address updated successfully');
        
//         setServiceable(null);
//         setAvailableCouriers([]);
//         setSelectedPartner(null);
//         setDeliveryCharge(0);
        
//         lastCheckedPincode.current = '';
//         lastCheckedWeight.current = 0;
//       }
//     } catch (error: any) {
//       console.error("Failed to update address:", error);
//       toast.error(error.response?.data?.message || "Failed to update address");
//     } finally {
//       setUpdatingAddress(false);
//     }
//   };

//   const openAddressModal = () => {
//     if (cartData?.customer) {
//       setEditingAddress({
//         address: cartData.customer.address || '',
//         pincode: cartData.customer.pincode || '',
//         city: cartData.customer.city || '',
//         state: cartData.customer.state || '',
//         landmark: cartData.customer.landmark || '',
//         addressType: cartData.customer.addressType || 'Home'
//       });
//     }
//     setShowAddressModal(true);
//   };

//   const calculateItemPrice = (item: CartItem) => {
//     try {
//       const priceData = calculatePrice({
//         pages: item.pages,
//         copies: item.copies,
//         paperSize: item.paperSize as any,
//         paperType: item.paperType as any,
//         printColor: item.printColor as any,
//         printSide: item.printSide as any,
//         bindingType: item.bindingType as any,
//       });
//       return priceData;
//     } catch (error) {
//       console.error("Error calculating price:", error);
//       return {
//         totalCost: 0,
//         grandTotal: 0,
//         pricePerPage: 0,
//         printingCost: 0,
//         bindingCost: 0,
//         gst: 0
//       };
//     }
//   };

//   const updateQuantity = async (_id: string, newQty: number) => {
//     if (newQty < 1) return;
    
//     const previousCartData = cartData;
    
//     try {
//       if (cartData) {
//         const updatedItems = cartData.items.map(item => 
//           item._id === _id ? { ...item, copies: newQty } : item
//         );
//         setCartData({ ...cartData, items: updatedItems });
//       }
      
//       const response = await API.put(`/cart/item/${_id}`, { copies: newQty });
      
//       if (response.data && response.data.items) {
//         setCartData(response.data);
//       }
      
//       lastCheckedWeight.current = 0;
//       toast.success("Quantity updated");
//     } catch (error: any) {
//       console.error("Update failed:", error);
//       setCartData(previousCartData);
//       toast.error(error.response?.data?.message || "Failed to update quantity");
//     }
//   };

//   const removeItem = async (_id: string) => {
//     const previousCartData = cartData;
    
//     try {
//       if (cartData) {
//         const updatedItems = cartData.items.filter(item => item._id !== _id);
//         if (updatedItems.length > 0) {
//           setCartData({ ...cartData, items: updatedItems });
//         } else {
//           setCartData(null);
//         }
//       }
      
//       await API.delete(`/cart/item/${_id}`);
//       lastCheckedWeight.current = 0;
//       toast.success("Item removed");
//     } catch (error: any) {
//       console.error("Delete failed:", error);
//       setCartData(previousCartData);
//       toast.error(error.response?.data?.message || "Failed to remove item");
//     }
//   };

//   const handleCheckout = async () => {
//     try {
//       if (!cartData) {
//         toast.error("Cart is empty");
//         return;
//       }

//       if (cartData.deliveryType === 'courier') {
//         if (!cartData.customer?.pincode || !cartData.customer?.address) {
//           toast.error("Please add your delivery address");
//           openAddressModal();
//           return;
//         }
        
//         if (!selectedPartner) {
//           toast.error("No delivery partner available for your location");
//           return;
//         }
        
//         if (!serviceable) {
//           toast.error("Delivery not available to your pincode");
//           return;
//         }
//       }

//       const itemsWithDetails = cartData.items.map(item => {
//         const priceData = calculateItemPrice(item);
//         return {
//           ...item,
//           productValue: priceData.grandTotal,
//           itemWeight: calculateItemWeight(item),
//           itemDetails: {
//             pages: item.pages,
//             copies: item.copies,
//             paperType: item.paperType,
//             printColor: item.printColor,
//             bindingType: item.bindingType,
//             lamination: item.lamination
//           }
//         };
//       });

//       const totalWeight = calculateOrderWeight(cartData.items);
//       const subtotal = calculatedTotals?.grandTotal || 0;
//       const totalAmount = subtotal + deliveryCharge;

//       const payload = {
//         items: itemsWithDetails,
//         customer: cartData.customer,
//         deliveryType: cartData.deliveryType,
//         deliveryPartner: cartData.deliveryType === 'courier' ? selectedPartner : undefined,
//         deliveryCharge: cartData.deliveryType === 'courier' ? deliveryCharge : 0,
//         orderWeight: totalWeight,
//         orderMode: cartData.orderMode,
//         totalAmount: totalAmount,
//         subtotal: subtotal,
//         declaredValue: subtotal,
//         productValues: itemsWithDetails.map(i => i.productValue)
//       };

//       console.log("📦 CHECKOUT PAYLOAD:", {
//         totalWeight: totalWeight + " kg",
//         deliveryCharge: "₹" + deliveryCharge,
//         totalAmount: "₹" + totalAmount
//       });

//       const res = await API.post('/order/create-from-cart', payload);
//       const orderData = res.data;
//       const order = orderData.order;

//       if (!order?._id) {
//         throw new Error("Order ID missing from response");
//       }

//       localStorage.setItem("pendingOrder", JSON.stringify({
//         orderId: order._id,
//         amount: totalAmount,
//         orderNumber: order.orderNumber,
//         deliveryPartner: selectedPartner,
//         deliveryCharge: deliveryCharge,
//         orderWeight: totalWeight,
//         declaredValue: payload.declaredValue
//       }));

//       navigate('/checkout', {
//         state: {
//           orderId: order._id,
//           amount: totalAmount,
//           orderNumber: order.orderNumber,
//           deliveryPartner: selectedPartner,
//           deliveryCharge: deliveryCharge,
//           orderWeight: totalWeight,
//           declaredValue: payload.declaredValue
//         }
//       });

//     } catch (error: any) {
//       console.error("Checkout failed:", error);
//       toast.error(error.response?.data?.message || "Checkout failed");
//     }
//   };

//   const clearCart = async () => {
//     if (!window.confirm('Are you sure you want to clear your cart?')) return;
    
//     const previousCartData = cartData;
    
//     try {
//       setCartData(null);
//       await API.delete('/cart');
//       toast.success("Cart cleared");
//     } catch (error: any) {
//       console.error("Clear failed:", error);
//       setCartData(previousCartData);
//       toast.error("Failed to clear cart");
//     }
//   };

//   const calculatedTotals = cartData?.items.reduce((sum, item) => {
//     const price = calculateItemPrice(item);
//     return {
//       printingCost: sum.printingCost + price.printingCost,
//       bindingCost: sum.bindingCost + price.bindingCost,
//       totalCost: sum.totalCost + price.totalCost + sum.gst + price.gst,
//       gst: sum.gst + price.gst,
//       grandTotal: sum.grandTotal + price.grandTotal
//     };
//   }, { printingCost: 0, bindingCost: 0, totalCost: 0, gst: 0, grandTotal: 0 });

//   const deliveryType = cartData?.deliveryType || 'pickup';
//   const customer = cartData?.customer || {};
//   const hasItems = cartData !== null && cartData.items && cartData.items.length > 0;
//   const orderWeight = hasItems ? calculateOrderWeight(cartData.items) : 0;
//   const finalTotal = (calculatedTotals?.grandTotal || 0) + deliveryCharge;
//   const selectedCourierDetails = selectedPartner 
//     ? availableCouriers.find(c => c.id === selectedPartner)
//     : null;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center">
//             <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
//             <p className="text-muted-foreground">Loading your cart...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (!hasItems) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center max-w-md">
//             <ShoppingCart className="h-20 w-20 mx-auto mb-6 text-muted-foreground/70" strokeWidth={1.2} />
//             <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
//             <p className="text-muted-foreground mb-8">
//               You haven't added any printing orders yet.
//             </p>
//             <Link
//               to="/order"
//               className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 text-lg shadow-md transition-all duration-300 hover:scale-105"
//             >
//               Start New Order <ArrowRight className="h-5 w-5" />
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

//       {showAddressModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-bold">Edit Delivery Address</h3>
//                 <button onClick={() => setShowAddressModal(false)} className="p-1 hover:bg-gray-100 rounded">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Address *</label>
//                   <textarea
//                     value={editingAddress.address}
//                     onChange={(e) => setEditingAddress({...editingAddress, address: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
//                     rows={3}
//                     placeholder="Street address, apartment, building"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Landmark (Optional)</label>
//                   <input
//                     type="text"
//                     value={editingAddress.landmark}
//                     onChange={(e) => setEditingAddress({...editingAddress, landmark: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="Near some landmark"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Pincode *</label>
//                   <input
//                     type="text"
//                     value={editingAddress.pincode}
//                     onChange={(e) => setEditingAddress({...editingAddress, pincode: e.target.value.replace(/\D/g, '').slice(0, 6)})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="6-digit pincode"
//                     maxLength={6}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">City *</label>
//                   <input
//                     type="text"
//                     value={editingAddress.city}
//                     onChange={(e) => setEditingAddress({...editingAddress, city: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="City"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">State *</label>
//                   <input
//                     type="text"
//                     value={editingAddress.state}
//                     onChange={(e) => setEditingAddress({...editingAddress, state: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="State"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Address Type</label>
//                   <div className="flex gap-4">
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         value="Home"
//                         checked={editingAddress.addressType === 'Home'}
//                         onChange={() => setEditingAddress({...editingAddress, addressType: 'Home'})}
//                       />
//                       Home
//                     </label>
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         value="Office"
//                         checked={editingAddress.addressType === 'Office'}
//                         onChange={() => setEditingAddress({...editingAddress, addressType: 'Office'})}
//                       />
//                       Office
//                     </label>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={() => setShowAddressModal(false)}
//                   className="flex-1 py-2 border rounded-lg hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={updateDeliveryAddress}
//                   disabled={updatingAddress}
//                   className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
//                 >
//                   {updatingAddress ? 'Saving...' : 'Save Address'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <section className="relative bg-secondary py-12 md:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center">
//             <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
//               <ShoppingCart className="h-5 w-5" />
//               Your Order Cart
//             </div>
//             <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
//               Review Your Printing Order
//             </h1>
//             <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto">
//               Modify quantities, remove items, or proceed to secure checkout
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-12 md:py-16 bg-background">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
//             <div className="lg:col-span-8 space-y-6">
              
//               <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="font-bold text-lg flex items-center gap-2">
//                     <Package className="h-5 w-5 text-primary" />
//                     Customer & Delivery Details
//                   </h3>
//                   {deliveryType === 'courier' && (
//                     <button
//                       onClick={openAddressModal}
//                       className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
//                     >
//                       <Edit2 className="h-3 w-3" />
//                       Edit Address
//                     </button>
//                   )}
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Name</span>
//                     <p className="font-medium text-foreground mt-1">{customer.name || '—'}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Phone</span>
//                     <p className="font-medium text-foreground mt-1">{customer.phone || '—'}</p>
//                   </div>
//                   <div className="sm:col-span-2">
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Method</span>
//                     <p className="font-medium text-foreground mt-1 flex items-center gap-2">
//                       {deliveryType === 'courier' ? (
//                         <>
//                           <Truck className="h-4 w-4 text-primary" />
//                           Courier Delivery
//                         </>
//                       ) : (
//                         <>
//                           <Package className="h-4 w-4 text-primary" />
//                           Store Pickup
//                         </>
//                       )}
//                     </p>
//                   </div>
//                   {deliveryType === 'courier' && (
//                     <>
//                       <div className="sm:col-span-2">
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Address</span>
//                         <p className="font-medium text-foreground mt-1">{customer.address || '—'}</p>
//                         {customer.landmark && (
//                           <p className="text-xs text-muted-foreground mt-1">Landmark: {customer.landmark}</p>
//                         )}
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Pincode / City</span>
//                         <p className="font-medium text-foreground mt-1">
//                           {customer.pincode || '—'} {customer.city ? `, ${customer.city}` : ''}
//                         </p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">State</span>
//                         <p className="font-medium text-foreground mt-1">{customer.state || '—'}</p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Order Weight</span>
//                         <p className="font-medium text-foreground mt-1 flex items-center gap-1">
//                           <Package className="h-3 w-3" />
//                           {formatWeight(orderWeight)}
//                         </p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {deliveryType === 'courier' && (
//                 <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-bold text-lg flex items-center gap-2">
//                       <Truck className="h-5 w-5 text-primary" />
//                       Delivery Partner
//                     </h3>
//                     {(checkingServiceability) && (
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
//                         Checking...
//                       </div>
//                     )}
//                   </div>

//                   {!customer.pincode ? (
//                     <div className="text-center py-8 text-muted-foreground">
//                       <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
//                       <p>Please add your pincode to see delivery options</p>
//                       <button 
//                         onClick={openAddressModal}
//                         className="mt-3 text-primary hover:underline"
//                       >
//                         Add Address →
//                       </button>
//                     </div>
//                   ) : serviceable === false ? (
//                     <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
//                       <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
//                       <p className="text-red-700 font-medium">Delivery not available to {customer.pincode}</p>
//                       <p className="text-red-600 text-sm mt-1">{serviceabilityMessage}</p>
//                       <button 
//                         onClick={openAddressModal}
//                         className="mt-3 text-red-600 hover:text-red-700 underline text-sm"
//                       >
//                         Try different address →
//                       </button>
//                     </div>
//                   ) : availableCouriers.length === 0 && !checkingServiceability ? (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
//                       <p className="text-yellow-700">No couriers available for this pincode</p>
//                       <button 
//                         onClick={checkServiceability}
//                         className="mt-2 text-primary hover:underline text-sm"
//                       >
//                         Retry →
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       {selectedCourierDetails && (
//                         <div className="bg-green-50 border border-green-200 rounded-lg p-5">
//                           <div className="flex items-start gap-3">
//                             <div className="bg-green-100 rounded-full p-2">
//                               <CheckCircle className="h-5 w-5 text-green-600" />
//                             </div>
//                             <div className="flex-1">
//                               <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
//                                 <div>
//                                   <span className="text-green-600">Courier Partner:</span>
//                                   <p className="font-medium text-green-800">{selectedCourierDetails.courierName}</p>
//                                 </div>
//                                 <div>
//                                   <span className="text-green-600">Delivery Charge:</span>
//                                   <p className="font-bold text-green-800 text-lg">₹{deliveryCharge.toFixed(2)}</p>
//                                 </div>
//                                 {selectedCourierDetails.expectedDelivery && (
//                                   <div className="col-span-2">
//                                     <span className="text-green-600">Expected Delivery:</span>
//                                     <p className="font-medium text-green-700">{selectedCourierDetails.expectedDelivery}</p>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               )}

//               {cartData?.items.map((item, index) => {
//                 const itemTitle = item.paperSize
//                   ? `${item.paperSize} • ${item.printColor?.toUpperCase()} • ${item.printSide} side`
//                   : `Custom Print Job ${index + 1}`;
                
//                 const files = item.files || [];
//                 const priceData = calculateItemPrice(item);

//                 return (
//                   <div key={item._id} className="bg-white rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition-all duration-300">
//                     <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6">
//                       <div className="w-full sm:w-32 md:w-40 h-40 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center shrink-0">
//                         <Printer className="h-12 w-12 text-primary/60" strokeWidth={1.5} />
//                       </div>

//                       <div className="flex-1 flex flex-col">
//                         <div className="flex justify-between items-start gap-4 mb-3">
//                           <h3 className="font-bold text-lg md:text-xl leading-tight text-foreground">
//                             {itemTitle}
//                           </h3>
//                           <button
//                             onClick={() => removeItem(item._id)}
//                             className="text-red-500 hover:text-red-700 p-1.5 -mr-1.5 transition-colors"
//                           >
//                             <Trash2 className="h-5 w-5" />
//                           </button>
//                         </div>

//                         <div className="text-sm text-muted-foreground mb-4 space-y-1">
//                           <p className="font-medium text-foreground">
//                             {item.pages} pages × {item.copies} copies
//                           </p>
//                           <p>
//                             {paperTypeLabels[item.paperType || ''] || item.paperType || '—'} •{' '}
//                             {item.printColor === 'bw' ? 'B&W' : 'Color'} •{' '}
//                             {item.printSide === 'double' ? 'Double' : 'Single'} sided
//                           </p>
//                           <p>
//                             Binding: {bindingLabels[item.bindingType || ''] || item.bindingType || '—'}
//                           </p>
//                           {item.lamination && item.lamination !== 'none' && (
//                             <p>Lamination: {item.lamination.charAt(0).toUpperCase() + item.lamination.slice(1)}</p>
//                           )}
//                         </div>

//                         {files.length > 0 && (
//                           <div className="mb-4 text-xs">
//                             <p className="text-muted-foreground mb-1 flex items-center gap-1">
//                               <FileText className="h-3 w-3" />
//                               Uploaded Files:
//                             </p>
//                             <ul className="space-y-1">
//                               {files.map(f => (
//                                 <li key={f._id} className="flex items-center gap-2 text-muted-foreground">
//                                   <FileText className="h-3 w-3 text-primary/70" />
//                                   <span className="truncate max-w-[200px]">{f.name}</span>
//                                   <span className="text-xs">
//                                     ({(f.size / 1024 / 1024).toFixed(1)} MB)
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                         <div className="mt-auto flex flex-wrap justify-between items-center gap-4 pt-2">
//                           <div className="flex border border-border rounded-lg overflow-hidden bg-muted/30">
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies - 1)}
//                               disabled={item.copies <= 1}
//                               className="px-4 py-2 hover:bg-muted transition-colors disabled:opacity-50"
//                             >
//                               <Minus className="h-4 w-4" />
//                             </button>
//                             <span className="px-5 py-2 font-semibold min-w-[3.5rem] text-center bg-white">
//                               {item.copies}
//                             </span>
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies + 1)}
//                               className="px-4 py-2 hover:bg-muted transition-colors"
//                             >
//                               <Plus className="h-4 w-4" />
//                             </button>
//                           </div>

//                           <div className="text-right">
//                             <div className="text-lg font-bold text-primary">
//                               ₹{priceData.grandTotal.toFixed(2)}
//                             </div>
//                             <div className="text-xs text-muted-foreground">
//                               ₹{priceData.pricePerPage.toFixed(2)}/page
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}

//               <div className="flex justify-between items-center pt-4">
//                 <Link
//                   to="/order"
//                   className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group"
//                 >
//                   <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
//                   Continue Adding Orders
//                 </Link>
                
//                 <button
//                   onClick={clearCart}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
//                 >
//                   Clear Cart
//                 </button>
//               </div>
//             </div>

//             <div className="lg:col-span-4">
//               <div className="bg-white rounded-xl shadow-lg border p-6 md:p-8 sticky top-6">
//                 <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
//                   <Package className="h-6 w-6 text-primary" />
//                   Order Summary
//                 </h2>

//                 <div className="space-y-4 text-sm">
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Items</span>
//                     <span className="font-semibold">{cartData?.items.length || 0}</span>
//                   </div>

//                   <div className="flex justify-between py-2 border-t">
//                     <span className="text-muted-foreground">Printing Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.printingCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Binding Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.bindingCost.toFixed(2) || '0.00'}</span>
//                   </div>
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">GST (5%)</span>
//                     <span className="font-semibold">₹{calculatedTotals?.gst.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Subtotal</span>
//                     <span className="font-semibold">₹{calculatedTotals?.totalCost.toFixed(2) || '0.00'}</span>
//                   </div>

//                   {deliveryType === 'courier' && (
//                     <>
//                       <div className="flex justify-between py-2 border-t">
//                         <span className="text-muted-foreground">Order Weight</span>
//                         <span className="font-semibold">{formatWeight(orderWeight)}</span>
//                       </div>
                      
//                       <div className="flex justify-between py-2">
//                         <span className="text-muted-foreground">Delivery Partner</span>
//                         <span className="font-semibold text-green-600">
//                           {selectedCourierDetails?.courierName || 'Auto-selected'}
//                         </span>
//                       </div>

//                       <div className="flex justify-between py-2">
//                         <span className="text-muted-foreground">Delivery Charges</span>
//                         <span className="font-semibold text-primary">₹{deliveryCharge.toFixed(2)}</span>
//                       </div>
//                     </>
//                   )}

//                   <div className="border-t border-border pt-5 mt-4">
//                     <div className="flex justify-between items-center text-lg font-bold">
//                       <span className="text-foreground">Total Amount</span>
//                       <span className="text-primary text-2xl font-black">
//                         ₹{finalTotal.toFixed(2)}
//                       </span>
//                     </div>
//                     <p className="text-xs text-muted-foreground text-center mt-2">
//                       Inclusive of all taxes
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-8 space-y-4">
//                   <button
//                     onClick={handleCheckout}
//                     disabled={deliveryType === 'courier' && (!selectedPartner || serviceable === false)}
//                     className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5 group disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Proceed to Checkout 
//                     <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                   </button>

//                   <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
//                     <Shield className="h-4 w-4" />
//                     Secure checkout with Razorpay
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-6 border-t text-xs text-muted-foreground space-y-2">
//                   <div className="flex items-start gap-2">
//                     <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>GST invoice provided for every order</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>Real-time tracking</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>Best delivery partner</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }






// import { useState, useEffect, useRef, useCallback } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   ShoppingCart, Trash2, Plus, Minus, ArrowRight, Shield, Truck, 
//   CheckCircle, Printer, Package, FileText, Clock, Zap, MapPin, 
//   AlertCircle, Edit2, X, Save
// } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { paperTypeLabels, bindingLabels, calculatePrice } from '@/lib/pricingData';
// import { toast } from 'sonner';

// interface CartItem {
//   _id: string;
//   pages: number;
//   copies: number;
//   paperSize?: string;
//   paperType?: string;
//   printColor?: 'bw' | 'color';
//   printSide?: 'single' | 'double';
//   bindingType?: string;
//   lamination?: string;
//   instructions?: string;
//   files?: Array<{
//     _id: string;
//     name: string;
//     size: number;
//     type: string;
//     status: string;
//   }>;
// }

// interface CartData {
//   items: CartItem[];
//   customer: {
//     name?: string;
//     phone?: string;
//     address?: string;
//     pincode?: string;
//     city?: string;
//     state?: string;
//     landmark?: string;
//     addressType?: 'Home' | 'Office';
//   };
//   orderMode: 'single' | 'bulk';
//   deliveryType: 'pickup' | 'courier';
//   totals: {
//     printingCost: number;
//     gst: number;
//     totalWithDelivery: number;
//   };
// }

// const calculateOrderWeight = (items: CartItem[]): number => {
//   let totalWeightKg = 0;

//   items.forEach(item => {
//     const totalPages = item.pages * (item.copies || 1);
    
//     let paperWeightPerPage = 0.002;
    
//     if (item.paperType === 'premium') {
//       paperWeightPerPage = 0.005;
//     } else if (item.paperType === 'glossy') {
//       paperWeightPerPage = 0.004;
//     } else if (item.paperType === 'recycled') {
//       paperWeightPerPage = 0.0025;
//     }
    
//     let itemWeight = totalPages * paperWeightPerPage;
    
//     if (item.bindingType === 'spiral') {
//       itemWeight += 0.050;
//     } else if (item.bindingType === 'perfect') {
//       itemWeight += 0.080;
//     } else if (item.bindingType === 'hardcover') {
//       itemWeight += 0.200;
//     } else if (item.bindingType === 'saddle') {
//       itemWeight += 0.030;
//     }
    
//     if (item.lamination === 'matte' || item.lamination === 'glossy') {
//       itemWeight += totalPages * 0.001;
//     }
    
//     totalWeightKg += itemWeight;
//   });

//   if (totalWeightKg > 2) {
//     totalWeightKg += 0.3;
//   } else if (totalWeightKg > 1) {
//     totalWeightKg += 0.2;
//   } else {
//     totalWeightKg += 0.1;
//   }
  
//   return Math.max(0.1, Math.round(totalWeightKg * 1000) / 1000);
// };

// const calculateItemWeight = (item: CartItem): number => {
//   const totalPages = item.pages * (item.copies || 1);
  
//   let paperWeightPerPage = 0.002;
  
//   if (item.paperType === 'premium') {
//     paperWeightPerPage = 0.005;
//   } else if (item.paperType === 'glossy') {
//     paperWeightPerPage = 0.004;
//   } else if (item.paperType === 'recycled') {
//     paperWeightPerPage = 0.0025;
//   }
  
//   let weight = totalPages * paperWeightPerPage;
  
//   if (item.bindingType === 'spiral') {
//     weight += 0.050;
//   } else if (item.bindingType === 'perfect') {
//     weight += 0.080;
//   } else if (item.bindingType === 'hardcover') {
//     weight += 0.200;
//   } else if (item.bindingType === 'saddle') {
//     weight += 0.030;
//   }
  
//   if (item.lamination === 'matte' || item.lamination === 'glossy') {
//     weight += totalPages * 0.001;
//   }
  
//   return Math.round(weight * 1000) / 1000;
// };

// const formatWeight = (kg: number): string => {
//   return kg >= 1 ? `${kg.toFixed(2)} kg` : `${(kg * 1000).toFixed(0)} g`;
// };

// // Calculate delivery charge based on weight slabs
// const calculateDeliveryCharge = (weightKg: number): number => {
//   if (weightKg < 0.5) {
//     return 50; // Under 500 gram
//   } else if (weightKg >= 0.5 && weightKg < 1) {
//     return 100; // 500 gram to 1kg
//   } else if (weightKg >= 1 && weightKg < 3) {
//     return 200; // 1kg to 3 kg
//   } else if (weightKg >= 3 && weightKg < 5) {
//     return 230; // 3 kg to 5 kg
//   } else if (weightKg >= 5 && weightKg < 10) {
//     return 400; // 5kg to 10 kg
//   } else if (weightKg >= 10 && weightKg < 15) {
//     return 700; // 10 kg to 15 kg
//   } else if (weightKg >= 15 && weightKg < 20) {
//     return 900; // 15kg to 20 kg
//   } else if (weightKg >= 20 && weightKg < 40) {
//     return 1200; // 20kg to 40 kg
//   } else if (weightKg >= 40 && weightKg < 80) {
//     return 1600; // 40 kg to 80 kg
//   } else if (weightKg >= 80) {
//     return Math.ceil(weightKg) * 10; // Above 80 kg = 10 rs per kg
//   }
//   return 50; // Default fallback
// };

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'https://bookprinters.in/api/api',
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default function Cart() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [cartData, setCartData] = useState<CartData | null>(null);
//   const [deliveryCharge, setDeliveryCharge] = useState<number>(0);
  
//   const [showAddressModal, setShowAddressModal] = useState(false);
//   const [editingAddress, setEditingAddress] = useState({
//     address: '',
//     pincode: '',
//     city: '',
//     state: '',
//     landmark: '',
//     addressType: 'Home' as 'Home' | 'Office'
//   });
//   const [updatingAddress, setUpdatingAddress] = useState(false);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   // Update delivery charge whenever cart items change (weight changes)
//   useEffect(() => {
//     if (cartData?.items && cartData.items.length > 0 && cartData.deliveryType === 'courier') {
//       const weight = calculateOrderWeight(cartData.items);
//       const charge = calculateDeliveryCharge(weight);
      
//       // Only update if charge actually changed
//       if (charge !== deliveryCharge) {
//         setDeliveryCharge(charge);
        
//         // Save delivery charge to cart
//         const saveDeliveryCharge = async () => {
//           try {
//             await API.put('/cart/delivery-charge', { deliveryCharge: charge });
//           } catch (err) {
//             console.error("Failed to save delivery charge:", err);
//           }
//         };
//         saveDeliveryCharge();
//       }
//     } else if (cartData?.deliveryType === 'pickup') {
//       if (deliveryCharge !== 0) {
//         setDeliveryCharge(0);
//       }
//     }
//   }, [cartData?.items, cartData?.deliveryType]);

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get('/cart');
      
//       if (response.data && response.data.items && response.data.items.length > 0) {
//         setCartData(response.data);
        
//         // ✅ FIX: Always recalculate based on current weight, ignore saved deliveryCharge
//         if (response.data.deliveryType === 'courier') {
//           const weight = calculateOrderWeight(response.data.items);
//           const newCharge = calculateDeliveryCharge(weight);
//           setDeliveryCharge(newCharge);
          
//           // Update the backend to remove old deliveryCharge value
//           try {
//             await API.put('/cart/delivery-charge', { deliveryCharge: newCharge });
//           } catch (err) {
//             console.error("Failed to update delivery charge:", err);
//           }
//         } else {
//           setDeliveryCharge(0);
//         }
//       } else {
//         setCartData(null);
//         setDeliveryCharge(0);
//       }
//     } catch (error: any) {
//       console.error("Error fetching cart:", error);
//       if (error.response?.status === 401) {
//         navigate('/login');
//       }
//       toast.error("Failed to load cart");
//       setCartData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateDeliveryAddress = async () => {
//     if (!cartData) return;
    
//     setUpdatingAddress(true);
    
//     try {
//       if (!editingAddress.pincode || editingAddress.pincode.length !== 6) {
//         toast.error('Please enter a valid 6-digit pincode');
//         return;
//       }
      
//       if (!editingAddress.address) {
//         toast.error('Please enter your address');
//         return;
//       }
      
//       if (!editingAddress.city) {
//         toast.error('Please enter your city');
//         return;
//       }
      
//       if (!editingAddress.state) {
//         toast.error('Please enter your state');
//         return;
//       }
      
//       const response = await API.put('/cart/address', {
//         address: editingAddress.address,
//         pincode: editingAddress.pincode,
//         city: editingAddress.city,
//         state: editingAddress.state,
//         landmark: editingAddress.landmark,
//         addressType: editingAddress.addressType
//       });
      
//       if (response.data && response.data.cart) {
//         setCartData(response.data.cart);
//         setShowAddressModal(false);
//         toast.success('Delivery address updated successfully');
        
//         // Recalculate delivery charge after address update
//         if (response.data.cart.deliveryType === 'courier') {
//           const weight = calculateOrderWeight(response.data.cart.items);
//           const newCharge = calculateDeliveryCharge(weight);
//           setDeliveryCharge(newCharge);
          
//           try {
//             await API.put('/cart/delivery-charge', { deliveryCharge: newCharge });
//           } catch (err) {
//             console.error("Failed to update delivery charge:", err);
//           }
//         }
//       }
//     } catch (error: any) {
//       console.error("Failed to update address:", error);
//       toast.error(error.response?.data?.message || "Failed to update address");
//     } finally {
//       setUpdatingAddress(false);
//     }
//   };

//   const openAddressModal = () => {
//     if (cartData?.customer) {
//       setEditingAddress({
//         address: cartData.customer.address || '',
//         pincode: cartData.customer.pincode || '',
//         city: cartData.customer.city || '',
//         state: cartData.customer.state || '',
//         landmark: cartData.customer.landmark || '',
//         addressType: cartData.customer.addressType || 'Home'
//       });
//     }
//     setShowAddressModal(true);
//   };

//   const calculateItemPrice = (item: CartItem) => {
//     try {
//       const priceData = calculatePrice({
//         pages: item.pages,
//         copies: item.copies,
//         paperSize: item.paperSize as any,
//         paperType: item.paperType as any,
//         printColor: item.printColor as any,
//         printSide: item.printSide as any,
//         bindingType: item.bindingType as any,
//       });
//       return priceData;
//     } catch (error) {
//       console.error("Error calculating price:", error);
//       return {
//         totalCost: 0,
//         grandTotal: 0,
//         pricePerPage: 0,
//         printingCost: 0,
//         bindingCost: 0,
//         gst: 0
//       };
//     }
//   };

//   const updateQuantity = async (_id: string, newQty: number) => {
//     if (newQty < 1) return;
    
//     const previousCartData = cartData;
    
//     try {
//       if (cartData) {
//         const updatedItems = cartData.items.map(item => 
//           item._id === _id ? { ...item, copies: newQty } : item
//         );
//         setCartData({ ...cartData, items: updatedItems });
//       }
      
//       const response = await API.put(`/cart/item/${_id}`, { copies: newQty });
      
//       if (response.data && response.data.items) {
//         setCartData(response.data);
        
//         // Recalculate delivery charge after quantity update
//         if (response.data.deliveryType === 'courier') {
//           const weight = calculateOrderWeight(response.data.items);
//           const newCharge = calculateDeliveryCharge(weight);
//           setDeliveryCharge(newCharge);
          
//           try {
//             await API.put('/cart/delivery-charge', { deliveryCharge: newCharge });
//           } catch (err) {
//             console.error("Failed to update delivery charge:", err);
//           }
//         }
//       }
      
//       toast.success("Quantity updated");
//     } catch (error: any) {
//       console.error("Update failed:", error);
//       setCartData(previousCartData);
//       toast.error(error.response?.data?.message || "Failed to update quantity");
//     }
//   };

//   const removeItem = async (_id: string) => {
//     const previousCartData = cartData;
    
//     try {
//       if (cartData) {
//         const updatedItems = cartData.items.filter(item => item._id !== _id);
//         if (updatedItems.length > 0) {
//           setCartData({ ...cartData, items: updatedItems });
//         } else {
//           setCartData(null);
//         }
//       }
      
//       await API.delete(`/cart/item/${_id}`);
      
//       // Recalculate delivery charge after item removal
//       if (cartData && cartData.deliveryType === 'courier') {
//         const remainingItems = cartData.items.filter(item => item._id !== _id);
//         if (remainingItems.length > 0) {
//           const weight = calculateOrderWeight(remainingItems);
//           const newCharge = calculateDeliveryCharge(weight);
//           setDeliveryCharge(newCharge);
          
//           try {
//             await API.put('/cart/delivery-charge', { deliveryCharge: newCharge });
//           } catch (err) {
//             console.error("Failed to update delivery charge:", err);
//           }
//         } else {
//           setDeliveryCharge(0);
//         }
//       }
      
//       toast.success("Item removed");
//     } catch (error: any) {
//       console.error("Delete failed:", error);
//       setCartData(previousCartData);
//       toast.error(error.response?.data?.message || "Failed to remove item");
//     }
//   };

//   const handleCheckout = async () => {
//     try {
//       if (!cartData) {
//         toast.error("Cart is empty");
//         return;
//       }

//       if (cartData.deliveryType === 'courier') {
//         if (!cartData.customer?.pincode || !cartData.customer?.address) {
//           toast.error("Please add your delivery address");
//           openAddressModal();
//           return;
//         }
//       }

//       const itemsWithDetails = cartData.items.map(item => {
//         const priceData = calculateItemPrice(item);
//         return {
//           ...item,
//           productValue: priceData.grandTotal,
//           itemWeight: calculateItemWeight(item),
//           itemDetails: {
//             pages: item.pages,
//             copies: item.copies,
//             paperType: item.paperType,
//             printColor: item.printColor,
//             bindingType: item.bindingType,
//             lamination: item.lamination
//           }
//         };
//       });

//       const totalWeight = calculateOrderWeight(cartData.items);
//       const subtotal = calculatedTotals?.grandTotal || 0;
//       const totalAmount = subtotal + deliveryCharge;

//       const payload = {
//         items: itemsWithDetails,
//         customer: cartData.customer,
//         deliveryType: cartData.deliveryType,
//         deliveryCharge: cartData.deliveryType === 'courier' ? deliveryCharge : 0,
//         orderWeight: totalWeight,
//         orderMode: cartData.orderMode,
//         totalAmount: totalAmount,
//         subtotal: subtotal,
//         declaredValue: subtotal,
//         productValues: itemsWithDetails.map(i => i.productValue)
//       };

//       console.log("📦 CHECKOUT PAYLOAD:", {
//         totalWeight: totalWeight + " kg",
//         deliveryCharge: "₹" + deliveryCharge,
//         totalAmount: "₹" + totalAmount
//       });

//       const res = await API.post('/order/create-from-cart', payload);
//       const orderData = res.data;
//       const order = orderData.order;

//       if (!order?._id) {
//         throw new Error("Order ID missing from response");
//       }

//       localStorage.setItem("pendingOrder", JSON.stringify({
//         orderId: order._id,
//         amount: totalAmount,
//         orderNumber: order.orderNumber,
//         deliveryCharge: deliveryCharge,
//         orderWeight: totalWeight,
//         declaredValue: payload.declaredValue
//       }));

//       navigate('/checkout', {
//         state: {
//           orderId: order._id,
//           amount: totalAmount,
//           orderNumber: order.orderNumber,
//           deliveryCharge: deliveryCharge,
//           orderWeight: totalWeight,
//           declaredValue: payload.declaredValue
//         }
//       });

//     } catch (error: any) {
//       console.error("Checkout failed:", error);
//       toast.error(error.response?.data?.message || "Checkout failed");
//     }
//   };

//   const clearCart = async () => {
//     if (!window.confirm('Are you sure you want to clear your cart?')) return;
    
//     const previousCartData = cartData;
    
//     try {
//       setCartData(null);
//       setDeliveryCharge(0);
//       await API.delete('/cart');
//       toast.success("Cart cleared");
//     } catch (error: any) {
//       console.error("Clear failed:", error);
//       setCartData(previousCartData);
//       toast.error("Failed to clear cart");
//     }
//   };

//   const calculatedTotals = cartData?.items.reduce((sum, item) => {
//     const price = calculateItemPrice(item);
//     return {
//       printingCost: sum.printingCost + price.printingCost,
//       bindingCost: sum.bindingCost + price.bindingCost,
//       totalCost: sum.totalCost + price.totalCost + sum.gst + price.gst,
//       gst: sum.gst + price.gst,
//       grandTotal: sum.grandTotal + price.grandTotal
//     };
//   }, { printingCost: 0, bindingCost: 0, totalCost: 0, gst: 0, grandTotal: 0 });

//   const deliveryType = cartData?.deliveryType || 'pickup';
//   const customer = cartData?.customer || {};
//   const hasItems = cartData !== null && cartData.items && cartData.items.length > 0;
//   const orderWeight = hasItems ? calculateOrderWeight(cartData.items) : 0;
//   const finalTotal = (calculatedTotals?.grandTotal || 0) + deliveryCharge;

//   // Get delivery charge breakdown for display
//   const getDeliveryChargeBreakdown = (weight: number): string => {
//     if (weight < 0.5) return "Under 500g";
//     if (weight >= 0.5 && weight < 1) return "500g - 1kg";
//     if (weight >= 1 && weight < 3) return "1kg - 3kg";
//     if (weight >= 3 && weight < 5) return "3kg - 5kg";
//     if (weight >= 5 && weight < 10) return "5kg - 10kg";
//     if (weight >= 10 && weight < 15) return "10kg - 15kg";
//     if (weight >= 15 && weight < 20) return "15kg - 20kg";
//     if (weight >= 20 && weight < 40) return "20kg - 40kg";
//     if (weight >= 40 && weight < 80) return "40kg - 80kg";
//     if (weight >= 80) return "Above 80kg (₹10/kg)";
//     return "Standard delivery";
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center">
//             <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
//             <p className="text-muted-foreground">Loading your cart...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (!hasItems) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center max-w-md">
//             <ShoppingCart className="h-20 w-20 mx-auto mb-6 text-muted-foreground/70" strokeWidth={1.2} />
//             <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
//             <p className="text-muted-foreground mb-8">
//               You haven't added any printing orders yet.
//             </p>
//             <Link
//               to="/order"
//               className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 text-lg shadow-md transition-all duration-300 hover:scale-105"
//             >
//               Start New Order <ArrowRight className="h-5 w-5" />
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

//       {showAddressModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-bold">Edit Delivery Address</h3>
//                 <button onClick={() => setShowAddressModal(false)} className="p-1 hover:bg-gray-100 rounded">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Address *</label>
//                   <textarea
//                     value={editingAddress.address}
//                     onChange={(e) => setEditingAddress({...editingAddress, address: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
//                     rows={3}
//                     placeholder="Street address, apartment, building"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Landmark (Optional)</label>
//                   <input
//                     type="text"
//                     value={editingAddress.landmark}
//                     onChange={(e) => setEditingAddress({...editingAddress, landmark: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="Near some landmark"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Pincode *</label>
//                   <input
//                     type="text"
//                     value={editingAddress.pincode}
//                     onChange={(e) => setEditingAddress({...editingAddress, pincode: e.target.value.replace(/\D/g, '').slice(0, 6)})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="6-digit pincode"
//                     maxLength={6}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">City *</label>
//                   <input
//                     type="text"
//                     value={editingAddress.city}
//                     onChange={(e) => setEditingAddress({...editingAddress, city: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="City"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">State *</label>
//                   <input
//                     type="text"
//                     value={editingAddress.state}
//                     onChange={(e) => setEditingAddress({...editingAddress, state: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="State"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Address Type</label>
//                   <div className="flex gap-4">
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         value="Home"
//                         checked={editingAddress.addressType === 'Home'}
//                         onChange={() => setEditingAddress({...editingAddress, addressType: 'Home'})}
//                       />
//                       Home
//                     </label>
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         value="Office"
//                         checked={editingAddress.addressType === 'Office'}
//                         onChange={() => setEditingAddress({...editingAddress, addressType: 'Office'})}
//                       />
//                       Office
//                     </label>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={() => setShowAddressModal(false)}
//                   className="flex-1 py-2 border rounded-lg hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={updateDeliveryAddress}
//                   disabled={updatingAddress}
//                   className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
//                 >
//                   {updatingAddress ? 'Saving...' : 'Save Address'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <section className="relative bg-secondary py-12 md:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center">
//             <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
//               <ShoppingCart className="h-5 w-5" />
//               Your Order Cart
//             </div>
//             <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
//               Review Your Printing Order
//             </h1>
//             <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto">
//               Modify quantities, remove items, or proceed to secure checkout
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-12 md:py-16 bg-background">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
//             <div className="lg:col-span-8 space-y-6">
              
//               <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="font-bold text-lg flex items-center gap-2">
//                     <Package className="h-5 w-5 text-primary" />
//                     Customer & Delivery Details
//                   </h3>
//                   {deliveryType === 'courier' && (
//                     <button
//                       onClick={openAddressModal}
//                       className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
//                     >
//                       <Edit2 className="h-3 w-3" />
//                       Edit Address
//                     </button>
//                   )}
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Name</span>
//                     <p className="font-medium text-foreground mt-1">{customer.name || '—'}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Phone</span>
//                     <p className="font-medium text-foreground mt-1">{customer.phone || '—'}</p>
//                   </div>
//                   <div className="sm:col-span-2">
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Method</span>
//                     <p className="font-medium text-foreground mt-1 flex items-center gap-2">
//                       {deliveryType === 'courier' ? (
//                         <>
//                           <Truck className="h-4 w-4 text-primary" />
//                           Courier Delivery
//                         </>
//                       ) : (
//                         <>
//                           <Package className="h-4 w-4 text-primary" />
//                           Store Pickup
//                         </>
//                       )}
//                     </p>
//                   </div>
//                   {deliveryType === 'courier' && (
//                     <>
//                       <div className="sm:col-span-2">
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Address</span>
//                         <p className="font-medium text-foreground mt-1">{customer.address || '—'}</p>
//                         {customer.landmark && (
//                           <p className="text-xs text-muted-foreground mt-1">Landmark: {customer.landmark}</p>
//                         )}
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Pincode / City</span>
//                         <p className="font-medium text-foreground mt-1">
//                           {customer.pincode || '—'} {customer.city ? `, ${customer.city}` : ''}
//                         </p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">State</span>
//                         <p className="font-medium text-foreground mt-1">{customer.state || '—'}</p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Order Weight</span>
//                         <p className="font-medium text-foreground mt-1 flex items-center gap-1">
//                           <Package className="h-3 w-3" />
//                           {formatWeight(orderWeight)}
//                         </p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {deliveryType === 'courier' && (
//                 <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-bold text-lg flex items-center gap-2">
//                       <Truck className="h-5 w-5 text-primary" />
//                       Delivery Charges
//                     </h3>
//                   </div>

//                   {!customer.pincode ? (
//                     <div className="text-center py-8 text-muted-foreground">
//                       <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
//                       <p>Please add your pincode to proceed</p>
//                       <button 
//                         onClick={openAddressModal}
//                         className="mt-3 text-primary hover:underline"
//                       >
//                         Add Address →
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="bg-green-50 border border-green-200 rounded-lg p-5">
//                       <div className="flex items-start gap-3">
//                         <div className="bg-green-100 rounded-full p-2">
//                           <CheckCircle className="h-5 w-5 text-green-600" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="mt-3 space-y-2 text-sm">
//                             <div className="flex justify-between items-center">
//                               <span className="text-green-600">Weight Slab:</span>
//                               <span className="font-medium text-green-800">{getDeliveryChargeBreakdown(orderWeight)}</span>
//                             </div>
//                             <div className="flex justify-between items-center">
//                               <span className="text-green-600">Total Weight:</span>
//                               <span className="font-medium text-green-800">{formatWeight(orderWeight)}</span>
//                             </div>
//                             <div className="flex justify-between items-center pt-2 border-t border-green-200">
//                               <span className="text-green-700 font-semibold">Delivery Charge:</span>
//                               <span className="font-bold text-green-800 text-xl">₹{deliveryCharge.toFixed(2)}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {cartData?.items.map((item, index) => {
//                 const itemTitle = item.paperSize
//                   ? `${item.paperSize} • ${item.printColor?.toUpperCase()} • ${item.printSide} side`
//                   : `Custom Print Job ${index + 1}`;
                
//                 const files = item.files || [];
//                 const priceData = calculateItemPrice(item);

//                 return (
//                   <div key={item._id} className="bg-white rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition-all duration-300">
//                     <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6">
//                       <div className="w-full sm:w-32 md:w-40 h-40 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center shrink-0">
//                         <Printer className="h-12 w-12 text-primary/60" strokeWidth={1.5} />
//                       </div>

//                       <div className="flex-1 flex flex-col">
//                         <div className="flex justify-between items-start gap-4 mb-3">
//                           <h3 className="font-bold text-lg md:text-xl leading-tight text-foreground">
//                             {itemTitle}
//                           </h3>
//                           <button
//                             onClick={() => removeItem(item._id)}
//                             className="text-red-500 hover:text-red-700 p-1.5 -mr-1.5 transition-colors"
//                           >
//                             <Trash2 className="h-5 w-5" />
//                           </button>
//                         </div>

//                         <div className="text-sm text-muted-foreground mb-4 space-y-1">
//                           <p className="font-medium text-foreground">
//                             {item.pages} pages × {item.copies} copies
//                           </p>
//                           <p>
//                             {paperTypeLabels[item.paperType || ''] || item.paperType || '—'} •{' '}
//                             {item.printColor === 'bw' ? 'B&W' : 'Color'} •{' '}
//                             {item.printSide === 'double' ? 'Double' : 'Single'} sided
//                           </p>
//                           <p>
//                             Binding: {bindingLabels[item.bindingType || ''] || item.bindingType || '—'}
//                           </p>
//                           {item.lamination && item.lamination !== 'none' && (
//                             <p>Lamination: {item.lamination.charAt(0).toUpperCase() + item.lamination.slice(1)}</p>
//                           )}
//                         </div>

//                         {files.length > 0 && (
//                           <div className="mb-4 text-xs">
//                             <p className="text-muted-foreground mb-1 flex items-center gap-1">
//                               <FileText className="h-3 w-3" />
//                               Uploaded Files:
//                             </p>
//                             <ul className="space-y-1">
//                               {files.map(f => (
//                                 <li key={f._id} className="flex items-center gap-2 text-muted-foreground">
//                                   <FileText className="h-3 w-3 text-primary/70" />
//                                   <span className="truncate max-w-[200px]">{f.name}</span>
//                                   <span className="text-xs">
//                                     ({(f.size / 1024 / 1024).toFixed(1)} MB)
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                         <div className="mt-auto flex flex-wrap justify-between items-center gap-4 pt-2">
//                           <div className="flex border border-border rounded-lg overflow-hidden bg-muted/30">
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies - 1)}
//                               disabled={item.copies <= 1}
//                               className="px-4 py-2 hover:bg-muted transition-colors disabled:opacity-50"
//                             >
//                               <Minus className="h-4 w-4" />
//                             </button>
//                             <span className="px-5 py-2 font-semibold min-w-[3.5rem] text-center bg-white">
//                               {item.copies}
//                             </span>
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies + 1)}
//                               className="px-4 py-2 hover:bg-muted transition-colors"
//                             >
//                               <Plus className="h-4 w-4" />
//                             </button>
//                           </div>

//                           <div className="text-right">
//                             <div className="text-lg font-bold text-primary">
//                               ₹{priceData.grandTotal.toFixed(2)}
//                             </div>
//                             <div className="text-xs text-muted-foreground">
//                               ₹{priceData.pricePerPage.toFixed(2)}/page
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}

//               <div className="flex justify-between items-center pt-4">
//                 <Link
//                   to="/order"
//                   className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group"
//                 >
//                   <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
//                   Continue Adding Orders
//                 </Link>
                
//                 <button
//                   onClick={clearCart}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
//                 >
//                   Clear Cart
//                 </button>
//               </div>
//             </div>

//             <div className="lg:col-span-4">
//               <div className="bg-white rounded-xl shadow-lg border p-6 md:p-8 sticky top-6">
//                 <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
//                   <Package className="h-6 w-6 text-primary" />
//                   Order Summary
//                 </h2>

//                 <div className="space-y-4 text-sm">
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Items</span>
//                     <span className="font-semibold">{cartData?.items.length || 0}</span>
//                   </div>

//                   <div className="flex justify-between py-2 border-t">
//                     <span className="text-muted-foreground">Printing Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.printingCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Binding Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.bindingCost.toFixed(2) || '0.00'}</span>
//                   </div>
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">GST (5%)</span>
//                     <span className="font-semibold">₹{calculatedTotals?.gst.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Subtotal</span>
//                     <span className="font-semibold">₹{calculatedTotals?.totalCost.toFixed(2) || '0.00'}</span>
//                   </div>

//                   {deliveryType === 'courier' && (
//                     <>
//                       <div className="flex justify-between py-2 border-t">
//                         <span className="text-muted-foreground">Order Weight</span>
//                         <span className="font-semibold">{formatWeight(orderWeight)}</span>
//                       </div>

//                       <div className="flex justify-between py-2">
//                         <span className="text-muted-foreground">Delivery Charges</span>
//                         <div className="text-right">
//                           <span className="font-semibold text-primary">₹{deliveryCharge.toFixed(2)}</span>
//                           <p className="text-xs text-muted-foreground">{getDeliveryChargeBreakdown(orderWeight)}</p>
//                         </div>
//                       </div>
//                     </>
//                   )}

//                   <div className="border-t border-border pt-5 mt-4">
//                     <div className="flex justify-between items-center text-lg font-bold">
//                       <span className="text-foreground">Total Amount</span>
//                       <span className="text-primary text-2xl font-black">
//                         ₹{finalTotal.toFixed(2)}
//                       </span>
//                     </div>
//                     <p className="text-xs text-muted-foreground text-center mt-2">
//                       Inclusive of all taxes
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-8 space-y-4">
//                   <button
//                     onClick={handleCheckout}
//                     disabled={deliveryType === 'courier' && !customer.pincode}
//                     className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5 group disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Proceed to Checkout 
//                     <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                   </button>

//                   <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
//                     <Shield className="h-4 w-4" />
//                     Secure checkout with Razorpay
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-6 border-t text-xs text-muted-foreground space-y-2">
//                   <div className="flex items-start gap-2">
//                     <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>GST invoice provided for every order</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>Free shipping on orders above ₹5000</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>Fast delivery across India</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }







// import { useState, useEffect, useRef, useCallback } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   ShoppingCart, Trash2, Plus, Minus, ArrowRight, Shield, Truck, 
//   CheckCircle, Printer, Package, FileText, Clock, Zap, MapPin, 
//   AlertCircle, Edit2, X, Save, Loader2
// } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { paperTypeLabels, bindingLabels, calculatePrice } from '@/lib/pricingData';
// import { toast } from 'sonner';

// interface CartItem {
//   _id: string;
//   pages: number;
//   copies: number;
//   paperSize?: string;
//   paperType?: string;
//   printColor?: 'bw' | 'color';
//   printSide?: 'single' | 'double';
//   bindingType?: string;
//   lamination?: string;
//   instructions?: string;
//   files?: Array<{
//     _id: string;
//     name: string;
//     size: number;
//     type: string;
//     status: string;
//   }>;
// }

// interface CartData {
//   items: CartItem[];
//   customer: {
//     name?: string;
//     phone?: string;
//     address?: string;
//     pincode?: string;
//     city?: string;
//     state?: string;
//     landmark?: string;
//     addressType?: 'Home' | 'Office';
//   };
//   orderMode: 'single' | 'bulk';
//   deliveryType: 'pickup' | 'courier';
//   totals: {
//     printingCost: number;
//     gst: number;
//     totalWithDelivery: number;
//   };
// }

// // Calculate order weight with correct binding types from pricingData
// const calculateOrderWeight = (items: CartItem[]): number => {
//   let totalWeightKg = 0;

//   items.forEach(item => {
//     const totalPages = item.pages * (item.copies || 1);
    
//     let paperWeightPerPage = 0.002;
    
//     if (item.paperType === 'premium') {
//       paperWeightPerPage = 0.005;
//     } else if (item.paperType === 'glossy') {
//       paperWeightPerPage = 0.004;
//     } else if (item.paperType === 'recycled') {
//       paperWeightPerPage = 0.0025;
//     }
    
//     let itemWeight = totalPages * paperWeightPerPage;
    
//     if (item.bindingType === 'spiral') {
//       itemWeight += 0.050;
//     } else if (item.bindingType === 'perfect_glue') {
//       itemWeight += 0.080;
//     } else if (item.bindingType === 'hardbound') {
//       itemWeight += 0.200;
//     } else if (item.bindingType === 'centre_staple' || item.bindingType === 'corner_staple') {
//       itemWeight += 0.030;
//     }
    
//     if (item.lamination === 'matte' || item.lamination === 'glossy') {
//       itemWeight += totalPages * 0.001;
//     }
    
//     totalWeightKg += itemWeight;
//   });

//   if (totalWeightKg > 2) {
//     totalWeightKg += 0.3;
//   } else if (totalWeightKg > 1) {
//     totalWeightKg += 0.2;
//   } else {
//     totalWeightKg += 0.1;
//   }
  
//   return Math.max(0.1, Math.round(totalWeightKg * 1000) / 1000);
// };

// const calculateItemWeight = (item: CartItem): number => {
//   const totalPages = item.pages * (item.copies || 1);
  
//   let paperWeightPerPage = 0.002;
  
//   if (item.paperType === 'premium') {
//     paperWeightPerPage = 0.005;
//   } else if (item.paperType === 'glossy') {
//     paperWeightPerPage = 0.004;
//   } else if (item.paperType === 'recycled') {
//     paperWeightPerPage = 0.0025;
//   }
  
//   let weight = totalPages * paperWeightPerPage;
  
//   if (item.bindingType === 'spiral') {
//     weight += 0.050;
//   } else if (item.bindingType === 'perfect_glue') {
//     weight += 0.080;
//   } else if (item.bindingType === 'hardbound') {
//     weight += 0.200;
//   } else if (item.bindingType === 'centre_staple' || item.bindingType === 'corner_staple') {
//     weight += 0.030;
//   }
  
//   if (item.lamination === 'matte' || item.lamination === 'glossy') {
//     weight += totalPages * 0.001;
//   }
  
//   return Math.round(weight * 1000) / 1000;
// };

// const formatWeight = (kg: number): string => {
//   return kg >= 1 ? `${kg.toFixed(2)} kg` : `${(kg * 1000).toFixed(0)} g`;
// };

// const calculateDeliveryCharge = (weightKg: number): number => {
//   if (weightKg < 0.5) {
//     return 50;
//   } else if (weightKg >= 0.5 && weightKg < 1) {
//     return 100;
//   } else if (weightKg >= 1 && weightKg < 3) {
//     return 200;
//   } else if (weightKg >= 3 && weightKg < 5) {
//     return 230;
//   } else if (weightKg >= 5 && weightKg < 10) {
//     return 400;
//   } else if (weightKg >= 10 && weightKg < 15) {
//     return 700;
//   } else if (weightKg >= 15 && weightKg < 20) {
//     return 900;
//   } else if (weightKg >= 20 && weightKg < 40) {
//     return 1200;
//   } else if (weightKg >= 40 && weightKg < 80) {
//     return 1600;
//   } else if (weightKg >= 80) {
//     return Math.ceil(weightKg) * 10;
//   }
//   return 50;
// };

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'https://bookprinters.in/api/api',
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default function Cart() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [cartData, setCartData] = useState<CartData | null>(null);
//   const [deliveryCharge, setDeliveryCharge] = useState<number>(0);
//   const [isCheckingOut, setIsCheckingOut] = useState(false); // ✅ Added loading state for checkout button
  
//   const [showAddressModal, setShowAddressModal] = useState(false);
//   const [editingAddress, setEditingAddress] = useState({
//     address: '',
//     pincode: '',
//     city: '',
//     state: '',
//     landmark: '',
//     addressType: 'Home' as 'Home' | 'Office'
//   });
//   const [updatingAddress, setUpdatingAddress] = useState(false);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   useEffect(() => {
//     if (cartData?.items && cartData.items.length > 0 && cartData.deliveryType === 'courier') {
//       const weight = calculateOrderWeight(cartData.items);
//       const charge = calculateDeliveryCharge(weight);
      
//       if (charge !== deliveryCharge) {
//         setDeliveryCharge(charge);
        
//         const saveDeliveryCharge = async () => {
//           try {
//             await API.put('/cart/delivery-charge', { deliveryCharge: charge });
//           } catch (err) {
//             console.error("Failed to save delivery charge:", err);
//           }
//         };
//         saveDeliveryCharge();
//       }
//     } else if (cartData?.deliveryType === 'pickup') {
//       if (deliveryCharge !== 0) {
//         setDeliveryCharge(0);
//       }
//     }
//   }, [cartData?.items, cartData?.deliveryType]);

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get('/cart');
      
//       if (response.data && response.data.items && response.data.items.length > 0) {
//         setCartData(response.data);
        
//         if (response.data.deliveryType === 'courier') {
//           const weight = calculateOrderWeight(response.data.items);
//           const newCharge = calculateDeliveryCharge(weight);
//           setDeliveryCharge(newCharge);
          
//           try {
//             await API.put('/cart/delivery-charge', { deliveryCharge: newCharge });
//           } catch (err) {
//             console.error("Failed to update delivery charge:", err);
//           }
//         } else {
//           setDeliveryCharge(0);
//         }
//       } else {
//         setCartData(null);
//         setDeliveryCharge(0);
//       }
//     } catch (error: any) {
//       console.error("Error fetching cart:", error);
//       if (error.response?.status === 401) {
//         navigate('/login');
//       }
//       toast.error("Failed to load cart");
//       setCartData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateDeliveryAddress = async () => {
//     if (!cartData) return;
    
//     setUpdatingAddress(true);
    
//     try {
//       if (!editingAddress.pincode || editingAddress.pincode.length !== 6) {
//         toast.error('Please enter a valid 6-digit pincode');
//         return;
//       }
      
//       if (!editingAddress.address) {
//         toast.error('Please enter your address');
//         return;
//       }
      
//       if (!editingAddress.city) {
//         toast.error('Please enter your city');
//         return;
//       }
      
//       if (!editingAddress.state) {
//         toast.error('Please enter your state');
//         return;
//       }
      
//       const response = await API.put('/cart/address', {
//         address: editingAddress.address,
//         pincode: editingAddress.pincode,
//         city: editingAddress.city,
//         state: editingAddress.state,
//         landmark: editingAddress.landmark,
//         addressType: editingAddress.addressType
//       });
      
//       if (response.data && response.data.cart) {
//         setCartData(response.data.cart);
//         setShowAddressModal(false);
//         toast.success('Delivery address updated successfully');
        
//         if (response.data.cart.deliveryType === 'courier') {
//           const weight = calculateOrderWeight(response.data.cart.items);
//           const newCharge = calculateDeliveryCharge(weight);
//           setDeliveryCharge(newCharge);
          
//           try {
//             await API.put('/cart/delivery-charge', { deliveryCharge: newCharge });
//           } catch (err) {
//             console.error("Failed to update delivery charge:", err);
//           }
//         }
//       }
//     } catch (error: any) {
//       console.error("Failed to update address:", error);
//       toast.error(error.response?.data?.message || "Failed to update address");
//     } finally {
//       setUpdatingAddress(false);
//     }
//   };

//   const openAddressModal = () => {
//     if (cartData?.customer) {
//       setEditingAddress({
//         address: cartData.customer.address || '',
//         pincode: cartData.customer.pincode || '',
//         city: cartData.customer.city || '',
//         state: cartData.customer.state || '',
//         landmark: cartData.customer.landmark || '',
//         addressType: cartData.customer.addressType || 'Home'
//       });
//     }
//     setShowAddressModal(true);
//   };

//   const calculateItemPrice = (item: CartItem) => {
//     try {
//       const priceData = calculatePrice({
//         pages: item.pages,
//         copies: item.copies,
//         paperSize: item.paperSize as any,
//         paperType: item.paperType as any,
//         printColor: item.printColor as any,
//         printSide: item.printSide as any,
//         bindingType: item.bindingType as any,
//       });
//       return priceData;
//     } catch (error) {
//       console.error("Error calculating price:", error);
//       return {
//         totalCost: 0,
//         grandTotal: 0,
//         pricePerPage: 0,
//         printingCost: 0,
//         bindingCost: 0,
//         gst: 0
//       };
//     }
//   };

//   const updateQuantity = async (_id: string, newQty: number) => {
//     if (newQty < 1) return;
    
//     const previousCartData = cartData;
    
//     try {
//       if (cartData) {
//         const updatedItems = cartData.items.map(item => 
//           item._id === _id ? { ...item, copies: newQty } : item
//         );
//         setCartData({ ...cartData, items: updatedItems });
//       }
      
//       const response = await API.put(`/cart/item/${_id}`, { copies: newQty });
      
//       if (response.data && response.data.items) {
//         setCartData(response.data);
        
//         if (response.data.deliveryType === 'courier') {
//           const weight = calculateOrderWeight(response.data.items);
//           const newCharge = calculateDeliveryCharge(weight);
//           setDeliveryCharge(newCharge);
          
//           try {
//             await API.put('/cart/delivery-charge', { deliveryCharge: newCharge });
//           } catch (err) {
//             console.error("Failed to update delivery charge:", err);
//           }
//         }
//       }
      
//       toast.success("Quantity updated");
//     } catch (error: any) {
//       console.error("Update failed:", error);
//       setCartData(previousCartData);
//       toast.error(error.response?.data?.message || "Failed to update quantity");
//     }
//   };

//   const removeItem = async (_id: string) => {
//     const previousCartData = cartData;
    
//     try {
//       if (cartData) {
//         const updatedItems = cartData.items.filter(item => item._id !== _id);
//         if (updatedItems.length > 0) {
//           setCartData({ ...cartData, items: updatedItems });
//         } else {
//           setCartData(null);
//         }
//       }
      
//       await API.delete(`/cart/item/${_id}`);
      
//       if (cartData && cartData.deliveryType === 'courier') {
//         const remainingItems = cartData.items.filter(item => item._id !== _id);
//         if (remainingItems.length > 0) {
//           const weight = calculateOrderWeight(remainingItems);
//           const newCharge = calculateDeliveryCharge(weight);
//           setDeliveryCharge(newCharge);
          
//           try {
//             await API.put('/cart/delivery-charge', { deliveryCharge: newCharge });
//           } catch (err) {
//             console.error("Failed to update delivery charge:", err);
//           }
//         } else {
//           setDeliveryCharge(0);
//         }
//       }
      
//       toast.success("Item removed");
//     } catch (error: any) {
//       console.error("Delete failed:", error);
//       setCartData(previousCartData);
//       toast.error(error.response?.data?.message || "Failed to remove item");
//     }
//   };

//   // ✅ Updated handleCheckout with loading state
//   const handleCheckout = async () => {
//     if (isCheckingOut) return; // Prevent double click
    
//     try {
//       if (!cartData) {
//         toast.error("Cart is empty");
//         return;
//       }

//       if (cartData.deliveryType === 'courier') {
//         if (!cartData.customer?.pincode || !cartData.customer?.address) {
//           toast.error("Please add your delivery address");
//           openAddressModal();
//           return;
//         }
//       }

//       setIsCheckingOut(true); // ✅ Show loading on button

//       const itemsWithDetails = cartData.items.map(item => {
//         const priceData = calculateItemPrice(item);
//         return {
//           ...item,
//           productValue: priceData.grandTotal,
//           itemWeight: calculateItemWeight(item),
//           itemDetails: {
//             pages: item.pages,
//             copies: item.copies,
//             paperType: item.paperType,
//             printColor: item.printColor,
//             bindingType: item.bindingType,
//             lamination: item.lamination
//           }
//         };
//       });

//       const totalWeight = calculateOrderWeight(cartData.items);
//       const subtotal = calculatedTotals?.grandTotal || 0;
//       const totalAmount = subtotal + deliveryCharge;

//       const payload = {
//         items: itemsWithDetails,
//         customer: cartData.customer,
//         deliveryType: cartData.deliveryType,
//         deliveryCharge: cartData.deliveryType === 'courier' ? deliveryCharge : 0,
//         orderWeight: totalWeight,
//         orderMode: cartData.orderMode,
//         totalAmount: totalAmount,
//         subtotal: subtotal,
//         declaredValue: subtotal,
//         productValues: itemsWithDetails.map(i => i.productValue)
//       };

//       console.log("📦 CHECKOUT PAYLOAD:", {
//         totalWeight: totalWeight + " kg",
//         deliveryCharge: "₹" + deliveryCharge,
//         totalAmount: "₹" + totalAmount
//       });

//       const res = await API.post('/order/create-from-cart', payload);
//       const orderData = res.data;
//       const order = orderData.order;

//       if (!order?._id) {
//         throw new Error("Order ID missing from response");
//       }

//       localStorage.setItem("pendingOrder", JSON.stringify({
//         orderId: order._id,
//         amount: totalAmount,
//         orderNumber: order.orderNumber,
//         deliveryCharge: deliveryCharge,
//         orderWeight: totalWeight,
//         declaredValue: payload.declaredValue
//       }));

//       navigate('/checkout', {
//         state: {
//           orderId: order._id,
//           amount: totalAmount,
//           orderNumber: order.orderNumber,
//           deliveryCharge: deliveryCharge,
//           orderWeight: totalWeight,
//           declaredValue: payload.declaredValue
//         }
//       });

//     } catch (error: any) {
//       console.error("Checkout failed:", error);
//       toast.error(error.response?.data?.message || "Checkout failed");
//       setIsCheckingOut(false); // ✅ Reset loading state on error
//     } finally {
//       // Note: Don't reset loading here because navigation happens
//     }
//   };

//   const clearCart = async () => {
//     if (!window.confirm('Are you sure you want to clear your cart?')) return;
    
//     const previousCartData = cartData;
    
//     try {
//       setCartData(null);
//       setDeliveryCharge(0);
//       await API.delete('/cart');
//       toast.success("Cart cleared");
//     } catch (error: any) {
//       console.error("Clear failed:", error);
//       setCartData(previousCartData);
//       toast.error("Failed to clear cart");
//     }
//   };

//   const calculatedTotals = cartData?.items.reduce((sum, item) => {
//     const price = calculateItemPrice(item);
//     return {
//       printingCost: sum.printingCost + price.printingCost,
//       bindingCost: sum.bindingCost + price.bindingCost,
//       totalCost: sum.totalCost + price.totalCost + sum.gst + price.gst,
//       gst: sum.gst + price.gst,
//       grandTotal: sum.grandTotal + price.grandTotal
//     };
//   }, { printingCost: 0, bindingCost: 0, totalCost: 0, gst: 0, grandTotal: 0 });

//   const deliveryType = cartData?.deliveryType || 'pickup';
//   const customer = cartData?.customer || {};
//   const hasItems = cartData !== null && cartData.items && cartData.items.length > 0;
//   const orderWeight = hasItems ? calculateOrderWeight(cartData.items) : 0;
//   const finalTotal = (calculatedTotals?.grandTotal || 0) + deliveryCharge;

//   const getDeliveryChargeBreakdown = (weight: number): string => {
//     if (weight < 0.5) return "Under 500g";
//     if (weight >= 0.5 && weight < 1) return "500g - 1kg";
//     if (weight >= 1 && weight < 3) return "1kg - 3kg";
//     if (weight >= 3 && weight < 5) return "3kg - 5kg";
//     if (weight >= 5 && weight < 10) return "5kg - 10kg";
//     if (weight >= 10 && weight < 15) return "10kg - 15kg";
//     if (weight >= 15 && weight < 20) return "15kg - 20kg";
//     if (weight >= 20 && weight < 40) return "20kg - 40kg";
//     if (weight >= 40 && weight < 80) return "40kg - 80kg";
//     if (weight >= 80) return "Above 80kg (₹10/kg)";
//     return "Standard delivery";
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center">
//             <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
//             <p className="text-muted-foreground">Loading your cart...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (!hasItems) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center max-w-md">
//             <ShoppingCart className="h-20 w-20 mx-auto mb-6 text-muted-foreground/70" strokeWidth={1.2} />
//             <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
//             <p className="text-muted-foreground mb-8">
//               You haven't added any printing orders yet.
//             </p>
//             <Link
//               to="/order"
//               className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 text-lg shadow-md transition-all duration-300 hover:scale-105"
//             >
//               Start New Order <ArrowRight className="h-5 w-5" />
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

//       {showAddressModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-bold">Edit Delivery Address</h3>
//                 <button onClick={() => setShowAddressModal(false)} className="p-1 hover:bg-gray-100 rounded">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Address *</label>
//                   <textarea
//                     value={editingAddress.address}
//                     onChange={(e) => setEditingAddress({...editingAddress, address: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
//                     rows={3}
//                     placeholder="Street address, apartment, building"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Landmark (Optional)</label>
//                   <input
//                     type="text"
//                     value={editingAddress.landmark}
//                     onChange={(e) => setEditingAddress({...editingAddress, landmark: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="Near some landmark"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Pincode *</label>
//                   <input
//                     type="text"
//                     value={editingAddress.pincode}
//                     onChange={(e) => setEditingAddress({...editingAddress, pincode: e.target.value.replace(/\D/g, '').slice(0, 6)})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="6-digit pincode"
//                     maxLength={6}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">City *</label>
//                   <input
//                     type="text"
//                     value={editingAddress.city}
//                     onChange={(e) => setEditingAddress({...editingAddress, city: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="City"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">State *</label>
//                   <input
//                     type="text"
//                     value={editingAddress.state}
//                     onChange={(e) => setEditingAddress({...editingAddress, state: e.target.value})}
//                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary"
//                     placeholder="State"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Address Type</label>
//                   <div className="flex gap-4">
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         value="Home"
//                         checked={editingAddress.addressType === 'Home'}
//                         onChange={() => setEditingAddress({...editingAddress, addressType: 'Home'})}
//                       />
//                       Home
//                     </label>
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         value="Office"
//                         checked={editingAddress.addressType === 'Office'}
//                         onChange={() => setEditingAddress({...editingAddress, addressType: 'Office'})}
//                       />
//                       Office
//                     </label>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={() => setShowAddressModal(false)}
//                   className="flex-1 py-2 border rounded-lg hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={updateDeliveryAddress}
//                   disabled={updatingAddress}
//                   className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
//                 >
//                   {updatingAddress ? 'Saving...' : 'Save Address'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <section className="relative bg-secondary py-12 md:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center">
//             <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
//               <ShoppingCart className="h-5 w-5" />
//               Your Order Cart
//             </div>
//             <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
//               Review Your Printing Order
//             </h1>
//             <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto">
//               Modify quantities, remove items, or proceed to secure checkout
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-12 md:py-16 bg-background">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
//             <div className="lg:col-span-8 space-y-6">
              
//               <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="font-bold text-lg flex items-center gap-2">
//                     <Package className="h-5 w-5 text-primary" />
//                     Customer & Delivery Details
//                   </h3>
//                   {deliveryType === 'courier' && (
//                     <button
//                       onClick={openAddressModal}
//                       className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
//                     >
//                       <Edit2 className="h-3 w-3" />
//                       Edit Address
//                     </button>
//                   )}
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Name</span>
//                     <p className="font-medium text-foreground mt-1">{customer.name || '—'}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Phone</span>
//                     <p className="font-medium text-foreground mt-1">{customer.phone || '—'}</p>
//                   </div>
//                   <div className="sm:col-span-2">
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Method</span>
//                     <p className="font-medium text-foreground mt-1 flex items-center gap-2">
//                       {deliveryType === 'courier' ? (
//                         <>
//                           <Truck className="h-4 w-4 text-primary" />
//                           Courier Delivery
//                         </>
//                       ) : (
//                         <>
//                           <Package className="h-4 w-4 text-primary" />
//                           Store Pickup
//                         </>
//                       )}
//                     </p>
//                   </div>
//                   {deliveryType === 'courier' && (
//                     <>
//                       <div className="sm:col-span-2">
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Address</span>
//                         <p className="font-medium text-foreground mt-1">{customer.address || '—'}</p>
//                         {customer.landmark && (
//                           <p className="text-xs text-muted-foreground mt-1">Landmark: {customer.landmark}</p>
//                         )}
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Pincode / City</span>
//                         <p className="font-medium text-foreground mt-1">
//                           {customer.pincode || '—'} {customer.city ? `, ${customer.city}` : ''}
//                         </p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">State</span>
//                         <p className="font-medium text-foreground mt-1">{customer.state || '—'}</p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Order Weight</span>
//                         <p className="font-medium text-foreground mt-1 flex items-center gap-1">
//                           <Package className="h-3 w-3" />
//                           {formatWeight(orderWeight)}
//                         </p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {deliveryType === 'courier' && (
//                 <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-bold text-lg flex items-center gap-2">
//                       <Truck className="h-5 w-5 text-primary" />
//                       Delivery Charges
//                     </h3>
//                   </div>

//                   {!customer.pincode ? (
//                     <div className="text-center py-8 text-muted-foreground">
//                       <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
//                       <p>Please add your pincode to proceed</p>
//                       <button 
//                         onClick={openAddressModal}
//                         className="mt-3 text-primary hover:underline"
//                       >
//                         Add Address →
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="bg-green-50 border border-green-200 rounded-lg p-5">
//                       <div className="flex items-start gap-3">
//                         <div className="bg-green-100 rounded-full p-2">
//                           <CheckCircle className="h-5 w-5 text-green-600" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="mt-3 space-y-2 text-sm">
//                             <div className="flex justify-between items-center">
//                               <span className="text-green-600">Total Weight:</span>
//                               <span className="font-medium text-green-800">{formatWeight(orderWeight)}</span>
//                             </div>
//                             <div className="flex justify-between items-center pt-2 border-t border-green-200">
//                               <span className="text-green-700 font-semibold">Delivery Charge:</span>
//                               <span className="font-bold text-green-800 text-xl">₹{deliveryCharge.toFixed(2)}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {cartData?.items.map((item, index) => {
//                 const itemTitle = item.paperSize
//                   ? `${item.paperSize} • ${item.printColor?.toUpperCase()} • ${item.printSide} side`
//                   : `Custom Print Job ${index + 1}`;
                
//                 const files = item.files || [];
//                 const priceData = calculateItemPrice(item);

//                 return (
//                   <div key={item._id} className="bg-white rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition-all duration-300">
//                     <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6">
//                       <div className="w-full sm:w-32 md:w-40 h-40 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center shrink-0">
//                         <Printer className="h-12 w-12 text-primary/60" strokeWidth={1.5} />
//                       </div>

//                       <div className="flex-1 flex flex-col">
//                         <div className="flex justify-between items-start gap-4 mb-3">
//                           <h3 className="font-bold text-lg md:text-xl leading-tight text-foreground">
//                             {itemTitle}
//                           </h3>
//                           <button
//                             onClick={() => removeItem(item._id)}
//                             className="text-red-500 hover:text-red-700 p-1.5 -mr-1.5 transition-colors"
//                           >
//                             <Trash2 className="h-5 w-5" />
//                           </button>
//                         </div>

//                         <div className="text-sm text-muted-foreground mb-4 space-y-1">
//                           <p className="font-medium text-foreground">
//                             {item.pages} pages × {item.copies} copies
//                           </p>
//                           <p>
//                             {paperTypeLabels[item.paperType || ''] || item.paperType || '—'} •{' '}
//                             {item.printColor === 'bw' ? 'B&W' : 'Color'} •{' '}
//                             {item.printSide === 'double' ? 'Double' : 'Single'} sided
//                           </p>
//                           <p>
//                             Binding: {bindingLabels[item.bindingType || ''] || item.bindingType || '—'}
//                           </p>
//                           {item.lamination && item.lamination !== 'none' && (
//                             <p>Lamination: {item.lamination.charAt(0).toUpperCase() + item.lamination.slice(1)}</p>
//                           )}
//                         </div>

//                         {files.length > 0 && (
//                           <div className="mb-4 text-xs">
//                             <p className="text-muted-foreground mb-1 flex items-center gap-1">
//                               <FileText className="h-3 w-3" />
//                               Uploaded Files:
//                             </p>
//                             <ul className="space-y-1">
//                               {files.map(f => (
//                                 <li key={f._id} className="flex items-center gap-2 text-muted-foreground">
//                                   <FileText className="h-3 w-3 text-primary/70" />
//                                   <span className="truncate max-w-[200px]">{f.name}</span>
//                                   <span className="text-xs">
//                                     ({(f.size / 1024 / 1024).toFixed(1)} MB)
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                         <div className="mt-auto flex flex-wrap justify-between items-center gap-4 pt-2">
//                           <div className="flex border border-border rounded-lg overflow-hidden bg-muted/30">
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies - 1)}
//                               disabled={item.copies <= 1}
//                               className="px-4 py-2 hover:bg-muted transition-colors disabled:opacity-50"
//                             >
//                               <Minus className="h-4 w-4" />
//                             </button>
//                             <span className="px-5 py-2 font-semibold min-w-[3.5rem] text-center bg-white">
//                               {item.copies}
//                             </span>
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies + 1)}
//                               className="px-4 py-2 hover:bg-muted transition-colors"
//                             >
//                               <Plus className="h-4 w-4" />
//                             </button>
//                           </div>

//                           <div className="text-right">
//                             <div className="text-lg font-bold text-primary">
//                               ₹{priceData.grandTotal.toFixed(2)}
//                             </div>
//                             <div className="text-xs text-muted-foreground">
//                               ₹{priceData.pricePerPage.toFixed(2)}/page
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}

//               <div className="flex justify-between items-center pt-4">
//                 <Link
//                   to="/order"
//                   className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group"
//                 >
//                   <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
//                   Continue Adding Orders
//                 </Link>
                
//                 <button
//                   onClick={clearCart}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
//                 >
//                   Clear Cart
//                 </button>
//               </div>
//             </div>

//             <div className="lg:col-span-4">
//               <div className="bg-white rounded-xl shadow-lg border p-6 md:p-8 sticky top-6">
//                 <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
//                   <Package className="h-6 w-6 text-primary" />
//                   Order Summary
//                 </h2>

//                 <div className="space-y-4 text-sm">
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Items</span>
//                     <span className="font-semibold">{cartData?.items.length || 0}</span>
//                   </div>

//                   <div className="flex justify-between py-2 border-t">
//                     <span className="text-muted-foreground">Printing Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.printingCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Binding Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.bindingCost.toFixed(2) || '0.00'}</span>
//                   </div>
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">GST (5%)</span>
//                     <span className="font-semibold">₹{calculatedTotals?.gst.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Subtotal</span>
//                     <span className="font-semibold">₹{calculatedTotals?.totalCost.toFixed(2) || '0.00'}</span>
//                   </div>

//                   {deliveryType === 'courier' && (
//                     <>
//                       <div className="flex justify-between py-2 border-t">
//                         <span className="text-muted-foreground">Order Weight</span>
//                         <span className="font-semibold">{formatWeight(orderWeight)}</span>
//                       </div>

//                       <div className="flex justify-between py-2">
//                         <span className="text-muted-foreground">Delivery Charges</span>
//                         <div className="text-right">
//                           <span className="font-semibold text-primary">₹{deliveryCharge.toFixed(2)}</span>
//                         </div>
//                       </div>
//                     </>
//                   )}

//                   <div className="border-t border-border pt-5 mt-4">
//                     <div className="flex justify-between items-center text-lg font-bold">
//                       <span className="text-foreground">Total Amount</span>
//                       <span className="text-primary text-2xl font-black">
//                         ₹{finalTotal.toFixed(2)}
//                       </span>
//                     </div>
//                     <p className="text-xs text-muted-foreground text-center mt-2">
//                       Inclusive of all taxes
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-8 space-y-4">
//                   {/* ✅ Updated button with loading animation */}
//                   <button
//                     onClick={handleCheckout}
//                     disabled={isCheckingOut || (deliveryType === 'courier' && !customer.pincode)}
//                     className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5 group disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isCheckingOut ? (
//                       <>
//                         <Loader2 className="h-5 w-5 animate-spin" />
//                         Processing...
//                       </>
//                     ) : (
//                       <>
//                         Proceed to Checkout 
//                         <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                       </>
//                     )}
//                   </button>

//                   <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
//                     <Shield className="h-4 w-4" />
//                     Secure checkout with Razorpay
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-6 border-t text-xs text-muted-foreground space-y-2">
//                   <div className="flex items-start gap-2">
//                     <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>GST invoice provided for every order</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>Free shipping on orders above ₹5000</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>Fast delivery across India</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }










import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, Shield, Truck, 
  CheckCircle, Printer, Package, FileText, Clock, Zap, MapPin, 
  AlertCircle, Edit2, X, Save, Loader2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { paperTypeLabels, bindingLabels, calculatePrice } from '@/lib/pricingData';
import { toast } from 'sonner';



interface CartItem {
  _id: string;
  pages: number;
  copies: number;
  paperSize?: string;
  paperType?: string;
  printColor?: 'bw' | 'color';
  printSide?: 'single' | 'double';
  bindingType?: string;
  lamination?: string;
  instructions?: string;
  files?: Array<{
    _id: string;
    name: string;
    size: number;
    type: string;
    status: string;
  }>;
}

interface CartData {
  items: CartItem[];
  customer: {
    name?: string;
    phone?: string;
    address?: string;
    pincode?: string;
    city?: string;
    state?: string;
    landmark?: string;
    addressType?: 'Home' | 'Office';
  };
  orderMode: 'single' | 'bulk';
  deliveryType: 'pickup' | 'courier';
  totals: {
    printingCost: number;
    gst: number;
    totalWithDelivery: number;
  };
}

// Calculate order weight with correct binding types from pricingData
const calculateOrderWeight = (items: CartItem[]): number => {
  let totalWeightKg = 0;

  items.forEach(item => {
    const totalPages = item.pages * (item.copies || 1);
    
    let paperWeightPerPage = 0.002;
    
    if (item.paperType === 'premium') {
      paperWeightPerPage = 0.005;
    } else if (item.paperType === 'glossy') {
      paperWeightPerPage = 0.004;
    } else if (item.paperType === 'recycled') {
      paperWeightPerPage = 0.0025;
    }
    
    let itemWeight = totalPages * paperWeightPerPage;
    
    if (item.bindingType === 'spiral') {
      itemWeight += 0.050;
    } else if (item.bindingType === 'perfect_glue') {
      itemWeight += 0.080;
    } else if (item.bindingType === 'hardbound') {
      itemWeight += 0.200;
    } else if (item.bindingType === 'centre_staple' || item.bindingType === 'corner_staple') {
      itemWeight += 0.030;
    }
    
    if (item.lamination === 'matte' || item.lamination === 'glossy') {
      itemWeight += totalPages * 0.001;
    }
    
    totalWeightKg += itemWeight;
  });

  if (totalWeightKg > 2) {
    totalWeightKg += 0.3;
  } else if (totalWeightKg > 1) {
    totalWeightKg += 0.2;
  } else {
    totalWeightKg += 0.1;
  }
  
  return Math.max(0.1, Math.round(totalWeightKg * 1000) / 1000);
};

const calculateItemWeight = (item: CartItem): number => {
  const totalPages = item.pages * (item.copies || 1);
  
  let paperWeightPerPage = 0.002;
  
  if (item.paperType === 'premium') {
    paperWeightPerPage = 0.005;
  } else if (item.paperType === 'glossy') {
    paperWeightPerPage = 0.004;
  } else if (item.paperType === 'recycled') {
    paperWeightPerPage = 0.0025;
  }
  
  let weight = totalPages * paperWeightPerPage;
  
  if (item.bindingType === 'spiral') {
    weight += 0.050;
  } else if (item.bindingType === 'perfect_glue') {
    weight += 0.080;
  } else if (item.bindingType === 'hardbound') {
    weight += 0.200;
  } else if (item.bindingType === 'centre_staple' || item.bindingType === 'corner_staple') {
    weight += 0.030;
  }
  
  if (item.lamination === 'matte' || item.lamination === 'glossy') {
    weight += totalPages * 0.001;
  }
  
  return Math.round(weight * 1000) / 1000;
};

const formatWeight = (kg: number): string => {
  return kg >= 1 ? `${kg.toFixed(2)} kg` : `${(kg * 1000).toFixed(0)} g`;
};

// Delivery charge based on weight (fallback when not free)
const calculateDeliveryChargeByWeight = (weightKg: number): number => {
  if (weightKg < 0.5) return 50;
  if (weightKg < 1) return 100;
  if (weightKg < 3) return 200;
  if (weightKg < 5) return 230;
  if (weightKg < 10) return 400;
  if (weightKg < 15) return 700;
  if (weightKg < 20) return 900;
  if (weightKg < 40) return 1200;
  if (weightKg < 80) return 1600;
  return Math.ceil(weightKg) * 10;
};

// Helper to get current subtotal (printing+binding+gst)
const getSubtotal = (cartData: CartData | null): number => {
  if (!cartData?.items) return 0;
  return cartData.items.reduce((sum, item) => {
    try {
      const price = calculatePrice({
        pages: item.pages,
        copies: item.copies,
        paperSize: item.paperSize as any,
        paperType: item.paperType as any,
        printColor: item.printColor as any,
        printSide: item.printSide as any,
        bindingType: item.bindingType as any,
      });
      return sum + price.grandTotal;
    } catch {
      return sum;
    }
  }, 0);
};

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://bookprinters.in/api/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function Cart() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [deliveryCharge, setDeliveryCharge] = useState<number>(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState({
    address: '',
    pincode: '',
    city: '',
    state: '',
    landmark: '',
    addressType: 'Home' as 'Home' | 'Office'
  });
  const [updatingAddress, setUpdatingAddress] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  // Recalculate delivery charge whenever cart items or delivery type changes
  useEffect(() => {
    if (!cartData?.items.length || cartData.deliveryType !== 'courier') {
      if (deliveryCharge !== 0) setDeliveryCharge(0);
      return;
    }

    const subtotal = getSubtotal(cartData);
    // ✅ Free shipping if order total >= ₹5000
    if (subtotal >= 5000) {
      if (deliveryCharge !== 0) {
        setDeliveryCharge(0);
        // Save to backend
        API.put('/cart/delivery-charge', { deliveryCharge: 0 }).catch(err => console.error(err));
      }
      return;
    }

    // Otherwise calculate based on weight
    const weight = calculateOrderWeight(cartData.items);
    const charge = calculateDeliveryChargeByWeight(weight);
    if (charge !== deliveryCharge) {
      setDeliveryCharge(charge);
      API.put('/cart/delivery-charge', { deliveryCharge: charge }).catch(err => console.error(err));
    }
  }, [cartData?.items, cartData?.deliveryType]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await API.get('/cart');
      if (response.data && response.data.items && response.data.items.length > 0) {
        setCartData(response.data);
        // Delivery charge will be recalculated by the useEffect above
      } else {
        setCartData(null);
        setDeliveryCharge(0);
      }
    } catch (error: any) {
      console.error("Error fetching cart:", error);
      if (error.response?.status === 401) navigate('/login');
      toast.error("Failed to load cart");
      setCartData(null);
    } finally {
      setLoading(false);
    }
  };

  const updateDeliveryAddress = async () => {
    if (!cartData) return;
    setUpdatingAddress(true);
    try {
      if (!editingAddress.pincode || editingAddress.pincode.length !== 6) {
        toast.error('Please enter a valid 6-digit pincode');
        return;
      }
      if (!editingAddress.address) {
        toast.error('Please enter your address');
        return;
      }
      if (!editingAddress.city) {
        toast.error('Please enter your city');
        return;
      }
      if (!editingAddress.state) {
        toast.error('Please enter your state');
        return;
      }
      
      const response = await API.put('/cart/address', {
        address: editingAddress.address,
        pincode: editingAddress.pincode,
        city: editingAddress.city,
        state: editingAddress.state,
        landmark: editingAddress.landmark,
        addressType: editingAddress.addressType
      });
      
      if (response.data && response.data.cart) {
        setCartData(response.data.cart);
        setShowAddressModal(false);
        toast.success('Delivery address updated successfully');
        // Delivery charge will be recalculated automatically
      }
    } catch (error: any) {
      console.error("Failed to update address:", error);
      toast.error(error.response?.data?.message || "Failed to update address");
    } finally {
      setUpdatingAddress(false);
    }
  };

  const openAddressModal = () => {
    if (cartData?.customer) {
      setEditingAddress({
        address: cartData.customer.address || '',
        pincode: cartData.customer.pincode || '',
        city: cartData.customer.city || '',
        state: cartData.customer.state || '',
        landmark: cartData.customer.landmark || '',
        addressType: cartData.customer.addressType || 'Home'
      });
    }
    setShowAddressModal(true);
  };

  const calculateItemPrice = (item: CartItem) => {
    try {
      const priceData = calculatePrice({
        pages: item.pages,
        copies: item.copies,
        paperSize: item.paperSize as any,
        paperType: item.paperType as any,
        printColor: item.printColor as any,
        printSide: item.printSide as any,
        bindingType: item.bindingType as any,
      });
      return priceData;
    } catch (error) {
      console.error("Error calculating price:", error);
      return {
        totalCost: 0,
        grandTotal: 0,
        pricePerPage: 0,
        printingCost: 0,
        bindingCost: 0,
        gst: 0
      };
    }
  };

  const updateQuantity = async (_id: string, newQty: number) => {
    if (newQty < 1) return;
    const previousCartData = cartData;
    try {
      if (cartData) {
        const updatedItems = cartData.items.map(item => 
          item._id === _id ? { ...item, copies: newQty } : item
        );
        setCartData({ ...cartData, items: updatedItems });
      }
      const response = await API.put(`/cart/item/${_id}`, { copies: newQty });
      if (response.data && response.data.items) {
        setCartData(response.data);
      }
      toast.success("Quantity updated");
    } catch (error: any) {
      console.error("Update failed:", error);
      setCartData(previousCartData);
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  const removeItem = async (_id: string) => {
    const previousCartData = cartData;
    try {
      if (cartData) {
        const updatedItems = cartData.items.filter(item => item._id !== _id);
        setCartData(updatedItems.length ? { ...cartData, items: updatedItems } : null);
      }
      await API.delete(`/cart/item/${_id}`);
      toast.success("Item removed");
    } catch (error: any) {
      console.error("Delete failed:", error);
      setCartData(previousCartData);
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    if (isCheckingOut) return;
    try {
      if (!cartData) {
        toast.error("Cart is empty");
        return;
      }
      if (cartData.deliveryType === 'courier') {
        if (!cartData.customer?.pincode || !cartData.customer?.address) {
          toast.error("Please add your delivery address");
          openAddressModal();
          return;
        }
      }
      setIsCheckingOut(true);

      const itemsWithDetails = cartData.items.map(item => {
        const priceData = calculateItemPrice(item);
        return {
          ...item,
          productValue: priceData.grandTotal,
          itemWeight: calculateItemWeight(item),
          itemDetails: {
            pages: item.pages,
            copies: item.copies,
            paperType: item.paperType,
            printColor: item.printColor,
            bindingType: item.bindingType,
            lamination: item.lamination
          }
        };
      });

      const totalWeight = calculateOrderWeight(cartData.items);
      const subtotal = getSubtotal(cartData);
      const totalAmount = subtotal + deliveryCharge;

      const payload = {
        items: itemsWithDetails,
        customer: cartData.customer,
        deliveryType: cartData.deliveryType,
        deliveryCharge: cartData.deliveryType === 'courier' ? deliveryCharge : 0,
        orderWeight: totalWeight,
        orderMode: cartData.orderMode,
        totalAmount: totalAmount,
        subtotal: subtotal,
        declaredValue: subtotal,
        productValues: itemsWithDetails.map(i => i.productValue)
      };

      const res = await API.post('/order/create-from-cart', payload);
      const order = res.data.order;
      if (!order?._id) throw new Error("Order ID missing");

      localStorage.setItem("pendingOrder", JSON.stringify({
        orderId: order._id,
        amount: totalAmount,
        orderNumber: order.orderNumber,
        deliveryCharge: deliveryCharge,
        orderWeight: totalWeight,
        declaredValue: payload.declaredValue
      }));

      navigate('/checkout', {
        state: {
          orderId: order._id,
          amount: totalAmount,
          orderNumber: order.orderNumber,
          deliveryCharge: deliveryCharge,
          orderWeight: totalWeight,
          declaredValue: payload.declaredValue
        }
      });
    } catch (error: any) {
      console.error("Checkout failed:", error);
      toast.error(error.response?.data?.message || "Checkout failed");
      setIsCheckingOut(false);
    }
  };

  const clearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart?')) return;
    const previousCartData = cartData;
    try {
      setCartData(null);
      setDeliveryCharge(0);
      await API.delete('/cart');
      toast.success("Cart cleared");
    } catch (error: any) {
      console.error("Clear failed:", error);
      setCartData(previousCartData);
      toast.error("Failed to clear cart");
    }
  };

  const calculatedTotals = cartData?.items.reduce((sum, item) => {
    const price = calculateItemPrice(item);
    return {
      printingCost: sum.printingCost + price.printingCost,
      bindingCost: sum.bindingCost + price.bindingCost,
      totalCost: sum.totalCost + price.totalCost + sum.gst + price.gst,
      gst: sum.gst + price.gst,
      grandTotal: sum.grandTotal + price.grandTotal
    };
  }, { printingCost: 0, bindingCost: 0, totalCost: 0, gst: 0, grandTotal: 0 });

  const deliveryType = cartData?.deliveryType || 'pickup';
  const customer = cartData?.customer || {};
  const hasItems = !!cartData?.items?.length;
  const orderWeight = hasItems ? calculateOrderWeight(cartData.items) : 0;
  const subtotal = getSubtotal(cartData);
  const finalTotal = subtotal + deliveryCharge;

  const getDeliveryChargeBreakdown = (weight: number): string => {
    if (weight < 0.5) return "Under 500g";
    if (weight < 1) return "500g - 1kg";
    if (weight < 3) return "1kg - 3kg";
    if (weight < 5) return "3kg - 5kg";
    if (weight < 10) return "5kg - 10kg";
    if (weight < 15) return "10kg - 15kg";
    if (weight < 20) return "15kg - 20kg";
    if (weight < 40) return "20kg - 40kg";
    if (weight < 80) return "40kg - 80kg";
    return "Above 80kg (₹10/kg)";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col mt-28">
      
        
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your cart...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!hasItems) {
    return (
      <div className="min-h-screen bg-background flex flex-col mt-28">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <ShoppingCart className="h-20 w-20 mx-auto mb-6 text-muted-foreground/70" strokeWidth={1.2} />
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">You haven't added any printing orders yet.</p>
            <Link to="/order" className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 text-lg shadow-md transition-all duration-300 hover:scale-105">
              Start New Order <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Edit Delivery Address</h3>
                <button onClick={() => setShowAddressModal(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Address *</label>
                  <textarea value={editingAddress.address} onChange={e => setEditingAddress({...editingAddress, address: e.target.value})} className="w-full border rounded-lg p-2" rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Landmark (Optional)</label>
                  <input type="text" value={editingAddress.landmark} onChange={e => setEditingAddress({...editingAddress, landmark: e.target.value})} className="w-full border rounded-lg p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pincode *</label>
                  <input type="text" value={editingAddress.pincode} onChange={e => setEditingAddress({...editingAddress, pincode: e.target.value.replace(/\D/g, '').slice(0, 6)})} maxLength={6} className="w-full border rounded-lg p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City *</label>
                  <input type="text" value={editingAddress.city} onChange={e => setEditingAddress({...editingAddress, city: e.target.value})} className="w-full border rounded-lg p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State *</label>
                  <input type="text" value={editingAddress.state} onChange={e => setEditingAddress({...editingAddress, state: e.target.value})} className="w-full border rounded-lg p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Address Type</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2"><input type="radio" value="Home" checked={editingAddress.addressType === 'Home'} onChange={() => setEditingAddress({...editingAddress, addressType: 'Home'})} /> Home</label>
                    <label className="flex items-center gap-2"><input type="radio" value="Office" checked={editingAddress.addressType === 'Office'} onChange={() => setEditingAddress({...editingAddress, addressType: 'Office'})} /> Office</label>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowAddressModal(false)} className="flex-1 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={updateDeliveryAddress} disabled={updatingAddress} className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50">{updatingAddress ? 'Saving...' : 'Save Address'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="relative bg-secondary py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
              <ShoppingCart className="h-5 w-5" /> Your Order Cart
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Review Your Printing Order</h1>
            <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto">Modify quantities, remove items, or proceed to secure checkout</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2"><Package className="h-5 w-5 text-primary" /> Customer & Delivery Details</h3>
                  {deliveryType === 'courier' && <button onClick={openAddressModal} className="text-primary text-sm flex items-center gap-1"><Edit2 className="h-3 w-3" /> Edit Address</button>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground block text-xs">Name</span><p className="font-medium mt-1">{customer.name || '—'}</p></div>
                  <div><span className="text-muted-foreground block text-xs">Phone</span><p className="font-medium mt-1">{customer.phone || '—'}</p></div>
                  <div className="sm:col-span-2"><span className="text-muted-foreground block text-xs">Delivery Method</span><p className="font-medium mt-1 flex items-center gap-2">{deliveryType === 'courier' ? <><Truck className="h-4 w-4 text-primary" /> Courier Delivery</> : <><Package className="h-4 w-4 text-primary" /> Store Pickup</>}</p></div>
                  {deliveryType === 'courier' && (
                    <>
                      <div className="sm:col-span-2"><span className="text-muted-foreground block text-xs">Delivery Address</span><p className="font-medium mt-1">{customer.address || '—'}</p>{customer.landmark && <p className="text-xs text-muted-foreground mt-1">Landmark: {customer.landmark}</p>}</div>
                      <div><span className="text-muted-foreground block text-xs">Pincode / City</span><p className="font-medium mt-1">{customer.pincode || '—'} {customer.city ? `, ${customer.city}` : ''}</p></div>
                      <div><span className="text-muted-foreground block text-xs">State</span><p className="font-medium mt-1">{customer.state || '—'}</p></div>
                      <div><span className="text-muted-foreground block text-xs">Order Weight</span><p className="font-medium mt-1 flex items-center gap-1"><Package className="h-3 w-3" /> {formatWeight(orderWeight)}</p></div>
                    </>
                  )}
                </div>
              </div>

              {deliveryType === 'courier' && (
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h3 className="font-bold text-lg flex items-center gap-2 mb-4"><Truck className="h-5 w-5 text-primary" /> Delivery Charges</h3>
                  {!customer.pincode ? (
                    <div className="text-center py-8 text-muted-foreground"><MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" /><p>Please add your pincode to proceed</p><button onClick={openAddressModal} className="mt-3 text-primary hover:underline">Add Address →</button></div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-2"><CheckCircle className="h-5 w-5 text-green-600" /></div>
                        <div className="flex-1">
                          <div className="mt-3 space-y-2 text-sm">
                            {subtotal >= 5000 ? (
                              <div className="flex justify-between items-center text-green-700 font-semibold">
                                <span>🎉 Free Shipping</span>
                                <span>Your order total ₹{subtotal.toFixed(2)} ≥ ₹5000</span>
                              </div>
                            ) : (
                              <>
                                <div className="flex justify-between items-center"><span className="text-green-600">Total Weight:</span><span className="font-medium text-green-800">{formatWeight(orderWeight)}</span></div>
                                <div className="flex justify-between items-center pt-2 border-t border-green-200"><span className="text-green-700 font-semibold">Delivery Charge:</span><span className="font-bold text-green-800 text-xl">₹{deliveryCharge.toFixed(2)}</span></div>
                                <div className="text-xs text-green-600 mt-1">Add ₹{(5000 - subtotal).toFixed(2)} more to get free shipping</div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {cartData?.items.map((item, index) => {
                const itemTitle = item.paperSize ? `${item.paperSize} • ${item.printColor?.toUpperCase()} • ${item.printSide} side` : `Custom Print Job ${index + 1}`;
                const files = item.files || [];
                const priceData = calculateItemPrice(item);
                return (
                  <div key={item._id} className="bg-white rounded-xl shadow-md border overflow-hidden">
                    <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6">
                      <div className="w-full sm:w-32 md:w-40 h-40 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center shrink-0"><Printer className="h-12 w-12 text-primary/60" strokeWidth={1.5} /></div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start gap-4 mb-3"><h3 className="font-bold text-lg md:text-xl">{itemTitle}</h3><button onClick={() => removeItem(item._id)} className="text-red-500 hover:text-red-700"><Trash2 className="h-5 w-5" /></button></div>
                        <div className="text-sm text-muted-foreground mb-4 space-y-1"><p className="font-medium text-foreground">{item.pages} pages × {item.copies} copies</p><p>{paperTypeLabels[item.paperType || ''] || item.paperType || '—'} • {item.printColor === 'bw' ? 'B&W' : 'Color'} • {item.printSide === 'double' ? 'Double' : 'Single'} sided</p><p>Binding: {bindingLabels[item.bindingType || ''] || item.bindingType || '—'}</p>{item.lamination && item.lamination !== 'none' && <p>Lamination: {item.lamination.charAt(0).toUpperCase() + item.lamination.slice(1)}</p>}</div>
                        {files.length > 0 && <div className="mb-4 text-xs"><p className="text-muted-foreground mb-1 flex items-center gap-1"><FileText className="h-3 w-3" /> Uploaded Files:</p><ul className="space-y-1">{files.map(f => <li key={f._id} className="flex items-center gap-2 text-muted-foreground"><FileText className="h-3 w-3 text-primary/70" /><span className="truncate max-w-[200px]">{f.name}</span><span className="text-xs">({(f.size / 1024 / 1024).toFixed(1)} MB)</span></li>)}</ul></div>}
                        <div className="mt-auto flex flex-wrap justify-between items-center gap-4 pt-2">
                          <div className="flex border border-border rounded-lg overflow-hidden bg-muted/30"><button onClick={() => updateQuantity(item._id, item.copies - 1)} disabled={item.copies <= 1} className="px-4 py-2 hover:bg-muted"><Minus className="h-4 w-4" /></button><span className="px-5 py-2 font-semibold min-w-[3.5rem] text-center bg-white">{item.copies}</span><button onClick={() => updateQuantity(item._id, item.copies + 1)} className="px-4 py-2 hover:bg-muted"><Plus className="h-4 w-4" /></button></div>
                          <div className="text-right"><div className="text-lg font-bold text-primary">₹{priceData.grandTotal.toFixed(2)}</div><div className="text-xs text-muted-foreground">₹{priceData.pricePerPage.toFixed(2)}/page</div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between items-center pt-4"><Link to="/order" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3"><ArrowRight className="h-4 w-4 rotate-180" /> Continue Adding Orders</Link><button onClick={clearCart} className="text-red-600 hover:text-red-700 text-sm">Clear Cart</button></div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-lg border p-6 md:p-8 sticky top-6">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2"><Package className="h-6 w-6 text-primary" /> Order Summary</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-2"><span className="text-muted-foreground">Items</span><span className="font-semibold">{cartData?.items.length || 0}</span></div>
                  <div className="flex justify-between py-2 border-t"><span className="text-muted-foreground">Printing Cost</span><span className="font-semibold">₹{calculatedTotals?.printingCost.toFixed(2) || '0.00'}</span></div>
                  <div className="flex justify-between py-2"><span className="text-muted-foreground">Binding Cost</span><span className="font-semibold">₹{calculatedTotals?.bindingCost.toFixed(2) || '0.00'}</span></div>
                  <div className="flex justify-between py-2"><span className="text-muted-foreground">GST (5%)</span><span className="font-semibold">₹{calculatedTotals?.gst.toFixed(2) || '0.00'}</span></div>
                  <div className="flex justify-between py-2"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">₹{subtotal.toFixed(2)}</span></div>
                  {deliveryType === 'courier' && (
                    <>
                      <div className="flex justify-between py-2 border-t"><span className="text-muted-foreground">Order Weight</span><span className="font-semibold">{formatWeight(orderWeight)}</span></div>
                      <div className="flex justify-between py-2"><span className="text-muted-foreground">Delivery Charges</span><div className="text-right"><span className="font-semibold text-primary">{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge.toFixed(2)}`}</span>{deliveryCharge === 0 && <p className="text-xs text-green-600">(Free shipping on orders above ₹5000)</p>}</div></div>
                    </>
                  )}
                  <div className="border-t border-border pt-5 mt-4"><div className="flex justify-between items-center text-lg font-bold"><span className="text-foreground">Total Amount</span><span className="text-primary text-2xl font-black">₹{finalTotal.toFixed(2)}</span></div><p className="text-xs text-muted-foreground text-center mt-2">Inclusive of all taxes</p></div>
                </div>
                <div className="mt-8 space-y-4">
                  <button onClick={handleCheckout} disabled={isCheckingOut || (deliveryType === 'courier' && !customer.pincode)} className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5 disabled:opacity-50">
                    {isCheckingOut ? <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</> : <>Proceed to Checkout <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></>}
                  </button>
                  <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2"><Shield className="h-4 w-4" /> Secure checkout with Razorpay</div>
                </div>
                <div className="mt-6 pt-6 border-t text-xs text-muted-foreground space-y-2">
                  <div className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" /> GST invoice provided for every order</div>
                  <div className="flex items-start gap-2"><Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Free shipping on orders above ₹5000</div>
                  <div className="flex items-start gap-2"><Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Fast delivery across India</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
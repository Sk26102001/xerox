





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








import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, Shield, Truck, 
  CheckCircle, Printer, Package, FileText
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
  };
  orderMode: 'single' | 'bulk';
  deliveryType: 'pickup' | 'courier';
  totals: {
    printingCost: number;
    gst: number;
    totalWithDelivery: number;
  };
}

// ✅ API with auth header
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
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

  // ✅ Fetch cart on mount only
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await API.get('/cart');
      console.log("Fetched cart:", response.data);
      
      if (response.data && response.data.items && response.data.items.length > 0) {
        setCartData(response.data);
      } else {
        setCartData(null);
      }
    } catch (error: any) {
      console.error("Error fetching cart:", error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
      toast.error("Failed to load cart");
      setCartData(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Calculate price for a single item
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

  // ✅ Update quantity - No page refresh, just update local state
  const updateQuantity = async (_id: string, newQty: number) => {
    if (newQty < 1) return;
    
    // Store current cart data before update
    const previousCartData = cartData;
    
    try {
      // Immediately update UI (optimistic update)
      if (cartData) {
        const updatedItems = cartData.items.map(item => 
          item._id === _id ? { ...item, copies: newQty } : item
        );
        setCartData({ ...cartData, items: updatedItems });
      }
      
      // Make API call
      const response = await API.put(`/cart/item/${_id}`, { copies: newQty });
      
      // Update with server response (only if needed)
      if (response.data && response.data.items) {
        setCartData(response.data);
      }
      
      toast.success("Quantity updated");
    } catch (error: any) {
      console.error("Update failed:", error);
      // Revert to previous state on error
      setCartData(previousCartData);
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  // ✅ Remove item - Smooth removal without refresh
  const removeItem = async (_id: string) => {
    // Store current cart data before update
    const previousCartData = cartData;
    
    try {
      // Immediately update UI (optimistic update)
      if (cartData) {
        const updatedItems = cartData.items.filter(item => item._id !== _id);
        if (updatedItems.length > 0) {
          setCartData({ ...cartData, items: updatedItems });
        } else {
          setCartData(null);
        }
      }
      
      // Make API call
      await API.delete(`/cart/item/${_id}`);
      toast.success("Item removed");
    } catch (error: any) {
      console.error("Delete failed:", error);
      // Revert to previous state on error
      setCartData(previousCartData);
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    try {
      if (!cartData) {
        toast.error("Cart is empty");
        return;
      }

      const payload = {
        items: cartData.items,
        customer: cartData.customer,
        deliveryType: cartData.deliveryType,
        orderMode: cartData.orderMode,
        totalAmount: calculatedTotals?.grandTotal || total
      };

      const res = await API.post('/order/create-from-cart', payload);
      const orderData = res.data;
      const order = orderData.order;

      if (!order?._id) {
        throw new Error("Order ID missing from response");
      }

      localStorage.setItem("pendingOrder", JSON.stringify({
        orderId: order._id,
        amount: order.totalAmount,
        orderNumber: order.orderNumber
      }));

      navigate('/checkout', {
        state: {
          orderId: order._id,
          amount: order.totalAmount,
          orderNumber: order.orderNumber
        }
      });

    } catch (error: any) {
      console.error("Checkout failed:", error);
      toast.error(error.response?.data?.message || "Checkout failed");
    }
  };

  // ✅ Clear entire cart
  const clearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart?')) return;
    
    // Store current cart data before update
    const previousCartData = cartData;
    
    try {
      // Immediately clear UI
      setCartData(null);
      
      // Make API call
      await API.delete('/cart');
      toast.success("Cart cleared");
    } catch (error: any) {
      console.error("Clear failed:", error);
      // Revert to previous state on error
      setCartData(previousCartData);
      toast.error("Failed to clear cart");
    }
  };

  // ✅ Recalculate totals whenever cartData changes (without refetching)
  const calculatedTotals = cartData?.items.reduce((sum, item) => {
    const price = calculateItemPrice(item);
    return {
      printingCost: sum.printingCost + price.printingCost,
      bindingCost: sum.bindingCost + price.bindingCost,
      totalCost: sum.totalCost + price.totalCost,
      gst: sum.gst + price.gst,
      grandTotal: sum.grandTotal + price.grandTotal
    };
  }, { printingCost: 0, bindingCost: 0, totalCost: 0, gst: 0, grandTotal: 0 });

  const total = cartData?.totals?.totalWithDelivery || 0;
  const deliveryType = cartData?.deliveryType || 'pickup';
  const customer = cartData?.customer || {};
  const hasItems = cartData !== null && cartData.items && cartData.items.length > 0;

  // Show loading state
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

  // ✅ Show empty state when no items
  if (!hasItems) {
    return (
      <div className="min-h-screen bg-background flex flex-col mt-28">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <ShoppingCart className="h-20 w-20 mx-auto mb-6 text-muted-foreground/70" strokeWidth={1.2} />
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              You haven't added any printing orders yet.
            </p>
            <Link
              to="/order"
              className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 text-lg shadow-md transition-all duration-300 hover:scale-105"
            >
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

      {/* Header Section */}
      <section className="relative bg-secondary py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
              <ShoppingCart className="h-5 w-5" />
              Your Order Cart
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Review Your Printing Order
            </h1>
            <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto">
              Modify quantities, remove items, or proceed to secure checkout
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* LEFT - Items List */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Customer & Delivery Info Card */}
              <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Customer & Delivery Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wide">Name</span>
                    <p className="font-medium text-foreground mt-1">{customer.name || '—'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wide">Phone</span>
                    <p className="font-medium text-foreground mt-1">{customer.phone || '—'}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Method</span>
                    <p className="font-medium text-foreground mt-1 flex items-center gap-2">
                      {deliveryType === 'courier' ? (
                        <>
                          <Truck className="h-4 w-4 text-primary" />
                          Courier Delivery
                        </>
                      ) : (
                        <>
                          <Package className="h-4 w-4 text-primary" />
                          Store Pickup
                        </>
                      )}
                    </p>
                  </div>
                  {deliveryType === 'courier' && customer.address && (
                    <>
                      <div className="sm:col-span-2">
                        <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Address</span>
                        <p className="font-medium text-foreground mt-1">{customer.address}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-xs uppercase tracking-wide">Pincode / City</span>
                        <p className="font-medium text-foreground mt-1">
                          {customer.pincode} {customer.city ? `, ${customer.city}` : ''}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-xs uppercase tracking-wide">State</span>
                        <p className="font-medium text-foreground mt-1">{customer.state || '—'}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Order Items */}
              {cartData?.items.map((item, index) => {
                const itemTitle = item.paperSize
                  ? `${item.paperSize} • ${item.printColor?.toUpperCase()} • ${item.printSide} side`
                  : `Custom Print Job ${index + 1}`;
                
                const files = item.files || [];
                const priceData = calculateItemPrice(item);

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6">
                      {/* Thumbnail/Icon */}
                      <div className="w-full sm:w-32 md:w-40 h-40 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Printer className="h-12 w-12 text-primary/60" strokeWidth={1.5} />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <h3 className="font-bold text-lg md:text-xl leading-tight text-foreground">
                            {itemTitle}
                          </h3>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="text-red-500 hover:text-red-700 p-1.5 -mr-1.5 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="text-sm text-muted-foreground mb-4 space-y-1">
                          <p className="font-medium text-foreground">
                            {item.pages} pages × {item.copies} copies
                          </p>
                          <p>
                            {paperTypeLabels[item.paperType || ''] || item.paperType || '—'} •{' '}
                            {item.printColor === 'bw' ? 'B&W' : 'Color'} •{' '}
                            {item.printSide === 'double' ? 'Double' : 'Single'} sided
                          </p>
                          <p>
                            Binding: {bindingLabels[item.bindingType || ''] || item.bindingType || '—'}
                          </p>
                          {item.lamination && item.lamination !== 'none' && (
                            <p>Lamination: {item.lamination.charAt(0).toUpperCase() + item.lamination.slice(1)}</p>
                          )}
                        </div>

                        {/* Uploaded files list */}
                        {files.length > 0 && (
                          <div className="mb-4 text-xs">
                            <p className="text-muted-foreground mb-1 flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              Uploaded Files:
                            </p>
                            <ul className="space-y-1">
                              {files.map(f => (
                                <li key={f._id} className="flex items-center gap-2 text-muted-foreground">
                                  <FileText className="h-3 w-3 text-primary/70" />
                                  <span className="truncate max-w-[200px]">{f.name}</span>
                                  <span className="text-xs">
                                    ({(f.size / 1024 / 1024).toFixed(1)} MB)
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-auto flex flex-wrap justify-between items-center gap-4 pt-2">
                          <div className="flex border border-border rounded-lg overflow-hidden bg-muted/30">
                            <button
                              onClick={() => updateQuantity(item._id, item.copies - 1)}
                              disabled={item.copies <= 1}
                              className="px-4 py-2 hover:bg-muted transition-colors disabled:opacity-50"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-5 py-2 font-semibold min-w-[3.5rem] text-center bg-white">
                              {item.copies}
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id, item.copies + 1)}
                              className="px-4 py-2 hover:bg-muted transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">
                              ₹{priceData.grandTotal.toFixed(2)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ₹{priceData.pricePerPage.toFixed(2)}/page • ₹{priceData.bindingCost.toFixed(2)} binding
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Footer Actions */}
              <div className="flex justify-between items-center pt-4">
                <Link
                  to="/order"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group"
                >
                  <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Continue Adding Orders
                </Link>
                
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* RIGHT - Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-lg border p-6 md:p-8 sticky top-6">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <Package className="h-6 w-6 text-primary" />
                  Order Summary
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Items</span>
                    <span className="font-semibold">{cartData?.items.length || 0}</span>
                  </div>

                  <div className="flex justify-between py-2 border-t">
                    <span className="text-muted-foreground">Printing Cost</span>
                    <span className="font-semibold">₹{calculatedTotals?.printingCost.toFixed(2) || '0.00'}</span>
                  </div>
                  
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Binding Cost</span>
                    <span className="font-semibold">₹{calculatedTotals?.bindingCost.toFixed(2) || '0.00'}</span>
                  </div>
                  
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₹{calculatedTotals?.totalCost.toFixed(2) || '0.00'}</span>
                  </div>
                  
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">GST (5%)</span>
                    <span className="font-semibold">₹{calculatedTotals?.gst.toFixed(2) || '0.00'}</span>
                  </div>

                  {deliveryType === 'courier' && (
                    <div className="flex justify-between py-2 border-t">
                      <span className="text-muted-foreground">Delivery Charges</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                  )}

                  <div className="border-t border-border pt-5 mt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-foreground">Total Amount</span>
                      <span className="text-primary text-2xl font-black">
                        ₹{calculatedTotals?.grandTotal.toFixed(2) || total.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Inclusive of all taxes
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5 group"
                  >
                    Proceed to Checkout 
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4" />
                    Secure checkout with Razorpay
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t text-xs text-muted-foreground space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>GST invoice provided for every order</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Pan-India delivery • Tracking provided</span>
                  </div>
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
//     url?: string;
//   }>;
// }

// interface CartData {
//   _id: string;
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
//   status?: string;
//   payment?: {
//     status: string;
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
//   const [isCreatingOrder, setIsCreatingOrder] = useState(false);

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

//   // ✅ Calculate price for a single item
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

//   // ✅ Create order from cart and proceed to checkout
//   const createOrderAndProceedToCheckout = async () => {
//     if (!cartData || !cartData.items || cartData.items.length === 0) {
//       toast.error("Your cart is empty");
//       return;
//     }

//     setIsCreatingOrder(true);
//     const loadingToast = toast.loading("Creating order...");

//     try {
//       // Calculate total amount from cart items
//       const calculatedTotals = cartData.items.reduce((sum, item) => {
//         const price = calculateItemPrice(item);
//         return {
//           grandTotal: sum.grandTotal + price.grandTotal
//         };
//       }, { grandTotal: 0 });

//       const totalAmount = cartData.totals?.totalWithDelivery || calculatedTotals.grandTotal;

//       // Format order data exactly as backend expects
//       const orderData = {
//         items: cartData.items.map(item => ({
//           pages: item.pages,
//           copies: item.copies,
//           paperSize: item.paperSize || "A4",
//           paperType: item.paperType || "70gsm_normal",
//           printColor: item.printColor || "bw",
//           printSide: item.printSide || "double",
//           bindingType: item.bindingType || "perfect_glue",
//           lamination: item.lamination || "none",
//           instructions: item.instructions || "",
//           files: item.files?.map(file => ({
//             name: file.name,
//             size: file.size,
//             type: file.type,
//             url: file.url || ""
//           })) || []
//         })),
//         customer: {
//           name: cartData.customer?.name || "",
//           phone: cartData.customer?.phone || "",
//           address: cartData.customer?.address || "",
//           pincode: cartData.customer?.pincode || "",
//           city: cartData.customer?.city || "",
//           state: cartData.customer?.state || ""
//         },
//         orderMode: cartData.orderMode || "single",
//         deliveryType: cartData.deliveryType || "pickup",
//         totalAmount: totalAmount,
//         cartId: cartData._id // Send cart ID to clear after order creation
//       };

//       console.log("📦 Creating order from cart:", JSON.stringify(orderData, null, 2));

//       // Create order via API
//       const response = await API.post('/order/create-from-cart', orderData);
      
//       toast.dismiss(loadingToast);
      
//       if (response.data && response.data.success) {
//         const order = response.data.order;
        
//         const orderInfo = {
//           orderId: order._id,
//           amount: order.totalAmount,
//           orderNumber: order.orderNumber || `ORD-${order._id.slice(-6)}`
//         };
        
//         // Store order info for payment
//         localStorage.setItem('pendingOrder', JSON.stringify(orderInfo));
        
//         // Navigate to checkout with order data
//         navigate('/checkout', { 
//           state: orderInfo
//         });
//       } else {
//         throw new Error(response.data?.message || 'Failed to create order');
//       }
//     } catch (error: any) {
//       toast.dismiss(loadingToast);
//       console.error("❌ Error creating order:", error);
//       console.error("❌ Error response:", error.response?.data);
      
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error || 
//                           "Failed to create order. Please try again.";
//       toast.error(errorMessage);
//     } finally {
//       setIsCreatingOrder(false);
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
//                   <button
//                     onClick={createOrderAndProceedToCheckout}
//                     disabled={isCreatingOrder}
//                     className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5 group disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isCreatingOrder ? (
//                       <>
//                         <Loader2 className="h-5 w-5 animate-spin" />
//                         Creating Order...
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

















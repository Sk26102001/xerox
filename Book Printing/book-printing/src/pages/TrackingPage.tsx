
// import React from 'react';
// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Search, Package, Clock, Printer, CheckCircle, Truck, AlertCircle } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// type OrderStatus = 'pending' | 'confirmed' | 'printing' | 'ready' | 'dispatched' | 'completed';

// interface TrackingInfo {
//   orderId: string;
//   status: OrderStatus;
//   createdAt: string;
//   estimatedReady: string;
//   items: {
//     pages: number;
//     copies: number;
//     paperSize: string;
//     printColor: string;
//     bindingType: string;
//   };
//   amount: number;
//   deliveryType: string;
// }

// const statusSteps: { key: OrderStatus; label: string; icon: any; desc: string }[] = [
//   { key: 'pending', label: 'Order Placed', icon: Package, desc: 'Your order has been received' },
//   { key: 'confirmed', label: 'Confirmed', icon: CheckCircle, desc: 'Order confirmed & payment verified' },
//   { key: 'printing', label: 'Printing', icon: Printer, desc: 'Your documents are being printed' },
//   { key: 'ready', label: 'Ready', icon: CheckCircle, desc: 'Printing done, binding in progress' },
//   { key: 'dispatched', label: 'Dispatched', icon: Truck, desc: 'Out for delivery / ready for pickup' },
//   { key: 'completed', label: 'Completed', icon: CheckCircle, desc: 'Order delivered / picked up' },
// ];

// // Mock order data for demo
// const mockOrders: Record<string, TrackingInfo> = {
//   'BP12345678': {
//     orderId: 'BP12345678',
//     status: 'printing',
//     createdAt: '2026-02-19 10:30 AM',
//     estimatedReady: '2026-02-19 4:00 PM',
//     items: { pages: 200, copies: 2, paperSize: 'A4', printColor: 'B&W', bindingType: 'Perfect Glue' },
//     amount: 425.60,
//     deliveryType: 'Store Pickup',
//   },
//   'BP87654321': {
//     orderId: 'BP87654321',
//     status: 'dispatched',
//     createdAt: '2026-02-18 2:15 PM',
//     estimatedReady: '2026-02-19 12:00 PM',
//     items: { pages: 350, copies: 5, paperSize: 'B5', printColor: 'B&W', bindingType: 'Hardbound' },
//     amount: 1280.50,
//     deliveryType: 'Courier Delivery',
//   },
// };

// const getStatusIndex = (status: OrderStatus) => statusSteps.findIndex((s) => s.key === status);

// export default function TrackingPage() {
//   const [searchParams] = useSearchParams();
//   const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
//   const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
//   const [searched, setSearched] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [notFound, setNotFound] = useState(false);

//   const handleSearch = async () => {
//     if (!orderId.trim()) return;
//     setLoading(true);
//     setNotFound(false);
//     setTrackingInfo(null);

//     // Simulate API call
//     await new Promise((r) => setTimeout(r, 1200));

//     const info = mockOrders[orderId.toUpperCase()];
//     if (info) {
//       setTrackingInfo(info);
//     } else {
//       setNotFound(true);
//     }
//     setSearched(true);
//     setLoading(false);
//   };

//   // Auto-search if orderId is in URL
//   useEffect(() => {
//     const urlOrderId = searchParams.get('orderId');
//     if (urlOrderId) {
//       setOrderId(urlOrderId);
//       // Simulate finding the order
//       setTimeout(() => {
//         setTrackingInfo({
//           orderId: urlOrderId,
//           status: 'pending',
//           createdAt: new Date().toLocaleString(),
//           estimatedReady: 'Tomorrow by 5:00 PM',
//           items: { pages: 100, copies: 1, paperSize: 'A4', printColor: 'B&W', bindingType: 'Perfect Glue' },
//           amount: 250.00,
//           deliveryType: 'Store Pickup',
//         });
//         setSearched(true);
//       }, 500);
//     }
//   }, []);

//   const currentIndex = trackingInfo ? getStatusIndex(trackingInfo.status) : -1;

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <div className="pt-20">
//         {/* Header */}
//         <div className="bg-secondary py-10">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Track Your Order</h1>
//             <p className="text-white/60">Enter your Order ID to see real-time status</p>
//           </div>
//         </div>

//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//           {/* Search Box */}
//           <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-8">
//             <label className="block text-sm font-semibold text-foreground mb-2">Order ID</label>
//             <div className="flex gap-3">
//               <input
//                 type="text"
//                 value={orderId}
//                 onChange={(e) => setOrderId(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//                 placeholder="e.g. BP12345678"
//                 className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono"
//               />
//               <button
//                 onClick={handleSearch}
//                 disabled={loading || !orderId.trim()}
//                 className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 {loading ? (
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   <Search className="h-4 w-4" />
//                 )}
//                 Track
//               </button>
//             </div>
//             <p className="text-xs text-muted-foreground mt-2">
//               Demo orders: <button onClick={() => setOrderId('BP12345678')} className="text-primary hover:underline">BP12345678</button> or <button onClick={() => setOrderId('BP87654321')} className="text-primary hover:underline">BP87654321</button>
//             </p>
//           </div>

//           {/* Not Found */}
//           {searched && notFound && (
//             <div className="bg-white rounded-2xl border border-border shadow-sm p-8 text-center animate-slide-up">
//               <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//               <h3 className="text-xl font-bold text-foreground mb-2">Order Not Found</h3>
//               <p className="text-muted-foreground">We couldn't find an order with ID <span className="font-mono font-bold text-foreground">{orderId}</span>.</p>
//               <p className="text-muted-foreground text-sm mt-1">Please check the order ID and try again.</p>
//             </div>
//           )}

//           {/* Tracking Result */}
//           {trackingInfo && (
//             <div className="space-y-6 animate-slide-up">
//               {/* Status Header */}
//               <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
//                 <div className={`p-5 ${trackingInfo.status === 'completed' ? 'bg-green-600' : 'bg-secondary'}`}>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-white/60 text-sm">Order ID</p>
//                       <p className="text-white font-bold font-mono text-lg">{trackingInfo.orderId}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-white/60 text-sm">Amount</p>
//                       <p className="text-white font-bold text-lg">₹{trackingInfo.amount.toFixed(2)}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   {/* Progress Bar */}
//                   <div className="relative">
//                     {/* Track line */}
//                     <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted" />
//                     <div
//                       className="absolute top-5 left-5 h-0.5 bg-primary transition-all duration-1000"
//                       style={{ width: `${(currentIndex / (statusSteps.length - 1)) * (100 - 10)}%` }}
//                     />

//                     <div className="relative flex justify-between">
//                       {statusSteps.map((step, i) => {
//                         const isCompleted = i <= currentIndex;
//                         const isCurrent = i === currentIndex;
//                         return (
//                           <div key={step.key} className="flex flex-col items-center gap-2">
//                             <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
//                               isCompleted
//                                 ? isCurrent
//                                   ? 'bg-primary scale-110 shadow-lg shadow-primary/30'
//                                   : 'bg-primary/80'
//                                 : 'bg-muted'
//                             }`}>
//                               <step.icon className={`h-4 w-4 ${isCompleted ? 'text-white' : 'text-muted-foreground'}`} />
//                             </div>
//                             <div className="text-center">
//                               <p className={`text-xs font-semibold ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
//                                 {step.label}
//                               </p>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* Current Status Info */}
//                   <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
//                     <div className="flex items-start gap-3">
//                       {React.createElement(statusSteps[currentIndex]?.icon || Clock, { className: 'h-5 w-5 text-primary mt-0.5 shrink-0' })}
//                       <div>
//                         <p className="font-bold text-foreground">{statusSteps[currentIndex]?.label}</p>
//                         <p className="text-muted-foreground text-sm">{statusSteps[currentIndex]?.desc}</p>
//                         <p className="text-xs text-muted-foreground mt-1">Est. Ready: {trackingInfo.estimatedReady}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Order Details */}
//               <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
//                 <h3 className="font-bold text-foreground mb-4">Order Details</h3>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   {[
//                     { label: 'Pages', value: `${trackingInfo.items.pages}` },
//                     { label: 'Copies', value: `${trackingInfo.items.copies}` },
//                     { label: 'Paper Size', value: trackingInfo.items.paperSize },
//                     { label: 'Print Color', value: trackingInfo.items.printColor },
//                     { label: 'Binding', value: trackingInfo.items.bindingType },
//                     { label: 'Delivery', value: trackingInfo.deliveryType },
//                   ].map((item) => (
//                     <div key={item.label} className="p-3 bg-muted/30 rounded-lg">
//                       <p className="text-xs text-muted-foreground">{item.label}</p>
//                       <p className="font-semibold text-foreground text-sm mt-0.5">{item.value}</p>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mt-4 flex justify-between text-sm border-t border-border pt-4">
//                   <span className="text-muted-foreground">Order Placed</span>
//                   <span className="font-medium text-foreground">{trackingInfo.createdAt}</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }




// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Search, Package, Clock, Printer, CheckCircle, Truck, AlertCircle } from 'lucide-react';
// import React from 'react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import axios from 'axios';

// type OrderStatus = 'pending' | 'confirmed' | 'printing' | 'ready' | 'dispatched' | 'completed';

// interface TrackingInfo {
//   orderId: string;
//   status: OrderStatus;
//   createdAt: string;
//   estimatedReady: string;
//   items: {
//     pages: number;
//     copies: number;
//     paperSize: string;
//     printColor: string;
//     bindingType: string;
//   };
//   amount: number;
//   deliveryType: string;
//   waybill?: string;
//   courierName?: string;
//   currentLocation?: string;
// }

// const statusSteps: { key: OrderStatus; label: string; icon: any; desc: string }[] = [
//   { key: 'pending', label: 'Order Placed', icon: Package, desc: 'Your order has been received' },
//   { key: 'confirmed', label: 'Confirmed', icon: CheckCircle, desc: 'Order confirmed & payment verified' },
//   { key: 'printing', label: 'Printing', icon: Printer, desc: 'Your documents are being printed' },
//   { key: 'ready', label: 'Ready', icon: CheckCircle, desc: 'Printing done, binding in progress' },
//   { key: 'dispatched', label: 'Dispatched', icon: Truck, desc: 'Out for delivery / ready for pickup' },
//   { key: 'completed', label: 'Completed', icon: CheckCircle, desc: 'Order delivered / picked up' },
// ];

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// const getStatusIndex = (status: OrderStatus) => statusSteps.findIndex((s) => s.key === status);

// export default function TrackingPage() {
//   const [searchParams] = useSearchParams();
//   const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
//   const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
//   const [searched, setSearched] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [notFound, setNotFound] = useState(false);

//   const handleSearch = async () => {
//     if (!orderId.trim()) return;
//     setLoading(true);
//     setNotFound(false);
//     setTrackingInfo(null);

//     try {
//       // Encode the order number to handle special characters like /
//       const encodedOrderId = encodeURIComponent(orderId);
//       const response = await axios.get(`${API_BASE_URL}/order/track/${encodedOrderId}`);
      
//       if (response.data.success) {
//         const trackingData = response.data.data;
        
//         setTrackingInfo({
//           orderId: trackingData.orderId,
//           status: trackingData.status,
//           createdAt: trackingData.createdAt,
//           estimatedReady: trackingData.estimatedReady,
//           items: trackingData.items,
//           amount: trackingData.amount,
//           deliveryType: trackingData.deliveryType,
//           waybill: trackingData.waybill,
//           courierName: trackingData.courierName,
//           currentLocation: trackingData.currentLocation
//         });
//       } else {
//         setNotFound(true);
//       }
//     } catch (error: any) {
//       console.error('Tracking error:', error);
//       if (error.response?.status === 404) {
//         setNotFound(true);
//       }
//     } finally {
//       setLoading(false);
//       setSearched(true);
//     }
//   };

//   // Auto-search if orderId is in URL
//   useEffect(() => {
//     const urlOrderId = searchParams.get('orderId');
//     if (urlOrderId) {
//       setOrderId(urlOrderId);
//       setTimeout(() => {
//         handleSearch();
//       }, 500);
//     }
//   }, []);

//   const currentIndex = trackingInfo ? getStatusIndex(trackingInfo.status) : -1;

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <div className="pt-20">
//         {/* Header */}
//         <div className="bg-secondary py-10">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Track Your Order</h1>
//             <p className="text-white/60">Enter your Order ID to see real-time status</p>
//           </div>
//         </div>

//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//           {/* Search Box */}
//           <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-8">
//             <label className="block text-sm font-semibold text-foreground mb-2">Order ID</label>
//             <div className="flex gap-3">
//               <input
//                 type="text"
//                 value={orderId}
//                 onChange={(e) => setOrderId(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//                 placeholder="e.g. ORD/0051/28-03-2026"
//                 className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono"
//               />
//               <button
//                 onClick={handleSearch}
//                 disabled={loading || !orderId.trim()}
//                 className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 {loading ? (
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   <Search className="h-4 w-4" />
//                 )}
//                 Track
//               </button>
//             </div>
//             <p className="text-xs text-muted-foreground mt-2">
//               Enter your order ID to track your order status
//             </p>
//           </div>

//           {/* Not Found */}
//           {searched && notFound && (
//             <div className="bg-white rounded-2xl border border-border shadow-sm p-8 text-center animate-slide-up">
//               <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//               <h3 className="text-xl font-bold text-foreground mb-2">Order Not Found</h3>
//               <p className="text-muted-foreground">We couldn't find an order with ID <span className="font-mono font-bold text-foreground">{orderId}</span>.</p>
//               <p className="text-muted-foreground text-sm mt-1">Please check the order ID and try again.</p>
//             </div>
//           )}

//           {/* Tracking Result */}
//           {trackingInfo && (
//             <div className="space-y-6 animate-slide-up">
//               {/* Status Header */}
//               <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
//                 <div className={`p-5 ${trackingInfo.status === 'completed' ? 'bg-green-600' : 'bg-secondary'}`}>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-white/60 text-sm">Order ID</p>
//                       <p className="text-white font-bold font-mono text-lg">{trackingInfo.orderId}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-white/60 text-sm">Amount</p>
//                       <p className="text-white font-bold text-lg">₹{trackingInfo.amount.toFixed(2)}</p>
//                     </div>
//                   </div>
//                   {trackingInfo.waybill && (
//                     <div className="mt-2 pt-2 border-t border-white/20">
//                       <p className="text-white/60 text-xs">Waybill: {trackingInfo.waybill}</p>
//                       {trackingInfo.courierName && (
//                         <p className="text-white/60 text-xs">Courier: {trackingInfo.courierName}</p>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-6">
//                   {/* Progress Bar */}
//                   <div className="relative">
//                     <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted" />
//                     <div
//                       className="absolute top-5 left-5 h-0.5 bg-primary transition-all duration-1000"
//                       style={{ width: `${(currentIndex / (statusSteps.length - 1)) * (100 - 10)}%` }}
//                     />

//                     <div className="relative flex justify-between">
//                       {statusSteps.map((step, i) => {
//                         const isCompleted = i <= currentIndex;
//                         const isCurrent = i === currentIndex;
//                         return (
//                           <div key={step.key} className="flex flex-col items-center gap-2">
//                             <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
//                               isCompleted
//                                 ? isCurrent
//                                   ? 'bg-primary scale-110 shadow-lg shadow-primary/30'
//                                   : 'bg-primary/80'
//                                 : 'bg-muted'
//                             }`}>
//                               <step.icon className={`h-4 w-4 ${isCompleted ? 'text-white' : 'text-muted-foreground'}`} />
//                             </div>
//                             <div className="text-center">
//                               <p className={`text-xs font-semibold ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
//                                 {step.label}
//                               </p>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* Current Status Info */}
//                   <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
//                     <div className="flex items-start gap-3">
//                       {(() => {
//                         const IconComponent = statusSteps[currentIndex]?.icon || Clock;
//                         return <IconComponent className="h-5 w-5 text-primary mt-0.5 shrink-0" />;
//                       })()}
//                       <div>
//                         <p className="font-bold text-foreground">{statusSteps[currentIndex]?.label}</p>
//                         <p className="text-muted-foreground text-sm">{statusSteps[currentIndex]?.desc}</p>
//                         <p className="text-xs text-muted-foreground mt-1">Est. Ready: {trackingInfo.estimatedReady}</p>
//                         {trackingInfo.currentLocation && (
//                           <p className="text-xs text-muted-foreground mt-1">Location: {trackingInfo.currentLocation}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Order Details */}
//               <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
//                 <h3 className="font-bold text-foreground mb-4">Order Details</h3>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   {[
//                     { label: 'Pages', value: `${trackingInfo.items.pages}` },
//                     { label: 'Copies', value: `${trackingInfo.items.copies}` },
//                     { label: 'Paper Size', value: trackingInfo.items.paperSize },
//                     { label: 'Print Color', value: trackingInfo.items.printColor },
//                     { label: 'Binding', value: trackingInfo.items.bindingType },
//                     { label: 'Delivery', value: trackingInfo.deliveryType },
//                   ].map((item) => (
//                     <div key={item.label} className="p-3 bg-muted/30 rounded-lg">
//                       <p className="text-xs text-muted-foreground">{item.label}</p>
//                       <p className="font-semibold text-foreground text-sm mt-0.5">{item.value}</p>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mt-4 flex justify-between text-sm border-t border-border pt-4">
//                   <span className="text-muted-foreground">Order Placed</span>
//                   <span className="font-medium text-foreground">{trackingInfo.createdAt}</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }







// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Search, Package, Clock, Printer, CheckCircle, Truck, AlertCircle } from 'lucide-react';
// import React from 'react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import axios from 'axios';

// // Update OrderStatus type to match your backend
// type OrderStatus = 'pending' | 'processing' | 'printing' | 'ready' | 'dispatched' | 'completed' | 'cancelled';

// interface TrackingInfo {
//   orderId: string;
//   status: OrderStatus;
//   createdAt: string;
//   estimatedReady: string;
//   items: {
//     pages: number;
//     copies: number;
//     paperSize: string;
//     printColor: string;
//     bindingType: string;
//   };
//   amount: number;
//   deliveryType: string;
//   waybill?: string;
//   courierName?: string;
//   currentLocation?: string;
// }

// // Update status steps to match your backend
// const statusSteps: { key: OrderStatus; label: string; icon: any; desc: string }[] = [
//   { key: 'pending', label: 'Order Placed', icon: Package, desc: 'Your order has been received and payment is pending' },
//   { key: 'processing', label: 'Processing', icon: Clock, desc: 'Your order is being reviewed and prepared for printing' },
//   { key: 'printing', label: 'Printing', icon: Printer, desc: 'Your documents are being printed' },
//   { key: 'ready', label: 'Ready', icon: CheckCircle, desc: 'Printing complete, waiting for pickup/dispatch' },
//   { key: 'dispatched', label: 'Dispatched', icon: Truck, desc: 'Your order is out for delivery' },
//   { key: 'completed', label: 'Completed', icon: CheckCircle, desc: 'Order delivered / picked up successfully' },
// ];

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// const getStatusIndex = (status: OrderStatus) => statusSteps.findIndex((s) => s.key === status);

// export default function TrackingPage() {
//   const [searchParams] = useSearchParams();
//   const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
//   const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
//   const [searched, setSearched] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [notFound, setNotFound] = useState(false);

//   const handleSearch = async () => {
//     if (!orderId.trim()) return;
//     setLoading(true);
//     setNotFound(false);
//     setTrackingInfo(null);

//     try {
//       // Encode the order number to handle special characters like /
//       const encodedOrderId = encodeURIComponent(orderId);
//       const response = await axios.get(`${API_BASE_URL}/order/track/${encodedOrderId}`);
      
//       if (response.data.success) {
//         const trackingData = response.data.data;
        
//         // Map the status to ensure it's valid
//         const validStatus: OrderStatus = trackingData.status as OrderStatus;
        
//         setTrackingInfo({
//           orderId: trackingData.orderId,
//           status: validStatus,
//           createdAt: trackingData.createdAt,
//           estimatedReady: trackingData.estimatedReady,
//           items: trackingData.items,
//           amount: trackingData.amount,
//           deliveryType: trackingData.deliveryType,
//           waybill: trackingData.waybill,
//           courierName: trackingData.courierName,
//           currentLocation: trackingData.currentLocation
//         });
//       } else {
//         setNotFound(true);
//       }
//     } catch (error: any) {
//       console.error('Tracking error:', error);
//       if (error.response?.status === 404) {
//         setNotFound(true);
//       }
//     } finally {
//       setLoading(false);
//       setSearched(true);
//     }
//   };


  

//   // Auto-search if orderId is in URL
//   useEffect(() => {
//     const urlOrderId = searchParams.get('orderId');
//     if (urlOrderId) {
//       setOrderId(urlOrderId);
//       setTimeout(() => {
//         handleSearch();
//       }, 500);
//     }
//   }, []);

//   const currentIndex = trackingInfo ? getStatusIndex(trackingInfo.status) : -1;

//   // Handle cancelled order
//   const isCancelled = trackingInfo?.status === 'cancelled';

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <div className="pt-20">
//         {/* Header */}
//         <div className="bg-secondary py-10">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Track Your Order</h1>
//             <p className="text-white/60">Enter your Order ID to see real-time status</p>
//           </div>
//         </div>

//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//           {/* Search Box */}
//           <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-8">
//             <label className="block text-sm font-semibold text-foreground mb-2">Order ID</label>
//             <div className="flex gap-3">
//               <input
//                 type="text"
//                 value={orderId}
//                 onChange={(e) => setOrderId(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//                 placeholder="e.g. ORD/0051/28-03-2026"
//                 className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono"
//               />
//               <button
//                 onClick={handleSearch}
//                 disabled={loading || !orderId.trim()}
//                 className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 {loading ? (
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   <Search className="h-4 w-4" />
//                 )}
//                 Track
//               </button>
//             </div>
//             <p className="text-xs text-muted-foreground mt-2">
//               Enter your order ID to track your order status
//             </p>
//           </div>

//           {/* Not Found */}
//           {searched && notFound && (
//             <div className="bg-white rounded-2xl border border-border shadow-sm p-8 text-center animate-slide-up">
//               <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//               <h3 className="text-xl font-bold text-foreground mb-2">Order Not Found</h3>
//               <p className="text-muted-foreground">We couldn't find an order with ID <span className="font-mono font-bold text-foreground">{orderId}</span>.</p>
//               <p className="text-muted-foreground text-sm mt-1">Please check the order ID and try again.</p>
//             </div>
//           )}

//           {/* Tracking Result */}
//           {trackingInfo && !isCancelled && (
//             <div className="space-y-6 animate-slide-up">
//               {/* Status Header */}
//               <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
//                 <div className={`p-5 ${trackingInfo.status === 'completed' ? 'bg-green-600' : 'bg-secondary'}`}>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-white/60 text-sm">Order ID</p>
//                       <p className="text-white font-bold font-mono text-lg">{trackingInfo.orderId}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-white/60 text-sm">Amount</p>
//                       <p className="text-white font-bold text-lg">₹{trackingInfo.amount.toFixed(2)}</p>
//                     </div>
//                   </div>
//                   {trackingInfo.waybill && (
//                     <div className="mt-2 pt-2 border-t border-white/20">
//                       <p className="text-white/60 text-xs">Waybill: {trackingInfo.waybill}</p>
//                       {trackingInfo.courierName && (
//                         <p className="text-white/60 text-xs">Courier: {trackingInfo.courierName}</p>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-6">
//                   {/* Progress Bar */}
//                   <div className="relative">
//                     <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted" />
//                     <div
//                       className="absolute top-5 left-5 h-0.5 bg-primary transition-all duration-1000"
//                       style={{ width: `${(currentIndex / (statusSteps.length - 1)) * (100 - 10)}%` }}
//                     />

//                     <div className="relative flex justify-between">
//                       {statusSteps.map((step, i) => {
//                         const isCompleted = i <= currentIndex;
//                         const isCurrent = i === currentIndex;
//                         return (
//                           <div key={step.key} className="flex flex-col items-center gap-2">
//                             <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
//                               isCompleted
//                                 ? isCurrent
//                                   ? 'bg-primary scale-110 shadow-lg shadow-primary/30'
//                                   : 'bg-primary/80'
//                                 : 'bg-muted'
//                             }`}>
//                               <step.icon className={`h-4 w-4 ${isCompleted ? 'text-white' : 'text-muted-foreground'}`} />
//                             </div>
//                             <div className="text-center">
//                               <p className={`text-xs font-semibold ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
//                                 {step.label}
//                               </p>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* Current Status Info */}
//                   <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
//                     <div className="flex items-start gap-3">
//                       {(() => {
//                         const IconComponent = statusSteps[currentIndex]?.icon || Clock;
//                         return <IconComponent className="h-5 w-5 text-primary mt-0.5 shrink-0" />;
//                       })()}
//                       <div>
//                         <p className="font-bold text-foreground">{statusSteps[currentIndex]?.label}</p>
//                         <p className="text-muted-foreground text-sm">{statusSteps[currentIndex]?.desc}</p>
//                         <p className="text-xs text-muted-foreground mt-1">Est. Ready: {trackingInfo.estimatedReady}</p>
//                         {trackingInfo.currentLocation && (
//                           <p className="text-xs text-muted-foreground mt-1">Location: {trackingInfo.currentLocation}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Order Details */}
//               <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
//                 <h3 className="font-bold text-foreground mb-4">Order Details</h3>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   {[
//                     { label: 'Pages', value: `${trackingInfo.items.pages}` },
//                     { label: 'Copies', value: `${trackingInfo.items.copies}` },
//                     { label: 'Paper Size', value: trackingInfo.items.paperSize },
//                     { label: 'Print Color', value: trackingInfo.items.printColor === 'Color' ? 'Full Color' : 'B&W' },
//                     { label: 'Binding', value: trackingInfo.items.bindingType?.replace(/_/g, ' ') || 'None' },
//                     { label: 'Delivery', value: trackingInfo.deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup' },
//                   ].map((item) => (
//                     <div key={item.label} className="p-3 bg-muted/30 rounded-lg">
//                       <p className="text-xs text-muted-foreground">{item.label}</p>
//                       <p className="font-semibold text-foreground text-sm mt-0.5 capitalize">{item.value}</p>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mt-4 flex justify-between text-sm border-t border-border pt-4">
//                   <span className="text-muted-foreground">Order Placed</span>
//                   <span className="font-medium text-foreground">{trackingInfo.createdAt}</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Cancelled Order Display */}
//           {trackingInfo && isCancelled && (
//             <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center animate-slide-up">
//               <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//               <h3 className="text-xl font-bold text-red-800 mb-2">Order Cancelled</h3>
//               <p className="text-red-600">This order has been cancelled.</p>
//               <p className="text-red-500 text-sm mt-1">If you have any questions, please contact customer support.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }













// import { useState, useEffect, useRef } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Search, Package, Clock, Printer, CheckCircle, Truck, AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
// import React from 'react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import axios from 'axios';
// import { useToast } from '@/hooks/use-toast';

// // Update OrderStatus type to match your backend
// type  Status = 'pending' | 'processing' | 'printing' | 'ready' | 'dispatched' | 'completed' | 'cancelled';

// interface TrackingInfo {
//   orderId: string;
//   status: Status;
//   createdAt: string;
//   estimatedReady: string;
//   items: {
//     pages: number;
//     copies: number;
//     paperSize: string;
//     printColor: string;
//     bindingType: string;
//   };
//   amount: number;
//   deliveryType: string;
//   waybill?: string;
//   courierName?: string;
//   currentLocation?: string;
// }

// // Status steps
// const statusSteps: { key: Status; label: string; icon: any; desc: string }[] = [
//   { key: 'pending', label: 'Order Placed', icon: Package, desc: 'Your order has been received and payment is pending' },
//   { key: 'processing', label: 'Processing', icon: Clock, desc: 'Your order is being reviewed and prepared for printing' },
//   { key: 'printing', label: 'Printing', icon: Printer, desc: 'Your documents are being printed' },
//   { key: 'ready', label: 'Ready', icon: CheckCircle, desc: 'Printing complete, waiting for pickup/dispatch' },
//   { key: 'dispatched', label: 'Dispatched', icon: Truck, desc: 'Your order is out for delivery' },
//   { key: 'completed', label: 'Completed', icon: CheckCircle, desc: 'Order delivered / picked up successfully' },
//   { key: 'cancelled', label: 'Cancelled', icon: AlertCircle, desc: 'Your order has been cancelled' },
// ];

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:5000';

// const getStatusIndex = (status: Status) => statusSteps.findIndex((s) => s.key === status);

// export default function TrackingPage() {
//   const [searchParams] = useSearchParams();
//   const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
//   const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
//   const [searched, setSearched] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [notFound, setNotFound] = useState(false);
//   const [wsConnected, setWsConnected] = useState(false);
//   const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
//   const wsRef = useRef<WebSocket | null>(null);
//   const { toast } = useToast();

//   const fetchOrderStatus = async () => {
//     if (!orderId.trim()) return;
    
//     try {
//       const encodedOrderId = encodeURIComponent(orderId);
//       const response = await axios.get(`${API_BASE_URL}/order/track/${encodedOrderId}`);
      
//       if (response.data.success) {
//         const trackingData = response.data.data;
//         const validStatus: Status = trackingData.status as Status;
        
//         const newTrackingInfo = {
//           orderId: trackingData.orderId,
//           status: validStatus,
//           createdAt: trackingData.createdAt,
//           estimatedReady: trackingData.estimatedReady,
//           items: trackingData.items,
//           amount: trackingData.amount,
//           deliveryType: trackingData.deliveryType,
//           waybill: trackingData.waybill,
//           courierName: trackingData.courierName,
//           currentLocation: trackingData.currentLocation
//         };
        
//         // Only update if status changed or first load
//         if (!trackingInfo || trackingInfo.status !== validStatus) {
//           setTrackingInfo(newTrackingInfo);
          
//           // Show toast notification for status change
//           if (trackingInfo && trackingInfo.status !== validStatus) {
//             toast({
//               title: "Order Status Updated",
//               description: `Your order is now ${validStatus.toUpperCase()}`,
//               variant: "default",
//             });
//           }
//         } else {
//           setTrackingInfo(newTrackingInfo);
//         }
        
//         setLastUpdated(new Date());
//         return true;
//       } else {
//         setNotFound(true);
//         return false;
//       }
//     } catch (error: any) {
//       console.error('Error fetching order:', error);
//       if (error.response?.status === 404) {
//         setNotFound(true);
//       }
//       return false;
//     }
//   };

//   const handleSearch = async () => {
//     if (!orderId.trim()) return;
    
//     setLoading(true);
//     setNotFound(false);
    
//     // Close existing WebSocket connection if any
//     if (wsRef.current) {
//       wsRef.current.close();
//       wsRef.current = null;
//     }
    
//     const success = await fetchOrderStatus();
    
//     if (success && trackingInfo) {
//       // Establish WebSocket connection for real-time updates
//       connectWebSocket();
//     }
    
//     setLoading(false);
//     setSearched(true);
//   };

//   // const connectWebSocket = () => {
//   //   if (!trackingInfo?.orderId) return;
    
//   //   try {
//   //     // Close existing connection
//   //     if (wsRef.current) {
//   //       wsRef.current.close();
//   //     }
      
//   //     // Create new WebSocket connection with order ID in query params
//   //     const wsUrl = `${WS_BASE_URL}?orderId=${encodeURIComponent(trackingInfo.orderId)}`;
//   //     console.log('Connecting to WebSocket:', wsUrl);
      
//   //     wsRef.current = new WebSocket(wsUrl);
      
//   //     wsRef.current.onopen = () => {
//   //       console.log('WebSocket connected for order:', trackingInfo.orderId);
//   //       setWsConnected(true);
        
//   //       // Subscribe to order updates
//   //       wsRef.current?.send(JSON.stringify({
//   //         type: 'SUBSCRIBE',
//   //         orderId: trackingInfo.orderId
//   //       }));
//   //     };
      
//   //     wsRef.current.onmessage = (event) => {
//   //       try {
//   //         const data = JSON.parse(event.data);
//   //         console.log('WebSocket message received:', data);
          
//   //         if (data.type === 'ORDER_STATUS_UPDATED' && data.orderId === trackingInfo.orderId) {
//   //           console.log('Real-time status update received:', data.status);
//   //           // Fetch latest status immediately
//   //           fetchOrderStatus();
//   //         }
//   //       } catch (error) {
//   //         console.error('Error parsing WebSocket message:', error);
//   //       }
//   //     };
      
//   //     wsRef.current.onerror = (error) => {
//   //       console.error('WebSocket error:', error);
//   //       setWsConnected(false);
//   //     };
      
//   //     wsRef.current.onclose = () => {
//   //       console.log('WebSocket disconnected');
//   //       setWsConnected(false);
        
//   //       // Attempt to reconnect after 5 seconds if order is still active
//   //       if (trackingInfo && 
//   //           trackingInfo.status !== 'completed' && 
//   //           trackingInfo.status !== 'cancelled') {
//   //         setTimeout(() => {
//   //           if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
//   //             console.log('Attempting to reconnect WebSocket...');
//   //             connectWebSocket();
//   //           }
//   //         }, 5000);
//   //       }
//   //     };
//   //   } catch (error) {
//   //     console.error('Error creating WebSocket:', error);
//   //     setWsConnected(false);
//   //   }
//   // };
// const connectWebSocket = () => {
//   const currentOrderId = orderId;
  
//   if (!currentOrderId) {
//     console.log('No orderId available for WebSocket connection');
//     return;
//   }
  
//   try {
//     // Close existing connection
//     if (wsRef.current) {
//       wsRef.current.close();
//     }
    
//     // Create new WebSocket connection with order ID in query params
//     const wsUrl = `${WS_BASE_URL}?orderId=${encodeURIComponent(currentOrderId)}`;
//     console.log('Connecting to WebSocket:', wsUrl);
    
//     wsRef.current = new WebSocket(wsUrl);
    
//     wsRef.current.onopen = () => {
//       console.log('✅ WebSocket connected successfully for order:', currentOrderId);
//       setWsConnected(true);
      
//       // Subscribe to order updates
//       const subscribeMsg = JSON.stringify({
//         type: 'SUBSCRIBE',
//         orderId: currentOrderId
//       });
//       wsRef.current?.send(subscribeMsg);
//       console.log('Sent subscription message:', subscribeMsg);
//     };
    
//     wsRef.current.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         console.log('📨 WebSocket message received:', data);
        
//         if (data.type === 'CONNECTED') {
//           console.log('WebSocket connection confirmed:', data.message);
//         } else if (data.type === 'SUBSCRIBED') {
//           console.log('Successfully subscribed to order updates');
//         } else if (data.type === 'ORDER_STATUS_UPDATED') {
//           console.log('🔄 Real-time status update received:', data.status);
//           // Fetch latest status immediately
//           fetchOrderStatus();
//           toast({
//             title: "Order Updated",
//             description: `Your order status is now ${data.status.toUpperCase()}`,
//             variant: "default",
//           });
//         }
//       } catch (error) {
//         console.error('Error parsing WebSocket message:', error);
//       }
//     };
    
//     wsRef.current.onerror = (error) => {
//       console.error('WebSocket error:', error);
//       setWsConnected(false);
//     };
    
//     wsRef.current.onclose = (event) => {
//       console.log('WebSocket disconnected. Code:', event.code, 'Reason:', event.reason);
//       setWsConnected(false);
      
//       // Attempt to reconnect after 5 seconds if order is still active
//       if (trackingInfo && 
//           trackingInfo.status !== 'completed' && 
//           trackingInfo.status !== 'cancelled') {
//         setTimeout(() => {
//           if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
//             console.log('Attempting to reconnect WebSocket...');
//             connectWebSocket();
//           }
//         }, 5000);
//       }
//     };
//   } catch (error) {
//     console.error('Error creating WebSocket:', error);
//     setWsConnected(false);
//   }
// };
//   // Auto-search if orderId is in URL
//   useEffect(() => {
//     const urlOrderId = searchParams.get('orderId');
//     if (urlOrderId) {
//       setOrderId(urlOrderId);
//       setTimeout(() => {
//         handleSearch();
//       }, 500);
//     }
    
//     // Cleanup WebSocket on unmount
//     return () => {
//       if (wsRef.current) {
//         wsRef.current.close();
//       }
//     };
//   }, []);

//   // Manual refresh
//   const handleRefresh = async () => {
//     await fetchOrderStatus();
//     toast({
//       title: "Refreshed",
//       description: "Order status updated",
//       variant: "default",
//     });
//   };

//   const currentIndex = trackingInfo ? getStatusIndex(trackingInfo.status) : -1;
//   const isCancelled = trackingInfo?.status === 'cancelled';
//   const isCompleted = trackingInfo?.status === 'completed';
//   const isActive = trackingInfo && !isCompleted && !isCancelled;

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <div className="pt-20">
//         {/* Header */}
//         <div className="bg-secondary py-10">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Track Your Order</h1>
//             <p className="text-white/60">Enter your Order ID to see real-time status</p>
//           </div>
//         </div>

//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//           {/* Search Box */}
//           <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-8">
//             <label className="block text-sm font-semibold text-foreground mb-2">Order ID</label>
//             <div className="flex gap-3">
//               <input
//                 type="text"
//                 value={orderId}
//                 onChange={(e) => setOrderId(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//                 placeholder="e.g. ORD/0051/28-03-2026"
//                 className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono"
//                 disabled={loading}
//               />
//               <button
//                 onClick={handleSearch}
//                 disabled={loading || !orderId.trim()}
//                 className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 {loading ? (
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   <Search className="h-4 w-4" />
//                 )}
//                 Track
//               </button>
//             </div>
            
//             {/* Connection Status and Refresh Button */}
//             {trackingInfo && (
//               <div className="mt-4 flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className={`flex items-center gap-1.5 text-xs ${wsConnected ? 'text-green-600' : 'text-yellow-600'}`}>
//                     {wsConnected ? (
//                       <>
//                         <Wifi className="h-3 w-3" />
//                         <span>Live updates active</span>
//                       </>
//                     ) : (
//                       <>
//                         <WifiOff className="h-3 w-3" />
//                         <span>Reconnecting...</span>
//                       </>
//                     )}
//                   </div>
//                   {lastUpdated && (
//                     <span className="text-xs text-muted-foreground">
//                       Last updated: {lastUpdated.toLocaleTimeString()}
//                     </span>
//                   )}
//                 </div>
//                 <button
//                   onClick={handleRefresh}
//                   disabled={loading}
//                   className="px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-lg flex items-center gap-1.5 transition-colors"
//                 >
//                   <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
//                   Refresh
//                 </button>
//               </div>
//             )}
            
//             <p className="text-xs text-muted-foreground mt-2">
//               Enter your order ID to track your order status in real-time
//             </p>
//           </div>

//           {/* Not Found */}
//           {searched && notFound && (
//             <div className="bg-white rounded-2xl border border-border shadow-sm p-8 text-center animate-slide-up">
//               <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//               <h3 className="text-xl font-bold text-foreground mb-2">Order Not Found</h3>
//               <p className="text-muted-foreground">We couldn't find an order with ID <span className="font-mono font-bold text-foreground">{orderId}</span>.</p>
//               <p className="text-muted-foreground text-sm mt-1">Please check the order ID and try again.</p>
//             </div>
//           )}

//           {/* Tracking Result */}
//           {trackingInfo && !isCancelled && (
//             <div className="space-y-6 animate-slide-up">
//               {/* Status Header */}
//               <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
//                 <div className={`p-5 ${trackingInfo.status === 'completed' ? 'bg-green-600' : 'bg-secondary'}`}>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-white/60 text-sm">Order ID</p>
//                       <p className="text-white font-bold font-mono text-lg">{trackingInfo.orderId}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-white/60 text-sm">Amount</p>
//                       <p className="text-white font-bold text-lg">₹{trackingInfo.amount.toFixed(2)}</p>
//                     </div>
//                   </div>
//                   {trackingInfo.waybill && (
//                     <div className="mt-2 pt-2 border-t border-white/20">
//                       <p className="text-white/60 text-xs">Waybill: {trackingInfo.waybill}</p>
//                       {trackingInfo.courierName && (
//                         <p className="text-white/60 text-xs">Courier: {trackingInfo.courierName}</p>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-6">
//                   {/* Progress Bar */}
//                   <div className="relative">
//                     <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted" />
//                     <div
//                       className="absolute top-5 left-5 h-0.5 bg-primary transition-all duration-1000"
//                       style={{ width: `${(currentIndex / (statusSteps.length - 1)) * (100 - 10)}%` }}
//                     />

//                     <div className="relative flex justify-between">
//                       {statusSteps.map((step, i) => {
//                         const isCompleted = i <= currentIndex;
//                         const isCurrent = i === currentIndex;
//                         return (
//                           <div key={step.key} className="flex flex-col items-center gap-2">
//                             <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
//                               isCompleted
//                                 ? isCurrent
//                                   ? 'bg-primary scale-110 shadow-lg shadow-primary/30'
//                                   : 'bg-primary/80'
//                                 : 'bg-muted'
//                             }`}>
//                               <step.icon className={`h-4 w-4 ${isCompleted ? 'text-white' : 'text-muted-foreground'}`} />
//                             </div>
//                             <div className="text-center">
//                               <p className={`text-xs font-semibold ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
//                                 {step.label}
//                               </p>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* Current Status Info */}
//                   <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
//                     <div className="flex items-start gap-3">
//                       {(() => {
//                         const IconComponent = statusSteps[currentIndex]?.icon || Clock;
//                         return <IconComponent className="h-5 w-5 text-primary mt-0.5 shrink-0" />;
//                       })()}
//                       <div>
//                         <p className="font-bold text-foreground">{statusSteps[currentIndex]?.label}</p>
//                         <p className="text-muted-foreground text-sm">{statusSteps[currentIndex]?.desc}</p>
//                         <p className="text-xs text-muted-foreground mt-1">Est. Ready: {trackingInfo.estimatedReady}</p>
//                         {trackingInfo.currentLocation && (
//                           <p className="text-xs text-muted-foreground mt-1">Location: {trackingInfo.currentLocation}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Order Details */}
//               <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
//                 <h3 className="font-bold text-foreground mb-4">Order Details</h3>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   {[
//                     { label: 'Pages', value: `${trackingInfo.items.pages}` },
//                     { label: 'Copies', value: `${trackingInfo.items.copies}` },
//                     { label: 'Paper Size', value: trackingInfo.items.paperSize },
//                     { label: 'Print Color', value: trackingInfo.items.printColor === 'Color' ? 'Full Color' : 'B&W' },
//                     { label: 'Binding', value: trackingInfo.items.bindingType?.replace(/_/g, ' ') || 'None' },
//                     { label: 'Delivery', value: trackingInfo.deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup' },
//                   ].map((item) => (
//                     <div key={item.label} className="p-3 bg-muted/30 rounded-lg">
//                       <p className="text-xs text-muted-foreground">{item.label}</p>
//                       <p className="font-semibold text-foreground text-sm mt-0.5 capitalize">{item.value}</p>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mt-4 flex justify-between text-sm border-t border-border pt-4">
//                   <span className="text-muted-foreground">Order Placed</span>
//                   <span className="font-medium text-foreground">{trackingInfo.createdAt}</span>
//                 </div>
//               </div>

//               {/* Real-time Status Indicator */}
//               {isActive && (
//                 <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
//                   <div className="flex items-center gap-2">
//                     <div className="relative">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping absolute"></div>
//                       <div className="w-2 h-2 bg-blue-500 rounded-full relative"></div>
//                     </div>
//                     <p className="text-sm text-blue-700">
//                       <span className="font-medium">Live tracking active</span> - You'll receive instant updates when your order status changes
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Cancelled Order Display */}
//           {trackingInfo && isCancelled && (
//             <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center animate-slide-up">
//               <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//               <h3 className="text-xl font-bold text-red-800 mb-2">Order Cancelled</h3>
//               <p className="text-red-600">This order has been cancelled.</p>
//               <p className="text-red-500 text-sm mt-1">If you have any questions, please contact customer support.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }






import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Package, Clock, Printer, CheckCircle, Truck, AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

// Update OrderStatus type to match your backend
type Status = 'pending' | 'processing' | 'printing' | 'ready' | 'dispatched' | 'completed' | 'cancelled';

interface TrackingInfo {
  orderId: string;
  status: Status;
  createdAt: string;
  estimatedReady: string;
  items: {
    pages: number;
    copies: number;
    paperSize: string;
    printColor: string;
    bindingType: string;
  };
  amount: number;
  deliveryType: string;
  waybill?: string;
  courierName?: string;
  currentLocation?: string;
}

// Status steps
const statusSteps: { key: Status; label: string; icon: any; desc: string }[] = [
  { key: 'pending', label: 'Order Placed', icon: Package, desc: 'Your order has been received and payment is pending' },
  { key: 'processing', label: 'Processing', icon: Clock, desc: 'Your order is being reviewed and prepared for printing' },
  { key: 'printing', label: 'Printing', icon: Printer, desc: 'Your documents are being printed' },
  { key: 'ready', label: 'Ready', icon: CheckCircle, desc: 'Printing complete, waiting for pickup/dispatch' },
  { key: 'dispatched', label: 'Dispatched', icon: Truck, desc: 'Your order is out for delivery' },
  { key: 'completed', label: 'Completed', icon: CheckCircle, desc: 'Order delivered / picked up successfully' },
  { key: 'cancelled', label: 'Cancelled', icon: AlertCircle, desc: 'Your order has been cancelled' },
];

const API_BASE_URL = import.meta.env.VITE_API_URL ||  "https://bookprinters.in/api/api";
// const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:5000';
const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://bookprinters.in/api/api';

const getStatusIndex = (status: Status) => statusSteps.findIndex((s) => s.key === status);

export default function TrackingPage() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const { toast } = useToast();

  const fetchOrderStatus = async (showToastOnChange = false) => {
    if (!orderId.trim()) return false;
    
    try {
      const encodedOrderId = encodeURIComponent(orderId);
      const response = await axios.get(`${API_BASE_URL}/order/track/${encodedOrderId}`);
      
      if (response.data.success) {
        const trackingData = response.data.data;
        const validStatus: Status = trackingData.status as Status;
        
        const newTrackingInfo = {
          orderId: trackingData.orderId,
          status: validStatus,
          createdAt: trackingData.createdAt,
          estimatedReady: trackingData.estimatedReady,
          items: trackingData.items,
          amount: trackingData.amount,
          deliveryType: trackingData.deliveryType,
          waybill: trackingData.waybill,
          courierName: trackingData.courierName,
          currentLocation: trackingData.currentLocation
        };
        
        // Check if status changed
        const statusChanged = trackingInfo && trackingInfo.status !== validStatus;
        
        setTrackingInfo(newTrackingInfo);
        
        // Show toast notification for status change if requested
        if (showToastOnChange && statusChanged) {
          toast({
            title: "Order Status Updated",
            description: `Your order is now ${validStatus.toUpperCase()}`,
            variant: "default",
          });
        }
        
        setLastUpdated(new Date());
        return true;
      } else {
        setNotFound(true);
        return false;
      }
    } catch (error: any) {
      console.error('Error fetching order:', error);
      if (error.response?.status === 404) {
        setNotFound(true);
      }
      return false;
    }
  };

  const connectWebSocket = () => {
    const currentOrderId = orderId;
    
    if (!currentOrderId) {
      console.log('No orderId available for WebSocket connection');
      return;
    }
    
    try {
      // Close existing connection
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
      
      // Create new WebSocket connection with order ID in query params
      const wsUrl = `${WS_BASE_URL}?orderId=${encodeURIComponent(currentOrderId)}`;
      console.log('Connecting to WebSocket:', wsUrl);
      
      wsRef.current = new WebSocket(wsUrl);
      
      wsRef.current.onopen = () => {
        console.log('✅ WebSocket connected successfully for order:', currentOrderId);
        setWsConnected(true);
        
        // Subscribe to order updates
        const subscribeMsg = JSON.stringify({
          type: 'SUBSCRIBE',
          orderId: currentOrderId
        });
        wsRef.current?.send(subscribeMsg);
        console.log('Sent subscription message:', subscribeMsg);
      };
      
      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('📨 WebSocket message received:', data);
          
          if (data.type === 'CONNECTED') {
            console.log('WebSocket connection confirmed:', data.message);
          } else if (data.type === 'SUBSCRIBED') {
            console.log('Successfully subscribed to order updates');
          } else if (data.type === 'ORDER_STATUS_UPDATED') {
            console.log('🔄 Real-time status update received:', data.status);
            // Fetch latest status immediately with toast notification
            fetchOrderStatus(true);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setWsConnected(false);
      };
      
      wsRef.current.onclose = (event) => {
        console.log('WebSocket disconnected. Code:', event.code, 'Reason:', event.reason);
        setWsConnected(false);
        
        // Attempt to reconnect after 5 seconds if order is still active
        if (trackingInfo && 
            trackingInfo.status !== 'completed' && 
            trackingInfo.status !== 'cancelled') {
          setTimeout(() => {
            if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
              console.log('Attempting to reconnect WebSocket...');
              connectWebSocket();
            }
          }, 5000);
        }
      };
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      setWsConnected(false);
    }
  };

  const handleSearch = async () => {
    if (!orderId.trim()) return;
    
    setLoading(true);
    setNotFound(false);
    setTrackingInfo(null); // Clear previous tracking info
    
    // Close existing WebSocket connection if any
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    setWsConnected(false);
    
    const success = await fetchOrderStatus(false);
    
    if (success) {
      // Small delay to ensure trackingInfo is set before connecting WebSocket
      setTimeout(() => {
        connectWebSocket();
      }, 500);
    }
    
    setLoading(false);
    setSearched(true);
  };

  // Auto-search if orderId is in URL
  useEffect(() => {
    const urlOrderId = searchParams.get('orderId');
    if (urlOrderId) {
      setOrderId(urlOrderId);
      setTimeout(() => {
        handleSearch();
      }, 500);
    }
    
    // Cleanup WebSocket on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // Manual refresh
  const handleRefresh = async () => {
    await fetchOrderStatus(true);
    toast({
      title: "Refreshed",
      description: "Order status updated",
      variant: "default",
    });
  };

  const currentIndex = trackingInfo ? getStatusIndex(trackingInfo.status) : -1;
  const isCancelled = trackingInfo?.status === 'cancelled';
  const isCompleted = trackingInfo?.status === 'completed';
  const isActive = trackingInfo && !isCompleted && !isCancelled;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">
        {/* Header */}
        <div className="bg-secondary py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Track Your Order</h1>
            <p className="text-white/60">Enter your Order ID to see real-time status</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Search Box */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-8">
            <label className="block text-sm font-semibold text-foreground mb-2">Order ID</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g. ORD/0051/28-03-2026"
                className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono"
                disabled={loading}
              />
              <button
                onClick={handleSearch}
                disabled={loading || !orderId.trim()}
                className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                Track
              </button>
            </div>
            
            {/* Connection Status and Refresh Button */}
            {trackingInfo && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1.5 text-xs ${wsConnected ? 'text-green-600' : 'text-yellow-600'}`}>
                    {wsConnected ? (
                      <>
                        <Wifi className="h-3 w-3" />
                        <span>Live updates active</span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="h-3 w-3" />
                        <span>Connecting...</span>
                      </>
                    )}
                  </div>
                  {lastUpdated && (
                    <span className="text-xs text-muted-foreground">
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground mt-2">
              Enter your order ID to track your order status in real-time
            </p>
          </div>

          {/* Not Found */}
          {searched && notFound && (
            <div className="bg-white rounded-2xl border border-border shadow-sm p-8 text-center animate-slide-up">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Order Not Found</h3>
              <p className="text-muted-foreground">We couldn't find an order with ID <span className="font-mono font-bold text-foreground">{orderId}</span>.</p>
              <p className="text-muted-foreground text-sm mt-1">Please check the order ID and try again.</p>
            </div>
          )}

          {/* Tracking Result */}
          {trackingInfo && !isCancelled && (
            <div className="space-y-6 animate-slide-up">
              {/* Status Header */}
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className={`p-5 ${trackingInfo.status === 'completed' ? 'bg-green-600' : 'bg-secondary'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">Order ID</p>
                      <p className="text-white font-bold font-mono text-lg">{trackingInfo.orderId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm">Amount</p>
                      <p className="text-white font-bold text-lg">₹{trackingInfo.amount.toFixed(2)}</p>
                    </div>
                  </div>
                  {trackingInfo.waybill && (
                    <div className="mt-2 pt-2 border-t border-white/20">
                      <p className="text-white/60 text-xs">Waybill: {trackingInfo.waybill}</p>
                      {trackingInfo.courierName && (
                        <p className="text-white/60 text-xs">Courier: {trackingInfo.courierName}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted" />
                    <div
                      className="absolute top-5 left-5 h-0.5 bg-primary transition-all duration-1000"
                      style={{ width: `${(currentIndex / (statusSteps.length - 2)) * (100 - 10)}%` }}
                    />

                    <div className="relative flex justify-between">
                      {statusSteps.filter(step => step.key !== 'cancelled').map((step, i) => {
                        const isCompleted = i <= currentIndex;
                        const isCurrent = i === currentIndex;
                        return (
                          <div key={step.key} className="flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
                              isCompleted
                                ? isCurrent
                                  ? 'bg-primary scale-110 shadow-lg shadow-primary/30'
                                  : 'bg-primary/80'
                                : 'bg-muted'
                            }`}>
                              <step.icon className={`h-4 w-4 ${isCompleted ? 'text-white' : 'text-muted-foreground'}`} />
                            </div>
                            <div className="text-center">
                              <p className={`text-xs font-semibold ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                                {step.label}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Current Status Info */}
                  <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-start gap-3">
                      {(() => {
                        const IconComponent = statusSteps[currentIndex]?.icon || Clock;
                        return <IconComponent className="h-5 w-5 text-primary mt-0.5 shrink-0" />;
                      })()}
                      <div>
                        <p className="font-bold text-foreground">{statusSteps[currentIndex]?.label}</p>
                        <p className="text-muted-foreground text-sm">{statusSteps[currentIndex]?.desc}</p>
                        <p className="text-xs text-muted-foreground mt-1">Est. Ready: {trackingInfo.estimatedReady}</p>
                        {trackingInfo.currentLocation && (
                          <p className="text-xs text-muted-foreground mt-1">Location: {trackingInfo.currentLocation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
                <h3 className="font-bold text-foreground mb-4">Order Details</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Pages', value: `${trackingInfo.items.pages}` },
                    { label: 'Copies', value: `${trackingInfo.items.copies}` },
                    { label: 'Paper Size', value: trackingInfo.items.paperSize },
                    { label: 'Print Color', value: trackingInfo.items.printColor === 'Color' ? 'Full Color' : 'B&W' },
                    { label: 'Binding', value: trackingInfo.items.bindingType?.replace(/_/g, ' ') || 'None' },
                    { label: 'Delivery', value: trackingInfo.deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup' },
                  ].map((item) => (
                    <div key={item.label} className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm mt-0.5 capitalize">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-sm border-t border-border pt-4">
                  <span className="text-muted-foreground">Order Placed</span>
                  <span className="font-medium text-foreground">{trackingInfo.createdAt}</span>
                </div>
              </div>

              {/* Real-time Status Indicator */}
              {isActive && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping absolute"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full relative"></div>
                    </div>
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Live tracking active</span> - You'll receive instant updates when your order status changes
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cancelled Order Display */}
          {trackingInfo && isCancelled && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center animate-slide-up">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-800 mb-2">Order Cancelled</h3>
              <p className="text-red-600">This order has been cancelled.</p>
              <p className="text-red-500 text-sm mt-1">If you have any questions, please contact customer support.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
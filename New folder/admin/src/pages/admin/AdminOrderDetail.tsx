// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, Download, FileText, Loader2, RefreshCw, Truck, MapPin, Package, CreditCard, Printer, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
// import { useToast } from '@/hooks/use-toast';
// import axiosInstance from '@/api/axios';

// // Types matching your Order schema
// interface File {
//   name: string;
//   size: number;
//   type: string;
//   status: 'uploading' | 'done' | 'error';
//   url: string;
// }

// interface OrderItem {
//   pages: number;
//   copies: number;
//   paperSize?: string;
//   paperType?: string;
//   printColor?: 'bw' | 'color';
//   printSide?: 'single' | 'double';
//   bindingType?: string;
//   lamination?: string;
//   instructions?: string;
//   files: File[];
//   amount?: number;      // ✅ ADDED
//   unitPrice?: number;   // ✅ ADDED
// }

// interface Customer {
//   name: string;
//   phone: string;
//   address?: string;
//   pincode?: string;
//   city?: string;
//   state?: string;
//   landmark?: string;
// }

// interface Shipment {
//   waybill?: string;
//   courier?: string;
//   status?: string;
//   labelUrl?: string;
//   pickupRegistered?: boolean;
//   cancelled?: boolean;
//   lastUpdated?: Date;
//   trackingData?: any;
// }

// interface Order {
//   _id: string;
//   userId: string;
//   orderNumber: string;
//   items: OrderItem[];
//   orderMode: 'single' | 'bulk';
//   deliveryType: 'pickup' | 'courier';
//   customer: Customer;
//   totalAmount: number;
//   finalAmount?: number;
//   discountAmount?: number;
//   paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
//   paymentId?: string | null;
//   razorpayOrderId?: string;
//   status: 'pending' | 'processing' | 'printing' | 'ready' | 'dispatched' | 'completed' | 'cancelled';
//   cartId?: string;
//   shipmentCreated?: boolean;
//   shipment?: Shipment;
//   fship?: Shipment;
//   payment?: string;
//   orderWeight?: number;
//   deliveryCharge?: number;
//   deliveryPartner?: number;
//   createdAt: string;
//   updatedAt: string;
// }

// // Helper function to calculate item amount if not present
// const calculateItemAmount = (item: OrderItem): number => {
//   if (item.amount && item.amount > 0) {
//     return item.amount;
//   }
  
//   // Calculate if amount is not present
//   const totalPages = (item.pages || 0) * (item.copies || 1);
//   let amount = 0;
  
//   if (item.printColor === 'color') {
//     amount = totalPages * 3;  // ₹3 per color page
//   } else {
//     amount = totalPages * 1;  // ₹1 per B&W page
//   }
  
//   // Add binding cost
//   if (item.bindingType === 'perfect_glue') amount += 50 * (item.copies || 1);
//   else if (item.bindingType === 'spiral') amount += 30 * (item.copies || 1);
//   else if (item.bindingType === 'hardcover') amount += 150 * (item.copies || 1);
  
//   // Add GST 5%
//   const gst = amount * 0.05;
//   amount = amount + gst;
  
//   return amount;
// };

// // Download Label Button Component
// const DownloadLabelButton = ({ orderId, orderNumber, waybill, courierName, onLabelGenerated }: { 
//   orderId: string; 
//   orderNumber: string; 
//   waybill?: string; 
//   courierName?: string;
//   onLabelGenerated?: () => void;
// }) => {
//   const [downloading, setDownloading] = useState(false);
//   const [printing, setPrinting] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [showPreview, setShowPreview] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
//   const { toast } = useToast();

//   const fetchLabel = async (action: 'download' | 'print' | 'preview') => {
//     if (!waybill) {
//       toast({ 
//         title: 'No Label Available', 
//         description: 'No shipping label has been generated for this order yet.',
//         variant: 'destructive'
//       });
//       return false;
//     }
    
//     try {
//       const response = await axiosInstance.get(`/order/${orderId}/label`, {
//         responseType: 'blob'
//       });
      
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = URL.createObjectURL(blob);
      
//       if (action === 'download') {
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', `shipping-label-${orderNumber}.pdf`);
//         document.body.appendChild(link);
//         link.click();
//         link.remove();
//         URL.revokeObjectURL(url);
//         toast({ title: 'Success', description: 'Shipping label downloaded successfully' });
//       } else if (action === 'print') {
//         const printWindow = window.open(url, '_blank');
//         if (printWindow) {
//           printWindow.onload = () => {
//             printWindow.print();
//           };
//         }
//         setTimeout(() => URL.revokeObjectURL(url), 1000);
//         toast({ title: 'Success', description: 'Label ready for printing' });
//       } else if (action === 'preview') {
//         setPdfUrl(url);
//         setShowPreview(true);
//       }
      
//       return true;
//     } catch (error: any) {
//       console.error('Label fetch failed:', error);
//       toast({ 
//         title: 'Error', 
//         description: error.response?.data?.message || 'Failed to fetch label',
//         variant: 'destructive'
//       });
//       return false;
//     }
//   };

//   const downloadLabel = async () => {
//     setDownloading(true);
//     await fetchLabel('download');
//     setDownloading(false);
//   };

//   const printLabel = async () => {
//     setPrinting(true);
//     await fetchLabel('print');
//     setPrinting(false);
//   };

//   const previewLabel = async () => {
//     await fetchLabel('preview');
//   };

//   const generateLabel = async () => {
//     if (!waybill) {
//       toast({ 
//         title: 'Cannot Generate Label', 
//         description: 'No shipment exists for this order.',
//         variant: 'destructive'
//       });
//       return;
//     }
    
//     setGenerating(true);
//     try {
//       const response = await axiosInstance.post('/shipping/shipping-label', {
//         waybills: waybill
//       });
      
//       if (response.data.success && response.data.data?.labelurl) {
//         toast({ 
//           title: 'Success', 
//           description: 'Shipping label generated successfully' 
//         });
//         if (onLabelGenerated) onLabelGenerated();
//         await fetchLabel('preview');
//       } else {
//         throw new Error('Failed to generate label');
//       }
//     } catch (error: any) {
//       console.error('Generate label error:', error);
//       toast({ 
//         title: 'Error', 
//         description: error.response?.data?.message || 'Failed to generate label',
//         variant: 'destructive'
//       });
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const closePreview = () => {
//     if (pdfUrl) {
//       URL.revokeObjectURL(pdfUrl);
//     }
//     setShowPreview(false);
//     setPdfUrl(null);
//   };

//   if (!waybill) {
//     return (
//       <div className="text-sm text-gray-500 italic">
//         No shipment created yet
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex gap-2 flex-wrap">
//         <Button
//           onClick={previewLabel}
//           variant="outline"
//           size="sm"
//           className="gap-2"
//         >
//           <FileText className="h-4 w-4" />
//           Preview
//         </Button>
//         <Button
//           onClick={downloadLabel}
//           disabled={downloading}
//           variant="outline"
//           size="sm"
//           className="gap-2"
//         >
//           {downloading ? (
//             <Loader2 className="h-4 w-4 animate-spin" />
//           ) : (
//             <Download className="h-4 w-4" />
//           )}
//           {downloading ? 'Downloading...' : 'Download'}
//         </Button>
//         <Button
//           onClick={printLabel}
//           disabled={printing}
//           variant="outline"
//           size="sm"
//           className="gap-2"
//         >
//           {printing ? (
//             <Loader2 className="h-4 w-4 animate-spin" />
//           ) : (
//             <Printer className="h-4 w-4" />
//           )}
//           {printing ? 'Loading...' : 'Print'}
//         </Button>
//         <Button
//           onClick={generateLabel}
//           disabled={generating}
//           variant="outline"
//           size="sm"
//           className="gap-2"
//         >
//           <RefreshCw className={`h-4 w-4 ${generating ? 'animate-spin' : ''}`} />
//           {generating ? 'Generating...' : 'Regenerate'}
//         </Button>
//       </div>

//       {/* Label Preview Modal */}
//       {showPreview && pdfUrl && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
//             <div className="flex justify-between items-center p-4 border-b">
//               <h3 className="text-xl font-bold">Shipping Label - {orderNumber}</h3>
//               <button 
//                 onClick={closePreview} 
//                 className="p-1 hover:bg-gray-100 rounded"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//             <div className="p-4 overflow-auto max-h-[calc(90vh-120px)] bg-gray-100">
//               <object
//                 data={pdfUrl}
//                 type="application/pdf"
//                 className="w-full h-[600px] rounded-lg shadow-lg"
//               >
//                 <div className="flex flex-col items-center justify-center h-[600px] bg-gray-100">
//                   <p className="text-gray-500 mb-4">Unable to display PDF preview</p>
//                   <p className="text-sm text-gray-400 mb-4">Your browser may not support PDF preview</p>
//                   <Button
//                     onClick={() => {
//                       const link = document.createElement('a');
//                       link.href = pdfUrl;
//                       link.download = `shipping-label-${orderNumber}.pdf`;
//                       link.click();
//                     }}
//                     variant="outline"
//                     className="gap-2"
//                   >
//                     <Download className="h-4 w-4" />
//                     Download to View
//                   </Button>
//                 </div>
//               </object>
//             </div>
//             <div className="flex justify-end gap-3 p-4 border-t">
//               <Button
//                 onClick={() => {
//                   const link = document.createElement('a');
//                   link.href = pdfUrl;
//                   link.download = `shipping-label-${orderNumber}.pdf`;
//                   link.click();
//                 }}
//                 variant="outline"
//                 className="gap-2"
//               >
//                 <Download className="h-4 w-4" />
//                 Download
//               </Button>
//               <Button
//                 onClick={() => {
//                   const printWindow = window.open(pdfUrl, '_blank');
//                   if (printWindow) {
//                     printWindow.onload = () => {
//                       printWindow.print();
//                     };
//                   }
//                 }}
//                 variant="outline"
//                 className="gap-2"
//               >
//                 <Printer className="h-4 w-4" />
//                 Print
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// const AdminOrderDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   // View shipping details
//   const viewShippingDetails = async () => {
//     if (!order?._id) return;
    
//     try {
//       const response = await axiosInstance.get(`/order/${order._id}/shipping`);
      
//       if (response.data.success) {
//         const shipping = response.data.data;
//         toast({
//           title: 'Shipping Details',
//           description: (
//             <div className="mt-2 text-sm">
//               <p><strong>Waybill:</strong> {shipping.waybill || 'N/A'}</p>
//               <p><strong>Courier:</strong> {shipping.courier || 'N/A'}</p>
//               <p><strong>Charge:</strong> ₹{shipping.shippingCharge || 'N/A'}</p>
//               <p><strong>Status:</strong> {shipping.status}</p>
//               {shipping.currentTracking?.status && (
//                 <p><strong>Tracking:</strong> {shipping.currentTracking.status}</p>
//               )}
//             </div>
//           ),
//           duration: 5000,
//         });
//       }
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch shipping details',
//         variant: 'destructive'
//       });
//     }
//   };

//   // Auto-refresh for pending payments
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (order?.paymentStatus === 'pending') {
//         fetchOrderDetails();
//       }
//     }, 30000);
    
//     return () => clearInterval(interval);
//   }, [order?.paymentStatus]);

//   useEffect(() => {
//     if (id) {
//       console.log('Fetching order with ID:', id);
//       fetchOrderDetails();
//     }
//   }, [id]);

//   const fetchOrderDetails = async () => {
//     try {
//       setLoading(true);
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         toast({
//           title: 'Error',
//           description: 'Authentication required',
//           variant: 'destructive',
//         });
//         navigate('/admin/login');
//         return;
//       }
      
//       const encodedId = encodeURIComponent(id || '');
//       const response = await axiosInstance.get(`/order/${encodedId}`);
      
//       if (response.data && response.data.success) {
//         setOrder(response.data.order);
//       } else {
//         toast({
//           title: 'Error',
//           description: response.data?.message || 'Order not found',
//           variant: 'destructive',
//         });
//       }
//     } catch (error: any) {
//       console.error('Error fetching order:', error);
      
//       if (error.response?.status === 404) {
//         toast({
//           title: 'Not Found',
//           description: `Order not found`,
//           variant: 'destructive',
//         });
//       } else if (error.response?.status === 401) {
//         toast({
//           title: 'Unauthorized',
//           description: 'Please login again',
//           variant: 'destructive',
//         });
//         navigate('/admin/login');
//       } else {
//         toast({
//           title: 'Error',
//           description: error.response?.data?.message || 'Failed to fetch order details',
//           variant: 'destructive',
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateOrderStatus = async (newStatus: string) => {
//     if (!order) return;
    
//     console.log('Updating order status:', {
//       orderId: order._id,
//       currentStatus: order.status,
//       newStatus: newStatus
//     });
    
//     try {
//       setUpdating(true);
      
//       const response = await axiosInstance.put(`/order/${order._id}/status`, {
//         status: newStatus
//       });
      
//       if (response.data && response.data.success) {
//         setOrder({ ...order, status: newStatus as Order['status'] });
//         toast({
//           title: 'Success',
//           description: response.data.message || `Order status updated to ${getStatusLabel(newStatus)}`,
//         });
        
//         fetchOrderDetails();
//       } else {
//         throw new Error(response.data?.message || 'Failed to update status');
//       }
//     } catch (error: any) {
//       console.error('Error updating status:', error);
      
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || error.message || 'Failed to update status',
//         variant: 'destructive',
//       });
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const getStatusLabel = (status: string): string => {
//     const labels: Record<string, string> = {
//       pending: '📋 Pending',
//       processing: '⚙️ Processing',
//       printing: '🖨️ Printing',
//       ready: '✅ Ready',
//       dispatched: '🚚 Dispatched',
//       completed: '🎉 Completed',
//       cancelled: '❌ Cancelled'
//     };
//     return labels[status] || status;
//   };

//   const handleDownloadFiles = async () => {
//     if (!order || !order.items) {
//       toast({ 
//         title: 'No Files', 
//         description: 'No files attached to this order',
//         variant: 'destructive'
//       });
//       return;
//     }
    
//     const files = order.items.flatMap(item => item.files || []);
    
//     if (files.length === 0) {
//       toast({ 
//         title: 'No Files', 
//         description: 'No files attached to this order',
//         variant: 'destructive'
//       });
//       return;
//     }
    
//     let successCount = 0;
//     let failCount = 0;
    
//     for (const file of files) {
//       if (file.url && file.url.trim() !== '') {
//         try {
//           const response = await fetch(file.url, {
//             headers: {
//               'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//           });
          
//           if (response.ok) {
//             const blob = await response.blob();
//             const downloadUrl = URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = downloadUrl;
//             link.download = file.name;
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             URL.revokeObjectURL(downloadUrl);
//             successCount++;
//           } else {
//             console.error('Failed to fetch file:', response.status);
//             failCount++;
//           }
//         } catch (error) {
//           console.error('Error downloading file:', file.name, error);
//           failCount++;
//         }
//       } else {
//         console.log('File has no URL:', file.name);
//         failCount++;
//       }
//     }
    
//     if (successCount > 0) {
//       toast({ 
//         title: 'Download Started', 
//         description: `${successCount} file(s) downloaded successfully` 
//       });
//     }
    
//     if (failCount > 0) {
//       toast({ 
//         title: 'Warning', 
//         description: `${failCount} file(s) failed to download`,
//         variant: 'destructive'
//       });
//     }
//   };

//   const calculateTotalPages = (items: OrderItem[]): number => {
//     if (!items) return 0;
//     return items.reduce((total, item) => total + ((item.pages || 0) * (item.copies || 1)), 0);
//   };

//   const calculateTotalItemsAmount = (items: OrderItem[]): number => {
//     if (!items) return 0;
//     return items.reduce((total, item) => total + calculateItemAmount(item), 0);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const statusColors: Record<string, string> = {
//     pending: 'bg-yellow-100 text-yellow-700',
//     processing: 'bg-blue-100 text-blue-700',
//     printing: 'bg-purple-100 text-purple-700',
//     ready: 'bg-green-100 text-green-700',
//     dispatched: 'bg-indigo-100 text-indigo-700',
//     completed: 'bg-emerald-100 text-emerald-700',
//     cancelled: 'bg-red-100 text-red-700',
//   };

//   const paymentColors: Record<string, string> = {
//     paid: 'bg-green-100 text-green-700',
//     pending: 'bg-yellow-100 text-yellow-700',
//     failed: 'bg-red-100 text-red-700',
//     refunded: 'bg-gray-100 text-gray-700',
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center">
//           <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
//           <p className="text-muted-foreground">Loading order details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-muted-foreground">Order not found</p>
//         <Button onClick={() => navigate('/admin/orders')} className="mt-4">
//           Back to Orders
//         </Button>
//       </div>
//     );
//   }

//   const totalPages = calculateTotalPages(order.items);
//   const totalItemsAmount = calculateTotalItemsAmount(order.items);
//   const waybill = order.shipment?.waybill || order.fship?.waybill;

//   return (
//     <div>
//       <Button 
//         variant="ghost" 
//         onClick={() => navigate('/admin/orders')} 
//         className="mb-4"
//       >
//         <ArrowLeft className="h-4 w-4 mr-2" /> 
//         Back to Orders
//       </Button>
      
//       <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Order #{order.orderNumber}</h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             Placed on {formatDate(order.createdAt)}
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button 
//             variant="outline" 
//             onClick={fetchOrderDetails}
//             className="gap-2"
//             disabled={updating}
//           >
//             <RefreshCw className={`h-4 w-4 ${updating ? 'animate-spin' : ''}`} /> 
//             Refresh
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Customer Information */}
//         <div className="bg-card rounded-xl p-6 shadow-sm">
//           <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
//             <Package className="h-5 w-5" />
//             Customer Information
//           </h2>
//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Name</span>
//               <span className="font-medium">{order.customer?.name || 'N/A'}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Phone</span>
//               <span>{order.customer?.phone || 'N/A'}</span>
//             </div>
//             {order.customer?.address && (
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Address</span>
//                 <span className="text-right">{order.customer.address}</span>
//               </div>
//             )}
//             {order.customer?.landmark && (
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Landmark</span>
//                 <span>{order.customer.landmark}</span>
//               </div>
//             )}
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">City</span>
//               <span>{order.customer?.city || 'N/A'}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">State</span>
//               <span>{order.customer?.state || 'N/A'}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Pincode</span>
//               <span>{order.customer?.pincode || 'N/A'}</span>
//             </div>
//           </div>
//         </div>

//         {/* Order Information */}
//         <div className="bg-card rounded-xl p-6 shadow-sm">
//           <h2 className="font-semibold text-foreground mb-4">Order Information</h2>
//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Order Mode</span>
//               <span className="capitalize">{order.orderMode}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Delivery Type</span>
//               <Badge variant="outline" className="capitalize">
//                 {order.deliveryType === 'courier' ? (
//                   <span className="flex items-center gap-1">
//                     <Truck className="h-3 w-3" />
//                     Courier Delivery
//                   </span>
//                 ) : (
//                   <span className="flex items-center gap-1">
//                     <MapPin className="h-3 w-3" />
//                     Store Pickup
//                   </span>
//                 )}
//               </Badge>
//             </div>
//             {order.orderWeight && (
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Order Weight</span>
//                 <span>{order.orderWeight} kg</span>
//               </div>
//             )}
//             {order.deliveryCharge && order.deliveryCharge > 0 && (
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Delivery Charge</span>
//                 <span>₹{order.deliveryCharge.toFixed(2)}</span>
//               </div>
//             )}
//             {order.deliveryType === 'courier' && (
//               <div className="border-t border-border my-2 pt-2">
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="font-medium text-sm">Shipping Details</h3>
//                   <DownloadLabelButton 
//                     orderId={order._id}
//                     orderNumber={order.orderNumber}
//                     waybill={waybill}
//                     courierName={order.shipment?.courier || order.fship?.courier}
//                     onLabelGenerated={fetchOrderDetails}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   {waybill && (
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Waybill Number</span>
//                       <span className="font-mono text-xs">{waybill}</span>
//                     </div>
//                   )}
//                   {(order.shipment?.courier || order.fship?.courier) && (
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Courier</span>
//                       <span>{order.shipment?.courier || order.fship?.courier}</span>
//                     </div>
//                   )}
//                   {(order.shipment?.status || order.fship?.status) && (
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Shipment Status</span>
//                       <Badge variant="outline" className="capitalize">
//                         {order.shipment?.status || order.fship?.status}
//                       </Badge>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//             {order.paymentId && (
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Payment ID</span>
//                 <span className="font-mono text-xs">{order.paymentId}</span>
//               </div>
//             )}
//             {order.razorpayOrderId && (
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Razorpay Order ID</span>
//                 <span className="font-mono text-xs">{order.razorpayOrderId}</span>
//               </div>
//             )}

//             <Button
//               onClick={viewShippingDetails}
//               variant="outline"
//               size="sm"
//               className="gap-2 w-full"
//             >
//               <Truck className="h-4 w-4" />
//               View Shipping Details
//             </Button>
//           </div>
//         </div>

//         {/* Print Details */}
//         <div className="bg-card rounded-xl p-6 shadow-sm">
//           <h2 className="font-semibold text-foreground mb-4">Print Details</h2>
//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Total Pages</span>
//               <span>{totalPages.toLocaleString()}</span>
//             </div>
//             {/* <div className="flex justify-between">
//               <span className="text-muted-foreground">Total Items Amount</span>
//               <span className="font-semibold text-primary">₹{totalItemsAmount.toFixed(2)}</span>
//             </div> */}
            
//             {order.items && order.items.length > 0 ? (
//               <>
//                 {order.items.map((item, index) => {
//                   const itemAmount = calculateItemAmount(item);
//                   return (
//                     <div key={index} className={index > 0 ? "border-t border-border pt-3 mt-2" : ""}>
//                       {order.items.length > 1 && (
//                         <h3 className="font-medium text-sm mb-2 text-muted-foreground">Item {index + 1}</h3>
//                       )}
//                       <div className="space-y-2">
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">Copies</span>
//                           <span>{item.copies || 1}</span>
//                         </div>
//                         {/* <div className="flex justify-between">
//                           <span className="text-muted-foreground">Item Amount</span>
//                           <span className="font-semibold text-primary">₹{itemAmount.toFixed(2)}</span>
//                         </div> */}
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">Print Type</span>
//                           <span>{item.printColor === 'color' ? 'Color' : 'B&W'}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">Paper Size</span>
//                           <span>{item.paperSize || 'A4'}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">Paper Type</span>
//                           <span>{item.paperType || '70gsm_normal'}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">Print Side</span>
//                           <span className="capitalize">{item.printSide || 'double'}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">Binding Type</span>
//                           <span>{item.bindingType || 'none'}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">Lamination</span>
//                           <span>{item.lamination || 'none'}</span>
//                         </div>
//                         {item.instructions && (
//                           <div className="flex justify-between">
//                             <span className="text-muted-foreground">Instructions</span>
//                             <span className="text-right">{item.instructions}</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </>
//             ) : (
//               <div className="text-center py-4 text-muted-foreground">
//                 No print details available
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Cost Breakdown with Payment Status */}
//         <div className="bg-navy rounded-xl p-6 shadow-sm text-secondary-foreground">
//           <h2 className="font-semibold mb-4">Payment & Cost</h2>
//           <div className="space-y-3 text-sm">
//             <div className="flex justify-between">
//               <span className="text-secondary-foreground/70">Items Total</span>
//               <span className="font-semibold">₹{order.
// finalAmount.toFixed(2)}</span>
//             </div>
//             {order.deliveryCharge && order.deliveryCharge > 0 && (
//               <div className="flex justify-between">
//                 <span className="text-secondary-foreground/70">Delivery Charge</span>
//                 <span>₹{order.deliveryCharge.toFixed(2)}</span>
//               </div>
//             )}
//             {order.discountAmount && order.discountAmount > 0 && (
//               <div className="flex justify-between">
//                 <span className="text-secondary-foreground/70">Discount</span>
//                 <span className="text-green-400">-₹{order.discountAmount.toFixed(2)}</span>
//               </div>
//             )}
//             <div className="flex justify-between pt-2 border-t border-navy-light">
//               <span className="text-secondary-foreground/70">Total Amount</span>
//               <span className="font-bold text-primary text-xl">
//                 ₹{order.
// finalAmount?.toLocaleString('en-IN') || 0}
//               </span>
//             </div>
//             <div className="flex justify-between items-center pt-2">
//               <span className="text-secondary-foreground/70 flex items-center gap-1">
//                 <CreditCard className="h-3 w-3" /> Payment Status
//               </span>
//               <Badge variant="outline" className={paymentColors[order.paymentStatus]}>
//                 {order.paymentStatus === 'paid' ? '✓ Paid' : 
//                  order.paymentStatus === 'pending' ? '⏳ Pending' :
//                  order.paymentStatus === 'failed' ? '❌ Failed' : '↺ Refunded'}
//               </Badge>
//             </div>
//             {order.paymentId && (
//               <div className="flex justify-between">
//                 <span className="text-secondary-foreground/70">Transaction ID</span>
//                 <span className="font-mono text-xs">{order.paymentId}</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Status Updates - Order Status Only */}
//         <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
//           <h2 className="font-semibold text-foreground mb-2">Update Order Status</h2>
          
//           <div>
//             <label className="text-sm text-muted-foreground mb-1.5 block">Order Progress</label>
//             <Select 
//               value={order.status} 
//               onValueChange={updateOrderStatus}
//               disabled={updating}
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="pending">📋 Pending</SelectItem>
//                 <SelectItem value="processing">⚙️ Processing</SelectItem>
//                 <SelectItem value="printing">🖨️ Printing</SelectItem>
//                 <SelectItem value="ready">✅ Ready</SelectItem>
//                 <SelectItem value="dispatched">🚚 Dispatched</SelectItem>
//                 <SelectItem value="completed">🎉 Completed</SelectItem>
//                 <SelectItem value="cancelled">❌ Cancelled</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
          
//           <div className="flex gap-2 pt-2 flex-wrap">
//             <Badge variant="outline" className={statusColors[order.status]}>
//               {getStatusLabel(order.status)}
//             </Badge>
//             {order.shipmentCreated && (
//               <Badge variant="outline" className="bg-blue-100 text-blue-700">
//                 🚚 Shipment Created
//               </Badge>
//             )}
//           </div>
//         </div>

//         {/* Files Section */}
//         {order.items.some(item => item.files && item.files.length > 0) && (
//           <div className="bg-card rounded-xl p-6 shadow-sm lg:col-span-2">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-semibold text-foreground">Attached Files</h2>
//               <Button 
//                 variant="outline" 
//                 onClick={handleDownloadFiles}
//                 size="sm"
//                 className="gap-2"
//               >
//                 <Download className="h-4 w-4" />
//                 Download All
//               </Button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {order.items.map((item, itemIndex) => (
//                 item.files && item.files.map((file, fileIndex) => (
//                   <div key={`${itemIndex}-${fileIndex}`} className="flex items-center justify-between p-3 border border-border rounded-lg">
//                     <div className="flex items-center gap-3">
//                       <FileText className="h-4 w-4 text-muted-foreground" />
//                       <div>
//                         <p className="text-sm font-medium">{file.name}</p>
//                         <p className="text-xs text-muted-foreground">
//                           {(file.size / 1024).toFixed(2)} KB
//                         </p>
//                       </div>
//                     </div>
//                     {file.url ? (
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => window.open(file.url, '_blank')}
//                       >
//                         <Download className="h-4 w-4" />
//                       </Button>
//                     ) : (
//                       <span className="text-xs text-muted-foreground">No URL</span>
//                     )}
//                   </div>
//                 ))
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminOrderDetail;





import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Loader2, RefreshCw, Truck, MapPin, Package, CreditCard, Printer, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/api/axios';

// Types matching your Order schema
interface File {
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'done' | 'error';
  url: string;
}

interface OrderItem {
  pages: number;
  copies: number;
  paperSize?: string;
  paperType?: string;
  printColor?: 'bw' | 'color';
  printSide?: 'single' | 'double';
  bindingType?: string;
  lamination?: string;
  instructions?: string;
  files: File[];
  amount?: number;
  unitPrice?: number;
}

interface Customer {
  name: string;
  phone: string;
  address?: string;
  pincode?: string;
  city?: string;
  state?: string;
  landmark?: string;
}

interface Order {
  _id: string;
  userId: string;
  orderNumber: string;
  items: OrderItem[];
  orderMode: 'single' | 'bulk';
  deliveryType: 'pickup' | 'courier';
  customer: Customer;
  totalAmount: number;
  finalAmount?: number;
  discountAmount?: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string | null;
  razorpayOrderId?: string;
  status: 'pending' | 'processing' | 'printing' | 'ready' | 'dispatched' | 'completed' | 'cancelled';
  cartId?: string;
  orderWeight?: number;
  deliveryCharge?: number;
  createdAt: string;
  updatedAt: string;
}

// ✅ Fixed delivery charge calculation based on weight
const getDeliveryChargeBreakdown = (weightKg: number): string => {
  if (weightKg < 0.5) return "Under 500g";
  if (weightKg >= 0.5 && weightKg < 1) return "500g - 1kg";
  if (weightKg >= 1 && weightKg < 3) return "1kg - 3kg";
  if (weightKg >= 3 && weightKg < 5) return "3kg - 5kg";
  if (weightKg >= 5 && weightKg < 10) return "5kg - 10kg";
  if (weightKg >= 10 && weightKg < 15) return "10kg - 15kg";
  if (weightKg >= 15 && weightKg < 20) return "15kg - 20kg";
  if (weightKg >= 20 && weightKg < 40) return "20kg - 40kg";
  if (weightKg >= 40 && weightKg < 80) return "40kg - 80kg";
  if (weightKg >= 80) return "Above 80kg (₹10/kg)";
  return "Standard delivery";
};

// Helper function to calculate item amount if not present
const calculateItemAmount = (item: OrderItem): number => {
  if (item.amount && item.amount > 0) {
    return item.amount;
  }
  
  // Calculate if amount is not present
  const totalPages = (item.pages || 0) * (item.copies || 1);
  let amount = 0;
  
  if (item.printColor === 'color') {
    amount = totalPages * 3;  // ₹3 per color page
  } else {
    amount = totalPages * 1;  // ₹1 per B&W page
  }
  
  // Add binding cost
  if (item.bindingType === 'perfect_glue') amount += 50 * (item.copies || 1);
  else if (item.bindingType === 'spiral') amount += 30 * (item.copies || 1);
  else if (item.bindingType === 'hardcover') amount += 150 * (item.copies || 1);
  
  // Add GST 5%
  const gst = amount * 0.05;
  amount = amount + gst;
  
  return amount;
};

const formatWeight = (kg: number): string => {
  return kg >= 1 ? `${kg.toFixed(2)} kg` : `${(kg * 1000).toFixed(0)} g`;
};

const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Auto-refresh for pending payments
  useEffect(() => {
    const interval = setInterval(() => {
      if (order?.paymentStatus === 'pending') {
        fetchOrderDetails();
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [order?.paymentStatus]);

  useEffect(() => {
    if (id) {
      console.log('Fetching order with ID:', id);
      fetchOrderDetails();
    }
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: 'Error',
          description: 'Authentication required',
          variant: 'destructive',
        });
        navigate('/admin/login');
        return;
      }
      
      const encodedId = encodeURIComponent(id || '');
      const response = await axiosInstance.get(`/order/${encodedId}`);
      
      if (response.data && response.data.success) {
        setOrder(response.data.order);
      } else {
        toast({
          title: 'Error',
          description: response.data?.message || 'Order not found',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Error fetching order:', error);
      
      if (error.response?.status === 404) {
        toast({
          title: 'Not Found',
          description: `Order not found`,
          variant: 'destructive',
        });
      } else if (error.response?.status === 401) {
        toast({
          title: 'Unauthorized',
          description: 'Please login again',
          variant: 'destructive',
        });
        navigate('/admin/login');
      } else {
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'Failed to fetch order details',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (newStatus: string) => {
    if (!order) return;
    
    console.log('Updating order status:', {
      orderId: order._id,
      currentStatus: order.status,
      newStatus: newStatus
    });
    
    try {
      setUpdating(true);
      
      const response = await axiosInstance.put(`/order/${order._id}/status`, {
        status: newStatus
      });
      
      if (response.data && response.data.success) {
        setOrder({ ...order, status: newStatus as Order['status'] });
        toast({
          title: 'Success',
          description: response.data.message || `Order status updated to ${getStatusLabel(newStatus)}`,
        });
        
        fetchOrderDetails();
      } else {
        throw new Error(response.data?.message || 'Failed to update status');
      }
    } catch (error: any) {
      console.error('Error updating status:', error);
      
      toast({
        title: 'Error',
        description: error.response?.data?.message || error.message || 'Failed to update status',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      pending: '📋 Pending',
      processing: '⚙️ Processing',
      printing: '🖨️ Printing',
      ready: '✅ Ready',
      dispatched: '🚚 Dispatched',
      completed: '🎉 Completed',
      cancelled: '❌ Cancelled'
    };
    return labels[status] || status;
  };

  // const handleDownloadFiles = async () => {
  //   if (!order || !order.items) {
  //     toast({ 
  //       title: 'No Files', 
  //       description: 'No files attached to this order',
  //       variant: 'destructive'
  //     });
  //     return;
  //   }
    
  //   const files = order.items.flatMap(item => item.files || []);
    
  //   if (files.length === 0) {
  //     toast({ 
  //       title: 'No Files', 
  //       description: 'No files attached to this order',
  //       variant: 'destructive'
  //     });
  //     return;
  //   }
    
  //   let successCount = 0;
  //   let failCount = 0;
    
  //   for (const file of files) {
  //     if (file.url && file.url.trim() !== '') {
  //       try {
  //         const response = await fetch(file.url, {
  //           headers: {
  //             'Authorization': `Bearer ${localStorage.getItem('token')}`
  //           }
  //         });
          
  //         if (response.ok) {
  //           const blob = await response.blob();
  //           const downloadUrl = URL.createObjectURL(blob);
  //           const link = document.createElement('a');
  //           link.href = downloadUrl;
  //           link.download = file.name;
  //           document.body.appendChild(link);
  //           link.click();
  //           link.remove();
  //           URL.revokeObjectURL(downloadUrl);
  //           successCount++;
  //         } else {
  //           console.error('Failed to fetch file:', response.status);
  //           failCount++;
  //         }
  //       } catch (error) {
  //         console.error('Error downloading file:', file.name, error);
  //         failCount++;
  //       }
  //     } else {
  //       console.log('File has no URL:', file.name);
  //       failCount++;
  //     }
  //   }
    
  //   if (successCount > 0) {
  //     toast({ 
  //       title: 'Download Started', 
  //       description: `${successCount} file(s) downloaded successfully` 
  //     });
  //   }
    
  //   if (failCount > 0) {
  //     toast({ 
  //       title: 'Warning', 
  //       description: `${failCount} file(s) failed to download`,
  //       variant: 'destructive'
  //     });
  //   }
  // };

  const handleDownloadFiles = async () => {
  if (!order || !order.items) {
    toast({ 
      title: 'No Files', 
      description: 'No files attached to this order',
      variant: 'destructive'
    });
    return;
  }
  
  const files = order.items.flatMap(item => item.files || []);
  
  if (files.length === 0) {
    toast({ 
      title: 'No Files', 
      description: 'No files attached to this order',
      variant: 'destructive'
    });
    return;
  }
  
  let successCount = 0;
  let failCount = 0;
  
  for (const file of files) {
    if (file.url && file.url.trim() !== '') {
      try {
        // ✅ Convert HTTP to HTTPS to fix mixed content
        let fileUrl = file.url;
        if (fileUrl.startsWith('http://')) {
          fileUrl = fileUrl.replace('http://', 'https://');
        }
        
        // No Authorization header needed for direct file access
        const response = await fetch(fileUrl);
        
        if (response.ok) {
          const blob = await response.blob();
          const downloadUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = file.name;
          document.body.appendChild(link);
          link.click();
          link.remove();
          URL.revokeObjectURL(downloadUrl);
          successCount++;
        } else {
          console.error(`Failed to fetch ${file.name}: ${response.status}`);
          failCount++;
        }
      } catch (error) {
        console.error(`Error downloading ${file.name}:`, error);
        failCount++;
      }
    } else {
      console.log(`File has no URL: ${file.name}`);
      failCount++;
    }
  }
  
  if (successCount > 0) {
    toast({ 
      title: 'Download Started', 
      description: `${successCount} file(s) downloaded successfully` 
    });
  }
  
  if (failCount > 0) {
    toast({ 
      title: 'Warning', 
      description: `${failCount} file(s) failed to download`,
      variant: 'destructive'
    });
  }
};

  const calculateTotalPages = (items: OrderItem[]): number => {
    if (!items) return 0;
    return items.reduce((total, item) => total + ((item.pages || 0) * (item.copies || 1)), 0);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    printing: 'bg-purple-100 text-purple-700',
    ready: 'bg-green-100 text-green-700',
    dispatched: 'bg-indigo-100 text-indigo-700',
    completed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  const paymentColors: Record<string, string> = {
    paid: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700',
    refunded: 'bg-gray-100 text-gray-700',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Order not found</p>
        <Button onClick={() => navigate('/admin/orders')} className="mt-4">
          Back to Orders
        </Button>
      </div>
    );
  }

  const totalPages = calculateTotalPages(order.items);

  return (
    <div>
      <Button 
        variant="ghost" 
        onClick={() => navigate('/admin/orders')} 
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> 
        Back to Orders
      </Button>
      
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Order #{order.orderNumber}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={fetchOrderDetails}
            className="gap-2"
            disabled={updating}
          >
            <RefreshCw className={`h-4 w-4 ${updating ? 'animate-spin' : ''}`} /> 
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Information */}
        <div className="bg-card rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Customer Information
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{order.customer?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span>{order.customer?.phone || 'N/A'}</span>
            </div>
            {order.customer?.address && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Address</span>
                <span className="text-right">{order.customer.address}</span>
              </div>
            )}
            {order.customer?.landmark && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Landmark</span>
                <span>{order.customer.landmark}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">City</span>
              <span>{order.customer?.city || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">State</span>
              <span>{order.customer?.state || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pincode</span>
              <span>{order.customer?.pincode || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Order Information */}
        <div className="bg-card rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-foreground mb-4">Order Information</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Mode</span>
              <span className="capitalize">{order.orderMode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Type</span>
              <Badge variant="outline" className="capitalize">
                {order.deliveryType === 'courier' ? (
                  <span className="flex items-center gap-1">
                    <Truck className="h-3 w-3" />
                    Courier Delivery
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Store Pickup
                  </span>
                )}
              </Badge>
            </div>
            {order.orderWeight && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Weight</span>
                <span>{formatWeight(order.orderWeight)}</span>
              </div>
            )}
            {order.deliveryCharge && order.deliveryCharge > 0 && order.deliveryType === 'courier' && (
              <>
                {/* <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight Slab</span>
                  <span>{getDeliveryChargeBreakdown(order.orderWeight || 0)}</span>
                </div> */}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Charge</span>
                  <span className="font-semibold text-primary">₹{order.deliveryCharge.toFixed(2)}</span>
                </div>
              </>
            )}
            {order.paymentId && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment ID</span>
                <span className="font-mono text-xs">{order.paymentId}</span>
              </div>
            )}
            {order.razorpayOrderId && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Razorpay Order ID</span>
                <span className="font-mono text-xs">{order.razorpayOrderId}</span>
              </div>
            )}
          </div>
        </div>

        {/* Print Details */}
        <div className="bg-card rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-foreground mb-4">Print Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Pages</span>
              <span>{totalPages.toLocaleString()}</span>
            </div>
            
            {order.items && order.items.length > 0 ? (
              <>
                {order.items.map((item, index) => {
                  const itemAmount = calculateItemAmount(item);
                  return (
                    <div key={index} className={index > 0 ? "border-t border-border pt-3 mt-2" : ""}>
                      {order.items.length > 1 && (
                        <h3 className="font-medium text-sm mb-2 text-muted-foreground">Item {index + 1}</h3>
                      )}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Copies</span>
                          <span>{item.copies || 1}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Print Type</span>
                          <span>{item.printColor === 'color' ? 'Color' : 'B&W'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Paper Size</span>
                          <span>{item.paperSize || 'A4'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Paper Type</span>
                          <span>{item.paperType || '70gsm_normal'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Print Side</span>
                          <span className="capitalize">{item.printSide || 'double'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Binding Type</span>
                          <span>{item.bindingType || 'none'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Lamination</span>
                          <span>{item.lamination || 'none'}</span>
                        </div>
                        {item.instructions && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Instructions</span>
                            <span className="text-right">{item.instructions}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No print details available
              </div>
            )}
          </div>
        </div>

        {/* Cost Breakdown with Payment Status */}
        <div className="bg-navy rounded-xl p-6 shadow-sm text-secondary-foreground">
          <h2 className="font-semibold mb-4">Payment & Cost</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary-foreground/70">Items Total</span>
              <span className="font-semibold">₹{order.totalAmount?.toFixed(2) || '0.00'}</span>
            </div>
            {order.deliveryCharge && order.deliveryCharge > 0 && order.deliveryType === 'courier' && (
              <div className="flex justify-between">
                <span className="text-secondary-foreground/70">Delivery Charge</span>
                <span>₹{order.deliveryCharge.toFixed(2)}</span>
              </div>
            )}
            {order.discountAmount && order.discountAmount > 0 && (
              <div className="flex justify-between">
                <span className="text-secondary-foreground/70">Discount</span>
                <span className="text-green-400">-₹{order.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-navy-light">
              <span className="text-secondary-foreground/70">Total Amount</span>
              <span className="font-bold text-primary text-xl">
                ₹{((order.totalAmount ||  0) - (order.discountAmount || 0)).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-secondary-foreground/70 flex items-center gap-1">
                <CreditCard className="h-3 w-3" /> Payment Status
              </span>
              <Badge variant="outline" className={paymentColors[order.paymentStatus]}>
                {order.paymentStatus === 'paid' ? '✓ Paid' : 
                 order.paymentStatus === 'pending' ? '⏳ Pending' :
                 order.paymentStatus === 'failed' ? '❌ Failed' : '↺ Refunded'}
              </Badge>
            </div>
            {order.paymentId && (
              <div className="flex justify-between">
                <span className="text-secondary-foreground/70">Transaction ID</span>
                <span className="font-mono text-xs">{order.paymentId}</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Updates - Order Status Only */}
        <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-foreground mb-2">Update Order Status</h2>
          
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Order Progress</label>
            <Select 
              value={order.status} 
              onValueChange={updateOrderStatus}
              disabled={updating}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">📋 Pending</SelectItem>
                <SelectItem value="processing">⚙️ Processing</SelectItem>
                <SelectItem value="printing">🖨️ Printing</SelectItem>
                <SelectItem value="ready">✅ Ready</SelectItem>
                <SelectItem value="dispatched">🚚 Dispatched</SelectItem>
                <SelectItem value="completed">🎉 Completed</SelectItem>
                <SelectItem value="cancelled">❌ Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2 pt-2 flex-wrap">
            <Badge variant="outline" className={statusColors[order.status]}>
              {getStatusLabel(order.status)}
            </Badge>
          </div>
        </div>

        {/* Files Section */}
        {order.items.some(item => item.files && item.files.length > 0) && (
          <div className="bg-card rounded-xl p-6 shadow-sm lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-foreground">Attached Files</h2>
              <Button 
                variant="outline" 
                onClick={handleDownloadFiles}
                size="sm"
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {order.items.map((item, itemIndex) => (
                item.files && item.files.map((file, fileIndex) => (
                  <div key={`${itemIndex}-${fileIndex}`} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    {file.url ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(file.url, '_blank')}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">No URL</span>
                    )}
                  </div>
                ))
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderDetail;

// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Search, FileSpreadsheet, Loader2, RefreshCw, Download, Printer, Truck } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { useToast } from '@/hooks/use-toast';
// import * as XLSX from 'xlsx';
// import axiosInstance from '@/api/axios';

// // Updated Types
// interface Order {
//   _id: string;
//   orderNumber: string;
//   customer: {
//     name: string;
//     phone: string;
//     address?: string;
//   };
//   items: Array<{
//     pages: number;
//     copies: number;
//     printColor?: 'bw' | 'color';
//   }>;
//   totalAmount: number;
//   finalAmount?: number;
//   paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
//   paymentMode?: string;
//   status: 'pending' | 'processing' | 'printing' | 'ready' | 'dispatched' | 'completed' | 'cancelled';
//   deliveryType: 'pickup' | 'courier';
//   shipment?: {
//     waybill?: string;
//     courier?: string;
//     labelUrl?: string;
//   };
//   fship?: {
//     waybill?: string;
//     courier?: string;
//     labelUrl?: string;
//   };
//   createdAt: string;
// }

// const AdminOrders = () => {
//   const { toast } = useToast();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [paymentFilter, setPaymentFilter] = useState('all');
//   const [deliveryFilter, setDeliveryFilter] = useState('all');
//   const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
//   const [downloadingBatch, setDownloadingBatch] = useState(false);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // ✅ Auto-refresh every 10 seconds to update payment status
//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchOrders();
//     }, 10000);
    
//     return () => clearInterval(interval);
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('Authentication required');
//         setLoading(false);
//         return;
//       }
      
//       const response = await axiosInstance.get('/order/admin/all');
      
//       if (response.data && response.data.success) {
//         // ✅ Transform orders to handle both shipment and fship data
//         const transformedOrders = response.data.orders.map((order: any) => ({
//           ...order,
//           // Ensure shipment data is available from either location
//           shipment: order.shipment || {
//             waybill: order.fship?.waybill,
//             courier: order.fship?.courier,
//             labelUrl: order.fship?.labelUrl
//           },
//           // Ensure payment status is correct
//           paymentStatus: order.paymentStatus || 'pending'
//         }));
        
//         setOrders(transformedOrders);
        
//         const paidCount = transformedOrders.filter((o: Order) => o.paymentStatus === 'paid').length;
//         toast({
//           title: 'Success',
//           description: `${transformedOrders.length} orders loaded (${paidCount} paid)`,
//         });
//       } else {
//         setError('Invalid response from server');
//       }
//     } catch (error: any) {
//       console.error('Error fetching orders:', error);
//       let errorMessage = 'Failed to fetch orders';
//       if (error.response?.status === 401) {
//         errorMessage = 'Unauthorized. Please login again.';
//       }
//       setError(errorMessage);
//       toast({
//         title: 'Error',
//         description: errorMessage,
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadSingleLabel = async (order: Order) => {
//     // ✅ Check both shipment and fship for waybill
//     const waybill = order.shipment?.waybill || order.fship?.waybill;
    
//     if (order.deliveryType !== 'courier' || !waybill) {
//       toast({ 
//         title: 'No Label Available', 
//         description: 'This order does not have a shipping label.',
//         variant: 'destructive'
//       });
//       return;
//     }
    
//     try {
//       const response = await axiosInstance.get(`/order/${order._id}/label`, {
//         responseType: 'blob'
//       });
      
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `shipping-label-${order.orderNumber}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
      
//       toast({ 
//         title: 'Success', 
//         description: `Label downloaded for ${order.orderNumber}` 
//       });
//     } catch (error: any) {
//       console.error('Download failed:', error);
//       toast({ 
//         title: 'Error', 
//         description: error.response?.data?.message || 'Failed to download label',
//         variant: 'destructive'
//       });
//     }
//   };

//   const downloadBatchLabels = async () => {
//     if (selectedOrders.length === 0) {
//       toast({ 
//         title: 'No Orders Selected', 
//         description: 'Please select orders to download labels',
//         variant: 'destructive'
//       });
//       return;
//     }
    
//     // Filter only courier orders with waybill (check both locations)
//     const courierOrders = orders.filter(o => 
//       selectedOrders.includes(o._id) && 
//       o.deliveryType === 'courier' && 
//       (o.shipment?.waybill || o.fship?.waybill)
//     );
    
//     if (courierOrders.length === 0) {
//       toast({ 
//         title: 'No Labels Available', 
//         description: 'Selected orders do not have shipping labels.',
//         variant: 'destructive'
//       });
//       return;
//     }
    
//     setDownloadingBatch(true);
//     let successCount = 0;
    
//     for (const order of courierOrders) {
//       try {
//         const response = await axiosInstance.get(`/order/${order._id}/label`, {
//           responseType: 'blob'
//         });
        
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', `shipping-label-${order.orderNumber}.pdf`);
//         document.body.appendChild(link);
//         link.click();
//         link.remove();
//         window.URL.revokeObjectURL(url);
//         successCount++;
        
//         await new Promise(resolve => setTimeout(resolve, 500));
//       } catch (error) {
//         console.error(`Failed to download label for order ${order.orderNumber}:`, error);
//       }
//     }
    
//     toast({ 
//       title: 'Download Complete', 
//       description: `Downloaded ${successCount} of ${courierOrders.length} labels` 
//     });
//     setDownloadingBatch(false);
//   };

//   const updateOrderStatus = async (orderId: string, newStatus: string) => {
//     try {
//       const response = await axiosInstance.put(`/order/${orderId}/status`, {
//         status: newStatus
//       });
      
//       if (response.data.success) {
//         setOrders(prevOrders => 
//           prevOrders.map(order => 
//             order._id === orderId ? { ...order, status: newStatus as Order['status'] } : order
//           )
//         );
//         toast({
//           title: 'Success',
//           description: `Order status updated to ${getStatusLabel(newStatus)}`,
//         });
//       }
//     } catch (error: any) {
//       console.error('Error updating status:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Failed to update status',
//         variant: 'destructive',
//       });
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

//   const getStatusDisplay = (status: string): string => {
//     const displays: Record<string, string> = {
//       pending: '📋 Pending',
//       processing: '⚙️ Processing',
//       printing: '🖨️ Printing',
//       ready: '✅ Ready',
//       dispatched: '🚚 Dispatched',
//       completed: '🎉 Completed',
//       cancelled: '❌ Cancelled'
//     };
//     return displays[status] || status;
//   };

//   const filteredOrders = orders.filter(order => {
//     if (search && !order.orderNumber?.toLowerCase().includes(search.toLowerCase()) && 
//         !order.customer?.name?.toLowerCase().includes(search.toLowerCase())) {
//       return false;
//     }
//     if (statusFilter !== 'all' && order.status !== statusFilter) return false;
//     if (paymentFilter !== 'all' && order.paymentStatus !== paymentFilter) return false;
//     if (deliveryFilter !== 'all' && order.deliveryType !== deliveryFilter) return false;
//     return true;
//   });

//   const calculateTotalPages = (items: any[]) => {
//     if (!items || !items.length) return 0;
//     return items.reduce((total, item) => total + ((item.pages || 0) * (item.copies || 1)), 0);
//   };

//   const getPrintType = (items: any[]) => {
//     if (!items || items.length === 0) return 'N/A';
//     return items[0].printColor === 'color' ? 'Color' : 'B&W';
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return 'N/A';
//     try {
//       return new Date(dateString).toLocaleDateString('en-IN', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric'
//       });
//     } catch {
//       return 'Invalid date';
//     }
//   };

//   const handleExportExcel = () => {
//     const exportData = filteredOrders.map(order => ({
//       'Order ID': order.orderNumber,
//       'Customer Name': order.customer?.name || 'N/A',
//       'Phone': order.customer?.phone || 'N/A',
//       'Total Pages': calculateTotalPages(order.items),
//       'Print Type': getPrintType(order.items),
//       'Delivery Type': order.deliveryType === 'courier' ? 'Courier' : 'Pickup',
//       'Waybill': order.shipment?.waybill || order.fship?.waybill || 'N/A',
//       'Courier': order.shipment?.courier || order.fship?.courier || 'N/A',
//       'Amount': order.totalAmount,
//       'Payment Status': order.paymentStatus,
//       'Order Status': getStatusLabel(order.status),
//       'Date': formatDate(order.createdAt)
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
//     XLSX.writeFile(workbook, `orders_${new Date().toISOString().split('T')[0]}.xlsx`);
    
//     toast({ title: 'Success', description: `${filteredOrders.length} orders exported` });
//   };

//   const handleSelectAll = (checked: boolean) => {
//     if (checked) {
//       setSelectedOrders(filteredOrders.map(o => o._id));
//     } else {
//       setSelectedOrders([]);
//     }
//   };

//   const handleSelectOrder = (orderId: string, checked: boolean) => {
//     if (checked) {
//       setSelectedOrders([...selectedOrders, orderId]);
//     } else {
//       setSelectedOrders(selectedOrders.filter(id => id !== orderId));
//     }
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
//           <p className="text-muted-foreground">Loading orders...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center max-w-md">
//           <div className="bg-red-50 border border-red-200 rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Orders</h3>
//             <p className="text-red-600 mb-4">{error}</p>
//             <Button onClick={fetchOrders} variant="outline">
//               <RefreshCw className="h-4 w-4 mr-2" />
//               Try Again
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//         <h1 className="text-2xl font-bold">Orders Management</h1>
//         <div className="flex gap-2 flex-wrap">
//           {selectedOrders.length > 0 && (
//             <Button onClick={downloadBatchLabels} disabled={downloadingBatch} variant="outline" size="sm">
//               {downloadingBatch ? (
//                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//               ) : (
//                 <Download className="h-4 w-4 mr-2" />
//               )}
//               Download Labels ({selectedOrders.length})
//             </Button>
//           )}
//           <Button onClick={fetchOrders} variant="outline" size="sm">
//             <RefreshCw className="h-4 w-4 mr-2" />
//             Refresh
//           </Button>
//           <Button onClick={handleExportExcel} variant="outline" disabled={filteredOrders.length === 0} size="sm">
//             <FileSpreadsheet className="h-4 w-4 mr-2" />
//             Export Excel
//           </Button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-3 mb-6">
//         <div className="relative flex-1 min-w-[200px]">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input 
//             placeholder="Search by ID or name..." 
//             value={search} 
//             onChange={e => setSearch(e.target.value)} 
//             className="pl-10" 
//           />
//         </div>
        
//         <Select value={statusFilter} onValueChange={setStatusFilter}>
//           <SelectTrigger className="w-[160px]">
//             <SelectValue placeholder="Status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Status</SelectItem>
//             <SelectItem value="pending">📋 Pending</SelectItem>
//             <SelectItem value="processing">⚙️ Processing</SelectItem>
//             <SelectItem value="printing">🖨️ Printing</SelectItem>
//             <SelectItem value="ready">✅ Ready</SelectItem>
//             <SelectItem value="dispatched">🚚 Dispatched</SelectItem>
//             <SelectItem value="completed">🎉 Completed</SelectItem>
//             <SelectItem value="cancelled">❌ Cancelled</SelectItem>
//           </SelectContent>
//         </Select>
        
//         <Select value={paymentFilter} onValueChange={setPaymentFilter}>
//           <SelectTrigger className="w-[140px]">
//             <SelectValue placeholder="Payment" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Payment</SelectItem>
//             <SelectItem value="paid">Paid</SelectItem>
//             <SelectItem value="pending">Pending</SelectItem>
//             <SelectItem value="failed">Failed</SelectItem>
//           </SelectContent>
//         </Select>
        
//         <Select value={deliveryFilter} onValueChange={setDeliveryFilter}>
//           <SelectTrigger className="w-[140px]">
//             <SelectValue placeholder="Delivery" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All</SelectItem>
//             <SelectItem value="pickup">Pickup</SelectItem>
//             <SelectItem value="courier">Courier</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
//         <div className="bg-card rounded-lg p-3 shadow-sm">
//           <p className="text-xs text-muted-foreground">Total Orders</p>
//           <p className="text-xl font-bold">{filteredOrders.length}</p>
//         </div>
//         <div className="bg-card rounded-lg p-3 shadow-sm">
//           <p className="text-xs text-muted-foreground">Total Revenue</p>
//           <p className="text-xl font-bold">
//             ₹{filteredOrders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + (o.totalAmount || 0), 0).toLocaleString()}
//           </p>
//         </div>
//         <div className="bg-card rounded-lg p-3 shadow-sm">
//           <p className="text-xs text-muted-foreground">Pending</p>
//           <p className="text-xl font-bold text-yellow-600">{filteredOrders.filter(o => o.status === 'pending').length}</p>
//         </div>
//         <div className="bg-card rounded-lg p-3 shadow-sm">
//           <p className="text-xs text-muted-foreground">In Progress</p>
//           <p className="text-xl font-bold text-blue-600">{filteredOrders.filter(o => o.status === 'processing' || o.status === 'printing').length}</p>
//         </div>
//         <div className="bg-card rounded-lg p-3 shadow-sm">
//           <p className="text-xs text-muted-foreground">Completed</p>
//           <p className="text-xl font-bold text-green-600">{filteredOrders.filter(o => o.status === 'completed').length}</p>
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-card rounded-xl shadow-sm overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-10">
//                 <input 
//                   type="checkbox" 
//                   onChange={(e) => handleSelectAll(e.target.checked)}
//                   checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
//                   className="rounded border-gray-300"
//                 />
//               </TableHead>
//               <TableHead>Order ID</TableHead>
//               <TableHead>Customer</TableHead>
//               <TableHead>Delivery</TableHead>
//               <TableHead>Waybill</TableHead>
//               <TableHead>Amount</TableHead>
//               <TableHead>Payment</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Actions</TableHead>
//               <TableHead>Date</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredOrders.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
//                   No orders found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredOrders.map(order => {
//                 // ✅ Get waybill from either shipment or fship
//                 const waybill = order.shipment?.waybill || order.fship?.waybill;
                
//                 return (
//                   <TableRow key={order._id}>
//                     <TableCell>
//                       <input 
//                         type="checkbox"
//                         checked={selectedOrders.includes(order._id)}
//                         onChange={(e) => handleSelectOrder(order._id, e.target.checked)}
//                         className="rounded border-gray-300"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Link to={`/admin/orders/${order._id}`} className="text-primary font-medium hover:underline">
//                         {order.orderNumber}
//                       </Link>
//                     </TableCell>
//                     <TableCell>
//                       <div>
//                         <div className="font-medium">{order.customer?.name || 'N/A'}</div>
//                         <div className="text-xs text-muted-foreground">{order.customer?.phone || 'N/A'}</div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant="outline" className={order.deliveryType === 'courier' ? 'bg-indigo-100' : 'bg-purple-100'}>
//                         {order.deliveryType === 'courier' ? (
//                           <span className="flex items-center gap-1">
//                             <Truck className="h-3 w-3" />
//                             Courier
//                           </span>
//                         ) : 'Pickup'}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       {waybill ? (
//                         <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
//                           {waybill.slice(-8)}
//                         </span>
//                       ) : (
//                         <span className="text-xs text-muted-foreground">—</span>
//                       )}
//                     </TableCell>
//                     <TableCell className="font-semibold">₹{order.totalAmount?.toLocaleString() || 0}</TableCell>
//                     <TableCell>
//                       <Badge variant="outline" className={paymentColors[order.paymentStatus]}>
//                         {order.paymentStatus === 'paid' ? '✓ Paid' : 
//                          order.paymentStatus === 'pending' ? '⏳ Pending' :
//                          order.paymentStatus === 'failed' ? '❌ Failed' : '↺ Refunded'}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Select 
//                         value={order.status} 
//                         onValueChange={(value) => updateOrderStatus(order._id, value)}
//                       >
//                         <SelectTrigger className="w-[150px]">
//                           <SelectValue>
//                             {getStatusDisplay(order.status)}
//                           </SelectValue>
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="pending">📋 Pending</SelectItem>
//                           <SelectItem value="processing">⚙️ Processing</SelectItem>
//                           <SelectItem value="printing">🖨️ Printing</SelectItem>
//                           <SelectItem value="ready">✅ Ready</SelectItem>
//                           <SelectItem value="dispatched">🚚 Dispatched</SelectItem>
//                           <SelectItem value="completed">🎉 Completed</SelectItem>
//                           <SelectItem value="cancelled">❌ Cancelled</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </TableCell>
//                     <TableCell>
//                       {order.deliveryType === 'courier' && waybill && (
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => downloadSingleLabel(order)}
//                           className="text-primary"
//                           title="Download Shipping Label"
//                         >
//                           <Download className="h-4 w-4" />
//                         </Button>
//                       )}
//                     </TableCell>
//                     <TableCell className="text-muted-foreground text-sm">
//                       {formatDate(order.createdAt)}
//                     </TableCell>
//                   </TableRow>
//                 );
//               })
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default AdminOrders;







import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileSpreadsheet, Loader2, RefreshCw, Download, Printer, Truck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';
import axiosInstance from '@/api/axios';

// Updated Types - Removed shipment/fship
interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    address?: string;
    pincode?: string;
    city?: string;
    state?: string;
  };
  items: Array<{
    pages: number;
    copies: number;
    printColor?: 'bw' | 'color';
  }>;
  totalAmount: number;
  finalAmount?: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMode?: string;
  status: 'pending' | 'processing' | 'printing' | 'ready' | 'dispatched' | 'completed' | 'cancelled';
  deliveryType: 'pickup' | 'courier';
  orderWeight?: number;
  deliveryCharge?: number;
  createdAt: string;
}

const AdminOrders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [deliveryFilter, setDeliveryFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  // Auto-refresh every 10 seconds to update payment status
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchOrders();
  //   }, 10000);
    
  //   return () => clearInterval(interval);
  // }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }
      
      const response = await axiosInstance.get('/order/admin/all');
      
      if (response.data && response.data.success) {
        setOrders(response.data.orders);
        
        const paidCount = response.data.orders.filter((o: Order) => o.paymentStatus === 'paid').length;
        toast({
          title: 'Success',
          description: `${response.data.orders.length} orders loaded (${paidCount} paid)`,
        });
      } else {
        setError('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      let errorMessage = 'Failed to fetch orders';
      if (error.response?.status === 401) {
        errorMessage = 'Unauthorized. Please login again.';
      }
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await axiosInstance.put(`/order/${orderId}/status`, {
        status: newStatus
      });
      
      if (response.data.success) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: newStatus as Order['status'] } : order
          )
        );
        toast({
          title: 'Success',
          description: `Order status updated to ${getStatusLabel(newStatus)}`,
        });
      }
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update status',
        variant: 'destructive',
      });
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

  const getStatusDisplay = (status: string): string => {
    const displays: Record<string, string> = {
      pending: '📋 Pending',
      processing: '⚙️ Processing',
      printing: '🖨️ Printing',
      ready: '✅ Ready',
      dispatched: '🚚 Dispatched',
      completed: '🎉 Completed',
      cancelled: '❌ Cancelled'
    };
    return displays[status] || status;
  };

  const formatWeight = (kg?: number): string => {
    if (!kg) return 'N/A';
    return kg >= 1 ? `${kg.toFixed(2)} kg` : `${(kg * 1000).toFixed(0)} g`;
  };

  const filteredOrders = orders.filter(order => {
    if (search && !order.orderNumber?.toLowerCase().includes(search.toLowerCase()) && 
        !order.customer?.name?.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    if (paymentFilter !== 'all' && order.paymentStatus !== paymentFilter) return false;
    if (deliveryFilter !== 'all' && order.deliveryType !== deliveryFilter) return false;
    return true;
  });

  const calculateTotalPages = (items: any[]) => {
    if (!items || !items.length) return 0;
    return items.reduce((total, item) => total + ((item.pages || 0) * (item.copies || 1)), 0);
  };

  const getPrintType = (items: any[]) => {
    if (!items || items.length === 0) return 'N/A';
    return items[0].printColor === 'color' ? 'Color' : 'B&W';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const handleExportExcel = () => {
    const exportData = filteredOrders.map(order => ({
      'Order ID': order.orderNumber,
      'Customer Name': order.customer?.name || 'N/A',
      'Phone': order.customer?.phone || 'N/A',
      'Total Pages': calculateTotalPages(order.items),
      'Print Type': getPrintType(order.items),
      'Delivery Type': order.deliveryType === 'courier' ? 'Courier' : 'Pickup',
      'Order Weight': formatWeight(order.orderWeight),
      'Delivery Charge': order.deliveryCharge ? `₹${order.deliveryCharge.toFixed(2)}` : 'N/A',
      'Amount': order.totalAmount,
      'Payment Status': order.paymentStatus,
      'Order Status': getStatusLabel(order.status),
      'Date': formatDate(order.createdAt)
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, `orders_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast({ title: 'Success', description: `${filteredOrders.length} orders exported` });
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
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Orders</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchOrders} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={fetchOrders} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleExportExcel} variant="outline" disabled={filteredOrders.length === 0} size="sm">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by ID or name..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            className="pl-10" 
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">📋 Pending</SelectItem>
            <SelectItem value="processing">⚙️ Processing</SelectItem>
            <SelectItem value="printing">🖨️ Printing</SelectItem>
            <SelectItem value="ready">✅ Ready</SelectItem>
            <SelectItem value="dispatched">🚚 Dispatched</SelectItem>
            <SelectItem value="completed">🎉 Completed</SelectItem>
            <SelectItem value="cancelled">❌ Cancelled</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payment</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={deliveryFilter} onValueChange={setDeliveryFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Delivery" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pickup">Pickup</SelectItem>
            <SelectItem value="courier">Courier</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <div className="bg-card rounded-lg p-3 shadow-sm">
          <p className="text-xs text-muted-foreground">Total Orders</p>
          <p className="text-xl font-bold">{filteredOrders.length}</p>
        </div>
        <div className="bg-card rounded-lg p-3 shadow-sm">
          <p className="text-xs text-muted-foreground">Total Revenue</p>
          <p className="text-xl font-bold">
            ₹{filteredOrders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + (o.totalAmount || 0), 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-card rounded-lg p-3 shadow-sm">
          <p className="text-xs text-muted-foreground">Pending</p>
          <p className="text-xl font-bold text-yellow-600">{filteredOrders.filter(o => o.status === 'pending').length}</p>
        </div>
        <div className="bg-card rounded-lg p-3 shadow-sm">
          <p className="text-xs text-muted-foreground">In Progress</p>
          <p className="text-xl font-bold text-blue-600">{filteredOrders.filter(o => o.status === 'processing' || o.status === 'printing').length}</p>
        </div>
        <div className="bg-card rounded-lg p-3 shadow-sm">
          <p className="text-xs text-muted-foreground">Completed</p>
          <p className="text-xl font-bold text-green-600">{filteredOrders.filter(o => o.status === 'completed').length}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-card rounded-xl shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Delivery</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Delivery Charge</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map(order => {
                const totalWithDelivery = (order.totalAmount || 0) + (order.deliveryCharge || 0);
                
                return (
                  <TableRow key={order._id}>
                    <TableCell>
                      <Link to={`/admin/orders/${order._id}`} className="text-primary font-medium hover:underline">
                        {order.orderNumber}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer?.name || 'N/A'}</div>
                        <div className="text-xs text-muted-foreground">{order.customer?.phone || 'N/A'}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={order.deliveryType === 'courier' ? 'bg-indigo-100' : 'bg-purple-100'}>
                        {order.deliveryType === 'courier' ? (
                          <span className="flex items-center gap-1">
                            <Truck className="h-3 w-3" />
                            Courier
                          </span>
                        ) : 'Pickup'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {order.deliveryType === 'courier' ? formatWeight(order.orderWeight) : '—'}
                    </TableCell>
                    <TableCell className="font-medium">
                      {order.deliveryType === 'courier' && order.deliveryCharge ? (
                        <span className="text-green-600">₹{order.deliveryCharge.toFixed(2)}</span>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-semibold">₹{order.finalAmount?.toLocaleString() || 0}</div>
                        {order.deliveryCharge && order.deliveryCharge > 0 && (
                          <div className="text-xs text-muted-foreground">
                            
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={paymentColors[order.paymentStatus]}>
                        {order.paymentStatus === 'paid' ? '✓ Paid' : 
                         order.paymentStatus === 'pending' ? '⏳ Pending' :
                         order.paymentStatus === 'failed' ? '❌ Failed' : '↺ Refunded'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={order.status} 
                        onValueChange={(value) => updateOrderStatus(order._id, value)}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue>
                            {getStatusDisplay(order.status)}
                          </SelectValue>
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
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(order.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOrders;
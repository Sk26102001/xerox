// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { useApp } from '@/context/AppContext';

// const AdminUserDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { users, orders } = useApp();
//   const user = users.find(u => u.id === id);
//   if (!user) return <div className="text-center py-12 text-muted-foreground">User not found</div>;

//   const userOrders = orders.filter(o => o.userId === user.id);

//   return (
//     <div>
//       <Button variant="ghost" onClick={() => navigate('/users')} className="mb-4"><ArrowLeft className="h-4 w-4 mr-2" /> Back</Button>
//       <h1 className="text-2xl font-bold text-foreground mb-6">{user.name}</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <div className="bg-card rounded-xl p-4 shadow-sm"><p className="text-muted-foreground text-xs">Email</p><p className="font-medium">{user.email}</p></div>
//         <div className="bg-card rounded-xl p-4 shadow-sm"><p className="text-muted-foreground text-xs">Phone</p><p className="font-medium">{user.phone}</p></div>
//         <div className="bg-card rounded-xl p-4 shadow-sm"><p className="text-muted-foreground text-xs">Joined</p><p className="font-medium">{user.createdAt}</p></div>
//       </div>

//       <h2 className="text-lg font-semibold text-foreground mb-4">Order History ({userOrders.length})</h2>
//       <div className="space-y-3">
//         {userOrders.map(order => (
//           <div key={order.id} className="bg-card rounded-xl p-4 shadow-sm flex items-center justify-between">
//             <div>
//               <span className="font-bold text-foreground">{order.id}</span>
//               <Badge variant="outline" className="ml-2 capitalize">{order.status}</Badge>
//               <p className="text-sm text-muted-foreground mt-1">{order.fileName} · {order.totalPages}p · {order.createdAt}</p>
//             </div>
//             <span className="font-bold text-primary">₹{order.totalCost.toFixed(2)}</span>
//           </div>
//         ))}
//         {userOrders.length === 0 && <p className="text-muted-foreground">No orders found.</p>}
//       </div>
//     </div>
//   );
// };

// export default AdminUserDetail;





// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//   ArrowLeft, Mail, Phone, Calendar, Package, CreditCard, Loader2, AlertCircle, 
//   UserCheck, UserX, RefreshCw, ChevronLeft, ChevronRight 
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useToast } from '@/hooks/use-toast';
// import axiosInstance from '@/api/axios';



// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
//   totalOrders: number;
//   totalSpending: number;
//   createdAt: string;
//   updatedAt: string;
//   isActive: boolean;
//   address?: {
//     street: string;
//     city: string;
//     state: string;
//     pincode: string;
//   };
// }

// interface Order {
//   _id: string;
//   orderNumber: string;
//   status: string;
//   totalAmount: number;
//   createdAt: string;
//   items: any[];
//   deliveryType: string;
//   paymentStatus: string;
// }

// const AdminUserDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [user, setUser] = useState<User | null>(null);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [ordersPage, setOrdersPage] = useState(1);
//   const [totalOrdersPages, setTotalOrdersPages] = useState(1);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [orderStatusFilter, setOrderStatusFilter] = useState<string>('');

//   useEffect(() => {
//     if (id) {
//       fetchUserDetails();
//       fetchUserOrders();
//     }
//   }, [id, ordersPage, orderStatusFilter]);

//   const fetchUserDetails = async () => {
//     try {
//       const response = await axiosInstance.get(`/users/${id}`);
      
//       if (response.data && response.data.success) {
//         setUser(response.data.user);
//       } else {
//         throw new Error(response.data?.message || 'Failed to fetch user details');
//       }
//     } catch (error: any) {
//       console.error('Error fetching user:', error);
//       setError(error.response?.data?.message || 'User not found');
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Failed to fetch user details',
//         variant: 'destructive',
//       });
//     }
//   };

//   const fetchUserOrders = async () => {
//     try {
//       const response = await axiosInstance.get(`/users/${id}/orders`, {
//         params: {
//           page: ordersPage,
//           limit: 10,
//           status: orderStatusFilter || undefined
//         }
//       });
      
//       if (response.data && response.data.success) {
//         setOrders(response.data.orders);
//         setTotalOrdersPages(response.data.pages || 1);
//         setTotalOrders(response.data.total || 0);
//       }
//     } catch (error: any) {
//       console.error('Error fetching user orders:', error);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateUserStatus = async (isActive: boolean) => {
//     try {
//       setUpdating(true);
//       const response = await axiosInstance.put(`/users/${id}/status`, { isActive });
      
//       if (response.data && response.data.success) {
//         setUser(prev => prev ? { ...prev, isActive } : null);
//         toast({
//           title: 'Success',
//           description: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
//         });
//       }
//     } catch (error: any) {
//       console.error('Error updating user status:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Failed to update user status',
//         variant: 'destructive',
//       });
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const deleteUser = async () => {
//     if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
//       return;
//     }
    
//     try {
//       const response = await axiosInstance.delete(`/users/${id}`);
      
//       if (response.data && response.data.success) {
//         toast({
//           title: 'Success',
//           description: 'User deleted successfully',
//         });
//         navigate('/users');
//       }
//     } catch (error: any) {
//       console.error('Error deleting user:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Failed to delete user',
//         variant: 'destructive',
//       });
//     }
//   };

//   const getStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       pending: 'bg-yellow-100 text-yellow-700',
//       processing: 'bg-blue-100 text-blue-700',
//       printing: 'bg-purple-100 text-purple-700',
//       ready: 'bg-green-100 text-green-700',
//       dispatched: 'bg-indigo-100 text-indigo-700',
//       completed: 'bg-emerald-100 text-emerald-700',
//       cancelled: 'bg-red-100 text-red-700',
//     };
//     return colors[status] || 'bg-gray-100 text-gray-700';
//   };

//   const getPaymentStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       paid: 'bg-green-100 text-green-700',
//       pending: 'bg-yellow-100 text-yellow-700',
//       failed: 'bg-red-100 text-red-700',
//       refunded: 'bg-gray-100 text-gray-700',
//     };
//     return colors[status] || 'bg-gray-100 text-gray-700';
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatCurrency = (amount: number) => {
//     return `₹${amount.toLocaleString('en-IN')}`;
//   };

//   if (loading && !user) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center">
//           <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
//           <p className="text-muted-foreground">Loading user details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !user) {
//     return (
//       <div className="text-center py-12">
//         <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//         <p className="text-muted-foreground">{error || 'User not found'}</p>
//         <Button onClick={() => navigate('/users')} className="mt-4">
//           Back to Users
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <Button 
//           variant="ghost" 
//           onClick={() => navigate('/users')} 
//           className="mb-4"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" /> 
//           Back to Users
//         </Button>
//         <div className="flex gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => fetchUserDetails()}
//             disabled={updating}
//           >
//             <RefreshCw className={`h-4 w-4 mr-2 ${updating ? 'animate-spin' : ''}`} />
//             Refresh
//           </Button>
//           <Button
//             variant="destructive"
//             size="sm"
//             onClick={deleteUser}
//           >
//             Delete User
//           </Button>
//         </div>
//       </div>

//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
//         <div className="flex gap-2">
//           <Badge variant={user.isActive ? 'default' : 'destructive'}>
//             {user.isActive ? 'Active' : 'Inactive'}
//           </Badge>
//           <Button
//             variant={user.isActive ? 'outline' : 'default'}
//             size="sm"
//             onClick={() => updateUserStatus(!user.isActive)}
//             disabled={updating}
//           >
//             {user.isActive ? (
//               <>
//                 <UserX className="h-4 w-4 mr-1" />
//                 Deactivate
//               </>
//             ) : (
//               <>
//                 <UserCheck className="h-4 w-4 mr-1" />
//                 Activate
//               </>
//             )}
//           </Button>
//         </div>
//       </div>

//       {/* User Info Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center gap-3">
//               <Mail className="h-4 w-4 text-muted-foreground" />
//               <div>
//                 <p className="text-xs text-muted-foreground">Email</p>
//                 <p className="font-medium text-sm">{user.email}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center gap-3">
//               <Phone className="h-4 w-4 text-muted-foreground" />
//               <div>
//                 <p className="text-xs text-muted-foreground">Phone</p>
//                 <p className="font-medium text-sm">{user.phone || 'N/A'}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center gap-3">
//               <Calendar className="h-4 w-4 text-muted-foreground" />
//               <div>
//                 <p className="text-xs text-muted-foreground">Joined</p>
//                 <p className="font-medium text-sm">{formatDate(user.createdAt)}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center gap-3">
//               <CreditCard className="h-4 w-4 text-muted-foreground" />
//               <div>
//                 <p className="text-xs text-muted-foreground">Role</p>
//                 <p className="font-medium text-sm capitalize">{user.role}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Total Orders
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{user.totalOrders}</div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Total Spent
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-primary">
//               {formatCurrency(user.totalSpending)}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Address Section */}
//       {user.address && (
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle className="text-lg">Shipping Address</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>{user.address.street}</p>
//             <p>{user.address.city}, {user.address.state} - {user.address.pincode}</p>
//           </CardContent>
//         </Card>
//       )}

//       {/* Order History */}
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
//             <Package className="h-5 w-5" />
//             Order History ({totalOrders})
//           </h2>
          
//           {/* Order Status Filter */}
//           <select
//             value={orderStatusFilter}
//             onChange={(e) => setOrderStatusFilter(e.target.value)}
//             className="px-3 py-1 text-sm border border-border rounded-lg bg-background"
//           >
//             <option value="">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="processing">Processing</option>
//             <option value="printing">Printing</option>
//             <option value="ready">Ready</option>
//             <option value="dispatched">Dispatched</option>
//             <option value="completed">Completed</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//         </div>
        
//         <div className="space-y-3">
//           {orders.length === 0 ? (
//             <Card>
//               <CardContent className="p-8 text-center text-muted-foreground">
//                 No orders found for this user.
//               </CardContent>
//             </Card>
//           ) : (
//             <>
//               {orders.map((order) => (
//                 <Card 
//                   key={order._id} 
//                   className="cursor-pointer hover:shadow-md transition-shadow"
//                   onClick={() => navigate(`/orders/${order._id}`)}
//                 >
//                   <CardContent className="p-4">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-2 flex-wrap">
//                           <span className="font-mono font-bold text-foreground">
//                             {order.orderNumber}
//                           </span>
//                           <Badge variant="outline" className={getStatusColor(order.status)}>
//                             {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                           </Badge>
//                           <Badge variant="outline" className={getPaymentStatusColor(order.paymentStatus)}>
//                             {order.paymentStatus === 'paid' ? 'Paid' : order.paymentStatus}
//                           </Badge>
//                         </div>
//                         <div className="text-sm text-muted-foreground space-y-1">
//                           <p>{order.items?.length || 0} item(s) · {order.deliveryType === 'pickup' ? 'Store Pickup' : 'Courier Delivery'}</p>
//                           <p className="text-xs">Placed on {formatDate(order.createdAt)}</p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-bold text-primary text-lg">
//                           {formatCurrency(order.totalAmount)}
//                         </p>
//                         <Button 
//                           variant="ghost" 
//                           size="sm"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             navigate(`/orders/${order._id}`);
//                           }}
//                           className="mt-1"
//                         >
//                           View Details
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}

//               {/* Orders Pagination */}
//               {totalOrdersPages > 1 && (
//                 <div className="flex items-center justify-center gap-2 mt-4">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => setOrdersPage(ordersPage - 1)}
//                     disabled={ordersPage === 1}
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                   </Button>
//                   <span className="px-3 py-1 text-sm">
//                     Page {ordersPage} of {totalOrdersPages}
//                   </span>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => setOrdersPage(ordersPage + 1)}
//                     disabled={ordersPage === totalOrdersPages}
//                   >
//                     <ChevronRight className="h-4 w-4" />
//                   </Button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminUserDetail;













// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//   ArrowLeft, Mail, Phone, Calendar, Package, CreditCard, Loader2, AlertCircle, 
//   UserCheck, UserX, RefreshCw, ChevronLeft, ChevronRight, Eye, FileText
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useToast } from '@/hooks/use-toast';
// import axiosInstance from '@/api/axios';
// import InvoiceModal from '@/components/InvoiceModal';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
//   totalOrders: number;
//   totalSpending: number;
//   createdAt: string;
//   updatedAt: string;
//   isActive: boolean;
//   address?: {
//     street: string;
//     city: string;
//     state: string;
//     pincode: string;
//   };
// }

// interface Order {
//   _id: string;
//   orderNumber: string;
//   status: string;
//   totalAmount: number;
//   createdAt: string;
//   items: any[];
//   deliveryType: string;
//   paymentStatus: string;
//   paymentMode?: 'upi' | 'card' | 'bank' | 'cod';
//   razorpayOrderId?: string;
//   razorpayPaymentId?: string;
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

// // Interface for transformed order for invoice
// interface TransformedOrder {
//   id: string;
//   date: string;
//   pages: number;
//   copies: number;
//   paperSize: string;
//   printColor: string;
//   bindingType: string;
//   amount: number;
//   status: string;
//   paymentStatus: string;
//   deliveryType: string;
//   paymentMode?: string;
//   razorpayOrderId?: string;
//   razorpayPaymentId?: string;
//   items?: any[];
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

// const AdminUserDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [user, setUser] = useState<User | null>(null);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [ordersPage, setOrdersPage] = useState(1);
//   const [totalOrdersPages, setTotalOrdersPages] = useState(1);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [orderStatusFilter, setOrderStatusFilter] = useState<string>('');
//   const [selectedOrder, setSelectedOrder] = useState<TransformedOrder | null>(null);

//   useEffect(() => {
//     if (id) {
//       fetchUserDetails();
//       fetchUserOrders();
//     }
//   }, [id, ordersPage, orderStatusFilter]);

//   const fetchUserDetails = async () => {
//     try {
//       const response = await axiosInstance.get(`/users/${id}`);
      
//       if (response.data && response.data.success) {
//         setUser(response.data.user);
//       } else {
//         throw new Error(response.data?.message || 'Failed to fetch user details');
//       }
//     } catch (error: any) {
//       console.error('Error fetching user:', error);
//       setError(error.response?.data?.message || 'User not found');
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Failed to fetch user details',
//         variant: 'destructive',
//       });
//     }
//   };

//   const fetchUserOrders = async () => {
//     try {
//       const response = await axiosInstance.get(`/users/${id}/orders`, {
//         params: {
//           page: ordersPage,
//           limit: 10,
//           status: orderStatusFilter || undefined
//         }
//       });
      
//       if (response.data && response.data.success) {
//         setOrders(response.data.orders);
//         setTotalOrdersPages(response.data.pages || 1);
//         setTotalOrders(response.data.total || 0);
//       }
//     } catch (error: any) {
//       console.error('Error fetching user orders:', error);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Transform order for invoice
//   const transformOrderForInvoice = (order: Order): TransformedOrder => {
//     const firstItem = order.items && order.items[0] || {};
    
//     // Map print color
//     const printColorMap: Record<string, string> = {
//       'bw': 'B&W',
//       'color': 'Color'
//     };
    
//     // Map delivery type
//     const deliveryTypeMap: Record<string, string> = {
//       'pickup': 'Store Pickup',
//       'courier': 'Courier'
//     };
    
//     return {
//       id: order.orderNumber,
//       date: new Date(order.createdAt).toLocaleDateString('en-CA'),
//       pages: firstItem.pages || 0,
//       copies: firstItem.copies || 1,
//       paperSize: firstItem.paperSize || 'A4',
//       printColor: printColorMap[firstItem.printColor] || 'B&W',
//       bindingType: firstItem.bindingType || 'None',
//       amount: order.totalAmount,
//       status: order.status,
//       paymentStatus: order.paymentStatus,
//       deliveryType: deliveryTypeMap[order.deliveryType] || order.deliveryType,
//       paymentMode: order.paymentMode || 'cod',
//       razorpayOrderId: order.razorpayOrderId,
//       razorpayPaymentId: order.razorpayPaymentId,
//       items: order.items?.map((item: any) => ({
//         pages: item.pages,
//         copies: item.copies,
//         paperSize: item.paperSize,
//         printColor: printColorMap[item.printColor] || 'B&W',
//         bindingType: item.bindingType,
//         fileName: item.files?.[0]?.name || `Document ${item.pages} pages`
//       })) || [],
//       customer: {
//         name: order.customer?.name || user?.name || 'Customer',
//         phone: order.customer?.phone || user?.phone || 'N/A',
//         address: order.customer?.address,
//         pincode: order.customer?.pincode,
//         city: order.customer?.city,
//         state: order.customer?.state,
//         gstin: order.customer?.gstin
//       }
//     };
//   };

//   // Handle view invoice
//   const handleViewInvoice = (order: Order) => {
//     const transformedOrder = transformOrderForInvoice(order);
//     setSelectedOrder(transformedOrder);
//   };

//   const updateUserStatus = async (isActive: boolean) => {
//     try {
//       setUpdating(true);
//       const response = await axiosInstance.put(`/users/${id}/status`, { isActive });
      
//       if (response.data && response.data.success) {
//         setUser(prev => prev ? { ...prev, isActive } : null);
//         toast({
//           title: 'Success',
//           description: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
//         });
//       }
//     } catch (error: any) {
//       console.error('Error updating user status:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Failed to update user status',
//         variant: 'destructive',
//       });
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const deleteUser = async () => {
//     if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
//       return;
//     }
    
//     try {
//       const response = await axiosInstance.delete(`/users/${id}`);
      
//       if (response.data && response.data.success) {
//         toast({
//           title: 'Success',
//           description: 'User deleted successfully',
//         });
//         navigate('/users');
//       }
//     } catch (error: any) {
//       console.error('Error deleting user:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Failed to delete user',
//         variant: 'destructive',
//       });
//     }
//   };

//   const getStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       pending: 'bg-yellow-100 text-yellow-700',
//       processing: 'bg-blue-100 text-blue-700',
//       printing: 'bg-purple-100 text-purple-700',
//       ready: 'bg-green-100 text-green-700',
//       dispatched: 'bg-indigo-100 text-indigo-700',
//       completed: 'bg-emerald-100 text-emerald-700',
//       cancelled: 'bg-red-100 text-red-700',
//     };
//     return colors[status] || 'bg-gray-100 text-gray-700';
//   };

//   const getPaymentStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       paid: 'bg-green-100 text-green-700',
//       pending: 'bg-yellow-100 text-yellow-700',
//       failed: 'bg-red-100 text-red-700',
//       refunded: 'bg-gray-100 text-gray-700',
//     };
//     return colors[status] || 'bg-gray-100 text-gray-700';
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatCurrency = (amount: number) => {
//     return `₹${amount.toLocaleString('en-IN')}`;
//   };

//   if (loading && !user) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center">
//           <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
//           <p className="text-muted-foreground">Loading user details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !user) {
//     return (
//       <div className="text-center py-12">
//         <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//         <p className="text-muted-foreground">{error || 'User not found'}</p>
//         <Button onClick={() => navigate('/users')} className="mt-4">
//           Back to Users
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <Button 
//           variant="ghost" 
//           onClick={() => navigate('/users')} 
//           className="mb-4"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" /> 
//           Back to Users
//         </Button>
//         <div className="flex gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => fetchUserDetails()}
//             disabled={updating}
//           >
//             <RefreshCw className={`h-4 w-4 mr-2 ${updating ? 'animate-spin' : ''}`} />
//             Refresh
//           </Button>
//           <Button
//             variant="destructive"
//             size="sm"
//             onClick={deleteUser}
//           >
//             Delete User
//           </Button>
//         </div>
//       </div>

//       {/* <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
//         <div className="flex gap-2">
//           <Badge variant={user.isActive ? 'default' : 'destructive'}>
//             {user.isActive ? 'Active' : 'Inactive'}
//           </Badge>
//           <Button
//             variant={user.isActive ? 'outline' : 'default'}
//             size="sm"
//             onClick={() => updateUserStatus(!user.isActive)}
//             disabled={updating}
//           >
//             {user.isActive ? (
//               <>
//                 <UserX className="h-4 w-4 mr-1" />
//                 Deactivate
//               </>
//             ) : (
//               <>
//                 <UserCheck className="h-4 w-4 mr-1" />
//                 Activate
//               </>
//             )}
//           </Button>
//         </div>
//       </div> */}

//       {/* User Info Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center gap-3">
//               <Mail className="h-4 w-4 text-muted-foreground" />
//               <div>
//                 <p className="text-xs text-muted-foreground">Email</p>
//                 <p className="font-medium text-sm">{user.email}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center gap-3">
//               <Phone className="h-4 w-4 text-muted-foreground" />
//               <div>
//                 <p className="text-xs text-muted-foreground">Phone</p>
//                 <p className="font-medium text-sm">{user.phone || 'N/A'}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center gap-3">
//               <Calendar className="h-4 w-4 text-muted-foreground" />
//               <div>
//                 <p className="text-xs text-muted-foreground">Joined</p>
//                 <p className="font-medium text-sm">{formatDate(user.createdAt)}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center gap-3">
//               <CreditCard className="h-4 w-4 text-muted-foreground" />
//               <div>
//                 <p className="text-xs text-muted-foreground">Role</p>
//                 <p className="font-medium text-sm capitalize">{user.role}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Total Orders
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{user.totalOrders}</div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Total Spent
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-primary">
//               {formatCurrency(user.totalSpending)}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Address Section */}
//       {user.address && (
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle className="text-lg">Shipping Address</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>{user.address.street}</p>
//             <p>{user.address.city}, {user.address.state} - {user.address.pincode}</p>
//           </CardContent>
//         </Card>
//       )}

//       {/* Order History */}
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
//             <Package className="h-5 w-5" />
//             Order History ({totalOrders})
//           </h2>
          
//           {/* Order Status Filter */}
//           <select
//             value={orderStatusFilter}
//             onChange={(e) => setOrderStatusFilter(e.target.value)}
//             className="px-3 py-1 text-sm border border-border rounded-lg bg-background"
//           >
//             <option value="">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="processing">Processing</option>
//             <option value="printing">Printing</option>
//             <option value="ready">Ready</option>
//             <option value="dispatched">Dispatched</option>
//             <option value="completed">Completed</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//         </div>
        
//         <div className="space-y-3">
//           {orders.length === 0 ? (
//             <Card>
//               <CardContent className="p-8 text-center text-muted-foreground">
//                 No orders found for this user.
//               </CardContent>
//             </Card>
//           ) : (
//             <>
//               {orders.map((order) => (
//                 <Card 
//                   key={order._id} 
//                   className="cursor-pointer hover:shadow-md transition-shadow"
//                   // onClick={() => navigate(`/orders/${order._id}`)}
//                 >
//                   <CardContent className="p-4">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-2 flex-wrap">
//                           <span className="font-mono font-bold text-foreground">
//                             {order.orderNumber}
//                           </span>
//                           <Badge variant="outline" className={getStatusColor(order.status)}>
//                             {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                           </Badge>
//                           <Badge variant="outline" className={getPaymentStatusColor(order.paymentStatus)}>
//                             {order.paymentStatus === 'paid' ? 'Paid' : order.paymentStatus}
//                           </Badge>
//                         </div>
//                         <div className="text-sm text-muted-foreground space-y-1">
//                           <p>{order.items?.length || 0} item(s) · {order.deliveryType === 'pickup' ? 'Store Pickup' : 'Courier Delivery'}</p>
//                           <p className="text-xs">Placed on {formatDate(order.createdAt)}</p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-bold text-primary text-lg">
//                           {formatCurrency(order.totalAmount)}
//                         </p>
//                         <div className="flex gap-2 mt-1 justify-end">
//                           {/* <Button 
//                             variant="ghost" 
//                             size="sm"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               navigate(`/orders/${order._id}`);
//                             }}
//                           >
//                             View Details
//                           </Button> */}
//                           <Button 
//                             variant="outline" 
//                             size="sm"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleViewInvoice(order);
//                             }}
//                           >
//                             <FileText className="h-3.5 w-3.5 mr-1" />
//                             Invoice
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}

//               {/* Orders Pagination */}
//               {totalOrdersPages > 1 && (
//                 <div className="flex items-center justify-center gap-2 mt-4">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => setOrdersPage(ordersPage - 1)}
//                     disabled={ordersPage === 1}
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                   </Button>
//                   <span className="px-3 py-1 text-sm">
//                     Page {ordersPage} of {totalOrdersPages}
//                   </span>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => setOrdersPage(ordersPage + 1)}
//                     disabled={ordersPage === totalOrdersPages}
//                   >
//                     <ChevronRight className="h-4 w-4" />
//                   </Button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Invoice Modal */}
//       {selectedOrder && (
//         <InvoiceModal 
//           order={selectedOrder} 
//           onClose={() => setSelectedOrder(null)} 
//         />
//       )}
//     </div>
//   );
// };

// export default AdminUserDetail;


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, Calendar, Package, CreditCard, Loader2, AlertCircle, 
  UserCheck, UserX, RefreshCw, ChevronLeft, ChevronRight, Eye, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/api/axios';
import InvoiceModal from '@/components/InvoiceModal';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  totalOrders: number;
  totalSpending: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

interface Order {
  _id: string;
  orderNumber: string;
  status: string;
  // totalAmount: number;
    finalAmount: number;
  createdAt: string;
  items: any[];
  deliveryType: string;
  paymentStatus: string;
  paymentMode?: 'upi' | 'card' | 'bank' | 'cod';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
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

const AdminUserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ordersPage, setOrdersPage] = useState(1);
  const [totalOrdersPages, setTotalOrdersPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null); // ✅ store only ID

  useEffect(() => {
    if (id) {
      fetchUserDetails();
      fetchUserOrders();
    }
  }, [id, ordersPage, orderStatusFilter]);

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      
      if (response.data && response.data.success) {
        setUser(response.data.user);
      } else {
        throw new Error(response.data?.message || 'Failed to fetch user details');
      }
    } catch (error: any) {
      console.error('Error fetching user:', error);
      setError(error.response?.data?.message || 'User not found');
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch user details',
        variant: 'destructive',
      });
    }
  };

  const fetchUserOrders = async () => {
    try {
      const response = await axiosInstance.get(`/users/${id}/orders`, {
        params: {
          page: ordersPage,
          limit: 10,
          status: orderStatusFilter || undefined
        }
      });
      
      if (response.data && response.data.success) {
        setOrders(response.data.orders);
        setTotalOrdersPages(response.data.pages || 1);
        setTotalOrders(response.data.total || 0);
      }
    } catch (error: any) {
      console.error('Error fetching user orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (isActive: boolean) => {
    try {
      setUpdating(true);
      const response = await axiosInstance.put(`/users/${id}/status`, { isActive });
      
      if (response.data && response.data.success) {
        setUser(prev => prev ? { ...prev, isActive } : null);
        toast({
          title: 'Success',
          description: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
        });
      }
    } catch (error: any) {
      console.error('Error updating user status:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update user status',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  const deleteUser = async () => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await axiosInstance.delete(`/users/${id}`);
      
      if (response.data && response.data.success) {
        toast({
          title: 'Success',
          description: 'User deleted successfully',
        });
        navigate('/users');
      }
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete user',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      printing: 'bg-purple-100 text-purple-700',
      ready: 'bg-green-100 text-green-700',
      dispatched: 'bg-indigo-100 text-indigo-700',
      completed: 'bg-emerald-100 text-emerald-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      paid: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      failed: 'bg-red-100 text-red-700',
      refunded: 'bg-gray-100 text-gray-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  if (loading && !user) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-muted-foreground">{error || 'User not found'}</p>
        <Button onClick={() => navigate('/users')} className="mt-4">
          Back to Users
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/users')} 
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> 
          Back to Users
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchUserDetails()}
            disabled={updating}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${updating ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={deleteUser}
          >
            Delete User
          </Button>
        </div>
      </div>

      {/* User Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium text-sm">{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium text-sm">{user.phone || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Joined</p>
                <p className="font-medium text-sm">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="font-medium text-sm capitalize">{user.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.totalOrders}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(user.totalSpending)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Address Section */}
      {user.address && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{user.address.street}</p>
            <p>{user.address.city}, {user.address.state} - {user.address.pincode}</p>
          </CardContent>
        </Card>
      )}

      {/* Order History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order History ({totalOrders})
          </h2>
          
          {/* Order Status Filter */}
          <select
            value={orderStatusFilter}
            onChange={(e) => setOrderStatusFilter(e.target.value)}
            className="px-3 py-1 text-sm border border-border rounded-lg bg-background"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="printing">Printing</option>
            <option value="ready">Ready</option>
            <option value="dispatched">Dispatched</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        <div className="space-y-3">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No orders found for this user.
              </CardContent>
            </Card>
          ) : (
            <>
              {orders.map((order) => (
                <Card 
                  key={order._id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="font-mono font-bold text-foreground">
                            {order.orderNumber}
                          </span>
                          <Badge variant="outline" className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <Badge variant="outline" className={getPaymentStatusColor(order.paymentStatus)}>
                            {order.paymentStatus === 'paid' ? 'Paid' : order.paymentStatus}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>{order.items?.length || 0} item(s) · {order.deliveryType === 'pickup' ? 'Store Pickup' : 'Courier Delivery'}</p>
                          <p className="text-xs">Placed on {formatDate(order.createdAt)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary text-lg">
                          {formatCurrency(order.finalAmount)}
                        </p>
                        <div className="flex gap-2 mt-1 justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrderId(order._id); // ✅ pass the ID
                            }}
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            Invoice
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Orders Pagination */}
              {totalOrdersPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOrdersPage(ordersPage - 1)}
                    disabled={ordersPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="px-3 py-1 text-sm">
                    Page {ordersPage} of {totalOrdersPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOrdersPage(ordersPage + 1)}
                    disabled={ordersPage === totalOrdersPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Invoice Modal - now passes only the order ID */}
      {selectedOrderId && (
        <InvoiceModal 
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)} 
        />
      )}
    </div>
  );
};

export default AdminUserDetail;
// import { useApp } from '@/context/AppContext';
// import { ShoppingCart, Clock, CheckCircle, XCircle, DollarSign, Users, FileText, TrendingUp } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// const weeklyData = [
//   { day: 'Mon', revenue: 1200 }, { day: 'Tue', revenue: 1800 }, { day: 'Wed', revenue: 950 },
//   { day: 'Thu', revenue: 2100 }, { day: 'Fri', revenue: 2800 }, { day: 'Sat', revenue: 3200 }, { day: 'Sun', revenue: 1600 },
// ];

// const monthlyData = [
//   { month: 'Oct', orders: 45 }, { month: 'Nov', orders: 62 }, { month: 'Dec', orders: 78 },
//   { month: 'Jan', orders: 55 }, { month: 'Feb', orders: 90 }, { month: 'Mar', orders: 42 },
// ];

// const AdminDashboard = () => {
//   const { orders, users } = useApp();

//   const stats = [
//     { label: 'New Orders', value: orders.filter(o => o.status === 'received').length, icon: ShoppingCart, color: 'text-blue-500' },
//     { label: 'Processing', value: orders.filter(o => o.status === 'processing' || o.status === 'printing').length, icon: Clock, color: 'text-yellow-500' },
//     { label: 'Completed', value: orders.filter(o => o.status === 'completed').length, icon: CheckCircle, color: 'text-green-500' },
//     { label: 'Cancelled', value: orders.filter(o => o.status === 'cancelled').length, icon: XCircle, color: 'text-red-500' },
//     { label: 'Total Revenue', value: `₹${orders.filter(o => o.paymentStatus === 'paid').reduce((s, o) => s + o.totalCost, 0).toFixed(0)}`, icon: DollarSign, color: 'text-primary' },
//     { label: "Today's Revenue", value: '₹2,885', icon: TrendingUp, color: 'text-primary' },
//     { label: 'Total Users', value: users.filter(u => u.role === 'user').length, icon: Users, color: 'text-purple-500' },
//     { label: 'Pages Printed', value: '12,450', icon: FileText, color: 'text-orange-500' },
//   ];

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         {stats.map(s => (
//           <div key={s.label} className="bg-card rounded-xl p-4 shadow-sm">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
//               <s.icon className={`h-5 w-5 ${s.color}`} />
//             </div>
//             <p className="text-2xl font-bold text-foreground">{s.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-card rounded-xl p-6 shadow-sm">
//           <h3 className="font-semibold text-foreground mb-4">Weekly Revenue</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={weeklyData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//               <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//               <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
//               <Tooltip />
//               <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="bg-card rounded-xl p-6 shadow-sm">
//           <h3 className="font-semibold text-foreground mb-4">Monthly Orders</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={monthlyData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//               <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//               <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
//               <Tooltip />
//               <Line type="monotone" dataKey="orders" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;





















// import { useState, useEffect } from 'react';
// import { ShoppingCart, Clock, CheckCircle, XCircle, DollarSign, Users, FileText, TrendingUp, RefreshCw } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/hooks/use-toast';
// import axiosInstance from '@/api/axios';

// // Type definitions
// interface OrderItem {
//   pages: number;
//   copies: number;
//   printColor?: 'bw' | 'color';
// }

// interface Customer {
//   name: string;
//   phone: string;
//   address?: string;
//   pincode?: string;
//   city?: string;
//   state?: string;
// }

// interface Order {
//   _id: string;
//   userId: string;
//   orderNumber: string;
//   items: OrderItem[];
//   deliveryType: 'pickup' | 'courier';
//   customer: Customer;
//   totalAmount: number;
//   paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
//   status: 'pending' | 'processing' | 'completed' | 'cancelled';
//   createdAt: string;
// }

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface DashboardData {
//   weeklyRevenue: Array<{ day: string; revenue: number }>;
//   monthlyOrders: Array<{ month: string; orders: number }>;
//   todayRevenue: number;
//   totalPages: number;
//   totalUsers: number;
// }

// const AdminDashboard: React.FC = () => {
//   const { toast } = useToast();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [dashboardData, setDashboardData] = useState<DashboardData>({
//     weeklyRevenue: [],
//     monthlyOrders: [],
//     todayRevenue: 0,
//     totalPages: 0,
//     totalUsers: 0
//   });

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch orders
//       console.log('Fetching orders...');
//       const ordersResponse = await axiosInstance.get('/order/admin/all');
//       console.log('Orders response:', ordersResponse.data);
      
//       if (ordersResponse.data && ordersResponse.data.success) {
//         const ordersData = ordersResponse.data.orders || [];
//         setOrders(ordersData);
//         calculateStats(ordersData);
//         toast({
//           title: 'Success',
//           description: `${ordersData.length} orders loaded`,
//         });
//       } else {
//         console.error('Invalid orders response:', ordersResponse.data);
//       }
      
//       // Fetch users
//       try {
//         console.log('Fetching users...');
//         const usersResponse = await axiosInstance.get('/users');
//         console.log('Users response:', usersResponse.data);
        
//         // Handle different response structures
// let usersData: User[] = [];

// if (usersResponse.data?.success) {
//   usersData = usersResponse.data.data || [];
// } else if (Array.isArray(usersResponse.data)) {
//   usersData = usersResponse.data;
// }
        
//         console.log('Users data:', usersData);
//         setUsers(usersData);
        
//         const totalUsers = usersData.filter((u: User) => u.role === 'user').length;
//         setDashboardData(prev => ({
//           ...prev,
//           totalUsers: totalUsers
//         }));
//       } catch (userError) {
//         console.error('Error fetching users:', userError);
//         // Don't show error for users as it's not critical
//       }
      
//     } catch (error: any) {
//       console.error('Error fetching dashboard data:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Failed to fetch dashboard data',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateStats = (orders: Order[]) => {
//     const weeklyRevenueData = calculateWeeklyRevenue(orders);
//     const monthlyOrdersData = calculateMonthlyOrders(orders);
//     const todayRev = calculateTodayRevenue(orders);
//     const totalPagesPrinted = calculateTotalPages(orders);
    
//     setDashboardData(prev => ({
//       ...prev,
//       weeklyRevenue: weeklyRevenueData,
//       monthlyOrders: monthlyOrdersData,
//       todayRevenue: todayRev,
//       totalPages: totalPagesPrinted,
//     }));
//   };

// const calculateWeeklyRevenue = (orders: Order[]) => {
//   const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//   const weekData = days.map(day => ({ day, revenue: 0 }));

//   const today = new Date();
//   const day = today.getDay();
//   const diff = today.getDate() - day + (day === 0 ? -6 : 1);

//   const startOfWeek = new Date(today.setDate(diff));
//   startOfWeek.setHours(0, 0, 0, 0);

//   orders.forEach(order => {
//     if (order.paymentStatus === 'paid') {
//       const orderDate = new Date(order.createdAt);

//       if (orderDate >= startOfWeek && orderDate <= new Date()) {
//         const index = orderDate.getDay() === 0 ? 6 : orderDate.getDay() - 1;
//         weekData[index].revenue += order.totalAmount || 0;
//       }
//     }
//   });

//   console.log("Weekly Data:", weekData);

//   return weekData;
// };
//   const calculateMonthlyOrders = (orders: Order[]): Array<{ month: string; orders: number }> => {
//     const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
//     const monthData = months.map(month => ({ month, orders: 0 }));
//     const currentYear = new Date().getFullYear();
//     const monthMap: { [key: string]: number } = {
//       'Oct': 9, 'Nov': 10, 'Dec': 11, 'Jan': 0, 'Feb': 1, 'Mar': 2
//     };
    
//     orders.forEach(order => {
//       const orderDate = new Date(order.createdAt);
//       const orderMonth = orderDate.getMonth();
//       const orderYear = orderDate.getFullYear();
      
//       const monthEntry = monthData.find(m => monthMap[m.month] === orderMonth);
//       if (monthEntry && orderYear === currentYear) {
//         monthEntry.orders += 1;
//       }
//     });
    
//     return monthData;
//   };

//   const calculateTodayRevenue = (orders: Order[]): number => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     const todayOrders = orders.filter(order => {
//       const orderDate = new Date(order.createdAt);
//       orderDate.setHours(0, 0, 0, 0);
//       return orderDate.getTime() === today.getTime() && order.paymentStatus === 'paid';
//     });
    
//     return todayOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
//   };

//   const calculateTotalPages = (orders: Order[]): number => {
//     let totalPages = 0;
    
//     orders.forEach(order => {
//       if (order.status === 'completed' && order.items) {
//         order.items.forEach(item => {
//           const pagesPerCopy = item.pages || 0;
//           const copies = item.copies || 1;
//           totalPages += pagesPerCopy * copies;
//         });
//       }
//     });
    
//     return totalPages;
//   };

//   const getOrderStatusCount = (status: Order['status']): number => {
//     return orders.filter(o => o.status === status).length;
//   };

//   const stats = [
//     { 
//       label: 'New Orders', 
//       value: getOrderStatusCount('pending'), 
//       icon: ShoppingCart, 
//       color: 'text-blue-500' 
//     },
//     { 
//       label: 'Processing', 
//       value: getOrderStatusCount('processing'), 
//       icon: Clock, 
//       color: 'text-yellow-500' 
//     },
//     { 
//       label: 'Completed', 
//       value: getOrderStatusCount('completed'), 
//       icon: CheckCircle, 
//       color: 'text-green-500' 
//     },
//     { 
//       label: 'Cancelled', 
//       value: getOrderStatusCount('cancelled'), 
//       icon: XCircle, 
//       color: 'text-red-500' 
//     },
//     { 
//       label: 'Total Revenue', 
//       value: `₹${orders.filter(o => o.paymentStatus === 'paid').reduce((s, o) => s + (o.totalAmount || 0), 0).toLocaleString('en-IN')}`, 
//       icon: DollarSign, 
//       color: 'text-primary' 
//     },
//     { 
//       label: "Today's Revenue", 
//       value: `₹${dashboardData.todayRevenue.toLocaleString('en-IN')}`, 
//       icon: TrendingUp, 
//       color: 'text-primary' 
//     },
//     { 
//       label: 'Total Users', 
//       value: dashboardData.totalUsers.toLocaleString(), 
//       icon: Users, 
//       color: 'text-purple-500' 
//     },
//     { 
//       label: 'Pages Printed', 
//       value: dashboardData.totalPages.toLocaleString(), 
//       icon: FileText, 
//       color: 'text-orange-500' 
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
//         <Button onClick={fetchDashboardData} variant="outline" size="sm">
//           <RefreshCw className="h-4 w-4 mr-2" />
//           Refresh
//         </Button>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         {stats.map((s, index) => (
//           <div key={index} className="bg-card rounded-xl p-4 shadow-sm">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
//               <s.icon className={`h-5 w-5 ${s.color}`} />
//             </div>
//             <p className="text-2xl font-bold text-foreground">{s.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-card rounded-xl p-6 shadow-sm">
//           <h3 className="font-semibold text-foreground mb-4">Weekly Revenue</h3>
//           {dashboardData.weeklyRevenue.length > 0 && dashboardData.weeklyRevenue.some(d => d.revenue > 0) ? (
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={dashboardData.weeklyRevenue}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                 <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                 <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                 <Tooltip formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']} />
//                 <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="flex items-center justify-center h-[250px] text-muted-foreground">
//               No revenue data available
//             </div>
//           )}
//         </div>
//         <div className="bg-card rounded-xl p-6 shadow-sm">
//           <h3 className="font-semibold text-foreground mb-4">Monthly Orders</h3>
//           {dashboardData.monthlyOrders.length > 0 && dashboardData.monthlyOrders.some(d => d.orders > 0) ? (
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={dashboardData.monthlyOrders}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                 <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                 <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                 <Tooltip formatter={(value: number) => [`${value} orders`, 'Orders']} />
//                 <Line type="monotone" dataKey="orders" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="flex items-center justify-center h-[250px] text-muted-foreground">
//               No order data available
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Recent Orders Preview */}
//       {orders && orders.length > 0 && (
//         <div className="mt-8 bg-card rounded-xl p-6 shadow-sm">
//           <h3 className="font-semibold text-foreground mb-4">Recent Orders</h3>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-border">
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Order #</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Customer</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Amount</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.slice(0, 5).map((order) => (
//                   <tr key={order._id} className="border-b border-border">
//                     <td className="py-3 text-sm">{order.orderNumber}</td>
//                     <td className="py-3 text-sm">{order.customer?.name || 'N/A'}</td>
//                     <td className="py-3 text-sm">₹{order.totalAmount?.toLocaleString('en-IN') || 0}</td>
//                     <td className="py-3 text-sm">
//                       <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
//                         ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
//                           order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
//                           order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
//                           'bg-blue-100 text-blue-800'}`}>
//                         {order.status}
//                       </span>
//                     </td>
//                     <td className="py-3 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;










// import { useState, useEffect } from 'react';
// import { ShoppingCart, Clock, CheckCircle, XCircle, DollarSign, Users, FileText, TrendingUp, RefreshCw, Package } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/hooks/use-toast';
// import axiosInstance from '@/api/axios';

// // Type definitions
// interface OrderItem {
//   pages: number;
//   copies: number;
//   printColor?: 'bw' | 'color';
// }

// interface Customer {
//   name: string;
//   phone: string;
//   address?: string;
//   pincode?: string;
//   city?: string;
//   state?: string;
// }

// interface Order {
//   _id: string;
//   userId: string;
//   orderNumber: string;
//   items: OrderItem[];
//   deliveryType: 'pickup' | 'courier';
//   customer: Customer;
//   totalAmount: number;
//   finalAmount?: number;
//   discountAmount?: number;
//   paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
//   status: 'pending' | 'processing' | 'printing' | 'ready' | 'dispatched' | 'completed' | 'cancelled';
//   createdAt: string;
// }

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface DashboardData {
//   weeklyRevenue: Array<{ day: string; revenue: number }>;
//   monthlyOrders: Array<{ month: string; orders: number }>;
//   todayRevenue: number;
//   totalPages: number;
//   totalUsers: number;
// }

// const AdminDashboard: React.FC = () => {
//   const { toast } = useToast();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [dashboardData, setDashboardData] = useState<DashboardData>({
//     weeklyRevenue: [],
//     monthlyOrders: [],
//     todayRevenue: 0,
//     totalPages: 0,
//     totalUsers: 0
//   });

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   // In AdminDashboard.tsx, update the fetchDashboardData function

// const fetchDashboardData = async () => {
//   try {
//     setLoading(true);
    
//     // Fetch orders
//     console.log('Fetching orders...');
//     const ordersResponse = await axiosInstance.get('/order/admin/all');
//     console.log('Orders response:', ordersResponse.data);
    
//     if (ordersResponse.data && ordersResponse.data.success) {
//       const ordersData = ordersResponse.data.orders || [];
//       setOrders(ordersData);
//       calculateStats(ordersData);
//       toast({
//         title: 'Success',
//         description: `${ordersData.length} orders loaded`,
//       });
//     } else {
//       console.error('Invalid orders response:', ordersResponse.data);
//     }
    
//     // Fetch users stats - Using the same pattern as AdminUsers
//     try {
//       console.log('Fetching users for stats...');
//       // Fetch all users without pagination to calculate stats
//       const usersResponse = await axiosInstance.get('/users', {
//         params: {
//           limit: 10000, // Get all users for stats
//           page: 1
//         }
//       });
      
//       console.log('Users response:', usersResponse.data);
      
//       if (usersResponse.data && usersResponse.data.success) {
//         const allUsers = usersResponse.data.users || [];
//         console.log(`Total users from API: ${allUsers.length}`);
        
//         // Calculate stats
//         const totalUsers = usersResponse.data.total || allUsers.length;
//         const totalCustomers = allUsers.filter((u: any) => u.role === 'user').length;
//         const totalAdmins = allUsers.filter((u: any) => u.role === 'admin').length;
//         const totalSpending = allUsers.reduce((sum: number, u: any) => sum + (u.totalSpending || 0), 0);
//         const activeUsers = allUsers.filter((u: any) => u.isActive !== false).length;
//         const inactiveUsers = allUsers.filter((u: any) => u.isActive === false).length;
        
//         console.log(`Stats - Total: ${totalUsers}, Customers: ${totalCustomers}, Admins: ${totalAdmins}`);
//         console.log(`Spending: ₹${totalSpending}, Active: ${activeUsers}, Inactive: ${inactiveUsers}`);
        
//         // For dashboard, we only need total users (customers)
//         setDashboardData(prev => ({
//           ...prev,
//           totalUsers: totalCustomers  // Use customer count, not total users
//         }));
//       } else {
//         console.log('Users response structure:', usersResponse.data);
//         // Fallback: try to get users from different response structure
//         if (Array.isArray(usersResponse.data)) {
//           const allUsers = usersResponse.data;
//           const totalCustomers = allUsers.filter((u: any) => u.role === 'user').length;
//           setDashboardData(prev => ({
//             ...prev,
//             totalUsers: totalCustomers
//           }));
//         } else {
//           setDashboardData(prev => ({
//             ...prev,
//             totalUsers: 0
//           }));
//         }
//       }
      
//     } catch (userError: any) {
//       console.error('Error fetching users:', userError);
//       console.error('Error status:', userError.response?.status);
//       console.error('Error data:', userError.response?.data);
      
//       setDashboardData(prev => ({
//         ...prev,
//         totalUsers: 0
//       }));
//     }
    
//   } catch (error: any) {
//     console.error('Error fetching dashboard data:', error);
//     toast({
//       title: 'Error',
//       description: error.response?.data?.message || 'Failed to fetch dashboard data',
//       variant: 'destructive',
//     });
//   } finally {
//     setLoading(false);
//   }
// };

//   const calculateStats = (orders: Order[]) => {
//     const weeklyRevenueData = calculateWeeklyRevenue(orders);
//     const monthlyOrdersData = calculateMonthlyOrders(orders);
//     const todayRev = calculateTodayRevenue(orders);
//     const totalPagesPrinted = calculateTotalPages(orders);
    
//     setDashboardData(prev => ({
//       ...prev,
//       weeklyRevenue: weeklyRevenueData,
//       monthlyOrders: monthlyOrdersData,
//       todayRevenue: todayRev,
//       totalPages: totalPagesPrinted,
//     }));
//   };

//   const calculateWeeklyRevenue = (orders: Order[]) => {
//     const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//     const weekData = days.map(day => ({ day, revenue: 0 }));

//     const today = new Date();
//     const day = today.getDay();
//     const diff = today.getDate() - day + (day === 0 ? -6 : 1);

//     const startOfWeek = new Date(today.setDate(diff));
//     startOfWeek.setHours(0, 0, 0, 0);

//     orders.forEach(order => {
//       if (order.paymentStatus === 'paid') {
//         const orderDate = new Date(order.createdAt);

//         if (orderDate >= startOfWeek && orderDate <= new Date()) {
//           const index = orderDate.getDay() === 0 ? 6 : orderDate.getDay() - 1;
//           // Use finalAmount if available (discounted amount), otherwise totalAmount
//           const amount = order.finalAmount || order.totalAmount || 0;
//           weekData[index].revenue += amount;
//         }
//       }
//     });

//     console.log("Weekly Data:", weekData);

//     return weekData;
//   };

//   const calculateMonthlyOrders = (orders: Order[]): Array<{ month: string; orders: number }> => {
//     const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
//     const monthData = months.map(month => ({ month, orders: 0 }));
//     const currentYear = new Date().getFullYear();
//     const monthMap: { [key: string]: number } = {
//       'Oct': 9, 'Nov': 10, 'Dec': 11, 'Jan': 0, 'Feb': 1, 'Mar': 2
//     };
    
//     orders.forEach(order => {
//       const orderDate = new Date(order.createdAt);
//       const orderMonth = orderDate.getMonth();
//       const orderYear = orderDate.getFullYear();
      
//       const monthEntry = monthData.find(m => monthMap[m.month] === orderMonth);
//       if (monthEntry && orderYear === currentYear) {
//         monthEntry.orders += 1;
//       }
//     });
    
//     return monthData;
//   };

//   const calculateTodayRevenue = (orders: Order[]): number => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     const todayOrders = orders.filter(order => {
//       const orderDate = new Date(order.createdAt);
//       orderDate.setHours(0, 0, 0, 0);
//       return orderDate.getTime() === today.getTime() && order.paymentStatus === 'paid';
//     });
    
//     return todayOrders.reduce((sum, order) => sum + (order.finalAmount || order.totalAmount || 0), 0);
//   };

//   const calculateTotalPages = (orders: Order[]): number => {
//     let totalPages = 0;
    
//     orders.forEach(order => {
//       if (order.status === 'completed' && order.items) {
//         order.items.forEach(item => {
//           const pagesPerCopy = item.pages || 0;
//           const copies = item.copies || 1;
//           totalPages += pagesPerCopy * copies;
//         });
//       }
//     });
    
//     return totalPages;
//   };

//   const getOrderStatusCount = (status: Order['status']): number => {
//     return orders.filter(o => o.status === status).length;
//   };

//   // Calculate total orders (all orders except cancelled)
//   const getTotalOrders = (): number => {
//     return orders.filter(o => o.status !== 'cancelled').length;
//   };

//   // Calculate total revenue (from paid orders)
//   const getTotalRevenue = (): number => {
//     return orders
//       .filter(o => o.paymentStatus === 'paid')
//       .reduce((sum, o) => sum + (o.finalAmount || o.totalAmount || 0), 0);
//   };

//   const stats = [
//     { 
//       label: 'Total Orders', 
//       value: getTotalOrders().toLocaleString(), 
//       icon: Package, 
//       color: 'text-indigo-500' 
//     },
//     { 
//       label: 'Pending', 
//       value: getOrderStatusCount('pending'), 
//       icon: ShoppingCart, 
//       color: 'text-blue-500' 
//     },
//     { 
//       label: 'Processing', 
//       value: getOrderStatusCount('processing'), 
//       icon: Clock, 
//       color: 'text-yellow-500' 
//     },
//     { 
//       label: 'Completed', 
//       value: getOrderStatusCount('completed'), 
//       icon: CheckCircle, 
//       color: 'text-green-500' 
//     },
//     { 
//       label: 'Cancelled', 
//       value: getOrderStatusCount('cancelled'), 
//       icon: XCircle, 
//       color: 'text-red-500' 
//     },
//     { 
//       label: 'Total Revenue', 
//       value: `₹${getTotalRevenue().toLocaleString('en-IN')}`, 
//       icon: DollarSign, 
//       color: 'text-primary' 
//     },
//     { 
//       label: "Today's Revenue", 
//       value: `₹${dashboardData.todayRevenue.toLocaleString('en-IN')}`, 
//       icon: TrendingUp, 
//       color: 'text-primary' 
//     },
//     { 
//       label: 'Total Users', 
//       value: dashboardData.totalUsers.toLocaleString(), 
//       icon: Users, 
//       color: 'text-purple-500' 
//     },
//     { 
//       label: 'Pages Printed', 
//       value: dashboardData.totalPages.toLocaleString(), 
//       icon: FileText, 
//       color: 'text-orange-500' 
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
//         <Button onClick={fetchDashboardData} variant="outline" size="sm">
//           <RefreshCw className="h-4 w-4 mr-2" />
//           Refresh
//         </Button>
//       </div>

//       {/* Stats Grid - 3 columns on mobile, 5 on desktop */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
//         {stats.map((s, index) => (
//           <div key={index} className="bg-card rounded-xl p-4 shadow-sm border border-border">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
//               <s.icon className={`h-5 w-5 ${s.color}`} />
//             </div>
//             <p className="text-2xl font-bold text-foreground">{s.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
//           <h3 className="font-semibold text-foreground mb-4">Weekly Revenue</h3>
//           {dashboardData.weeklyRevenue.length > 0 && dashboardData.weeklyRevenue.some(d => d.revenue > 0) ? (
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={dashboardData.weeklyRevenue}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                 <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                 <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                 <Tooltip formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']} />
//                 <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="flex items-center justify-center h-[250px] text-muted-foreground">
//               No revenue data available
//             </div>
//           )}
//         </div>
//         <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
//           <h3 className="font-semibold text-foreground mb-4">Monthly Orders</h3>
//           {dashboardData.monthlyOrders.length > 0 && dashboardData.monthlyOrders.some(d => d.orders > 0) ? (
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={dashboardData.monthlyOrders}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                 <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                 <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                 <Tooltip formatter={(value: number) => [`${value} orders`, 'Orders']} />
//                 <Line type="monotone" dataKey="orders" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="flex items-center justify-center h-[250px] text-muted-foreground">
//               No order data available
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Recent Orders Preview */}
//       {orders && orders.length > 0 && (
//         <div className="mt-8 bg-card rounded-xl p-6 shadow-sm border border-border">
//           <h3 className="font-semibold text-foreground mb-4">Recent Orders</h3>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-border">
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Order #</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Customer</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Amount</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Discount</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Paid</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.slice(0, 10).map((order) => {
//                   const originalAmount = order.totalAmount || 0;
//                   const discountedAmount = order.finalAmount || originalAmount;
//                   const discountAmount = order.discountAmount || (originalAmount - discountedAmount);
                  
//                   return (
//                     <tr key={order._id} className="border-b border-border hover:bg-muted/50 transition-colors">
//                       <td className="py-3 text-sm font-medium">{order.orderNumber}</td>
//                       <td className="py-3 text-sm">{order.customer?.name || 'N/A'}</td>
//                       <td className="py-3 text-sm text-muted-foreground line-through">
//                         {originalAmount > discountedAmount ? `₹${originalAmount.toLocaleString('en-IN')}` : ''}
//                       </td>
//                       <td className="py-3 text-sm text-green-600">
//                         {discountAmount > 0 ? `-₹${discountAmount.toLocaleString('en-IN')}` : '-'}
//                       </td>
//                       <td className="py-3 text-sm font-semibold">₹{discountedAmount.toLocaleString('en-IN')}</td>
//                       <td className="py-3 text-sm">
//                         <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
//                           ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
//                             order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
//                             order.status === 'printing' ? 'bg-purple-100 text-purple-800' :
//                             order.status === 'ready' ? 'bg-blue-100 text-blue-800' :
//                             order.status === 'dispatched' ? 'bg-indigo-100 text-indigo-800' :
//                             order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
//                             'bg-gray-100 text-gray-800'}`}>
//                           {order.status}
//                         </span>
//                        </td>
//                       <td className="py-3 text-sm text-muted-foreground">
//                         {new Date(order.createdAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;







// import { useState, useEffect } from 'react';
// import { ShoppingCart, Clock, CheckCircle, XCircle, DollarSign, Users, FileText, TrendingUp, RefreshCw, Package } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/hooks/use-toast';
// import axiosInstance from '@/api/axios';

// // Type definitions
// interface OrderItem {
//   pages: number;
//   copies: number;
//   printColor?: 'bw' | 'color';
// }

// interface Customer {
//   name: string;
//   phone: string;
//   address?: string;
//   pincode?: string;
//   city?: string;
//   state?: string;
// }

// interface Order {
//   _id: string;
//   userId: string;
//   orderNumber: string;
//   items: OrderItem[];
//   deliveryType: 'pickup' | 'courier';
//   customer: Customer;
//   totalAmount: number;
//   finalAmount?: number;
//   discountAmount?: number;
//   paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
//   status: 'pending' | 'processing' | 'printing' | 'ready' | 'dispatched' | 'completed' | 'cancelled';
//   createdAt: string;
// }

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface DashboardData {
//   weeklyRevenue: Array<{ day: string; revenue: number }>;
//   monthlyOrders: Array<{ month: string; orders: number }>;
//   todayRevenue: number;
//   totalPages: number;
//   totalUsers: number;
// }

// const AdminDashboard: React.FC = () => {
//   const { toast } = useToast();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [dashboardData, setDashboardData] = useState<DashboardData>({
//     weeklyRevenue: [],
//     monthlyOrders: [],
//     todayRevenue: 0,
//     totalPages: 0,
//     totalUsers: 0
//   });

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch orders
//       console.log('Fetching orders...');
//       const ordersResponse = await axiosInstance.get('/order/admin/all');
//       console.log('Orders response:', ordersResponse.data);
      
//       if (ordersResponse.data && ordersResponse.data.success) {
//         const ordersData = ordersResponse.data.orders || [];
//         setOrders(ordersData);
//         calculateStats(ordersData);
//         toast({
//           title: 'Success',
//           description: `${ordersData.length} orders loaded`,
//         });
//       } else {
//         console.error('Invalid orders response:', ordersResponse.data);
//       }
      
//       // Fetch users stats - Using the same pattern as AdminUsers
//       try {
//         console.log('Fetching users for stats...');
//         // Fetch all users without pagination to calculate stats
//         const usersResponse = await axiosInstance.get('/users', {
//           params: {
//             limit: 10000, // Get all users for stats
//             page: 1
//           }
//         });
        
//         console.log('Users response:', usersResponse.data);
        
//         if (usersResponse.data && usersResponse.data.success) {
//           const allUsers = usersResponse.data.users || [];
//           console.log(`Total users from API: ${allUsers.length}`);
          
//           // Calculate stats
//           const totalUsers = usersResponse.data.total || allUsers.length;
//           const totalCustomers = allUsers.filter((u: any) => u.role === 'user').length;
//           const totalAdmins = allUsers.filter((u: any) => u.role === 'admin').length;
//           const totalSpending = allUsers.reduce((sum: number, u: any) => sum + (u.totalSpending || 0), 0);
//           const activeUsers = allUsers.filter((u: any) => u.isActive !== false).length;
//           const inactiveUsers = allUsers.filter((u: any) => u.isActive === false).length;
          
//           console.log(`Stats - Total: ${totalUsers}, Customers: ${totalCustomers}, Admins: ${totalAdmins}`);
//           console.log(`Spending: ₹${totalSpending}, Active: ${activeUsers}, Inactive: ${inactiveUsers}`);
          
//           // For dashboard, we only need total users (customers)
//           setDashboardData(prev => ({
//             ...prev,
//             totalUsers: totalCustomers  // Use customer count, not total users
//           }));
//         } else {
//           console.log('Users response structure:', usersResponse.data);
//           // Fallback: try to get users from different response structure
//           if (Array.isArray(usersResponse.data)) {
//             const allUsers = usersResponse.data;
//             const totalCustomers = allUsers.filter((u: any) => u.role === 'user').length;
//             setDashboardData(prev => ({
//               ...prev,
//               totalUsers: totalCustomers
//             }));
//           } else {
//             setDashboardData(prev => ({
//               ...prev,
//               totalUsers: 0
//             }));
//           }
//         }
        
//       } catch (userError: any) {
//         console.error('Error fetching users:', userError);
//         console.error('Error status:', userError.response?.status);
//         console.error('Error data:', userError.response?.data);
        
//         setDashboardData(prev => ({
//           ...prev,
//           totalUsers: 0
//         }));
//       }
      
//     } catch (error: any) {
//       console.error('Error fetching dashboard data:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Failed to fetch dashboard data',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateStats = (orders: Order[]) => {
//     const weeklyRevenueData = calculateWeeklyRevenue(orders);
//     const monthlyOrdersData = calculateMonthlyOrders(orders);
//     const todayRev = calculateTodayRevenue(orders);
//     const totalPagesPrinted = calculateTotalPages(orders);
    
//     setDashboardData(prev => ({
//       ...prev,
//       weeklyRevenue: weeklyRevenueData,
//       monthlyOrders: monthlyOrdersData,
//       todayRevenue: todayRev,
//       totalPages: totalPagesPrinted,
//     }));
//   };

//   const calculateWeeklyRevenue = (orders: Order[]) => {
//     const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//     const weekData = days.map(day => ({ day, revenue: 0 }));

//     const today = new Date();
//     const day = today.getDay();
//     const diff = today.getDate() - day + (day === 0 ? -6 : 1);

//     const startOfWeek = new Date(today.setDate(diff));
//     startOfWeek.setHours(0, 0, 0, 0);

//     orders.forEach(order => {
//       if (order.paymentStatus === 'paid') {
//         const orderDate = new Date(order.createdAt);

//         if (orderDate >= startOfWeek && orderDate <= new Date()) {
//           const index = orderDate.getDay() === 0 ? 6 : orderDate.getDay() - 1;
//           // Use finalAmount if available (discounted amount), otherwise totalAmount
//           const amount = order.finalAmount || order.totalAmount || 0;
//           weekData[index].revenue += amount;
//         }
//       }
//     });

//     console.log("Weekly Data:", weekData);

//     return weekData;
//   };

//   const calculateMonthlyOrders = (orders: Order[]): Array<{ month: string; orders: number }> => {
//     const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
//     const monthData = months.map(month => ({ month, orders: 0 }));
//     const currentYear = new Date().getFullYear();
//     const monthMap: { [key: string]: number } = {
//       'Oct': 9, 'Nov': 10, 'Dec': 11, 'Jan': 0, 'Feb': 1, 'Mar': 2
//     };
    
//     orders.forEach(order => {
//       const orderDate = new Date(order.createdAt);
//       const orderMonth = orderDate.getMonth();
//       const orderYear = orderDate.getFullYear();
      
//       const monthEntry = monthData.find(m => monthMap[m.month] === orderMonth);
//       if (monthEntry && orderYear === currentYear) {
//         monthEntry.orders += 1;
//       }
//     });
    
//     return monthData;
//   };

//   const calculateTodayRevenue = (orders: Order[]): number => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     const todayOrders = orders.filter(order => {
//       const orderDate = new Date(order.createdAt);
//       orderDate.setHours(0, 0, 0, 0);
//       return orderDate.getTime() === today.getTime() && order.paymentStatus === 'paid';
//     });
    
//     return todayOrders.reduce((sum, order) => sum + (order.finalAmount || order.totalAmount || 0), 0);
//   };

//   const calculateTotalPages = (orders: Order[]): number => {
//     let totalPages = 0;
    
//     orders.forEach(order => {
//       if (order.status === 'completed' && order.items) {
//         order.items.forEach(item => {
//           const pagesPerCopy = item.pages || 0;
//           const copies = item.copies || 1;
//           totalPages += pagesPerCopy * copies;
//         });
//       }
//     });
    
//     return totalPages;
//   };

//   const getOrderStatusCount = (status: Order['status']): number => {
//     return orders.filter(o => o.status === status).length;
//   };

//   // Calculate total orders (all orders except cancelled)
//   const getTotalOrders = (): number => {
//     return orders.filter(o => o.status !== 'cancelled').length;
//   };

//   // Calculate total revenue (from paid orders)
//   const getTotalRevenue = (): number => {
//     return orders
//       .filter(o => o.paymentStatus === 'paid')
//       .reduce((sum, o) => sum + (o.finalAmount || o.totalAmount || 0), 0);
//   };

//   const stats = [
//     { 
//       label: 'Total Orders', 
//       value: getTotalOrders().toLocaleString(), 
//       icon: Package, 
//       color: 'text-indigo-500' 
//     },
//     { 
//       label: 'Pending', 
//       value: getOrderStatusCount('pending'), 
//       icon: ShoppingCart, 
//       color: 'text-blue-500' 
//     },
//     { 
//       label: 'Processing', 
//       value: getOrderStatusCount('processing'), 
//       icon: Clock, 
//       color: 'text-yellow-500' 
//     },
//     { 
//       label: 'Completed', 
//       value: getOrderStatusCount('completed'), 
//       icon: CheckCircle, 
//       color: 'text-green-500' 
//     },
//     { 
//       label: 'Cancelled', 
//       value: getOrderStatusCount('cancelled'), 
//       icon: XCircle, 
//       color: 'text-red-500' 
//     },
//     { 
//       label: 'Total Revenue', 
//       value: `₹${getTotalRevenue().toLocaleString('en-IN')}`, 
//       icon: DollarSign, 
//       color: 'text-primary' 
//     },
//     { 
//       label: "Today's Revenue", 
//       value: `₹${dashboardData.todayRevenue.toLocaleString('en-IN')}`, 
//       icon: TrendingUp, 
//       color: 'text-primary' 
//     },
//     { 
//       label: 'Total Users', 
//       value: dashboardData.totalUsers.toLocaleString(), 
//       icon: Users, 
//       color: 'text-purple-500' 
//     },
//     { 
//       label: 'Pages Printed', 
//       value: dashboardData.totalPages.toLocaleString(), 
//       icon: FileText, 
//       color: 'text-orange-500' 
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
//         <Button onClick={fetchDashboardData} variant="outline" size="sm">
//           <RefreshCw className="h-4 w-4 mr-2" />
//           Refresh
//         </Button>
//       </div>

//       {/* Stats Grid - 3 columns on mobile, 5 on desktop */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
//         {stats.map((s, index) => (
//           <div key={index} className="bg-card rounded-xl p-4 shadow-sm border border-border">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
//               <s.icon className={`h-5 w-5 ${s.color}`} />
//             </div>
//             <p className="text-2xl font-bold text-foreground">{s.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
//           <h3 className="font-semibold text-foreground mb-4">Weekly Revenue</h3>
//           {dashboardData.weeklyRevenue.length > 0 && dashboardData.weeklyRevenue.some(d => d.revenue > 0) ? (
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={dashboardData.weeklyRevenue}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                 <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                 <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                 <Tooltip formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']} />
//                 <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="flex items-center justify-center h-[250px] text-muted-foreground">
//               No revenue data available
//             </div>
//           )}
//         </div>
//         <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
//           <h3 className="font-semibold text-foreground mb-4">Monthly Orders</h3>
//           {dashboardData.monthlyOrders.length > 0 && dashboardData.monthlyOrders.some(d => d.orders > 0) ? (
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={dashboardData.monthlyOrders}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                 <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                 <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                 <Tooltip formatter={(value: number) => [`${value} orders`, 'Orders']} />
//                 <Line type="monotone" dataKey="orders" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="flex items-center justify-center h-[250px] text-muted-foreground">
//               No order data available
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Recent Orders Preview */}
//       {orders && orders.length > 0 && (
//         <div className="mt-8 bg-card rounded-xl p-6 shadow-sm border border-border">
//           <h3 className="font-semibold text-foreground mb-4">Recent Orders</h3>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-border">
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Order #</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Customer</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Original Amount</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Discount</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Final Amount</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Order Status</th>
//                   <th className="text-left py-3 text-sm font-medium text-muted-foreground">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.slice(0, 10).map((order) => {
//                   const originalAmount = order.totalAmount || 0;
//                   const discountedAmount = order.finalAmount || originalAmount;
//                   const discountAmount = order.discountAmount || (originalAmount - discountedAmount);
//                   const hasDiscount = discountAmount > 0;
                  
//                   return (
//                     <tr key={order._id} className="border-b border-border hover:bg-muted/50 transition-colors">
//                       <td className="py-3 text-sm font-medium">{order.orderNumber}</td>
//                       <td className="py-3 text-sm">{order.customer?.name || 'N/A'}</td>
//                       <td className="py-3 text-sm">
//                         {hasDiscount ? (
//                           <span className="text-muted-foreground line-through">
//                             ₹{originalAmount.toLocaleString('en-IN')}
//                           </span>
//                         ) : (
//                           <span>₹{originalAmount.toLocaleString('en-IN')}</span>
//                         )}
//                       </td>
//                       <td className="py-3 text-sm text-green-600">
//                         {hasDiscount ? `-₹${discountAmount.toLocaleString('en-IN')}` : '-'}
//                       </td>
//                       <td className="py-3 text-sm font-semibold">₹{discountedAmount.toLocaleString('en-IN')}</td>
//                       <td className="py-3 text-sm">
//                         <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
//                           ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
//                             order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
//                             order.status === 'printing' ? 'bg-purple-100 text-purple-800' :
//                             order.status === 'ready' ? 'bg-blue-100 text-blue-800' :
//                             order.status === 'dispatched' ? 'bg-indigo-100 text-indigo-800' :
//                             order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
//                             'bg-gray-100 text-gray-800'}`}>
//                           {order.status}
//                         </span>
//                       </td>
//                       <td className="py-3 text-sm text-muted-foreground">
//                         {new Date(order.createdAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;






import { useState, useEffect } from 'react';
import { ShoppingCart, Clock, CheckCircle, XCircle, DollarSign, Users, FileText, TrendingUp, RefreshCw, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/api/axios';

// Type definitions
interface OrderItem {
  pages: number;
  copies: number;
  printColor?: 'bw' | 'color';
}

interface Customer {
  name: string;
  phone: string;
  address?: string;
  pincode?: string;
  city?: string;
  state?: string;
}

interface Order {
  _id: string;
  userId: string;
  orderNumber: string;
  items: OrderItem[];
  deliveryType: 'pickup' | 'courier';
  customer: Customer;
  totalAmount: number;
  finalAmount?: number;
  discountAmount?: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  status: 'pending' | 'processing' | 'printing' | 'ready' | 'dispatched' | 'completed' | 'cancelled';
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface DashboardData {
  weeklyRevenue: Array<{ day: string; revenue: number }>;
  monthlyOrders: Array<{ month: string; orders: number }>;
  todayRevenue: number;
  totalPages: number;
  totalUsers: number;
}

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    weeklyRevenue: [],
    monthlyOrders: [],
    todayRevenue: 0,
    totalPages: 0,
    totalUsers: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch orders
      console.log('Fetching orders...');
      const ordersResponse = await axiosInstance.get('/order/admin/all');
      console.log('Orders response:', ordersResponse.data);
      
      if (ordersResponse.data && ordersResponse.data.success) {
        const ordersData = ordersResponse.data.orders || [];
        setOrders(ordersData);
        calculateStats(ordersData);
        toast({
          title: 'Success',
          description: `${ordersData.length} orders loaded`,
        });
      } else {
        console.error('Invalid orders response:', ordersResponse.data);
      }
      
      // Fetch users stats
      try {
        console.log('Fetching users for stats...');
        const usersResponse = await axiosInstance.get('/users', {
          params: {
            limit: 10000,
            page: 1
          }
        });
        
        console.log('Users response:', usersResponse.data);
        
        if (usersResponse.data && usersResponse.data.success) {
          const allUsers = usersResponse.data.users || [];
          const totalCustomers = allUsers.filter((u: any) => u.role === 'user').length;
          
          setDashboardData(prev => ({
            ...prev,
            totalUsers: totalCustomers
          }));
        } else {
          if (Array.isArray(usersResponse.data)) {
            const allUsers = usersResponse.data;
            const totalCustomers = allUsers.filter((u: any) => u.role === 'user').length;
            setDashboardData(prev => ({
              ...prev,
              totalUsers: totalCustomers
            }));
          } else {
            setDashboardData(prev => ({
              ...prev,
              totalUsers: 0
            }));
          }
        }
        
      } catch (userError: any) {
        console.error('Error fetching users:', userError);
        setDashboardData(prev => ({
          ...prev,
          totalUsers: 0
        }));
      }
      
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (orders: Order[]) => {
    const weeklyRevenueData = calculateWeeklyRevenue(orders);
    const monthlyOrdersData = calculateMonthlyOrders(orders);
    const todayRev = calculateTodayRevenue(orders);
    const totalPagesPrinted = calculateTotalPages(orders);
    
    setDashboardData(prev => ({
      ...prev,
      weeklyRevenue: weeklyRevenueData,
      monthlyOrders: monthlyOrdersData,
      todayRevenue: todayRev,
      totalPages: totalPagesPrinted,
    }));
  };

  const calculateWeeklyRevenue = (orders: Order[]) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekData = days.map(day => ({ day, revenue: 0 }));

    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);

    const startOfWeek = new Date(today.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);

    orders.forEach(order => {
      if (order.paymentStatus === 'paid') {
        const orderDate = new Date(order.createdAt);

        if (orderDate >= startOfWeek && orderDate <= new Date()) {
          const index = orderDate.getDay() === 0 ? 6 : orderDate.getDay() - 1;
          const amount = order.finalAmount || order.totalAmount || 0;
          weekData[index].revenue += amount;
        }
      }
    });

    return weekData;
  };

  // ✅ FIXED: Rolling 6 months (including current month? Exclude current partial month)
  const calculateMonthlyOrders = (orders: Order[]): Array<{ month: string; orders: number }> => {
    const result: Array<{ month: string; orders: number }> = [];
    const now = new Date();

    // Generate last 6 full months (excluding current month if it's partial)
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleString('default', { month: 'short' }); // "Jan", "Feb", etc.
      result.push({ month: monthName, orders: 0 });
    }

    // Count orders by month/year
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const orderYear = orderDate.getFullYear();
      const orderMonth = orderDate.getMonth();

      // Find matching month in our result array
      const targetDate = new Date(orderYear, orderMonth, 1);
      const targetMonthName = targetDate.toLocaleString('default', { month: 'short' });
      
      const matchingIndex = result.findIndex(item => {
        // Compare both month name and year (to handle year boundaries)
        const itemDate = new Date(orderYear, orderMonth, 1);
        const itemMonthName = itemDate.toLocaleString('default', { month: 'short' });
        return item.month === itemMonthName && orderYear === itemDate.getFullYear();
      });
      
      if (matchingIndex !== -1) {
        result[matchingIndex].orders += 1;
      }
    });

    return result;
  };

  const calculateTodayRevenue = (orders: Order[]): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime() && order.paymentStatus === 'paid';
    });
    
    return todayOrders.reduce((sum, order) => sum + (order.finalAmount || order.totalAmount || 0), 0);
  };

  const calculateTotalPages = (orders: Order[]): number => {
    let totalPages = 0;
    
    orders.forEach(order => {
      if (order.status === 'completed' && order.items) {
        order.items.forEach(item => {
          const pagesPerCopy = item.pages || 0;
          const copies = item.copies || 1;
          totalPages += pagesPerCopy * copies;
        });
      }
    });
    
    return totalPages;
  };

  const getOrderStatusCount = (status: Order['status']): number => {
    return orders.filter(o => o.status === status).length;
  };

  const getTotalOrders = (): number => {
    return orders.filter(o => o.status !== 'cancelled').length;
  };

  const getTotalRevenue = (): number => {
    return orders
      .filter(o => o.paymentStatus === 'paid')
      .reduce((sum, o) => sum + (o.finalAmount || o.totalAmount || 0), 0);
  };

  const stats = [
    { 
      label: 'Total Orders', 
      value: getTotalOrders().toLocaleString(), 
      icon: Package, 
      color: 'text-indigo-500' 
    },
    { 
      label: 'Pending', 
      value: getOrderStatusCount('pending'), 
      icon: ShoppingCart, 
      color: 'text-blue-500' 
    },
    { 
      label: 'Processing', 
      value: getOrderStatusCount('processing'), 
      icon: Clock, 
      color: 'text-yellow-500' 
    },
    { 
      label: 'Completed', 
      value: getOrderStatusCount('completed'), 
      icon: CheckCircle, 
      color: 'text-green-500' 
    },
    { 
      label: 'Cancelled', 
      value: getOrderStatusCount('cancelled'), 
      icon: XCircle, 
      color: 'text-red-500' 
    },
    { 
      label: 'Total Revenue', 
      value: `₹${getTotalRevenue().toLocaleString('en-IN')}`, 
      icon: DollarSign, 
      color: 'text-primary' 
    },
    { 
      label: "Today's Revenue", 
      value: `₹${dashboardData.todayRevenue.toLocaleString('en-IN')}`, 
      icon: TrendingUp, 
      color: 'text-primary' 
    },
    { 
      label: 'Total Users', 
      value: dashboardData.totalUsers.toLocaleString(), 
      icon: Users, 
      color: 'text-purple-500' 
    },
    { 
      label: 'Pages Printed', 
      value: dashboardData.totalPages.toLocaleString(), 
      icon: FileText, 
      color: 'text-orange-500' 
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <Button onClick={fetchDashboardData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s, index) => (
          <div key={index} className="bg-card rounded-xl p-4 shadow-sm border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h3 className="font-semibold text-foreground mb-4">Weekly Revenue</h3>
          {dashboardData.weeklyRevenue.length > 0 && dashboardData.weeklyRevenue.some(d => d.revenue > 0) ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dashboardData.weeklyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-muted-foreground">
              No revenue data available
            </div>
          )}
        </div>
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h3 className="font-semibold text-foreground mb-4">Monthly Orders (Last 6 Months)</h3>
          {dashboardData.monthlyOrders.length > 0 && dashboardData.monthlyOrders.some(d => d.orders > 0) ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dashboardData.monthlyOrders}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip formatter={(value: number) => [`${value} orders`, 'Orders']} />
                <Line type="monotone" dataKey="orders" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-muted-foreground">
              No order data available
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders Preview */}
      {orders && orders.length > 0 && (
        <div className="mt-8 bg-card rounded-xl p-6 shadow-sm border border-border">
          <h3 className="font-semibold text-foreground mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">Order #</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">Original Amount</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">Discount</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">Final Amount</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">Order Status</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order) => {
                  const originalAmount = order.totalAmount || 0;
                  const discountedAmount = order.finalAmount || originalAmount;
                  const discountAmount = order.discountAmount || (originalAmount - discountedAmount);
                  const hasDiscount = discountAmount > 0;
                  
                  return (
                    <tr key={order._id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 text-sm font-medium">{order.orderNumber}</td>
                      <td className="py-3 text-sm">{order.customer?.name || 'N/A'}</td>
                      <td className="py-3 text-sm">
                        {hasDiscount ? (
                          <span className="text-muted-foreground line-through">
                            ₹{originalAmount.toLocaleString('en-IN')}
                          </span>
                        ) : (
                          <span>₹{originalAmount.toLocaleString('en-IN')}</span>
                        )}
                      </td>
                      <td className="py-3 text-sm text-green-600">
                        {hasDiscount ? `-₹${discountAmount.toLocaleString('en-IN')}` : '-'}
                      </td>
                      <td className="py-3 text-sm font-semibold">₹{discountedAmount.toLocaleString('en-IN')}</td>
                      <td className="py-3 text-sm">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                          ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'printing' ? 'bg-purple-100 text-purple-800' :
                            order.status === 'ready' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'dispatched' ? 'bg-indigo-100 text-indigo-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
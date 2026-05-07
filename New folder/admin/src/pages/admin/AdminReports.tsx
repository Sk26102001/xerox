// import { useApp } from '@/context/AppContext';

// const AdminReports = () => {
//   const { orders, users } = useApp();

//   const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((s, o) => s + o.totalCost, 0);
//   const bwOrders = orders.filter(o => o.printType === 'bw').length;
//   const colorOrders = orders.filter(o => o.printType === 'color').length;

//   const topUsers = [...users]
//     .filter(u => u.role === 'user')
//     .sort((a, b) => b.totalSpending - a.totalSpending)
//     .slice(0, 5);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-foreground mb-6">Reports</h1>

//       {/* Revenue Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <div className="bg-card rounded-xl p-6 shadow-sm text-center">
//           <p className="text-muted-foreground text-sm mb-1">Total Revenue</p>
//           <p className="text-3xl font-bold text-primary">₹{totalRevenue.toFixed(0)}</p>
//         </div>
//         <div className="bg-card rounded-xl p-6 shadow-sm text-center">
//           <p className="text-muted-foreground text-sm mb-1">Total Orders</p>
//           <p className="text-3xl font-bold text-foreground">{orders.length}</p>
//         </div>
//         <div className="bg-card rounded-xl p-6 shadow-sm text-center">
//           <p className="text-muted-foreground text-sm mb-1">Avg Order Value</p>
//           <p className="text-3xl font-bold text-foreground">₹{orders.length ? (totalRevenue / orders.length).toFixed(0) : 0}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Print Types */}
//         <div className="bg-card rounded-xl p-6 shadow-sm">
//           <h2 className="font-semibold text-foreground mb-4">Most Ordered Print Types</h2>
//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <span>B&W Prints</span>
//               <div className="flex items-center gap-2">
//                 <div className="w-32 h-3 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${(bwOrders / orders.length) * 100}%` }} /></div>
//                 <span className="text-sm font-semibold">{bwOrders}</span>
//               </div>
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Color Prints</span>
//               <div className="flex items-center gap-2">
//                 <div className="w-32 h-3 bg-muted rounded-full overflow-hidden"><div className="h-full bg-cyan-dark rounded-full" style={{ width: `${(colorOrders / orders.length) * 100}%` }} /></div>
//                 <span className="text-sm font-semibold">{colorOrders}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Top Users */}
//         <div className="bg-card rounded-xl p-6 shadow-sm">
//           <h2 className="font-semibold text-foreground mb-4">Most Active Users</h2>
//           <div className="space-y-3">
//             {topUsers.map((user, i) => (
//               <div key={user.id} className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{i + 1}</span>
//                   <div><p className="font-medium text-sm">{user.name}</p><p className="text-xs text-muted-foreground">{user.totalOrders} orders</p></div>
//                 </div>
//                 <span className="font-semibold text-primary">₹{user.totalSpending.toFixed(0)}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminReports;









// import { useState, useEffect } from 'react';
// import { Loader2, TrendingUp, Package, Users, DollarSign, Printer,Wallet, FileText } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import axiosInstance from '@/api/axios';

// interface Order {
//   _id: string;
//   orderNumber: string;
//   totalAmount: number;
//   paymentStatus: string;
//   status: string;
//   createdAt: string;
//   items: any[];
//   deliveryType: string;
// }

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
//   totalOrders: number;
//   totalSpending: number;
//   createdAt: string;
//   isActive: boolean;
// }

// interface DashboardStats {
//   totalRevenue: number;
//   totalOrders: number;
//   avgOrderValue: number;
//   totalUsers: number;
//   totalCustomers: number;
//   totalAdmins: number;
//   pendingOrders: number;
//   completedOrders: number;
//   cancelledOrders: number;
// }

// const AdminReports = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState<DashboardStats>({
//     totalRevenue: 0,
//     totalOrders: 0,
//     avgOrderValue: 0,
//     totalUsers: 0,
//     totalCustomers: 0,
//     totalAdmins: 0,
//     pendingOrders: 0,
//     completedOrders: 0,
//     cancelledOrders: 0
//   });
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast({
//           title: 'Error',
//           description: 'Authentication required',
//           variant: 'destructive',
//         });
//         return;
//       }

//       // Fetch orders
//       const ordersResponse = await axiosInstance.get('/order/admin/all');
      
//       // Fetch users
//       const usersResponse = await axiosInstance.get('/users', {
//         params: {
//           limit: 1000,
//           page: 1
//         }
//       });

//       let ordersData: Order[] = [];
//       let usersData: User[] = [];

//       if (ordersResponse.data && ordersResponse.data.success) {
//         ordersData = ordersResponse.data.orders;
//         setOrders(ordersData);
//       }

//       if (usersResponse.data && usersResponse.data.success) {
//         usersData = usersResponse.data.users;
//         setUsers(usersData);
//       }

//       // Calculate statistics
//       const paidOrders = ordersData.filter(o => o.paymentStatus === 'paid');
//       const totalRevenue = paidOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
//       const totalOrders = ordersData.length;
//       const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      
//       const totalUsers = usersData.length;
//       const totalCustomers = usersData.filter(u => u.role === 'user').length;
//       const totalAdmins = usersData.filter(u => u.role === 'admin').length;
      
//       const pendingOrders = ordersData.filter(o => o.status === 'pending').length;
//       const completedOrders = ordersData.filter(o => o.status === 'completed').length;
//       const cancelledOrders = ordersData.filter(o => o.status === 'cancelled').length;

//       setStats({
//         totalRevenue,
//         totalOrders,
//         avgOrderValue,
//         totalUsers,
//         totalCustomers,
//         totalAdmins,
//         pendingOrders,
//         completedOrders,
//         cancelledOrders
//       });

//     } catch (error: any) {
//       console.error('Error fetching data:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Failed to fetch report data',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate print type statistics
//   const getPrintTypeStats = () => {
//     let bwCount = 0;
//     let colorCount = 0;

//     let  orderModeCount = 0;
   
    
//     orders.forEach(order => {
//       order.items?.forEach(item => {
//         if (item.printColor === 'bw') {
//           bwCount++;
//         } else if (item.printColor === 'color') {
//           colorCount++;
//         }
//          else if (item.printOrder === 'single') {
//           orderModeCount++;
//         }
//          else if (item.printOrder === 'bulk') {
//           orderModeCount++;
//         }
//       });
//     });
    
//     const total = bwCount + colorCount + orderModeCount;
//     return {
//       bwCount,
//       colorCount,
    
//       orderModeCount,
//       bwPercentage: total > 0 ? (bwCount / total) * 100 : 0,
//       colorPercentage: total > 0 ? (colorCount / total) * 100 : 0,
     
    
//       orderModePercentage: total > 0 ? (orderModeCount / total) * 100 : 0
//     };
//   };

//   // Get top 5 most active users
//   const getTopUsers = () => {
//     return [...users]
//       .filter(u => u.role === 'user')
//       .sort((a, b) => b.totalSpending - a.totalSpending)
//       .slice(0, 5);
//   };

//   const printStats = getPrintTypeStats();
//   const topUsers = getTopUsers();

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center">
//           <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
//           <p className="text-muted-foreground">Loading reports...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
//         <button
//           onClick={fetchData}
//           disabled={loading}
//           className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2"
//         >
//           <Loader2 className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
//           Refresh Data
//         </button>
//       </div>

//       {/* Revenue Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <div className="bg-card rounded-xl p-6 shadow-sm text-center border border-border">
//           <div className="flex items-center justify-center mb-2">
//             <Wallet className="h-8 w-8 text-primary" />
//           </div>
//           <p className="text-muted-foreground text-sm mb-1">Total Revenue</p>
//           <p className="text-3xl font-bold text-primary">₹{stats.totalRevenue.toLocaleString('en-IN')}</p>
//           <p className="text-xs text-muted-foreground mt-1">From paid orders</p>
//         </div>
        
//         <div className="bg-card rounded-xl p-6 shadow-sm text-center border border-border">
//           <div className="flex items-center justify-center mb-2">
//             <Package className="h-8 w-8 text-primary" />
//           </div>
//           <p className="text-muted-foreground text-sm mb-1">Total Orders</p>
//           <p className="text-3xl font-bold text-foreground">{stats.totalOrders}</p>
//           <div className="flex justify-center gap-4 mt-1 text-xs">
//             {/* <span className="text-green-600">✓ {stats.completedOrders} completed</span>
//             <span className="text-yellow-600">⏳ {stats.pendingOrders} pending</span>
//             <span className="text-red-600">✗ {stats.cancelledOrders} cancelled</span> */}
//           </div>
//         </div>

 
        
//         <div className="bg-card rounded-xl p-6 shadow-sm text-center border border-border">
//           <div className="flex items-center justify-center mb-2">
//             <Users className="h-8 w-8 text-primary" />
//           </div>
//             <p className="text-muted-foreground text-sm mb-1">Total Customer</p>
//               <p className="text-3xl font-bold text-foreground">{stats.totalCustomers}</p>
//           {/* <p className="text-muted-foreground text-sm mb-1">Avg Order Value</p>
//           <p className="text-3xl font-bold text-foreground">₹{stats.avgOrderValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
//           <p className="text-xs text-muted-foreground mt-1">Per order average</p> */}
//         </div>
//       </div>

//       {/* User Stats Summary */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
//           <div className="flex items-center gap-3">
//             <div className="bg-primary/10 p-2 rounded-lg">
//               <Users className="h-4 w-4 text-primary" />
//             </div>
//             <div>
//               <p className="text-xs text-muted-foreground">Total Users</p>
//               <p className="text-xl font-bold text-foreground">{stats.totalUsers}</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
//           <div className="flex items-center gap-3">
//             <div className="bg-primary/10 p-2 rounded-lg">
//               <Users className="h-4 w-4 text-primary" />
//             </div>
//             <div>
//               <p className="text-xs text-muted-foreground">Customers</p>
//               <p className="text-xl font-bold text-foreground">{stats.totalCustomers}</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
//           <div className="flex items-center gap-3">
//             <div className="bg-primary/10 p-2 rounded-lg">
//               <Users className="h-4 w-4 text-primary" />
//             </div>
//             <div>
//               <p className="text-xs text-muted-foreground">Admins</p>
//               <p className="text-xl font-bold text-foreground">{stats.totalAdmins}</p>
//             </div>
//           </div>
//         </div>
//       </div> */}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Print Types */}
//         <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
//           <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
//             <Printer className="h-5 w-5" />
//             Most Ordered Print Types
//           </h2>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm">B&W Prints</span>
//                 <span className="text-sm font-semibold">{printStats.bwCount} prints</span>
//               </div>
//               <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-primary rounded-full transition-all duration-500" 
//                   style={{ width: `${printStats.bwPercentage}%` }}
//                 />
//               </div>
//             </div>
//                        <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm">B&W Prints</span>
//                 <span className="text-sm font-semibold">{printStats.bwCount} prints</span>
//               </div>
//               <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-primary rounded-full transition-all duration-500" 
//                   style={{ width: `${printStats.bwPercentage}%` }}
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm">Color Prints</span>
//                 <span className="text-sm font-semibold">{printStats.colorCount} prints</span>
//               </div>
//               <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-cyan-600 rounded-full transition-all duration-500" 
//                   style={{ width: `${printStats.colorPercentage}%` }}
//                 />
//               </div>
//             </div>
//             {printStats.bwCount === 0 && printStats.colorCount === 0 && (
//               <p className="text-center text-muted-foreground text-sm py-4">No print orders yet</p>
//             )}
//           </div>
//         </div>
        

//         {/* Top Users */}
//         <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
//           <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
//             <Users className="h-5 w-5" />
//             Most Active Users
//           </h2>
//           <div className="space-y-3">
//             {topUsers.length > 0 ? (
//               topUsers.map((user, i) => (
//                 <div key={user._id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
//                   <div className="flex items-center gap-3">
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
//                       i === 0 ? 'bg-yellow-500 text-white' :
//                       i === 1 ? 'bg-gray-400 text-white' :
//                       i === 2 ? 'bg-amber-600 text-white' :
//                       'bg-primary/20 text-primary'
//                     }`}>
//                       {i + 1}
//                     </div>
//                     <div>
//                       <p className="font-medium text-sm">{user.name}</p>
//                       <p className="text-xs text-muted-foreground">{user.totalOrders} orders</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-semibold text-primary">₹{user.totalSpending.toLocaleString('en-IN')}</p>
//                     <p className="text-xs text-muted-foreground">total spent</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-muted-foreground text-sm py-8">No user data available</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Additional Stats - Order Status Distribution */}
//       <div className="mt-6">
//         <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
//           <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
//             <FileText className="h-5 w-5" />
//             Order Status Distribution
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="text-center p-4 bg-green-50 rounded-lg">
//               <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
//               <p className="text-sm text-green-700">Completed Orders</p>
//             </div>
//             <div className="text-center p-4 bg-yellow-50 rounded-lg">
//               <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
//               <p className="text-sm text-yellow-700">Pending Orders</p>
//             </div>
//             <div className="text-center p-4 bg-red-50 rounded-lg">
//               <p className="text-2xl font-bold text-red-600">{stats.cancelledOrders}</p>
//               <p className="text-sm text-red-700">Cancelled Orders</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminReports;




import { useState, useEffect } from 'react';
import { Loader2, TrendingUp, Package, Users, DollarSign, Printer, Wallet, FileText, Layers, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/api/axios';

interface Order {
  _id: string;
  orderNumber: string;
  totalAmount: number;
  paymentStatus: string;
  status: string;
  createdAt: string;
  items: any[];
  deliveryType: string;
  orderMode?: 'single' | 'bulk';
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  totalOrders: number;
  totalSpending: number;
  createdAt: string;
  isActive: boolean;
}

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  totalUsers: number;
  totalCustomers: number;
  totalAdmins: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  singleOrders: number;
  bulkOrders: number;
}

const AdminReports = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    totalUsers: 0,
    totalCustomers: 0,
    totalAdmins: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    singleOrders: 0,
    bulkOrders: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast({
          title: 'Error',
          description: 'Authentication required',
          variant: 'destructive',
        });
        return;
      }

      // Fetch orders
      const ordersResponse = await axiosInstance.get('/order/admin/all');
      
      // Fetch users
      const usersResponse = await axiosInstance.get('/users', {
        params: {
          limit: 1000,
          page: 1
        }
      });

      let ordersData: Order[] = [];
      let usersData: User[] = [];

      if (ordersResponse.data && ordersResponse.data.success) {
        ordersData = ordersResponse.data.orders;
        setOrders(ordersData);
      }

      if (usersResponse.data && usersResponse.data.success) {
        usersData = usersResponse.data.users;
        setUsers(usersData);
      }

      // Calculate statistics
      const paidOrders = ordersData.filter(o => o.paymentStatus === 'paid');
      const totalRevenue = paidOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
      const totalOrders = ordersData.length;
      const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      
      const totalUsers = usersData.length;
      const totalCustomers = usersData.filter(u => u.role === 'user').length;
      const totalAdmins = usersData.filter(u => u.role === 'admin').length;
      
      const pendingOrders = ordersData.filter(o => o.status === 'pending').length;
      const completedOrders = ordersData.filter(o => o.status === 'completed').length;
      const cancelledOrders = ordersData.filter(o => o.status === 'cancelled').length;
      
      // Order mode statistics
      const singleOrders = ordersData.filter(o => o.orderMode === 'single').length;
      const bulkOrders = ordersData.filter(o => o.orderMode === 'bulk').length;

      setStats({
        totalRevenue,
        totalOrders,
        avgOrderValue,
        totalUsers,
        totalCustomers,
        totalAdmins,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        singleOrders,
        bulkOrders
      });

    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch report data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate print type statistics
  const getPrintTypeStats = () => {
    let bwCount = 0;
    let colorCount = 0;
    
    orders.forEach(order => {
      order.items?.forEach(item => {
        if (item.printColor === 'bw') {
          bwCount++;
        } else if (item.printColor === 'color') {
          colorCount++;
        }
      });
    });
    
    const total = bwCount + colorCount;
    return {
      bwCount,
      colorCount,
      bwPercentage: total > 0 ? (bwCount / total) * 100 : 0,
      colorPercentage: total > 0 ? (colorCount / total) * 100 : 0
    };
  };

  // Calculate order mode statistics
  const getOrderModeStats = () => {
    const total = stats.singleOrders + stats.bulkOrders;
    return {
      singlePercentage: total > 0 ? (stats.singleOrders / total) * 100 : 0,
      bulkPercentage: total > 0 ? (stats.bulkOrders / total) * 100 : 0
    };
  };

  // Get top 5 most active users
  const getTopUsers = () => {
    return [...users]
      .filter(u => u.role === 'user')
      .sort((a, b) => b.totalSpending - a.totalSpending)
      .slice(0, 5);
  };

  const printStats = getPrintTypeStats();
  const orderModeStats = getOrderModeStats();
  const topUsers = getTopUsers();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
        <button
          onClick={fetchData}
          disabled={loading}
          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          <Loader2 className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {/* Revenue Summary */}
       {/* Revenue Summary */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
         <div className="bg-card rounded-xl p-6 shadow-sm text-center border border-border">
           <div className="flex items-center justify-center mb-2">
             <Wallet className="h-8 w-8 text-primary" />
          </div>
         <p className="text-muted-foreground text-sm mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-primary">₹{stats.totalRevenue.toLocaleString('en-IN')}</p>
          <p className="text-xs text-muted-foreground mt-1">From paid orders</p>
         </div>
        
        <div className="bg-card rounded-xl p-6 shadow-sm text-center border border-border">
           <div className="flex items-center justify-center mb-2">
            <Package className="h-8 w-8 text-primary" />
           </div>
           <p className="text-muted-foreground text-sm mb-1">Total Orders</p>
           <p className="text-3xl font-bold text-foreground">{stats.totalOrders}</p>
           <div className="flex justify-center gap-4 mt-1 text-xs">

          </div>
         </div>

 
                 <div className="bg-card rounded-xl p-6 shadow-sm text-center border border-border">
           <div className="flex items-center justify-center mb-2">
             <Users className="h-8 w-8 text-primary" />
           </div>
           <p className="text-muted-foreground text-sm mb-1">Total Customer</p>
              <p className="text-3xl font-bold text-foreground">{stats.totalCustomers}</p>
  </div>
       </div>

       {/* User Stats Summary */}
       {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
//           <div className="flex items-center gap-3">
//             <div className="bg-primary/10 p-2 rounded-lg">
//               <Users className="h-4 w-4 text-primary" />
//             </div>
//             <div>
//               <p className="text-xs text-muted-foreground">Total Users</p>
//               <p className="text-xl font-bold text-foreground">{stats.totalUsers}</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
//           <div className="flex items-center gap-3">
//             <div className="bg-primary/10 p-2 rounded-lg">
//               <Users className="h-4 w-4 text-primary" />
//             </div>
//             <div>
//               <p className="text-xs text-muted-foreground">Customers</p>
//               <p className="text-xl font-bold text-foreground">{stats.totalCustomers}</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
//           <div className="flex items-center gap-3">
//             <div className="bg-primary/10 p-2 rounded-lg">
//               <Users className="h-4 w-4 text-primary" />
//             </div>
//             <div>
//               <p className="text-xs text-muted-foreground">Admins</p>
//               <p className="text-xl font-bold text-foreground">{stats.totalAdmins}</p>
//             </div>
//           </div>
//         </div>
//       </div> */}


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Print Types */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Printer className="h-5 w-5" />
            Most Ordered Print Types
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">B&W Prints</span>
                <span className="text-sm font-semibold">{printStats.bwCount} prints</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500" 
                  style={{ width: `${printStats.bwPercentage}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Color Prints</span>
                <span className="text-sm font-semibold">{printStats.colorCount} prints</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-600 rounded-full transition-all duration-500" 
                  style={{ width: `${printStats.colorPercentage}%` }}
                />
              </div>
            </div>
            {printStats.bwCount === 0 && printStats.colorCount === 0 && (
              <p className="text-center text-muted-foreground text-sm py-4">No print orders yet</p>
            )}
          </div>
        </div>

        {/* Order Mode (Single/Bulk) */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Order Mode Distribution
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Copy className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Single Orders</span>
                </div>
                <span className="text-sm font-semibold">{stats.singleOrders} orders</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                  style={{ width: `${orderModeStats.singlePercentage}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Bulk Orders</span>
                </div>
                <span className="text-sm font-semibold">{stats.bulkOrders} orders</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all duration-500" 
                  style={{ width: `${orderModeStats.bulkPercentage}%` }}
                />
              </div>
            </div>
            {stats.singleOrders === 0 && stats.bulkOrders === 0 && (
              <p className="text-center text-muted-foreground text-sm py-4">No order mode data available</p>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{stats.singleOrders}</p>
                <p className="text-xs text-blue-700">Single Orders</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{stats.bulkOrders}</p>
                <p className="text-xs text-purple-700">Bulk Orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Users */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-6">
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Most Active Users
        </h2>
        <div className="space-y-3">
          {topUsers.length > 0 ? (
            topUsers.map((user, i) => (
              <div key={user._id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    i === 0 ? 'bg-yellow-500 text-white' :
                    i === 1 ? 'bg-gray-400 text-white' :
                    i === 2 ? 'bg-amber-600 text-white' :
                    'bg-primary/20 text-primary'
                  }`}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.totalOrders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">₹{user.totalSpending.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-muted-foreground">total spent</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground text-sm py-8">No user data available</p>
          )}
        </div>
      </div>

      {/* Order Status Distribution */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Order Status Distribution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
            <p className="text-sm text-green-700">Completed Orders</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
            <p className="text-sm text-yellow-700">Pending Orders</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{stats.cancelledOrders}</p>
            <p className="text-sm text-red-700">Cancelled Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
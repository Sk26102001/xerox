// import { Link } from 'react-router-dom';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { useApp } from '@/context/AppContext';

// const AdminUsers = () => {
//   const { users } = useApp();
//   const customerUsers = users.filter(u => u.role === 'user');

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-foreground mb-6">User Management</h1>
//       <div className="bg-card rounded-xl shadow-sm overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Orders</TableHead><TableHead>Spending</TableHead><TableHead>Joined</TableHead></TableRow>
//           </TableHeader>
//           <TableBody>
//             {customerUsers.map(user => (
//               <TableRow key={user.id} className="cursor-pointer hover:bg-muted/50">
//                 <TableCell><Link to={`/users/${user.id}`} className="text-primary font-medium hover:underline">{user.name}</Link></TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.phone}</TableCell>
//                 <TableCell>{user.totalOrders}</TableCell>
//                 <TableCell className="font-semibold">₹{user.totalSpending.toFixed(0)}</TableCell>
//                 <TableCell className="text-muted-foreground text-sm">{user.createdAt}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;





// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { Loader2, Search, Filter, UserPlus, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { useToast } from '@/hooks/use-toast';
// import axiosInstance from '@/api/axios';

// interface User {
//   _id: string;
//   id?: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
//   totalOrders: number;
//   totalSpending: number;
//   createdAt: string;
//   isActive?: boolean;
// }

// const AdminUsers = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterRole, setFilterRole] = useState<'all' | 'user' | 'admin'>('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchUsers();
//   }, [currentPage, filterRole, searchTerm]);

//   const fetchUsers = async () => {
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

//       // Use the correct endpoint with query parameters
//       const response = await axiosInstance.get('/users', {
//         params: {
//           page: currentPage,
//           limit: 5,
//           role: filterRole === 'all' ? undefined : filterRole,
//           search: searchTerm || undefined,
//           sortBy: 'createdAt',
//           sortOrder: 'desc'
//         }
//       });
      
//       if (response.data && response.data.success) {
//         const usersData = response.data.users.map((user: any) => ({
//           _id: user._id,
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           phone: user.phone || 'N/A',
//           role: user.role || 'user',
//           totalOrders: user.totalOrders || 0,
//           totalSpending: user.totalSpending || 0,
//           createdAt: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-CA') : 'N/A',
//           isActive: user.isActive !== false
//         }));
//         setUsers(usersData);
//         setTotalPages(response.data.pages || 1);
//         setTotalUsers(response.data.total || 0);
//       } else {
//         throw new Error(response.data?.message || 'Failed to fetch users');
//       }
//     } catch (error: any) {
//       console.error('Error fetching users:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Failed to fetch users',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     setCurrentPage(1); // Reset to first page on search
//     fetchUsers();
//   };

//   const handleRoleFilter = (role: 'all' | 'user' | 'admin') => {
//     setFilterRole(role);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//   };

//   if (loading && users.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center">
//           <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
//           <p className="text-muted-foreground">Loading users...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-foreground">User Management</h1>
//         <Button onClick={fetchUsers} variant="outline" size="sm" disabled={loading}>
//           <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
//           Refresh
//         </Button>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//         <form onSubmit={handleSearch} className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search by name, email or phone..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-9"
//           />
//         </form>
//         <div className="flex gap-2">
//           <Button
//             variant={filterRole === 'all' ? 'default' : 'outline'}
//             onClick={() => handleRoleFilter('all')}
//             size="sm"
//           >
//             All
//           </Button>
//           <Button
//             variant={filterRole === 'user' ? 'default' : 'outline'}
//             onClick={() => handleRoleFilter('user')}
//             size="sm"
//           >
//             Customers
//           </Button>
//           <Button
//             variant={filterRole === 'admin' ? 'default' : 'outline'}
//             onClick={() => handleRoleFilter('admin')}
//             size="sm"
//           >
//             Admins
//           </Button>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-card rounded-xl shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Phone</TableHead>
//                 <TableHead>Role</TableHead>
//                 <TableHead>Orders</TableHead>
//                 <TableHead>Spending</TableHead>
//                 <TableHead>Joined</TableHead>
//                 <TableHead>Status</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {users.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
//                     No users found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 users.map(user => (
//                   <TableRow 
//                     key={user._id} 
//                     className="cursor-pointer hover:bg-muted/50 transition-colors"
//                     onClick={() => window.location.href = `/users/${user._id}`}
//                   >
//                     <TableCell>
//                       <Link 
//                         to={`/users/${user._id}`} 
//                         className="text-primary font-medium hover:underline"
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         {user.name}
//                       </Link>
//                     </TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.phone}</TableCell>
//                     <TableCell>
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
//                       }`}>
//                         {user.role === 'admin' ? 'Admin' : 'Customer'}
//                       </span>
//                     </TableCell>
//                     <TableCell>{user.totalOrders}</TableCell>
//                     <TableCell className="font-semibold">₹{user.totalSpending.toLocaleString('en-IN')}</TableCell>
//                     <TableCell className="text-muted-foreground text-sm">{user.createdAt}</TableCell>
//                     <TableCell>
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                       }`}>
//                         {user.isActive ? 'Active' : 'Inactive'}
//                       </span>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-between px-4 py-3 border-t border-border">
//             <div className="text-sm text-muted-foreground">
//               Showing {users.length} of {totalUsers} users
//             </div>
//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               <span className="px-3 py-1 text-sm">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Summary Stats */}
//       <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="bg-card rounded-xl p-4 shadow-sm">
//           <p className="text-xs text-muted-foreground">Total Users</p>
//           <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
//         </div>
//         <div className="bg-card rounded-xl p-4 shadow-sm">
//           <p className="text-xs text-muted-foreground">Total Customers</p>
//           <p className="text-2xl font-bold text-foreground">{users.filter(u => u.role === 'user').length}</p>
//         </div>
//         <div className="bg-card rounded-xl p-4 shadow-sm">
//           <p className="text-xs text-muted-foreground">Total Admins</p>
//           <p className="text-2xl font-bold text-foreground">{users.filter(u => u.role === 'admin').length}</p>
//         </div>
//         <div className="bg-card rounded-xl p-4 shadow-sm">
//           <p className="text-xs text-muted-foreground">Total Spending</p>
//           <p className="text-2xl font-bold text-primary">
//             ₹{users.reduce((sum, u) => sum + u.totalSpending, 0).toLocaleString('en-IN')}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;





import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2, Search, Filter, UserPlus, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/api/axios';

interface User {
  _id: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  totalOrders: number;
  totalSpending: number;
  createdAt: string;
  isActive?: boolean;
}

interface UserStats {
  totalUsers: number;
  totalCustomers: number;
  totalAdmins: number;
  totalSpending: number;
  activeUsers: number;
  inactiveUsers: number;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'user' | 'admin'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    totalCustomers: 0,
    totalAdmins: 0,
    totalSpending: 0,
    activeUsers: 0,
    inactiveUsers: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
    fetchUserStats();
  }, [currentPage, filterRole, searchTerm]);

  const fetchUsers = async () => {
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

      const response = await axiosInstance.get('/users', {
        params: {
          page: currentPage,
          limit: 10,
          role: filterRole === 'all' ? undefined : filterRole,
          search: searchTerm || undefined,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        }
      });
      
      if (response.data && response.data.success) {
        const usersData = response.data.users.map((user: any) => ({
          _id: user._id,
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || 'N/A',
          role: user.role || 'user',
          totalOrders: user.totalOrders || 0,
          totalSpending: user.totalSpending || 0,
          createdAt: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-CA') : 'N/A',
          isActive: user.isActive !== false
        }));
        setUsers(usersData);
        setTotalPages(response.data.pages || 1);
        setTotalUsers(response.data.total || 0);
      } else {
        throw new Error(response.data?.message || 'Failed to fetch users');
      }
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Fetch all users without pagination to calculate stats
      const response = await axiosInstance.get('/users', {
        params: {
          limit: 10000, // Get all users for stats
          page: 1
        }
      });
      
      if (response.data && response.data.success) {
        const allUsers = response.data.users;
        
        // Calculate stats
        const totalUsers = response.data.total || allUsers.length;
        const totalCustomers = allUsers.filter((u: any) => u.role === 'user').length;
        const totalAdmins = allUsers.filter((u: any) => u.role === 'admin').length;
        const totalSpending = allUsers.reduce((sum: number, u: any) => sum + (u.totalSpending || 0), 0);
        const activeUsers = allUsers.filter((u: any) => u.isActive !== false).length;
        const inactiveUsers = allUsers.filter((u: any) => u.isActive === false).length;
        
        setStats({
          totalUsers,
          totalCustomers,
          totalAdmins,
          totalSpending,
          activeUsers,
          inactiveUsers
        });
      }
    } catch (error: any) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers();
  };

  const handleRoleFilter = (role: 'all' | 'user' | 'admin') => {
    setFilterRole(role);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>
        <Button 
          onClick={() => {
            fetchUsers();
            fetchUserStats();
          }} 
          variant="outline" 
          size="sm" 
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </form>
        <div className="flex gap-2">
          <Button
            variant={filterRole === 'all' ? 'default' : 'outline'}
            onClick={() => handleRoleFilter('all')}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filterRole === 'user' ? 'default' : 'outline'}
            onClick={() => handleRoleFilter('user')}
            size="sm"
          >
            Customers
          </Button>
          <Button
            variant={filterRole === 'admin' ? 'default' : 'outline'}
            onClick={() => handleRoleFilter('admin')}
            size="sm"
          >
            Admins
          </Button>
        </div>
      </div>

      {/* Summary Stats - Now using stats from all users */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Total Users</p>
          <p className="text-2xl font-bold text-foreground">{stats.totalUsers}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Total Customers</p>
          <p className="text-2xl font-bold text-foreground">{stats.totalCustomers}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Total Admins</p>
          <p className="text-2xl font-bold text-foreground">{stats.totalAdmins}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Total Spending</p>
          <p className="text-2xl font-bold text-primary">
            ₹{stats.totalSpending.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Additional Stats Row */}
      {/* <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Active Users</p>
          <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Inactive Users</p>
          <p className="text-2xl font-bold text-red-600">{stats.inactiveUsers}</p>
        </div>
      </div> */}

      {/* Users Table */}
      <div className="bg-card rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Spending</TableHead>
                <TableHead>Joined</TableHead>
                {/* <TableHead>Status</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map(user => (
                  <TableRow 
                    key={user._id} 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => window.location.href = `/users/${user._id}`}
                  >
                    <TableCell>
                      <Link 
                        to={`/users/${user._id}`} 
                        className="text-primary font-medium hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {user.name}
                      </Link>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role === 'admin' ? 'Admin' : 'Customer'}
                      </span>
                    </TableCell>
                    <TableCell>{user.totalOrders}</TableCell>
                    <TableCell className="font-semibold">₹{user.totalSpending.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{user.createdAt}</TableCell>
                    {/* <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell> */}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Showing {users.length} of {totalUsers} users
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-3 py-1 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
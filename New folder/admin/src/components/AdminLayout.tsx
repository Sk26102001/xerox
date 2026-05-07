// import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
// import { LayoutDashboard, ShoppingCart, Users, DollarSign, Tag, Percent, BarChart3,MessageSquareQuote, Settings, LogOut, Bell, Menu,Shield } from 'lucide-react';
// import { useApp } from '@/context/AppContext';
// import { Button } from '@/components/ui/button';
// import { useState } from 'react';

// const sidebarItems = [
//   { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
//   { label: 'Orders', path: '/orders', icon: ShoppingCart },
//   { label: 'Users', path: '/users', icon: Users },
//   { label: 'Pricing', path: '/pricing', icon: DollarSign },
//   { label: 'Promocodes', path: '/promocodes', icon: Tag },
//   { label: 'Offers', path: '/offers', icon: Percent },
//   { label: 'Reports', path: '/reports', icon: BarChart3 },
//     { label: 'Testimonials', path: '/testimonials', icon: MessageSquareQuote
//      },
//   { label: 'Settings', path: '/settings', icon: Settings },
// ];

// const AdminLayout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { auth, logout } = useApp();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const handleLogout = () => { logout(); navigate('/'); };

//   return (
//     <div className="min-h-screen flex bg-background">
//       {/* Sidebar */}
//       <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-navy-dark flex flex-col transition-all duration-300 shrink-0`}>
// <div className="p-4 flex items-center gap-2">
//   <div className="bg-primary p-2 rounded shrink-0 flex items-center justify-center">
//     <Shield/>
    
//   </div>
//   {sidebarOpen && (
//     <span className="text-secondary-foreground font-bold text-lg">
//       Admin Panel
//     </span>
//   )}
// </div>
//         <nav className="flex-1 px-2 py-4 space-y-1">
//           {sidebarItems.map(item => {
//             const active = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
//             return (
//               <Link key={item.path} to={item.path}
//                 className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-primary text-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}>
//                 <item.icon className="h-5 w-5 shrink-0" />
//                 {sidebarOpen && <span>{item.label}</span>}
//               </Link>
//             );
//           })}
//         </nav>
//         <div className="px-2 pb-4">
//           <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent w-full">
//             <LogOut className="h-5 w-5 shrink-0" />
//             {sidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="flex-1 flex flex-col min-w-0">
//         <header className="h-14 bg-card border-b flex items-center justify-between px-4 shrink-0">
//           <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
//             <Menu className="h-5 w-5" />
//           </Button>
//           <div className="flex items-center gap-3">
//             <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
//             <span className="text-sm font-medium text-foreground">{auth.user?.name || 'Admin'}</span>
//           </div>
//         </header>
//         <main className="flex-1 overflow-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;






import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Users, DollarSign, Tag, Percent, BarChart3, MessageSquareQuote, Settings, LogOut, Bell, Menu, Shield } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const sidebarItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Orders', path: '/orders', icon: ShoppingCart },
  { label: 'Users', path: '/users', icon: Users },
  { label: 'Pricing', path: '/pricing', icon: DollarSign },
  { label: 'Promocodes', path: '/promocodes', icon: Tag },
  { label: 'Offers', path: '/offers', icon: Percent },
  { label: 'Reports', path: '/reports', icon: BarChart3 },
  { label: 'Testimonials', path: '/testimonials', icon: MessageSquareQuote },
   { label: 'Contacts', path: '/contacts', icon: MessageSquareQuote },
  { label: 'Settings', path: '/settings', icon: Settings },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, logout } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Sidebar - Fixed, no scroll */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-navy-dark flex flex-col transition-all duration-300 shrink-0 h-full`}>
        <div className="p-4 flex items-center gap-2 shrink-0">
          <div className="bg-primary p-2 rounded shrink-0 flex items-center justify-center">
            <Shield />
          </div>
          {sidebarOpen && (
            <span className="text-secondary-foreground font-bold text-lg">
              Admin Panel
            </span>
          )}
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {sidebarItems.map(item => {
            const active = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-primary text-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        
        <div className="px-2 pb-4 shrink-0">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent w-full"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area - Fixed layout */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Fixed Header */}
        <header className="h-14 bg-card border-b flex items-center justify-between px-4 shrink-0">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <span className="text-sm font-medium text-foreground">{auth.user?.name || 'Admin'}</span>
          </div>
        </header>
        
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AppProvider } from "@/context/AppContext";
// // import CustomerLayout from "@/components/CustomerLayout";
// import AdminLayout from "@/components/AdminLayout";
// // import Index from "./pages/Index";
// // import PlaceOrder from "./pages/PlaceOrder";
// // import TrackOrder from "./pages/TrackOrder";
// // import OrderHistory from "./pages/OrderHistory";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register";
// import AdminLogin from "./pages/admin/AdminLogin";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminOrders from "./pages/admin/AdminOrders";
// import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
// import AdminUsers from "./pages/admin/AdminUsers";
// import AdminUserDetail from "./pages/admin/AdminUserDetail";
// import AdminPricing from "./pages/admin/AdminPricing";
// import AdminPromocodes from "./pages/admin/AdminPromocodes";
// import AdminOffers from "./pages/admin/AdminOffers";
// import AdminReports from "./pages/admin/AdminReports";
// import AdminTestimonials from "./pages/admin/AdminTestimonials";
// import AdminContact from "./pages/admin/AdminContact";
// import AdminSettings from "./pages/admin/AdminSettings";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <AppProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <Routes>
//             {/* Customer Routes */}
//             {/* <Route element={<CustomerLayout />}>
//               <Route path="/" element={<Index />} />
//               <Route path="/place-order" element={<PlaceOrder />} />
//               <Route path="/track-order" element={<TrackOrder />} />
//               <Route path="/order-history" element={<OrderHistory />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//             </Route> */}

//             {/* Admin Routes */}
//             <Route path="/" element={<AdminLogin />} />
//             <Route element={<AdminLayout />}>
//               <Route path="dashboard" element={<AdminDashboard />} />
//               <Route path="/orders" element={<AdminOrders />} />
//               <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />
//               <Route path="users" element={<AdminUsers />} />
//               <Route path="users/:id" element={<AdminUserDetail />} />
//               <Route path="pricing" element={<AdminPricing />} />
//               <Route path="promocodes" element={<AdminPromocodes />} />
//               <Route path="offers" element={<AdminOffers />} />
//               <Route path="reports" element={<AdminReports />} />
//                <Route path="testimonials" element={<AdminTestimonials />} />
//                <Route path="contacts" element={<AdminContact />} />
//               <Route path="settings" element={<AdminSettings />} />
               
//             </Route>
//              <Route path="*" element={<NotFound />} />

          
//           </Routes>
//         </BrowserRouter>
//       </AppProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;






import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/context/AppContext";
import AdminLayout from "@/components/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminUserDetail from "./pages/admin/AdminUserDetail";
import AdminPricing from "./pages/admin/AdminPricing";
import AdminPromocodes from "./pages/admin/AdminPromocodes";
import AdminOffers from "./pages/admin/AdminOffers";
import AdminReports from "./pages/admin/AdminReports";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminContact from "./pages/admin/AdminContact";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper – uses your existing auth state
const AdminProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { auth } = useApp();
  if (!auth.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public login */}
            <Route path="/" element={<AdminLogin />} />

            {/* Protected admin routes */}
            <Route
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="orders/:id" element={<AdminOrderDetail />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="users/:id" element={<AdminUserDetail />} />
              <Route path="pricing" element={<AdminPricing />} />
              <Route path="promocodes" element={<AdminPromocodes />} />
              <Route path="offers" element={<AdminOffers />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="contacts" element={<AdminContact />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
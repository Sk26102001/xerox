// import { Toaster } from "@/components/ui/toaster";
// import { AuthProvider } from "@/context/AuthContext";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import OrderPage from "./pages/OrderPage";
// import TrackingPage from "./pages/TrackingPage";
// import AuthPage from "./pages/AuthPage";
// import OrderHistoryPage from "./pages/OrderHistoryPage";
// import NotFound from "./pages/NotFound";
// import FloatingPhone from "@/components/FloatingPhone";
// import TermsAndConditions from "./pages/TermsAndConditions";
// import ContactPage from "./pages/ContactPage";
// import AddToCart from "./pages/AddToCart";
// import Payment from "./pages/PaymentPage";
// import PaymentPage from "./pages/PaymentPage";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/order" element={<OrderPage />} />
//           <Route path="/tracking" element={<TrackingPage />} />
//           <Route path="/auth" element={<AuthPage />} />
//           <Route path="/history" element={<OrderHistoryPage />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          
//           <Route path="/terms" element={<TermsAndConditions />} />
//           <Route path="/contact" element={<ContactPage />} />
//           <Route path="/cart" element={<AddToCart />} />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//            {/* 🔥 Floating Phone Visible on All Pages */}
//         <FloatingPhone />
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;



// import { Toaster } from "@/components/ui/toaster";
// import { AuthProvider } from "@/context/AuthContext";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import ProtectedRoute from "@/routes/ProtectedRoute";

// import Index from "./pages/Index";
// import OrderPage from "./pages/OrderPage";
// import TrackingPage from "./pages/TrackingPage";
// import AuthPage from "./pages/AuthPage";
// import OrderHistoryPage from "./pages/OrderHistoryPage";
// import NotFound from "./pages/NotFound";
// import FloatingPhone from "@/components/FloatingPhone";
// import TermsAndConditions from "./pages/TermsAndConditions";
// import ContactPage from "./pages/ContactPage";
// import AddToCart from "./pages/AddToCart";
// import PaymentPage from "./pages/PaymentPage";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />

//       {/* 🔐 Auth Wrapper */}
//       <AuthProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/order" element={<OrderPage />} />
//             <Route path="/tracking" element={<TrackingPage />} />
//             <Route path="/auth" element={<AuthPage />} />

//             {/* 🔐 Protected */}
//             <Route
//               path="/history"
//               element={
//                 <ProtectedRoute>
//                   <OrderHistoryPage />
//                 </ProtectedRoute>
//               }
//             />

//             <Route path="/terms" element={<TermsAndConditions />} />
//             <Route path="/contact" element={<ContactPage />} />
//             {/* <Route path="/cart" element={<AddToCart />} /> */}

//             <Route
//   path="/cart"
//   element={
//     <ProtectedRoute>
//       <AddToCart />
//     </ProtectedRoute>
//   }
// />

//             <Route
//               path="/payment"
//               element={
//                 <ProtectedRoute>
//                   <PaymentPage />
//                 </ProtectedRoute>
//               }
//             />

//             <Route path="*" element={<NotFound />} />
//           </Routes>

//           <FloatingPhone />
//         </BrowserRouter>
//       </AuthProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;





import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/routes/ProtectedRoute";

import Index from "./pages/Index";
import OrderPage from "./pages/OrderPage";
import TrackingPage from "./pages/TrackingPage";
import AuthPage from "./pages/AuthPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import NotFound from "./pages/NotFound";
import FloatingPhone from "@/components/FloatingPhone";
import TermsAndConditions from "./pages/TermsAndConditions";
import ContactPage from "./pages/ContactPage";
import AddToCart from "./pages/AddToCart";
import PaymentPage from "./pages/PaymentPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Index />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* 🔐 PROTECTED ROUTES */}
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <OrderHistoryPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <AddToCart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <FloatingPhone />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Payment from "./pages/PaymentPage";
import PaymentPage from "./pages/PaymentPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/history" element={<OrderHistoryPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
           {/* 🔥 Floating Phone Visible on All Pages */}
        <FloatingPhone />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

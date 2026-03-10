import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Package, Clock, Printer, CheckCircle, Truck, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type OrderStatus = 'pending' | 'confirmed' | 'printing' | 'ready' | 'dispatched' | 'completed';

interface TrackingInfo {
  orderId: string;
  status: OrderStatus;
  createdAt: string;
  estimatedReady: string;
  items: {
    pages: number;
    copies: number;
    paperSize: string;
    printColor: string;
    bindingType: string;
  };
  amount: number;
  deliveryType: string;
}

const statusSteps: { key: OrderStatus; label: string; icon: any; desc: string }[] = [
  { key: 'pending', label: 'Order Placed', icon: Package, desc: 'Your order has been received' },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle, desc: 'Order confirmed & payment verified' },
  { key: 'printing', label: 'Printing', icon: Printer, desc: 'Your documents are being printed' },
  { key: 'ready', label: 'Ready', icon: CheckCircle, desc: 'Printing done, binding in progress' },
  { key: 'dispatched', label: 'Dispatched', icon: Truck, desc: 'Out for delivery / ready for pickup' },
  { key: 'completed', label: 'Completed', icon: CheckCircle, desc: 'Order delivered / picked up' },
];

// Mock order data for demo
const mockOrders: Record<string, TrackingInfo> = {
  'BP12345678': {
    orderId: 'BP12345678',
    status: 'printing',
    createdAt: '2026-02-19 10:30 AM',
    estimatedReady: '2026-02-19 4:00 PM',
    items: { pages: 200, copies: 2, paperSize: 'A4', printColor: 'B&W', bindingType: 'Perfect Glue' },
    amount: 425.60,
    deliveryType: 'Store Pickup',
  },
  'BP87654321': {
    orderId: 'BP87654321',
    status: 'dispatched',
    createdAt: '2026-02-18 2:15 PM',
    estimatedReady: '2026-02-19 12:00 PM',
    items: { pages: 350, copies: 5, paperSize: 'B5', printColor: 'B&W', bindingType: 'Hardbound' },
    amount: 1280.50,
    deliveryType: 'Courier Delivery',
  },
};

const getStatusIndex = (status: OrderStatus) => statusSteps.findIndex((s) => s.key === status);

export default function TrackingPage() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!orderId.trim()) return;
    setLoading(true);
    setNotFound(false);
    setTrackingInfo(null);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));

    const info = mockOrders[orderId.toUpperCase()];
    if (info) {
      setTrackingInfo(info);
    } else {
      setNotFound(true);
    }
    setSearched(true);
    setLoading(false);
  };

  // Auto-search if orderId is in URL
  useEffect(() => {
    const urlOrderId = searchParams.get('orderId');
    if (urlOrderId) {
      setOrderId(urlOrderId);
      // Simulate finding the order
      setTimeout(() => {
        setTrackingInfo({
          orderId: urlOrderId,
          status: 'pending',
          createdAt: new Date().toLocaleString(),
          estimatedReady: 'Tomorrow by 5:00 PM',
          items: { pages: 100, copies: 1, paperSize: 'A4', printColor: 'B&W', bindingType: 'Perfect Glue' },
          amount: 250.00,
          deliveryType: 'Store Pickup',
        });
        setSearched(true);
      }, 500);
    }
  }, []);

  const currentIndex = trackingInfo ? getStatusIndex(trackingInfo.status) : -1;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">
        {/* Header */}
        <div className="bg-secondary py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Track Your Order</h1>
            <p className="text-white/60">Enter your Order ID to see real-time status</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Search Box */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-8">
            <label className="block text-sm font-semibold text-foreground mb-2">Order ID</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g. BP12345678"
                className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono"
              />
              <button
                onClick={handleSearch}
                disabled={loading || !orderId.trim()}
                className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                Track
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Demo orders: <button onClick={() => setOrderId('BP12345678')} className="text-primary hover:underline">BP12345678</button> or <button onClick={() => setOrderId('BP87654321')} className="text-primary hover:underline">BP87654321</button>
            </p>
          </div>

          {/* Not Found */}
          {searched && notFound && (
            <div className="bg-white rounded-2xl border border-border shadow-sm p-8 text-center animate-slide-up">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Order Not Found</h3>
              <p className="text-muted-foreground">We couldn't find an order with ID <span className="font-mono font-bold text-foreground">{orderId}</span>.</p>
              <p className="text-muted-foreground text-sm mt-1">Please check the order ID and try again.</p>
            </div>
          )}

          {/* Tracking Result */}
          {trackingInfo && (
            <div className="space-y-6 animate-slide-up">
              {/* Status Header */}
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className={`p-5 ${trackingInfo.status === 'completed' ? 'bg-green-600' : 'bg-secondary'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">Order ID</p>
                      <p className="text-white font-bold font-mono text-lg">{trackingInfo.orderId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm">Amount</p>
                      <p className="text-white font-bold text-lg">₹{trackingInfo.amount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Progress Bar */}
                  <div className="relative">
                    {/* Track line */}
                    <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted" />
                    <div
                      className="absolute top-5 left-5 h-0.5 bg-primary transition-all duration-1000"
                      style={{ width: `${(currentIndex / (statusSteps.length - 1)) * (100 - 10)}%` }}
                    />

                    <div className="relative flex justify-between">
                      {statusSteps.map((step, i) => {
                        const isCompleted = i <= currentIndex;
                        const isCurrent = i === currentIndex;
                        return (
                          <div key={step.key} className="flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
                              isCompleted
                                ? isCurrent
                                  ? 'bg-primary scale-110 shadow-lg shadow-primary/30'
                                  : 'bg-primary/80'
                                : 'bg-muted'
                            }`}>
                              <step.icon className={`h-4 w-4 ${isCompleted ? 'text-white' : 'text-muted-foreground'}`} />
                            </div>
                            <div className="text-center">
                              <p className={`text-xs font-semibold ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                                {step.label}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Current Status Info */}
                  <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-start gap-3">
                      {React.createElement(statusSteps[currentIndex]?.icon || Clock, { className: 'h-5 w-5 text-primary mt-0.5 shrink-0' })}
                      <div>
                        <p className="font-bold text-foreground">{statusSteps[currentIndex]?.label}</p>
                        <p className="text-muted-foreground text-sm">{statusSteps[currentIndex]?.desc}</p>
                        <p className="text-xs text-muted-foreground mt-1">Est. Ready: {trackingInfo.estimatedReady}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
                <h3 className="font-bold text-foreground mb-4">Order Details</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Pages', value: `${trackingInfo.items.pages}` },
                    { label: 'Copies', value: `${trackingInfo.items.copies}` },
                    { label: 'Paper Size', value: trackingInfo.items.paperSize },
                    { label: 'Print Color', value: trackingInfo.items.printColor },
                    { label: 'Binding', value: trackingInfo.items.bindingType },
                    { label: 'Delivery', value: trackingInfo.deliveryType },
                  ].map((item) => (
                    <div key={item.label} className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-sm border-t border-border pt-4">
                  <span className="text-muted-foreground">Order Placed</span>
                  <span className="font-medium text-foreground">{trackingInfo.createdAt}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Need to import React for createElement
import React from 'react';

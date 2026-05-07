// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { User, Order, Pricing, Promocode, Offer, AuthState } from '@/types';
// import { mockUsers, mockOrders, mockPricing, mockPromocodes, mockOffers } from '@/data/mockData';
// import { PricingConfig, defaultPricingConfig } from '@/data/pricingData';

// interface AppContextType {
//   auth: AuthState;
//   login: (email: string, password: string) => boolean;
//   adminLogin: (email: string, password: string) => boolean;
//   logout: () => void;
//   register: (name: string, email: string, phone: string, password: string) => boolean;
//   users: User[];
//   orders: Order[];
//   setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
//   pricing: Pricing;
//   setPricing: React.Dispatch<React.SetStateAction<Pricing>>;
//   pricingConfig: PricingConfig;
//   setPricingConfig: React.Dispatch<React.SetStateAction<PricingConfig>>;
//   promocodes: Promocode[];
//   setPromocodes: React.Dispatch<React.SetStateAction<Promocode[]>>;
//   offers: Offer[];
//   setOffers: React.Dispatch<React.SetStateAction<Offer[]>>;
//   addOrder: (order: Order) => void;
//   updateOrderStatus: (orderId: string, status: Order['status']) => void;
//   updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;
// }

// const AppContext = createContext<AppContextType | undefined>(undefined);

// export const AppProvider = ({ children }: { children: ReactNode }) => {
//   const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false, user: null, isAdmin: false });
//   const [users, setUsers] = useState<User[]>(mockUsers);
//   const [orders, setOrders] = useState<Order[]>(mockOrders);
//   const [pricing, setPricing] = useState<Pricing>(mockPricing);
//   const [pricingConfig, setPricingConfig] = useState<PricingConfig>(defaultPricingConfig);
//   const [promocodes, setPromocodes] = useState<Promocode[]>(mockPromocodes);
//   const [offers, setOffers] = useState<Offer[]>(mockOffers);

//   const login = (email: string, _password: string): boolean => {
//     const user = users.find(u => u.email === email && u.role === 'user');
//     if (user) {
//       setAuth({ isAuthenticated: true, user, isAdmin: false });
//       return true;
//     }
//     return false;
//   };

//   const adminLogin = (email: string, _password: string): boolean => {
//     if (email === 'admin@printshop.com') {
//       const admin = users.find(u => u.role === 'admin');
//       if (admin) {
//         setAuth({ isAuthenticated: true, user: admin, isAdmin: true });
//         return true;
//       }
//     }
//     return false;
//   };

//   const logout = () => setAuth({ isAuthenticated: false, user: null, isAdmin: false });

//   const register = (name: string, email: string, phone: string, _password: string): boolean => {
//     if (users.find(u => u.email === email)) return false;
//     const newUser: User = {
//       id: `u${users.length + 1}`,
//       name, email, phone, role: 'user',
//       createdAt: new Date().toISOString().split('T')[0],
//       totalOrders: 0, totalSpending: 0,
//     };
//     setUsers(prev => [...prev, newUser]);
//     setAuth({ isAuthenticated: true, user: newUser, isAdmin: false });
//     return true;
//   };

//   const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);

//   const updateOrderStatus = (orderId: string, status: Order['status']) => {
//     setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString().split('T')[0] } : o));
//   };

//   const updatePaymentStatus = (orderId: string, paymentStatus: Order['paymentStatus']) => {
//     setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentStatus } : o));
//   };

//   return (
//     <AppContext.Provider value={{ auth, login, adminLogin, logout, register, users, orders, setOrders, pricing, setPricing, pricingConfig, setPricingConfig, promocodes, setPromocodes, offers, setOffers, addOrder, updateOrderStatus, updatePaymentStatus }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useApp = () => {
//   const ctx = useContext(AppContext);
//   if (!ctx) throw new Error('useApp must be used within AppProvider');
//   return ctx;
// };






import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Order, Pricing, Promocode, Offer, AuthState } from '@/types';
import { mockUsers, mockOrders, mockPricing, mockPromocodes, mockOffers } from '@/data/mockData';
import { PricingConfig, defaultPricingConfig } from '@/data/pricingData';

interface AppContextType {
  auth: AuthState;
  login: (email: string, password: string) => boolean;
  adminLogin: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  users: User[];
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  pricing: Pricing;
  setPricing: React.Dispatch<React.SetStateAction<Pricing>>;
  pricingConfig: PricingConfig;
  setPricingConfig: React.Dispatch<React.SetStateAction<PricingConfig>>;
  promocodes: Promocode[];
  setPromocodes: React.Dispatch<React.SetStateAction<Promocode[]>>;
  offers: Offer[];
  setOffers: React.Dispatch<React.SetStateAction<Offer[]>>;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false, user: null, isAdmin: false });
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [pricing, setPricing] = useState<Pricing>(mockPricing);
  const [pricingConfig, setPricingConfig] = useState<PricingConfig>(defaultPricingConfig);
  const [promocodes, setPromocodes] = useState<Promocode[]>(mockPromocodes);
  const [offers, setOffers] = useState<Offer[]>(mockOffers);

  const login = (email: string, _password: string): boolean => {
    const user = users.find(u => u.email === email && u.role === 'user');
    if (user) {
      setAuth({ isAuthenticated: true, user, isAdmin: false });
      return true;
    }
    return false;
  };

  const adminLogin = (email: string, _password: string): boolean => {
    if (email === 'admin@printshop.com') {
      const admin = users.find(u => u.role === 'admin');
      if (admin) {
        setAuth({ isAuthenticated: true, user: admin, isAdmin: true });
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null, isAdmin: false });
    // Clear stored tokens
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const register = (name: string, email: string, phone: string, _password: string): boolean => {
    if (users.find(u => u.email === email)) return false;
    const newUser: User = {
      id: `u${users.length + 1}`,
      name, email, phone, role: 'user',
      createdAt: new Date().toISOString().split('T')[0],
      totalOrders: 0, totalSpending: 0,
    };
    setUsers(prev => [...prev, newUser]);
    setAuth({ isAuthenticated: true, user: newUser, isAdmin: false });
    return true;
  };

  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString().split('T')[0] } : o));
  };
  const updatePaymentStatus = (orderId: string, paymentStatus: Order['paymentStatus']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentStatus } : o));
  };

  return (
    <AppContext.Provider value={{
      auth, login, adminLogin, logout, register,
      users, orders, setOrders,
      pricing, setPricing, pricingConfig, setPricingConfig,
      promocodes, setPromocodes, offers, setOffers,
      addOrder, updateOrderStatus, updatePaymentStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
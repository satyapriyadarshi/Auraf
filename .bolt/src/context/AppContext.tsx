import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type {
  User,
  Product,
  Order,
  TransportJob,
  AIInsight,
  AppNotification,
  UserRole,
  OrderStatus,
  TransportJobStatus,
  ProductStatus,
} from '@/types';
import {
  mockUsers,
  mockProducts,
  mockOrders,
  mockTransportJobs,
  mockAIInsights,
  mockNotifications,
} from '@/data/mockData';

export type Route =
  | { name: 'landing' }
  | { name: 'login' }
  | { name: 'signup' }
  | { name: 'roleSelection' }
  | { name: 'farmerDashboard' }
  | { name: 'addProduce' }
  | { name: 'myProduce' }
  | { name: 'farmerOrders' }
  | { name: 'farmerInsights' }
  | { name: 'buyerDashboard' }
  | { name: 'marketplace' }
  | { name: 'productDetails'; productId: string }
  | { name: 'buyerOrders' }
  | { name: 'buyerInsights' }
  | { name: 'checkout'; productId: string; quantity: number }
  | { name: 'payment'; orderId: string }
  | { name: 'orderTracking'; orderId: string }
  | { name: 'transporterDashboard' }
  | { name: 'transporterJob'; jobId: string }
  | { name: 'transporterMap' }
  | { name: 'transporterEarnings' }
  | { name: 'notifications' }
  | { name: 'profile' };

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppState {
  user: User | null;
  isAuthed: boolean;
  route: Route;
  products: Product[];
  orders: Order[];
  transportJobs: TransportJob[];
  aiInsights: AIInsight[];
  notifications: AppNotification[];
  toasts: Toast[];
  navigate: (route: Route) => void;
  login: (email: string) => void;
  signup: (name: string, email: string, mobile: string, location: string) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'buyerInterest' | 'status' | 'farmerId' | 'farmerName' | 'farmerVerified'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStatus: (id: string) => void;
  createOrder: (productId: string, quantity: number, deliveryLocation: string) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  acceptTransportJob: (jobId: string) => void;
  updateTransportJobStatus: (jobId: string, status: TransportJobStatus) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (n: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  showToast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [route, setRoute] = useState<Route>({ name: 'landing' });
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [transportJobs, setTransportJobs] = useState<TransportJob[]>(mockTransportJobs);
  const [aiInsights] = useState<AIInsight[]>(mockAIInsights);
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const navigate = useCallback((r: Route) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const login = useCallback((email: string) => {
    const lowerEmail = email.toLowerCase();
    let foundUser: User | null = null;
    for (const u of Object.values(mockUsers)) {
      if (u.email === lowerEmail) {
        foundUser = u;
        break;
      }
    }
    if (!foundUser) {
      foundUser = { ...mockUsers['u1'], email: lowerEmail };
    }
    setUser(foundUser);
    setRoute({ name: 'roleSelection' });
  }, []);

  const signup = useCallback((name: string, email: string, mobile: string, location: string) => {
    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      mobile,
      location,
      role: 'farmer',
      verified: false,
    };
    setUser(newUser);
    setRoute({ name: 'roleSelection' });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setRoute({ name: 'landing' });
  }, []);

  const setRole = useCallback((role: UserRole) => {
    setUser((prev) => {
      if (!prev) return prev;
      const roleUser = Object.values(mockUsers).find((u) => u.role === role);
      return {
        ...prev,
        role,
        name: roleUser?.name ?? prev.name,
        location: roleUser?.location ?? prev.location,
        verified: roleUser?.verified ?? prev.verified,
      };
    });
    switch (role) {
      case 'farmer':
        setRoute({ name: 'farmerDashboard' });
        break;
      case 'buyer':
        setRoute({ name: 'buyerDashboard' });
        break;
      case 'transporter':
        setRoute({ name: 'transporterDashboard' });
        break;
    }
  }, []);

  const addProduct: AppState['addProduct'] = useCallback((product) => {
    if (!user) return;
    const newProduct: Product = {
      ...product,
      id: `p-${Date.now()}`,
      farmerId: user.id,
      farmerName: user.name,
      farmerVerified: user.verified,
      status: 'Active',
      buyerInterest: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setProducts((prev) => [newProduct, ...prev]);
  }, [user]);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleProductStatus = useCallback((id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'Paused' ? ('Active' as ProductStatus) : ('Paused' as ProductStatus) }
          : p
      )
    );
  }, []);

  const createOrder: AppState['createOrder'] = useCallback((productId, quantity, deliveryLocation) => {
    const product = products.find((p) => p.id === productId);
    if (!product || !user) return '';
    const subtotal = product.sellingPrice * quantity;
    const transportCost = Math.round(product.distance * 15 + 100);
    const total = subtotal + transportCost;
    const orderId = `AU${Math.floor(1025 + Math.random() * 900)}`;
    const newOrder: Order = {
      id: orderId,
      productId,
      productName: product.name,
      productImage: product.image,
      buyerId: user.id,
      buyerName: user.name,
      farmerId: product.farmerId,
      farmerName: product.farmerName,
      quantity,
      unit: product.unit,
      pricePerUnit: product.sellingPrice,
      subtotal,
      transportCost,
      total,
      status: 'Order Confirmed',
      deliveryLocation,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: Math.max(0, p.quantity - quantity), buyerInterest: p.buyerInterest + 1 } : p
      )
    );
    return orderId;
  }, [products, user]);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  }, []);

  const acceptTransportJob = useCallback((jobId: string) => {
    if (!user) return;
    setTransportJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, status: 'Accepted', transporterId: user.id } : j
      )
    );
  }, [user]);

  const updateTransportJobStatus = useCallback((jobId: string, status: TransportJobStatus) => {
    setTransportJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status } : j)));
    if (status === 'Delivered') {
      const job = transportJobs.find((j) => j.id === jobId);
      if (job) {
        setOrders((prev) =>
          prev.map((o) => (o.id === job.orderId ? { ...o, status: 'Delivered' } : o))
        );
      }
    }
  }, [transportJobs]);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const addNotification: AppState['addNotification'] = useCallback((n) => {
    const newNotif: AppNotification = {
      ...n,
      id: `n-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  const value: AppState = {
    user,
    isAuthed: user !== null,
    route,
    products,
    orders,
    transportJobs,
    aiInsights,
    notifications,
    toasts,
    navigate,
    login,
    signup,
    logout,
    setRole,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
    createOrder,
    updateOrderStatus,
    acceptTransportJob,
    updateTransportJobStatus,
    markNotificationRead,
    markAllNotificationsRead,
    addNotification,
    showToast,
    dismissToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

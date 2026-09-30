import type {
  Product,
  Order,
  TransportJob,
  AIInsight,
  AppNotification,
  User,
  UserRole,
  OrderStatus,
  TransportJobStatus,
} from '@/types';
import {
  mockProducts,
  mockOrders,
  mockTransportJobs,
  mockAIInsights,
  mockNotifications,
  mockUsers,
} from '@/data/mockData';

// This service layer abstracts all data operations so a real backend
// (Node.js + Firebase/Supabase) can replace the mock implementations later.

export const authService = {
  async login(email: string, _password: string): Promise<User> {
    await delay();
    const user = Object.values(mockUsers).find((u) => u.email === email) ?? mockUsers['u1'];
    return { ...user, email };
  },

  async signup(data: { name: string; email: string; mobile: string; location: string }): Promise<User> {
    await delay();
    return {
      id: `u-${Date.now()}`,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      location: data.location,
      role: 'farmer',
      verified: false,
    };
  },

  async setRole(userId: string, role: UserRole): Promise<User> {
    await delay();
    const roleUser = Object.values(mockUsers).find((u) => u.role === role);
    const base = Object.values(mockUsers).find((u) => u.id === userId) ?? mockUsers['u1'];
    return { ...base, ...roleUser, role, id: userId };
  },
};

export const productService = {
  async list(): Promise<Product[]> {
    await delay();
    return mockProducts;
  },

  async create(product: Omit<Product, 'id' | 'createdAt' | 'buyerInterest' | 'status'>): Promise<Product> {
    await delay();
    return {
      ...product,
      id: `p-${Date.now()}`,
      status: 'Active',
      buyerInterest: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    };
  },

  async update(id: string, updates: Partial<Product>): Promise<Product> {
    await delay();
    const product = mockProducts.find((p) => p.id === id);
    if (!product) throw new Error('Product not found');
    return { ...product, ...updates };
  },

  async delete(id: string): Promise<void> {
    await delay();
  },
};

export const orderService = {
  async list(): Promise<Order[]> {
    await delay();
    return mockOrders;
  },

  async create(productId: string, quantity: number, deliveryLocation: string, products: Product[], user: User): Promise<Order> {
    await delay();
    const product = products.find((p) => p.id === productId);
    if (!product) throw new Error('Product not found');
    const subtotal = product.sellingPrice * quantity;
    const transportCost = Math.round(product.distance * 15 + 100);
    return {
      id: `AU${Math.floor(1025 + Math.random() * 900)}`,
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
      total: subtotal + transportCost,
      status: 'Order Confirmed',
      deliveryLocation,
      createdAt: new Date().toISOString().slice(0, 10),
    };
  },

  async updateStatus(orderId: string, status: OrderStatus): Promise<void> {
    await delay();
  },
};

export const transportService = {
  async listJobs(): Promise<TransportJob[]> {
    await delay();
    return mockTransportJobs;
  },

  async acceptJob(jobId: string, userId: string): Promise<void> {
    await delay();
  },

  async updateStatus(jobId: string, status: TransportJobStatus): Promise<void> {
    await delay();
  },
};

export const aiService = {
  async getInsights(): Promise<AIInsight[]> {
    await delay();
    return mockAIInsights;
  },

  async getInsight(productName: string): Promise<AIInsight | null> {
    await delay();
    return mockAIInsights.find((i) => i.productName.toLowerCase() === productName.toLowerCase()) ?? null;
  },
};

export const notificationService = {
  async list(): Promise<AppNotification[]> {
    await delay();
    return mockNotifications;
  },
};

function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type UserRole = 'farmer' | 'buyer' | 'transporter';

export type ProductCategory = 'Vegetables' | 'Fruits' | 'Grains' | 'Spices';

export type ProductGrade = 'Grade A' | 'Grade B' | 'Grade C';

export type ProductStatus = 'Active' | 'Sold' | 'Expired' | 'Paused';

export type OrderStatus =
  | 'Order Confirmed'
  | 'Farmer Accepted'
  | 'Transporter Assigned'
  | 'In Transit'
  | 'Delivered'
  | 'Payment Done';

export type TransportJobStatus = 'Available' | 'Accepted' | 'Picked Up' | 'Delivered';

export type NotificationType =
  | 'new_buyer'
  | 'new_order'
  | 'transporter_assigned'
  | 'delivery_completed'
  | 'high_demand'
  | 'market_price_update';

export interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
  location: string;
  role: UserRole;
  verified: boolean;
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerVerified: boolean;
  name: string;
  category: ProductCategory;
  quantity: number;
  unit: string;
  sellingPrice: number;
  harvestDate: string;
  grade: ProductGrade;
  availableFrom: string;
  location: string;
  distance: number;
  image: string;
  status: ProductStatus;
  buyerInterest: number;
  createdAt: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  buyerId: string;
  buyerName: string;
  farmerId: string;
  farmerName: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  subtotal: number;
  transportCost: number;
  total: number;
  status: OrderStatus;
  deliveryLocation: string;
  createdAt: string;
  transporterId?: string;
  transporterName?: string;
  eta?: string;
}

export interface TransportJob {
  id: string;
  orderId: string;
  productName: string;
  productImage: string;
  pickupLocation: string;
  deliveryLocation: string;
  distance: number;
  load: number;
  unit: string;
  estimatedEarnings: number;
  status: TransportJobStatus;
  pickupTime?: string;
  deliveryDeadline?: string;
  transporterId?: string;
  farmerName: string;
  buyerName: string;
}

export interface AIInsight {
  id: string;
  productId?: string;
  productName: string;
  currentDemand: number;
  forecastDemand: number;
  forecastDays: number;
  demandTrend: 'up' | 'down' | 'stable';
  marketPriceLow: number;
  marketPriceHigh: number;
  farmerPrice?: number;
  recommendation: string;
  weeklyData: { day: string; demand: number; price: number }[];
}

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface DemandDataPoint {
  day: string;
  demand: number;
  price: number;
}

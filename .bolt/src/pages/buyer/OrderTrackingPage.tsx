import { ArrowLeft, Truck, MapPin, Clock, Navigation } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { OrderTimeline } from '@/components/ui/OrderTimeline';
import { MapTrackingCard } from '@/components/ui/MapTrackingCard';
import { StatusBadge } from '@/components/ui/StatusBadge';

export function OrderTrackingPage({ orderId }: { orderId: string }) {
  const { orders, navigate } = useApp();

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Order not found.</p>
        <button onClick={() => navigate({ name: 'buyerOrders' })} className="btn-primary mt-4 px-5 py-2.5 text-sm">
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
      <button onClick={() => navigate({ name: 'buyerOrders' })} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
          <p className="text-sm text-gray-500 mt-1">{order.productName} — {order.quantity} {order.unit}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="card p-4">
        <div className="flex items-center gap-3">
          <img src={order.productImage} alt={order.productName} className="w-16 h-16 rounded-xl object-cover" />
          <div className="flex-1">
            <p className="font-bold text-gray-900">{order.productName}</p>
            <p className="text-sm text-gray-500">{order.quantity} {order.unit} · ₹{order.pricePerUnit}/{order.unit}</p>
            <p className="text-sm text-gray-500">From: {order.farmerName}</p>
          </div>
          <p className="text-lg font-bold text-brand-700">₹{order.total.toLocaleString()}</p>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Order Timeline</h2>
        <OrderTimeline currentStatus={order.status} />
      </div>

      <MapTrackingCard
        pickupLocation={order.farmerName + ' — ' + (order.deliveryLocation ? 'Maharashtra' : 'Nashik')}
        deliveryLocation={order.deliveryLocation}
        distance={18}
        eta={order.eta ?? 'Calculating...'}
        status={order.status}
        transporterName={order.transporterName}
      />

      {order.status === 'In Transit' && (
        <div className="card p-4 bg-accent-50/30 border-accent-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
              <Truck className="w-5 h-5 text-accent-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">In Transit</p>
              <p className="text-xs text-gray-500">ETA: {order.eta ?? '1 hr 20 min'}</p>
            </div>
          </div>
        </div>
      )}

      {order.status === 'Delivered' && (
        <div className="card p-4 bg-success-50/30 border-success-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Delivered Successfully</p>
              <p className="text-xs text-gray-500">Order has been completed</p>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => navigate({ name: 'buyerOrders' })} className="btn-secondary w-full py-3 text-sm">
        Back to Orders
      </button>
    </div>
  );
}

import { CheckCircle2 as CheckCircle } from 'lucide-react';

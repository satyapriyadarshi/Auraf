import type { Order } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useApp } from '@/context/AppContext';
import { Truck, MapPin } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
  showTrack?: boolean;
}

export function OrderCard({ order, onClick, showTrack = true }: OrderCardProps) {
  const { navigate } = useApp();

  return (
    <button
      onClick={onClick ?? (() => navigate({ name: 'orderTracking', orderId: order.id }))}
      className="card-hover w-full p-4 text-left"
    >
      <div className="flex items-start gap-3">
        <img src={order.productImage} alt={order.productName} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" loading="lazy" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-bold text-gray-900 text-sm">{order.productName}</p>
              <p className="text-xs text-gray-500 mt-0.5">{order.quantity} {order.unit} · ₹{order.pricePerUnit}/{order.unit}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="font-medium text-gray-600">#{order.id}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{order.buyerName}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3" />
                {order.transporterName ?? 'Unassigned'}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {order.deliveryLocation}
              </span>
            </div>
            <span className="text-sm font-bold text-gray-900">₹{order.total.toLocaleString()}</span>
          </div>
          {showTrack && order.status !== 'Delivered' && order.status !== 'Payment Done' && (
            <div className="mt-2 text-xs text-brand-600 font-medium">Tap to track →</div>
          )}
        </div>
      </div>
    </button>
  );
}

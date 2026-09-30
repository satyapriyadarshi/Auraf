import type { AppNotification } from '@/types';
import { Bell, ShoppingBag, Truck, CheckCircle2, TrendingUp, Tag, UserPlus } from 'lucide-react';

const iconMap = {
  new_buyer: UserPlus,
  new_order: ShoppingBag,
  transporter_assigned: Truck,
  delivery_completed: CheckCircle2,
  high_demand: TrendingUp,
  market_price_update: Tag,
};

const colorMap = {
  new_buyer: 'bg-blue-50 text-blue-600',
  new_order: 'bg-brand-50 text-brand-600',
  transporter_assigned: 'bg-accent-50 text-accent-600',
  delivery_completed: 'bg-success-50 text-success-600',
  high_demand: 'bg-accent-50 text-accent-600',
  market_price_update: 'bg-violet-50 text-violet-600',
};

interface NotificationCardProps {
  notification: AppNotification;
  onClick?: () => void;
}

export function NotificationCard({ notification, onClick }: NotificationCardProps) {
  const Icon = iconMap[notification.type] ?? Bell;
  const colorClass = colorMap[notification.type] ?? 'bg-gray-50 text-gray-600';

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 p-4 rounded-xl border transition-all text-left ${
        notification.read
          ? 'bg-white border-gray-100 hover:border-gray-200'
          : 'bg-brand-50/30 border-brand-100 hover:border-brand-200'
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
          {!notification.read && <span className="w-2 h-2 rounded-full bg-brand-600 flex-shrink-0" />}
        </div>
        <p className="text-sm text-gray-500 mt-0.5">{notification.message}</p>
        <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
      </div>
    </button>
  );
}

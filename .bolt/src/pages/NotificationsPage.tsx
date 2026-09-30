import { Bell, CheckCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { NotificationCard } from '@/components/ui/NotificationCard';
import { EmptyState } from '@/components/ui/EmptyState';

export function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead, navigate, showToast } = useApp();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {unreadCount > 0 && <p className="text-sm text-gray-500 mt-1">{unreadCount} unread</p>}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={() => {
              markAllNotificationsRead();
              showToast('All notifications marked as read', 'info');
            }}
            className="btn-secondary px-3 py-2 text-sm"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-2">
          {notifications.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              onClick={() => {
                markNotificationRead(n.id);
                if (n.type === 'new_order' || n.type === 'delivery_completed' || n.type === 'transporter_assigned') {
                  navigate({ name: 'buyerOrders' });
                } else if (n.type === 'high_demand' || n.type === 'market_price_update') {
                  navigate({ name: 'farmerInsights' });
                }
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState icon={Bell} title="No notifications" description="You're all caught up!" />
      )}
    </div>
  );
}

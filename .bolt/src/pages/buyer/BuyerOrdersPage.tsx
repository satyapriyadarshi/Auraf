import { ShoppingCart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { OrderCard } from '@/components/cards/OrderCard';
import { EmptyState } from '@/components/ui/EmptyState';

export function BuyerOrdersPage() {
  const { user, orders, navigate } = useApp();

  if (!user) return null;

  const myOrders = orders.filter((o) => o.buyerId === user.id);

  return (
    <div className="space-y-5 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>

      {myOrders.length > 0 ? (
        <div className="space-y-3">
          {myOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={ShoppingCart}
          title="No orders yet"
          description="Browse the marketplace to find fresh produce from local farmers."
          action={{ label: 'Browse Marketplace', onClick: () => navigate({ name: 'marketplace' }) }}
        />
      )}
    </div>
  );
}

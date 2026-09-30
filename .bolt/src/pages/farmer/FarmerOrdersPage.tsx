import { Package } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { OrderCard } from '@/components/cards/OrderCard';
import { EmptyState } from '@/components/ui/EmptyState';

export function FarmerOrdersPage() {
  const { user, orders, navigate } = useApp();

  if (!user) return null;

  const myOrders = orders.filter((o) => o.farmerId === user.id);

  return (
    <div className="space-y-5 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900">Orders</h1>

      {myOrders.length > 0 ? (
        <div className="space-y-3">
          {myOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="Orders from buyers will appear here once your produce is listed."
          action={{ label: 'Add Produce', onClick: () => navigate({ name: 'addProduce' }) }}
        />
      )}
    </div>
  );
}

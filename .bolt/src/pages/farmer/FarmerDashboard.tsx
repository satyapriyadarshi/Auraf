import { Sprout, IndianRupee, TrendingUp, Package, Plus, MapPin, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/ui/StatCard';
import { AIInsightCard } from '@/components/ui/AIInsightCard';
import { OrderCard } from '@/components/cards/OrderCard';
import { EmptyState } from '@/components/ui/EmptyState';

export function FarmerDashboard() {
  const { user, products, orders, aiInsights, navigate } = useApp();

  if (!user) return null;

  const myProducts = products.filter((p) => p.farmerId === user.id);
  const activeListings = myProducts.filter((p) => p.status === 'Active');
  const myOrders = orders.filter((o) => o.farmerId === user.id);
  const inTransitOrders = myOrders.filter((o) => o.status === 'In Transit');
  const tomatoInsight = aiInsights.find((i) => i.productName === 'Tomato');
  const recentOrders = myOrders.slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Good Morning, {user.name.split(' ')[0]} 👋</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              {user.location}
            </p>
          </div>
          <button onClick={() => navigate({ name: 'addProduce' })} className="btn-primary px-4 py-2.5 text-sm lg:hidden">
            <Plus className="w-4.5 h-4.5" />
            Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="My Produce"
          value={`${activeListings.length}`}
          sublabel="Active Listings"
          icon={<Sprout className="w-5 h-5" />}
          accent="brand"
        />
        <StatCard
          label="My Selling Prices"
          value="Farmer"
          sublabel="Controlled"
          icon={<IndianRupee className="w-5 h-5" />}
          accent="accent"
        />
        <StatCard
          label="Demand Forecast"
          value="↑ 18%"
          sublabel="Next 7 days"
          icon={<TrendingUp className="w-5 h-5" />}
          accent="blue"
          trend={{ value: '18%', direction: 'up' }}
        />
        <StatCard
          label="Active Orders"
          value={`${inTransitOrders.length}`}
          sublabel="In Transit"
          icon={<Package className="w-5 h-5" />}
          accent="purple"
        />
      </div>

      <div className="flex gap-3">
        <button onClick={() => navigate({ name: 'addProduce' })} className="btn-primary px-5 py-3 text-sm hidden lg:flex">
          <Plus className="w-4.5 h-4.5" />
          Add Produce
        </button>
      </div>

      {tomatoInsight && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">AI Market Insight</h2>
          <AIInsightCard insight={tomatoInsight} onAction={() => navigate({ name: 'farmerInsights' })} />
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          <button onClick={() => navigate({ name: 'farmerOrders' })} className="text-sm text-brand-600 font-medium flex items-center gap-1">
            View All
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        {recentOrders.length > 0 ? (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Package}
            title="No orders yet"
            description="Your produce listings will appear here once buyers place orders."
            action={{ label: 'Add Produce', onClick: () => navigate({ name: 'addProduce' }) }}
          />
        )}
      </div>
    </div>
  );
}

import { BarChart3, TrendingUp, Package, IndianRupee, Brain, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/ui/StatCard';
import { DemandChart, PriceChart } from '@/components/ui/Charts';

export function BuyerInsightsPage() {
  const { user, orders, aiInsights, navigate } = useApp();

  if (!user) return null;

  const myOrders = orders.filter((o) => o.buyerId === user.id);
  const totalSpent = myOrders.reduce((sum, o) => sum + o.total, 0);
  const monthlySpending = Math.round(totalSpent / 3);
  const totalQuantity = myOrders.reduce((sum, o) => sum + o.quantity, 0);

  const potatoInsight = aiInsights.find((i) => i.productName === 'Potato');
  const tomatoInsight = aiInsights.find((i) => i.productName === 'Tomato');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Business Insights</h1>
        <p className="text-sm text-gray-500 mt-1">Track your purchasing patterns and demand forecasts</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Orders" value={`${myOrders.length}`} icon={<Package className="w-5 h-5" />} accent="brand" />
        <StatCard label="Monthly Spending" value={`₹${monthlySpending.toLocaleString()}`} icon={<IndianRupee className="w-5 h-5" />} accent="accent" />
        <StatCard label="Current Inventory" value={`${totalQuantity} kg`} icon={<BarChart3 className="w-5 h-5" />} accent="blue" />
        <StatCard label="Upcoming Demand" value="↑ 15%" sublabel="Next week" icon={<TrendingUp className="w-5 h-5" />} accent="purple" trend={{ value: '15%', direction: 'up' }} />
      </div>

      {potatoInsight && (
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Purchase History — Potato</h2>
              <p className="text-xs text-gray-500">Demand forecast for next 7 days</p>
            </div>
          </div>
          <DemandChart data={potatoInsight.weeklyData} />
        </div>
      )}

      {tomatoInsight && (
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-accent-600 flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Price Information — Tomato</h2>
              <p className="text-xs text-gray-500">Market price trend (₹/kg)</p>
            </div>
          </div>
          <PriceChart data={tomatoInsight.weeklyData} />
          <div className="flex items-center justify-between mt-3 text-sm">
            <span className="text-gray-500">Current Range</span>
            <span className="font-bold text-gray-900">₹{tomatoInsight.marketPriceLow}–{tomatoInsight.marketPriceHigh}/kg</span>
          </div>
        </div>
      )}

      <div className="card p-5 bg-gradient-to-br from-brand-50/50 to-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <Brain className="w-4.5 h-4.5 text-white" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">AI Recommendation</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          Potato demand may increase by 15% next week. Consider placing orders early to secure supply at current prices.
        </p>
        <button onClick={() => navigate({ name: 'marketplace' })} className="text-sm text-brand-600 font-medium flex items-center gap-1">
          Browse Marketplace
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

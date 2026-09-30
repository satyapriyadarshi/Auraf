import { Store, MapPin, Search, TrendingUp, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SearchBar } from '@/components/ui/SearchBar';
import { ProductCard } from '@/components/cards/ProductCard';
import { categories } from '@/data/mockData';
import { useState } from 'react';

export function BuyerDashboard() {
  const { user, products, navigate } = useApp();
  const [search, setSearch] = useState('');

  if (!user) return null;

  const activeProducts = products.filter((p) => p.status === 'Active' && p.quantity > 0);
  const filtered = search
    ? activeProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : activeProducts;
  const recommended = filtered.slice(0, 6);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name.split(' ')[0]} 👋</h1>
        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
          <MapPin className="w-3.5 h-3.5" />
          {user.location}
        </p>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search vegetables, fruits, grains…"
      />

      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Categories</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => navigate({ name: 'marketplace' })}
              className="card-hover p-3 text-center"
            >
              <div className="text-2xl mb-1">{cat.emoji}</div>
              <p className="text-xs font-medium text-gray-700">{cat.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">Recommended Produce</h2>
          <button onClick={() => navigate({ name: 'marketplace' })} className="text-sm text-brand-600 font-medium flex items-center gap-1">
            View All
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        {recommended.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommended.map((product) => (
              <ProductCard key={product.id} product={product} onBuy={() => navigate({ name: 'productDetails', productId: product.id })} />
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <Store className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No produce found. Try a different search.</p>
          </div>
        )}
      </div>

      <div className="card p-4 bg-gradient-to-br from-brand-50/50 to-white">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <TrendingUp className="w-4.5 h-4.5 text-white" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">AI Insight</h3>
        </div>
        <p className="text-sm text-gray-600">Potato demand may increase by 15% next week. Consider stocking up early.</p>
        <button onClick={() => navigate({ name: 'buyerInsights' })} className="text-sm text-brand-600 font-medium mt-2 flex items-center gap-1">
          View Insights
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

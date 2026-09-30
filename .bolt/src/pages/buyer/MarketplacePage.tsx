import { useState } from 'react';
import { Store } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterPanel, type FilterValues } from '@/components/ui/FilterPanel';
import { ProductCard } from '@/components/cards/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { categories } from '@/data/mockData';
import type { ProductCategory } from '@/types';

const defaultFilters: FilterValues = {
  category: 'All',
  priceRange: [0, 500],
  maxDistance: 200,
  minQuantity: 0,
  grade: 'All',
  availability: 'All',
};

export function MarketplacePage() {
  const { products, navigate } = useApp();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterValues>(defaultFilters);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All');

  const activeProducts = products.filter((p) => p.status === 'Active' && p.quantity > 0);

  const filtered = activeProducts.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (filters.category !== 'All' && p.category !== filters.category) return false;
    if (p.sellingPrice < filters.priceRange[0] || p.sellingPrice > filters.priceRange[1]) return false;
    if (p.distance > filters.maxDistance) return false;
    if (p.quantity < filters.minQuantity) return false;
    if (filters.grade !== 'All' && p.grade !== filters.grade) return false;
    if (filters.availability === 'Available' && p.quantity <= 0) return false;
    return true;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>

      <div className="flex gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search vegetables, fruits, grains…"
          className="flex-1"
        />
        <FilterPanel
          values={filters}
          onChange={setFilters}
          onReset={() => setFilters(defaultFilters)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {(['All', ...categories.map((c) => c.value)] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-brand-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat === 'All' ? 'All' : `${categories.find((c) => c.value === cat)?.emoji} ${cat}`}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500">{filtered.length} products available</p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={() => navigate({ name: 'productDetails', productId: product.id })}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Store}
          title="No products found"
          description="Try adjusting your filters or search to find produce."
        />
      )}
    </div>
  );
}

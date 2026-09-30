import { Brain, TrendingUp, TrendingDown, Info, BarChart3 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { AIInsightCard } from '@/components/ui/AIInsightCard';
import { MarketInfoCard } from '@/components/ui/MarketInfoCard';
import { DemandChart, PriceChart } from '@/components/ui/Charts';
import { useState } from 'react';

export function FarmerInsightsPage() {
  const { aiInsights, products, user } = useApp();
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!user) return null;

  const insight = aiInsights[selectedIdx];
  const myProduct = products.find(
    (p) => p.farmerId === user.id && p.name.toLowerCase().includes(insight.productName.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Market Insights</h1>
        <p className="text-sm text-gray-500 mt-1">Demand forecasts and market price information for your produce</p>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {aiInsights.map((ins, i) => (
          <button
            key={ins.id}
            onClick={() => setSelectedIdx(i)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              selectedIdx === i
                ? 'bg-brand-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {ins.productName}
          </button>
        ))}
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{insight.productName} — Demand Forecast</h2>
            <p className="text-xs text-gray-500">Next {insight.forecastDays} days · {insight.demandTrend === 'up' ? 'High Demand Expected' : insight.demandTrend === 'down' ? 'Demand Declining' : 'Stable Demand'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">Current Demand</p>
            <p className="text-xl font-bold text-gray-900">{insight.currentDemand.toLocaleString()} kg</p>
          </div>
          <div className="bg-brand-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">Forecast</p>
            <div className="flex items-center gap-1">
              <p className="text-xl font-bold text-brand-700">{insight.forecastDemand.toLocaleString()} kg</p>
              {insight.demandTrend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-brand-600" />
              ) : insight.demandTrend === 'down' ? (
                <TrendingDown className="w-4 h-4 text-red-500" />
              ) : null}
            </div>
          </div>
        </div>

        <div className="mb-2">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-brand-600" />
            Demand Trend
          </h3>
          <DemandChart data={insight.weeklyData} />
        </div>
      </div>

      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Market Price Information</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-accent-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">Market Range</p>
            <p className="text-lg font-bold text-gray-900">₹{insight.marketPriceLow}–{insight.marketPriceHigh}/kg</p>
          </div>
          <div className="bg-brand-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">Your Selling Price</p>
            <p className="text-lg font-bold text-brand-700">₹{myProduct?.sellingPrice ?? insight.farmerPrice ?? '—'}/kg</p>
          </div>
        </div>
        <PriceChart data={insight.weeklyData} />
        <div className="flex items-center gap-1.5 mt-3 text-xs text-brand-600 font-medium">
          <Info className="w-3.5 h-3.5" />
          Market information only — farmer decides the selling price.
        </div>
      </div>

      <div className="card p-5 bg-gradient-to-br from-brand-50/50 to-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <Brain className="w-4.5 h-4.5 text-white" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">AI Recommendation</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">{insight.recommendation}</p>
        <div className="bg-brand-50 rounded-lg px-3 py-2">
          <p className="text-xs font-medium text-brand-700">You decide your selling price.</p>
        </div>
      </div>

      <AIInsightCard insight={insight} compact />

      <MarketInfoCard
        priceLow={insight.marketPriceLow}
        priceHigh={insight.marketPriceHigh}
        farmerPrice={myProduct?.sellingPrice ?? insight.farmerPrice}
        productName={insight.productName}
      />
    </div>
  );
}

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { AIInsight } from '@/types';

interface AIInsightCardProps {
  insight: AIInsight;
  onAction?: () => void;
  compact?: boolean;
}

export function AIInsightCard({ insight, onAction, compact }: AIInsightCardProps) {
  const trendIcon = insight.demandTrend === 'up' ? TrendingUp : insight.demandTrend === 'down' ? TrendingDown : Minus;
  const TrendIcon = trendIcon;
  const trendColor = insight.demandTrend === 'up' ? 'text-brand-600' : insight.demandTrend === 'down' ? 'text-red-500' : 'text-gray-500';
  const changePercent = Math.round(((insight.forecastDemand - insight.currentDemand) / insight.currentDemand) * 100);

  return (
    <div className="card p-4 bg-gradient-to-br from-brand-50/50 to-white">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
          <TrendingUp className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900">AI Market Insight</h3>
          <p className="text-xs text-gray-400">{insight.productName} · Next {insight.forecastDays} days</p>
        </div>
      </div>

      {!compact && (
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-white rounded-xl p-3 border border-gray-100">
            <p className="text-xs text-gray-400 mb-1">Current Demand</p>
            <p className="text-lg font-bold text-gray-900">{insight.currentDemand.toLocaleString()} kg</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100">
            <p className="text-xs text-gray-400 mb-1">Forecast</p>
            <div className="flex items-center gap-1">
              <p className="text-lg font-bold text-gray-900">{insight.forecastDemand.toLocaleString()} kg</p>
              <span className={`text-xs font-semibold ${trendColor} flex items-center`}>
                <TrendIcon className="w-3.5 h-3.5" />
                {Math.abs(changePercent)}%
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-3 border border-gray-100 mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400">Market Price Range</span>
          <span className="text-sm font-bold text-gray-900">₹{insight.marketPriceLow}–{insight.marketPriceHigh}/kg</span>
        </div>
        {insight.farmerPrice && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Your Selling Price</span>
            <span className="text-sm font-bold text-brand-700">₹{insight.farmerPrice}/kg</span>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 leading-relaxed mb-3">{insight.recommendation}</p>

      <div className="bg-brand-50 rounded-lg px-3 py-2 mb-3">
        <p className="text-xs font-medium text-brand-700">You decide your selling price.</p>
      </div>

      {onAction && (
        <button onClick={onAction} className="btn-secondary w-full py-2.5 text-sm">
          View Detailed Forecast
        </button>
      )}
    </div>
  );
}

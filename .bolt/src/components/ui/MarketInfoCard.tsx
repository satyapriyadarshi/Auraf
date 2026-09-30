import { Info } from 'lucide-react';

interface MarketInfoCardProps {
  priceLow: number;
  priceHigh: number;
  farmerPrice?: number;
  productName?: string;
}

export function MarketInfoCard({ priceLow, priceHigh, farmerPrice, productName }: MarketInfoCardProps) {
  return (
    <div className="card p-4 bg-accent-50/30 border-accent-100">
      <div className="flex items-start gap-2 mb-2">
        <Info className="w-4.5 h-4.5 text-accent-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-gray-900">Market Price Insight</h4>
          {productName && <p className="text-xs text-gray-400">{productName}</p>}
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        {productName ? `${productName} is` : 'Similar produce is'} currently being listed around{' '}
        <span className="font-semibold text-gray-900">₹{priceLow}–{priceHigh}/kg</span>.
      </p>
      {farmerPrice && (
        <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 mb-2 border border-accent-100">
          <span className="text-xs text-gray-500">Your Selling Price</span>
          <span className="text-sm font-bold text-brand-700">₹{farmerPrice}/kg</span>
        </div>
      )}
      <p className="text-xs text-gray-500 italic">
        This is only market information. Your selling price remains your decision.
      </p>
    </div>
  );
}

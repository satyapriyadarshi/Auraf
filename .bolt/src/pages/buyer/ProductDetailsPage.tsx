import { useState } from 'react';
import { ArrowLeft, BadgeCheck, MapPin, Calendar, Package, TrendingUp, Clock, Info, Truck, MessageCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { MarketInfoCard } from '@/components/ui/MarketInfoCard';

export function ProductDetailsPage({ productId }: { productId: string }) {
  const { products, aiInsights, navigate, user, showToast } = useApp();
  const [quantity, setQuantity] = useState(100);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Product not found.</p>
        <button onClick={() => navigate({ name: 'marketplace' })} className="btn-primary mt-4 px-5 py-2.5 text-sm">
          Back to Marketplace
        </button>
      </div>
    );
  }

  const insight = aiInsights.find((i) => product.name.toLowerCase().includes(i.productName.toLowerCase()));
  const harvestDays = product.harvestDate
    ? Math.max(0, Math.floor((Date.now() - new Date(product.harvestDate).getTime()) / 86400000))
    : 0;

  const handleBuyNow = () => {
    if (quantity > product.quantity) {
      showToast(`Only ${product.quantity} ${product.unit} available`, 'error');
      return;
    }
    navigate({ name: 'checkout', productId: product.id, quantity });
  };

  const handleContactFarmer = () => {
    showToast(`Contact request sent to ${product.farmerName}`, 'info');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">
      <button onClick={() => navigate({ name: 'marketplace' })} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Marketplace
      </button>

      <div className="card overflow-hidden">
        <div className="h-56 sm:h-72 bg-gray-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <span className="badge bg-brand-50 text-brand-700">{product.grade}</span>
          </div>
          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-sm text-gray-500">{product.farmerName}</span>
            {product.farmerVerified && <BadgeCheck className="w-4 h-4 text-brand-600" />}
            <span className="text-xs text-brand-600 font-medium">Verified Farmer ✓</span>
          </div>

          <div className="bg-brand-50 rounded-xl p-4 mb-4">
            <p className="text-xs text-gray-500 mb-0.5">Farmer's Price</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-brand-700">₹{product.sellingPrice}</span>
              <span className="text-sm text-gray-500">/{product.unit}</span>
            </div>
            <p className="text-xs text-brand-600 font-medium mt-1">Final selling price is set by the farmer.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <InfoRow icon={Package} label="Available" value={`${product.quantity} ${product.unit}`} />
            <InfoRow icon={MapPin} label="Location" value={`${product.distance} km away`} />
            <InfoRow icon={Calendar} label="Harvest" value={harvestDays === 0 ? 'Today' : `${harvestDays} days ago`} />
            <InfoRow icon={BadgeCheck} label="Quality" value={product.grade} />
          </div>

          {insight && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-accent-50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-4 h-4 text-accent-600" />
                  <span className="text-xs text-gray-500">Demand</span>
                </div>
                <p className="text-sm font-bold text-gray-900">High Demand</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-gray-500">Est. Delivery</span>
                </div>
                <p className="text-sm font-bold text-gray-900">4 hours</p>
              </div>
            </div>
          )}

          {insight && (
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-1.5 mb-1">
                <Info className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-semibold text-gray-600">Market Information</span>
              </div>
              <p className="text-sm text-gray-600">Nearby market prices: ₹{insight.marketPriceLow}–{insight.marketPriceHigh}/kg.</p>
            </div>
          )}

          <div className="mb-4">
            <label className="label">Select Quantity</label>
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={product.quantity}
              unit={product.unit}
            />
            <p className="text-sm text-gray-500 mt-2">
              Subtotal: <span className="font-bold text-gray-900">₹{(product.sellingPrice * quantity).toLocaleString()}</span>
            </p>
          </div>

          <div className="flex gap-3">
            <button onClick={handleBuyNow} className="btn-primary flex-1 py-3.5 text-base">
              Buy Now
            </button>
            <button onClick={handleContactFarmer} className="btn-secondary px-4 py-3.5">
              <MessageCircle className="w-4.5 h-4.5" />
              Contact Farmer
            </button>
          </div>
        </div>
      </div>

      {insight && (
        <MarketInfoCard
          priceLow={insight.marketPriceLow}
          priceHigh={insight.marketPriceHigh}
          farmerPrice={product.sellingPrice}
          productName={product.name}
        />
      )}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl p-3">
      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

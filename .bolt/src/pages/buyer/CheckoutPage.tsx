import { useState } from 'react';
import { ArrowLeft, MapPin, IndianRupee, Truck } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function CheckoutPage({ productId, quantity }: { productId: string; quantity: number }) {
  const { products, user, navigate, createOrder, showToast } = useApp();
  const [deliveryLocation, setDeliveryLocation] = useState(user?.location ?? '');

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

  const subtotal = product.sellingPrice * quantity;
  const transportCost = Math.round(product.distance * 15 + 100);
  const total = subtotal + transportCost;

  const handleProceed = () => {
    if (!deliveryLocation) {
      showToast('Please enter delivery location', 'error');
      return;
    }
    const orderId = createOrder(productId, quantity, deliveryLocation);
    if (orderId) {
      navigate({ name: 'payment', orderId });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
      <button onClick={() => navigate({ name: 'productDetails', productId })} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>

      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Order Summary</h2>
        <div className="flex items-center gap-3 mb-4">
          <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover" />
          <div>
            <p className="font-bold text-gray-900">{product.name}</p>
            <p className="text-sm text-gray-500">{product.farmerName}</p>
          </div>
        </div>

        <div className="space-y-2.5 border-t border-gray-100 pt-3">
          <Row label={`Farmer's Price`} value={`₹${product.sellingPrice}/${product.unit}`} highlight />
          <Row label="Quantity" value={`${quantity} ${product.unit}`} />
          <Row label="Produce Subtotal" value={`₹${subtotal.toLocaleString()}`} />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Truck className="w-4 h-4" />
            <span>Estimated Transport</span>
            <span className="ml-auto font-semibold text-gray-900">₹{transportCost.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-3">
            <span className="text-base font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-brand-700">₹{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-4">
          <label className="label">Delivery Location</label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
            <input
              type="text"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              placeholder="Enter delivery address"
              className="input pl-11"
            />
          </div>
        </div>
      </div>

      <div className="bg-brand-50 rounded-xl p-3 flex items-center gap-2">
        <IndianRupee className="w-4 h-4 text-brand-600 flex-shrink-0" />
        <p className="text-xs text-brand-700">The farmer's selling price is final. No AI-generated pricing is applied.</p>
      </div>

      <button onClick={handleProceed} className="btn-primary w-full py-3.5 text-base">
        Proceed to Payment
      </button>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={highlight ? 'font-bold text-brand-700' : 'font-semibold text-gray-900'}>{value}</span>
    </div>
  );
}

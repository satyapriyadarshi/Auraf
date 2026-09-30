import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Smartphone, CreditCard, Building2, Wallet } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function PaymentPage({ orderId }: { orderId: string }) {
  const { orders, navigate, updateOrderStatus, showToast } = useApp();
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking' | 'cash'>('upi');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Order not found.</p>
        <button onClick={() => navigate({ name: 'buyerDashboard' })} className="btn-primary mt-4 px-5 py-2.5 text-sm">
          Back to Home
        </button>
      </div>
    );
  }

  const methods = [
    { id: 'upi' as const, label: 'UPI', icon: Smartphone, desc: 'GPay, PhonePe, Paytm' },
    { id: 'card' as const, label: 'Card', icon: CreditCard, desc: 'Debit / Credit Card' },
    { id: 'netbanking' as const, label: 'Net Banking', icon: Building2, desc: 'All major banks' },
    { id: 'cash' as const, label: 'Cash / Other', icon: Wallet, desc: 'Pay on delivery' },
  ];

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      updateOrderStatus(orderId, 'Payment Done');
      showToast('Payment successful!', 'success');
    }, 1200);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto text-center py-12 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-12 h-12 text-brand-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful ✓</h1>
        <p className="text-gray-500 mb-6">Your order has been placed.</p>

        <div className="card p-4 mb-6 text-left">
          <div className="flex items-center gap-3 mb-3">
            <img src={order.productImage} alt={order.productName} className="w-14 h-14 rounded-xl object-cover" />
            <div>
              <p className="font-bold text-gray-900">{order.productName}</p>
              <p className="text-sm text-gray-500">{order.quantity} {order.unit} · ₹{order.total.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Order ID</span>
            <span className="font-semibold text-gray-900">#{order.id}</span>
          </div>
        </div>

        <button onClick={() => navigate({ name: 'orderTracking', orderId: order.id })} className="btn-primary w-full py-3.5 text-base">
          Track Order
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
      <button onClick={() => navigate({ name: 'buyerDashboard' })} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h1 className="text-2xl font-bold text-gray-900">Payment</h1>

      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Order Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Product</span><span className="font-semibold text-gray-900">{order.productName}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Quantity</span><span className="font-semibold text-gray-900">{order.quantity} {order.unit}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-semibold text-gray-900">₹{order.subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Transport</span><span className="font-semibold text-gray-900">₹{order.transportCost.toLocaleString()}</span></div>
          <div className="flex justify-between border-t border-gray-100 pt-2 mt-2">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-brand-700">₹{order.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Payment Method</h2>
        <div className="space-y-2">
          {methods.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  method === m.id
                    ? 'border-brand-600 bg-brand-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method === m.id ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-gray-900">{m.label}</p>
                  <p className="text-xs text-gray-500">{m.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${method === m.id ? 'border-brand-600 bg-brand-600' : 'border-gray-300'}`}>
                  {method === m.id && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <button onClick={handlePay} disabled={loading} className="btn-primary w-full py-3.5 text-base">
        {loading ? 'Processing Payment...' : `Pay ₹${order.total.toLocaleString()}`}
      </button>
    </div>
  );
}

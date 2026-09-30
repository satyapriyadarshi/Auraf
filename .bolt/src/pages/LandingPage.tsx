import {
  Sprout,
  Brain,
  Store,
  Truck,
  MapPin,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function LandingPage() {
  const { navigate } = useApp();

  const features = [
    {
      icon: Brain,
      title: 'AI Demand Forecasting',
      desc: 'Predict market demand and plan your harvest with confidence using AI-powered insights.',
    },
    {
      icon: ShieldCheck,
      title: 'Farmer-Controlled Pricing',
      desc: 'Farmers set their own selling prices. AI provides market information — never overrides the farmer.',
    },
    {
      icon: Store,
      title: 'Smart Marketplace',
      desc: 'Buyers discover fresh produce with full transparency on price, quality, and location.',
    },
    {
      icon: Truck,
      title: 'Logistics Optimization',
      desc: 'Connect with transporters for efficient pickup and delivery across the supply chain.',
    },
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      desc: 'Track every order from farm to market with live status updates and ETAs.',
    },
  ];

  const steps = [
    { num: '1', title: 'Farmer Lists Produce', desc: 'Set your selling price and list your harvest.' },
    { num: '2', title: 'AI Analyses Demand', desc: 'Get market insights and demand forecasts.' },
    { num: '3', title: 'Buyers Discover Produce', desc: 'Retailers find and order your produce.' },
    { num: '4', title: 'Smart Logistics', desc: 'Transporters pick up and deliver efficiently.' },
    { num: '5', title: 'Complete Delivery', desc: 'Track every step until it reaches the buyer.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="absolute top-0 left-0 right-0 z-20 px-4 py-4 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AURAF</span>
          </div>
          <button onClick={() => navigate({ name: 'login' })} className="btn-secondary px-4 py-2 text-sm">
            Login
          </button>
        </div>
      </header>

      <section className="relative pt-32 pb-20 px-4 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 via-white to-white" />
        <div className="absolute top-20 right-0 w-72 h-72 bg-brand-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
            <span className="text-sm font-medium text-brand-700">AI-Powered Agricultural Marketplace</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-5 animate-slide-up">
            Connecting Farmers to Markets.
            <br />
            <span className="text-brand-600">Powered by AI.</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 animate-slide-up">
            Discover buyers, understand demand, make informed decisions and move agricultural produce smarter.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up">
            <button
              onClick={() => navigate({ name: 'signup' })}
              className="btn-primary px-8 py-3.5 text-base w-full sm:w-auto"
            >
              Get Started
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => navigate({ name: 'login' })}
              className="btn-secondary px-8 py-3.5 text-base w-full sm:w-auto"
            >
              Explore Marketplace
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-600" />
              500+ Farmers
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-600" />
              200+ Buyers
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-600" />
              150+ Transporters
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">How It Works</h2>
          <p className="text-gray-500 text-center mb-10">From farm to market in five simple steps</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="card p-5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center text-lg font-bold mx-auto mb-3">
                    {step.num}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">Platform Features</h2>
          <p className="text-gray-500 text-center mb-10">Everything you need to move produce smarter</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="card-hover p-5">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center mb-3">
                    <Icon className="w-5.5 h-5.5 text-brand-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 lg:px-8 bg-brand-700">
        <div className="max-w-4xl mx-auto text-center">
          <TrendingUp className="w-10 h-10 text-brand-200 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            AI provides insights. The farmer makes the pricing decision.
          </h2>
          <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
            AURAF's AI shows market demand and price information, but the farmer always controls their selling price.
            That's our promise.
          </p>
          <button
            onClick={() => navigate({ name: 'signup' })}
            className="btn bg-white text-brand-700 hover:bg-brand-50 px-8 py-3.5 text-base font-semibold rounded-xl transition-all active:scale-[0.98]"
          >
            Get Started Today
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </section>

      <footer className="py-8 px-4 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <Sprout className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">AURAF</span>
          </div>
          <p className="text-sm text-gray-400">From Farm to Market, Smarter.</p>
          <p className="text-xs text-gray-500">© 2026 AURAF. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

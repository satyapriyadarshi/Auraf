import { Sprout, Sprout as Farmer, Store, Truck, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { UserRole } from '@/types';

const roles: { role: UserRole; title: string; emoji: string; icon: typeof Farmer; desc: string; gradient: string }[] = [
  {
    role: 'farmer',
    title: 'Farmer',
    emoji: '👨‍🌾',
    icon: Farmer,
    desc: 'List your produce, set your prices, and reach more buyers with AI insights.',
    gradient: 'from-brand-500 to-brand-700',
  },
  {
    role: 'buyer',
    title: 'Buyer / Retailer',
    emoji: '🏪',
    icon: Store,
    desc: 'Discover fresh produce, compare prices, and order directly from farmers.',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    role: 'transporter',
    title: 'Transporter',
    emoji: '🚚',
    icon: Truck,
    desc: 'Find delivery jobs, optimize routes, and earn from agricultural logistics.',
    gradient: 'from-accent-500 to-accent-700',
  },
];

export function RoleSelectionPage() {
  const { setRole, user } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
          <Sprout className="w-5.5 h-5.5 text-white" />
        </div>
        <span className="text-2xl font-bold text-gray-900">AURAF</span>
      </div>

      <div className="max-w-3xl w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">Who are you?</h1>
        <p className="text-gray-500 text-center mb-8">
          Choose your role to get started{user ? `, ${user.name}` : ''}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.role}
                onClick={() => setRole(r.role)}
                className="card-hover p-6 text-left group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${r.gradient} flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{r.emoji}</span>
                  <h3 className="text-lg font-bold text-gray-900">{r.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{r.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 transition-all">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          You can switch roles anytime from your Profile settings.
        </p>
      </div>
    </div>
  );
}

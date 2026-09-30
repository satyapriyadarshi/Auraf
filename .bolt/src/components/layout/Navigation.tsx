import {
  Home,
  Sprout,
  Package,
  Brain,
  User,
  Store,
  ShoppingCart,
  BarChart3,
  Truck,
  Map,
  Wallet,
  Bell,
  LogOut,
} from 'lucide-react';
import { useApp, type Route } from '@/context/AppContext';
import type { UserRole } from '@/types';

interface NavItem {
  label: string;
  icon: typeof Home;
  route: Route;
  active: string;
}

function getNavItems(role: UserRole, currentRoute: string): NavItem[] {
  if (role === 'farmer') {
    return [
      { label: 'Home', icon: Home, route: { name: 'farmerDashboard' }, active: 'farmerDashboard' },
      { label: 'Produce', icon: Sprout, route: { name: 'myProduce' }, active: 'myProduce' },
      { label: 'Orders', icon: Package, route: { name: 'farmerOrders' }, active: 'farmerOrders' },
      { label: 'AI Insights', icon: Brain, route: { name: 'farmerInsights' }, active: 'farmerInsights' },
      { label: 'Profile', icon: User, route: { name: 'profile' }, active: 'profile' },
    ];
  }
  if (role === 'buyer') {
    return [
      { label: 'Home', icon: Home, route: { name: 'buyerDashboard' }, active: 'buyerDashboard' },
      { label: 'Marketplace', icon: Store, route: { name: 'marketplace' }, active: 'marketplace' },
      { label: 'Orders', icon: ShoppingCart, route: { name: 'buyerOrders' }, active: 'buyerOrders' },
      { label: 'Insights', icon: BarChart3, route: { name: 'buyerInsights' }, active: 'buyerInsights' },
      { label: 'Profile', icon: User, route: { name: 'profile' }, active: 'profile' },
    ];
  }
  return [
    { label: 'Home', icon: Home, route: { name: 'transporterDashboard' }, active: 'transporterDashboard' },
    { label: 'Jobs', icon: Package, route: { name: 'transporterDashboard' }, active: 'transporterDashboard' },
    { label: 'Map', icon: Map, route: { name: 'transporterMap' }, active: 'transporterMap' },
    { label: 'Earnings', icon: Wallet, route: { name: 'transporterEarnings' }, active: 'transporterEarnings' },
    { label: 'Profile', icon: User, route: { name: 'profile' }, active: 'profile' },
  ];
}

export function Sidebar() {
  const { user, route, navigate, logout, notifications } = useApp();
  if (!user) return null;

  const items = getNavItems(user.role, route.name);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 h-screen sticky top-0">
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">AURAF</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => {
          const isActive = route.name === item.active;
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-brand-600' : 'text-gray-400'}`} />
              {item.label}
              {item.label === 'Profile' && unreadCount > 0 && (
                <span className="ml-auto bg-brand-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100 space-y-1">
        <button
          onClick={() => navigate({ name: 'notifications' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
        >
          <Bell className="w-5 h-5 text-gray-400" />
          Notifications
          {unreadCount > 0 && (
            <span className="ml-auto bg-brand-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
        >
          <LogOut className="w-5 h-5 text-gray-400" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export function MobileBottomNav() {
  const { user, route, navigate } = useApp();
  if (!user) return null;

  const items = getNavItems(user.role, route.name);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-nav z-40 pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const isActive = route.name === item.active;
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                isActive ? 'text-brand-600' : 'text-gray-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-brand-600' : 'text-gray-400'}`} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-brand-600' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

import { useState } from 'react';
import {
  User as UserIcon,
  BadgeCheck,
  MapPin,
  Package,
  CreditCard,
  Bell,
  Globe,
  HelpCircle,
  LogOut,
  Sprout,
  Store,
  Truck,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Modal } from '@/components/ui/Modal';
import type { UserRole } from '@/types';

export function ProfilePage() {
  const { user, navigate, logout, setRole, showToast } = useApp();
  const [roleModal, setRoleModal] = useState(false);
  const [language, setLanguage] = useState('English');

  if (!user) return null;

  const roleConfig = {
    farmer: { icon: Sprout, label: 'Farmer', color: 'text-brand-600 bg-brand-50' },
    buyer: { icon: Store, label: 'Buyer / Retailer', color: 'text-blue-600 bg-blue-50' },
    transporter: { icon: Truck, label: 'Transporter', color: 'text-accent-600 bg-accent-50' },
  };
  const RoleIcon = roleConfig[user.role].icon;

  const menuItems = [
    { icon: Package, label: 'Orders', action: () => navigate({ name: user.role === 'farmer' ? 'farmerOrders' : user.role === 'buyer' ? 'buyerOrders' : 'transporterDashboard' }) },
    { icon: CreditCard, label: 'Payments', action: () => showToast('Payments coming soon', 'info') },
    { icon: Bell, label: 'Notifications', action: () => navigate({ name: 'notifications' }) },
    { icon: Globe, label: 'Language', sublabel: language, action: () => setLanguage(language === 'English' ? 'Hindi' : 'English') },
    { icon: HelpCircle, label: 'Help & Support', action: () => showToast('Support: support@auraf.com', 'info') },
  ];

  const roles: { role: UserRole; label: string; emoji: string }[] = [
    { role: 'farmer', label: 'Farmer', emoji: '👨‍🌾' },
    { role: 'buyer', label: 'Buyer / Retailer', emoji: '🏪' },
    { role: 'transporter', label: 'Transporter', emoji: '🚚' },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>

      <div className="card p-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center text-2xl font-bold text-brand-700">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
              {user.verified && <BadgeCheck className="w-5 h-5 text-brand-600" />}
            </div>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`badge ${roleConfig[user.role].color}`}>
                <RoleIcon className="w-3 h-3" />
                {roleConfig[user.role].label}
              </span>
              {user.verified && <span className="badge bg-brand-50 text-brand-700">Verified ✓</span>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Mobile</p>
            <p className="text-sm font-semibold text-gray-900">{user.mobile}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Location</p>
            <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gray-400" />
              {user.location}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setRoleModal(true)}
        className="card-hover w-full p-4 flex items-center gap-3 text-left"
      >
        <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-brand-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">Switch Role</p>
          <p className="text-xs text-gray-500">Change between Farmer, Buyer, or Transporter</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>

      <div className="card divide-y divide-gray-100">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              onClick={item.action}
              className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                <Icon className="w-4.5 h-4.5 text-gray-500" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
              </div>
              {item.sublabel && <span className="text-sm text-gray-400">{item.sublabel}</span>}
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          );
        })}
      </div>

      <button
        onClick={() => {
          logout();
          showToast('Logged out successfully', 'info');
        }}
        className="btn-danger w-full py-3.5 text-base"
      >
        <LogOut className="w-4.5 h-4.5" />
        Logout
      </button>

      <p className="text-center text-xs text-gray-400 pb-4">AURAF v1.0.0 · From Farm to Market, Smarter.</p>

      <Modal open={roleModal} onClose={() => setRoleModal(false)} title="Switch Role" size="sm">
        <div className="space-y-3">
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => {
                setRole(r.role);
                setRoleModal(false);
                showToast(`Switched to ${r.label}`, 'success');
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                user.role === r.role
                  ? 'border-brand-600 bg-brand-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl">{r.emoji}</span>
              <span className="flex-1 text-left text-sm font-semibold text-gray-900">{r.label}</span>
              {user.role === r.role && <BadgeCheck className="w-5 h-5 text-brand-600" />}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}

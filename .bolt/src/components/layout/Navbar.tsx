import { Bell, Sprout, ChevronLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface NavbarProps {
  title?: string;
  showBack?: boolean;
  backRoute?: () => void;
  rightAction?: React.ReactNode;
}

export function Navbar({ title, showBack, backRoute, rightAction }: NavbarProps) {
  const { user, notifications, navigate } = useApp();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          {showBack && (
            <button onClick={backRoute} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors lg:hidden">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          {title ? (
            <h1 className="text-lg font-bold text-gray-900">{title}</h1>
          ) : (
            <div className="flex items-center gap-2 lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <Sprout className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">AURAF</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {rightAction}
          <button
            onClick={() => navigate({ name: 'notifications' })}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-600" />
            )}
          </button>
          {user && (
            <button
              onClick={() => navigate({ name: 'profile' })}
              className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-sm font-bold text-brand-700"
            >
              {user.name.charAt(0)}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

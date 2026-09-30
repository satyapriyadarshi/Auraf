import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Sidebar, MobileBottomNav } from './Navigation';
import { useApp } from '@/context/AppContext';

interface AppShellProps {
  title?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
  children: ReactNode;
}

export function AppShell({ title, showBack, rightAction, children }: AppShellProps) {
  const { navigate, route } = useApp();
  const isLanding = route.name === 'landing';

  if (isLanding) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          title={title}
          showBack={showBack}
          backRoute={() => window.history.back()}
          rightAction={rightAction}
        />
        <main className="flex-1 px-4 py-5 lg:px-8 lg:py-6 pb-24 lg:pb-8 max-w-screen-xl2 mx-auto w-full">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

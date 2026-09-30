interface StatCardProps {
  label: string;
  value: string;
  sublabel?: string;
  icon: React.ReactNode;
  trend?: { value: string; direction: 'up' | 'down' };
  accent?: 'brand' | 'accent' | 'blue' | 'purple';
}

export function StatCard({ label, value, sublabel, icon, trend, accent = 'brand' }: StatCardProps) {
  const accentStyles = {
    brand: 'bg-brand-50 text-brand-600',
    accent: 'bg-accent-50 text-accent-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-violet-50 text-violet-600',
  }[accent];

  return (
    <div className="card-hover p-4">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accentStyles}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-semibold ${trend.direction === 'up' ? 'text-brand-600' : 'text-red-500'}`}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      {sublabel && <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>}
    </div>
  );
}

import { IndianRupee, TrendingUp, CheckCircle2, Truck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/ui/StatCard';
import { PriceChart } from '@/components/ui/Charts';

export function TransporterEarningsPage() {
  const { user, transportJobs } = useApp();

  if (!user) return null;

  const myJobs = transportJobs.filter((j) => j.transporterId === user.id || j.status === 'Delivered');
  const completed = myJobs.filter((j) => j.status === 'Delivered');
  const active = myJobs.filter((j) => j.status === 'Accepted' || j.status === 'Picked Up');
  const totalEarnings = completed.reduce((sum, j) => sum + j.estimatedEarnings, 0);
  const pendingEarnings = active.reduce((sum, j) => sum + j.estimatedEarnings, 0);

  const weeklyData = [
    { day: 'Mon', demand: 0, price: 450 },
    { day: 'Tue', demand: 0, price: 500 },
    { day: 'Wed', demand: 0, price: 750 },
    { day: 'Thu', demand: 0, price: 500 },
    { day: 'Fri', demand: 0, price: 600 },
    { day: 'Sat', demand: 0, price: 1200 },
    { day: 'Sun', demand: 0, price: 450 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Earnings" value={`₹${totalEarnings.toLocaleString()}`} icon={<IndianRupee className="w-5 h-5" />} accent="brand" />
        <StatCard label="Pending" value={`₹${pendingEarnings.toLocaleString()}`} icon={<TrendingUp className="w-5 h-5" />} accent="accent" />
        <StatCard label="Completed" value={`${completed.length}`} icon={<CheckCircle2 className="w-5 h-5" />} accent="blue" />
        <StatCard label="Active" value={`${active.length}`} icon={<Truck className="w-5 h-5" />} accent="purple" />
      </div>

      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Weekly Earnings</h2>
        <PriceChart data={weeklyData} />
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Recent Transactions</h2>
        <div className="space-y-2">
          {completed.length > 0 ? (
            completed.map((job) => (
              <div key={job.id} className="card p-4 flex items-center gap-3">
                <img src={job.productImage} alt={job.productName} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{job.productName}</p>
                  <p className="text-xs text-gray-500">{job.pickupLocation} → {job.deliveryLocation}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-700">+₹{job.estimatedEarnings}</p>
                  <p className="text-xs text-gray-400">#{job.orderId}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="card p-8 text-center">
              <IndianRupee className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No completed deliveries yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

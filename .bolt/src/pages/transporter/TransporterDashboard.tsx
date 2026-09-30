import { Truck, Package, CheckCircle2, IndianRupee, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/ui/StatCard';
import { TransportJobCard } from '@/components/cards/TransportJobCard';
import { EmptyState } from '@/components/ui/EmptyState';

export function TransporterDashboard() {
  const { user, transportJobs, navigate, acceptTransportJob, showToast } = useApp();

  if (!user) return null;

  const availableJobs = transportJobs.filter((j) => j.status === 'Available');
  const activeDeliveries = transportJobs.filter((j) => j.status === 'Accepted' || j.status === 'Picked Up');
  const completed = transportJobs.filter((j) => j.status === 'Delivered');
  const earnings = completed.reduce((sum, j) => sum + j.estimatedEarnings, 0);

  const handleAccept = (jobId: string) => {
    acceptTransportJob(jobId);
    showToast('Job accepted successfully!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name.split(' ')[0]} 👋</h1>
        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
          <MapPin className="w-3.5 h-3.5" />
          {user.location}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Available Jobs" value={`${availableJobs.length}`} icon={<Package className="w-5 h-5" />} accent="blue" />
        <StatCard label="Active Deliveries" value={`${activeDeliveries.length}`} icon={<Truck className="w-5 h-5" />} accent="accent" />
        <StatCard label="Completed" value={`${completed.length}`} icon={<CheckCircle2 className="w-5 h-5" />} accent="brand" />
        <StatCard label="Earnings" value={`₹${earnings.toLocaleString()}`} icon={<IndianRupee className="w-5 h-5" />} accent="purple" />
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Available Jobs</h2>
        {availableJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableJobs.map((job) => (
              <TransportJobCard key={job.id} job={job} showAccept onAccept={() => handleAccept(job.id)} />
            ))}
          </div>
        ) : (
          <EmptyState icon={Package} title="No available jobs" description="New delivery jobs will appear here when orders are placed." />
        )}
      </div>

      {activeDeliveries.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Active Deliveries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeDeliveries.map((job) => (
              <TransportJobCard key={job.id} job={job} onClick={() => navigate({ name: 'transporterJob', jobId: job.id })} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

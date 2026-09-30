import { ArrowLeft, MapPin, Navigation, Package, IndianRupee, Clock, CheckCircle2, Truck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MapTrackingCard } from '@/components/ui/MapTrackingCard';
import { TransportStatusBadge } from '@/components/ui/StatusBadge';
import type { TransportJobStatus } from '@/types';

export function TransporterJobPage({ jobId }: { jobId: string }) {
  const { transportJobs, user, navigate, acceptTransportJob, updateTransportJobStatus, showToast } = useApp();

  const job = transportJobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Job not found.</p>
        <button onClick={() => navigate({ name: 'transporterDashboard' })} className="btn-primary mt-4 px-5 py-2.5 text-sm">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleAccept = () => {
    acceptTransportJob(job.id);
    showToast('Job accepted!', 'success');
  };

  const handleStatusUpdate = (status: TransportJobStatus) => {
    updateTransportJobStatus(job.id, status);
    showToast(`Status updated: ${status}`, 'success');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
      <button onClick={() => navigate({ name: 'transporterDashboard' })} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{job.productName}</h1>
          <p className="text-sm text-gray-500 mt-1">Order #{job.orderId} · {job.load} {job.unit}</p>
        </div>
        <TransportStatusBadge status={job.status} />
      </div>

      <div className="card p-4">
        <div className="flex items-center gap-3">
          <img src={job.productImage} alt={job.productName} className="w-16 h-16 rounded-xl object-cover" />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Farmer</p>
            <p className="font-semibold text-gray-900">{job.farmerName}</p>
            <p className="text-sm text-gray-500 mt-1">Buyer</p>
            <p className="font-semibold text-gray-900">{job.buyerName}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InfoCard icon={MapPin} label="Pickup" value={job.pickupLocation} />
        <InfoCard icon={MapPin} label="Delivery" value={job.deliveryLocation} />
        <InfoCard icon={Navigation} label="Distance" value={`${job.distance} km`} />
        <InfoCard icon={Package} label="Load" value={`${job.load} ${job.unit}`} />
        <InfoCard icon={IndianRupee} label="Est. Earnings" value={`₹${job.estimatedEarnings}`} highlight />
        <InfoCard icon={Clock} label="Deadline" value={job.deliveryDeadline ?? '—'} />
      </div>

      <MapTrackingCard
        pickupLocation={job.pickupLocation}
        deliveryLocation={job.deliveryLocation}
        distance={job.distance}
        eta={job.status === 'Delivered' ? 'Delivered' : '1 hr 20 min'}
        status={job.status}
        transporterName={job.transporterId ? user?.name : undefined}
      />

      <div className="flex flex-wrap gap-3">
        {job.status === 'Available' && (
          <button onClick={handleAccept} className="btn-primary flex-1 py-3 text-sm">
            <Truck className="w-4.5 h-4.5" />
            Accept Delivery
          </button>
        )}
        {job.status === 'Accepted' && (
          <button onClick={() => handleStatusUpdate('Picked Up')} className="btn-primary flex-1 py-3 text-sm">
            Mark Picked Up
          </button>
        )}
        {job.status === 'Picked Up' && (
          <button onClick={() => handleStatusUpdate('Delivered')} className="btn-primary flex-1 py-3 text-sm">
            <CheckCircle2 className="w-4.5 h-4.5" />
            Mark Delivered
          </button>
        )}
        <button onClick={() => showToast('Opening navigation...', 'info')} className="btn-secondary px-5 py-3 text-sm">
          <Navigation className="w-4.5 h-4.5" />
          Navigate
        </button>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value, highlight }: { icon: typeof MapPin; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`card p-3 ${highlight ? 'bg-brand-50 border-brand-100' : ''}`}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className={`w-3.5 h-3.5 ${highlight ? 'text-brand-600' : 'text-gray-400'}`} />
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <p className={`text-sm font-semibold ${highlight ? 'text-brand-700' : 'text-gray-900'}`}>{value}</p>
    </div>
  );
}

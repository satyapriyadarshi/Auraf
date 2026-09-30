import type { TransportJob } from '@/types';
import { TransportStatusBadge } from '@/components/ui/StatusBadge';
import { MapPin, Navigation, Package, IndianRupee, Clock } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface TransportJobCardProps {
  job: TransportJob;
  onClick?: () => void;
  onAccept?: () => void;
  showAccept?: boolean;
}

export function TransportJobCard({ job, onClick, onAccept, showAccept }: TransportJobCardProps) {
  const { navigate } = useApp();

  return (
    <div className="card-hover p-4">
      <div className="flex items-start gap-3 mb-3">
        <img src={job.productImage} alt={job.productName} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" loading="lazy" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-bold text-gray-900 text-sm">{job.productName}</p>
              <p className="text-xs text-gray-500 mt-0.5">{job.load} {job.unit} · #{job.orderId}</p>
            </div>
            <TransportStatusBadge status={job.status} />
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-3.5 h-3.5 text-brand-600" />
          </div>
          <span className="text-gray-500 text-xs">Pickup:</span>
          <span className="font-medium text-gray-900 text-sm truncate">{job.pickupLocation}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
          </div>
          <span className="text-gray-500 text-xs">Delivery:</span>
          <span className="font-medium text-gray-900 text-sm truncate">{job.deliveryLocation}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <Navigation className="w-3.5 h-3.5 text-gray-400 mx-auto mb-0.5" />
          <p className="text-xs font-bold text-gray-900">{job.distance} km</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <Package className="w-3.5 h-3.5 text-gray-400 mx-auto mb-0.5" />
          <p className="text-xs font-bold text-gray-900">{job.load} {job.unit}</p>
        </div>
        <div className="bg-brand-50 rounded-lg p-2 text-center">
          <IndianRupee className="w-3.5 h-3.5 text-brand-600 mx-auto mb-0.5" />
          <p className="text-xs font-bold text-brand-700">₹{job.estimatedEarnings}</p>
        </div>
      </div>

      {job.deliveryDeadline && (
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
          <Clock className="w-3.5 h-3.5" />
          Deadline: {job.deliveryDeadline}
        </div>
      )}

      <div className="flex gap-2">
        {showAccept && job.status === 'Available' && (
          <button onClick={onAccept} className="btn-primary flex-1 py-2 text-sm">
            Accept Job
          </button>
        )}
        <button
          onClick={onClick ?? (() => navigate({ name: 'transporterJob', jobId: job.id }))}
          className={showAccept && job.status === 'Available' ? 'btn-secondary flex-1 py-2 text-sm' : 'btn-secondary w-full py-2 text-sm'}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

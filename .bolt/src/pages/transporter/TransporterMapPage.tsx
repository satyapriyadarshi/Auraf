import { MapPin, Navigation, Truck, Store, Home } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MapTrackingCard } from '@/components/ui/MapTrackingCard';

export function TransporterMapPage() {
  const { transportJobs, user, navigate } = useApp();

  if (!user) return null;

  const activeJobs = transportJobs.filter((j) => j.transporterId === user.id && (j.status === 'Accepted' || j.status === 'Picked Up'));
  const availableJobs = transportJobs.filter((j) => j.status === 'Available');

  return (
    <div className="space-y-5 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900">Logistics Map</h1>

      <div className="card overflow-hidden">
        <div className="relative h-64 bg-gradient-to-br from-brand-50 to-brand-100">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id="mapGrid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#bbf7d0" strokeWidth="0.5" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapGrid)" />

            <path d="M 60 200 Q 150 100 220 140 T 360 80" fill="none" stroke="#16a34a" strokeWidth="3" strokeDasharray="8 4" strokeLinecap="round">
              <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite" />
            </path>

            <circle cx="60" cy="200" r="10" fill="#16a34a" stroke="white" strokeWidth="2" />
            <circle cx="360" cy="80" r="10" fill="#dc2626" stroke="white" strokeWidth="2" />
            <circle cx="220" cy="140" r="12" fill="#f59e0b" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>

          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded-lg px-3 py-2 shadow-sm">
            <p className="text-xs font-semibold text-gray-700">Live Tracking</p>
          </div>
          <div className="absolute bottom-3 right-3 bg-brand-600 text-white rounded-lg px-3 py-2 shadow-sm">
            <p className="text-xs font-bold">2 Active Routes</p>
          </div>
        </div>
      </div>

      {activeJobs.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Active Routes</h2>
          <div className="space-y-4">
            {activeJobs.map((job) => (
              <MapTrackingCard
                key={job.id}
                pickupLocation={job.pickupLocation}
                deliveryLocation={job.deliveryLocation}
                distance={job.distance}
                eta="1 hr 20 min"
                status={job.status}
                transporterName={user.name}
              />
            ))}
          </div>
        </div>
      )}

      {availableJobs.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Available Pickups</h2>
          <div className="space-y-3">
            {availableJobs.map((job) => (
              <button
                key={job.id}
                onClick={() => navigate({ name: 'transporterJob', jobId: job.id })}
                className="card-hover w-full p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{job.productName}</p>
                    <p className="text-xs text-gray-500">{job.pickupLocation} → {job.deliveryLocation}</p>
                  </div>
                  <span className="text-sm font-bold text-brand-700">₹{job.estimatedEarnings}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeJobs.length === 0 && availableJobs.length === 0 && (
        <div className="card p-8 text-center">
          <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No active routes or available jobs right now.</p>
        </div>
      )}
    </div>
  );
}

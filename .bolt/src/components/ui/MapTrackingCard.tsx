import { MapPin, Navigation, Truck, Store, Home } from 'lucide-react';

interface MapTrackingCardProps {
  pickupLocation: string;
  deliveryLocation: string;
  distance: number;
  eta?: string;
  status: string;
  transporterName?: string;
}

export function MapTrackingCard({ pickupLocation, deliveryLocation, distance, eta, status, transporterName }: MapTrackingCardProps) {
  return (
    <div className="card overflow-hidden">
      <div className="relative h-48 bg-gradient-to-br from-brand-50 to-brand-100 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#bbf7d0" strokeWidth="0.5" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          <path
            d="M 40 160 Q 120 80 180 120 T 280 60"
            fill="none"
            stroke="#16a34a"
            strokeWidth="3"
            strokeDasharray="8 4"
            strokeLinecap="round"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite" />
          </path>

          <circle cx="40" cy="160" r="8" fill="#16a34a" stroke="white" strokeWidth="2" />
          <circle cx="280" cy="60" r="8" fill="#dc2626" stroke="white" strokeWidth="2" />

          <g>
            <circle cx="160" cy="100" r="10" fill="#f59e0b" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>

        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-lg px-2.5 py-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-brand-600" />
          <span className="text-xs font-medium text-gray-700">Pickup</span>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-lg px-2.5 py-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-xs font-medium text-gray-700">Delivery</span>
        </div>
        {eta && (
          <div className="absolute top-3 right-3 bg-brand-600 text-white rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-xs font-bold">ETA: {eta}</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
            <Home className="w-4.5 h-4.5 text-brand-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400">Pickup (Farmer)</p>
            <p className="text-sm font-semibold text-gray-900 truncate">{pickupLocation}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-50 flex items-center justify-center flex-shrink-0">
            <Truck className="w-4.5 h-4.5 text-accent-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400">Transporter</p>
            <p className="text-sm font-semibold text-gray-900 truncate">
              {transporterName ?? 'Awaiting assignment'} · {status}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <Store className="w-4.5 h-4.5 text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400">Delivery (Buyer)</p>
            <p className="text-sm font-semibold text-gray-900 truncate">{deliveryLocation}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-700">{distance} km</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-700">{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

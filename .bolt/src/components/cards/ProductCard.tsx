import { BadgeCheck, MapPin } from 'lucide-react';
import type { Product } from '@/types';
import { useApp } from '@/context/AppContext';
import { ProductStatusBadge } from '@/components/ui/StatusBadge';

interface ProductCardProps {
  product: Product;
  onView?: () => void;
  onBuy?: () => void;
  showFarmer?: boolean;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onPause?: () => void;
  onChangePrice?: () => void;
}

export function ProductCard({
  product,
  onView,
  onBuy,
  showFarmer = true,
  showActions = false,
  onEdit,
  onDelete,
  onPause,
  onChangePrice,
}: ProductCardProps) {
  const { navigate } = useApp();

  return (
    <div className="card-hover overflow-hidden group">
      <div className="relative h-40 bg-gray-100 overflow-hidden cursor-pointer" onClick={() => onView?.() ?? navigate({ name: 'productDetails', productId: product.id })}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <ProductStatusBadge status={product.status} />
        </div>
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-lg px-2 py-1">
          <span className="text-xs font-semibold text-gray-700">{product.grade}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 text-base leading-tight">{product.name}</h3>
        </div>

        {showFarmer && (
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-xs text-gray-500">{product.farmerName}</span>
            {product.farmerVerified && <BadgeCheck className="w-3.5 h-3.5 text-brand-600" />}
          </div>
        )}

        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-xs text-gray-400">Farmer's Price:</span>
          <span className="text-lg font-bold text-brand-700">₹{product.sellingPrice}</span>
          <span className="text-xs text-gray-400">/{product.unit}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span>{product.quantity} {product.unit} available</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-0.5">
            <MapPin className="w-3 h-3" />
            {product.distance} km
          </span>
        </div>

        {!showActions && (
          <div className="flex gap-2">
            <button
              onClick={() => onView?.() ?? navigate({ name: 'productDetails', productId: product.id })}
              className="btn-secondary flex-1 py-2 text-sm"
            >
              View Details
            </button>
            {onBuy && (
              <button
                onClick={onBuy}
                className="btn-primary flex-1 py-2 text-sm"
                disabled={product.quantity === 0 || product.status !== 'Active'}
              >
                Buy Now
              </button>
            )}
          </div>
        )}

        {showActions && (
          <div className="flex flex-wrap gap-2">
            <button onClick={onEdit} className="btn-secondary px-3 py-1.5 text-xs">Edit</button>
            <button onClick={onChangePrice} className="btn-secondary px-3 py-1.5 text-xs">Change Price</button>
            <button onClick={onPause} className="btn-secondary px-3 py-1.5 text-xs">
              {product.status === 'Paused' ? 'Resume' : 'Pause'}
            </button>
            <button onClick={onDelete} className="btn-danger px-3 py-1.5 text-xs">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

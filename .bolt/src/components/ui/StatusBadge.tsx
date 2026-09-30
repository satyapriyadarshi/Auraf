import type { OrderStatus, ProductStatus, TransportJobStatus } from '@/types';

const orderStatusStyles: Record<OrderStatus, { bg: string; text: string; dot: string }> = {
  'Order Confirmed': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Farmer Accepted': { bg: 'bg-brand-50', text: 'text-brand-700', dot: 'bg-brand-500' },
  'Transporter Assigned': { bg: 'bg-accent-50', text: 'text-accent-700', dot: 'bg-accent-500' },
  'In Transit': { bg: 'bg-accent-50', text: 'text-accent-700', dot: 'bg-accent-500' },
  'Delivered': { bg: 'bg-success-50', text: 'text-success-700', dot: 'bg-success-500' },
  'Payment Done': { bg: 'bg-success-50', text: 'text-success-700', dot: 'bg-success-500' },
};

const productStatusStyles: Record<ProductStatus, { bg: string; text: string }> = {
  'Active': { bg: 'bg-brand-50', text: 'text-brand-700' },
  'Sold': { bg: 'bg-gray-100', text: 'text-gray-600' },
  'Expired': { bg: 'bg-red-50', text: 'text-red-600' },
  'Paused': { bg: 'bg-accent-50', text: 'text-accent-700' },
};

const transportStatusStyles: Record<TransportJobStatus, { bg: string; text: string }> = {
  'Available': { bg: 'bg-blue-50', text: 'text-blue-700' },
  'Accepted': { bg: 'bg-accent-50', text: 'text-accent-700' },
  'Picked Up': { bg: 'bg-accent-50', text: 'text-accent-700' },
  'Delivered': { bg: 'bg-success-50', text: 'text-success-700' },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const s = orderStatusStyles[status];
  return (
    <span className={`badge ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  const s = productStatusStyles[status];
  return <span className={`badge ${s.bg} ${s.text}`}>{status}</span>;
}

export function TransportStatusBadge({ status }: { status: TransportJobStatus }) {
  const s = transportStatusStyles[status];
  return <span className={`badge ${s.bg} ${s.text}`}>{status}</span>;
}

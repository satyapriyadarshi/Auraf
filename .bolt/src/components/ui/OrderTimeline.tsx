import { CheckCircle2, Circle, Clock } from 'lucide-react';
import type { OrderStatus } from '@/types';
import { useApp } from '@/context/AppContext';

const steps: OrderStatus[] = [
  'Order Confirmed',
  'Farmer Accepted',
  'Transporter Assigned',
  'In Transit',
  'Delivered',
];

interface OrderTimelineProps {
  currentStatus: OrderStatus;
}

export function OrderTimeline({ currentStatus }: OrderTimelineProps) {
  const { orders } = useApp();
  const currentIndex = steps.indexOf(currentStatus);
  void orders;

  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isPending = index > currentIndex;

        return (
          <div key={step} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              {isComplete && (
                <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}
              {isCurrent && (
                <div className="w-8 h-8 rounded-full bg-brand-100 border-2 border-brand-600 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Clock className="w-4 h-4 text-brand-600" />
                </div>
              )}
              {isPending && (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Circle className="w-4 h-4 text-gray-400" />
                </div>
              )}
              {index < steps.length - 1 && (
                <div className={`w-0.5 h-8 ${isComplete ? 'bg-brand-600' : 'bg-gray-200'}`} />
              )}
            </div>
            <div className="pt-1.5 pb-6">
              <p className={`text-sm font-semibold ${isComplete || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                {step}
              </p>
              {isCurrent && (
                <p className="text-xs text-brand-600 mt-0.5">In progress...</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

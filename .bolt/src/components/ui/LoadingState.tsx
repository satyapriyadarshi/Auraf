import { Loader2 } from 'lucide-react';

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="w-8 h-8 text-brand-600 animate-spin mb-3" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card p-4">
      <div className="skeleton w-full h-40 rounded-xl mb-3" />
      <div className="skeleton h-4 w-3/4 mb-2" />
      <div className="skeleton h-3 w-1/2 mb-3" />
      <div className="flex gap-2">
        <div className="skeleton h-8 flex-1 rounded-lg" />
        <div className="skeleton h-8 flex-1 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card p-4 flex items-center gap-4">
          <div className="skeleton w-12 h-12 rounded-xl" />
          <div className="flex-1">
            <div className="skeleton h-4 w-1/3 mb-2" />
            <div className="skeleton h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 left-4 sm:left-auto z-[60] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3 animate-slide-in-right max-w-sm"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0" />}
          {toast.type === 'error' && <XCircle className="w-5 h-5 text-error-600 flex-shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />}
          <p className="text-sm font-medium text-gray-900 flex-1">{toast.message}</p>
          <button
            onClick={() => dismissToast(toast.id)}
            className="p-0.5 rounded hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      ))}
    </div>
  );
}

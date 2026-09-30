import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export function QuantitySelector({ value, onChange, min = 1, max = 9999, step = 1, unit = 'kg' }: QuantitySelectorProps) {
  const clamp = (v: number) => Math.max(min, Math.min(max, v));

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => onChange(clamp(value - step))}
          disabled={value <= min}
          className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <div className="px-4 py-3 min-w-[80px] text-center">
          <span className="text-lg font-bold text-gray-900">{value}</span>
          <span className="text-sm text-gray-500 ml-1">{unit}</span>
        </div>
        <button
          onClick={() => onChange(clamp(value + step))}
          disabled={value >= max}
          className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}

import { Filter, X } from 'lucide-react';
import { useState } from 'react';
import type { ProductCategory, ProductGrade } from '@/types';
import { categories, productGrades } from '@/data/mockData';

export interface FilterValues {
  category: ProductCategory | 'All';
  priceRange: [number, number];
  maxDistance: number;
  minQuantity: number;
  grade: ProductGrade | 'All';
  availability: 'All' | 'Available';
}

interface FilterPanelProps {
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  onReset: () => void;
}

export function FilterPanel({ values, onChange, onReset }: FilterPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-secondary px-4 py-2.5 text-sm gap-2"
      >
        <Filter className="w-4 h-4" />
        Filters
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-sm bg-white h-full overflow-y-auto animate-slide-in-right p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="label">Category</label>
                <div className="flex flex-wrap gap-2">
                  {(['All', ...categories.map((c) => c.value)] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => onChange({ ...values, category: cat })}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        values.category === cat
                          ? 'bg-brand-600 text-white'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {cat === 'All' ? 'All' : categories.find((c) => c.value === cat)?.emoji + ' ' + cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Price Range (₹/kg)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={values.priceRange[0]}
                    onChange={(e) => onChange({ ...values, priceRange: [Number(e.target.value), values.priceRange[1]] })}
                    className="input py-2"
                    placeholder="Min"
                  />
                  <span className="text-gray-400">—</span>
                  <input
                    type="number"
                    value={values.priceRange[1]}
                    onChange={(e) => onChange({ ...values, priceRange: [values.priceRange[0], Number(e.target.value)] })}
                    className="input py-2"
                    placeholder="Max"
                  />
                </div>
              </div>

              <div>
                <label className="label">Max Distance: {values.maxDistance} km</label>
                <input
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={values.maxDistance}
                  onChange={(e) => onChange({ ...values, maxDistance: Number(e.target.value) })}
                  className="w-full accent-brand-600"
                />
              </div>

              <div>
                <label className="label">Min Quantity: {values.minQuantity} kg</label>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  step={50}
                  value={values.minQuantity}
                  onChange={(e) => onChange({ ...values, minQuantity: Number(e.target.value) })}
                  className="w-full accent-brand-600"
                />
              </div>

              <div>
                <label className="label">Quality Grade</label>
                <div className="flex flex-wrap gap-2">
                  {(['All', ...productGrades] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => onChange({ ...values, grade: g })}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        values.grade === g
                          ? 'bg-brand-600 text-white'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Availability</label>
                <div className="flex gap-2">
                  {(['All', 'Available'] as const).map((a) => (
                    <button
                      key={a}
                      onClick={() => onChange({ ...values, availability: a })}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        values.availability === a
                          ? 'bg-brand-600 text-white'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={onReset} className="btn-secondary flex-1 py-2.5 text-sm">
                Reset
              </button>
              <button onClick={() => setOpen(false)} className="btn-primary flex-1 py-2.5 text-sm">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useState } from 'react';
import { Sprout, Plus, IndianRupee } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/cards/ProductCard';
import { ProductStatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import type { Product, ProductStatus } from '@/types';

export function MyProducePage() {
  const { user, products, navigate, updateProduct, deleteProduct, toggleProductStatus, showToast } = useApp();
  const [tab, setTab] = useState<'Active' | 'Sold' | 'Expired'>('Active');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [priceProduct, setPriceProduct] = useState<Product | null>(null);
  const [newPrice, setNewPrice] = useState('');
  const [editForm, setEditForm] = useState({ name: '', quantity: '', sellingPrice: '', grade: 'Grade A' as Product['grade'] });

  if (!user) return null;

  const myProducts = products.filter((p) => p.farmerId === user.id);
  const filtered = myProducts.filter((p) => {
    if (tab === 'Active') return p.status === 'Active' || p.status === 'Paused';
    if (tab === 'Sold') return p.status === 'Sold';
    return p.status === 'Expired';
  });

  const openEdit = (product: Product) => {
    setEditForm({ name: product.name, quantity: String(product.quantity), sellingPrice: String(product.sellingPrice), grade: product.grade });
    setEditingProduct(product);
  };

  const handleEdit = () => {
    if (!editingProduct) return;
    updateProduct(editingProduct.id, {
      name: editForm.name,
      quantity: Number(editForm.quantity),
      sellingPrice: Number(editForm.sellingPrice),
      grade: editForm.grade,
    });
    showToast('Produce updated successfully', 'success');
    setEditingProduct(null);
  };

  const openPriceChange = (product: Product) => {
    setNewPrice(String(product.sellingPrice));
    setPriceProduct(product);
  };

  const handlePriceChange = () => {
    if (!priceProduct || !newPrice) return;
    updateProduct(priceProduct.id, { sellingPrice: Number(newPrice) });
    showToast(`Price updated to ₹${newPrice}/kg`, 'success');
    setPriceProduct(null);
  };

  const handleDelete = (product: Product) => {
    deleteProduct(product.id);
    showToast('Produce deleted', 'info');
  };

  const handlePause = (product: Product) => {
    toggleProductStatus(product.id);
    showToast(product.status === 'Paused' ? 'Listing resumed' : 'Listing paused', 'info');
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Produce</h1>
        <button onClick={() => navigate({ name: 'addProduce' })} className="btn-primary px-4 py-2.5 text-sm">
          <Plus className="w-4.5 h-4.5" />
          Add Produce
        </button>
      </div>

      <div className="flex gap-2 border-b border-gray-100">
        {(['Active', 'Sold', 'Expired'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all ${
              tab === t
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
            <span className="ml-1.5 text-xs text-gray-400">
              ({myProducts.filter((p) => t === 'Active' ? (p.status === 'Active' || p.status === 'Paused') : p.status === t).length})
            </span>
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showFarmer={false}
              showActions
              onEdit={() => openEdit(product)}
              onDelete={() => handleDelete(product)}
              onPause={() => handlePause(product)}
              onChangePrice={() => openPriceChange(product)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Sprout}
          title={`No ${tab.toLowerCase()} produce`}
          description="Add your first produce listing to get started."
          action={{ label: 'Add Produce', onClick: () => navigate({ name: 'addProduce' }) }}
        />
      )}

      <Modal open={!!editingProduct} onClose={() => setEditingProduct(null)} title="Edit Produce">
        <div className="space-y-4">
          <div>
            <label className="label">Produce Name</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="input"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Quantity (kg)</label>
              <input
                type="number"
                value={editForm.quantity}
                onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">Selling Price (₹/kg)</label>
              <input
                type="number"
                value={editForm.sellingPrice}
                onChange={(e) => setEditForm({ ...editForm, sellingPrice: e.target.value })}
                className="input"
              />
            </div>
          </div>
          <div>
            <label className="label">Grade</label>
            <select
              value={editForm.grade}
              onChange={(e) => setEditForm({ ...editForm, grade: e.target.value as Product['grade'] })}
              className="input"
            >
              <option value="Grade A">Grade A</option>
              <option value="Grade B">Grade B</option>
              <option value="Grade C">Grade C</option>
            </select>
          </div>
          <button onClick={handleEdit} className="btn-primary w-full py-3 text-sm">
            Save Changes
          </button>
        </div>
      </Modal>

      <Modal open={!!priceProduct} onClose={() => setPriceProduct(null)} title="Change Selling Price" size="sm">
        <div className="space-y-4">
          <div className="bg-brand-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">Current Price</p>
            <p className="text-2xl font-bold text-brand-700">₹{priceProduct?.sellingPrice}/{priceProduct?.unit}</p>
          </div>
          <div>
            <label className="label">New Selling Price (₹/kg)</label>
            <div className="relative">
              <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="input pl-11"
                autoFocus
              />
            </div>
            <p className="text-xs text-brand-600 font-medium mt-1.5">You decide your selling price.</p>
          </div>
          <button onClick={handlePriceChange} className="btn-primary w-full py-3 text-sm">
            Update Price
          </button>
        </div>
      </Modal>
    </div>
  );
}

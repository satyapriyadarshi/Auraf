import { useRef, useState } from 'react';
import { Sprout, IndianRupee, Upload, ArrowLeft, Info, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MarketInfoCard } from '@/components/ui/MarketInfoCard';
import { categories, productGrades, units } from '@/data/mockData';
import { calculateProductListingScore, extractAiVerificationResult, getAiVerificationSummary } from '@/utils/aiVerification';

const DEFAULT_PRODUCT_IMAGE = 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600';

export function AddProducePage() {
  const { navigate, addProduct, showToast, user } = useApp();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isProcessingBackground, setIsProcessingBackground] = useState(false);
  const [webhookScore, setWebhookScore] = useState<number | null>(null);
  const [webhookSummary, setWebhookSummary] = useState<string>('');
  const [form, setForm] = useState({
    name: '',
    category: 'Vegetables' as const,
    quantity: '',
    unit: 'kg' as const,
    sellingPrice: '',
    harvestDate: '',
    grade: 'Grade A' as const,
    availableFrom: '',
    location: user?.location ?? '',
    image: '',
  });

  const aiScore = calculateProductListingScore(form);
  const aiSummary = getAiVerificationSummary(aiScore);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file.', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image must be smaller than 5MB.', 'error');
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, image: String(reader.result ?? '') }));
      showToast('Image uploaded and AI verification refreshed.', 'success');
    };
    reader.readAsDataURL(file);
  };

  const verifyWithAi = async () => {
    if (!imageFile) {
      showToast('Please upload an image before verifying with AI.', 'error');
      return;
    }

    setIsProcessingBackground(true);

    try {
      const metadata = {
        message: 'Farmer produce image quality grading request',
        produceName: form.name,
        category: form.category,
        quantity: form.quantity,
        unit: form.unit,
        sellingPrice: form.sellingPrice,
        harvestDate: form.harvestDate || new Date().toISOString().slice(0, 10),
        grade: form.grade,
        availableFrom: form.availableFrom || new Date().toISOString().slice(0, 10),
        location: form.location,
        farmerLocation: user?.location ?? '',
        imageFileName: imageFile.name,
        imageMimeType: imageFile.type || 'application/octet-stream',
        imageSizeBytes: imageFile.size,
        imageDataText: form.image,
        imageBase64: form.image.startsWith('data:') ? form.image.split(',')[1] : '',
        aiScore,
        aiSummary,
      };

      const rawBytes = new Uint8Array(await imageFile.arrayBuffer());
      const metadataBytes = new TextEncoder().encode(JSON.stringify(metadata));
      const binaryPayload = new Blob([metadataBytes, new Uint8Array([10]), rawBytes], {
        type: imageFile.type || 'application/octet-stream',
      });

      const response = await fetch('https://satyapriya3456.app.n8n.cloud/webhook/grade-image', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': imageFile.type || 'application/octet-stream',
        },
        body: binaryPayload,
      });

      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Grade image webhook response:', responseText);

      const result = extractAiVerificationResult(responseText, aiScore);
      setWebhookScore(result.score);
      setWebhookSummary(result.summary);

      if (/temporarily unavailable/i.test(result.summary)) {
        showToast('AI service is temporarily unavailable; using local verification score.', 'success');
      } else {
        showToast('AI verification completed.', 'success');
      }
    } catch (error) {
      console.error('Grade image webhook error:', error);
      const fallbackResult = extractAiVerificationResult(null, aiScore);
      setWebhookScore(fallbackResult.score);
      setWebhookSummary(fallbackResult.summary);
      showToast('AI service is unavailable right now; using the local verification score instead.', 'success');
    } finally {
      setIsProcessingBackground(false);
    }
  };

  const handleRemoveBackground = async () => {
    if (!imageFile) {
      showToast('Please upload an image before removing the background.', 'error');
      return;
    }

    await verifyWithAi();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.quantity || !form.sellingPrice) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const finalImage = form.image || DEFAULT_PRODUCT_IMAGE;
    addProduct({
      name: form.name,
      category: form.category,
      quantity: Number(form.quantity),
      unit: form.unit,
      sellingPrice: Number(form.sellingPrice),
      harvestDate: form.harvestDate || new Date().toISOString().slice(0, 10),
      grade: form.grade,
      availableFrom: form.availableFrom || new Date().toISOString().slice(0, 10),
      location: form.location,
      distance: Math.floor(Math.random() * 30) + 5,
      image: finalImage,
    });
    showToast('Produce successfully listed.', 'success');
    navigate({ name: 'myProduce' });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <button onClick={() => navigate({ name: 'farmerDashboard' })} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Add Produce</h1>
        <p className="text-sm text-gray-500 mt-1">List your harvest for buyers to discover</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-5 space-y-4">
        <div>
          <label className="label">Produce Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Fresh Tomato"
            className="input"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Category *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as typeof form.category })}
              className="input"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.emoji} {c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Quality / Grade</label>
            <select
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value as typeof form.grade })}
              className="input"
            >
              {productGrades.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Quantity *</label>
            <input
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              placeholder="500"
              className="input"
            />
          </div>
          <div>
            <label className="label">Unit</label>
            <select
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value as typeof form.unit })}
              className="input"
            >
              {units.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="label">Your Selling Price (₹/kg) *</label>
          <div className="relative">
            <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
            <input
              type="number"
              value={form.sellingPrice}
              onChange={(e) => setForm({ ...form, sellingPrice: e.target.value })}
              placeholder="32"
              className="input pl-11"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1.5">Set the price you want to receive for your produce.</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-brand-600 font-medium">
            <Info className="w-3.5 h-3.5" />
            You decide your selling price.
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Harvest Date</label>
            <input
              type="date"
              value={form.harvestDate}
              onChange={(e) => setForm({ ...form, harvestDate: e.target.value })}
              className="input"
            />
          </div>
          <div>
            <label className="label">Available From</label>
            <input
              type="date"
              value={form.availableFrom}
              onChange={(e) => setForm({ ...form, availableFrom: e.target.value })}
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="label">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Nashik, Maharashtra"
            className="input"
          />
        </div>

        <div>
          <label className="label">Upload Product Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-brand-400 transition-colors bg-gray-50"
          >
            {form.image ? (
              <div className="space-y-3">
                <img src={form.image} alt="Product preview" className="w-full h-48 object-cover rounded-lg mx-auto" />
                <p className="text-sm text-brand-700 font-medium">Change image</p>
              </div>
            ) : (
              <div className="py-4">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Tap to upload an image</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
              </div>
            )}
          </button>
          <div className="mt-3 flex flex-wrap gap-2 justify-end">
            <button
              type="button"
              onClick={verifyWithAi}
              disabled={!imageFile || isProcessingBackground}
              className="btn-primary px-4 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessingBackground ? 'Verifying...' : 'Verify with AI'}
            </button>
            <button
              type="button"
              onClick={handleRemoveBackground}
              disabled={!imageFile || isProcessingBackground}
              className="btn-secondary px-4 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Remove Background
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1.5">Upload a clear image for AI verification and better buyer trust.</p>
        </div>

        <div className="rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-brand-700 font-semibold">AI Verification</p>
              <p className="text-sm text-gray-700 mt-1">{webhookSummary || aiSummary}</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-brand-600" />
              <span className="text-sm font-bold text-brand-700">{webhookScore ?? aiScore}/100</span>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full py-3.5 text-base">
          <Sprout className="w-4.5 h-4.5" />
          List Produce
        </button>
      </form>

      <MarketInfoCard priceLow={30} priceHigh={34} productName={form.name || 'Your produce'} />
    </div>
  );
}

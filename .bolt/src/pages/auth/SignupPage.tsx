import { useState } from 'react';
import { Sprout, User, Mail, Lock, Phone, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function SignupPage() {
  const { navigate, signup, showToast } = useApp();
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.email || !form.password || !form.location) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      signup(form.name, form.email, form.mobile, form.location);
      showToast('Account created successfully!', 'success');
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col justify-center px-4 py-8 max-w-md mx-auto w-full">
        <button onClick={() => navigate({ name: 'landing' })} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
            <Sprout className="w-5.5 h-5.5 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">AURAF</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
        <p className="text-gray-500 mb-8">Join the AURAF agricultural ecosystem</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ramesh Kumar"
                className="input pl-11"
              />
            </div>
          </div>

          <div>
            <label className="label">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="tel"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                placeholder="9876543210"
                className="input pl-11"
              />
            </div>
          </div>

          <div>
            <label className="label">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ramesh@auraf.com"
                className="input pl-11"
              />
            </div>
          </div>

          <div>
            <label className="label">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Create a password"
                className="input pl-11"
              />
            </div>
          </div>

          <div>
            <label className="label">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Nashik, Maharashtra"
                className="input pl-11"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base">
            {loading ? 'Creating account...' : 'Create Account'}
            {!loading && <ArrowRight className="w-4.5 h-4.5" />}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <button onClick={() => navigate({ name: 'login' })} className="text-brand-600 hover:text-brand-700 font-semibold">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

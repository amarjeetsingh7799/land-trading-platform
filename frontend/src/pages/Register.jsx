import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      console.error('Registration Error:', err);
      // Handle network errors
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error') || !err.response) {
        setError('Unable to connect to server. Please make sure the backend server is running on http://localhost:5000');
      } else if (err?.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        // Handle validation errors from backend
        const errorMessages = err.response.data.errors.map(e => e.message).join(', ');
        setError(errorMessages);
      } else if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err?.response?.status === 404) {
        setError('Registration endpoint not found. Please check API configuration.');
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError('Registration failed. Please check your details and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-3xl grid md:grid-cols-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
        <div className="hidden md:flex flex-col justify-between p-6 bg-gradient-to-br from-slate-900 to-slate-700 text-white dark:from-white dark:to-slate-100 dark:text-slate-900">
          <div>
            <div className="text-2xl font-bold">Join The Unsold</div>
            <p className="mt-2 opacity-80">Create your account to list properties, save favorites, and get AI-driven matches.</p>
          </div>
          <div className="mt-6 space-y-2 text-sm opacity-90">
            <div>• Fast onboarding</div>
            <div>• Role-based access (Buyer/Seller)</div>
            <div>• Secure storage and documents</div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create an account</h2>
          {error && <div className="mt-3 mb-3 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">{error}</div>}
          <form onSubmit={onSubmit} className="mt-4 grid gap-4">
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-300">Name</label>
              <input name="name" value={form.name} onChange={onChange} required className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/50" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-300">Email</label>
              <input type="email" name="email" value={form.email} onChange={onChange} required className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/50" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-300">Password</label>
              <input type="password" name="password" value={form.password} onChange={onChange} required className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/50" />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Password must contain uppercase, lowercase, and a number (min 6 characters)</p>
            </div>
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-300">Role</label>
              <select name="role" value={form.role} onChange={onChange} className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/50">
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="mt-2 w-full px-4 py-2.5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 disabled:opacity-60 shadow hover:opacity-95">
              {loading ? 'Creating...' : 'Create account'}
            </button>
          </form>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Have an account? <Link to="/login" className="text-slate-900 dark:text-white underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
}



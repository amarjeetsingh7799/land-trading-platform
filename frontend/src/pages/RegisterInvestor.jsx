import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterInvestor() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '', investmentRange: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({ ...form, role: 'buyer' });
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Register As Investor</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Join The Unsold as an investor</p>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        <form onSubmit={onSubmit} className="grid gap-3">
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-300">Name</label>
            <input name="name" value={form.name} onChange={onChange} required className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-300">Email</label>
            <input type="email" name="email" value={form.email} onChange={onChange} required className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-300">Company</label>
            <input name="company" value={form.company} onChange={onChange} className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-300">Investment Range</label>
            <select name="investmentRange" value={form.investmentRange} onChange={onChange} className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white">
              <option value="">Select range</option>
              <option value="0-1M">$0 - $1M</option>
              <option value="1M-10M">$1M - $10M</option>
              <option value="10M-50M">$10M - $50M</option>
              <option value="50M+">$50M+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-300">Password</label>
            <input type="password" name="password" value={form.password} onChange={onChange} required className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
          </div>
          <button type="submit" disabled={loading} className="mt-2 w-full px-4 py-2 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 disabled:opacity-60">
            {loading ? 'Registering...' : 'Register as Investor'}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Have an account? <Link to="/login" className="text-slate-900 dark:text-white underline">Login</Link></p>
      </div>
    </div>
  );
}


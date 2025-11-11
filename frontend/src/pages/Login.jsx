import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-3xl grid md:grid-cols-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
        <div className="hidden md:flex flex-col justify-between p-6 bg-gradient-to-br from-slate-900 to-slate-700 text-white dark:from-white dark:to-slate-100 dark:text-slate-900">
          <div>
            <div className="text-2xl font-bold">Welcome back</div>
            <p className="mt-2 opacity-80">Sign in to access personalized matches, saved searches, and your dashboard.</p>
          </div>
          <div className="mt-6 space-y-2 text-sm opacity-90">
            <div>• Secure login with JWT</div>
            <div>• Save favorites and view activity</div>
            <div>• Get AI property matches</div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Login to your account</h2>
          {error && <div className="mt-3 mb-3 text-sm text-red-600">{error}</div>}
          <form onSubmit={onSubmit} className="mt-4 grid gap-4">
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-300">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/50" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm text-slate-600 dark:text-slate-300">Password</label>
                <Link to="/forgot-password" className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline">
                  Forgot password?
                </Link>
              </div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/50" />
            </div>
            <button type="submit" disabled={loading} className="mt-2 w-full px-4 py-2.5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 disabled:opacity-60 shadow hover:opacity-95">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">No account? <Link to="/register" className="text-slate-900 dark:text-white underline">Register</Link></p>
        </div>
      </div>
    </div>
  );
}



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

  const benefits = [
    { icon: '📈', title: 'Portfolio Growth', desc: 'Track and manage your property investments from one dashboard' },
    { icon: '💰', title: 'Better Returns', desc: 'Access exclusive deals and opportunities before public listing' },
    { icon: '🔒', title: 'Secure Transactions', desc: 'All transactions are verified and legally protected' },
    { icon: '📊', title: 'Market Insights', desc: 'Get real-time data and analytics on property values' }
  ];

  const requirements = [
    'Minimum investment capacity of $100,000',
    'Valid government-issued ID',
    'Proof of funds or bank statement',
    'Accredited investor status preferred'
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-950 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Investor Community</h1>
          <p className="text-xl text-slate-300">Access exclusive property deals and grow your real estate portfolio</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Why Become an Investor?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{b.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Form & Info */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Form */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-8 shadow-md h-fit">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Create Your Account</h2>
            {error && (
              <div className="mb-4 p-3 rounded bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={onSubmit} className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name *</label>
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={onChange} 
                  required 
                  className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={form.email} 
                  onChange={onChange} 
                  required 
                  className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                <input 
                  name="phone" 
                  value={form.phone} 
                  onChange={onChange} 
                  className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Company</label>
                <input 
                  name="company" 
                  value={form.company} 
                  onChange={onChange} 
                  className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Investment Range *</label>
                <select 
                  name="investmentRange" 
                  value={form.investmentRange} 
                  onChange={onChange} 
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select your investment range</option>
                  <option value="0-1M">$100K - $500K</option>
                  <option value="1M-10M">$500K - $2M</option>
                  <option value="10M-50M">$2M - $10M</option>
                  <option value="50M+">$10M+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password *</label>
                <input 
                  type="password" 
                  name="password" 
                  value={form.password} 
                  onChange={onChange} 
                  required 
                  className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Secure password (min 8 characters)"
                />
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                * Required fields. We verify all investor information before approval.
              </div>
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 transition"
              >
                {loading ? 'Creating Account...' : 'Register as Investor'}
              </button>
            </form>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Sign in here</Link>
            </p>
          </div>

          {/* Requirements & Info */}
          <div>
            {/* Requirements */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Eligibility Requirements</h3>
              <ul className="space-y-3">
                {requirements.map((req, i) => (
                  <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-6 border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Registration Process</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Create Account</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Fill in your basic information</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Verification</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Submit proof of funds and ID documents</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Approval</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Get approved within 24-48 hours</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Access Deals</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Start investing in exclusive properties</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="text-center bg-slate-50 dark:bg-slate-800 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Need Help?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Our investor relations team is ready to assist you with any questions</p>
          <a href="mailto:investors@landtrading.com" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}


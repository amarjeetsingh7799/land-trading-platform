import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', phone: '', date: '', time: '' });
  const [sent, setSent] = useState(false);

  const benefits = [
    { icon: '📊', title: 'Advanced Analytics', desc: 'Real-time market insights and property valuation' },
    { icon: '🔐', title: 'Secure Transactions', desc: 'End-to-end encrypted communication and documents' },
    { icon: '🌍', title: 'Global Reach', desc: 'Access properties worldwide with local expertise' },
    { icon: '⚡', title: 'Quick Listing', desc: 'List properties in minutes, not days' }
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Real Estate Broker', text: 'The platform transformed how we manage properties. Increased sales by 40%.' },
    { name: 'Michael Chen', role: 'Property Developer', text: 'Best investment platform for connecting with serious investors.' },
    { name: 'Emma Smith', role: 'Investment Manager', text: 'Transparency and ease of use make this a game-changer.' }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-950 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Personal Demo</h1>
          <p className="text-xl text-slate-300">See how land-trading-platform can transform your real estate business</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Why Choose Us?</h2>
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

        {/* Demo Form & Testimonials */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Form */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Schedule Your Demo</h2>
            {sent ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg p-6">
                <div className="text-green-700 dark:text-green-400 font-semibold mb-2">✓ Demo Scheduled!</div>
                <p className="text-green-600 dark:text-green-400">We'll contact you shortly to confirm your session. Check your email for details.</p>
              </div>
            ) : (
              <form onSubmit={(e)=>{e.preventDefault(); setSent(true);}} className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input 
                    placeholder="John Doe" 
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    value={form.name} 
                    onChange={(e)=>setForm({...form,name:e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                  <input 
                    placeholder="john@company.com" 
                    type="email" 
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    value={form.email} 
                    onChange={(e)=>setForm({...form,email:e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                  <input 
                    placeholder="+1 (555) 123-4567" 
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    value={form.phone} 
                    onChange={(e)=>setForm({...form,phone:e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Company</label>
                  <input 
                    placeholder="Your Company" 
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    value={form.company} 
                    onChange={(e)=>setForm({...form,company:e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Preferred Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    value={form.date} 
                    onChange={(e)=>setForm({...form,date:e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tell us about your needs</label>
                  <textarea 
                    placeholder="What would you like to achieve? (e.g., looking to invest, expand property listings, etc.)" 
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    rows={4} 
                    value={form.message} 
                    onChange={(e)=>setForm({...form,message:e.target.value})} 
                  />
                </div>
                <button type="submit" className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                  Schedule Demo
                </button>
              </form>
            )}
          </div>

          {/* Testimonials */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What Our Users Say</h2>
            <div className="space-y-4">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border-l-4 border-blue-500">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-4 italic">"{t.text}"</p>
                  <div className="font-semibold text-slate-900 dark:text-white">{t.name}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 cursor-pointer">
              <summary className="font-semibold text-slate-900 dark:text-white">How long does the demo take?</summary>
              <p className="text-slate-600 dark:text-slate-400 mt-3">Our personalized demo takes about 30 minutes and covers all key features tailored to your needs.</p>
            </details>
            <details className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 cursor-pointer">
              <summary className="font-semibold text-slate-900 dark:text-white">Is there a setup fee?</summary>
              <p className="text-slate-600 dark:text-slate-400 mt-3">No setup fees. We offer flexible pricing plans starting with a free trial for all new users.</p>
            </details>
            <details className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 cursor-pointer">
              <summary className="font-semibold text-slate-900 dark:text-white">Can I cancel anytime?</summary>
              <p className="text-slate-600 dark:text-slate-400 mt-3">Yes, you can cancel your subscription at any time without penalties.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}



import React, { useState } from 'react';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', phone: '' });
  const [sent, setSent] = useState(false);

  const offices = [
    {
      city: 'New York',
      country: 'USA',
      address: '123 Real Estate Plaza, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'ny@landtrading.com',
      hours: 'Mon - Fri: 9AM - 6PM EST'
    },
    {
      city: 'London',
      country: 'UK',
      address: '456 Property Street, London EC1A 1BB',
      phone: '+44 (0) 20 7946 0958',
      email: 'london@landtrading.com',
      hours: 'Mon - Fri: 9AM - 6PM GMT'
    },
    {
      city: 'Singapore',
      country: 'Singapore',
      address: '789 Investment Avenue, Singapore 068103',
      phone: '+65 6226 0360',
      email: 'sg@landtrading.com',
      hours: 'Mon - Fri: 9AM - 6PM SGT'
    },
    {
      city: 'Dubai',
      country: 'UAE',
      address: '321 Business Bay, Dubai',
      phone: '+971 4 XXX XXXX',
      email: 'dubai@landtrading.com',
      hours: 'Sun - Thu: 9AM - 6PM GST'
    }
  ];

  const faqs = [
    {
      q: 'How do I list a property?',
      a: 'Sign up as a seller, complete your profile, and use our property listing form. It takes just 5 minutes to list your first property.'
    },
    {
      q: 'What are your commission fees?',
      a: 'We charge a competitive 2-5% commission based on your listing price. Premium packages offer discounts for high-volume sellers.'
    },
    {
      q: 'Is my information secure?',
      a: 'Yes, we use bank-level encryption and comply with international data protection regulations.'
    },
    {
      q: 'How quickly can I sell my property?',
      a: 'Our average time to sell is 30-45 days. Premium listings with professional photos sell faster.'
    },
    {
      q: 'Do you offer financing assistance?',
      a: 'Yes, we partner with leading financial institutions to offer buyers financing options.'
    },
    {
      q: 'Can I invest internationally?',
      a: 'Absolutely! We have properties in 50+ countries. Investors can browse and invest globally.'
    }
  ];

  const departments = [
    { name: 'Sales Support', email: 'sales@landtrading.com', icon: '💼' },
    { name: 'Investor Relations', email: 'investors@landtrading.com', icon: '💰' },
    { name: 'Technical Support', email: 'support@landtrading.com', icon: '🔧' },
    { name: 'Legal & Compliance', email: 'legal@landtrading.com', icon: '⚖️' }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-950 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-slate-300">Have questions? Our team is here to help 24/7</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Contact Methods */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Multiple Ways to Reach Us</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {departments.map((dept, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl mb-3">{dept.icon}</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{dept.name}</h3>
                <a href={`mailto:${dept.email}`} className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  {dept.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form & Offices */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Form */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h2>
            {sent ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg p-6">
                <div className="text-green-700 dark:text-green-400 font-semibold mb-2">✓ Message Sent!</div>
                <p className="text-green-600 dark:text-green-400">Thank you for reaching out. We'll respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e)=>{e.preventDefault(); setSent(true);}} className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
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
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                  <select 
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    value={form.subject} 
                    onChange={(e)=>setForm({...form,subject:e.target.value})}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="listing">Listing Inquiry</option>
                    <option value="investment">Investment Query</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                  <textarea 
                    placeholder="Tell us how we can help..." 
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    rows={5} 
                    value={form.message} 
                    onChange={(e)=>setForm({...form,message:e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Offices */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Our Offices</h2>
            <div className="space-y-4">
              {offices.map((office, i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">{office.city}, {office.country}</h3>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    <div className="flex items-start gap-2">
                      <span>📍</span>
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>☎️</span>
                      <a href={`tel:${office.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✉️</span>
                      <a href={`mailto:${office.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏰</span>
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 cursor-pointer group">
                <summary className="font-semibold text-slate-900 dark:text-white flex justify-between items-center">
                  {faq.q}
                  <span className="text-xl group-open:rotate-180 transition">›</span>
                </summary>
                <p className="text-slate-600 dark:text-slate-400 mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-8 text-center border border-blue-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ready to Get Started?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Join thousands of users buying, selling, and investing in real estate</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/register" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Create Account
            </a>
            <a href="/properties" className="px-6 py-2 border border-slate-300 dark:border-slate-600 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
              Browse Properties
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

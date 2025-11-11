import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSearchTabs from '../components/HeroSearchTabs';
import ToolsWidgets from '../components/ToolsWidgets';
import TypesStrip from '../components/TypesStrip';
import PopularCities from '../components/PopularCities';
import CommercialSpaces from '../components/CommercialSpaces';
import GlobalChat from '../components/GlobalChat';

export default function Home() {
  const [showGlobalChat, setShowGlobalChat] = useState(false);

 const heroImage = '/digital-land-concept.png';
 
  return (
    <div className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Find, buy, and sell land with confidence
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Explore curated land listings with transparent details, secure documents, and real-time updates.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/properties" className="px-5 py-3 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900">Browse properties</Link>
              <Link to="/sell" className="px-5 py-3 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200">List your land</Link>
            </div>
            <div className="mt-8">
              <HeroSearchTabs />
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
  <img
    className="w-full h-80 md:h-[24rem] object-cover"
    src="/digital-land-concept.png"
    alt="Digital land trading platform"
    onError={(e) => {
      e.target.style.display = 'none';
      const fallback = document.createElement('div');
      fallback.className = 'w-full h-80 md:h-[24rem] flex items-center justify-center';
      fallback.innerHTML = `
        <div class="text-center p-8">
          <div class="text-6xl mb-4">🏗️</div>
          <div class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Land Trading Platform</div>
          <div class="text-lg text-slate-600 dark:text-slate-400">Buy, Sell & Invest in Real Estate</div>
        </div>
      `;
      e.target.parentElement.appendChild(fallback);
    }}
  />
</div>

        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Commercial Spaces</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">Choose from a wide variety of commercial properties</p>
        <CommercialSpaces />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Upcoming Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              id: 1,
              name: 'Elite Business Park',
              description: 'Premium commercial space in prime business district',
              image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop'
            },
            {
              id: 2,
              name: 'Luxury Residential Towers',
              description: 'Modern living spaces with world-class amenities',
              image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop'
            },
            {
              id: 3,
              name: 'Green Valley Estates',
              description: 'Eco-friendly residential community with sustainable design',
              image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop'
            }
          ].map(project => (
            <div key={project.id} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 hover:shadow-lg transition">
              <img 
                alt={project.name} 
                className="h-40 w-full object-cover" 
                src={project.image}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop';
                }}
              />
              <div className="p-4">
                <div className="font-semibold text-slate-900 dark:text-white">{project.name}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{project.description}</div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">Launching soon in a prime location</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <PopularCities />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <TypesStrip />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 bg-slate-50 dark:bg-slate-900 rounded-2xl">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">AI-Driven Matching with Buyer, Investor and Family Office</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Smart Property Matching</h3>
            <p className="text-slate-600 dark:text-slate-400">Our AI analyzes your preferences, investment goals, and risk tolerance to match you with the perfect properties and opportunities.</p>
          </div>
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Investor Alignment</h3>
            <p className="text-slate-600 dark:text-slate-400">Connect with buyers, institutional investors, and family offices whose interests align with your project's potential and your investment criteria.</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link to="/properties" className="px-5 py-3 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 inline-block hover:opacity-90 transition cursor-pointer">Explore AI Matches</Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Popular categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'Agricultural', type: 'agricultural', icon: '🌾' },
            { name: 'Residential', type: 'residential', icon: '🏠' },
            { name: 'Commercial', type: 'commercial', icon: '🏢' },
            { name: 'Industrial', type: 'industrial', icon: '🏭' },
            { name: 'Office', type: 'office', icon: '💼' },
            { name: 'Recreational', type: 'recreational', icon: '⛰️' }
          ].map((c) => (
            <Link 
              key={c.type} 
              to={`/properties?type=${c.type}`} 
              className="border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:shadow-md transition cursor-pointer block"
            >
              <div className="text-3xl mb-2">{c.icon}</div>
              <div className="font-semibold">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-4">
        <ToolsWidgets />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Why The Unsold?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[{
            t: 'Verified listings', d: 'All properties include clear details and document support.'
          }, { t: 'Secure uploads', d: 'Cloud-backed storage for images and documents.' }, { t: 'Powerful search', d: 'Filter by location, price, and more with fast results.' }].map((f, i) => (
            <div key={i} className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
              <div className="text-lg font-semibold text-slate-900 dark:text-white">{f.t}</div>
              <div className="text-slate-600 dark:text-slate-400 mt-1">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">For Investors & Buyers</h3>
            <ul className="mt-3 space-y-1 text-slate-700 dark:text-slate-300 list-disc list-inside">
              <li>Precision-driven discovery with powerful filters</li>
              <li>Market insights and trends to guide decisions</li>
              <li>Global opportunities across multiple asset types</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">For Developers & Sellers</h3>
            <ul className="mt-3 space-y-1 text-slate-700 dark:text-slate-300 list-disc list-inside">
              <li>Direct reach to qualified buyers and investors</li>
              <li>Secure document sharing and transparent details</li>
              <li>Data-backed positioning of your project</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How it works</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[{n:'1',t:'Discover',d:'Browse land by filters and maps.'},{n:'2',t:'Verify',d:'Review details, documents, and seller info.'},{n:'3',t:'Close',d:'Negotiate and finalize securely.'}].map((s) => (
            <div key={s.n} className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
              <div className="text-sm text-slate-500">Step {s.n}</div>
              <div className="text-lg font-semibold text-slate-900 dark:text-white">{s.t}</div>
              <div className="text-slate-600 dark:text-slate-400">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{k:'Total Deal Volume',v:'$10B+'},{k:'Active Listings',v:'2,500+'},{k:'Global Markets',v:'50+'},{k:'Verified Sellers',v:'1,200+'}].map((m) => (
            <div key={m.k} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
              <div className="text-sm text-slate-500">{m.k}</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">{m.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What users say</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            'Found a great plot quickly with clear pricing.',
            'Uploading documents was easy and secure.',
            'Love the clean UI and dark mode!'
          ].map((q, i) => (
            <div key={i} className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">“{q}”</div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="p-8 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Ready to get started?</h3>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Browse listings or list your land in minutes.</p>
          <div className="mt-4 flex justify-center gap-3">
            <Link to="/properties" className="px-5 py-3 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900">Browse properties</Link>
            <Link to="/sell" className="px-5 py-3 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200">List your land</Link>
          </div>
        </div>
      </section>

      {/* Global Chat Button */}
      <button
        onClick={() => setShowGlobalChat(!showGlobalChat)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-2xl transition-all z-40 flex items-center justify-center text-2xl hover:scale-110"
        title="Chat with buyers and sellers"
      >
        💬
      </button>

      {/* Global Chat Component */}
      {showGlobalChat && <GlobalChat onClose={() => setShowGlobalChat(false)} />}
    </div>
  );
}



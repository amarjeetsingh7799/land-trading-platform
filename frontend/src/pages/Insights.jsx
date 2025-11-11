import React from 'react';

export default function Insights() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">Market Insights</h1>
      <div className="grid md:grid-cols-3 gap-5">
        {[{t:'Pricing Trends',v:'+2.4% QoQ'},{t:'Cap Rates',v:'5.8% Avg'},{t:'Demand Index',v:'High'}].map((c) => (
          <div key={c.t} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="text-slate-500 text-sm">{c.t}</div>
            <div className="text-xl font-semibold text-slate-900 dark:text-white">{c.v}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-5">
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-lg font-semibold text-slate-900 dark:text-white">Macro Indicators</div>
          <ul className="mt-2 text-slate-700 dark:text-slate-300 space-y-1 list-disc list-inside">
            <li>Inflation (YoY): 3.2%</li>
            <li>Policy Rate: 5.25%</li>
            <li>Employment Growth: +1.1%</li>
          </ul>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-lg font-semibold text-slate-900 dark:text-white">Local Dynamics</div>
          <ul className="mt-2 text-slate-700 dark:text-slate-300 space-y-1 list-disc list-inside">
            <li>Top growth cities: Austin, Dubai, Berlin</li>
            <li>Industrial demand: Up in logistics corridors</li>
            <li>Zoning updates: 12 regions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}



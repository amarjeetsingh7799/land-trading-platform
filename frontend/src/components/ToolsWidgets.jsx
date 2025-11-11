import React from 'react';
import { Link } from 'react-router-dom';

const cards = [
  { to: '/tools/emi', title: 'EMI Calculator', desc: 'Estimate monthly EMIs for your loan' },
  { to: '/tools/budget', title: 'Budget Calculator', desc: 'Check your affordable buying power' },
  { to: '/tools/eligibility', title: 'Loan Eligibility', desc: 'See approximate loan amount for you' },
  { to: '/tools/area', title: 'Area Converter', desc: 'Convert land area across units' },
];

export default function ToolsWidgets() {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Use popular tools</h3>
        <Link to="/tools" className="text-sm text-slate-600 dark:text-slate-300">View all widgets</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cards.map(c => (
          <Link key={c.to} to={c.to} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-sm transition bg-white dark:bg-slate-900">
            <div className="font-semibold text-slate-900 dark:text-white">{c.title}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">{c.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

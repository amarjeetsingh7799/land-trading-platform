import React from 'react';
import { Link } from 'react-router-dom';

export default function ToolsIndex() {
  const tools = [
    { to: '/tools/emi', title: 'EMI Calculator', desc: 'Estimate monthly EMIs for your loan' },
    { to: '/tools/budget', title: 'Budget Calculator', desc: 'Check your affordable buying power' },
    { to: '/tools/eligibility', title: 'Loan Eligibility', desc: 'See approximate loan amount for you' },
    { to: '/tools/area', title: 'Area Converter', desc: 'Convert land area across units' },
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Tools & Calculators</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map(t => (
          <Link key={t.to} to={t.to} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-sm transition">
            <div className="font-semibold text-slate-900 dark:text-white">{t.title}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">{t.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

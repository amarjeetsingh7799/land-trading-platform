import React, { useState } from 'react';

export default function BudgetCalculator() {
  const [income, setIncome] = useState(150000);
  const [obligations, setObligations] = useState(30000);
  const [roi, setRoi] = useState(9);
  const [tenure, setTenure] = useState(240);

  const monthly = income - obligations;
  const i = roi / 12 / 100;
  const affordability = i ? (monthly * (Math.pow(1 + i, tenure) - 1)) / (i * Math.pow(1 + i, tenure)) : monthly * tenure;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Budget Calculator</h1>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 md:col-span-2">
          <label className="text-sm text-slate-600 dark:text-slate-300">Monthly Income (₹)</label>
          <input type="number" value={income} onChange={(e)=>setIncome(+e.target.value)} className="w-full mt-1 px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </div>
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <label className="text-sm text-slate-600 dark:text-slate-300">Monthly Obligations (₹)</label>
          <input type="number" value={obligations} onChange={(e)=>setObligations(+e.target.value)} className="w-full mt-1 px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </div>
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <label className="text-sm text-slate-600 dark:text-slate-300">Rate of Interest (% p.a.)</label>
          <input type="number" step="0.1" value={roi} onChange={(e)=>setRoi(+e.target.value)} className="w-full mt-1 px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </div>
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <label className="text-sm text-slate-600 dark:text-slate-300">Tenure (months)</label>
          <input type="number" value={tenure} onChange={(e)=>setTenure(+e.target.value)} className="w-full mt-1 px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
          <div className="text-sm text-slate-500">Monthly Surplus</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">₹{monthly.toFixed(0)}</div>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
          <div className="text-sm text-slate-500">Max Loan You Can Service</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">₹{affordability.toFixed(0)}</div>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
          <div className="text-sm text-slate-500">Indicative Property Budget (80% LTV)</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">₹{(affordability/0.8).toFixed(0)}</div>
        </div>
      </div>
    </div>
  );
}

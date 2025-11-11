import React, { useState } from 'react';

function calcEMI(p, r, n) {
  const i = r / 12 / 100;
  if (!i) return p / n;
  return (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}

export default function EMICalculator() {
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(240);

  const emi = calcEMI(Number(principal), Number(rate), Number(tenure));
  const total = emi * tenure;
  const interest = total - principal;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">EMI Calculator</h1>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <label className="text-sm text-slate-600 dark:text-slate-300">Loan Amount (₹)</label>
          <input type="number" value={principal} onChange={(e)=>setPrincipal(e.target.value)} className="w-full mt-1 px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </div>
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <label className="text-sm text-slate-600 dark:text-slate-300">Interest Rate (% p.a.)</label>
          <input type="number" step="0.1" value={rate} onChange={(e)=>setRate(e.target.value)} className="w-full mt-1 px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </div>
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <label className="text-sm text-slate-600 dark:text-slate-300">Tenure (months)</label>
          <input type="number" value={tenure} onChange={(e)=>setTenure(e.target.value)} className="w-full mt-1 px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
          <div className="text-sm text-slate-500">Monthly EMI</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">₹{emi.toFixed(0)}</div>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
          <div className="text-sm text-slate-500">Total Interest</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">₹{interest.toFixed(0)}</div>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
          <div className="text-sm text-slate-500">Total Payment</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">₹{total.toFixed(0)}</div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export default function LoanEligibility() {
  const [salary, setSalary] = useState(150000);
  const [existingEmi, setExistingEmi] = useState(20000);
  const [roi, setRoi] = useState(9);
  const [tenure, setTenure] = useState(240);

  const surplus = Math.max(0, salary * 0.5 - existingEmi); // assume 50% FOIR
  const i = roi / 12 / 100;
  const loan = i ? (surplus * (Math.pow(1 + i, tenure) - 1)) / (i * Math.pow(1 + i, tenure)) : surplus * tenure;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Loan Eligibility</h1>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 md:col-span-2">
          <label className="text-sm text-slate-600 dark:text-slate-300">Monthly Salary (₹)</label>
          <input type="number" value={salary} onChange={(e)=>setSalary(+e.target.value)} className="w-full mt-1 px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </div>
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <label className="text-sm text-slate-600 dark:text-slate-300">Existing EMIs (₹)</label>
          <input type="number" value={existingEmi} onChange={(e)=>setExistingEmi(+e.target.value)} className="w-full mt-1 px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
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
          <div className="text-sm text-slate-500">Eligible EMI (50% FOIR)</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">₹{surplus.toFixed(0)}</div>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
          <div className="text-sm text-slate-500">Eligible Loan Amount</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">₹{loan.toFixed(0)}</div>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
          <div className="text-sm text-slate-500">Indicative Property Budget (80% LTV)</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">₹{(loan/0.8).toFixed(0)}</div>
        </div>
      </div>
    </div>
  );
}

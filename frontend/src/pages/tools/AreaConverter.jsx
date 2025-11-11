import React, { useMemo, useState } from 'react';

const UNITS = {
  sqft: 1,
  sqm: 10.7639,
  acre: 43560,
  hectare: 107639,
  bigha: 27225, // approximate (varies regionally)
};

export default function AreaConverter() {
  const [from, setFrom] = useState('sqft');
  const [to, setTo] = useState('sqm');
  const [value, setValue] = useState(1000);

  const result = useMemo(() => {
    const sqft = Number(value) * UNITS[from];
    return sqft / UNITS[to];
  }, [from, to, value]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Area Converter</h1>
      <div className="grid md:grid-cols-4 gap-4 items-end mb-6">
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 md:col-span-2">
          <label className="text-sm text-slate-600 dark:text-slate-300">Value</label>
          <input type="number" value={value} onChange={(e)=>setValue(e.target.value)} className="w-full mt-1 px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </div>
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <label className="text-sm text-slate-600 dark:text-slate-300">From</label>
          <select value={from} onChange={(e)=>setFrom(e.target.value)} className="w-full mt-1 px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
            {Object.keys(UNITS).map(u => (<option key={u} value={u}>{u.toUpperCase()}</option>))}
          </select>
        </div>
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <label className="text-sm text-slate-600 dark:text-slate-300">To</label>
          <select value={to} onChange={(e)=>setTo(e.target.value)} className="w-full mt-1 px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
            {Object.keys(UNITS).map(u => (<option key={u} value={u}>{u.toUpperCase()}</option>))}
          </select>
        </div>
      </div>
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
        <div className="text-sm text-slate-500">Converted Value</div>
        <div className="text-2xl font-bold text-slate-900 dark:text-white">{result.toFixed(4)} {to.toUpperCase()}</div>
      </div>
    </div>
  );
}

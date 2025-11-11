import React from 'react';

export default function Events() {
  const events = [
    { title: 'Real Estate Investment Summit 2024', date: 'March 15, 2024', location: 'New York', type: 'Conference' },
    { title: 'Land Development Workshop', date: 'April 10, 2024', location: 'Dubai', type: 'Workshop' },
    { title: 'Investor Networking Night', date: 'May 5, 2024', location: 'London', type: 'Networking' },
    { title: 'Property Tech Innovation Day', date: 'June 20, 2024', location: 'San Francisco', type: 'Tech' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">Events</h1>
      <div className="grid md:grid-cols-2 gap-5">
        {events.map((e, i) => (
          <div key={i} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="text-sm text-slate-500">{e.type}</div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{e.title}</h3>
            <div className="mt-2 text-slate-600 dark:text-slate-300">{e.date}</div>
            <div className="text-slate-600 dark:text-slate-300">{e.location}</div>
            <button className="mt-3 px-4 py-2 rounded border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200">Register</button>
          </div>
        ))}
      </div>
    </div>
  );
}


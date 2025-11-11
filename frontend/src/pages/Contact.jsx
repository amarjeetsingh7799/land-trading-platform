import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">Request a Demo</h1>
      {sent ? (
        <div className="p-4 rounded border border-green-300 text-green-700">Thanks! We will contact you shortly.</div>
      ) : (
        <form onSubmit={(e)=>{e.preventDefault(); setSent(true);}} className="grid gap-3">
          <input placeholder="Name" className="px-3 py-2 border rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
          <input placeholder="Email" type="email" className="px-3 py-2 border rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
          <input placeholder="Company" className="px-3 py-2 border rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})} />
          <textarea placeholder="What would you like to achieve?" className="px-3 py-2 border rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" rows={5} value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} />
          <button type="submit" className="px-4 py-2 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900 w-max">Send</button>
        </form>
      )}
    </div>
  );
}



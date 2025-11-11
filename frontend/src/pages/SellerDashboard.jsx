import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function SellerDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    api.get('/properties/me/list')
      .then((res) => setItems(res.data.items))
      .catch((e) => setError(e?.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!window.confirm('Delete this property?')) return;
    await api.delete(`/properties/${id}`);
    load();
  };

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="max-w-6xl mx-auto px-4 py-8 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Listings</h2>
        <Link to="/sell" className="px-4 py-2 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900">Create listing</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((p) => (
          <div key={p._id} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
            <Link to={`/properties/${p._id}`}>
              <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800">
                {p.images && p.images[0] && (
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                )}
              </div>
            </Link>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-1">{p.title}</h3>
                <span className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">{p.status}</span>
              </div>
              <div className="mt-1 text-slate-600 dark:text-slate-300">${p.price?.toLocaleString?.() || p.price}</div>
              <div className="text-slate-500 dark:text-slate-400 text-sm">{p.location?.city}, {p.location?.state}</div>
              <div className="mt-3 flex gap-2">
                {/* Edit could navigate to an edit page; for now just placeholder */}
                <button onClick={() => onDelete(p._id)} className="px-3 py-1.5 rounded border border-red-300 text-red-700 hover:bg-red-50">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



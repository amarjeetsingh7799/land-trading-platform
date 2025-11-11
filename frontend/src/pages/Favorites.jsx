import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/favorites')
      .then((res) => setItems(res.data.items))
      .catch((e) => setError(e?.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="max-w-6xl mx-auto px-4 py-8 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Saved Properties</h2>
      {items.length === 0 && <div className="text-slate-600 dark:text-slate-300">No favorites yet.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((p) => (
          <Link to={`/properties/${p._id}`} key={p._id} className="group border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 hover:shadow-md transition">
            <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
              {p.images && p.images[0] && (
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-1">{p.title}</h3>
              <div className="mt-1 text-slate-600 dark:text-slate-300">${p.price?.toLocaleString?.() || p.price}</div>
              <div className="text-slate-500 dark:text-slate-400 text-sm">{p.location?.city}, {p.location?.state}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}



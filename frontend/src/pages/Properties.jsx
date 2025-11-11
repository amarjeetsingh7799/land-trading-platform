import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleMapSection from '../components/GoogleMapSection';

export default function Properties() {
  const [items, setItems] = useState([]);
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const toggleFavorite = async (e, id, liked) => {
    e.preventDefault();
    if (!user) return;
    try {
      if (liked) await api.delete(`/favorites/${id}`);
      else await api.post(`/favorites/${id}`);
    } catch {}
  };
  
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  
  const initialFilters = { 
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    type: searchParams.get('type') || '', 
    category: searchParams.get('category') || '',
    minPrice: '', 
    maxPrice: '', 
    parking: false,
    garden: false,
    pool: false,
    balcony: false,
    sort: 'newest' 
  };
  
  const [filters, setFilters] = useState(initialFilters);

  // ✅ Centralized filter change handler
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    // Note: We don't automatically set page to 1 here because changing the page
    // state later will handle that, but it's a good practice if you were
    // updating the URL directly here. Since the useEffect below handles the API call,
    // we'll rely on the manual page update or setPage(1) on certain changes (like reset).
  };


  useEffect(() => {
    const cityParam = searchParams.get('city');
    const stateParam = searchParams.get('state');
    const typeParam = searchParams.get('type');
    const categoryParam = searchParams.get('category');
    const q = searchParams.get('q');
    const budget = searchParams.get('budget');

    const next = { ...initialFilters }; // Start clean for URL sync

    // ✅ Handle city parsing from URL
    if (cityParam) {
      next.city = cityParam;
    } else if (q) {
      const raw = q.trim();
      // Extract city name and clean it
      const cityName = raw.split(/[,|]/)[0]?.trim();
      // Remove any trailing/leading spaces and country names
      next.city = cityName?.replace(/\s*(India|USA|UK|UAE)$/, '').trim() || '';
    }
    
    if (stateParam) next.state = stateParam;
    if (typeParam) next.type = typeParam;
    if (categoryParam) next.category = categoryParam;
    
    // Handle budget parsing
    if (budget) {
      const toNumber = (txt) => {
        if (!txt) return '';
        if (txt.endsWith('L')) return parseFloat(txt) * 100000;
        if (txt.endsWith('Cr')) return parseFloat(txt) * 10000000;
        return parseFloat(txt);
      };
      if (budget.includes('-')) {
        const [min, max] = budget.split('-');
        next.minPrice = toNumber(min);
        next.maxPrice = toNumber(max);
      } else if (budget.endsWith('+')) {
        const base = budget.slice(0, -1);
        next.minPrice = toNumber(base);
        next.maxPrice = '';
      }
    }
    
    setFilters(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // ✅ Data Fetching useEffect (Monitors page and filters)
  useEffect(() => {
    setLoading(true);
    setError('');
    const params = { page, ...filters };
    Object.keys(params).forEach((k) => {
      // Remove empty values but keep 0 for price
      if (params[k] === '' || params[k] === false || params[k] === undefined) delete params[k];
      // Convert boolean values to string for backend (e.g., parking: 'true')
      if (params[k] === true) params[k] = 'true';
      // Clean city name if present
      if (k === 'city' && params[k]) {
        params[k] = params[k].trim();
      }
    });
    
    console.log('🔍 Frontend sending params:', params);
    
    api.get('/properties', { params })
      .then((res) => { 
        if (res.data && res.data.success !== false) {
          setItems(res.data.items || []); 
          setTotal(res.data.total || 0);
        } else {
          setError(res.data?.message || 'Failed to load properties');
        }
      })
      .catch((e) => {
        // ... error handling logic
        console.error('Properties API Error:', e);
        if (e.code === 'ECONNREFUSED' || e.message?.includes('Network Error')) {
          setError('Unable to connect to server. Please make sure the backend server is running on http://localhost:5000');
        } else if (e.response?.data?.message) {
          setError(e.response.data.message);
        } else if (e.response?.status === 404) {
          setError('Properties endpoint not found. Please check API configuration.');
        } else {
          setError('Failed to load properties. Please try again later.');
        }
      })
      .finally(() => setLoading(false));
  }, [page, filters]); // DEPENDS ON filters

  const totalPages = Math.max(1, Math.ceil(total / 12));
  const [showMap, setShowMap] = useState(false);

  // ✅ Reset handler (defined early so it can be used in error / empty states)
  const handleReset = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  // ... loading and error states (unchanged, correct)
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-lg text-slate-600 dark:text-slate-400">Loading properties — please wait.</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="border border-red-200 dark:border-red-800 rounded-xl p-6 bg-red-50 dark:bg-red-900/20">
          <div className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Unable to load properties</div>
          <div className="text-red-600 dark:text-red-400 mb-4">{error}</div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                // Simple retry logic (simplified)
                setError('');
                setLoading(true);
                const params = { page, ...filters };
                Object.keys(params).forEach((k) => {
                    if (params[k] === '' || params[k] === false) delete params[k];
                    if (params[k] === true) params[k] = 'true'; 
                });
                api.get('/properties', { params })
                  .then((res) => { 
                    setItems(res.data.items || []); 
                    setTotal(res.data.total || 0);
                  })
                  .catch((e) => setError(e?.response?.data?.message || 'Failed to load'))
                  .finally(() => setLoading(false));
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Retry
            </button>
            <button onClick={handleReset} className="px-4 py-2 border rounded bg-white dark:bg-slate-800">Clear filters</button>
            <div className="text-sm text-slate-600 dark:text-slate-400 ml-4">If the problem persists, please try again later or contact support.</div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3 flex-1">
          {/* Use handleFilterChange */}
          <input className="px-3 py-2 border rounded" placeholder="City" value={filters.city} onChange={(e) => handleFilterChange('city', e.target.value)} />
          <input className="px-3 py-2 border rounded" placeholder="State" value={filters.state} onChange={(e) => handleFilterChange('state', e.target.value)} />
          <select className="px-3 py-2 border rounded" value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)}>
            <option value="">All Types</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
            <option value="office">Office</option>
            <option value="agricultural">Agricultural</option>
            <option value="recreational">Recreational</option>
          </select>
          <select className="px-3 py-2 border rounded" value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}>
            <option value="">All Categories</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
            <option value="new">New Launch</option>
            <option value="commercial">Commercial</option>
            <option value="plots">Plot Property</option>
          </select>
          <input className="px-3 py-2 border rounded" placeholder="Min Price" type="number" value={filters.minPrice} onChange={(e) => handleFilterChange('minPrice', e.target.value)} />
          <input className="px-3 py-2 border rounded" placeholder="Max Price" type="number" value={filters.maxPrice} onChange={(e) => handleFilterChange('maxPrice', e.target.value)} />
          <select className="px-3 py-2 border rounded" value={filters.sort} onChange={(e) => handleFilterChange('sort', e.target.value)}>
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{k:'parking',label:'Parking'},{k:'garden',label:'Garden'},{k:'pool',label:'Swimming pool'},{k:'balcony',label:'Balcony'}].map(a => (
          <label key={a.k} className="flex items-center gap-2 text-sm">
            {/* Use handleFilterChange for checkboxes */}
            <input type="checkbox" checked={!!filters[a.k]} onChange={(e)=> handleFilterChange(a.k, e.target.checked)} />
            {a.label}
          </label>
        ))}
      </div>
      <button className="px-4 py-2 border rounded" onClick={handleReset}>Clear filters</button>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Properties ({total})</h2>
        <button className="px-3 py-1.5 border rounded" onClick={() => setShowMap((v) => !v)}>{showMap ? 'Hide Map' : 'Show Map'}</button>
      </div>

      {/* ... Map section (unchanged) */}
      {showMap && (
        <div className="mb-6">
          <GoogleMapSection
            markers={items.filter(p => p.location?.coordinates?.lat && p.location?.coordinates?.lng).map(p => ({
              lat: p.location.coordinates.lat,
              lng: p.location.coordinates.lng,
              title: p.title
            }))}
            height={360}
            zoom={4}
          />
        </div>
      )}

      {/* ... Property list (unchanged, correct) */}
      {items.length === 0 ? (
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center bg-white dark:bg-slate-900">
          <div className="text-lg font-semibold text-slate-900 dark:text-white mb-1">No properties found</div>
          <div className="text-slate-600 dark:text-slate-400 mb-4">Try clearing or adjusting your filters to see more results.</div>
          <div className="flex justify-center gap-3">
            <button
              className="px-4 py-2 border rounded"
              onClick={handleReset}
            >
              Clear filters
            </button>
            <Link to="/properties" className="px-4 py-2 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900">View all</Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p) => (
            <Link to={`/properties/${p._id}`} key={p._id} className="group border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 hover:shadow-md transition relative">
              <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                {p.images && p.images[0] ? (
                  <img 
                    src={p.images[0]} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                    onError={(e) => {
                      console.error('Image failed to load:', p.images[0]);
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Unavailable'; // Fallback image
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    Image unavailable
                  </div>
                )}
              </div>
              {user && (
                <button onClick={(e) => toggleFavorite(e, p._id, false)} className="absolute top-2 right-2 px-2 py-1 rounded bg-white/80 dark:bg-slate-900/80 border text-slate-700 dark:text-slate-200">❤</button>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-1">{p.title}</h3>
                <div className="mt-1 text-slate-600 dark:text-slate-300">${p.price?.toLocaleString?.() || p.price}</div>
                <div className="text-slate-500 dark:text-slate-400 text-sm">{p.location?.city}, {p.location?.state}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ... Pagination (unchanged, correct) */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1.5 border rounded disabled:opacity-50">Prev</button>
        <span className="text-slate-600 dark:text-slate-300">Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1.5 border rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}
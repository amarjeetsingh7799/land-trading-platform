import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, sold

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const response = await api.get('/properties/my-properties');
      setProperties(response.data.properties || response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      await api.delete(`/properties/${id}`);
      setProperties(properties.filter(p => p._id !== id));
    } catch (error) {
      console.error('Failed to delete property:', error);
      alert('Failed to delete property');
    }
  };

  const filteredProperties = properties.filter(property => {
    if (filter === 'all') return true;
    if (filter === 'active') return property.status === 'available';
    if (filter === 'sold') return property.status === 'sold';
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading your properties...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Properties</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your listed properties
          </p>
        </div>
        <Link
          to="/sell"
          className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:opacity-90 transition"
        >
          + Add New Property
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{properties.length}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Total Properties</div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="text-3xl font-bold text-green-600">{properties.filter(p => p.status === 'available').length}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Active Listings</div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="text-3xl font-bold text-blue-600">{properties.filter(p => p.status === 'sold').length}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Sold</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'all'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          All ({properties.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'active'
              ? 'bg-green-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Active ({properties.filter(p => p.status === 'available').length})
        </button>
        <button
          onClick={() => setFilter('sold')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'sold'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Sold ({properties.filter(p => p.status === 'sold').length})
        </button>
      </div>

      {/* Properties List */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No properties found</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {filter === 'all' ? 'Start by listing your first property' : `No ${filter} properties`}
          </p>
          <Link
            to="/sell"
            className="inline-block px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:opacity-90 transition"
          >
            List a Property
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div
              key={property._id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition"
            >
              <div className="grid md:grid-cols-4 gap-4 p-6">
                
                {/* Image */}
                <div className="md:col-span-1">
                  <img
                    src={property.images?.[0] || 'https://via.placeholder.com/300x200'}
                    alt={property.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>

                {/* Details */}
                <div className="md:col-span-2">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {property.title}
                    </h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      property.status === 'available'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {property.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <span>📍 {property.location?.city || 'N/A'}</span>
                    <span>📏 {property.area} {property.areaUnit}</span>
                    <span>🏷️ {property.type}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-1 flex flex-col justify-between">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    ₹{property.price?.toLocaleString()}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/properties/${property._id}`}
                      className="px-4 py-2 text-center border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit/${property._id}`}
                      className="px-4 py-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

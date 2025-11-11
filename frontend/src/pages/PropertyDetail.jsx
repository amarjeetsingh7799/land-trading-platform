import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import GoogleMapSection from '../components/GoogleMapSection';
import PropertyChat from '../components/PropertyChat';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PropertyDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    api.get(`/properties/${id}`)
      .then((res) => setProperty(res.data.property))
      .catch((e) => setError(e?.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: 20 }}>Loading property details — please wait.</div>;
  if (error) return <div style={{ padding: 20, color: 'red' }}>Unable to load property details. {error}</div>;
  if (!property) return null;

  const hasCoords = property.location?.coordinates?.lat && property.location?.coordinates?.lng;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{property.title}</h2>

      {property.images?.length > 0 && (
        <div className="flex gap-2 overflow-x-auto mt-4">
          {property.images.map((src, idx) => (
            <img key={idx} src={src} alt={property.title} className="h-56 rounded-lg border border-slate-200 dark:border-slate-800" />
          ))}
        </div>
      )}

      <div className="mt-4 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="text-lg text-slate-700 dark:text-slate-300">${property.price?.toLocaleString?.() || property.price}</div>
          <div className="text-slate-600 dark:text-slate-400">Area: {property.area} sqft</div>
          <div className="text-slate-600 dark:text-slate-400">{property.location?.city}, {property.location?.state}</div>
          <p className="mt-4 text-slate-700 dark:text-slate-300">{property.description}</p>
          <div className="mt-4 flex gap-2">
            {user && (
              <>
                <button 
                  onClick={async () => { 
                    try { 
                      await api.post(`/favorites/${property._id}`); 
                      alert('Added to favorites');
                    } catch (err) {
                      console.error('Error adding to favorites:', err);
                    }
                  }} 
                  className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  Save to favorites
                </button>
                {user._id !== property.seller?._id && property.seller && (
                  <button 
                    onClick={() => setShowChat(!showChat)}
                    className="px-4 py-2 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition"
                  >
                    Message seller
                  </button>
                )}
              </>
            )}
            {user?.role === 'seller' && user._id === property.seller?._id && (
              <button onClick={() => navigate(`/edit/${property._id}`)} className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                Edit listing
              </button>
            )}
          </div>
          {showChat && property.seller && (
            <PropertyChat 
              propertyId={property._id} 
              sellerId={property.seller._id || property.seller}
              onClose={() => setShowChat(false)}
            />
          )}
        </div>
        <div>
          {hasCoords && (
            <GoogleMapSection
              center={{ lat: property.location.coordinates.lat, lng: property.location.coordinates.lng }}
              markers={[{ lat: property.location.coordinates.lat, lng: property.location.coordinates.lng, title: property.title }]}
              height={256}
              zoom={13}
            />
          )}
        </div>
      </div>
    </div>
  );
}



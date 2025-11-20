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
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [relatedProperties, setRelatedProperties] = useState([]);

  useEffect(() => {
    api.get(`/properties/${id}`)
      .then((res) => {
        setProperty(res.data.property);
        // Fetch related properties in same city
        if (res.data.property?.location?.city) {
          api.get('/properties', { 
            params: { city: res.data.property.location.city, limit: 4 } 
          })
            .then((r) => setRelatedProperties(r.data.items?.filter(p => p._id !== id) || []))
            .catch(() => setRelatedProperties([]));
        }
      })
      .catch((e) => setError(e?.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      <div className="text-lg text-slate-600 dark:text-slate-400">Loading property details...</div>
    </div>
  );
  
  if (error) return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="border border-red-200 dark:border-red-800 rounded-lg p-6 bg-red-50 dark:bg-red-900/20">
        <div className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Couldn’t load this listing</div>
        <div className="text-red-600 dark:text-red-400">{error}</div>
      </div>
    </div>
  );
  
  if (!property) return null;

  const hasCoords = property.location?.coordinates?.lat && property.location?.coordinates?.lng;
  const mainImage = property.images?.[mainImageIndex] || null;

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">{property.title}</h1>
          <div className="flex flex-wrap gap-4 text-slate-600 dark:text-slate-400">
            <span>📍 {property.location?.city}, {property.location?.state}</span>
            <span>•</span>
            <span>🏷️ {property.type}</span>
            <span>•</span>
            <span>{property.category?.toUpperCase()}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            {mainImage ? (
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={mainImage} 
                  alt={property.title}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    console.error('Main image failed to load:', mainImage);
                    e.target.src = 'https://via.placeholder.com/600x400?text=Property+Image+Not+Available';
                  }}
                />
              </div>
            ) : (
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg h-96 flex items-center justify-center text-slate-400">
                <div className="text-center">
                    <div className="text-4xl mb-2">🖼️</div>
                    <div>No photos yet — contact the seller to request images.</div>
                  </div>
              </div>
            )}
            
            {/* Thumbnail gallery */}
            {property.images?.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {property.images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImageIndex(idx)}
                    className={`flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 transition ${
                      mainImageIndex === idx 
                        ? 'border-blue-500' 
                        : 'border-slate-300 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <img 
                      src={src} 
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=Img';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Info Card */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 h-fit shadow-md">
            <div className="mb-6">
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                ${property.price?.toLocaleString?.() || property.price}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                ${(property.price / property.area).toFixed(2)} per sqft
              </div>
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Area:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{property.area} sqft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Type:</span>
                <span className="font-semibold text-slate-900 dark:text-white capitalize">{property.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Category:</span>
                <span className="font-semibold text-slate-900 dark:text-white capitalize">{property.category}</span>
              </div>
              {property.isNegotiable && (
                <div className="text-sm text-green-600 dark:text-green-400 font-semibold">✓ Price is negotiable</div>
              )}
            </div>

            <div className="space-y-2">
              {user ? (
                <>
                  <button 
                    onClick={async () => { 
                      try { 
                        await api.post(`/favorites/${property._id}`); 
                        alert('Saved to your favorites');
                      } catch (err) {
                        console.error('Error adding to favorites:', err);
                      }
                    }} 
                    className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition font-medium text-slate-900 dark:text-white"
                  >
                    ❤️ Save to favorites
                  </button>
                  {user._id !== property.seller?._id && property.seller && (
                    <button 
                      onClick={() => setShowChat(!showChat)}
                      className="w-full px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
                    >
                      💬 Message seller
                    </button>
                  )}
                  {user?.role === 'seller' && user._id === property.seller?._id && (
                    <button onClick={() => navigate(`/edit/${property._id}`)} className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition font-medium text-slate-900 dark:text-white">
                      ✏️ Edit listing
                    </button>
                  )}
                </>
              ) : (
                <div className="text-sm text-slate-600 dark:text-slate-400 text-center p-3 bg-slate-200 dark:bg-slate-700 rounded">
                  Please sign in to save this listing or message the seller
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description & Amenities */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            {/* Description */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About this property</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            {(property.amenities?.parking || property.amenities?.garden || property.amenities?.pool || property.amenities?.balcony) && (
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {property.amenities?.parking && (
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <span className="text-2xl">🅿️</span>
                      <span>Parking</span>
                    </div>
                  )}
                  {property.amenities?.garden && (
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <span className="text-2xl">🌳</span>
                      <span>Garden</span>
                    </div>
                  )}
                  {property.amenities?.pool && (
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <span className="text-2xl">🏊</span>
                      <span>Pool</span>
                    </div>
                  )}
                  {property.amenities?.balcony && (
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <span className="text-2xl">🌅</span>
                      <span>Balcony</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Location Map */}
            {hasCoords ? (
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Location</h2>
                <GoogleMapSection
                  center={{ lat: property.location.coordinates.lat, lng: property.location.coordinates.lng }}
                  markers={[{ 
                    lat: property.location.coordinates.lat, 
                    lng: property.location.coordinates.lng, 
                    title: property.title 
                  }]}
                  height={400}
                  zoom={15}
                />
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 mb-6 border-l-4 border-yellow-500">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">📍 Location</h2>
                <div className="text-slate-600 dark:text-slate-400">
                  <p className="mb-2"><strong>City:</strong> {property.location?.city}</p>
                  <p><strong>State:</strong> {property.location?.state}</p>
                  <p className="mt-3 text-sm text-slate-500">Detailed map not available for this listing right now.</p>
                </div>
              </div>
            )}
          </div>

          {/* Seller Info */}
          {property.seller && (
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 h-fit shadow-md">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Seller information</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Name</div>
                  <div className="font-semibold text-slate-900 dark:text-white">{property.seller?.name || 'Property Seller'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Role</div>
                  <div className="font-semibold text-slate-900 dark:text-white capitalize">{property.seller?.role || 'Seller'}</div>
                </div>
                {property.seller?.email && (
                  <div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Email</div>
                    <a href={`mailto:${property.seller.email}`} className="text-blue-600 dark:text-blue-400 hover:underline break-all">
                      {property.seller.email}
                    </a>
                  </div>
                )}
                {!user && (
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    Sign in to contact the seller
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Chat Section */}
        {showChat && property.seller && (
          <div className="mb-8 bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
            <PropertyChat 
              propertyId={property._id} 
              sellerId={property.seller._id || property.seller}
              onClose={() => setShowChat(false)}
            />
          </div>
        )}

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Similar properties in {property.location?.city}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProperties.map((p) => (
                <a 
                  key={p._id} 
                  href={`/properties/${p._id}`}
                  className="group border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900 hover:shadow-lg transition"
                >
                  <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    {p.images?.[0] ? (
                      <img 
                        src={p.images[0]} 
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x225?text=Property';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">No image</div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 text-sm">{p.title}</h3>
                    <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">${p.price?.toLocaleString?.()}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



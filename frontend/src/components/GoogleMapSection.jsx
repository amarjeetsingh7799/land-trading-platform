import React, { useMemo, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

// Default configuration
const DEFAULT_CONFIG = {
  center: { lat: 28.6139, lng: 77.2090 }, // Delhi, India
  zoom: 12,
  height: 256
};

const MAP_OPTIONS = {
  streetViewControl: false,
  mapTypeControl: true,
  fullscreenControl: true,
  zoomControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

const GoogleMapSection = ({ 
  center, 
  markers = [], 
  height = DEFAULT_CONFIG.height, 
  zoom = DEFAULT_CONFIG.zoom,
  onMarkerClick
}) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapError, setMapError] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  });

  const mapContainerStyle = useMemo(() => ({ 
    width: '100%', 
    height: `${height}px` 
  }), [height]);

  // Calculate map center based on props or first marker
  const mapCenter = useMemo(() => {
    if (center) return center;
    if (markers.length > 0) {
      return { lat: markers[0].lat, lng: markers[0].lng };
    }
    return DEFAULT_CONFIG.center;
  }, [center, markers]);

  // Handle marker click
  const handleMarkerClick = useCallback((marker, index) => {
    setSelectedMarker(index);
    if (onMarkerClick) {
      onMarkerClick(marker, index);
    }
  }, [onMarkerClick]);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-8 bg-slate-50 dark:bg-slate-900" style={{ height: `${height}px` }}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-slate-600 dark:text-slate-400">Loading map...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (loadError || mapError) {
    console.error('Google Maps Error:', loadError || mapError);
    return (
      <div className="border border-red-200 dark:border-red-800 rounded-lg p-8 bg-red-50 dark:bg-red-900/20" style={{ height: `${height}px` }}>
        <div className="flex items-center justify-center h-full text-center">
          <div className="text-red-600 dark:text-red-400">
            <span className="text-2xl mb-2 block">⚠️</span>
            <p className="font-medium">Map is temporarily unavailable</p>
            <p className="text-sm mt-1">Please try again later or contact support</p>
          </div>
        </div>
      </div>
    );
  }

  // No markers to display
  if (!markers || markers.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-8 bg-slate-50 dark:bg-slate-900" style={{ height: `${height}px` }}>
        <div className="flex items-center justify-center h-full text-center">
          <div className="text-slate-500 dark:text-slate-400">
            <span className="text-2xl mb-2 block">📍</span>
            <p>Location information not available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        center={mapCenter} 
        zoom={zoom} 
        options={MAP_OPTIONS}
        onError={() => setMapError('Failed to load map')}
      >
        {markers.map((marker, idx) => (
          <React.Fragment key={marker.id || `marker-${idx}`}>
            <Marker 
              position={{ lat: marker.lat, lng: marker.lng }} 
              title={marker.title || `Location ${idx + 1}`}
              onClick={() => handleMarkerClick(marker, idx)}
              animation={window.google?.maps?.Animation?.DROP}
            />
            {selectedMarker === idx && (
              <InfoWindow
                position={{ lat: marker.lat, lng: marker.lng }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="p-2 bg-white rounded max-w-xs">
                  <p className="font-semibold text-slate-900">{marker.title || `Location ${idx + 1}`}</p>
                  {marker.price && <p className="text-sm text-slate-600">${marker.price.toLocaleString()}</p>}
                </div>
              </InfoWindow>
            )}
          </React.Fragment>
        ))}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapSection;

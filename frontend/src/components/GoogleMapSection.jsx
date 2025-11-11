import React, { useMemo, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// Default configuration
const DEFAULT_CONFIG = {
  center: { lat: 28.6139, lng: 77.2090 }, // Delhi, India
  zoom: 12,
  height: 256
};

const MAP_OPTIONS = {
  streetViewControl: false,
  mapTypeControl: false,
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
    if (onMarkerClick) {
      onMarkerClick(marker, index);
    }
  }, [onMarkerClick]);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-8 bg-slate-50 dark:bg-slate-900">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-slate-600 dark:text-slate-400">Loading map...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (loadError) {
    return (
      <div className="border border-red-200 dark:border-red-800 rounded-lg p-8 bg-red-50 dark:bg-red-900/20">
        <div className="text-red-600 dark:text-red-400 text-center">
          <span className="text-2xl mb-2 block">⚠️</span>
          <p className="font-medium">Failed to load Google Maps</p>
          <p className="text-sm mt-1 text-red-500">Please check your API key or try again later</p>
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
      >
        {markers.map((marker, idx) => (
          <Marker 
            key={marker.id || `marker-${idx}`}
            position={{ lat: marker.lat, lng: marker.lng }} 
            title={marker.title || `Location ${idx + 1}`}
            onClick={() => handleMarkerClick(marker, idx)}
            animation={window.google?.maps?.Animation?.DROP}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapSection;

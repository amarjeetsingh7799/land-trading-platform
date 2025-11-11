import React from 'react';
import { useNavigate } from 'react-router-dom';

const cities = [
  { 
    name: 'Delhi / NCR', 
    count: '241,000+', 
    img: 'https://pplx-res.cloudinary.com/image/upload/v1762588817/pplx_project_search_images/f8bc3905801e34f26da63b46a1a41fe53ed9b93b.png' 
  },
  { 
    name: 'Mumbai', 
    count: '70,000+', 
    img: 'https://pplx-res.cloudinary.com/image/upload/v1762588812/pplx_project_search_images/733cfcc209fe7ce72ed6907a917608bd14f74937.png' 
  },
  { 
    name: 'Bangalore', 
    count: '73,000+', 
    img: 'https://pplx-res.cloudinary.com/image/upload/v1758187497/pplx_project_search_images/7a1d6306eded34bd65a8d875eece9f87f0d4e85e.png' 
  },
  { 
    name: 'Hyderabad', 
    count: '36,000+', 
    img: 'https://pplx-res.cloudinary.com/image/upload/v1754744680/pplx_project_search_images/e6c1b2ff34d2abf1c20ebc566ce3766197bc3e52.png' 
  },
  { 
    name: 'Pune', 
    count: '63,000+', 
    img: 'https://pplx-res.cloudinary.com/image/upload/v1754851170/pplx_project_search_images/b7b339ca4715cc718f731b3f76ebeda647e63ffd.png' 
  },
  { 
    name: 'Kolkata', 
    count: '42,000+', 
    img: 'https://pplx-res.cloudinary.com/image/upload/v1762588812/pplx_project_search_images/439fad59e5cc24b9db348926c0937d76a1ae69b7.png' 
  },
  { 
    name: 'Chennai', 
    count: '46,000+', 
    img: 'https://i0.wp.com/urbanacres.in/wp-content/uploads/2025/04/825478-beach.webp' 
  },
  { 
    name: 'Ahmedabad', 
    count: '32,000+', 
    img: 'https://pplx-res.cloudinary.com/image/upload/v1762588812/pplx_project_search_images/ccf55f09dfb6d7ff9abb1ad6bfe2b296d3be115f.png' 
  }
];

export default function PopularCities() {
  const navigate = useNavigate();

  const handleCityClick = (cityName) => {
    // Extract city name and handle special cases
    let cityQuery = cityName.split(' ')[0]; // Get first word
    let state = '';
    
    // Map cities to their states for better filtering
    const cityStateMap = {
      'Delhi': 'Delhi',
      'Mumbai': 'Maharashtra',
      'Bangalore': 'Karnataka',
      'Hyderabad': 'Telangana',
      'Pune': 'Maharashtra',
      'Kolkata': 'West Bengal',
      'Chennai': 'Tamil Nadu',
      'Ahmedabad': 'Gujarat'
    };
    
    state = cityStateMap[cityQuery] || '';
    
    // Navigate with both city and state parameters for accurate filtering
    if (state) {
      navigate(`/properties?q=${encodeURIComponent(cityQuery)}&state=${encodeURIComponent(state)}`);
    } else {
      navigate(`/properties?q=${encodeURIComponent(cityQuery)}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Explore Real Estate in Popular Indian Cities</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cities.map(c => (
          <div 
            key={c.name} 
            onClick={() => handleCityClick(c.name)}
            className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer hover:shadow-lg transition"
          >
            <img src={c.img} alt={c.name} className="h-40 w-full object-cover group-hover:scale-105 transition" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-2 left-3 text-white drop-shadow">
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm opacity-90">{c.count} Properties</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

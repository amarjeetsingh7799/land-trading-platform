import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSearchTabs() {
  const tabs = [
    { key: 'buy', label: 'Buy' },
    { key: 'rent', label: 'Rent' },
    { key: 'new', label: 'New Launch' },
    { key: 'commercial', label: 'Commercial' },
    { key: 'plots', label: 'Plot Property' },
  ];
  const [active, setActive] = useState('buy');
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const [budget, setBudget] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const suggestions = [
  // India - Major Cities
  'Delhi, India',
  'Mumbai, India',
  'Bengaluru, India',
  'Bangalore, India',
  'Hyderabad, India',
  'Pune, India',
  'Kolkata, India',
  'Chennai, India',
  'Ahmedabad, India',
  'Surat, India',
  'Jaipur, India',
  'Lucknow, India',
  'Kanpur, India',
  'Nagpur, India',
  'Indore, India',
  'Thane, India',
  'Bhopal, India',
  'Visakhapatnam, India',
  'Pimpri-Chinchwad, India',
  'Patna, India',
  'Vadodara, India',
  'Ghaziabad, India',
  'Ludhiana, India',
  'Agra, India',
  'Nashik, India',
  'Faridabad, India',
  'Meerut, India',
  'Rajkot, India',
  'Kalyan-Dombivali, India',
  'Vasai-Virar, India',
  'Varanasi, India',
  'Srinagar, India',
  'Aurangabad, India',
  'Dhanbad, India',
  'Amritsar, India',
  'Navi Mumbai, India',
  'Allahabad, India',
  'Ranchi, India',
  'Howrah, India',
  'Coimbatore, India',
  'Jabalpur, India',
  'Gwalior, India',
  'Vijayawada, India',
  'Jodhpur, India',
  'Madurai, India',
  'Raipur, India',
  'Kota, India',
  'Chandigarh, India',
  'Guwahati, India',
  
  // USA
  'New York, USA',
  'Los Angeles, USA',
  'Chicago, USA',
  'Houston, USA',
  'Phoenix, USA',
  'Philadelphia, USA',
  'San Antonio, USA',
  'San Diego, USA',
  'Dallas, USA',
  'San Jose, USA',
  'Austin, USA',
  'Jacksonville, USA',
  'Fort Worth, USA',
  'Columbus, USA',
  'San Francisco, USA',
  'Charlotte, USA',
  'Indianapolis, USA',
  'Seattle, USA',
  'Denver, USA',
  'Boston, USA',
  'Miami, USA',
  'Las Vegas, USA',
  'Portland, USA',
  'Nashville, USA',
  
  // UK
  'London, UK',
  'Birmingham, UK',
  'Manchester, UK',
  'Leeds, UK',
  'Glasgow, UK',
  'Liverpool, UK',
  'Newcastle, UK',
  'Sheffield, UK',
  'Bristol, UK',
  'Edinburgh, UK',
  
  // UAE
  'Dubai, UAE',
  'Abu Dhabi, UAE',
  'Sharjah, UAE',
  'Ajman, UAE',
  
  // Other Major Cities
  'Singapore',
  'Hong Kong',
  'Tokyo, Japan',
  'Sydney, Australia',
  'Melbourne, Australia',
  'Toronto, Canada',
  'Vancouver, Canada',
  'Paris, France',
  'Berlin, Germany',
  'Amsterdam, Netherlands',
  'Barcelona, Spain',
  'Madrid, Spain',
  'Rome, Italy',
  'Milan, Italy',
  'Bangkok, Thailand',
  'Kuala Lumpur, Malaysia',
  'Jakarta, Indonesia',
  'Seoul, South Korea',
  'Shanghai, China',
  'Beijing, China'
];

  const visibleSuggs = q.length >= 2 ? suggestions.filter(s => s.toLowerCase().includes(q.toLowerCase())).slice(0,6) : [];

  // Hide suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    // Extract just the city name before any comma
    const cityName = q.split(',')[0].trim();
    const params = new URLSearchParams({ 
      city: cityName,
      category: active, 
      type, 
      budget 
    });
    navigate(`/properties?${params.toString()}`);
  };
  const handleSuggestionClick = (suggestion) => {
    setQ(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="inline-flex rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-sm overflow-hidden">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-4 md:px-6 py-2 text-sm font-medium transition ${active === t.key ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-700 dark:text-slate-200'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <form onSubmit={onSearch} className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 relative">
        <div className="col-span-2 md:col-span-2 relative" ref={wrapperRef}>
          <input
            type="text"
            placeholder="Search by city, locality or project — e.g., Delhi, India"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            autoComplete="off"
          />
          {showSuggestions && visibleSuggs.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow z-10">
              {visibleSuggs.map(s => (
                <button 
                  type="button" 
                  key={s} 
                  onClick={() => handleSuggestionClick(s)} 
                  className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
        >
          <option value="">All Types</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="agricultural">Agricultural</option>
          <option value="industrial">Industrial</option>
        </select>
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
        >
          <option value="">Any Budget</option>
          <option value="0-25L">Up to 25L</option>
          <option value="25L-50L">25L - 50L</option>
          <option value="50L-1Cr">50L - 1Cr</option>
          <option value="1Cr+">1Cr+</option>
        </select>
        <button type="submit" className="md:col-span-1 px-4 py-3 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium">Search</button>
      </form>
    </div>
  );
}

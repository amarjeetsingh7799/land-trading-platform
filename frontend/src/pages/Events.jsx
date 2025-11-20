import React, { useState } from 'react';

export default function Events() {
  const [filter, setFilter] = useState('all');
  
  const events = [
    { 
      id: 1,
      title: 'Real Estate Investment Summit 2025', 
      date: 'March 15, 2025', 
      time: '9:00 AM - 5:00 PM',
      location: 'New York, USA', 
      type: 'conference',
      description: 'Global gathering of top investors and property experts. Learn investment strategies, market trends, and network with industry leaders.',
      attendees: 500,
      image: '📊'
    },
    { 
      id: 2,
      title: 'Land Development Workshop', 
      date: 'April 10, 2025', 
      time: '2:00 PM - 6:00 PM',
      location: 'Dubai, UAE', 
      type: 'workshop',
      description: 'Intensive workshop on modern land development practices. Covers zoning laws, financing, and project management.',
      attendees: 150,
      image: '🏗️'
    },
    { 
      id: 3,
      title: 'Investor Networking Night', 
      date: 'May 5, 2025', 
      time: '6:00 PM - 9:00 PM',
      location: 'London, UK', 
      type: 'networking',
      description: 'Exclusive networking event for accredited investors. Connect with developers, brokers, and fellow investors.',
      attendees: 200,
      image: '🤝'
    },
    { 
      id: 4,
      title: 'Property Tech Innovation Day', 
      date: 'June 20, 2025', 
      time: '10:00 AM - 4:00 PM',
      location: 'San Francisco, USA', 
      type: 'tech',
      description: 'Discover cutting-edge technologies transforming real estate. Demonstrations, keynotes, and panel discussions.',
      attendees: 300,
      image: '💻'
    },
    { 
      id: 5,
      title: 'Commercial Real Estate Roundtable', 
      date: 'July 8, 2025', 
      time: '1:00 PM - 5:00 PM',
      location: 'Toronto, Canada', 
      type: 'conference',
      description: 'Expert discussion on commercial property investment opportunities and market analysis.',
      attendees: 100,
      image: '🏢'
    },
    { 
      id: 6,
      title: 'Digital Marketing for Real Estate', 
      date: 'August 12, 2025', 
      time: '11:00 AM - 3:00 PM',
      location: 'Singapore', 
      type: 'workshop',
      description: 'Learn proven digital marketing strategies to attract buyers and investors for your properties.',
      attendees: 120,
      image: '📱'
    }
  ];

  const filtered = filter === 'all' ? events : events.filter(e => e.type === filter);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-950 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-xl text-slate-300">Join industry leaders and expand your network</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {['all', 'conference', 'workshop', 'networking', 'tech'].map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                filter === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((e) => (
            <div key={e.id} className="bg-white dark:bg-slate-900 rounded-lg shadow-md hover:shadow-lg transition border border-slate-200 dark:border-slate-800 overflow-hidden">
              {/* Event Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="text-4xl mb-3">{e.image}</div>
                <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {e.type.charAt(0).toUpperCase() + e.type.slice(1)}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{e.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{e.description}</p>

                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span className="font-medium">{e.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⏰</span>
                    <span>{e.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{e.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👥</span>
                    <span>Expected: {e.attendees}+ attendees</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                    Register
                  </button>
                  <button className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-blue-50 dark:bg-slate-800 rounded-lg p-8 text-center border border-blue-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Never Miss an Event</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Subscribe to our newsletter for exclusive event updates and early bird discounts.</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


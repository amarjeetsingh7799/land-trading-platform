import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CommercialSpaces() {
  const navigate = useNavigate();

  const handleBuyCommercial = () => {
    navigate('/properties?category=buy&type=commercial');
  };

  const handleLeaseCommercial = () => {
    navigate('/properties?category=rent&type=commercial');
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row gap-4 items-center">
          <img alt="Buy Commercial" className="w-full md:w-48 h-28 object-cover rounded-lg" src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">BUY FOR COMMERCIAL USE</h3>
            <p className="text-slate-600 dark:text-slate-400">Explore Office, Co-working, Retail, Land, and Factory assets in prime business districts.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button 
                onClick={handleBuyCommercial}
                className="px-4 py-2 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition cursor-pointer"
              >
                Buy Commercial
              </button>
              <Link 
                to="/properties?category=buy&type=commercial" 
                className="px-4 py-2 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition cursor-pointer"
              >
                Explore Buying Commercial
              </Link>
              <Link 
                to="/properties?type=office&category=buy" 
                className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Office Spaces
              </Link>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row gap-4 items-center">
          <img alt="Lease Commercial" className="w-full md:w-48 h-28 object-cover rounded-lg" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">LEASE FOR COMMERCIAL USE</h3>
            <p className="text-slate-600 dark:text-slate-400">Find flexible leases across offices, co-working, retail shops, industrial units and more.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button 
                onClick={handleLeaseCommercial}
                className="px-4 py-2 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition cursor-pointer"
              >
                Lease Commercial
              </button>
              <Link 
                to="/properties?category=rent&type=commercial" 
                className="px-4 py-2 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition cursor-pointer"
              >
                Explore Leasing Commercial
              </Link>
              <Link 
                to="/properties?type=industrial&category=rent" 
                className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Industrial / Factory
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-400 mr-2">Quick categories:</span>
          <Link 
            to="/properties?type=office&category=buy" 
            className="px-3 py-1.5 text-sm rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer text-slate-700 dark:text-slate-200"
          >
            Office
          </Link>
          <Link 
            to="/properties?type=office&category=rent" 
            className="px-3 py-1.5 text-sm rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer text-slate-700 dark:text-slate-200"
          >
            Co-working
          </Link>
          <Link 
            to="/properties?type=commercial" 
            className="px-3 py-1.5 text-sm rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer text-slate-700 dark:text-slate-200"
          >
            Retail
          </Link>
          <Link 
            to="/properties?category=buy&type=agricultural" 
            className="px-3 py-1.5 text-sm rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer text-slate-700 dark:text-slate-200"
          >
            Commercial Land
          </Link>
          <Link 
            to="/properties?type=industrial" 
            className="px-3 py-1.5 text-sm rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer text-slate-700 dark:text-slate-200"
          >
            Factory
          </Link>
        </div>
      </div>
    </div>
  );
}


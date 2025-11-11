import React from 'react';
import { Link } from 'react-router-dom';

const cards = [
  {
    key: 'plot',
    title: 'Plot / Land',
    img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop',
    to: '/properties?type=agricultural'
  },
  {
    key: 'flat',
    title: 'Flats / Apartments',
    img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop',
    to: '/properties?type=residential'
  },
  {
    key: 'ready',
    title: 'Ready to Move',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    to: '/properties?type=residential'
  },
  {
    key: 'rentals',
    title: 'Rentals',
    img: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop',
    to: '/properties?category=rent'
  }
];

export default function TypesStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map(c => (
        <Link 
          key={c.key} 
          to={c.to} 
          className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer hover:shadow-lg transition"
        >
          <img src={c.img} alt={c.title} className="h-36 md:h-44 w-full object-cover group-hover:scale-105 transition" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-3 text-white font-semibold drop-shadow">{c.title}</div>
        </Link>
      ))}
    </div>
  );
}

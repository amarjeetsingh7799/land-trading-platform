import React, { useEffect, useMemo, useRef, useState } from 'react';

const slides = [
  { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop', alt: 'Hillside plots at sunrise' },
  { src: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d51?q=80&w=1600&auto=format&fit=crop', alt: 'Modern apartments skyline' },
  { src: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?q=80&w=1600&auto=format&fit=crop', alt: 'Commercial towers' },
  { src: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1600&auto=format&fit=crop', alt: 'Coastal city view' },
];

export default function HeroCarousel({ intervalMs = 4000 }) {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);
  const count = useMemo(() => slides.length, []);

  useEffect(() => {
    timer.current = setInterval(() => setIdx((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(timer.current);
  }, [count, intervalMs]);

  return (
    <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          className={`w-full h-80 md:h-[24rem] object-cover absolute inset-0 transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} aria-label={`Slide ${i+1}`} onClick={() => setIdx(i)} className={`h-2.5 w-2.5 rounded-full ${i===idx?'bg-white':'bg-white/50'} ring-1 ring-black/10`} />
        ))}
      </div>
    </div>
  );
}

import { useRef } from 'react';
import type { ReactNode } from 'react';

export default function Carousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (step: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const dir = getComputedStyle(el).direction === 'rtl' ? -1 : 1;
    el.scrollBy({ left: step * dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className="carousel-wrap">
      <button type="button" className="carousel-arrow carousel-prev" aria-label="قبلی" onClick={() => scroll(-1)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
      </button>
      <div className="carousel" ref={trackRef} tabIndex={0}>{children}</div>
      <button type="button" className="carousel-arrow carousel-next" aria-label="بعدی" onClick={() => scroll(1)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
      </button>
    </div>
  );
}

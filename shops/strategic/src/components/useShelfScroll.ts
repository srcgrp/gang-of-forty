import { useEffect, useRef, useState } from 'react';

export default function useShelfScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const rail = ref.current;
    if (!rail) return;
    function measure() {
      if (!rail) return;
      const offset = Math.abs(rail.scrollLeft);
      const start = offset <= 1;
      const end = offset >= rail.scrollWidth - rail.clientWidth - 1;
      setEdges(previous => previous.start === start && previous.end === end ? previous : { start, end });
    }
    const resize = new ResizeObserver(measure);
    resize.observe(rail);
    rail.addEventListener('scroll', measure, { passive: true });
    return () => {
      resize.disconnect();
      rail.removeEventListener('scroll', measure);
    };
  }, []);

  function move(direction: number) {
    const rail = ref.current;
    const card = rail?.querySelector('.card');
    if (!rail || !card?.parentElement) return;
    const gap = parseFloat(getComputedStyle(card.parentElement).columnGap) || 0;
    const distance = card.getBoundingClientRect().width + gap;
    rail.scrollBy({ left: direction * distance * (getComputedStyle(rail).direction === 'rtl' ? -1 : 1) });
  }
  return { ref, edges, move };
}

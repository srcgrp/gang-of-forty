import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { revealCards } from "../../lib/animations/animation.ts";

export default function Carousel({ children }: { children: ReactNode }) {
  const viewport = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [offset, setOffset] = useState(0);
  const [max, setMax] = useState(0);

  useEffect(() => (list.current ? revealCards(list.current) : undefined), []);

  useEffect(() => {
    const ul = list.current;
    const vp = viewport.current;
    if (!ul || !vp) return;
    const observer = new ResizeObserver(() => {
      const next = Math.max(0, ul.scrollWidth - vp.clientWidth);
      setMax(next);
      setOffset((prev) => Math.min(prev, next));
    });
    observer.observe(vp);
    observer.observe(ul);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (list.current) {
      gsap.to(list.current, {
        x: offset,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, [offset]);

  function move(direction: -1 | 1) {
    const card = list.current?.querySelector<HTMLElement>(".product-item");
    if (!list.current || !card) return;
    const styles = getComputedStyle(list.current);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const step = card.getBoundingClientRect().width + gap;
    setOffset((prev) => Math.max(0, Math.min(max, prev + direction * step)));
  }

  return (
    <div className="dairy-carousel" style={{ direction: "rtl" }}>
      <div
        className="dairy-carousel-viewport"
        ref={viewport}
        style={{ direction: "rtl" }}
      >
        <ul className="products" ref={list} style={{ direction: "rtl" }}>
          {children}
        </ul>
      </div>
      <div className="dairy-carousel-controls">
        <button
          className="dairy-prev-button"
          type="button"
          title="محصول قبلی"
          disabled={offset <= 0}
          onClick={() => move(-1)}
        >
          →
        </button>
        <button
          className="dairy-next-button"
          type="button"
          title="محصول بعدی"
          disabled={offset >= max - 1}
          onClick={() => move(1)}
        >
          ←
        </button>
      </div>
    </div>
  );
}

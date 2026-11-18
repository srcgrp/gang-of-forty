import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { gsap } from "gsap";
import { revealCards } from "../../lib/animations/animation.ts";

type Direction = -1 | 1;

const CARD_SELECTOR = ".product-item";
const SLIDE_DURATION_S = 0.2;
const END_TOLERANCE_PX = 1;
const RTL: CSSProperties = { direction: "rtl" };

function cardStep(list: HTMLUListElement): number | null {
  const card = list.querySelector<HTMLElement>(CARD_SELECTOR);
  if (!card) return null;

  const styles = getComputedStyle(list);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
  return card.getBoundingClientRect().width + gap;
}

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
    if (!list.current) return;
    gsap.to(list.current, {
      x: offset,
      duration: SLIDE_DURATION_S,
      ease: "power2.out",
      overwrite: true,
    });
  }, [offset]);

  function move(direction: Direction) {
    const step = list.current ? cardStep(list.current) : null;
    if (step === null) return;
    setOffset((prev) => Math.max(0, Math.min(max, prev + direction * step)));
  }

  return (
    <div className="dairy-carousel" style={RTL}>
      <div className="dairy-carousel-viewport" ref={viewport} style={RTL}>
        <ul className="products" ref={list} style={RTL}>
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
          disabled={offset >= max - END_TOLERANCE_PX}
          onClick={() => move(1)}
        >
          ←
        </button>
      </div>
    </div>
  );
}

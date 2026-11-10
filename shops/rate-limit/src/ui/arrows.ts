import { el } from "./dom";
import { CHEVRON_NEXT, CHEVRON_PREV } from "./icons";

export function createArrow(kind: "prev" | "next"): HTMLButtonElement {
  const btn = el("button", `carousel-arrow carousel-${kind}`);
  btn.type = "button";
  btn.setAttribute("aria-label", kind === "prev" ? "قبلی" : "بعدی");
  btn.innerHTML = kind === "prev" ? CHEVRON_PREV : CHEVRON_NEXT;
  return btn;
}

export function setupArrows(wrap: HTMLElement): void {
  const track = wrap.querySelector<HTMLElement>(".carousel");
  const prev = wrap.querySelector<HTMLButtonElement>(".carousel-prev");
  const next = wrap.querySelector<HTMLButtonElement>(".carousel-next");
  if (!track || !prev || !next) return;

  const step = (): number => track.clientWidth * 0.8;
  const dir = (): number => (getComputedStyle(track).direction === "rtl" ? -1 : 1);

  prev.addEventListener("click", () =>
    track.scrollBy({ left: -dir() * step(), behavior: "smooth" })
  );
  next.addEventListener("click", () =>
    track.scrollBy({ left: dir() * step(), behavior: "smooth" })
  );

  const update = (): void => {
    const max = track.scrollWidth - track.clientWidth;
    const pos = Math.abs(track.scrollLeft);
    prev.disabled = pos <= 2;
    next.disabled = pos >= max - 2;
  };

  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

export function setupSpecialArrows(): void {
  const wrap = document.querySelector<HTMLElement>(".special-offer .carousel-wrap");
  if (wrap) setupArrows(wrap);
}

export function resetCarousel(track: HTMLElement): void {
  track.scrollTo({ left: 0 });
  track.dispatchEvent(new Event("scroll"));
}

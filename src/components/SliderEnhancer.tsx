import { useEffect } from "react";

interface SwiperLike {
  params: {
    loop?: boolean;
    slidesPerGroup?: number;
    freeMode?: boolean | { enabled?: boolean };
  };
  slides: HTMLElement[];
  snapGrid: number[];
  realIndex: number;
  snapIndex: number;
  progress: number;
  isLocked: boolean;
  isBeginning: boolean;
  isEnd: boolean;
  destroyed: boolean;
  on(event: string, cb: () => void): void;
  off(event: string, cb: () => void): void;
  slideTo(index: number, speed?: number): void;
  slideToLoop(index: number, speed?: number): void;
  slideNext(speed?: number): void;
  slidePrev(speed?: number): void;
}

interface SwiperHost extends HTMLElement {
  swiper?: SwiperLike;
}

interface Controller {
  sw: SwiperLike;
  destroy(fromSwiper?: boolean): void;
}

interface DockState {
  count: number;
  active: number;
  locked: boolean | null;
  canPrev: boolean | null;
  canNext: boolean | null;
}

const SELECTOR = ".category-slider, .fancy-slider, .special-slider";
const MAX_DOTS = 7;
const SPEED = 450;
const EVENTS = [
  "setTranslate",
  "update",
  "resize",
  "breakpoint",
  "snapGridLengthChange",
  "slidesLengthChange",
  "lock",
  "unlock",
] as const;

const ARROW_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" ' +
  'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
  '<path class="sl-ic-shaft" pathLength="1" d="M5.5 12H17.5"/>' +
  '<path class="sl-ic-head" d="M12.5 6.5L18 12l-5.5 5.5"/></svg>';

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

function createEl<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  cls?: string,
  attrs?: Record<string, string>,
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v);
    }
  }
  return el;
}

function computeWindow(count: number, active: number) {
  const n = Math.min(count, MAX_DOTS);
  const start = clamp(active - ((MAX_DOTS - 1) >> 1), 0, count - n);
  return { n, start, end: start + n - 1 };
}

function computeTier(
  i: number,
  count: number,
  w: { start: number; end: number },
): number {
  let t = 0;
  if (w.start > 0)
    t = Math.max(t, i === w.start ? 2 : i === w.start + 1 ? 1 : 0);
  if (w.end < count - 1)
    t = Math.max(t, i === w.end ? 2 : i === w.end - 1 ? 1 : 0);
  return t;
}

export function SliderEnhancer() {
  useEffect(() => {
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const nf = new Intl.NumberFormat("fa-IR");
    const TXT = {
      group: "کنترل اسلایدر",
      prev: "قبلی",
      next: "بعدی",
      dots: "صفحه‌های اسلایدر",
      goto: (i: number, n: number) =>
        `رفتن به صفحه ${nf.format(i)} از ${nf.format(n)}`,
    };

    const controllers = new WeakMap<Element, Controller>();

    const create = (root: HTMLElement, sw: SwiperLike): Controller => {
      const dir = getComputedStyle(root).direction === "rtl" ? "rtl" : "ltr";

      const dock = createEl("div", "sl-dock", {
        role: "group",
        "aria-label": TXT.group,
        hidden: "",
      });
      const prev = createEl("button", "sl-btn sl-btn--prev", {
        type: "button",
        "aria-label": TXT.prev,
      });
      const next = createEl("button", "sl-btn sl-btn--next", {
        type: "button",
        "aria-label": TXT.next,
      });
      const dots = createEl("div", "sl-dots", {
        role: "group",
        "aria-label": TXT.dots,
      });
      const track = createEl("div", "sl-dots__track");
      prev.innerHTML = ARROW_SVG;
      next.innerHTML = ARROW_SVG;
      dots.append(track);
      dock.append(prev, dots, next);
      dock.dataset.slDir = dir;
      root.dataset.slDir = dir;
      root.classList.add("sl-js");
      root.after(dock);

      let dotEls: HTMLButtonElement[] = [];
      let cur: DockState = {
        count: -1,
        active: -1,
        locked: null,
        canPrev: null,
        canNext: null,
      };
      let raf = 0;
      let ready = false;
      let io: IntersectionObserver | null = null;
      let touched = false;

      const markTouched = () => {
        touched = true;
      };

      const speed = () => (reduceMotion.matches ? 0 : SPEED);
      const groupSize = () => {
        const g = sw.params.slidesPerGroup;
        return typeof g === "number" && g > 0 ? g : 1;
      };
      const go = (i: number) =>
        sw.params.loop
          ? sw.slideToLoop(i, speed())
          : sw.slideTo(i * groupSize(), speed());

      const read = () => {
        const loop = !!sw.params.loop;
        let count: number;
        let active: number;
        if (loop) {
          count = sw.slides.filter(
            (s) => !s.classList.contains("swiper-slide-duplicate"),
          ).length;
          active = sw.realIndex;
        } else {
          count = sw.snapGrid.length;
          const fm = sw.params.freeMode;
          active =
            fm && (fm === true || fm.enabled)
              ? Math.round(clamp(sw.progress, 0, 1) * (count - 1))
              : sw.snapIndex;
        }
        active = clamp(active | 0, 0, Math.max(0, count - 1));
        return {
          count,
          active,
          locked: count < 2 || (!loop && !!sw.isLocked),
          canPrev: loop || !sw.isBeginning,
          canNext: loop || !sw.isEnd,
        };
      };

      const buildDots = (count: number) => {
        const frag = document.createDocumentFragment();
        dotEls = [];
        for (let i = 0; i < count; i++) {
          const d = createEl("button", "sl-dot", {
            type: "button",
            "aria-label": TXT.goto(i + 1, count),
          });
          d.dataset.i = String(i);
          d.append(document.createElement("i"));
          dotEls.push(d);
          frag.append(d);
        }
        track.replaceChildren(frag);
      };

      const paintDots = (active: number, count: number) => {
        const w = computeWindow(count, active);
        dots.style.setProperty("--sl-n", String(w.n));
        track.style.setProperty("--sl-shift", String(w.start));
        for (let i = 0; i < dotEls.length; i++) {
          const d = dotEls[i];
          if (!d) continue;
          const inView = i >= w.start && i <= w.end;
          const tier = String(inView ? computeTier(i, count, w) : 2);
          if (d.dataset.tier !== tier) d.dataset.tier = tier;
          if (i === active) d.setAttribute("aria-current", "true");
          else d.removeAttribute("aria-current");
          d.tabIndex = inView ? 0 : -1;
          if (inView) d.removeAttribute("aria-hidden");
          else d.setAttribute("aria-hidden", "true");
        }
      };

      const setEnabled = (btn: HTMLButtonElement, on: boolean) =>
        btn.setAttribute("aria-disabled", on ? "false" : "true");

      const paint = () => {
        raf = 0;
        if (sw.destroyed) return;
        const s = read();
        const countChanged = s.count !== cur.count;
        if (countChanged) buildDots(s.count);
        if (countChanged || s.active !== cur.active)
          paintDots(s.active, s.count);
        if (s.locked !== cur.locked) dock.hidden = s.locked;

        const canPrev = s.canPrev && !s.locked;
        const canNext = s.canNext && !s.locked;
        if (canPrev !== cur.canPrev) {
          setEnabled(prev, canPrev);
          root.classList.toggle("sl-can-prev", canPrev);
        }
        if (canNext !== cur.canNext) {
          setEnabled(next, canNext);
          root.classList.toggle("sl-can-next", canNext);
        }
        cur = {
          count: s.count,
          active: s.active,
          locked: s.locked,
          canPrev,
          canNext,
        };

        if (!ready) {
          ready = true;
          requestAnimationFrame(() => track.classList.add("is-ready"));
        }
      };
      const schedule = () => {
        if (!raf) raf = requestAnimationFrame(paint);
      };

      dock.addEventListener("click", (e) => {
        if (!(e.target instanceof Element)) return;
        const btn = e.target.closest<HTMLButtonElement>(".sl-btn, .sl-dot");
        if (!btn || !dock.contains(btn)) return;
        if (btn.classList.contains("sl-dot")) {
          const idx = Number(btn.dataset.i);
          if (Number.isFinite(idx)) go(idx);
          return;
        }
        if (btn.getAttribute("aria-disabled") === "true") return;
        if (btn === prev) sw.slidePrev(speed());
        else sw.slideNext(speed());
      });

      EVENTS.forEach((ev) => sw.on(ev, schedule));
      sw.on("touchStart", markTouched);

      if (!reduceMotion.matches && "IntersectionObserver" in window) {
        io = new IntersectionObserver(
          (entries) => {
            if (!entries[0]?.isIntersecting) return;
            io?.disconnect();
            io = null;
            if (touched || cur.locked || sw.progress > 0.02) return;
            const wrapper = root.querySelector(".swiper-wrapper");
            if (!wrapper) return;
            root.classList.add("sl-hint");
            wrapper.addEventListener(
              "animationend",
              () => root.classList.remove("sl-hint"),
              { once: true },
            );
          },
          { threshold: 0.6 },
        );
        io.observe(root);
      }

      const onSwiperDestroy = () => ctl.destroy(true);

      const ctl: Controller = {
        sw,
        destroy(fromSwiper?: boolean) {
          cancelAnimationFrame(raf);
          if (io) io.disconnect();
          io = null;
          if (!fromSwiper) {
            EVENTS.forEach((ev) => sw.off(ev, schedule));
            sw.off("touchStart", markTouched);
            sw.off("destroy", onSwiperDestroy);
          }
          dock.remove();
          root.classList.remove(
            "sl-js",
            "sl-can-prev",
            "sl-can-next",
            "sl-hint",
          );
          delete root.dataset.slDir;
          if (controllers.get(root) === ctl) controllers.delete(root);
        },
      };
      sw.on("destroy", onSwiperDestroy);

      schedule();
      return ctl;
    };

    const enhance = (root: HTMLElement): boolean => {
      const candidate = root as SwiperHost;
      const nested = root.querySelector<HTMLElement>(".swiper");
      const host: SwiperHost | null = candidate.swiper
        ? candidate
        : (nested as SwiperHost | null);
      const sw = host?.swiper;
      if (!sw || sw.destroyed) return false;
      const existing = controllers.get(root);
      if (existing && existing.sw === sw) return true;
      if (existing) existing.destroy();
      const ctl = create(root, sw);
      controllers.set(root, ctl);
      return true;
    };

    let timer = 0;
    let tries = 0;

    const scan = () => {
      clearTimeout(timer);
      let pending = 0;
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((r) => {
        if (!enhance(r)) pending++;
      });
      if (!pending) tries = 0;
      else if (tries++ < 20) timer = window.setTimeout(scan, 300);
    };

    const relevant = (muts: MutationRecord[]): boolean =>
      muts.some((m) => {
        if (m.target instanceof Element && m.target.closest(SELECTOR))
          return true;
        for (const n of Array.from(m.addedNodes)) {
          if (n instanceof Element) {
            if (n.matches(SELECTOR) || n.querySelector(SELECTOR)) return true;
          }
        }
        return false;
      });

    const observer = new MutationObserver((muts) => {
      if (!relevant(muts)) return;
      tries = 0;
      clearTimeout(timer);
      timer = window.setTimeout(scan, 150);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const onLoad = () => scan();
    window.addEventListener("load", onLoad);

    const onReady = () => scan();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", onReady);
    } else {
      scan();
    }

    return () => {
      window.removeEventListener("load", onLoad);
      document.removeEventListener("DOMContentLoaded", onReady);
      observer.disconnect();
      clearTimeout(timer);
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((r) => {
        const ctl = controllers.get(r);
        if (ctl) ctl.destroy();
      });
    };
  }, []);

  return null;
}

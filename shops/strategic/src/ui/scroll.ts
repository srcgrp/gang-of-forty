/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { reducedMotion } from './dom';
let scrollFrame = 0;
const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2);

export function smoothScrollTo(top: number): Promise<void> {
  cancelAnimationFrame(scrollFrame);
  const from = window.scrollY;
  const to = Math.max(0, Math.min(top, document.documentElement.scrollHeight - window.innerHeight));
  const distance = to - from;

  if (reducedMotion.matches || Math.abs(distance) < 2) {
    window.scrollTo({ top: to, behavior: 'instant' });
    return Promise.resolve();
  }

  const duration = Math.min(1000, Math.max(500, Math.abs(distance) * 0.4));
  const stopEvents = ['wheel', 'touchstart', 'keydown', 'mousedown'];

  return new Promise<void>((resolve) => {
    const stop = () => {
      cancelAnimationFrame(scrollFrame);
      stopEvents.forEach((name) => window.removeEventListener(name, stop));
      resolve();
    };
    stopEvents.forEach((name) => window.addEventListener(name, stop, { passive: true, once: true }));

    const startTime = performance.now();
    const step: FrameRequestCallback = (now: number): void => {
      const progress = Math.min(1, (now - startTime) / duration);
      window.scrollTo({ top: from + distance * easeInOutCubic(progress), behavior: 'instant' });
      if (progress < 1) scrollFrame = requestAnimationFrame(step);
      else stop();
    };
    scrollFrame = requestAnimationFrame(step);
  });
}

export function scrollToElement(target: HTMLElement): Promise<void> {
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const top = target.getBoundingClientRect().top + window.scrollY - margin;
  return smoothScrollTo(top).then(() => {
    if (!target.hasAttribute('tabindex') && !/^(a|button|input)$/i.test(target.tagName)) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
}
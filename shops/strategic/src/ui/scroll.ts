/* Amirhossein (Armin) Panahi */

import { reducedMotion } from './dom';

export function scrollToElement(target: HTMLElement): void {
  if (!target.hasAttribute('tabindex') && !target.matches('a, button, input')) {
    target.tabIndex = -1;
  }

  target.focus({ preventScroll: true });
  target.scrollIntoView({
    block: 'start',
    behavior: reducedMotion.matches ? 'instant' : 'smooth',
  });
}
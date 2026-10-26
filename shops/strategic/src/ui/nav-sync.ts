/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { dom } from './dom';
import { scrollToElement } from './scroll';

export function syncLocation(hashId: string, { scroll = false, smooth = false }: { scroll?: boolean; smooth?: boolean } = {}): void {
  const target = hashId ? document.getElementById(hashId) : null;

  dom.main.querySelectorAll<HTMLElement>('[data-here]').forEach((node) => node.removeAttribute('data-here'));
  if (target && target.matches('.shelf, #categories')) target.setAttribute('data-here', '');

  document.querySelectorAll<HTMLAnchorElement>('.main-nav a').forEach((link) => {
    if (hashId && link.getAttribute('href') === `#${hashId}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });

  if (!scroll || !target) return;
  if (smooth) scrollToElement(target);
  else target.scrollIntoView({ block: 'start', behavior: 'instant' });
}
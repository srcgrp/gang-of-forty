/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { dom, reducedMotion } from './dom';
const ENTER_FRAMES = [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }];
const ENTER_TIMING = { duration: 320, easing: 'cubic-bezier(.2, .7, .2, 1)' };

export function playEnter(): void {
  if (!reducedMotion.matches) dom.main.animate(ENTER_FRAMES, ENTER_TIMING);
}

export async function swapView(update: () => void): Promise<void> {
  if (reducedMotion.matches) {
    update();
    return;
  }
  const out = dom.main.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, easing: 'ease-in', fill: 'forwards' });
  try { await out.finished; } catch { /* Cancelled */ }
  update();
  out.cancel();
  playEnter();
}
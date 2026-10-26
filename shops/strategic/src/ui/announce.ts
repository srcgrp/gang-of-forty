/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { dom } from './dom';

let liveTimer: number | undefined;

export function announce(message: string): void {
  clearTimeout(liveTimer);
  dom.live.textContent = '';
  liveTimer = setTimeout(() => { dom.live.textContent = message; }, 60);
}
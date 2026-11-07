/* Amirhossein (Armin) Panahi */

import type { ClickRule } from '../types';

export function matchRule(rules: readonly ClickRule[], target: Element, event: MouseEvent): boolean {
  for (const [selector, handler] of rules) {
    const node = target.closest<HTMLElement>(selector);
    if (node) {
      handler(node, event);
      return true;
    }
  }
  return false;
}
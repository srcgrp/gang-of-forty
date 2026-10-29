/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

export type ClickHandler = (node: HTMLElement, event: MouseEvent) => void;
export type ClickRule = readonly [selector: string, handler: ClickHandler];

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
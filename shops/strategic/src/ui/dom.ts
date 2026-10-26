/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

export type View = { title: string | null; nodes: HTMLElement[] };
export const $ = <T extends Element>(selector: string, root: ParentNode = document): T | null => root.querySelector<T>(selector);

export function required<T extends Element>(selector: string, root: ParentNode = document): T {
  const node = root.querySelector<T>(selector);
  if (!node) throw new Error(`Missing required HTML element: ${selector}`);
  return node;
}

export const dom = {
  main: required<HTMLElement>('#main'),
  live: required<HTMLElement>('#live'),
  notice: required<HTMLElement>('#notice'),
  navList: required<HTMLUListElement>('#nav-list'),
  search: required<HTMLInputElement>('#q'),
  menuToggle: required<HTMLInputElement>('#menu-toggle'),
  cartWrap: required<HTMLElement>('#cart-wrap'),
  cartButton: required<HTMLButtonElement>('#cart-btn'),
  cartCount: required<HTMLElement>('#cart-count'),
  cartPanel: required<HTMLElement>('#cart-panel'),
  footer: {
    about: required<HTMLElement>('#foot-about'),
    contact: required<HTMLElement>('#foot-contact'),
    social: required<HTMLUListElement>('#foot-social'),
    copy: required<HTMLElement>('#foot-copy'),
    cats: required<HTMLUListElement>('#foot-cats'),
    help: required<HTMLUListElement>('#foot-help'),
    hours: required<HTMLUListElement>('#foot-hours'),
  },
};

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
export const coarsePointer = window.matchMedia('(pointer: coarse)');
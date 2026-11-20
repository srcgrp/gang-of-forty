/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { el } from './el';
export const IMG = './assets/images/';
const SVG_NS = 'http://www.w3.org/2000/svg';

export function icon(name: string, extraClass = ''): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', `icon ${extraClass}`.trim());
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const use = document.createElementNS(SVG_NS, 'use');
  use.setAttribute('href', `#i-${name}`);
  svg.append(use);
  return svg;
}

type ImageOptions = { alt?: string; width?: number; height?: number; className?: string; lazy?: boolean; priority?: boolean };

export function image(src: string, { alt = '', width, height, className, lazy = true, priority = false }: ImageOptions = {}): HTMLImageElement {
  return el('img', {
    class: className,
    src,
    alt,
    width,
    height,
    loading: lazy && !priority ? 'lazy' : null,
    fetchpriority: priority ? 'high' : null,
    decoding: 'async',
  });
}

export const placeholderPic = (): HTMLElement => el('span', { class: 'pic__empty' }, [icon('bag')]);
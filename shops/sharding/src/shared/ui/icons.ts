export type IconName = 'plus' | 'grid' | 'arrowRight' | 'arrowLeft' | 'arrowUp' | 'arrowForward' | 'warning' | 'empty';
const SVG_NS = 'http://www.w3.org/2000/svg';

export function createIcon(name: IconName, className = ''): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  if (className) svg.setAttribute('class', className);
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS(SVG_NS, 'use');
  use.setAttribute('href', `${import.meta.env.BASE_URL}icons.svg#${name}`);
  svg.append(use);
  return svg;
}
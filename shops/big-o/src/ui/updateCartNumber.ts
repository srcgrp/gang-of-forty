import { CountUp } from 'countup.js';
import { formatNumber } from './format';
import { getHtmlElement } from './getHtmlElement';

// Shows the cart count in the header with Persian digits.
// The counter animates from startNumber to endNumber (skipped if the user prefers reduced motion).
export function updateCartNumber(startNumber: number, endNumber: number): void {
  const counter: HTMLElement = getHtmlElement<HTMLElement>('.product-counter');
  const reduceMotion: boolean = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const countUp = new CountUp(counter, endNumber, {
    startVal: startNumber,
    duration: reduceMotion ? 0 : 0.5,
    formattingFn: (n: number) => formatNumber(n),
  });
  countUp.start();
}
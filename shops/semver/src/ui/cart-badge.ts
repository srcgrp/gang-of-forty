import type { CartLine } from '../types';
import { formatCount } from './format';

export const countCartItems = (lines: readonly CartLine[]): number => {
  return lines.reduce((sum, line) => sum + line.qty, 0);
};

export const renderCartBadge = (lines: readonly CartLine[]): void => {
  const badge = document.querySelector<HTMLElement>('#cart-count');
  if (!badge) {
    return;
  }

  const count = countCartItems(lines);

  badge.textContent = formatCount(count);
  badge.hidden = count === 0;

  const button = document.querySelector<HTMLElement>('#shopping-cart-button');
  if (button) {
    button.setAttribute(
      'aria-label',
      count === 0 ? 'سبد خرید خالی' : `سبد خرید، ${formatCount(count)} کالا`,
    );
  }
};

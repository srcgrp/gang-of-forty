import { formatNumber } from './format';

export const renderCartBadge = (quantity: number): void => {
  const count = formatNumber(quantity);
  const badge = document.querySelector<HTMLSpanElement>('.cart-badge');
  if (badge) badge.textContent = count;
  document.querySelector<HTMLSpanElement>('#cart-count')?.setAttribute('aria-label', `سبد خرید، ${count} کالا`);
};



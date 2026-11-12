import { priceFmt } from '../../../shared/ui/price-format';

export function updateCartBadge(count: number): void {
  const badge = document.getElementById('cart-badge');
  const status = document.getElementById('cart-status');
  if (badge) {
    badge.textContent = priceFmt.format(count);
    badge.hidden = count === 0;
  }
  if (status) {
    status.textContent = count === 0 ? 'سبد خرید خالی است' : `${priceFmt.format(count)} کالا در سبد خرید`;
  }
}
import { priceFmt } from '../../../shared/ui/price-format';

export function renderTotal(total: number): void {
  const el = document.getElementById('cart-total');
  if (!el) return;
  el.textContent = `${priceFmt.format(total)} تومان`;
}
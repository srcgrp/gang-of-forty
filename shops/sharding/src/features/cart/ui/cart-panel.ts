import type { CartRow } from '../../../shared/types';
import { h } from '../../../shared/ui/dom';
import { priceFmt } from '../../../shared/ui/price-format';

export function renderCart(rows: CartRow[], onRemove: (id: number) => void): void {
  const list = document.getElementById('cart-items');
  if (!list) return;

  if (rows.length === 0) {
    list.replaceChildren(h('li', { className: 'cart-row cart-row--empty', textContent: 'سبد خرید خالی است' }));
    return;
  }

  list.replaceChildren(...rows.map(r => {
    const btn = h('button', { className: 'cart-row__remove', textContent: '×' });
    btn.type = 'button';
    btn.setAttribute('aria-label', `حذف ${r.name}`);
    btn.addEventListener('click', () => onRemove(r.id));

    return h('li', { className: 'cart-row' },
      h('span', { className: 'cart-row__name', textContent: r.name }),
      h('span', { className: 'cart-row__qty', textContent: `${priceFmt.format(r.qty)} ×` }),
      h('span', { className: 'cart-row__total', textContent: priceFmt.format(r.lineTotal) }),
      btn,
    );
  }));
}
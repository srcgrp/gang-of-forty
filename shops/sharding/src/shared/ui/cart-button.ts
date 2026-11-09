import { h } from './dom';
import { createIcon } from './icons';
import { priceFmt } from './price-format';

export function mkBtn(className: string, label: string, action?: string, text?: string): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = className;
  if (action) btn.dataset.action = action;
  btn.setAttribute('aria-label', label);
  if (text !== undefined) btn.textContent = text;
  return btn;
}

export function renderCartButton(container: HTMLElement, id: string | number, name: string, qty: number, maxStock: number): void {
  container.replaceChildren();
  container.dataset.productId = String(id);
  container.dataset.productName = name;

  if (qty <= 0) {
    const addBtn = mkBtn('product__add', `افزودن ${name} به سبد خرید`, 'inc');
    addBtn.appendChild(createIcon('plus'));
    if (maxStock <= 0) addBtn.disabled = true; 
    container.appendChild(addBtn);
    return;
  }

  const qtyText = priceFmt.format(qty);
  const dec = mkBtn('product__qty-btn', `کم کردن ${name}`, 'dec', '−');
  const val = h('span', { className: 'product__qty-val', textContent: qtyText });
  val.setAttribute('aria-live', 'polite');
  val.setAttribute('aria-label', `تعداد ${name}: ${qtyText}`);
  const inc = mkBtn('product__qty-btn', `افزودن ${name}`, 'inc', '+');
  
  if (qty >= maxStock) inc.disabled = true; 

  const stepper = h('div', { className: 'product__qty' });
  stepper.append(dec, val, inc);
  container.appendChild(stepper);
}

export function refreshCartButtons(id: number, qty: number, maxStock: number): void {
  const qtyText = priceFmt.format(qty);
  document.querySelectorAll<HTMLElement>(`.product__actions[data-product-id="${id}"]`).forEach((el) => {
    const name = el.dataset.productName ?? '';
    const stepper = el.querySelector<HTMLElement>('.product__qty');
    const val = el.querySelector<HTMLElement>('.product__qty-val');

    if (qty <= 0) {
      if (stepper) renderCartButton(el, id, name, 0, maxStock);
      return;
    }

    if (!stepper || !val) {
      renderCartButton(el, id, name, qty, maxStock);
      return;
    }

    val.textContent = qtyText;
    const incBtn = el.querySelector<HTMLButtonElement>('[data-action="inc"]');
    if (incBtn) incBtn.disabled = qty >= maxStock;
  });
}
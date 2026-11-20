import type { CartRow } from '../types';

export const renderCart = (rows: CartRow[]): void => {
    const list = document.querySelector<HTMLDivElement>('#cart-items');
    if (!list) throw new Error('Cart container is missing');
    const hadFocus = list.contains(document.activeElement);
    list.replaceChildren();
    if (rows.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'سبد خرید شما خالی است.';
        list.append(empty);
    }
    rows.forEach(row => {
        const item = document.createElement('article');
        item.className = 'cart-item';
        const name = document.createElement('h3');
        name.textContent = row.name;
        const quantity = document.createElement('p');
        quantity.textContent = 'تعداد: ' + new Intl.NumberFormat('fa-IR').format(row.quantity);
        const subtotal = document.createElement('p');
        subtotal.textContent = 'قیمت واحد: ' + row.price + ' | جمع: ' + row.subtotal;
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = 'حذف';
        remove.dataset.remove = String(row.id);
        remove.setAttribute('aria-label', 'حذف ' + row.name + ' از سبد');
        item.append(name, quantity, subtotal, remove);
        list.append(item);
    });
    if (hadFocus) {
        const next = list.querySelector<HTMLButtonElement>('button');
        if (next) next.focus({ preventScroll: true });
        else list.focus({ preventScroll: true });
    }
};

export const renderTotal = (total: string): void => {
    const element = document.querySelector<HTMLElement>('#cart-total');
    if (element) element.textContent = total;
};

export const renderCartCount = (count: string): void => {
    const element = document.querySelector<HTMLSpanElement>('.cart span');
    const button = document.querySelector<HTMLButtonElement>('.cart');
    if (element) element.textContent = count;
    if (button) button.setAttribute('aria-label', 'سبد خرید، ' + count + ' کالا');
};

import type { ReadonlyProduct } from '../types.ts';
import { el } from './dom.ts';
import { describeProduct, formatPrice } from './format.ts';

const TINTS = ['t-blue', 't-yellow', 't-green', 't-pink', 't-purple', 't-orange'];

export type AddHandler = (product: ReadonlyProduct, button: HTMLButtonElement) => void;

function createAddButton(product: ReadonlyProduct, onAdd: AddHandler): HTMLButtonElement {
    const add = el('button', 'add');
    add.type = 'button';
    add.setAttribute('aria-label', `افزودن ${describeProduct(product)} به سبد خرید`);

    const plus = el('span', null, '+');
    plus.setAttribute('aria-hidden', 'true');
    add.append(plus);

    add.addEventListener('click', () => {
        onAdd(product, add);
        plus.textContent = '✓';
        setTimeout(() => { plus.textContent = '+'; }, 800);
    });
    return add;
}

export function createCard(
    product: ReadonlyProduct,
    index: number,
    onAdd: AddHandler
): HTMLLIElement {
    const li = el('li', 'card');
    li.id = `d-${product.id}`;

    const article = el('article', TINTS[index % TINTS.length]);
    const nameId = `d-${product.id}-n`;
    article.setAttribute('aria-labelledby', nameId);

    const icon = el('span', 'ico', product.emoji);
    icon.setAttribute('aria-hidden', 'true');
    const media = el('div', 'media');
    media.append(icon);

    const name = el('h3', 'name', product.name);
    name.id = nameId;
    const amount = el('p', 'amount', product.unit);

    const price = el('p', 'price');
    price.append(el('strong', 'now', formatPrice(product.price)));

    const buy = el('div', 'buy');
    buy.append(price, createAddButton(product, onAdd));

    article.append(media, name, amount, buy);
    li.append(article);
    return li;
}
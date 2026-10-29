import { el } from './dom.ts';

export function createSkeleton(): HTMLLIElement {
    const li = el('li', 'card skeleton');
    li.setAttribute('aria-hidden', 'true');

    const buy = el('div', 'buy');
    buy.append(el('div', 'sk sk-line w-50'), el('div', 'sk sk-btn'));

    const article = el('article');
    article.append(
        el('div', 'media sk'),
        el('div', 'sk sk-line w-80'),
        el('div', 'sk sk-line w-50'),
        buy
    );
    li.append(article);
    return li;
}
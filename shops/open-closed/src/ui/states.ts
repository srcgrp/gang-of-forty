import type { Product } from '../types.ts';
import { createCard } from './card.ts';
import type { AddHandler } from './card.ts';
import { dom, el } from './dom.ts';
import { createSkeleton } from './skeleton.ts';

const SKELETON_COUNT = 6;
const { list, carousel, statusBox, firstBtn, lastBtn } = dom;

function setStatus(message: string): void {
    statusBox.replaceChildren();
    if (message) statusBox.append(message);
}

function setBusy(busy: boolean): void {
    carousel.setAttribute('aria-busy', String(busy));
}

function linkEdges(cards: HTMLLIElement[]): void {
    const first = cards[0];
    const last = cards[cards.length - 1];
    if (!first || !last) return;
    firstBtn.href = `#${first.id}`;
    lastBtn.href = `#${last.id}`;
}

export function showLoading(): void {
    setBusy(true);
    setStatus('در حال بارگذاری محصولات…');
    list.replaceChildren(...Array.from({ length: SKELETON_COUNT }, createSkeleton));
}

export function showProducts(products: Product[], onAdd: AddHandler): void {
    const cards = products.map((p, i) => createCard(p, i, onAdd));
    list.replaceChildren(...cards);
    linkEdges(cards);
    setStatus('');
    setBusy(false);
}

export function showEmpty(): void {
    setBusy(false);
    list.replaceChildren();
    setStatus('فعلاً محصولی در این دسته نیست.');
}

export function showError(message: string, onRetry: () => void): void {
    setBusy(false);
    list.replaceChildren();
    const retry = el('button', 'btn', 'تلاش دوباره');
    retry.type = 'button';
    retry.addEventListener('click', onRetry);
    statusBox.replaceChildren(message, retry);
}
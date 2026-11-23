import type { LoadState, ShelfView } from '../../../shared/types';
import { buildShelf } from './shelf-builder';
import { fillShelf, renderPlaceholder } from './shelves';
import { assertNever } from './assert-never';

function renderShelves(shelves: ShelfView[]): void {
  const root = document.getElementById('product-shelves');
  if (!root) return;
  root.replaceChildren();
  for (const { shelf, cards } of shelves) {
    root.appendChild(buildShelf(shelf));
    fillShelf(shelf.id, cards);
  }
}

export function renderProducts(res: LoadState, shelves: ShelfView[]): void {
  switch (res.status) {
    case 'loading':
      return;
    case 'success':
      return renderShelves(shelves);
    case 'empty':
      return renderPlaceholder(
        'هنوز محصولی برای نمایش نداریم',
        'به‌زودی محصولات تازه به فروشگاه اضافه می‌شوند.',
        false,
      );
    case 'error':
      return renderPlaceholder('بارگذاری محصولات ناموفق بود', res.message, true);
    default:
      return assertNever(res);
  }
}
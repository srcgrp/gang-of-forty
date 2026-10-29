/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ProductItem, QtyOf } from '../types';
import { $ } from './dom';
import { stepper, updateStepper } from './stepper';

type Items = ReadonlyMap<number, ProductItem>;

function updateSlot(slot: HTMLElement, items: Items, qtyOf: QtyOf): void {
  const id = Number(slot.dataset.id);
  const item = items.get(id);
  if (!item) return;
  const quantity = qtyOf(id);
  let box = $<HTMLDivElement>('.stepper', slot);
  if (!box && quantity === 0) return;
  const add = $<HTMLButtonElement>('.add', slot);
  if (!add) return;

  const active = document.activeElement;
  const hadFocus = slot.contains(active);
  const pressed = hadFocus && active instanceof HTMLElement ? active.dataset.step ?? '' : '';

  if (!box) {
    box = stepper(item.product);
    slot.append(box);
  }
  add.hidden = quantity > 0;
  box.hidden = quantity === 0;
  if (quantity > 0) updateStepper(box, item, quantity);

  if (hadFocus) {
    const next = quantity === 0 ? add : $<HTMLButtonElement>(pressed === 'dec' ? '[data-step="dec"]' : '[data-step="inc"]', box);
    next?.focus({ preventScroll: true });
  }
}

export function syncControls(id: number, items: Items, qtyOf: QtyOf): void {
  document.querySelectorAll<HTMLElement>(`.buy__control[data-id="${id}"]`).forEach((slot) => updateSlot(slot, items, qtyOf));
}

export function syncAllControls(items: Items, qtyOf: QtyOf): void {
  document.querySelectorAll<HTMLElement>('.buy__control').forEach((slot) => updateSlot(slot, items, qtyOf));
}

export function syncCartControls(ids: readonly number[], items: Items, qtyOf: QtyOf): void {
  ids.forEach((id) => syncControls(id, items, qtyOf));
}
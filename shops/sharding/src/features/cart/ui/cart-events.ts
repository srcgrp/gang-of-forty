import { closestTarget } from '../../../shared/ui/dom';

export function setupCartClicks(onChange: (id: number, change: 'add' | 'remove') => void): void {
  document.addEventListener('click', (e) => {
    const btn = closestTarget<HTMLButtonElement>(e, '[data-action="inc"], [data-action="dec"]');
    if (!btn) return;
    const actions = btn.closest<HTMLElement>('.product__actions');
    if (!actions) return;
    const id = Number(actions.dataset.productId);
    if (Number.isNaN(id)) return;
    onChange(id, btn.dataset.action === 'inc' ? 'add' : 'remove');
  });
}
import { closestTarget } from './dom';

export function setupMegaMenu(): void {
  const trigger = document.querySelector<HTMLButtonElement>('.mega-menu__trigger');
  const menu = trigger?.closest<HTMLElement>('.mega-menu');
  if (!trigger || !menu) return;

  const setExpanded = (open: boolean): void => trigger.setAttribute('aria-expanded', String(open));

  menu.addEventListener('pointerenter', () => setExpanded(true));
  menu.addEventListener('pointerleave', () => { if (menu.dataset.state !== 'open') setExpanded(menu.matches(':focus-within')); });
  menu.addEventListener('focusin', () => setExpanded(true));
  menu.addEventListener('focusout', (e) => { if (!(e.relatedTarget instanceof Node) || !menu.contains(e.relatedTarget)) { if (menu.dataset.state !== 'open') setExpanded(menu.matches(':hover')); } });

  trigger.addEventListener('click', () => {
    if (menu.matches(':hover') && menu.dataset.state !== 'open') { menu.dataset.state = 'open'; setExpanded(true); return; }
    if (menu.dataset.state === 'open') { delete menu.dataset.state; setExpanded(menu.matches(':hover, :focus-within')); } else { menu.dataset.state = 'open'; setExpanded(true); }
  });

  document.addEventListener('click', (e) => { if (!(e.target instanceof Node)) return; if (!menu.contains(e.target)) { delete menu.dataset.state; setExpanded(false); } });
  document.addEventListener('keydown', (e: KeyboardEvent) => { if (e.key === 'Escape' && menu.dataset.state === 'open') { delete menu.dataset.state; setExpanded(false); trigger.focus(); } });

  const list = menu.querySelector<HTMLElement>('.mega-menu__categories');
  if (!list) return;
  const activate = (e: Event): void => {
    const item = closestTarget<HTMLElement>(e, '.mega-menu__item');
    if (!item) return;
    list.querySelectorAll<HTMLElement>('.mega-menu__item[data-state="active"]').forEach((el) => delete el.dataset.state);
    item.dataset.state = 'active';
  };
  list.addEventListener('mouseover', activate);
  list.addEventListener('focusin', activate);
}
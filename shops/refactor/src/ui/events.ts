import type { AppHandlers } from '../types';

export const bindEvents = (handlers: AppHandlers): void => {
  const header = document.querySelector<HTMLElement>('.site-header');
  if (header) new ResizeObserver(() => {
    document.documentElement.style.setProperty('--sticky-offset', `${header.getBoundingClientRect().height + 16}px`);
  }).observe(header);
  document.querySelector<HTMLFormElement>('#search-form')?.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault(); const input = document.querySelector<HTMLInputElement>('#q');
    if (input) handlers.changeQuery({ ...handlers.query(), search: input.value.trim() });
  });

  document.querySelector<HTMLButtonElement>('#reset-filters')?.addEventListener('click', () =>
    handlers.changeQuery({ category: '', search: '' }));

  document.addEventListener('click', (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const add = event.target.closest<HTMLButtonElement>('[data-add]');
    if (add && !add.disabled) { handlers.add(Number(add.dataset.add)); return; }
    const anchor = event.target.closest<HTMLAnchorElement>('a');
    if (!anchor || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    const category = anchor.dataset.category;
    if (category) { event.preventDefault(); handlers.changeQuery({ ...handlers.query(), category }); }
    else if (anchor.getAttribute('href')?.startsWith('#')) handlers.navigateFragment();
    const menu = document.querySelector<HTMLInputElement>('#nav-toggle');
    if (menu && !anchor.closest('.has-sub > a')) menu.checked = false;
  });

  window.addEventListener('storage', handlers.reloadCart);
  window.addEventListener('popstate', handlers.restoreNavigation);
  window.addEventListener('hashchange', handlers.restoreNavigation);
  document.querySelector<HTMLInputElement>('#nav-toggle')?.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && event.target instanceof HTMLInputElement) event.target.checked = false;
  });
};

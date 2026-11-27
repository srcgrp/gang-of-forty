import { closestTarget } from './dom';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function setupMobileMenu(): void {
  const menuBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const menu = document.getElementById('mobile-menu');
  if (!menuBtn || !menu) return;

  const setOpen = (open: boolean): void => {
    menu.dataset.state = open ? 'open' : 'closed';
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      const first = menu.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      first?.focus();
    } else {
      menuBtn.focus();
    }
  };

  menu.dataset.state = 'closed';

  menuBtn.addEventListener('click', () => {
    setOpen(menu.dataset.state !== 'open');
  });

  menu.addEventListener('click', (e) => {
    if (closestTarget(e, 'a, [data-menu-close]')) setOpen(false);
  });

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (menu.dataset.state !== 'open') return;
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return; }
    if (e.key === 'Tab') {
      const focusables = Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
      
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      
      if (!first || !last) return;
      
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  const mq = window.matchMedia('(min-width: 768px)');
  mq.addEventListener('change', (e: MediaQueryListEvent) => {
    if (e.matches && menu.dataset.state === 'open') setOpen(false);
  });
}
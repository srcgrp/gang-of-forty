const menuBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
const menuClose = document.querySelector<HTMLButtonElement>('[data-menu-close]');
const menu = document.getElementById('mobile-menu');
const menuOverlay = document.querySelector<HTMLElement>('.mobile-menu__overlay');

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

if (menuBtn && menu && menuOverlay) {
  const menuLinks = menu.querySelectorAll<HTMLAnchorElement>('a');

  const setOpen = (open: boolean): void => {
    menu.classList.toggle('is-open', open);
    menuOverlay.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';

    if (open && menuClose) {
      menuClose.focus();
    } else if (!open) {
      menuBtn.focus();
    }
  };

  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  if (menuClose) {
    menuClose.addEventListener('click', () => setOpen(false));
  }

  menuOverlay.addEventListener('click', () => setOpen(false));

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!menu.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }

    if (e.key === 'Tab') {
      const focusables = Array.from(
        menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);

      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  const mq = window.matchMedia('(min-width: 768px)');
  mq.addEventListener('change', (e: MediaQueryListEvent) => {
    if (e.matches && menu.classList.contains('is-open')) {
      setOpen(false);
    }
  });
}

const deptBtn = document.querySelector<HTMLButtonElement>(
  '.dept-btn[aria-expanded]'
);
const dept = deptBtn ? deptBtn.closest<HTMLElement>('.dept') : null;

if (deptBtn && dept) {
  const setDeptOpen = (open: boolean): void => {
    dept.classList.toggle('is-open', open);
    deptBtn.setAttribute('aria-expanded', String(open));
  };

  deptBtn.addEventListener('click', () => {
    const isOpen = deptBtn.getAttribute('aria-expanded') === 'true';
    setDeptOpen(!isOpen);
  });

  dept.addEventListener('focusout', (e: FocusEvent) => {
    if (
      !(e.relatedTarget instanceof Node) ||
      !dept.contains(e.relatedTarget)
    ) {
      setDeptOpen(false);
    }
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (!(e.target instanceof Node)) return;
    if (!dept.contains(e.target)) {
      setDeptOpen(false);
    }
  });

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && dept.classList.contains('is-open')) {
      setDeptOpen(false);
      deptBtn.focus();
    }
  });
}
export { };
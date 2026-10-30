import type { LoadState } from '../types';
import { button, el } from './dom';

let fragmentRequest = 0;

export const renderState = (state: LoadState, retry: () => void): void => {
  const status = document.querySelector<HTMLDivElement>('#load-state');
  const content = document.querySelector<HTMLDivElement>('#shop-content');
  if (!status || !content) return;
  status.replaceChildren(); status.hidden = false;
  content.hidden = state.status === 'loading' || state.status === 'error';
  const footer = document.querySelector<HTMLElement>('.site-footer');
  if (footer) footer.hidden = content.hidden;
  status.setAttribute('aria-busy', String(state.status === 'loading'));
  switch (state.status) {
    case 'loading': {
      const message = el('p', '', 'در حال بارگذاری فروشگاه…'); message.setAttribute('role', 'status');
      const skeletons = el('div', 'loading-cards'); skeletons.setAttribute('aria-hidden', 'true');
      for (let i = 0; i < 6; i++) skeletons.append(el('div', 'loading-card'));
      status.append(message, skeletons); break;
    }
    case 'error': {
      const message = el('p', 'error-msg', state.message); message.setAttribute('role', 'alert');
      const again = button('تلاش دوباره', 'btn retry-button'); again.addEventListener('click', retry);
      status.append(message, again); break;
    }
    case 'empty': {
      const message = el('p', 'empty-message', 'هنوز کالایی در فروشگاه ثبت نشده است.');
      message.setAttribute('role', 'status'); status.append(message); break;
    }
    case 'success': status.hidden = true; break;
    default: { const exhaustive: never = state; return exhaustive; }
  }
};

export const announce = (message: string): void => {
  const notice = document.querySelector<HTMLParagraphElement>('#runtime-notice');
  if (notice) { notice.textContent = message; notice.hidden = !message; }
};


export const scrollToCatalog = (): void => {
  document.querySelector<HTMLElement>('#catalog')?.scrollIntoView({ block: 'start' });
};

export const scrollToFragment = (id: string): void => {
  const request = ++fragmentRequest;
  document.querySelectorAll<HTMLElement>('.is-fragment-target').forEach((node) => node.classList.remove('is-fragment-target'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('is-fragment-target');
    const position = (): void => {
      if (request !== fragmentRequest) return;
      const header = document.querySelector<HTMLElement>('.site-header');
      const offset = (header?.getBoundingClientRect().height ?? 0) + 16;
      window.scrollTo({ top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset), behavior: 'instant' });
    };
    requestAnimationFrame(() => { position(); void document.fonts.ready.then(position); });
  }
};

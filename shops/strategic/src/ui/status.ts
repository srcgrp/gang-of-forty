/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ApiFailure, LoadState } from '../types';
import { dom } from './dom';
import { el } from './el';
import { toFaDigits } from './format';
import { icon } from './media';
import { renderLoading } from './skeleton';

function renderError(message: string, error?: ApiFailure): void {
  const detail = error?.file
    ? el('p', { class: 'state__detail' }, [
        el('bdi', { dir: 'ltr', text: error.file }),
        error.status ? ` · ${toFaDigits(error.status)}` : null,
      ])
    : null;

  dom.main.removeAttribute('aria-busy');
  dom.main.replaceChildren(
    el('section', { class: 'state state--error', role: 'alert' }, [
      icon('alert', 'state__icon'),
      el('h2', { class: 'state__title', text: 'بارگذاری محصولات ممکن نشد' }),
      el('p', { text: message }),
      detail,
      el('button', { class: 'btn btn--green', type: 'button', 'data-action': 'retry' }, [icon('refresh'), ' تلاش دوباره']),
    ]),
  );
}

function renderEmpty(): void {
  dom.main.removeAttribute('aria-busy');
  dom.main.replaceChildren(
    el('section', { class: 'state state--empty', role: 'status' }, [
      el('h2', { class: 'state__title', text: 'فعلاً محصولی برای نمایش نداریم' }),
      el('p', { class: 'state__text', text: 'در حال حاضر محصولی برای نمایش در فروشگاه موجود نیست.' }),
    ]),
  );
}

export function renderStatus(state: LoadState, onSuccess: () => void, error?: ApiFailure): void {
  switch (state.status) {
    case 'loading':
      renderLoading();
      return;
    case 'success':
      dom.main.removeAttribute('aria-busy');
      onSuccess();
      return;
    case 'empty':
      renderEmpty();
      return;
    case 'error':
      renderError(state.message, error);
      return;
    default: {
      const exhaustive: never = state;
      return exhaustive;
    }
  }
}
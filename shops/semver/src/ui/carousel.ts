import type { LoadState } from '../types';
import { createProductCard } from './product-card';
import { describeState } from './state-text';

export const renderCarousel = (carousel: HTMLElement, state: LoadState): void => {
  const loadingText = carousel.querySelector<HTMLElement>('.loading-state');
  const errorText = carousel.querySelector<HTMLElement>('.error-state');

  if (loadingText) {
    loadingText.hidden = state.status !== 'loading';
  }

  if (errorText) {
    errorText.hidden = state.status !== 'error';
    if (state.status === 'error') {
      errorText.textContent = state.message;
    }
  }

  carousel
    .querySelectorAll<HTMLElement>(':scope > .product-cart')
    .forEach((card) => {
      card.remove();
    });

  if (state.status === 'success') {
    state.products.forEach((item) => {
      carousel.appendChild(createProductCard(item));
    });
  }

  if (state.status === 'empty') {
    const emptyText = document.createElement('p');
    emptyText.textContent = describeState(state);
    carousel.appendChild(emptyText);
  }
};

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

  if (state.status === 'success') {
    state.products.forEach((product) => {
      carousel.appendChild(createProductCard(product));
    });
  }

  if (state.status === 'empty') {
    const emptyText: HTMLParagraphElement = document.createElement('p');
    emptyText.textContent = describeState(state);
    carousel.appendChild(emptyText);
  }
};

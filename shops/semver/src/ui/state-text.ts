import type { LoadState } from '../types';

export const describeState = (state: LoadState): string => {
  switch (state.status) {
    case 'loading':
      return 'در حال بارگذاری...';
    case 'success':
      return `${state.products.length} محصول آماده است`;
    case 'empty':
      return 'فعلاً محصولی نیست';
    case 'error':
      return `خطا: ${state.message}`;
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
};

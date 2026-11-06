import type { LoadState } from '../types.ts'

export function renderLoadState(el: HTMLElement, state: LoadState): void {
  switch (state.status) {
    case 'loading': {
      el.textContent = 'در حال بارگذاری…'
      break
    }
    case 'empty': {
      el.textContent = 'محصولی پیدا نشد.'
      break
    }
    case 'error': {
      el.textContent = `خطا: ${state.message}`
      break
    }
    case 'success': {
      el.textContent = ''
      break
    }
    default: {
      const bad: never = state
      throw new Error(`وضعیت نامشخص: ${String(bad)}`)
    }
  }
}

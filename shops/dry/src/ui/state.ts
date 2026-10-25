import type { LoadState, LoadSuccess } from '../types.ts'
import { renderStatus } from './status.ts'

export function renderState(
  boxes: HTMLElement[],
  state: LoadState,
  onSuccess: (data: LoadSuccess) => void,
): void {
  switch (state.status) {
    case 'loading':
      for (const box of boxes) renderStatus(box, 'در حال بارگذاری...', 'loading')
      return
    case 'empty':
      for (const box of boxes) renderStatus(box, 'محصولی برای نمایش وجود ندارد.', 'info')
      return
    case 'error':
      for (const box of boxes) renderStatus(box, state.message, 'error')
      return
    case 'success':
      onSuccess(state)
      return
    default: {
      const unreachable: never = state
      return unreachable
    }
  }
}
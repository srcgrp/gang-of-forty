import type { LoadState } from '../types'
import type { Elements } from './elements'

const assertNever = (value: never): never => {
  throw new Error(`Unhandled state: ${JSON.stringify(value)}`)
}

const show = (p: HTMLParagraphElement, text: string, kind: string): void => {
  p.textContent = text
  p.className = kind
  p.hidden = text === ''
}

export const renderStatus = (state: LoadState, els: Elements): void => {
  switch (state.status) {
    case 'loading':
      return show(els.status, 'در حال بارگذاری محصولات…', 'info')
    case 'success':
      return show(els.status, '', '')
    case 'empty':
      return show(els.status, 'محصولی پیدا نشد.', 'info')
    case 'error':
      return show(els.status, `بارگذاری ناموفق بود؛ اینترنت را بررسی کنید و دوباره تلاش کنید. (${state.message})`, 'error')
    default:
      return assertNever(state)
  }
}

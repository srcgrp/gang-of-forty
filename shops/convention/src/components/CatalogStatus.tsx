import type { LoadState } from '../types'

type Props = { state: LoadState<unknown>; retry: () => void }
export default function CatalogStatus({ state, retry }: Props) {
  if (state.status === 'loading') return <p role="status">در حال دریافت محصولات...</p>
  if (state.status === 'empty') return <p>محصولی برای نمایش وجود ندارد.</p>
  if (state.status === 'error') return <div role="alert">
    <p>خطا در دریافت اطلاعات: {state.message}</p>
    <button type="button" onClick={retry}>تلاش مجدد</button>
  </div>
  return null
}

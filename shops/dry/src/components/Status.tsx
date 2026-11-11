import type { LoadState } from '../shared/types.ts'

type StatusProps = {
  state: Exclude<LoadState, { status: 'success' }>
  onRetry: () => void
}

export default function Status({ state, onRetry }: StatusProps) {
  switch (state.status) {
    case 'loading':
      return <p className="status" role="status" aria-busy="true">در حال بارگذاری...</p>
    case 'empty':
      return <p className="status" role="status">محصولی برای نمایش وجود ندارد.</p>
    case 'error':
      return (
        <> 
        <p className="status error" role="alert">{state.message}</p>
        <button type='button' className="retry-btn" onClick={onRetry}>تلاش دوباره</button>
        </>
      )
  }
}
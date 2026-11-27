import type { LoadState } from '../types'

type StatusProps = { state: LoadState; onRetry?: () => void }

export default function Status({ state, onRetry }: StatusProps) {
  switch (state.status) {
    case 'loading':
      return <main className="container"><p className="load-state" role="status">در حال دریافت اطلاعات فروشگاه…</p></main>
    case 'empty':
      return <main className="container"><p className="empty-message" role="status">فعلاً کالایی برای نمایش وجود ندارد.</p></main>
    case 'error':
      return (
        <main className="container">
          <p className="error-msg" role="alert">{state.message}</p>
          {onRetry && <button className="retry-btn" type="button" onClick={onRetry}>تلاش دوباره</button>}
        </main>
      )
    case 'success':
      return null
    default: {
      const unreachable: never = state
      return unreachable
    }
  }
}

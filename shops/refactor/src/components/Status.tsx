import type { LoadState } from '../types'

type StatusProps = { state: LoadState }

export default function Status({ state }: StatusProps) {
  switch (state.status) {
    case 'loading':
      return <main className="container"><p className="load-state" role="status">در حال دریافت اطلاعات فروشگاه…</p></main>
    case 'empty':
      return <main className="container"><p className="empty-message" role="status">فعلاً کالایی برای نمایش وجود ندارد.</p></main>
    case 'error':
      return <main className="container"><p className="error-msg" role="alert">{state.message}</p></main>
    case 'success':
      return null
    default: {
      const unreachable: never = state
      return unreachable
    }
  }
}

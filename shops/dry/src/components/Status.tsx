import type { LoadState } from '../shared/types.ts'

type StatusProps = {
  state: Exclude<LoadState, { status: 'success' }>
}

export default function Status({ state }: StatusProps) {
  switch (state.status) {
    case 'loading':
      return <p className="status" role="status" aria-busy="true">در حال بارگذاری...</p>
    case 'empty':
      return <p className="status" role="status">محصولی برای نمایش وجود ندارد.</p>
    case 'error':
      return <p className="status error" role="alert">{state.message}</p>
  }
}
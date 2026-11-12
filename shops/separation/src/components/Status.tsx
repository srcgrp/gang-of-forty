import type { LoadState } from '../types.ts'

export default function Status({ state }: { state: LoadState }) {
  switch (state.status) {
    case 'loading':
      return <p role="status">در حال بارگذاری…</p>
    case 'empty':
      return <p role="status">محصولی پیدا نشد.</p>
    case 'error':
      return <p role="status">{`خطا: ${state.message}`}</p>
    case 'success':
      return null
    default: {
      const bad: never = state
      throw new Error(`وضعیت نامشخص: ${String(bad)}`)
    }
  }
}

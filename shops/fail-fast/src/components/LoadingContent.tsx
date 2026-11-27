import type { ReactNode } from 'react'

interface LoadingContentProps {
  status: 'loading' | 'empty' | 'error'
  errorMessage?: string
}

export default function LoadingContent({
  status,
  errorMessage,
}: LoadingContentProps): ReactNode {
  switch (status) {
    case 'loading':
      return <p role="status">در حال بارگذاری...</p>
    case 'empty':
      return <p>دادهای برای نمایش وجود ندارد.</p>
    case 'error':
      return <p role="alert">{errorMessage}</p>
    default:
      return null
  }
}

import type { LoadState } from '../shared/types'

type LoadStatusProps = {
    state: Exclude<LoadState, { status: 'success' }>
}

export default function LoadStatus({ state }: LoadStatusProps) {
    let message = ''
    switch (state.status) {
        case 'loading':
            message = 'در حال بارگذاری فروشگاه...'
            break
        case 'empty':
            message = 'محصولی برای نمایش پیدا نشد.'
            break
        case 'error':
            message = state.message
            break
        default: {
            const neverState: never = state
            throw new Error(`Unknown loading state: ${neverState}`)
        }
    }

    return (
        <main id="main-content" aria-busy={state.status === 'loading'}>
            <p className={state.status === 'error' ? 'page-status is-error' : 'page-status'} role={state.status === 'error' ? 'alert' : 'status'} aria-live="polite">
                {message}
            </p>
        </main>
    )
}

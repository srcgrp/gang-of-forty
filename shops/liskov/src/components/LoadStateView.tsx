import type {LoadState} from '../types';

type LoadStateViewProps = {
    loadState: LoadState;
    onRetry: () => void;
};

export default function LoadStateView({
    loadState,
    onRetry,
}: LoadStateViewProps) {
    if (loadState.status === 'loading') {
        return <p role='status'>در حال دریافت اطلاعات فروشگاه...</p>;
    }

    if (loadState.status === 'empty') {
        return <p>در حال حاضر محصولی برای نمایش وجود ندارد.</p>;
    }

    if (loadState.status === 'error') {
        return (
            <div>
                <p role='alert'>{loadState.message}</p>
                <button type='button' onClick={onRetry}>
                    تلاش دوباره
                </button>
            </div>
        );
    }

    return null;
}

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
        return (
            <main className='load-state-page'>
                <section className='load-state-card' role='status'>
                    <div className='load-state-spinner' />
                    <h2>در حال دریافت اطلاعات فروشگاه</h2>
                    <p>لطفاً چند لحظه صبر کنید...</p>
                </section>
            </main>
        );
    }

    if (loadState.status === 'empty') {
        return (
            <main className='load-state-page'>
                <section className='load-state-card'>
                    <div className='load-state-icon empty-icon'>!</div>
                    <h2>محصولی برای نمایش وجود ندارد</h2>
                    <p>در حال حاضر محصولی برای نمایش در فروشگاه موجود نیست.</p>
                    <button
                        className='load-state-button'
                        type='button'
                        onClick={onRetry}
                    >
                        تلاش مجدد
                    </button>
                </section>
            </main>
        );
    }

    if (loadState.status === 'error') {
        return (
            <main className='load-state-page'>
                <section className='load-state-card'>
                    <div className='load-state-icon error-icon'>!</div>

                    <span className='load-state-label'>
                        خطا در دریافت اطلاعات
                    </span>

                    <h2>مشکلی پیش آمده!</h2>

                    <p className='load-state-description'>
                        متأسفانه ارتباط با فروشگاه برقرار نشد. لطفاً اتصال
                        اینترنت خود را بررسی کنید و دوباره تلاش کنید.
                    </p>

                    <div className='load-state-error-message' role='alert'>
                        {loadState.message}
                    </div>

                    <button
                        className='load-state-button'
                        type='button'
                        onClick={onRetry}
                    >
                        <span aria-hidden='true'>↻</span>
                        تلاش مجدد
                    </button>

                    <span className='load-state-footer'>
                        سوپرمارکت شایان · همیشه تازه، همیشه در دسترس
                    </span>
                </section>
            </main>
        );
    }

    return null;
}

import type { ReactNode } from 'react';
import type { LoadState } from '../types';
import LoadingSkeleton from './LoadingSkeleton';

export default function LoadStatus({ state, children }: { state: LoadState; children: ReactNode }) {
  switch (state.status) {
    case 'loading':
      return <LoadingSkeleton />;
    case 'success':
      return <>{children}</>;
    case 'empty':
      return (
        <section className="state state--empty" role="status">
          <h2 className="state__title">فعلاً محصولی برای نمایش نداریم</h2>
          <p className="state__text">در حال حاضر محصولی برای نمایش در فروشگاه موجود نیست.</p>
        </section>
      );
    case 'error':
      return (
        <section className="state state--error" role="alert">
          <svg className="icon state__icon" aria-hidden="true" focusable="false"><use href="#i-alert" /></svg>
          <h2 className="state__title">بارگذاری محصولات ممکن نشد</h2>
          <p>{state.message}</p>
          {state.failure?.file && (
            <p className="state__detail">
              <bdi dir="ltr">{state.failure.file}</bdi>
              {state.failure.status ? ` · ${state.failure.status.toLocaleString('fa-IR')}` : null}
            </p>
          )}
        </section>
      );
    default: {
      const exhaustive: never = state;
      return exhaustive;
    }
  }
}
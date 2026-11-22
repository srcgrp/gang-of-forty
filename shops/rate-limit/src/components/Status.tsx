import type { ReactNode } from 'react';
import type { LoadState } from '../types';

type StatusProps = {
  state: LoadState;
  children: ReactNode; 
};

export default function Status({ state, children }: StatusProps) {
  switch (state.status) {
    case 'loading':
      return (
        <p className="status status-loading" role="status">
          در حال بارگذاری محصولات…
        </p>
      );
    case 'empty':
      return <p className="status status-empty">هنوز محصولی ثبت نشده است.</p>;
    case 'error':
      return (
        <div className="status status-error" role="alert">
          <h2>مشکلی پیش آمد</h2>
          <p>{state.message}</p>
        </div>
      );
    case 'success':
      return <>{children}</>;
  }
}
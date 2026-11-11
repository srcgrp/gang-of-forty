import type { LoadState } from "../shared/types/products";

type LoadStatusProps = {
  state: LoadState;
  onRetry: () => void;
};

export default function LoadStatus({ state, onRetry }: LoadStatusProps) {
  switch (state.status) {
    case "loading":
      return (
        <p className="loading-message" role="status">
          در حال دریافت اطلاعات فروشگاه...
        </p>
      );

    case "empty":
      return <p className="empty-message">محصولی برای نمایش وجود ندارد.</p>;

    case "error":
      return (
        <div className="load-retry" role="alert">
          <p className="error-message">{state.message}</p>
          <button type="button" className="retry-button" onClick={onRetry}>
            تلاش دوباره
          </button>
        </div>
      );

    case "success":
      return null;

    default: {
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
    }
  }
}

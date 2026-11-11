import type { LoadState } from "../shared/types/products";

type LoadStatusProps = {
  state: LoadState;
};

export default function LoadStatus({ state }: LoadStatusProps) {
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
        <p className="error-message" role="alert">
          {state.message}
        </p>
      );

    case "success":
      return null;

    default: {
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
    }
  }
}

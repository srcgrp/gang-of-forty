import type { LoadState } from "../types/load.ts";

type StatusProps = {
  state: LoadState;
  onRetry?: () => void;
};

export default function Status({ state, onRetry }: StatusProps) {
  switch (state.status) {
    case "loading":
      return <p className="status">در حال بارگذاری...</p>;
    case "empty":
      return <p className="status">چیزی پیدا نشد.</p>;
    case "error":
      return (
        <div className="status error">
          <p>{state.message}</p>
          {onRetry ? (
            <button type="button" onClick={onRetry}>
              Retry
            </button>
          ) : null}
        </div>
      );
    case "success":
      return null;
    default: {
      const forgotten: never = state;
      throw new Error("forgotten state: " + forgotten);
    }
  }
}

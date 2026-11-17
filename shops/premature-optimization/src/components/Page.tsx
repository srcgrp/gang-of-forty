import type { LoadState } from "../scripts/types";
import Skeleton from "./status/Skeleton";
import Status from "./status/Status";
import Storefront from "./Storefront";

type PageProps = {
  state: LoadState;
  onRetry: () => void;
};

export default function Page({ state, onRetry }: PageProps) {
  switch (state.status) {
    case "loading":
      return <Skeleton />;
    case "empty":
      return (
        <Status
          message="در حال حاضر محصولی برای نمایش وجود ندارد."
          onRetry={onRetry}
        />
      );
    case "error":
      return <Status message={state.message} isError onRetry={onRetry} />;
    case "success":
      return <Storefront data={state} />;
  }
}

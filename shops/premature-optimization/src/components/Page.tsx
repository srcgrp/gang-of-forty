import type { ReactNode } from "react";
import type { CatalogData, LoadState } from "../scripts/types";
import Skeleton from "./status/Skeleton.tsx";
import Status from "./status/Status.tsx";

type PageProps = {
  state: LoadState;
  onRetry: () => void;
  children: (data: CatalogData) => ReactNode;
};

export default function Page({ state, onRetry, children }: PageProps) {
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
      return children(state);
  }
}

import type { Cart, LoadState } from "../scripts/types";
import Skeleton from "./status/Skeleton.tsx";
import Status from "./status/Status.tsx";
import Storefront from "./Storefront.tsx";

type PageProps = {
  state: LoadState;
  cart: Cart;
  categoryId: number | null;
  query: string;
  onAdd: (id: number, button: HTMLButtonElement) => void;
  onRemove: (id: number) => void;
  onPick: (id: number) => void;
  onQuery: (query: string) => void;
  onRetry: () => void;
};

export default function Page({ state, onRetry, ...rest }: PageProps) {
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
      return <Storefront data={state} {...rest} />;
  }
}

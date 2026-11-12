import type { LoadState, ShopData } from "../shared/types";

type Props = { state: LoadState<ShopData>; onRetry: () => void };
export default function LoadStatus({ state, onRetry }: Props) {
  switch (state.status) {
    case "loading":
      return <p className="products-status" role="status">در حال دریافت اطلاعات فروشگاه...</p>;
    case "empty":
      return <p className="products-status" role="status">هنوز محصولی برای نمایش وجود ندارد.</p>;
    case "error":
      return <div className="products-status"><p role="alert">{state.message}</p>
        <button className="clear-search" type="button" onClick={onRetry}>تلاش دوباره</button></div>;
    case "success":
      return null;
    default: {
      const unexpected: never = state;
      throw new Error("وضعیت ناشناخته: " + String(unexpected));
    }
  }
}

import type { LoadState, ShopData } from "../shared/types";

type Props = { state: LoadState<ShopData> };
export default function LoadStatus({ state }: Props) {
  switch (state.status) {
    case "loading":
      return <p className="products-status" role="status">در حال دریافت اطلاعات فروشگاه...</p>;
    case "empty":
      return <p className="products-status" role="status">هنوز محصولی برای نمایش وجود ندارد.</p>;
    case "error":
      return <p className="products-status" role="alert">{state.message}</p>;
    case "success":
      return null;
    default: {
      const unexpected: never = state;
      throw new Error("وضعیت ناشناخته: " + String(unexpected));
    }
  }
}

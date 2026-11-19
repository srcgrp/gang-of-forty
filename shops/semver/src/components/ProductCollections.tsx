import type { Catalog, ProductLoadState } from "../types";
import CategoryShelves from "./CategoryShelves";
import HomeCarousels from "./HomeCarousels";
import LatestProducts from "./LatestProducts";
import PromoBanners from "./PromoBanners";

type ProductCollectionsProps = {
  catalog: Catalog | null;
  state: ProductLoadState;
  categoryId: number | null;
  onRetry: () => void;
};

export default function ProductCollections(props: ProductCollectionsProps) {
  if (props.state.status === "error") {
    return (
      <div className="error-state" role="alert">
        <p>خطا در بارگذاری اطلاعات: {props.state.message}</p>
        <button className="buynow-btn" type="button" onClick={props.onRetry}>
          تلاش دوباره
        </button>
      </div>
    );
  }

  return (
    <>
      <HomeCarousels
        catalog={props.catalog}
        state={props.state}
        variant="offers"
      />
      <LatestProducts
        state={props.state}
        categoryId={props.categoryId}
      />
      <CategoryShelves
        catalog={props.catalog}
        state={props.state}
      />
      <HomeCarousels
        catalog={props.catalog}
        state={props.state}
        variant="other"
      />
      <PromoBanners home={props.catalog?.home ?? null} />
    </>
  );
}

import type { Category, Home, LoadState } from "../types";
import CategoryShelves from "./CategoryShelves";
import HomeCarousels from "./HomeCarousels";
import LatestProducts from "./LatestProducts";
import PromoBanners from "./PromoBanners";

type ProductCollectionsProps = {
  categories: Category[];
  home: Home | null;
  state: LoadState;
  categoryId: number | null;
  onAdd: (id: number) => void;
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
        home={props.home}
        categories={props.categories}
        state={props.state}
        onAdd={props.onAdd}
        variant="offers"
      />
      <LatestProducts
        state={props.state}
        categoryId={props.categoryId}
        onAdd={props.onAdd}
      />
      <CategoryShelves
        categories={props.categories}
        state={props.state}
        onAdd={props.onAdd}
      />
      <HomeCarousels
        home={props.home}
        categories={props.categories}
        state={props.state}
        onAdd={props.onAdd}
        variant="other"
      />
      <PromoBanners home={props.home} />
    </>
  );
}

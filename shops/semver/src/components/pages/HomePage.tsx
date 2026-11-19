import { useContext } from "react";
import { stateForProducts } from "../../catalog/product-state";
import { HomeCategoryContext } from "../../hooks/home-category";
import { useCatalog } from "../../hooks/useCatalog";
import CategoryList from "../CategoryList";
import ProductCollections from "../ProductCollections";

export default function HomePage() {
  const state = useCatalog();
  const categoryId = useContext(HomeCategoryContext);
  const catalog = state.status === "success" || state.status === "empty" ? state.data : null;

  return (
    <>
      <CategoryList categories={catalog?.categories ?? []} />
      <ProductCollections
        catalog={catalog}
        state={stateForProducts(state, catalog?.products ?? [])}
        categoryId={categoryId}
        onRetry={state.retry}
      />
    </>
  );
}

import type { Category, Home, LoadState, Product, Shop } from "../types";
import CategoryList from "./CategoryList";
import Footer from "./Footer";
import Header from "./Header";
import ProductCollections from "./ProductCollections";

type StorefrontProps = {
  categories: Category[];
  categoryId: number | null;
  home: Home | null;
  loadState: LoadState;
  searchState: LoadState;
  products: Product[];
  query: string;
  shop: Shop | null;
  onCategoryPick: (id: number | null) => void;
  onQueryChange: (query: string) => void;
  onRetry: () => void;
};

export default function Storefront(props: StorefrontProps) {
  return (
    <>
      <Header
        products={props.products}
        categories={props.categories}
        activeCategoryId={props.categoryId}
        onCategoryPick={props.onCategoryPick}
        shop={props.shop}
        home={props.home}
        query={props.query}
        onQueryChange={props.onQueryChange}
        searchState={props.searchState}
        onRetry={props.onRetry}
      />
      <main>
        <CategoryList categories={props.categories} />
        <ProductCollections
          categories={props.categories}
          home={props.home}
          state={props.loadState}
          categoryId={props.categoryId}
          onRetry={props.onRetry}
        />
      </main>
      <Footer shop={props.shop} categories={props.categories} />
    </>
  );
}

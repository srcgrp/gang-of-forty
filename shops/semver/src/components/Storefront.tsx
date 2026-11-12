import type { CartLine, Category, Home, LoadState, Product, Shop } from "../types";
import CategoryList from "./CategoryList";
import Footer from "./Footer";
import Header from "./Header";
import ProductCollections from "./ProductCollections";

type StorefrontProps = {
  cart: CartLine[];
  cartCount: number;
  cartOpen: boolean;
  cartTotal: number;
  categories: Category[];
  categoryId: number | null;
  home: Home | null;
  loadState: LoadState;
  searchState: LoadState;
  products: Product[];
  query: string;
  shop: Shop | null;
  onAdd: (id: number) => void;
  onCartClick: () => void;
  onCategoryPick: (id: number | null) => void;
  onRemove: (id: number) => void;
  onQueryChange: (query: string) => void;
  onRetry: () => void;
};

export default function Storefront(props: StorefrontProps) {
  return (
    <>
      <Header
        cartCount={props.cartCount}
        cartOpen={props.cartOpen}
        onCartClick={props.onCartClick}
        cart={props.cart}
        products={props.products}
        cartTotal={props.cartTotal}
        onCartRemove={props.onRemove}
        categories={props.categories}
        activeCategoryId={props.categoryId}
        onCategoryPick={props.onCategoryPick}
        shop={props.shop}
        home={props.home}
        query={props.query}
        onQueryChange={props.onQueryChange}
        searchState={props.searchState}
        onAdd={props.onAdd}
        onRetry={props.onRetry}
      />
      <main>
        <CategoryList categories={props.categories} />
        <ProductCollections
          categories={props.categories}
          home={props.home}
          state={props.loadState}
          categoryId={props.categoryId}
          onAdd={props.onAdd}
          onRetry={props.onRetry}
        />
      </main>
      <Footer shop={props.shop} categories={props.categories} />
    </>
  );
}

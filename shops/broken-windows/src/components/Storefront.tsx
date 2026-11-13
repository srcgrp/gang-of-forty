import Header from "./Header.tsx";
import Navigation from "./Navigation.tsx";
import Hero from "./Hero.tsx";
import Benefits from "./Benefits.tsx";
import CategoryNav from "./CategoryNave.tsx";
import ProductGrid from "./ProductGrid.tsx";
import Middle from "./Middle.tsx";
import CartPanel from "./CartPanel.tsx";
import Notification from "./Notification.tsx";
import Footer from "./Footer.tsx";
import type { LoadedState } from "../types.ts";
import { searchProducts } from "../catalog/lookup.ts";

const DAIRY_ID = 2;
type Props = {
  data: LoadedState;
  categoryId: number | null;
  query: string;
onQuery: (value: string) => void;
  onPick: (id: number) => void;
};
export default function Storefront({ data, categoryId,query,
onQuery, onPick }: Props) {
  const { products, offers, stock, categories } = data;
 const categoryProducts =
  categoryId === null
    ? products
    : products.filter((p) => p.categoryId === categoryId);

const visible = searchProducts(categoryProducts, query);
const dairy = products.filter((p) => p.categoryId === DAIRY_ID);
  return (
    <>
      <Header query={query} onQuery={onQuery} />
      <Navigation />
      <main className="site-main">
        <Hero />
        <Benefits />
        <CategoryNav categories={categories} activeId={categoryId} onPick={onPick} />
        <ProductGrid
          title="پرفروش‌های امروز"
          id="special-offer"
          products={visible}
          offers={offers}
          stock={stock}
        />
        <Middle />
        <ProductGrid
          title="لبنیات و بستنی"
          id="dairy"
          nuts
          products={dairy}
          offers={offers}
          stock={stock}
        />
        <CartPanel />
        <Notification />
      </main>
      <Footer />
    </>
  );
}
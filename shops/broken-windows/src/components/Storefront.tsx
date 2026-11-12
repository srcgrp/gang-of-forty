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
import type { CartLine, LoadedState } from "../types.ts";
import { cartCount, cartTotal } from "../cart/totals.ts";
import { searchProducts } from "../catalog/lookup.ts";

const DAIRY_ID = 2;
type Props = {
  data: LoadedState;
  categoryId: number | null;
  cart: CartLine[];
  query: string;
onQuery: (value: string) => void;
  onPick: (id: number) => void;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;

};
export default function Storefront({ data, categoryId, cart,query,
onQuery, onPick, onAdd, onRemove }: Props) {
  const { products, offers, stock, categories } = data;
 const categoryProducts =
  categoryId === null
    ? products
    : products.filter((p) => p.categoryId === categoryId);

const visible = searchProducts(categoryProducts, query);
const dairy = products.filter((p) => p.categoryId === DAIRY_ID);
  return (
    <>
      <Header cartCount={cartCount(cart)} query={query} onQuery={onQuery} />
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
          onAdd={onAdd}
        />
        <Middle />
        <ProductGrid
          title="لبنیات و بستنی"
          id="dairy"
          nuts
          products={dairy}
          offers={offers}
          stock={stock}
          onAdd={onAdd}
        />
        <CartPanel cart={cart} total={cartTotal(cart)} onRemove={onRemove} />
        <Notification />
      </main>
      <Footer />
    </>
  );
}
import Header from "./Header";
import Navigation from "./Navigation";
import Hero from "./Hero";
import Benefits from "./Benefits";
import CategoryNav from "./CategoryNave";
import ProductGrid from "./ProductGrid";
import Middle from "./Middle";
import CartPanel from "./CartPanel";
import Notification from "./Notification";
import Footer from "./Footer";
import type { CartLine, LoadedState } from "../types";
import { cartCount, cartTotal } from "../cart/totals.ts";

const DAIRY_ID = 2;

type Props = {
  data: LoadedState;
  categoryId: number | null;
  cart: CartLine[];
  onPick: (id: number) => void;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
};

export default function Storefront({ data, categoryId, cart, onPick, onAdd, onRemove }: Props) {
  const { products, offers, stock, categories } = data;
  const visible =
    categoryId === null ? products : products.filter((p) => p.categoryId === categoryId);
  const dairy = products.filter((p) => p.categoryId === DAIRY_ID);

  return (
    <>
      <Header cartCount={cartCount(cart)} />
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
          title="پیشنهاد ویژه"
          id="special-offer-nuts"
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
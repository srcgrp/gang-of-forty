import type { ShopData, CartItem } from "../shared/types";
import { buildPage } from "../features/products/catalog/sections";
import { cartCount, cartTotal } from "../features/cart/logic/items";
import Header from "./Header";
import Hero from "./Hero";
import CategoryNav from "./CategoryNav";
import Promos from "./Promos";
import ProductSections from "./ProductSections";
import CartPanel from "./CartPanel";
import Footer from "./Footer";

type Props = {
  dark: boolean; onToggleTheme: () => void;
  data: ShopData; cart: CartItem[]; categoryId: number | null; cartOpen: boolean;
  onPick: (id: number | null) => void; onCartOpen: (open: boolean) => void;
  onAdd: (id: number) => void; onRemove: (id: number) => void;
};
export default function ShopView({ data, cart, categoryId, cartOpen, dark, onToggleTheme, onPick, onCartOpen, onAdd, onRemove }: Props) {
  const page = buildPage(data);
  const category = data.categories.find(item => item.id === categoryId);
  return (
    <div id="top">
      <a className="skip-link" href="#main">پرش به محتوای اصلی</a>
      <Header shop={data.shop} categories={data.categories} count={cartCount(cart)} onPick={onPick}
        cartOpen={cartOpen} onCartOpen={onCartOpen} dark={dark} onToggleTheme={onToggleTheme}>
        <CartPanel cart={cart} total={cartTotal(cart)} onRemove={onRemove}
          open={cartOpen} onClose={() => onCartOpen(false)} />
      </Header>
      <main id="main" className="wrap" tabIndex={-1}>
        <Hero home={data.home} onNavigate={() => onPick(null)} />
        <CategoryNav categories={data.categories} categoryId={categoryId} onPick={onPick} />
        <Promos promos={data.home.promos} onNavigate={() => onPick(null)} />
        <ProductSections page={page} category={category} onAdd={onAdd} />
      </main>
      <Footer shop={data.shop} categories={data.categories} onNavigate={() => onPick(null)} />
    </div>
  );
}

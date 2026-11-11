import type { Cart, CatalogData } from "../scripts/types";
import {
  cartCount,
  cartTotal,
  getPricedLines,
} from "../scripts/logic/cart/cart-lines.ts";
import { availableStock } from "../scripts/logic/stock/available-stock.ts";
import Catalog from "./catalog/Catalog.tsx";
import Footer from "./layout/Footer.tsx";
import Header from "./layout/Header.tsx";

type StorefrontProps = {
  data: CatalogData;
  cart: Cart;
  categoryId: number | null;
  query: string;
  onAdd: (id: number, button: HTMLButtonElement) => void;
  onRemove: (id: number) => void;
  onPick: (id: number) => void;
  onQuery: (query: string) => void;
};

export default function Storefront({
  data,
  cart,
  categoryId,
  query,
  onAdd,
  onRemove,
  onPick,
  onQuery,
}: StorefrontProps) {
  const { products, stock, offers, categories } = data;
  const shop = {
    ...data.shop,
    name: "سوپرینو",
    copyright: "© ۱۴۰۵ سوپرینو · عضو دار و دسته چهل‌نفره",
  };
  const lines = getPricedLines(cart, products, offers);

  return (
    <>
      <a className="skip-link" href="#main-content">
        پرش به محتوای اصلی
      </a>
      <Header
        shop={shop}
        categories={categories}
        cartLines={lines}
        count={cartCount(cart)}
        total={cartTotal(lines)}
        onRemove={onRemove}
        productCount={products.length}
        query={query}
        onQuery={onQuery}
      />
      <Catalog
        data={data}
        stock={availableStock(stock, cart)}
        categoryId={categoryId}
        query={query}
        onAdd={onAdd}
        onPick={onPick}
      />
      <Footer shop={shop} categories={categories} />
    </>
  );
}

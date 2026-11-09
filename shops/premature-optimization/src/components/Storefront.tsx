import type { Cart, CatalogData } from "../scripts/types";
import {
  cartCount,
  cartTotal,
  getPricedLines,
} from "../scripts/logic/cart/cart-lines.ts";
import {
  categorySections,
  specialOffers,
} from "../scripts/logic/catalog/sections.ts";
import { availableStock } from "../scripts/logic/stock/available-stock.ts";
import Header from "./Header.tsx";
import Hero from "./Hero.tsx";
import CategoryNav from "./CategoryNav.tsx";
import ProductGrid from "./ProductGrid.tsx";
import Promos from "./Promo.tsx";
import Footer from "./Footer.tsx";

type StorefrontProps = {
  data: CatalogData;
  cart: Cart;
  categoryId: number | null;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  onPick: (id: number) => void;
};

export default function Storefront({
  data,
  cart,
  categoryId,
  onAdd,
  onRemove,
  onPick,
}: StorefrontProps) {
  const { products, stock, offers, categories, shop, home } = data;
  const lines = getPricedLines(cart, products, offers);
  const shared = {
    offers,
    stock: availableStock(stock, cart),
    categories,
    onAdd,
  };
  const special = specialOffers(products, offers);
  const sections = categorySections(products, categories, categoryId);

  return (
    <>
      <Header
        shop={shop}
        categories={categories}
        cartLines={lines}
        count={cartCount(cart)}
        total={cartTotal(lines)}
        onRemove={onRemove}
      />
      <main id="main-content">
        <Hero hero={home.hero} side={home.side} />
        <CategoryNav
          categories={categories}
          activeId={categoryId}
          onPick={onPick}
        />
        {special.length > 0 && (
          <ProductGrid
            id="offers"
            title="پیشنهاد ویژه"
            products={special}
            {...shared}
          />
        )}
        <Promos promos={home.promos ?? []} />
        {sections.length === 0 && <p>محصولی در این دسته وجود ندارد.</p>}
        {sections.map(({ category, items }) => (
          <ProductGrid
            key={category.id}
            id={category.slug}
            title={category.name}
            products={items}
            {...shared}
          />
        ))}
      </main>
      <Footer shop={shop} categories={categories} />
    </>
  );
}

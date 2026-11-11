import type { CardProduct, CartLine, Data } from "../types.ts";
import Footer from "../components/Footer.tsx";
import ProductGrid from "../components/ProductGrid.tsx";
import Header from "../components/Header.tsx";
import Hero from "../components/Hero.tsx";
import CategoryNav from "../components/CategoryNav.tsx";
import CartPanel from "../components/CartPanel.tsx";
import { cartCount, cartTotal } from "../cart/cart-lines.ts";
import { withOfferAndStock } from "../catalog/product-catalog.ts";

type ShopPageProps = {
  data: Data;
  selectedId: number | null;
  onPick: (id: number | null) => void;
  cart: CartLine[];
  onAdd: (product: CardProduct) => void;
  onRemove: (id: number) => void;
};

export default function ShopPage({
  data,
  selectedId,
  onPick,
  cart,
  onAdd,
  onRemove,
}: ShopPageProps) {
  const count = cartCount(cart);
  const total = cartTotal(cart);
  const visible =
    selectedId === null
      ? data.products
      : data.products.filter((p) => p.categoryId === selectedId);

  const cards = visible.map((p) =>
    withOfferAndStock(p, data.offers, data.stock),
  );

  function handleAdd(id: number) {
    const product = cards.find((p) => p.id === id);
    if (product) onAdd(product);
  }
  return (
    <>
      <a href="#main" className="skip-link">
        پرش به محتوای اصلی
      </a>
      <Header count={count} />
      <main id="main">
        <Hero />
        <CategoryNav
          categories={data.categories}
          selectedId={selectedId}
          onPick={onPick}
        />
        <ProductGrid products={cards} onAdd={handleAdd} />
        <CartPanel lines={cart} total={total} onRemove={onRemove} />
      </main>
      <Footer />
    </>
  );
}

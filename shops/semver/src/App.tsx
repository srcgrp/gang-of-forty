import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import { addItem, removeItem, totalPrice } from "./cart/cart";
import { countCartItems } from "./ui/cart-badge";
import type { CartLine, Category, Product } from "./types";

const SAMPLE: Product[] = [
  {
    id: 1,
    name: "برنج ایرانی هاشمی",
    price: 485000,
    unit: "۵ کیلوگرم",
    emoji: "🍚",
    categoryId: 1,
  },
  {
    id: 2,
    name: "روغن مایع آفتابگردان",
    price: 89000,
    unit: "۱.۵ لیتر",
    emoji: "🫒",
    categoryId: 2,
  },
  {
    id: 3,
    name: "تخم‌مرغ تازه",
    price: 115000,
    unit: "۱۵ عددی",
    emoji: "🥚",
    categoryId: 3,
  },
];

const SAMPLE_CATEGORIES: Category[] = [
  {
    id: 1,
    slug: "rice-and-grains",
    name: "برنج و غلات",
    emoji: "🌾",
    color: "#f3ede2",
  },
  {
    id: 2,
    slug: "oil-and-seasoning",
    name: "روغن و چاشنی",
    emoji: "🫒",
    color: "#eef3df",
  },
  {
    id: 3,
    slug: "eggs",
    name: "تخم‌مرغ",
    emoji: "🥚",
    color: "#fbf0dc",
  },
];

export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts =
    categoryId === null
      ? SAMPLE
      : SAMPLE.filter((product) => product.categoryId === categoryId);
  const cartCount = countCartItems(cart);
  const cartTotal = totalPrice(cart, SAMPLE);

  const handleAdd = (productId: number): void => {
    setCart((currentCart) => addItem(currentCart, productId));
  };

  const handleRemove = (productId: number): void => {
    setCart((currentCart) => removeItem(currentCart, productId));
  };

  return (
    <>
      <Header
        cartCount={cartCount}
        cartOpen={cartOpen}
        onCartClick={() => setCartOpen((isOpen) => !isOpen)}
        cart={cart}
        products={SAMPLE}
        cartTotal={cartTotal}
        onCartRemove={handleRemove}
        categories={SAMPLE_CATEGORIES}
        activeCategoryId={categoryId}
        onCategoryPick={setCategoryId}
      />
      <main>
        <h2 id="categories" className="section-title">
          دسته‌بندی‌ها
        </h2>
        <article className="flex-item-categories"></article>

        <article id="category-shelves"></article>

        <div id="carousels"></div>

        <div id="carousels"></div>

        <article className="feature-container" id="promos"></article>

        <h2 id="latest-products" className="section-title">
          جدیدترین‌ها
        </h2>
        <ProductGrid products={filteredProducts} onAdd={handleAdd} />
      </main>
      <Footer />
    </>
  );
}

import CartPanel from "./components/CartPanel";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import type { Product } from "./types";

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

export default function App() {
  return (
    <>
      <Header />
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
        <ProductGrid products={SAMPLE} />
      </main>
      <Footer />
      <CartPanel />
    </>
  );
}

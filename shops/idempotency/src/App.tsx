
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import type { Product } from "./shared/types/products";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const SAMPLE: Product[] = [
  {
    id: 101,
    name: "سیب",
    categoryId: 1,
    price: 85000,
    unit: "۱ کیلوگرم",
  },
  {
    id: 201,
    name: "شیر کم‌چرب",
    categoryId: 2,
    price: 32000,
    unit: "۱ لیتر",
  },
  {
    id: 202,
    name: "پنیر",
    categoryId: 2,
    price: 85000,
    unit: "۴۰۰ گرم",
  },
  {
    id: 301,
    name: "نان سنگک",
    categoryId: 3,
    price: 15000,
    unit: "۱ عدد",
  },
];

export default function App() {
  return (
    <>
      <Header />

      <main id="main-content">
        <Hero />

        <section
          id="categories"
          className="categories"
        >
          <h2>دسته‌بندی‌ها</h2>
          <p>
            دسته‌بندی محصولات در مراحل بعد
            اضافه می‌شود.
          </p>
        </section>

        <ProductGrid products={SAMPLE} />
      </main>

      <Footer />
    </>
  );}
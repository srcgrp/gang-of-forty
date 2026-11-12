import Banner from "./components/Banner.tsx";
import CartPanel from "./components/CartPanel.tsx";
import CategoryNav from "./components/CategoryNav.tsx";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import ProductGrid from "./components/ProductGrid.tsx";
import type { Product } from "./types/product.ts";

const SAMPLE: Product[] = [
  {
    id: 1,
    categoryId: 1,
    name: "شیر",
    emoji: "🥛",
    unit: "لیتر",
    price: 50000,
    tags: [],
  },
  {
    id: 2,
    categoryId: 1,
    name: "ماست",
    emoji: "🥣",
    unit: "کیلو",
    price: 80000,
    tags: [],
  },
  {
    id: 3,
    categoryId: 2,
    name: "نان",
    emoji: "🍞",
    unit: "عدد",
    price: 20000,
    tags: [],
  },
];
export default function App() {
  return (
    <>
      <Banner />
      <Header />
      <main>
        <CategoryNav />
        <ProductGrid products={SAMPLE} />
        <CartPanel />
      </main>
      <Footer />
    </>
  );
}

import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import ProductGrid from "./components/ProductGrid";
import CartPanel from "./components/CartPanel";
import type { Product } from "./types";

export const SAMPLE: Product[] = [
  {
    id: 1,
    categoryId: 4,
    name: "سیب",
    emoji: "🍎",
    unit: "یک کیلو",
    price: 120000,
    tags: ["میوه"],
  },
  {
    id: 2,
    categoryId: 4,
    name: "شیر",
    emoji: "🥛",
    unit: "یک بطری",
    price: 45000,
    tags: ["لبنیات"],
  },
  {
    id: 3,
    categoryId: 4,
    name: "نان",
    emoji: "🍞",
    unit: "یک عدد",
    price: 30000,
    tags: ["نان"],
  },
];
export default function App() {
  return (
    <>
        <Header />
        <CategoryNav />
        <ProductGrid />
        <CartPanel />
    </>
  )
}
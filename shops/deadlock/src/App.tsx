import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import ProductGrid from "./components/ProductGrid";
import CartPanel from "./components/CartPanel";
import type { Product } from "./types";

const SAMPLE: Product[] = [
  {
    id: 1,
    categoryId: 1,
    name: "سیب",
    emoji: "🍎",
    unit: "یک کیلو",
    price: 120000,
    tags: ["میوه"],
  },
  {
    id: 2,
    categoryId: 2,
    name: "شیر",
    emoji: "🥛",
    unit: "یک بطری",
    price: 45000,
    tags: ["لبنیات"],
  },
  {
    id: 3,
    categoryId: 3,
    name: "نان",
    emoji: "🍞",
    unit: "یک عدد",
    price: 30000,
    tags: ["نان"],
  },
];

function handleAdd(id: number): void {
  console.log("Selected product id:", id);
}

function handleCategoryPick(id: number | null): void {
  console.log("Selected category id:", id);
}

export default function App() {
  return (
    <>
      <Header />
      <CategoryNav onPick={handleCategoryPick} />
      <ProductGrid products={SAMPLE} onAdd={handleAdd} />
      <CartPanel />
    </>
  );
}

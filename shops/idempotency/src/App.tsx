
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import type { Product,Offer,Stock,Category,} from "./shared/types/products";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import CategoryGrid from "./components/CategoryGrid";

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

const SAMPLE_OFFERS: Offer[] = [
  {
    productId: 202,
    percent: 20,
    label: "پیشنهاد ویژه",
  },
];

const SAMPLE_STOCK: Stock = {
  items: {
    101: 8,
    201: 5,
    202: 2,
    301: 0,
  },
};

const SAMPLE_CATEGORIES: Category[] = [
  { id: 1, name: "میوه و سبزی", slug: "fruits" },
  { id: 2, name: "لبنیات", slug: "dairy" },
  { id: 3, name: "نان و غلات", slug: "bakery" },
];

export default function App() {
  function handleAdd(productId: number): void {
  console.log("Add product:", productId);
}
function handlePickCategory(id: number | null): void {
  console.log("Selected category:", id);
}
  return (
    <>
      <Header
       categories={SAMPLE_CATEGORIES}
  onPickCategory={handlePickCategory}
   />

      <main id="main-content">
        <Hero />

       <CategoryGrid
  categories={SAMPLE_CATEGORIES}
  onPick={handlePickCategory}
/>

        <ProductGrid products={SAMPLE} offers={SAMPLE_OFFERS} stock={SAMPLE_STOCK} onAdd={handleAdd} />
      </main>

      <Footer />
    </>
  );}
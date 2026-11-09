import type { Product, Category } from "./shared/types";
import { buildPage } from "./features/products/catalog/sections";
import { SAMPLE_SHOP, SAMPLE_HOME, SAMPLE_STOCK, SAMPLE_OFFERS } from "./sample-data";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryNav from "./components/CategoryNav";
import Promos from "./components/Promos";
import ProductGrid from "./components/ProductGrid";
import CartPanel from "./components/CartPanel";
import Footer from "./components/Footer";

const SAMPLE_PRODUCTS: Product[] = [
  {"id": 104, "categoryId": 1, "name": "گوجه‌فرنگی", "emoji": "🍅", "unit": "۱ کیلو", "price": 45000, "tags": ["تازه"]},
  {"id": 201, "categoryId": 2, "name": "شیر کم‌چرب", "emoji": "🥛", "unit": "۱ لیتر", "price": 38000, "tags": []},
  {"id": 301, "categoryId": 3, "name": "نان سنگک", "emoji": "🫓", "unit": "۱ عدد", "price": 12000, "tags": ["تازه"]},
  {"id": 406, "categoryId": 4, "name": "عدس", "emoji": "🫘", "unit": "۹۰۰ گرم", "price": 98000, "tags": []}
];
const SAMPLE_CATEGORIES: Category[] = [
  {"id": 1, "slug": "fruits", "name": "میوه و سبزی", "emoji": "🍎", "color": "#fde3dc"},
  {"id": 2, "slug": "dairy", "name": "لبنیات", "emoji": "🥛", "color": "#e2eefc"},
  {"id": 3, "slug": "bakery", "name": "نان و شیرینی", "emoji": "🥖", "color": "#fff0cc"},
  {"id": 4, "slug": "pantry", "name": "خواربار", "emoji": "🍚", "color": "#e3f1e7"},
  {"id": 5, "slug": "drinks", "name": "نوشیدنی", "emoji": "🧃", "color": "#e0f5ef"},
  {"id": 6, "slug": "protein", "name": "پروتئین", "emoji": "🍗", "color": "#fbe0e6"},
  {"id": 7, "slug": "snacks", "name": "تنقلات", "emoji": "🍪", "color": "#f1e6fb"}
];

export default function App() {
  const page = buildPage({ products: SAMPLE_PRODUCTS, categories: SAMPLE_CATEGORIES,
    shop: SAMPLE_SHOP, home: SAMPLE_HOME, stock: SAMPLE_STOCK, offers: SAMPLE_OFFERS });
  return (
    <div id="top">
      <a className="skip-link" href="#main">پرش به محتوای اصلی</a>
      <Header shop={SAMPLE_SHOP} categories={SAMPLE_CATEGORIES} />
      <main id="main" className="wrap" tabIndex={-1}>
        <Hero home={SAMPLE_HOME} />
        <CategoryNav categories={SAMPLE_CATEGORIES} />
        <Promos promos={SAMPLE_HOME.promos} />
        <div id="carousels">
          {page.sections.filter(section => section.carousel).map(section => (
            <ProductGrid key={section.id} section={section} />
          ))}
        </div>
        <div id="category-products">
          {page.sections.filter(section => !section.carousel).map(section => (
            <ProductGrid key={section.id} section={section} />
          ))}
        </div>
        <CartPanel />
      </main>
      <Footer shop={SAMPLE_SHOP} categories={SAMPLE_CATEGORIES} />
    </div>
  );
}

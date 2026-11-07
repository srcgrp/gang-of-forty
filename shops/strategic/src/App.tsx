import Catalog from './components/Catalog';
import Header from './components/Header';
import IconSprite from './components/IconSprite';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import OffersShelf from './components/OffersShelf';
import Promos from './components/Promos';
import CategoryShelf from './components/CategoryShelf';
import Footer from './components/Footer';
import type { Category, Product } from './types';

const SAMPLE: Product[] = [
  {
    "id": 102,
    "categoryId": 1,
    "name": "پرتقال تامسون شمال",
    "emoji": "🍊",
    "unit": "۱ کیلو",
    "price": 72000,
    "tags": [
      "تازه",
      "فصل"
    ]
  },
  {
    "id": 201,
    "categoryId": 2,
    "name": "شیر کم‌چرب",
    "emoji": "🥛",
    "unit": "۱ لیتر",
    "price": 38000,
    "tags": []
  },
  {
    "id": 402,
    "categoryId": 4,
    "name": "عسل کوهستان",
    "emoji": "🍯",
    "unit": "۵۰۰ گرم",
    "price": 420000,
    "tags": [
      "محلی"
    ]
  },
  {
    "id": 501,
    "categoryId": 5,
    "name": "چای لاهیجان",
    "emoji": "🍵",
    "unit": "۴۵۰ گرم",
    "price": 230000,
    "tags": [
      "محلی"
    ]
  }
];

const categories: Category[] = [
  {
    "id": 2,
    "slug": "dairy",
    "name": "لبنیات",
    "emoji": "🥛",
    "color": "#e2eefc"
  },
  {
    "id": 1,
    "slug": "fruits",
    "name": "میوه و سبزی",
    "emoji": "🍎",
    "color": "#fde3dc"
  },
  {
    "id": 3,
    "slug": "bakery",
    "name": "نان و شیرینی",
    "emoji": "🥖",
    "color": "#fff0cc"
  },
  {
    "id": 4,
    "slug": "pantry",
    "name": "خواربار",
    "emoji": "🍚",
    "color": "#e3f1e7"
  },
  {
    "id": 5,
    "slug": "drinks",
    "name": "نوشیدنی",
    "emoji": "🧃",
    "color": "#e0f5ef"
  },
  {
    "id": 6,
    "slug": "protein",
    "name": "پروتئین",
    "emoji": "🍗",
    "color": "#fbe0e6"
  },
  {
    "id": 7,
    "slug": "snacks",
    "name": "تنقلات",
    "emoji": "🍪",
    "color": "#f1e6fb"
  }
];

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('category');
  const query = params.get('q')?.trim() ?? '';
  const category = categories.find(entry => entry.slug === slug);
  const matches = SAMPLE.filter(product =>
    (!slug || slug === 'offers' || product.categoryId === category?.id) &&
    product.name.includes(query)
  );
  const title = query ? `نتایج جستجوی «${query}»` : category?.name ?? 'پیشنهاد ویژه امروز';

  return (
    <>
      <IconSprite />
      <Header />
      <main id="main" className="wrap" tabIndex={-1}>
        {slug || query ? <Catalog title={title} category={category} products={matches} /> : <>
        <Hero />
        <CategoryNav />
        <OffersShelf products={SAMPLE} />
        <Promos />
        {categories.map(category => (
          <CategoryShelf key={category.id} category={category}
            products={SAMPLE.filter(product => product.categoryId === category.id)} />
        ))}
        </>}
      </main>
      <Footer />
      <div className="sr-only" id="live" role="status" />
    </>
  );
}
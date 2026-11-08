import type {
  Banner,
  CartLine,
  Category,
  ProductView,
  ShopInfo,
} from "./types";
import CartPanel from "./components/CartPanel";
import CategoryNav from "./components/CategoryNav";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";

const SHOP: ShopInfo = {
  name: "مینا",
  slogan: "تازه، نزدیک، به‌صرفه",
  notice: "🚚 ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان",
  owner: "",
  city: "تهران",
  phone: "021-12345678",
  currency: "تومان",
  hours: { open: "08:00", close: "22:00" },
  about: "کالای تازه با قیمت منصفانه.",
  address: "تهران، خیابان نمونه، پلاک ۴۰",
  copyright: "© ۱۴۰۵ مینا",
  deliveryFee: 35000,
  freeDeliveryOver: 500000,
  menu: [
    { label: "پیشنهاد ویژه", href: "#offers" },
    { label: "تماس با ما", href: "#contact" },
  ],
  help: [
    { label: "شیوه ارسال", href: "#" },
    { label: "بازگشت کالا", href: "#" },
  ],
  schedule: [
    { days: "شنبه تا پنجشنبه", time: "۸ تا ۲۲" },
    { days: "جمعه", time: "۹ تا ۱۴" },
  ],
};
const CATEGORIES: Category[] = [
  { id: 1, slug: "fruits", name: "میوه و سبزی", emoji: "🍎", color: "#fde3dc" },
  { id: 2, slug: "dairy", name: "لبنیات", emoji: "🥛", color: "#e2eefc" },
  { id: 3, slug: "bakery", name: "نان تازه", emoji: "🍞", color: "#fff1d6" },
];
const SAMPLE: ProductView[] = [
  {
    id: 101,
    categoryId: 1,
    name: "سیب قرمز دماوند",
    emoji: "🍎",
    unit: "۱ کیلو",
    price: 85000,
    tags: [],
    stock: 24,
    percent: 0,
    originalPrice: 85000,
  },
  {
    id: 102,
    categoryId: 1,
    name: "پرتقال تامسون شمال",
    emoji: "🍊",
    unit: "۱ کیلو",
    price: 61200,
    tags: [],
    stock: 12,
    percent: 15,
    originalPrice: 72000,
  },
  {
    id: 201,
    categoryId: 2,
    name: "شیر کم‌چرب",
    emoji: "🥛",
    unit: "۱ لیتر",
    price: 38000,
    tags: [],
    stock: 0,
    percent: 0,
    originalPrice: 38000,
  },
  {
    id: 301,
    categoryId: 3,
    name: "نان سنگک",
    emoji: "🍞",
    unit: "۱ عدد",
    price: 15000,
    tags: [],
    stock: 30,
    percent: 0,
    originalPrice: 15000,
  },
];
const HERO: Banner = {
  emoji: "🍉",
  title: "میوه‌های تازه، هر روز صبح",
  text: "مستقیم از باغ‌های اطراف شهر.",
  cta: { label: "خرید میوه و سبزی", href: "#fruits" },
};
const SIDE: Banner = {
  emoji: "🧀",
  title: "تا ۲۰٪ تخفیف لبنیات",
  text: "فقط تا پایان هفته",
  cta: { label: "دیدن محصولات", href: "#dairy" },
};
const LINES: CartLine[] = [
  {
    id: 101,
    name: "سیب قرمز دماوند",
    emoji: "🍎",
    price: 85000,
    stock: 24,
    quantity: 2,
    subtotal: 170000,
  },
];

export default function App() {
  const total = LINES.reduce((sum, line) => sum + line.subtotal, 0);
  const handleAdd = (id: number) => console.log("add product", id);
  const handlePick = (id: number) => console.log("pick category", id);
  return (
    <>
      <a className="skip-link" href="#content">
        پرش به محتوای اصلی
      </a>
      <Header
        shop={SHOP}
        categories={CATEGORIES}
        cartCount={2}
        productCount={SAMPLE.length}
      />
      <main id="content" tabIndex={-1}>
        <h1 className="sr-only">ریفکتور؛ سوپرمارکت آنلاین</h1>
        <Hero main={HERO} side={SIDE} />
        <CategoryNav categories={CATEGORIES} onPick={handlePick} />
        <ProductGrid products={SAMPLE} onAdd={handleAdd} />
        <CartPanel lines={LINES} total={total} />
      </main>
      <Footer shop={SHOP} categories={CATEGORIES} />
    </>
  );
}

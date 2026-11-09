import type { CartLine, Category, Home, Shop, Product, Offer, Stock } from "../scripts/types";

export const SHOP: Shop = {
  name: "سوپرینو",
  slogan: "سوپرمارکتی تازه و نو",
  owner: "",
  city: "تهران",
  phone: "021-66562210",
  hours: { open: "08:00", close: "22:00" },
  deliveryFee: 35000,
  freeDeliveryOver: 500000,
  currency: "تومان",
  notice: "🚚 ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان",
  about: "کالاهای تازه و باکیفیت با قیمتی منصفانه",
  address: "تهران، خیابان استاد معین، پلاک ۳۸",
  schedule: [
    { days: "شنبه تا چهارشنبه", time: "۸ تا ۲۲" },
    { days: "پنجشنبه و جمعه", time: "۱۰ تا ۲۰" },
  ],
  menu: [
    { label: "پیشنهاد ویژه", href: "#offers" },
    { label: "لبنیات", href: "#dairy" },
    { label: "میوه و سبزیجات", href: "#fruits" },
    { label: "خواربار و نان", href: "#bread" },
    { label: "تماس با ما", href: "#contact" },
  ],
  copyright: "© ۱۴۰۵ سوپرینو · عضو دار و دسته چهل‌نفره",
};

export const CATEGORIES: Category[] = [
  {"id": 1, "slug": "fruits", "name": "میوه و سبزی", "emoji": "🍎", "color": "#fde3dc"},
  {"id": 2, "slug": "dairy", "name": "لبنیات", "emoji": "🥛", "color": "#e2eefc"},
  {"id": 3, "slug": "bakery", "name": "نان و شیرینی", "emoji": "🥖", "color": "#fff0cc"},
  {"id": 4, "slug": "pantry", "name": "خواربار", "emoji": "🍚", "color": "#e3f1e7"},
  {"id": 5, "slug": "drinks", "name": "نوشیدنی", "emoji": "🧃", "color": "#e0f5ef"},
  {"id": 6, "slug": "protein", "name": "پروتئین", "emoji": "🍗", "color": "#fbe0e6"},
  {"id": 7, "slug": "snacks", "name": "تنقلات", "emoji": "🍪", "color": "#f1e6fb"}
]

export const HOME: Home = {
  hero: {
    title: "میوه‌های ارگانیک، سبزی‌های تازه",
    text: "گلچین از بهترین باغ‌های اطراف",
    emoji: "/svgs/bannerFruit.svg",
    cta: { label: "خرید میوه و سبزی", href: "#fruits" },
  },
  side: {
    title: "تا ۱۰٪ تخفیف لبنیات",
    text: "فقط تا پایان امروز",
    emoji: "/svgs/bannerDairy.svg",
    cta: { label: "دیدن محصولات", href: "#dairy" },
  },
  promos: [
    {
      text: "تنقلات برای شب‌های پرهیجان",
      emoji: "/svgs/banner-snacks.svg",
      href: "#snacks",
    },
    {
      text: "نان داغ، هر روز ساعت ۷",
      emoji: "/svgs/bread-banner.svg",
      href: "#bakery",
    },
  ],
  "carousels": [
    {
      "id": "offers",
      "title": "پیشنهاد ویژه امروز",
      "emoji": "🔥",
      "source": "offers"
    }
  ]
};

export const CART_LINES: CartLine[] = [
  {
    id: 101,
    name: "شیر پرچرب حاوی ویتامین D3 میهن",
    price: 108500,
    quantity: 2,
  },
  { id: 102, name: "شیر کاکائو پرچرب تازه میهن", price: 50400, quantity: 1 },
];

export const PRODUCTS: Product[] = [
  {"id": 101, "categoryId": 1, "name": "سیب قرمز دماوند", "emoji": "🍎", "unit": "۱ کیلو", "price": 85000, "tags": ["تازه"]},
  {"id": 102, "categoryId": 1, "name": "پرتقال تامسون شمال", "emoji": "🍊", "unit": "۱ کیلو", "price": 72000, "tags": ["تازه", "فصل"]},
  {"id": 103, "categoryId": 1, "name": "موز", "emoji": "🍌", "unit": "۱ کیلو", "price": 98000, "tags": []},
  {"id": 104, "categoryId": 1, "name": "گوجه‌فرنگی", "emoji": "🍅", "unit": "۱ کیلو", "price": 45000, "tags": ["تازه"]},
  {"id": 105, "categoryId": 1, "name": "خیار سالادی", "emoji": "🥒", "unit": "۱ کیلو", "price": 50000, "tags": ["تازه"]},
  {"id": 201, "categoryId": 2, "name": "شیر کم‌چرب", "emoji": "🥛", "unit": "۱ لیتر", "price": 38000, "tags": []},
  {"id": 202, "categoryId": 2, "name": "پنیر لیقوان", "emoji": "🧀", "unit": "۴۰۰ گرم", "price": 165000, "tags": ["محلی"]},
  {"id": 203, "categoryId": 2, "name": "ماست چکیده", "emoji": "🥣", "unit": "۷۵۰ گرم", "price": 69000, "tags": []},
  {"id": 204, "categoryId": 2, "name": "کره حیوانی", "emoji": "🧈", "unit": "۱۰۰ گرم", "price": 70000, "tags": []},
  {"id": 301, "categoryId": 3, "name": "نان سنگک", "emoji": "🫓", "unit": "۱ عدد", "price": 12000, "tags": ["تازه"]},
  {"id": 302, "categoryId": 3, "name": "نان باگت", "emoji": "🥖", "unit": "۱ عدد", "price": 18000, "tags": []},
  {"id": 303, "categoryId": 3, "name": "کیک یزدی", "emoji": "🧁", "unit": "۶ عدد", "price": 95000, "tags": ["محلی"]},
  {"id": 401, "categoryId": 4, "name": "برنج طارم هاشمی", "emoji": "🍚", "unit": "۵ کیلو", "price": 1250000, "tags": ["محلی"]},
  {"id": 402, "categoryId": 4, "name": "عسل کوهستان", "emoji": "🍯", "unit": "۵۰۰ گرم", "price": 420000, "tags": ["محلی"]},
  {"id": 501, "categoryId": 5, "name": "چای لاهیجان", "emoji": "🍵", "unit": "۴۵۰ گرم", "price": 230000, "tags": ["محلی"]},
  {"id": 502, "categoryId": 5, "name": "دوغ محلی", "emoji": "🥤", "unit": "۱.۵ لیتر", "price": 42000, "tags": []},
  {"id": 503, "categoryId": 5, "name": "آب معدنی", "emoji": "💧", "unit": "۱.۵ لیتر", "price": 15000, "tags": []},
  {"id": 504, "categoryId": 5, "name": "آب پرتقال طبیعی", "emoji": "🧃", "unit": "۱ لیتر", "price": 65000, "tags": ["تازه"]},
  {"id": 601, "categoryId": 6, "name": "ران مرغ", "emoji": "🍗", "unit": "۹۰۰ گرم", "price": 210000, "tags": ["تازه"]},
  {"id": 602, "categoryId": 6, "name": "گوشت چرخ‌کرده", "emoji": "🥩", "unit": "۵۰۰ گرم", "price": 450000, "tags": []},
  {"id": 603, "categoryId": 6, "name": "ماهی قزل‌آلا", "emoji": "🐟", "unit": "۱ کیلو", "price": 520000, "tags": ["تازه"]},
  {"id": 701, "categoryId": 7, "name": "پاپ‌کورن", "emoji": "🍿", "unit": "۱ بسته", "price": 35000, "tags": []},
  {"id": 702, "categoryId": 7, "name": "چیپس", "emoji": "🥔", "unit": "۱ بسته", "price": 40000, "tags": []},
]

export const OFFERS: Offer[] = [
  {"productId": 102, "percent": 15, "label": "حراج فصل"},
  {"productId": 104, "percent": 25, "label": "تخفیف روز"},
  {"productId": 105, "percent": 30, "label": "تخفیف روز"},
  {"productId": 201, "percent": 15, "label": "پیشنهاد ویژه"},
  {"productId": 202, "percent": 10, "label": "پیشنهاد ویژه"},
  {"productId": 204, "percent": 20, "label": "تخفیف لبنیات"},
  {"productId": 402, "percent": 20, "label": "تخفیف مهر"},
  {"productId": 501, "percent": 12, "label": "پیشنهاد ویژه"},
  {"productId": 601, "percent": 10, "label": "پیشنهاد ویژه"},
  {"productId": 703, "percent": 15, "label": "تخفیف مهر"}
]


export const STOCK: Stock = {
  updatedAt: "",
  items: { 
    "101": 12, "102": 5, "103": 0, "104": 2, "105": 3,
    "201": 12, "202": 1, "203": 2, "204": 2,
    "301": 10, "302": 1, "303": 3, 
    "401": 2, "402": 5,
    "501": 11, "502": 2, "503": 0, "504": 2,
    "601": 3, "602": 1, "603": 1,
    "701": 4, "702": 0
   },
};
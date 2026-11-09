import type { BannerData, CartLine, Category, Promo, Shop, Product } from '../scripts/types'

export const SHOP: Shop = {
  name: 'سوپرینو',
  slogan: 'سوپرمارکتی تازه و نو',
  owner: '',
  city: 'تهران',
  phone: '021-66562210',
  hours: { open: '08:00', close: '22:00' },
  deliveryFee: 35000,
  freeDeliveryOver: 500000,
  currency: 'تومان',
  notice: '🚚 ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان',
  about: 'کالاهای تازه و باکیفیت با قیمتی منصفانه',
  address: 'تهران، خیابان استاد معین، پلاک ۳۸',
  schedule: [
    { days: 'شنبه تا چهارشنبه', time: '۸ تا ۲۲' },
    { days: 'پنجشنبه و جمعه', time: '۱۰ تا ۲۰' },
  ],
  menu: [
    { label: 'پیشنهاد ویژه', href: '#offers' },
    { label: 'لبنیات', href: '#dairy' },
    { label: 'میوه و سبزیجات', href: '#fruits' },
    { label: 'خواربار و نان', href: '#bread' },
    { label: 'تماس با ما', href: '#contact' },
  ],
  copyright: '© ۱۴۰۵ سوپرینو · عضو دار و دسته چهل‌نفره',
}

export const CATEGORIES: Category[] = [
  { id: 1, slug: 'dairy', name: 'لبنیات', image: '/svgs/dairies.svg', emoji: '🥛', color: '#cbe4ff' },
  { id: 2, slug: 'fruits', name: 'میوه و سبزیجات', image: '/svgs/fruits.svg', emoji: '🥦', color: '#b7ffbd' },
  { id: 3, slug: 'drinks', name: 'نوشیدنی', image: '/svgs/drinks.svg', emoji: '🍹', color: '#c7cdff' },
  { id: 4, slug: 'cleaner', name: 'دستمال و شوینده', image: '/svgs/cleaner.svg', emoji: '🧼', color: '#ffd4f0' },
  { id: 5, slug: 'canned', name: 'کنسرو و غذای آماده', image: '/svgs/canned.svg', emoji: '🥫', color: '#c6f8ff' },
  { id: 6, slug: 'desserts', name: 'دسر و خشکبار', image: '/svgs/dessert.svg', emoji: '🧁', color: '#ffc4fb' },
  { id: 7, slug: 'snacks', name: 'تنقلات', image: '/svgs/snacks.svg', emoji: '🍬', color: '#ffd9c2' },
  { id: 8, slug: 'bread', name: 'خواربار و نان', image: '/svgs/bread.svg', emoji: '🍞', color: '#fffcc2' },
  { id: 9, slug: 'protein', name: 'پروتئین و تخم مرغ', image: '/svgs/eggs.svg', emoji: '🥩', color: '#c0936b' },
  { id: 10, slug: 'makeup', name: 'آرایشی و بهداشتی', image: '/svgs/makeup.svg', emoji: '💄', color: '#ffaccd' },
  { id: 11, slug: 'seasoning', name: 'چاشنی و افزودنی', image: '/svgs/sauce.svg', emoji: '🧂', color: '#fbd6ce' },
  { id: 12, slug: 'electronic', name: 'لوازم برقی', image: '/svgs/electronic.svg', emoji: '💡', color: '#d9d9d9' },
]

export type Banner = BannerData & { variant: string }

export const BANNERS: Banner[] = [
  {
    variant: 'banner-fruit',
    title: 'میوه‌های ارگانیک، سبزی‌های تازه',
    text: 'گلچین از بهترین باغ‌های اطراف',
    emoji: '/svgs/bannerFruit.svg',
    cta: { label: 'خرید میوه و سبزی', href: '#fruits' },
  },
  {
    variant: 'banner-sale',
    title: 'تا ۱۰٪ تخفیف لبنیات',
    text: 'فقط تا پایان امروز',
    emoji: '/svgs/bannerDairy.svg',
    cta: { label: 'دیدن محصولات', href: '#dairy' },
  },
]

export const PROMOS: Promo[] = [
  { text: 'تنقلات برای شب‌های پرهیجان', emoji: '/svgs/banner-snacks.svg', href: '#snacks' },
  { text: 'نان داغ، هر روز ساعت ۷', emoji: '/svgs/bread-banner.svg', href: '#bakery' },
]

export const CART_LINES: CartLine[] = [
  { id: 101, name: 'شیر پرچرب حاوی ویتامین D3 میهن', price: 108500, quantity: 2 },
  { id: 102, name: 'شیر کاکائو پرچرب تازه میهن', price: 50400, quantity: 1 },
]

export const PRODUCTS: Product[] = [
  {"id": 101, "categoryId": 2, "name": "شیر کم‌چرب", "emoji": "🥛", "unit": "۱ لیتر", "price": 38000, "tags": []},
  {"id": 102, "categoryId": 2, "name": "پنیر لیقوان", "emoji": "🧀", "unit": "۴۰۰ گرم", "price": 165000, "tags": ["محلی"]},
  {"id": 103, "categoryId": 2, "name": "ماست چکیده", "emoji": "🥣", "unit": "۷۵۰ گرم", "price": 69000, "tags": []},
  ]

  export const OFFERS: Record<number, number> = { 102: 10, 103: 12 }
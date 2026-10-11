/* Amirhossein (Armin) Panahi */
/* Week 2 - Strategic Supermarket - API */


// ----- Apply Strict Mode ----- 
"use strict";


// ----- Config ----- 
const API_BASE = '../../api/';
const API_FILES = ['products', 'categories', 'stock', 'offers', 'shop'];
const SLOW_AFTER_MS = 3000;
const HARD_TIMEOUT_MS = 30000;
const CART_KEY = 'armin-market:cart';
const OFFERS_VIEW = 'offers';

const BRAND = {
  name: 'سوپرمارکت آرمین',
  tagline: 'همه‌چیز برای یک خرید خوب',
  address: 'تهران، میدان ونک، پلاک 10',
  phones: [
    { label: 'تلفن ثابت', text: '۰۲۱-۱۲۳۴۵۶۷۸', tel: '+982112345678', icon: 'i-phone' },
    { label: 'پشتیبانی موبایل', text: '۰۹۱۲-۱۲۳-۴۵۶۷', tel: '+989121234567', icon: 'i-smartphone' },
  ],
  email: 'info@arminmarket.ir',
  social: [
    { label: 'اینستاگرام', href: 'https://instagram.com/arminmarket', icon: 'i-instagram' },
    { label: 'تلگرام', href: 'https://t.me/arminmarket', icon: 'i-telegram' },
    { label: 'واتس‌اپ', href: 'https://wa.me/989121234567', icon: 'i-whatsapp' },
  ],
  copyright: '© ۱۴۰۵ تمامی حقوق برای سوپرمارکت آرمین محفوظ است.',
};

const IMG = './assets/images/';
const HERO_ART = [
  ['broccoli', 'کلم بروکلی', 560, 559],
  ['carrot', 'هویج', 357, 560],
  ['pepper', 'فلفل دلمه‌ای سبز', 502, 560],
  ['tomato', 'گوجه‌فرنگی', 541, 560],
  ['orange', 'پرتقال تامسون', 560, 466],
  ['strawberry', 'توت‌فرنگی', 518, 560],
];

const PRODUCT_ART = [
  ['', /سیب ?زمینی/],
  ['strawberry', /چیپس ?توت/],
  ['plain-chips', /چیپس|لواشک/],
  ['popcorn', /پاپ ?کورن/],
  ['butter-biscuit', /بیسکویت|کلوچه/],
  ['croissant', /کروسان/],
  ['chocolate-donut', /دونات/],
  ['vanilla-cupcake', /کاپ ?کیک|کیک/],
  ['dark-chocolate', /شکلات/],
  ['fruit-candy', /آب ?نبات|پاستیل/],
  ['salted-peanuts', /بادام ?زمینی|آجیل/],
  ['orange-juice', /آب ?میوه|آب ?پرتقال/],
  ['mineral-water', /آب ?معدنی/],
  ['cola', /نوشابه|کولا/],
  ['sour-cherry-syrup', /شربت|آلبالو/],
  ['black-tea', /چای/],
  ['instant-coffee', /قهوه|نسکافه/],
  ['vanilla-ice-cream', /بستنی/],
  ['low-fat-milk', /(^| )شیر( |$)/],
  ['butter', /(^| )کره( |$)/],
  ['cheese', /پنیر/],
  ['yogurt', /ماست/],
  ['eggs', /تخم/],
  ['chicken-thigh', /ران ?مرغ/],
  ['chicken-breast', /سینه|مرغ/],
  ['veal-striploin', /راسته|گوساله|گوسفند/],
  ['ground-meat', /چرخ ?کرده/],
  ['trout', /ماهی|قزل/],
  ['sausage', /سوسیس|کالباس/],
  ['lavash-bread', /لواش/],
  ['gandomin-bread', /گندمین|سنگک|بربری|تافتون/],
  ['whole-grain-toast', /نان ?تست|تست|سبوس|باگت/],
  ['banana', /موز/],
  ['red-apple', /سیب/],
  ['carrot', /هویج/],
  ['orange', /پرتقال|پرتغال|نارنگی/],
  ['tomato', /گوجه/],
  ['cucumber', /خیار/],
];

const CATEGORY_ART = [
  ['produce', /fruit|produce|vegetable/i, /میوه|سبزی/],
  ['dairy', /dairy/i, /لبنیات/],
  ['bakery', /bakery|bread/i, /نان|شیرینی/],
  ['protein', /protein|meat/i, /پروتئین|گوشت/],
  ['drinks', /drink|beverage/i, /نوشیدنی/],
  ['snacks', /snack/i, /تنقلات/],
];

const BANNER_ART = [
  ['hero/breakfast-basket.png', /صبحانه/, [240, 240]],
  ['hero/hot-bread.png', /نان|شیرینی/, [240, 240]],
  ['hero/dairy.webp', /لبنیات|شیر|پنیر|ماست/, [560, 348]],
];



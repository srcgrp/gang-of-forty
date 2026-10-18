const IMAGE_MAP = {
  101: 'assets/images/products/p-apple.webp',
  102: 'assets/images/products/p-orange.webp',
  103: 'assets/images/products/p-banana.webp',
  106: 'assets/images/products/p-grape.webp',
  108: 'assets/images/products/p-strawberry.webp',
  109: 'assets/images/products/p-mango.webp',
  201: 'assets/images/products/p-milk.webp',
  202: 'assets/images/products/p-cheese.webp',
  203: 'assets/images/products/p-yogurt.webp',
  204: 'assets/images/products/p-butter.webp',
  206: 'assets/images/products/p-egg.webp',
  207: 'assets/images/products/p-cream.webp',
  502: 'assets/images/products/p-dough.webp',
};

const CATEGORY_IMAGE_MAP = {
  fruits: 'assets/images/categories/cat-fruits.webp',
  dairy: 'assets/images/categories/cat-dairy.webp',
  grocery: 'assets/images/categories/cat-grocery.webp',
  beverages: 'assets/images/categories/cat-beverages.webp',
  hygiene: 'assets/images/categories/cat-hygiene.webp',
  snacks: 'assets/images/categories/cat-snacks.webp',
  breakfast: 'assets/images/categories/cat-breakfast.webp',
  nuts: 'assets/images/categories/cat-nuts.webp',
  protein: 'assets/images/categories/cat-meat.webp',
  canned: 'assets/images/categories/cat-canned.webp',
  spice: 'assets/images/categories/cat-spice.webp',
  kalabarg: 'assets/images/categories/cat-kalabarg.webp',
  baby: 'assets/images/categories/cat-baby.webp',
  pet: 'assets/images/categories/cat-pet.webp',
  tissue: 'assets/images/categories/cat-tissue.webp',
  home: 'assets/images/categories/cat-home.webp',
  digital: 'assets/images/categories/cat-digital.webp',
  fashion: 'assets/images/categories/cat-fashion.webp',
  smoking: 'assets/images/categories/cat-smoking.webp',
};

const CATEGORIES_EXTRA = [
  { id: 8,  slug: 'nuts',     name: 'خشکبار و شیرینی',    emoji: '🥜', color: '#fbe9d8' },
  { id: 9,  slug: 'protein',  name: 'پروتئین و تخم‌مرغ',  emoji: '🍗', color: '#fbe0e6' },
  { id: 10, slug: 'canned',   name: 'کنسرو و غذای آماده', emoji: '🥫', color: '#e7eef7' },
  { id: 11, slug: 'spice',    name: 'چاشنی و افزودنی',    emoji: '🧂', color: '#f7e6da' },
  { id: 12, slug: 'kalabarg', name: 'محصولات کالابرگی',   emoji: '🎁', color: '#e9e6f7' },
  { id: 13, slug: 'baby',     name: 'کودک و نوزاد',       emoji: '🍼', color: '#fce6ef' },
  { id: 14, slug: 'pet',      name: 'پت شاپ',             emoji: '🐾', color: '#e5f1ec' },
  { id: 15, slug: 'tissue',   name: 'دستمال و شوینده',    emoji: '🧻', color: '#e3edf5' },
  { id: 16, slug: 'home',     name: 'خانه و سبک زندگی',   emoji: '🏠', color: '#f0e9e0' },
  { id: 17, slug: 'digital',  name: 'لوازم برقی',         emoji: '🔌', color: '#e0e8f0' },
  { id: 18, slug: 'fashion',  name: 'مد و پوشاک',         emoji: '👕', color: '#f3e4ec' },
  { id: 19, slug: 'smoking',  name: 'دخانیات',            emoji: '🚬', color: '#e8e8e8' },
];

const BANNER_IMAGE_MAP = [
  'assets/images/banners/banner-1.webp',
  'assets/images/banners/banner-2.webp',
  'assets/images/banners/banner-3.webp',
  'assets/images/banners/banner-4.webp',
  'assets/images/banners/banner-5.webp',
];

const SHOP_OVERRIDES = {
  name: 'شاردینگ مارکت',
  slogan: 'سوپرمارکت فوری محله شما',
  owner: 'شرکت فناوران شاردینگ',
  phone: '۰۲۱-۹۱۰۰۰۰۰۰',
  phoneLink: '+982191000000',
  email: 'support@sharding.ir',
  address: 'تهران، خیابان ولیعصر',
  about: 'سوپرمارکت فوری محله شما با ارسال سریع و تازه. سفارش خود را تا نیمه‌شب ثبت کنید و فردا صبح تحویل بگیرید.',
  copyright: 'کلیه حقوق اين سايت متعلق به شرکت فناوران شاردینگ است.',
  notice: 'ارسال رایگان برای سفارش‌های بالای ۵۰۰٬۰۰۰ تومان',
  searchPlaceholder: 'جستجوی محصول، برند یا دسته‌بندی…',

  topbarLinks: [
    { label: 'پیگیری سفارش', href: '#' },
    { label: 'سؤالات متداول', href: '#' },
    { label: 'تماس با پشتیبانی', href: '#' },
  ],

  menu: [
    { label: 'خانه', href: '#main-content', active: true },
    { label: 'میوه و سبزیجات', href: '#fruits' },
    { label: 'لبنیات و تخم‌مرغ', href: '#dairy' },
    { label: 'خواروبار', href: '#offers' },
    { label: 'نوشیدنی', href: '#offers' },
    { label: 'شوینده و بهداشتی', href: '#offers' },
    { label: 'تخفیف‌ها و پیشنهادها', href: '#offers' },
  ],

  help: [
    { label: 'پیگیری سفارش', href: '#' },
    { label: 'رویه بازگشت کالا', href: '#' },
    { label: 'سؤالات متداول', href: '#' },
    { label: 'حریم خصوصی', href: '#' },
    { label: 'قوانین و مقررات', href: '#' },
  ],

  schedule: [
    { days: 'شنبه تا پنجشنبه', time: '۸ صبح تا ۱۰ شب' },
  ],

  labels: {
    location: 'موقعیت',
    account: 'حساب من',
    cart: 'سبد خرید',
    deptButton: 'همه دسته‌بندی‌ها',
    footerTop: 'بازگشت به بالا',
    footerHelpTitle: 'خدمات مشتریان',
    footerContactTitle: 'تماس با ما',
    footerScheduleTitle: 'ساعت کاری',
    mobileMenuTitle: 'منو',
  },
};

const HOME_OVERRIDES = {
  carousels: [
    {
      id: 'offers',
      title: 'پیشنهادهای ویژه امروز',
      emoji: '🔥',
      source: 'offers',
      sub: 'تا پایان امشب، تا ۳۰٪ تخفیف',
    },
    {
      id: 'fruits',
      title: 'میوه و سبزیجات',
      emoji: '🥬',
      categoryId: 1,
    },
    {
      id: 'dairy',
      title: 'لبنیات و تخم‌مرغ',
      emoji: '🥛',
      categoryId: 2,
    },
  ],
  weeklyTitle: 'پیشنهادهای ویژه هفته',
  categoriesTitle: 'خرید از دسته‌بندی‌ها',
};

const DEPT_MENU_OVERRIDE = [
  {
    label: 'میوه و سبزیجات',
    href: '#fruits',
    modifier: 'fruits',
    columns: [
      { title: 'میوه تازه', links: ['سیب', 'موز', 'پرتقال', 'انگور', 'کیوی'] },
      { title: 'سبزیجات', links: ['کاهو', 'اسفناج', 'جعفری', 'ریحان', 'تره'] },
      { title: 'صیفی‌جات', links: ['گوجه', 'خیار', 'فلفل دلمه', 'بادمجان', 'کدو'] },
    ],
    promo: { image: 'assets/images/promos/promo-fruits.webp', title: 'تازه از مزرعه', desc: 'تا ۳۰٪ تخفیف روی میوه‌های فصل' },
  },
  {
    label: 'لبنیات و تخم‌مرغ',
    href: '#dairy',
    modifier: 'dairy',
    columns: [
      { title: 'شیر و خامه', links: ['شیر پرچرب', 'شیر کم‌چرب', 'خامه صبحانه', 'خامه قنادی'] },
      { title: 'پنیر', links: ['پنیر سفید', 'پنیر پیتزا', 'پنیر خامه‌ای', 'پنیر لیقوان'] },
      { title: 'ماست و تخم‌مرغ', links: ['ماست پرچرب', 'ماست کم‌چرب', 'دوغ سنتی', 'تخم‌مرغ محلی'] },
    ],
    promo: { image: 'assets/images/promos/promo-dairy.webp', title: 'لبنیات و تخم‌مرغ', desc: 'ارسال روزانه از دامداری‌های محلی' },
  },
  {
    label: 'خواروبار',
    href: '#offers',
    modifier: 'grocery',
    columns: [
      { title: 'برنج و حبوبات', links: ['برنج هاشمی', 'برنج طارم', 'لوبیا چیتی', 'عدس'] },
      { title: 'روغن و سرکه', links: ['روغن زیتون', 'روغن آفتابگردان', 'سرکه سیب', 'سرکه بالزامیک'] },
      { title: 'ماکارونی و ادویه', links: ['ماکارونی رشته', 'ماکارونی فرمی', 'زردچوبه', 'فلفل سیاه'] },
    ],
    promo: { image: 'assets/images/promos/promo-grocery.webp', title: 'خرید عمده', desc: 'تخفیف ویژه روی بسته‌های خانواده' },
  },
  {
    label: 'نوشیدنی',
    href: '#offers',
    modifier: 'beverages',
    columns: [
      { title: 'آبمیوه', links: ['آب‌پرتقال', 'آب‌سیب', 'آب‌انار'] },
      { title: 'چای و قهوه', links: ['چای سیاه', 'چای سبز', 'قهوه ترک', 'قهوه اسپرسو'] },
      { title: 'نوشابه و آب', links: ['نوشابه خانواده', 'آب معدنی', 'دمنوش گیاهی'] },
    ],
    promo: { image: 'assets/images/promos/promo-beverages.webp', title: 'خنک و تازه', desc: 'نوشیدنی‌های سرد با تخفیف ویژه' },
  },
  {
    label: 'شوینده و بهداشتی',
    href: '#offers',
    modifier: 'hygiene',
    columns: [
      { title: 'شوینده ظرف', links: ['مایع ظرفشویی', 'اسفنج', 'دستکش'] },
      { title: 'شوینده لباس', links: ['پودر ماشین', 'مایع دستشویی', 'نرم‌کننده'] },
      { title: 'بهداشت شخصی', links: ['شامپو', 'صابون', 'خمیردندان', 'دستمال کاغذی'] },
    ],
    promo: { image: 'assets/images/promos/promo-hygiene.webp', title: 'خانه تمیز', desc: 'ست کامل شوینده با قیمت ویژه' },
  },
  {
    label: 'تخفیف‌ها و پیشنهادها',
    href: '#offers',
    modifier: 'deals',
    columns: [
      { title: 'پیشنهاد روز', links: ['تخفیف میوه', 'تخفیف لبنیات', 'تخفیف نوشیدنی'] },
      { title: 'پیشنهاد هفته', links: ['جعبه میوه', 'سبد صبحانه', 'بسته خانواده'] },
      { title: 'کوپن‌ها', links: ['کوپن تخفیف', 'ارسال رایگان', 'هدیه خرید'] },
    ],
    promo: { image: 'assets/images/promos/promo-deals.webp', title: 'تا ۴۰٪ تخفیف', desc: 'فرصت محدود — همین حالا خرید کنید' },
  },
];


function enrichProduct(product) {
  return { ...product, image: product.image || IMAGE_MAP[product.id] || null };
}

function enrichCategory(category) {
  return { ...category, image: category.image || CATEGORY_IMAGE_MAP[category.slug] || null };
}

function enrichCategories(apiCategories) {
  const existingSlugs = new Set(apiCategories.map((c) => c.slug));
  const extra = CATEGORIES_EXTRA.filter((c) => !existingSlugs.has(c.slug));
  return [...apiCategories, ...extra].map(enrichCategory);
}

function enrichHome(home) {
  const banners = Array.isArray(home.banners) && home.banners.length
    ? home.banners.map((b, i) => ({ ...b, image: b.image || BANNER_IMAGE_MAP[i] || null }))
    : BANNER_IMAGE_MAP.map((image, i) => ({
        image,
        alt: `بنر ${i + 1}`,
        href: '#offers',
      }));
  return { ...home, ...HOME_OVERRIDES, banners };
}

function enrichShop(shop) {
  return { ...shop, ...SHOP_OVERRIDES, deptMenu: DEPT_MENU_OVERRIDE };
}
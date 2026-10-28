export const API_PATHS = {
  products: "/api/products.json",
  stock: "/api/stock.json",
  offers: "/api/offers.json",
  categories: "/api/categories.json",
  shop: "/api/shop.json",
  home: "/api/home.json",
} as const;

export const USER_MESSAGES = {
  offline:
    "اتصال به اینترنت برقرار نیست یا سرور پاسخ نمی‌دهد. اتصال خود را بررسی کنید و دوباره تلاش کنید.",
  unavailable:
    "اطلاعات فروشگاه در حال حاضر در دسترس نیست. لطفاً کمی بعد دوباره تلاش کنید.",
  badData:
    "اطلاعات فروشگاه به‌درستی دریافت نشد. لطفاً کمی بعد دوباره تلاش کنید.",
  unknown: "مشکلی پیش آمد. لطفاً صفحه را دوباره بارگذاری کنید.",
} as const;

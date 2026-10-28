const API_URL: string = import.meta.env.VITE_API_URL;

export const API_PATHS = {
  products: `${API_URL}/products.json`,
  stock: `${API_URL}/stock.json`,
  offers: `${API_URL}/offers.json`,
  categories: `${API_URL}/categories.json`,
  shop: `${API_URL}/shop.json`,
  home: `${API_URL}/home.json`,
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

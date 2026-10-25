import type { AppData, ProductView } from '../types';
import { API_FILES } from '../types';
import { getJSON } from './client';
import { isCategory, isOffer, isProduct, isStock, readList, uniqueBy } from './guards';
import { isHome, isShop } from './page-guards';

export const loadShop = async (signal: AbortSignal): Promise<AppData> => {
  const [rawProducts, rawStock, rawOffers, rawCategories, home, shop] = await Promise.all(
    API_FILES.map((file) => getJSON(file, signal)),
  );
  if (!isStock(rawStock)) throw new Error('ساختار موجودی کالا معتبر نیست.');
  if (!isHome(home)) throw new Error('ساختار تنظیمات صفحهٔ اصلی معتبر نیست.');
  if (!isShop(shop)) throw new Error('ساختار اطلاعات فروشگاه معتبر نیست.');
  const notices: string[] = [];
  const categories = uniqueBy(readList(rawCategories, isCategory, 'categories.json', notices), (c) => c.id, notices);
  const distinctCategories = uniqueBy(categories, (c) => c.slug, notices);
  const categoryIds = new Set(distinctCategories.map((category) => category.id));
  const products = uniqueBy(readList(rawProducts, isProduct, 'products.json', notices), (p) => p.id, notices);
  const offers = uniqueBy(readList(rawOffers, isOffer, 'offers.json', notices), (o) => o.productId, notices);
  const offerMap = new Map(offers.map((offer) => [offer.productId, offer]));
  const validProducts = products.filter((product) => categoryIds.has(product.categoryId));
  if (validProducts.length < products.length) {
    console.warn(`products.json: ${products.length - validProducts.length} product(s) with an unknown category were skipped.`);
    notices.push('محصول دارای دسته‌بندی ناشناخته کنار گذاشته شد.');
  }
  const views: ProductView[] = validProducts.map((product): ProductView => {
    const percent = offerMap.get(product.id)?.percent ?? 0;
    return { ...product, originalPrice: product.price, percent,
      price: Math.round(product.price * (1 - percent / 100)),
      stock: rawStock.items[String(product.id)] ?? 0 };
  });
  return { products: views, categories: distinctCategories, home, shop, notices };
};

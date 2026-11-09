import type { Offer, LoadState } from '../types';
import { loadShop } from './shop';
import { loadHome } from './home';
import { loadCategories } from './categories';
import { loadProducts } from './products';
import { loadOffers } from './offers';
import { loadStock } from './stock';
import { HTTPError } from './get-json';

export async function loadAllData() {
  const [shopResult, homeResult, categoriesResult, productsResult, offersResult, stockResult] = await Promise.allSettled([
    loadShop(),
    loadHome(),
    loadCategories(),
    loadProducts(),
    loadOffers(),
    loadStock(),
  ]);

  const shop = shopResult.status === 'fulfilled' ? shopResult.value : null;
  const home = homeResult.status === 'fulfilled' ? homeResult.value : null;
  const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];
  const products = productsResult.status === 'fulfilled' ? productsResult.value : [];
  const offers = offersResult.status === 'fulfilled' ? offersResult.value : [];
  const offerMap = new Map<number, Offer>(offers.map((offer) => [offer.productId, offer]));
  const stock = stockResult.status === 'fulfilled' ? stockResult.value : null;

  let res: LoadState = { status: 'loading' };
  if (productsResult.status === 'rejected') {
    let message = 'داده‌های دریافتی معتبر نبودند. لطفاً بعداً دوباره تلاش کنید.';
    if (productsResult.reason instanceof Error) {
      if (productsResult.reason.name === 'AbortError') {
        message = 'زمان انتظار برای دریافت داده به پایان رسید. لطفاً دوباره تلاش کنید.';
      } else if (productsResult.reason instanceof HTTPError) {
        message = 'سرور در دسترس نیست. لطفاً اتصال اینترنت را بررسی کنید.';
      } else if (productsResult.reason instanceof TypeError) {
        message = 'اتصال اینترنت خود را بررسی کنید.';
      }
    }
    res = { status: 'error', message };
  } else if (products.length === 0) {
    res = { status: 'empty' };
  } else {
    res = { status: 'success', products };
  }

  return { shop, home, categories, products, offerMap, stock, res };
}

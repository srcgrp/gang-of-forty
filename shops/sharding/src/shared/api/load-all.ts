import type { Offer, LoadState } from '../types';
import { loadShop } from './shop';
import { loadHome } from './home';
import { loadCategories } from './categories';
import { loadProducts } from './products';
import { loadOffers } from './offers';
import { loadStock } from './stock';
import { HTTPError } from './get-json';

export async function loadAllData() {
  const [s, h, c, p, o, st] = await Promise.allSettled([
    loadShop(), loadHome(), loadCategories(), loadProducts(), loadOffers(), loadStock()
  ]);

  const shop = s.status === 'fulfilled' ? s.value : null;
  const home = h.status === 'fulfilled' ? h.value : null;
  const categories = c.status === 'fulfilled' ? c.value : [];
  const products = p.status === 'fulfilled' ? p.value : [];
  const offerMap = o.status === 'fulfilled' ? new Map(o.value.map(x => [x.productId, x])) : new Map<number, Offer>();
  const stock = st.status === 'fulfilled' ? st.value : null;

  let res: LoadState = { status: 'loading' };
  if (p.status === 'rejected') {
    let msg = 'داده‌های دریافتی معتبر نبودند. لطفاً بعداً دوباره تلاش کنید.';
    if (p.reason instanceof Error) {
      if (p.reason.name === 'AbortError') msg = 'زمان انتظار برای دریافت داده به پایان رسید. لطفاً دوباره تلاش کنید.';
      else if (p.reason instanceof HTTPError) msg = 'سرور در دسترس نیست. لطفاً اتصال اینترنت را بررسی کنید.';
      else if (p.reason instanceof TypeError) msg = 'اتصال اینترنت خود را بررسی کنید.';
    }
    res = { status: 'error', message: msg };
  } else if (products.length === 0) {
    res = { status: 'empty' };
  } else {
    res = { status: 'success', products };
  }

  return { shop, home, categories, products, offerMap, stock, res };
}
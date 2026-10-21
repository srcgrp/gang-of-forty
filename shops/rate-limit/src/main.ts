import type { ApiResult, Catalog } from './types';
import { SNACKS_CATEGORY_ID } from './types';
import { fetchOffers, fetchProducts, fetchStock } from './api/catalog';
import { buildCatalog, productsInCategory, productsWithOffer } from './logic/pricing';
import { renderSection } from './ui/sectionState';

const LOAD_ERROR_TEXT = 'خطا در بارگذاری اطلاعات. لطفاً اتصال اینترنت خود را بررسی کنید.';
const NO_OFFERS_TEXT = 'در حال حاضر پیشنهاد ویژه‌ای وجود ندارد.';
const NO_SNACKS_TEXT = 'محصولی در این دسته یافت نشد.';

function toResult(catalog: Catalog): ApiResult<Catalog> {
  return catalog.products.length === 0
    ? { status: 'empty' }
    : { status: 'success', data: catalog };
}

async function init(): Promise<void> {
  const specialOffersList = document.querySelector<HTMLElement>('#special-offers .carousel-list');
  const snacksList = document.querySelector<HTMLElement>('#snacks .carousel-list');

  const loading: ApiResult<Catalog> = { status: 'loading' };
  if (specialOffersList) renderSection(specialOffersList, loading, NO_OFFERS_TEXT);
  if (snacksList) renderSection(snacksList, loading, NO_SNACKS_TEXT);

  try {
    const [products, stock, offers] = await Promise.all([
      fetchProducts(),
      fetchStock(),
      fetchOffers(),
    ]);
    const catalog = buildCatalog(products, stock, offers);

    if (specialOffersList) {
      const state = toResult({ ...catalog, products: productsWithOffer(catalog) });
      renderSection(specialOffersList, state, NO_OFFERS_TEXT);
    }
    if (snacksList) {
      const state = toResult({
        ...catalog,
        products: productsInCategory(catalog, SNACKS_CATEGORY_ID),
      });
      renderSection(snacksList, state, NO_SNACKS_TEXT);
    }
  } catch (error) {
    console.error(error);
    const failed: ApiResult<Catalog> = { status: 'error', message: LOAD_ERROR_TEXT };
    if (specialOffersList) renderSection(specialOffersList, failed, NO_OFFERS_TEXT);
    if (snacksList) renderSection(snacksList, failed, NO_SNACKS_TEXT);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  void init();
});

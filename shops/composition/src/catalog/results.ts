import type { SearchState, ShopData, CardView } from "../types";
import { createSearch, normalizeSearch } from "./search";
import { readSortOption, sortProducts } from "./sorting";
import { offersById, toCards } from "./cards";
import { formatNumber } from "./format";
export function cleanSearch(state: SearchState, data: ShopData): SearchState {
  return { query: state.query,
    category: data.categories.some(category => category.slug === state.category) ? state.category : "",
    sort: readSortOption(state.sort) };
}
export function createResults(data: ShopData):
  (state: SearchState) => { cards: CardView[]; active: boolean; message: string } {
  const search = createSearch(data.products);
  const offers = offersById(data.offers);
  return state => {
    const query = normalizeSearch(state.query);
    let products = query ? search(query) : data.products;
    const category = data.categories.find(item => item.slug === state.category);
    if (category) products = products.filter(product => product.categoryId === category.id);
    products = sortProducts(products, readSortOption(state.sort));
    const message = products.length ? formatNumber(products.length) + " محصول پیدا شد." :
      "محصولی پیدا نشد. عبارت یا دسته‌بندی دیگری انتخاب کنید.";
    return { cards: toCards(products, data.stock, offers),
      active: query !== "" || Boolean(category), message };
  };
}

import type { Cart, CatalogItem, CategorySection, LoadState } from "./types";
import { fetchRawCatalog } from "./api/catalog";
import { describeError } from "./api/errors";
import { loadCart, saveCart } from "./storage/cart";
import { addItem, canAdd, countItems, quantityOf } from "./cart/rules";
import { buildCatalog } from "./catalog/build";
import { groupByCategory } from "./catalog/group";
import { errorState, toLoadState } from "./catalog/state";
import { cardView, maxedLabel } from "./format/card";
import { withCountText } from "./format/categories";
import { toPersianDigits } from "./format/digits";
import { DEFAULT_CURRENCY } from "./format/price";
import { setupSpecialArrows } from "./ui/arrows";
import { createCard } from "./ui/card";
import { emitCartAdd, lockButton, playAdded, showCartCount } from "./ui/cart";
import { setupCategoryDropdown } from "./ui/dropdown";
import { convertPage } from "./ui/page";
import { renderCategories, renderSpecials } from "./ui/sections";

let cart: Cart = loadCart();
let currency = DEFAULT_CURRENCY;

const makeCard = (item: CatalogItem): HTMLElement =>
  createCard(cardView(item, currency, quantityOf(cart, item.id)), (button) =>
    handleAdd(item, button)
  );

function handleAdd(item: CatalogItem, button: HTMLButtonElement): void {
  if (!canAdd(cart, item)) return;
  cart = addItem(cart, item);
  saveCart(cart);
  showCartCount(toPersianDigits(countItems(cart)));
  emitCartAdd({ product: item, quantity: quantityOf(cart, item.id) });
  playAdded(button);
  if (!canAdd(cart, item)) lockButton(button, maxedLabel(item));
}

type State = LoadState<CatalogItem>;

function paint(specials: State, items: State, sections: CategorySection[]): void {
  renderSpecials(specials, makeCard, start);
  renderCategories(items, sections, makeCard, start);
}

async function start(): Promise<void> {
  paint({ status: "loading" }, { status: "loading" }, []);
  try {
    const raw = await fetchRawCatalog();
    if (raw.shop) currency = raw.shop.currency;
    const catalog = buildCatalog(raw.products, raw.offers, raw.stock, raw.categories);
    const sections = withCountText(groupByCategory(catalog.items, catalog.categories));
    paint(toLoadState(catalog.specials), toLoadState(catalog.items), sections);
  } catch (err) {
    console.error(err);
    const failed = errorState(describeError(err));
    paint(failed, failed, []);
  }
}

convertPage(toPersianDigits);
setupCategoryDropdown();
setupSpecialArrows();
showCartCount(toPersianDigits(countItems(cart)));
void start();

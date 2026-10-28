import { asApiFailure, loadWithSlowNotice } from './api/load-slow';
import * as cart from './features/cart/cart';
import { buildModel, emptyModel, productView } from './features/products/products';
import { loadCart, saveCart, watchCart } from './storage/cart-storage';
import * as url from './storage/url-state';
import type { DrawOptions, LoadState } from './types';
import * as ui from './ui/page';
let model = emptyModel();
let load: LoadState = { status: 'loading' };
let lines = loadCart();
let pending: string | null = null;
const quantityOf = (id: number): number => cart.qtyOf(lines, id);
const basket = (bump = false): void =>
  ui.drawBasket(cart.cartView(lines, model.items, load.status === 'success' || load.status === 'empty'), model.items, quantityOf, bump);
function render(options: DrawOptions = {}): void {
  ui.renderStatus(load, () => ui.render({ model, products: productView(model, url.readRoute()), home: url.homePath(),
    hashId: url.readHashId(), linkOf: url.catalogUrl, cartIds: lines.map((line) => line.productId), qtyOf: quantityOf }, options),
  load.status === 'error' ? load.failure : undefined);
  basket();
}
function search(text: string): void {
  url.writeQuery(text);
  pending = null;
  render();
}
function change(id: number, direction: 'add' | 'remove', celebrate: boolean): void {
  if (load.status === 'success') {
    const next = cart.changeCart(lines, model.items, id, direction);
    if (next && next.after !== next.before) {
      lines = next.lines;
      saveCart(lines);
      if (next.after > next.before) ui.notifyAdded(next.name, celebrate);
      basket(next.after > next.before);
      ui.announceQuantity(next.name, next.after, cart.cartCount(lines));
    } else if (next && direction === 'add') ui.announceLimit(next.name);
  }
}
async function start(): Promise<void> {
  load = { status: 'loading' };
  render();
  try {
    const data = await loadWithSlowNotice(ui.showSlowNotice);
    model = buildModel(data);
    lines = cart.reconcileCart(lines, (id) => model.items.get(id)?.stock ?? 0);
    saveCart(lines);
    load = data.products.length ? { status: 'success', products: data.products } : { status: 'empty' };
    if (pending !== null) url.writeQuery(pending);
    pending = null;
    render();
    ui.enter();
  } catch (error: unknown) {
    model = emptyModel();
    const failure = asApiFailure(error);
    load = { status: 'error', message: ui.ERROR_TEXT[failure.kind], failure };
    render();
  }
}
ui.bindUi({ retry: () => { void start(); }, edit: (text) => { pending = text; }, search, change,
  navigate: (href) => { pending = null; url.goToUrl(href); ui.transition(() => render({ focus: true, top: 0 })); },
  section: (href) => { if (url.readRoute().type !== 'home' && href !== '#contact') url.goToUrl(url.homePath() + href); else url.pushHash(href); render({ smooth: true }); },
}, url.readRoute());
window.addEventListener('popstate', (event: PopStateEvent) => { pending = null; ui.resetNavigation(); render({ top: url.savedScroll(event.state) ?? 0 }); });
window.addEventListener('hashchange', () => render());
watchCart((saved) => {
  lines = load.status === 'success' || load.status === 'empty' ? cart.reconcileCart(saved, (id) => model.items.get(id)?.stock ?? 0) : saved;
  basket();
});
void start();
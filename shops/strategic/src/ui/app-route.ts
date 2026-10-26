/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { closeCart } from './cart-panel';
import { qtyOfCart } from './context';
import type { Context } from './context';
import { matchesFor } from './app-matches';
import { drawRoute } from './draw-route';
import { playEnter, swapView } from './motion';
import { syncLocation } from './nav-sync';
import { scrollToElement } from './scroll';

export function render(ctx: Context, opts: { focus?: boolean; smooth?: boolean } = {}): void {
  const { state, ports } = ctx;
  if (!state.ready) return;
  const route = ports.readRoute();
  state.renderedSearch = ports.readSearch();
  drawRoute({
    model: state.model,
    route,
    home: ports.homePath(),
    hashId: ports.readHashId(),
    pendingQuery: state.pendingQuery,
    matches: matchesFor(ctx, route),
    cartIds: state.cart.map((line) => line.productId),
    qtyOf: qtyOfCart(ctx),
  }, opts);
}

export async function navigate(
  ctx: Context,
  url: string,
  { replace = false, focus = true, animate = true }: { replace?: boolean; focus?: boolean; animate?: boolean } = {},
): Promise<void> {
  ctx.ports.goToUrl(url, replace);
  closeCart();
  const show = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    render(ctx, { focus, smooth: true });
  };
  if (animate) {
    await swapView(show);
  } else {
    show();
    playEnter();
  }
}

export function goBack(ctx: Context): void {
  const { ports } = ctx;
  if (ports.hasAppHistory()) ports.goBackInHistory();
  else void navigate(ctx, ports.homePath(), { replace: true });
}

export function goToSection(ctx: Context, href: string, target: HTMLElement): void {
  closeCart();
  ctx.ports.pushHash(href);
  syncLocation(ctx.ports.readHashId());
  void scrollToElement(target);
}
/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { LoadState } from '../types';
import { announce } from './announce';
import { reconcileStored } from './app-cart';
import { render } from './app-route';
import { showSearch } from './app-search';
import type { Context } from './context';
import { ERROR_TEXT } from './error-text';
import { renderFooterData } from './footer-data';
import { renderNav, renderNotice } from './header';
import { playEnter } from './motion';
import { showSlowNotice } from './skeleton';
import { renderStatus } from './status';

export async function start(ctx: Context): Promise<void> {
  const { state, ports } = ctx;
  renderStatus({ status: 'loading' }, () => undefined);

  try {
    const data = await ports.loadWithSlowNotice(showSlowNotice);
    state.model = ports.buildModel(data);
    state.ready = true;

    renderNotice(state.model.shop);
    renderNav(state.model);
    renderFooterData(state.model);
    reconcileStored(ctx);

    const next: LoadState = data.products.length > 0 ? { status: 'success', products: data.products } : { status: 'empty' };
    renderStatus(next, () => render(ctx));

    if (next.status === 'success') {
      playEnter();
      if (state.pendingQuery && ports.readRoute().type === 'home') showSearch(ctx, state.pendingQuery);
    }
    state.pendingQuery = '';
  } catch (error: unknown) {
    state.model = ports.emptyModel();
    state.ready = false;
    const failure = ports.asApiFailure(error);
    renderStatus({ status: 'error', message: ERROR_TEXT[failure.kind] ?? ERROR_TEXT.network }, () => undefined, failure);
    announce('بارگذاری محصولات ممکن نشد.');
  }
}
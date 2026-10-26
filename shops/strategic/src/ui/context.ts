/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ApiData, ApiFailure, AppState, CartItem, CartLine, ProductItem, QtyOf, Route, ShopModel, Sort } from '../types';

export type Ports = {
  // data: api and storage
  loadWithSlowNotice: (onSlow: () => void) => Promise<ApiData>;
  asApiFailure: (error: unknown) => ApiFailure;
  loadCart: () => CartLine[];
  saveCart: (cart: readonly CartLine[]) => void;
  cartKey: string;
  readRoute: () => Route;
  readSearch: () => string;
  readHashId: () => string;
  hasHash: () => boolean;
  homePath: () => string;
  routeUrl: (route: Route) => string;
  hasAppHistory: () => boolean;
  savedScroll: (state: unknown) => number | undefined;
  goToUrl: (url: string, replace: boolean) => void;
  replaceSearchUrl: (url: string) => void;
  pushHash: (href: string) => void;
  goBackInHistory: () => void;
  // logic: catalog and cart
  buildModel: (raw: ApiData) => ShopModel;
  emptyModel: () => ShopModel;
  visibleProducts: (index: ShopModel['searchIndex'], query: string, sort?: Sort) => ProductItem[];
  qtyOf: (cart: readonly CartLine[], id: number) => number;
  addToCart: (cart: readonly CartLine[], id: number, limit: number) => CartLine[];
  removeFromCart: (cart: readonly CartLine[], id: number, limit: number) => CartLine[];
  reconcileCart: (cart: readonly CartLine[], limitOf: QtyOf) => CartLine[];
  cartCount: (cart: readonly CartLine[]) => number;
  cartRows: (cart: readonly CartLine[], items: ReadonlyMap<number, ProductItem>) => CartItem[];
  cartTotal: (rows: readonly CartItem[]) => { total: number; oldTotal: number };
};

export type Context = { state: AppState; ports: Ports };

export const qtyOfCart = ({ state, ports }: Context): QtyOf => (id) => ports.qtyOf(state.cart, id);
/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ShopModel } from '../../types';

export const emptyModel = (): ShopModel => ({
  products: [], categories: [], offers: [],
  shop: {
    name: '', slogan: '', owner: '', city: '', phone: '', hours: { open: '', close: '' },
    deliveryFee: 0, freeDeliveryOver: 0, currency: '', notice: '', about: '', address: '',
    schedule: [], menu: [], help: [], copyright: '',
  },
  home: { hero: { title: '', text: '', emoji: '' }, side: { title: '', text: '', emoji: '' }, carousels: [], promos: [] },
  stockOf: (_id: number): number => 0,
  items: new Map(), itemsByCategory: new Map(), searchIndex: [], categoryById: new Map(),
  categoryBySlug: new Map(), categoryArt: new Map(), offerItems: [], carousels: [],
});
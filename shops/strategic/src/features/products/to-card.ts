/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Offer, Product, ProductItem } from '../../types';
import { findProductArt } from './art-product';
import { finalPrice, inStock, validPercent } from './price';
import { searchKey } from './search-key';

export function toCard(product: Product, offer: Offer | undefined, stock: number): ProductItem {
  const percent = validPercent(offer?.percent);
  return {
    product,
    art: findProductArt(searchKey(product.name)),
    stock,
    soldOut: !inStock(stock),
    percent,
    oldPrice: percent ? product.price : 0,
    price: percent ? finalPrice(product.price, percent) : product.price,
  };
}
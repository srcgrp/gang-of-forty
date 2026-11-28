import type { Offer, Product, ProductView, StockData } from "../types";

export const toProductViews = (
  products: Product[],
  offers: Offer[],
  stock: StockData,
): ProductView[] => {
  const offerByProduct = new Map<number, Offer>();
  offers.forEach((offer) => offerByProduct.set(offer.productId, offer));

  return products.map((product) => {
    const offer = offerByProduct.get(product.id);
    const quantity = stock.items[String(product.id)];
    return {
      product,
      ...(offer ? { offer } : {}),
      ...(quantity !== undefined ? { stock: quantity } : {}),
    };
  });
};

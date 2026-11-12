
import type { Product, ProductWithDetails } from '../types';

export async function getJSON(url: string): Promise<unknown> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`خطا در دریافت اطلاعات: ${response.status}`);
  }
  return response.json();
}

export function isProduct(item: unknown): item is Product {
  if (typeof item !== 'object' || item === null) return false;
  return (
    'id' in item &&
    (typeof item.id === 'string' || typeof item.id === 'number') &&
    'title' in item && typeof item.title === 'string' &&
    'price' in item && typeof item.price === 'number' &&
    'category' in item && typeof item.category === 'string' &&
    'image' in item && typeof item.image === 'string'
  );
}

export function isStockRecord(
  item: unknown
): item is { id: string | number; stock: number } {
  if (typeof item !== 'object' || item === null) return false;
  return (
    'id' in item &&
    (typeof item.id === 'string' || typeof item.id === 'number') &&
    'stock' in item && typeof item.stock === 'number'
  );
}

export function isOfferItem(
  item: unknown
): item is { productId: string | number; discountPercent: number } {
  if (typeof item !== 'object' || item === null) return false;
  return (
    'productId' in item &&
    (typeof item.productId === 'string' || typeof item.productId === 'number') &&
    'discountPercent' in item &&
    typeof item.discountPercent === 'number'
  );
}

export async function loadShopData(): Promise<ProductWithDetails[]> {
  const [rawProducts, rawStock, rawOffers] = await Promise.all([
    getJSON('/products.json'),
    getJSON('/stock.json'),
    getJSON('/offers.json').catch(() => [])
  ]);

  if (!Array.isArray(rawProducts)) {
    throw new Error('فرمت محصولات نامعتبر است');
  }

  const products = rawProducts.filter(isProduct);
  const stock = Array.isArray(rawStock) ? rawStock : [];
  const offers = Array.isArray(rawOffers) ? rawOffers : [];

  const stockMap = new Map<string, number>();
  stock.filter(isStockRecord).forEach((item) => {
    stockMap.set(String(item.id), item.stock);
  });

  const offerMap = new Map<string, number>();
  offers.filter(isOfferItem).forEach((item) => {
    offerMap.set(String(item.productId), item.discountPercent);
  });

  return products.map((product) => {
    const id = String(product.id);
    const discountPercent = offerMap.get(id) ?? 0;
    const finalPrice = Math.round(
      product.price * (1 - discountPercent / 100)
    );

    return {
      ...product,
      id,
      stock: stockMap.get(id) ?? 0,
      discountPercent,
      finalPrice
    };
  });
}

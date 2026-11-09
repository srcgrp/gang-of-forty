import type { Category } from '../types';
import { CATEGORY_IMAGES } from '../content';

export function withCategoryImages(categories: Category[]): Category[] {
  return categories.map((c) => {
    const img = CATEGORY_IMAGES[c.slug];
    return img ? { ...c, image: img } : c;
  });
}
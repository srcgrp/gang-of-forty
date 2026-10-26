/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Category } from '../types';
import { searchKey } from './search-key';
type CategoryArtRule = readonly [file: string, slugPattern: RegExp, namePattern: RegExp];

const CATEGORY_ART: CategoryArtRule[] = [
  ['produce', /fruit|produce|vegetable/i, /میوه|سبزی/],
  ['dairy', /dairy/i, /لبنیات/],
  ['bakery', /bakery|bread/i, /نان|شیرینی/],
  ['grocery', /pantry|grocery/i, /خواربار/],
  ['drinks', /drink|beverage/i, /نوشیدنی/],
  ['protein', /protein|meat/i, /پروتئین|گوشت/],
  ['snacks', /snack/i, /تنقلات/],
];

export const findCategoryArt = (category: Category): string | null => {
  const name = searchKey(category.name);
  return CATEGORY_ART.find(([, slugTest, nameTest]) => slugTest.test(category.slug) || nameTest.test(name))?.[0] ?? null;
};
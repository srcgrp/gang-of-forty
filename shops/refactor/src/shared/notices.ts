import type { CatalogQuery, Category } from '../types';

export const collectNotices = (
  base: string[], cartChanged: boolean, query: CatalogQuery, categories: Category[],
): string[] => {
  const notices = [...base];
  if (cartChanged) notices.push('سبد خرید با موجودی فعلی هماهنگ شد.');
  if (query.category && !categories.some((category) => category.slug === query.category))
    notices.push('دسته‌بندی درخواستی وجود ندارد؛ می‌توانید فیلتر را پاک کنید.');
  return notices;
};

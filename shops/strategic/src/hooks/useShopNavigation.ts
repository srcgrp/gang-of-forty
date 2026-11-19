import { useLocation, useNavigate, useParams, useSearch } from '@tanstack/react-router';
import type { ShopModel } from '../types';

export function useShopNavigation(model: ShopModel) {
  const { q = '', category, sort } = useSearch({ strict: false });
  const { carouselId } = useParams({ strict: false });
  const pathname = useLocation({ select: (location) => location.pathname });
  const navigate = useNavigate();
  const section = model.carousels.find((entry) => entry.id === carouselId);
  const selectedCategory = category && pathname === '/' ? model.categoryBySlug.get(category) : undefined;
  function search(text: string) {
    const updatedQuery = text.trim() ? { q: text } : {};
    if (pathname === '/checkout' || pathname.startsWith('/product/')) {
      void navigate({ to: '/', search: updatedQuery });
      return;
    }
    const scope = selectedCategory ? { category: selectedCategory.slug } : {};
    void navigate({ to: '.', search: { ...scope, ...(sort ? { sort } : {}), ...updatedQuery }, replace: Boolean(q), resetScroll: false });
  }
  return {
    query: q, search, onHome: pathname === '/' && !q && !selectedCategory,
    categoryId: section?.source === 'offers' ? 0 : section?.categoryId ?? selectedCategory?.id ?? null,
  };
}

import { useContext, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { configuredCarousels } from '../catalog/home-shelves';
import type { Category } from '../types';
import { CatalogContext } from '../hooks/useCatalog';

export type CategoryListProps = { categories: readonly Category[]; categoryId: number | null };
type Props = { category: Category; active: boolean; children: ReactNode; className?: string };

export default function CategoryLink({ category, active, children, className }: Props) {
  const state = useContext(CatalogContext);
  const catalog = state?.status === 'success' || state?.status === 'empty' ? state.data : null;
  const section = catalog && configuredCarousels(catalog).find((item) => item.source !== 'offers' && item.categoryId === category.id);
  if (!section) return (
    <Link to="/" search={{ category: category.slug }} className={className}
      aria-current={active ? 'page' : undefined}>
      {children}
    </Link>
  );
  return (
    <Link to="/plp/$carouselId" params={{ carouselId: section.id }} search={{ sort: 'default' }} activeOptions={{ exact: true, includeSearch: false }}
      aria-current={active ? 'page' : undefined} className={className}>
      {children}
    </Link>
  );
}

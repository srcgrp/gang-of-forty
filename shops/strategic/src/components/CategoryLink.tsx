import type { ReactNode } from 'react';
import type { Category } from '../types';

export type CategoryListProps = {
  categories: readonly Category[];
  categoryId: number | null;
  onPick: (id: number) => void;
};

type CategoryLinkProps = {
  category: Category;
  active: boolean;
  onPick: CategoryListProps['onPick'];
  children: ReactNode;
  className?: string;
};

export default function CategoryLink({ category, active, onPick, children, className }: CategoryLinkProps) {
  return (
    <a aria-current={active ? "page" : undefined} className={className} href={`./?category=${category.slug}`} data-route=""
      onClick={event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        onPick(category.id);
      }}>
      {children}
    </a>
  );
}
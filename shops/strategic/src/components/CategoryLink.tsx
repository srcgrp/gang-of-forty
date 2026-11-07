import type { ReactNode } from 'react';
import type { Category } from '../types';

export type CategoryListProps = {
  categories: readonly Category[];
  onPick: (slug: string) => void;
};

type CategoryLinkProps = {
  category: Category;
  onPick: CategoryListProps['onPick'];
  children: ReactNode;
  className?: string;
};

export default function CategoryLink({ category, onPick, children, className }: CategoryLinkProps) {
  return (
    <a className={className} href={`./?category=${category.slug}`} data-route=""
      onClick={event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        onPick(category.slug);
      }}>
      {children}
    </a>
  );
}
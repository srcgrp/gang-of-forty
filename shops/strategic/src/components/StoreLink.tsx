import { useContext, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { CatalogContext } from '../hooks/useCatalog';
import { OFFERS_VIEW } from '../types';
import { configuredCarousels, shelfElementId } from '../catalog/home-shelves';
import { safeHref } from './shop-content';

type Props = { list?: boolean; href: string; className?: string; children: ReactNode };

export default function StoreLink({ href, className, children, list = false }: Props) {
  const state = useContext(CatalogContext);
  const model = state?.status === 'success' || state?.status === 'empty' ? state.data : null;
  const target = safeHref(href);
  if (target.startsWith('#')) {
    const hash = target.slice(1);
    const current = hash === 'contact' || hash === 'top' || hash === 'main';
    if (current || hash === 'categories') {
      return <Link to={current ? '.' : '/'} hash={hash} search={current ? true : {}} activeOptions={{ exact: true, includeHash: true }} className={className}>{children}</Link>;
    }
    const category = model?.categoryBySlug.get(hash);
    const sections = model ? configuredCarousels(model) : [];
    const section = category
      ? sections.find((entry) => entry.source !== 'offers' && entry.categoryId === category.id)
      : sections.find((entry) => entry.id === hash)
        ?? (hash === OFFERS_VIEW ? sections.find((entry) => entry.source === 'offers') : undefined);
    if (section && list) {
      return <Link to="/plp/$carouselId" params={{ carouselId: section.id }} search={{ sort: 'default' }} activeOptions={{ exact: true, includeSearch: false }} className={className}>{children}</Link>;
    }
    if (!section && category) {
      return <Link to="/" search={{ category: category.slug }} className={className}>{children}</Link>;
    }
    return <Link to="/" hash={section ? shelfElementId(section.id) : hash} search={{}} activeOptions={{ exact: true, includeHash: true }} className={className}>{children}</Link>;
  }
  if (target === './' || target === '/') return <Link to="/" search={{}} className={className}>{children}</Link>;
  return <a href={target} className={className}>{children}</a>;
}

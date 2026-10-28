import { closestTarget } from '../../../shared/ui/dom';

export function setupCatFilter(h: {
  onSelect: (s: string) => void;
  onPop: () => void;
  onHiddenShelf: () => void;
  getHash: () => string;
}): void {
  document.addEventListener('click', (e) => {
    const slug = closestTarget<HTMLAnchorElement>(e, 'a[data-cat-slug]')?.dataset.catSlug;
    if (slug === undefined) return;
    e.preventDefault();
    h.onSelect(slug);
    scrollToCategory(slug);
  });
  
  window.addEventListener('popstate', h.onPop);
  
  window.addEventListener('hashchange', () => {
    const hash = h.getHash();
    const shelf = document.getElementById(hash.slice(1));
    if (!shelf?.classList.contains('product-shelf') || !shelf.hidden) return;
    h.onHiddenShelf();
    shelf.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function scrollToCategory(slug: string): void {
  const target = slug ? document.getElementById(slug) : null;
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function showCategory(slug: string, categories: { slug: string }[]): void {
  const activeSlug = categories.some((c) => c.slug === slug) ? slug : '';
  document.querySelectorAll<HTMLElement>('#product-shelves > section').forEach((s) => {
    s.hidden = activeSlug !== '' && s.id !== activeSlug;
  });
  document.querySelectorAll<HTMLElement>('.category[data-cat-slug]').forEach((el) => {
    if (el.dataset.catSlug === activeSlug) el.setAttribute('aria-current', 'page');
    else el.removeAttribute('aria-current');
  });
}
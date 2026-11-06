export type UrlFilters = {
  category: string;
  query: string;
};

export function readUrlFilters(): UrlFilters {
  const params = new URLSearchParams(location.search);
  return {
    category: params.get('category') ?? params.get('cat') ?? '',
    query: params.get('q') ?? '',
  };
}

export function readUrlHash(): string {
  return location.hash;
}

export function writeUrlFilters(
  filters: UrlFilters,
  mode: 'push' | 'replace' = 'replace',
): void {
  const url = new URL(location.href);
  const category = filters.category.trim();
  const query = filters.query.trim();

  if (category) {
    url.searchParams.set('category', category);
  } else {
    url.searchParams.delete('category');
  }

  url.searchParams.delete('cat');

  if (query) {
    url.searchParams.set('q', query);
  } else {
    url.searchParams.delete('q');
  }

  url.hash = category;

  const href = `${url.pathname}${url.search}${url.hash}`;
  const state = { category, query };

  if (mode === 'push') {
    history.pushState(state, '', href);
  } else {
    history.replaceState(state, '', href);
  }
}
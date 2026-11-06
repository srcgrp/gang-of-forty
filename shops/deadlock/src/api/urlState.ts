
export interface UrlState {
  category: string;
  query: string;
}

export function readUrlState(): UrlState {
  const params = new URLSearchParams(window.location.search);

  return {
    category: params.get("category") ?? "",
    query: params.get("q") ?? "",
  };
}

export function writeUrlState(state: UrlState): void {
  const url = new URL(window.location.href);

  if (state.category) {
    url.searchParams.set("category", state.category);
  } else {
    url.searchParams.delete("category");
  }

  if (state.query.trim()) {
    url.searchParams.set("q", state.query.trim());
  } else {
    url.searchParams.delete("q");
  }

  window.history.replaceState({}, "", url);
}

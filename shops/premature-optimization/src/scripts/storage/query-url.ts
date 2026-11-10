export function readQuery(): string {
  return new URLSearchParams(location.search).get("q") ?? "";
}

export function writeQuery(query: string): void {
  const url = new URL(location.href);
  if (query.trim() !== "") url.searchParams.set("q", query.trim());
  else url.searchParams.delete("q");
  history.replaceState(null, "", url);
}

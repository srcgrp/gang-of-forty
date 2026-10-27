export function bindSearch(onSearch: (query: string, sort: string) => void): void {
  const input = document.querySelector<HTMLInputElement>("#product-search");
  const sort = document.querySelector<HTMLSelectElement>("#product-sort");
  const clear = document.querySelector<HTMLButtonElement>("#clear-search");
  if (!input || !sort || !clear) throw new Error("عناصر جست‌وجو پیدا نشدند.");
  function search(): void {
    if (input && sort) onSearch(input.value, sort.value);
  }
  input.addEventListener("input", search);
  sort.addEventListener("change", search);
  clear.addEventListener("click", () => {
    input.value = "";
    search();
    input.focus();
  });
  document.addEventListener("click", (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a");
    if (link && link.hash && link.origin === location.origin && link.pathname === location.pathname) {
      input.value = "";
      search();
    }
  });
}

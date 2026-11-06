const formatter = new Intl.NumberFormat("fa-IR");

export function updateSearchPlaceholder(count: number): void {
  const input =
    document.querySelector<HTMLInputElement>("#site-search");

  if (!input) {
    throw new Error("Search input is missing.");
  }

  input.placeholder =
    `جستجو در میان ${formatter.format(count)} کالا...`;
}
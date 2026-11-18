const persianNumberFormat = new Intl.NumberFormat("fa-IR");

export function formatNumber(value: number): string {
  return persianNumberFormat.format(value);
}

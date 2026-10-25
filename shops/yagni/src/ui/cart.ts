export function renderCartSummary(countValue: number, totalValue: number): void {
  const count = document.querySelector<HTMLElement>('.header__cart-count');
  const total = document.querySelector<HTMLElement>('.header__cart-content strong');
  if (count) count.textContent = countValue.toLocaleString('fa-IR');
  if (total) total.textContent = `${totalValue.toLocaleString('fa-IR')} تومان`;
}

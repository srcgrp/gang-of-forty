export function setupCartPanelToggle(): void {
  const cartBtn = document.querySelector<HTMLAnchorElement>('.action--cart');
  const panel = document.getElementById('cart-panel');
  if (!cartBtn || !panel) return;

  cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    panel.hidden = !panel.hidden;
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) panel.hidden = true;
  });
}
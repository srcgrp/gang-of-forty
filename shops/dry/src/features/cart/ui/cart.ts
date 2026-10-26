export function findBadge(): HTMLElement {
  const badge: HTMLElement | null = document.querySelector<HTMLElement>('#cart-count')
  if (!badge) throw new Error('index.html is missing #cart-count')
    return badge
}

export function renderCart(badge: HTMLElement, text: string, bump: boolean): void {
  badge.textContent = text
  if (!bump) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  badge.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }],
    { duration: 300, easing: 'ease-out' },
  )
}
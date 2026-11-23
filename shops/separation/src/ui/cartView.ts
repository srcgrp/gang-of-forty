import type { CartItem } from '../types.ts'

export function renderCart(
  box: HTMLElement,
  lines: CartItem[],
  total: number,
  count: number,
  onRemove: (id: number) => void,
  onClear: () => void,
): void {
  const badge = document.querySelector<HTMLElement>('#cart-count')
  if (badge !== null) badge.textContent = count.toLocaleString('fa-IR')
  box.replaceChildren()
  const head = document.createElement('h2')
  head.textContent = `سبد خرید (${count.toLocaleString('fa-IR')})`
  box.append(head)
  if (lines.length === 0) {
    const p = document.createElement('p')
    p.textContent = 'سبد خالی است.'
    box.append(p)
    return
  }
  const ul = document.createElement('ul')
  for (const line of lines) {
    const li = document.createElement('li')
    li.textContent = `${line.product.emoji} ${line.product.name} × ${line.qty}`
    const btn = document.createElement('button')
    btn.textContent = 'حذف'
    const id = line.productId
    btn.addEventListener('click', () => onRemove(id))
    li.append(btn)
    ul.append(li)
  }
  box.append(ul)
  const sum = document.createElement('p')
  sum.textContent = `جمع: ${total.toLocaleString('fa-IR')} تومان (تسویه نهایی با سرور)`
  const clear = document.createElement('button')
  clear.textContent = 'خالی کردن سبد'
  clear.addEventListener('click', onClear)
  box.append(sum, clear)
}

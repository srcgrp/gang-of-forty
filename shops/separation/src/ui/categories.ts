import type { Category } from '../types.ts'

function catCard(name: string, emoji: string, active: boolean): HTMLElement {
  const a = document.createElement('a')
  a.href = '#offers'
  a.className = active ? 'cat active' : 'cat'
  const e = document.createElement('span')
  e.className = 'emoji'
  e.textContent = emoji
  const t = document.createElement('span')
  t.textContent = name
  a.append(e, t)
  return a
}

export function renderCategories(
  box: HTMLElement,
  cats: Category[],
  activeId: number | undefined,
  onPick: (id: number | undefined) => void,
): void {
  box.replaceChildren()
  const all = catCard('همه', '🧺', activeId === undefined)
  all.addEventListener('click', () => onPick(undefined))
  box.append(all)
  for (const c of cats) {
    const card = catCard(c.name, c.emoji, c.id === activeId)
    const id = c.id
    card.addEventListener('click', () => onPick(id))
    box.append(card)
  }
}

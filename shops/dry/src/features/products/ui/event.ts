export type AddClick = { id: number; name: string }

export function readAdd(e: MouseEvent): AddClick | null {
  if (!(e.target instanceof Element)) return null
  const button: HTMLButtonElement | null = e.target.closest<HTMLButtonElement>('.add-btn')
  if (!button || button.disabled) return null
  const id: number = Number(button.dataset.id)
  if (!Number.isInteger(id)) return null
  return { id, name: button.dataset.name ?? 'محصول' }
}
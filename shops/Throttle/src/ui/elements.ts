export type Elements = Readonly<{
  notice: HTMLElement
  shopName: HTMLElement
  slogan: HTMLElement
  search: HTMLInputElement
  sort: HTMLSelectElement
  categories: HTMLElement
  cartCount: HTMLElement
  cartTotal: HTMLElement
  status: HTMLParagraphElement
  list: HTMLUListElement
}>

const find = <T extends Element>(selector: string, kind: new () => T): T => {
  const el: Element | null = document.querySelector(selector)
  if (!(el instanceof kind)) throw new Error(`index.html is missing ${selector}`)
  return el
}

export const queryElements = (): Elements => ({
  notice: find('#notice', HTMLElement),
  shopName: find('#shop-name', HTMLElement),
  slogan: find('#slogan', HTMLElement),
  search: find('#search', HTMLInputElement),
  sort: find('#sort', HTMLSelectElement),
  categories: find('#categories', HTMLElement),
  cartCount: find('#cart-count', HTMLElement),
  cartTotal: find('#cart-total', HTMLElement),
  status: find('#status', HTMLParagraphElement),
  list: find('#products', HTMLUListElement),
})

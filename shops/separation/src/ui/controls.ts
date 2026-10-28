import type { Sort } from '../types.ts'

export type ShopElements = {
  salesCar: HTMLElement
  dairyCar: HTMLElement
  status: HTMLElement
  form: HTMLFormElement
  field: HTMLInputElement
  sorts: HTMLSelectElement
  box: HTMLElement
  catBox: HTMLElement
}

function need<T>(el: T | null): T {
  if (el === null) throw new Error('HTML ناقص')
  return el
}

export function readElements(): ShopElements {
  return {
    salesCar: need(document.querySelector<HTMLElement>('#offers .car')),
    dairyCar: need(document.querySelector<HTMLElement>('#dairy .car')),
    status: need(document.querySelector<HTMLElement>('#status')),
    form: need(document.querySelector<HTMLFormElement>('form.search')),
    field: need(document.querySelector<HTMLInputElement>('#q')),
    sorts: need(document.querySelector<HTMLSelectElement>('#sorts')),
    box: need(document.querySelector<HTMLElement>('#cart')),
    catBox: need(document.querySelector<HTMLElement>('#categories .cat-list')),
  }
}

export function wireSearch(
  form: HTMLFormElement,
  field: HTMLInputElement,
  onQuery: (q: string) => void,
): void {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    onQuery(field.value)
  })
}

export function wireSort(sorts: HTMLSelectElement, onSort: (s: Sort) => void): void {
  sorts.addEventListener('change', () => {
    const v = sorts.value
    if (v === 'پیش‌فرض' || v === 'ارزان‌ترین' || v === 'گران‌ترین') onSort(v)
  })
}

export function setQuery(field: HTMLInputElement, q: string): void {
  field.value = q
}

import { el } from './dom.ts'

export type StatusKind = 'loading' | 'info' | 'error'

export function renderStatus(box: HTMLElement, message: string, kind: StatusKind): void {
    const isError: boolean = kind === 'error'
    const P: HTMLParagraphElement = el('p', isError ? 'status error' : 'status', message)
    P.setAttribute('role', isError ? 'alert' : 'status')
    box.setAttribute('aria-busy' , String(kind === 'loading'))
    box.replaceChildren(P)
}
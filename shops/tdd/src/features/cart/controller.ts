import { nextCartCount } from './count'

type CartDependencies = {
    read: () => number
    save: (count: number) => boolean
    clear: () => boolean
    render: (count: number) => void
    showStatus: (message: string) => void
    notify: () => void
    confirmClear: () => Promise<boolean>
    onClear: (callback: () => void) => void
    onStorageChange: (callback: (count: number) => void) => void
}

export function startCart(deps: CartDependencies): () => void {
    let count = deps.read()
    deps.render(count)

    deps.onClear(async () => {
        if (count === 0 || !await deps.confirmClear()) return
        count = 0
        deps.render(count)
        deps.showStatus(deps.clear() ? "" : "سبد خالی شد؛ ذخیره تغییر در این مرورگر ممکن نیست.")
    })

    deps.onStorageChange(value => {
        count = value
        deps.render(count)
    })

    return () => {
        const next = nextCartCount(count)
        if (next === count) return
        count = next
        deps.render(count)
        deps.showStatus(deps.save(count) ? "" : "کالا اضافه شد؛ ذخیره سبد برای مراجعه بعدی در این مرورگر ممکن نیست.")
        deps.notify()
    }
}

export type Filters = {
    category: string
    q: string
}

export function readFilters(): Filters {
    const params = new URLSearchParams(location.search)
    return {
        category: params.get("category") ?? "",
        q: params.get("q") ?? ""
    }
}

export function readHash(): string {
    return location.hash
}

export function linkHash(href: string): string | null {
    const target = new URL(href, location.href)
    if (target.origin !== location.origin || target.pathname !== location.pathname ||
        target.search !== location.search || !target.hash) return null
    return target.hash
}

export function writeFilters(filters: Filters, hash?: string): void {
    const target = new URL(location.href)
    if (filters.category) target.searchParams.set("category", filters.category)
    else target.searchParams.delete("category")
    if (filters.q) target.searchParams.set("q", filters.q)
    else target.searchParams.delete("q")
    if (hash !== undefined) target.hash = hash
    if (target.href !== location.href) history.pushState(null, "", target)
}

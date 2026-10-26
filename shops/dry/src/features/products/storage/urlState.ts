export type Filters = { category: string | null; query: string }

export function readFilters(): Filters {
    const params: URLSearchParams = new URLSearchParams(window.location.search)
    return { category: params.get('category'), query: params.get('q') ?? ''}
}

export function writeFilters(filters: Filters): void {
    const params: URLSearchParams = new URLSearchParams()
    if (filters.category !== null) params.set('category', filters.category)
        if (filters.query !== '') params.set('q', filters.query)
            const search: string = params.toString()
        const path: string = window.location.pathname + (search === '' ? '' : `?${search}`)
        window.history.replaceState(null, '', path + window.location.hash)
}
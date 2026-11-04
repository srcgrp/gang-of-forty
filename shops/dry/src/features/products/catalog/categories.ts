const CATEGORY_IDS: Record<string, number> = {
    fruit: 1,
    diary: 2,
    bakery: 3,
    pantry: 4,
    drinks:5,
}

export function categoryId(slug: string | null): number | null {
    if (slug === null) return  null
    return CATEGORY_IDS[slug] ?? null
}
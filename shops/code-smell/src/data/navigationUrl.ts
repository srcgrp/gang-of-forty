export function readCategorySlug(): string | null {
    const params = new URLSearchParams(location.search)
    const fragment = location.hash.slice(1)

    return params.has("cat") ? params.get("cat") : fragment
}

export function readSectionId(): string {
    return location.hash.slice(1)
}

export function writeNavigation(slug: string | null, href: string): void {
    const url = new URL(location.href)

    if (slug !== null) {
        url.searchParams.set("cat", slug)
        url.hash = ""
    } else {
        url.searchParams.delete("cat")
        url.hash = href.slice(1)
    }

    history.pushState(null, "", url)
}
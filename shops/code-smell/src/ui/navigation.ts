export function closeMenus(): void {
    document.querySelectorAll<HTMLDetailsElement>(
        ".mobile-menu, .mobile-category-menu"
    ).forEach(function (menu) {
        menu.open = false
    })
}

export function scrollToSection(id: string): void {
    const section = document.getElementById(id)
    if (section) {
        section.scrollIntoView({
            block: "start",
            inline: "start"
        })
    }
}

export function clearSearch(): void {
    const search = document.querySelector<HTMLInputElement>("#product-search")

    if (search) {
        search.value = ""
    }
}

export function setSearchDisabled(isDisabled: boolean): void {
    const search = document.querySelector<HTMLInputElement>("#product-search")

    if (search) {
        search.disabled = isDisabled
    }
}
export function handleNavigationLink(event: MouseEvent): string | null {
    const anchor = event.currentTarget

    if (anchor instanceof HTMLAnchorElement) {
        const href = anchor.getAttribute("href")

        if (href !== null) {
            event.preventDefault()
            closeMenus()
        }

        return href
    } else {
        return null
    }
}
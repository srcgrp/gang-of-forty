import type { Category } from "../types"

export function createCategoryMenu(
    isMobile: boolean,
    categories: Category[],
    onNavigate: (event: MouseEvent) => void
): HTMLLIElement {
    const item = document.createElement("li")
    item.className = "category-menu"
    let wrapper: HTMLLIElement | HTMLDetailsElement = item
    let toggle

    if (isMobile) {
        wrapper = document.createElement("details")
        wrapper.className = "mobile-category-menu"
        toggle = document.createElement("summary")
    } else {
        toggle = document.createElement("a")
        toggle.href = "#categories"
        toggle.addEventListener("click", onNavigate)
    }

    toggle.className = "category-menu__toggle"
    toggle.textContent = "دسته‌بندی کالاها"
    const arrow = document.createElement("img")
    arrow.className = "category-menu__chevron menu-chevron"
    arrow.src = "svg/caret-left.svg"
    arrow.alt = ""
    arrow.width = 16
    arrow.height = 16
    arrow.setAttribute("aria-hidden", "true")
    toggle.append(arrow)

    const list = document.createElement("ul")
    list.className = isMobile ? "mobile-categories" : "category-menu__list"

    categories.forEach(function (category) {
        const row = document.createElement("li")
        const anchor = document.createElement("a")
        anchor.className = "menu-link"
        anchor.href = "#" + category.slug
        anchor.addEventListener("click", onNavigate)
        const categoryIcon = document.createElement("span")
        categoryIcon.className = "menu-link__icon category-visual"
        categoryIcon.setAttribute("aria-hidden", "true")
        categoryIcon.style.backgroundColor = category.color
        const categoryEmoji = document.createElement("span")
        categoryEmoji.className = "category-icon__emoji"
        categoryEmoji.textContent = category.emoji
        categoryEmoji.setAttribute("aria-hidden", "true")
        categoryIcon.append(categoryEmoji)
        anchor.append(categoryIcon, document.createTextNode(category.name))
        row.append(anchor)
        list.append(row)
    })

    wrapper.append(toggle, list)
    if (isMobile) {
        item.append(wrapper)
    }
    return item
}
import type { Category } from "../types"

export function renderCategories(
    categories: Category[],
    onNavigate: (event: MouseEvent) => void
): void {
    const section = document.querySelector<HTMLElement>("#categories")
    if (section) {
        section.setAttribute("aria-labelledby", "categories-title")
        const container = document.createElement("div")
        container.className = "container"
        const sectionHeader = document.createElement("header")
        sectionHeader.className = "section__header"
        const sectionTitle = document.createElement("h2")
        sectionTitle.className = "section__title"
        sectionTitle.textContent = "دسته‌بندی کالاها"
        sectionTitle.id = "categories-title"
        const categoryHeading = document.createElement("div")
        categoryHeading.className = "category-heading"
        categoryHeading.append(sectionTitle)
        sectionHeader.append(categoryHeading)
        const sectionSubtitle = document.createElement("p")
        sectionSubtitle.className = "section__subtitle"
        sectionSubtitle.textContent =
            "برای خرید راحتتر، دسته بندی مورد نظرتان را انتخاب کنید."
        categoryHeading.append(sectionSubtitle)
        container.append(sectionHeader)
        const list = document.createElement("ul")
        list.className = "category-grid"
        categories.forEach(function (category) {
            const item = document.createElement("li")
            item.className = "category-card"
            item.id = "category-" + category.slug
            const anchor = document.createElement("a")
            anchor.className = "category-card__link"
            anchor.href = "#" + category.slug
            anchor.addEventListener("click", onNavigate)
            const categoryIcon = document.createElement("span")
            categoryIcon.className = "category-card__icon category-visual"
            categoryIcon.setAttribute("aria-hidden", "true")
            categoryIcon.style.backgroundColor = category.color
            const categoryEmoji = document.createElement("span")
            categoryEmoji.className = "category-icon__emoji"
            categoryEmoji.textContent = category.emoji
            categoryEmoji.setAttribute("aria-hidden", "true")
            categoryIcon.append(categoryEmoji)
            const categoryCardTitle = document.createElement("h3")
            categoryCardTitle.className = "category-card__title"
            categoryCardTitle.textContent = category.name
            const categoryCardMeta = document.createElement("p")
            categoryCardMeta.className = "category-card__meta"
            categoryCardMeta.textContent = "دیدن کالاها ←"
            anchor.append(categoryIcon, categoryCardTitle, categoryCardMeta)
            item.append(anchor)
            list.append(item)
        })
        const reset = document.createElement("a")
        reset.className = "button button--secondary category-reset"
        reset.textContent = "مشاهده همه‌ی دسته‌ها"
        reset.href = "#categories"
        reset.addEventListener("click", onNavigate)
        sectionHeader.append(reset)
        container.append(list)
        section.replaceChildren(container)
        section.hidden = false
    }
}
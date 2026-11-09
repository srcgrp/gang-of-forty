export function initializeHeader(
    shopName: string,
    onNavigate: (event: MouseEvent) => void
): void {
    const brandLink = document.querySelector<HTMLAnchorElement>(".brand")
    if (brandLink) {
        brandLink.addEventListener("click", onNavigate)
    }

    const brand = document.querySelector<HTMLElement>("#brand-text")
    const brandName = document.createElement("strong")
    brandName.className = "brand__name"
    brandName.textContent = shopName
    const brandTagline = document.createElement("span")
    brandTagline.className = "brand__tagline"
    if (brand) {
        brand.append(brandName, brandTagline)
    }

    const searchContainer = document.querySelector<HTMLDivElement>("#search-root")
    const label = document.createElement("label")
    label.className = "sr-only"
    label.textContent = "جستجوی کالا"
    label.htmlFor = "product-search"
    const searchInput = document.createElement("input")
    searchInput.className = "search__input"
    searchInput.id = "product-search"
    searchInput.type = "search"
    searchInput.placeholder = "جستجوی کالا..."
    searchInput.disabled = true
    const searchIcon = document.createElement("img")
    searchIcon.className = "search__icon"
    searchIcon.src = "svg/magnifying-glass.svg"
    searchIcon.alt = ""
    searchIcon.width = 18
    searchIcon.height = 18
    searchIcon.setAttribute("aria-hidden", "true")
    if (searchContainer) {
        searchContainer.append(label, searchIcon, searchInput)
    }

    const cartButtonIcon = document.createElement("img")
    cartButtonIcon.className = "cart-button__icon"
    cartButtonIcon.src = "svg/shopping-cart.svg"
    cartButtonIcon.alt = ""
    cartButtonIcon.width = 20
    cartButtonIcon.height = 20
    cartButtonIcon.setAttribute("aria-hidden", "true")
    const cartButtonLabel = document.createElement("span")
    cartButtonLabel.className = "cart-button__label"
    cartButtonLabel.textContent = "سبد خرید"
    const cartButtonBadge = document.createElement("span")
    cartButtonBadge.className = "cart-button__badge"
    cartButtonBadge.textContent = "۰"

    const cartButton = document.querySelector<HTMLButtonElement>("#cart-button")
    if (cartButton) {
        cartButton.append(cartButtonIcon, cartButtonLabel, cartButtonBadge)
    }
}
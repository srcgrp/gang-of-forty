"use strict"
import { shopContent } from "./shop-content"
import Typed from "typed.js"
import { Fireworks } from "fireworks-js"
import type { Product, Category, Offer, Stock, Link, Shop, Banner, Carousel, Home, CartItem } from "./src/types"
const api = "../../api/"
const shopName = "سوپرمارکت بوی کد"
const persianNumberFormat = new Intl.NumberFormat("fa-IR")
const cartKey = "code-smell-shopping-cart"
const carouselsRoot = document.querySelector<HTMLDivElement>("#carousels-root")
const resultsRoot = document.querySelector<HTMLDivElement>("#results-root")
const pageStatus = document.querySelector<HTMLDivElement>("#page-status")
const cartButton = document.querySelector<HTMLButtonElement>("#cart-button")
let products: Product[] = []
let categories: Category[] = []
let stockByProductId: Record<number, number> = {}
let offers: Offer[] = []
let shopData: Shop | null = null
let homeData: Home | null = null
let isPageReady = false
const cart = readCart()


//Cart 
function readCart(): Record<number, number> {
    try {
        return JSON.parse(localStorage.getItem(cartKey) || "{}")
    } catch {
        return {}
    }
}

function updateCartCount(): void {
    let count = 0

    Object.values(cart).forEach(function (quantity: number): void {
        count += quantity
    })

    const cartBadge = document.querySelector<HTMLSpanElement>(".cart-button__badge")

    if (cartBadge && cartButton) {
        cartBadge.textContent = persianNumberFormat.format(count)
        cartButton.setAttribute(
            "aria-label",
            "سبد خرید:" + " " + persianNumberFormat.format(count) + " " + "کالا"
        )
    }
}

function addToCart(cartItem: CartItem): void {
    cart[cartItem.id] = (cart[cartItem.id] || 0) + cartItem.quantity
    updateCartCount()
    localStorage.setItem(cartKey, JSON.stringify(cart))
}

// header
function initializeHeader(): void {
    const brandLink = document.querySelector<HTMLAnchorElement>(".brand")

    if (brandLink) {
        brandLink.addEventListener("click", navigate)
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


    if (cartButton) {
        cartButton.append(cartButtonIcon, cartButtonLabel, cartButtonBadge)
    }
    updateCartCount()
}

function createCategoryMenu(isMobile: boolean): HTMLLIElement {

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
        toggle.addEventListener("click", navigate)
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
        anchor.addEventListener("click", navigate)
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

function createMainMenu(isMobile: boolean): HTMLUListElement {
    const list = document.createElement("ul")
    list.className = "site-nav__list container"
    list.append(createCategoryMenu(isMobile))

    if (shopData) {
        shopData.menu.forEach(function (entry) {
            const item = document.createElement("li")
            const navigationLink = document.createElement("a")

            navigationLink.className = "site-nav__link"
            navigationLink.textContent = entry.label
            navigationLink.href = entry.href
            navigationLink.addEventListener("click", navigate)

            item.append(navigationLink)
            list.append(item)
        })
    }

    return list
}

function renderHeader(): void {
    const announcement = document.querySelector<HTMLParagraphElement>("#announcement")
    const brandTagline = document.querySelector<HTMLSpanElement>(".brand__tagline")
    const siteNav = document.querySelector<HTMLElement>("#site-nav")

    if (shopData && announcement && brandTagline && siteNav) {
        announcement.textContent = ""

        new Typed(announcement, {
            strings: [shopData.notice],
            typeSpeed: 30,
            loop: true,
            showCursor: false,
            contentType: "null"
        })
        brandTagline.textContent = shopData.slogan
        siteNav.replaceChildren(createMainMenu(false))
    }
    const mobileMenu = document.querySelector<HTMLDetailsElement>("#mobile-menu")
    const summary = document.createElement("summary")
    summary.className = "menu-toggle"
    summary.textContent = "☰"
    summary.setAttribute("aria-label", "منوی اصلی")
    const mobileNav = document.createElement("nav")
    mobileNav.className = "mobile-nav"
    mobileNav.setAttribute("aria-label", "منوی اصلی موبایل")
    mobileNav.append(createMainMenu(true))
    if (mobileMenu) {
        mobileMenu.replaceChildren(summary, mobileNav)
    }
    const search = document.querySelector<HTMLInputElement>("#product-search")

    if (search) {
        search.disabled = false
        search.placeholder =
            "جستجو در میان" + " " +
            persianNumberFormat.format(products.length) +
            " " + "کالا..."
    }
}

// Hero
function renderHero(): void {
    const section = document.querySelector<HTMLElement>("#hero")

    if (section && homeData && shopData) {
        section.setAttribute("aria-labelledby", "hero-title")

        const container = document.createElement("div")
        container.className = "hero__inner container"

        const content = document.createElement("div")
        content.className = "hero__content"

        const heading = document.createElement("h1")
        heading.className = "hero__title"
        heading.textContent = homeData.hero.title
        heading.id = "hero-title"

        const heroTitleEmoji = document.createElement("span")
        heroTitleEmoji.className = "hero-title__emoji"
        heroTitleEmoji.textContent = homeData.hero.emoji
        heroTitleEmoji.setAttribute("aria-hidden", "true")
        heading.prepend(heroTitleEmoji, document.createTextNode(" "))

        const actions = document.createElement("div")
        actions.className = "hero__actions"

        const heroLink = document.createElement("a")
        heroLink.className = "button button--primary"
        heroLink.textContent = homeData.hero.cta.label
        heroLink.href = homeData.hero.cta.href
        heroLink.addEventListener("click", navigate)
        actions.append(heroLink)

        const categoriesLink = document.createElement("a")
        categoriesLink.className = "button button--secondary"
        categoriesLink.textContent = "دسته‌بندی کالاها"
        categoriesLink.href = "#categories"
        categoriesLink.addEventListener("click", navigate)
        actions.append(categoriesLink)

        const features = document.createElement("ul")
        features.className = "hero__features"

        const featureTexts = [
            "ارسال در" + " " + shopData.city,

            "ساعت فعالیت:" + " " + shopData.hours.open +
            " " + "تا" + " " + shopData.hours.close,

            "ارسال رایگان از" + " " +
            persianNumberFormat.format(shopData.freeDeliveryOver) +
            " " + shopData.currency
        ]

        featureTexts.forEach(function (text) {
            const textNode = document.createElement("li")
            textNode.textContent = text
            features.append(textNode)
        })

        const heroEyebrow = document.createElement("p")
        heroEyebrow.className = "hero__eyebrow"
        heroEyebrow.textContent = shopName

        const heroText = document.createElement("p")
        heroText.className = "hero__text"
        heroText.textContent = homeData.hero.text

        content.append(heroEyebrow, heading, heroText, actions, features)

        const media = document.createElement("div")
        media.className = "hero__image-wrap"

        const heroImage = document.createElement("img")
        heroImage.className = "hero__image"
        heroImage.src = "images/Golden%20Tote.webp"
        heroImage.alt = ""
        heroImage.width = 320
        heroImage.height = 320
        heroImage.setAttribute("aria-hidden", "true")

        media.append(heroImage)
        container.append(content, media)

        section.replaceChildren(container)
        section.hidden = false
    }
}

// Categories
function renderCategories(): void {
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
        sectionSubtitle.textContent = "برای خرید راحتتر، دسته بندی مورد نظرتان را انتخاب کنید."
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
            anchor.addEventListener("click", navigate)
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
        reset.addEventListener("click", navigate)
        sectionHeader.append(reset)
        container.append(list)
        section.replaceChildren(container)
        section.hidden = false
    }
}

//Banner
function createSideBanner(sideData: Banner): HTMLElement {
    const side = document.createElement("article")
    side.className = "hero-side promo-side"

    const heading = document.createElement("h3")
    heading.className = "hero-side__title"
    heading.textContent = sideData.title

    const heroSideEmoji = document.createElement("span")
    heroSideEmoji.className = "hero-side__emoji"
    heroSideEmoji.textContent = sideData.emoji
    heroSideEmoji.setAttribute("aria-hidden", "true")
    heading.prepend(heroSideEmoji)

    const heroSideText = document.createElement("p")
    heroSideText.className = "hero-side__text"
    heroSideText.textContent = sideData.text

    const sideLink = document.createElement("a")
    sideLink.className = "button button--primary"
    sideLink.textContent = sideData.cta.label
    sideLink.href = sideData.cta.href
    sideLink.addEventListener("click", navigate)

    side.append(heading, heroSideText, sideLink)
    return side
}

function showOfferFireworks(card: HTMLElement): void {
    const layer = document.createElement("div")
    layer.className = "offer-fireworks"
    layer.setAttribute("aria-hidden", "true")
    card.append(layer)

    const fireworks = new Fireworks(layer, {
        particles: 30
    })

    fireworks.start()

    window.setTimeout(function () {
        fireworks.stop(true)
        layer.remove()
    }, 2500)
}

function createDiscountCard(): HTMLElement {
    const card = document.createElement("article")
    card.className = "promo-card promo-card--dark"

    const label = document.createElement("span")
    label.className = "promo-card__eyebrow"
    label.textContent = "ویژه خرید اول"

    const heading = document.createElement("h3")
    heading.className = "promo-card__title"
    heading.textContent =
        persianNumberFormat.format(100000) + " " + "تومان هدیه"

    const description = document.createElement("p")
    description.className = "promo-card__text"
    description.textContent =
        "برای اولین سفارش بالای" + " " +
        persianNumberFormat.format(400000) + " " +
        "تومان، این کد را هنگام پرداخت وارد کنید."

    const button = document.createElement("button")
    button.className = "button button--primary"
    button.type = "button"
    button.textContent = "دریافت کد تخفیف"

    const discountCode = document.createElement("p")
    discountCode.className = "promo-card__code"
    discountCode.id = "first-order-discount"
    discountCode.hidden = true

    const codeValue = document.createElement("code")
    codeValue.textContent = "SMELL100"
    codeValue.dir = "ltr"
    discountCode.append("کد تخفیف:" + " ", codeValue)

    button.setAttribute("aria-controls", discountCode.id)
    button.setAttribute("aria-expanded", "false")

    button.addEventListener("click", function () {
        discountCode.hidden = false
        button.setAttribute("aria-expanded", "true")
        showOfferFireworks(card)
    })

    const image = document.createElement("img")
    image.className = "promo-card__art"
    image.src = "images/Gift%20Box.webp"
    image.alt = ""
    image.setAttribute("aria-hidden", "true")

    card.append(label, heading, description, button, discountCode, image)

    return card
}

function renderPromos(): void {
    const section = document.querySelector<HTMLElement>("#special-offers")
    if (section && homeData) {
        section.setAttribute("aria-labelledby", "special-offers-title")
        const container = document.createElement("div")
        container.className = "container"
        const sectionHeader = document.createElement("header")
        sectionHeader.className = "section__header"
        const sectionTitle = document.createElement("h2")
        sectionTitle.className = "section__title"
        sectionTitle.textContent = "پیشنهاد ویژه"
        sectionTitle.id = "special-offers-title"
        const sectionSubtitle = document.createElement("p")
        sectionSubtitle.className = "section__subtitle"
        sectionSubtitle.textContent = "فرصت‌های محدود این هفته را از دست ندهید."

        sectionHeader.append(sectionTitle, sectionSubtitle)
        container.append(sectionHeader)
        const grid = document.createElement("div")
        grid.className = "promo-grid"
        homeData.promos.forEach(function (promo) {
            const card = document.createElement("article")
            card.className = "promo-card promo-card--api"
            card.style.backgroundColor = promo.color
            const heading = document.createElement("h3")
            heading.className = "promo-card__title"
            heading.textContent = promo.text
            const navigationLink = document.createElement("a")
            navigationLink.className = "button button--dark"
            navigationLink.textContent = "مشاهده کالاها"
            navigationLink.href = promo.href
            navigationLink.addEventListener("click", navigate)
            card.append(heading, navigationLink)
            const promoCardArt = document.createElement("span")
            promoCardArt.className = "promo-card__art promo-card__emoji"
            promoCardArt.textContent = promo.emoji
            promoCardArt.setAttribute("aria-hidden", "true")
            card.append(promoCardArt)
            grid.append(card)
        })
        grid.append(createDiscountCard())
        grid.append(createSideBanner(homeData.side))
        container.append(grid)

        section.replaceChildren(container)
        section.hidden = false
    }
}

//carousel
function getProductOffer(productId: number): Offer | undefined {
    return offers.find(function (offer) {
        return offer.productId === productId
    })
}

function createProductMedia(
    product: Product,
    offer: Offer | undefined,
    isUnavailable: boolean
): HTMLDivElement {
    const media = document.createElement("div")
    media.className = "product-card__media"
    const productEmoji = document.createElement("span")
    productEmoji.className = "product-card__emoji"
    productEmoji.textContent = product.emoji
    productEmoji.setAttribute("aria-hidden", "true")
    media.append(productEmoji)

    if (offer) {
        const badge = document.createElement("span")
        badge.className = "badge product-card__badge"
        badge.textContent = persianNumberFormat.format(offer.percent) + "٪ تخفیف"
        media.append(badge)
    }

    if (isUnavailable) {
        const badge = document.createElement("span")
        badge.className = "badge product-card__stock"
        badge.textContent = "ناموجود"
        media.append(badge)
    }
    return media
}

function createProductPrice(
    product: Product,
    offer: Offer | undefined
): HTMLParagraphElement {
    const price = document.createElement("p")
    price.className = "price"
    let finalPrice = product.price
    if (offer) {
        const oldPrice = document.createElement("del")
        oldPrice.className = "price__old"
        oldPrice.textContent = persianNumberFormat.format(product.price)
        price.append(oldPrice)

        finalPrice = Math.round(product.price * (100 - offer.percent) / 100)
    }

    const currentPrice = document.createElement("span")
    currentPrice.className = "price__current"
    currentPrice.textContent = persianNumberFormat.format(finalPrice) + " "
    const priceUnit = document.createElement("span")
    priceUnit.className = "price__unit"
    if (shopData) {
        priceUnit.textContent = shopData.currency
    }
    currentPrice.append(priceUnit)
    price.append(currentPrice)
    return price
}

function createAddButton(
    product: Product,
    isUnavailable: boolean
): HTMLButtonElement {
    const button = document.createElement("button")
    button.className = "button button--secondary button--block"
    button.type = "button"
    button.disabled = isUnavailable

    const buttonLabel = isUnavailable
        ? product.name + ": ناموجود"
        : "افزودن به سبد خرید:" + " " + product.name

    button.setAttribute("aria-label", buttonLabel)

    const plus = document.createElement("span")
    plus.textContent = "+"
    plus.setAttribute("aria-hidden", "true")

    const text = document.createElement("span")
    text.textContent = isUnavailable
        ? "ناموجود"
        : "افزودن به سبد خرید"

    button.append(plus, text)

    button.addEventListener("click", function () {
        addToCart({ id: product.id, quantity: 1 })
    })

    return button
}

function createProductCard(
    product: Product,
    sectionId: string,
    index: number
): HTMLLIElement {
    const offer = getProductOffer(product.id)
    const isUnavailable = stockByProductId[product.id] === 0

    const category = categories.find(function (category) {
        return category.id === product.categoryId
    })

    const item = document.createElement("li")
    item.id = sectionId + "-item-" + (index + 1)
    item.tabIndex = -1

    const card = document.createElement("article")
    card.className = "product-card"

    if (isUnavailable) {
        card.classList.add("product-card--unavailable")
    }

    const tags = document.createElement("p")
    tags.className = "product-card__tags"
    tags.textContent = product.tags.join(" · ")
    tags.hidden = product.tags.length === 0

    const productCardCategory = document.createElement("p")
    productCardCategory.className = "product-card__category"
    if (category) {
        productCardCategory.textContent = category.name
    }

    const productCardTitle = document.createElement("h3")
    productCardTitle.className = "product-card__title"
    productCardTitle.textContent = product.name

    const productCardUnit = document.createElement("p")
    productCardUnit.className = "product-card__unit"
    productCardUnit.textContent = product.unit

    card.append(
        createProductMedia(product, offer, isUnavailable),
        productCardCategory,
        productCardTitle,
        productCardUnit,
        tags
    )

    const footer = document.createElement("div")
    footer.className = "product-card__footer"
    footer.append(
        createProductPrice(product, offer),
        createAddButton(product, isUnavailable)
    )

    card.append(footer)
    item.append(card)
    return item
}

function scrollCarousel(section: HTMLElement, direction: string): void {
    const cards = section.querySelectorAll<HTMLLIElement>(".product-grid > li")
    let target: HTMLLIElement | undefined

    if (direction === "start") {
        target = cards[0]
    } else {
        target = cards[cards.length - 1]
    }

    if (target) {
        target.scrollIntoView({
            block: "nearest",
            inline: "start"
        })

        target.focus({
            preventScroll: true
        })
    }
}

function createCarouselControls(section: HTMLElement, title: string): HTMLElement {
    const controls = document.createElement("nav")
    controls.className = "carousel-controls"
    controls.setAttribute("aria-label", "کنترل کاروسل " + title)

    const directions = ["start", "end"]

    directions.forEach(function (direction) {
        const control = document.createElement("a")
        control.href = "#" + section.id + "-item-1"

        const positionLabel = direction === "start" ? "ابتدای" : "انتهای"
        const controlLabel = positionLabel + " " + "کاروسل" + " " + title

        control.setAttribute("aria-label", controlLabel)
        control.title = controlLabel

        const arrowDirection = direction === "start" ? "right" : "left"
        const carouselArrow = document.createElement("img")
        carouselArrow.className = "carousel-arrow"
        carouselArrow.src = "svg/caret-" + arrowDirection + ".svg"
        carouselArrow.alt = ""
        carouselArrow.width = 13
        carouselArrow.height = 13
        carouselArrow.setAttribute("aria-hidden", "true")

        control.append(carouselArrow)

        control.addEventListener("click", function (event: MouseEvent) {
            event.preventDefault()
            scrollCarousel(section, direction)
        })

        controls.append(control)
    })

    return controls
}

function createCarousel(
    carouselData: Carousel,
    index: number = 0
): HTMLElement {
    const section = document.createElement("section")
    section.className = "section"

    if (index % 2 === 0) {
        section.classList.add("section--muted")
    }

    section.id = carouselData.id
    section.setAttribute("aria-labelledby", carouselData.id + "-title")

    const container = document.createElement("div")
    container.className = "container"

    const header = document.createElement("header")
    header.className = "section__header section__header--carousel"

    const sectionTitle = document.createElement("h2")
    sectionTitle.className = "section__title"
    sectionTitle.textContent = carouselData.title
    sectionTitle.id = carouselData.id + "-title"
    header.append(sectionTitle)

    if (carouselData.emoji) {
        const carouselTitleEmoji = document.createElement("span")
        carouselTitleEmoji.className = "carousel-title__emoji"
        carouselTitleEmoji.textContent = carouselData.emoji
        carouselTitleEmoji.setAttribute("aria-hidden", "true")

        sectionTitle.prepend(
            carouselTitleEmoji,
            document.createTextNode(" ")
        )
    }

    const row = document.createElement("div")
    row.className = "carousel-heading-row"

    let subtitle = "خرید روزانه، تازه و به‌صرفه."

    if (carouselData.source === "offers") {
        subtitle = "قیمت‌های ویژه روی کالاهای پرمصرف."
    }

    const sectionSubtitle = document.createElement("p")
    sectionSubtitle.className = "section__subtitle"
    sectionSubtitle.textContent = subtitle

    row.append(
        sectionSubtitle,
        createCarouselControls(section, carouselData.title)
    )
    header.append(row)

    const status = document.createElement("p")
    status.className = "catalog-status"
    status.id = carouselData.id + "-status"
    status.setAttribute("role", "status")

    const list = document.createElement("ul")
    list.className = "product-grid"
    list.tabIndex = 0
    list.setAttribute("aria-label", "کاروسل" + " " + carouselData.title)
    list.setAttribute("aria-describedby", status.id)

    container.append(header, status, list)
    section.append(container)

    return section
}

function renderCarousel(section: HTMLElement, selectedProducts: Product[]): void {
    const list = section.querySelector<HTMLUListElement>(".product-grid")
    const status = section.querySelector<HTMLParagraphElement>(".catalog-status")

    if (list && status) {
        list.replaceChildren()

        selectedProducts.forEach(function (product, index) {
            list.append(createProductCard(product, section.id, index))
        })

        const hasProducts = selectedProducts.length > 0

        list.hidden = !hasProducts
        status.textContent = hasProducts ? "" : "کالایی پیدا نشد!"
        status.hidden = hasProducts

        section.querySelectorAll<HTMLAnchorElement>(".carousel-controls a")
            .forEach(function (control, index) {
                const itemNumber = index === 0 ? 1 : selectedProducts.length || 1
                control.href = "#" + section.id + "-item-" + itemNumber

                if (hasProducts) {
                    control.removeAttribute("aria-disabled")
                } else {
                    control.setAttribute("aria-disabled", "true")
                }

                control.tabIndex = hasProducts ? 0 : -1
            })

        list.scrollLeft = 0
    }
}

function getCarouselProducts(
    carouselData: Carousel
): Product[] {
    let selectedProducts = products
    if (carouselData.source === "offers") {
        selectedProducts = products.filter(function (product) {
            return getProductOffer(product.id)
        })
    } else if (carouselData.categoryId !== undefined) {
        selectedProducts = products.filter(function (product) {
            return product.categoryId === carouselData.categoryId
        })
    }
    return selectedProducts
}

function renderHomeCarousels(): void {

    if (carouselsRoot && homeData) {
        carouselsRoot.replaceChildren()

        homeData.carousels.forEach(function (carouselData, index) {
            const section = createCarousel(carouselData, index)
            renderCarousel(section, getCarouselProducts(carouselData))
            carouselsRoot.append(section)
        })
    }
}

function renderFilteredProducts(activeCategory: Category): void {
    const selectedProducts = products.filter(function (product) {
        return product.categoryId === activeCategory.id
    })
    const carouselData = {
        id: "filtered-products",
        title: activeCategory.name,
        emoji: activeCategory.emoji
    }
    const section = createCarousel(carouselData)
    const categoryAnchor = document.createElement("span")
    categoryAnchor.className = "category-anchor"
    categoryAnchor.id = activeCategory.slug
    section.prepend(categoryAnchor)
    const summary = persianNumberFormat.format(selectedProducts.length) + " " + "کالا در دسته ی" + " " + activeCategory.name
    const summaryText = document.createElement("p")
    summaryText.className = "filter-summary"
    summaryText.textContent = summary
    const resetLink = document.createElement("a")
    resetLink.className = "button button--secondary"
    resetLink.textContent = "مشاهده‌ همه‌ی دسته‌ها"
    resetLink.href = "#categories"
    resetLink.addEventListener("click", navigate)
    const title = section.querySelector<HTMLHeadingElement>(".section__title")
    const subtitle = section.querySelector<HTMLParagraphElement>(".section__subtitle")

    if (title) {
        const titleRow = document.createElement("div")
        titleRow.className = "filtered-heading"

        title.before(titleRow)
        titleRow.append(title, resetLink)
    }

    if (subtitle) {
        const description = document.createElement("div")
        description.className = "filtered-description"
        description.append(summaryText)

        subtitle.replaceWith(description)
    }
    renderCarousel(section, selectedProducts)

    if (resultsRoot) {
        resultsRoot.replaceChildren(section)
    }
}

function renderCatalog(): void {
    const activeCategory = getSelectedCategory()

    updateCategoryLinks(activeCategory)

    if (carouselsRoot && resultsRoot) {
        if (activeCategory) {
            carouselsRoot.hidden = true
            carouselsRoot.replaceChildren()

            resultsRoot.hidden = false
            renderFilteredProducts(activeCategory)
        } else {
            carouselsRoot.hidden = false

            resultsRoot.hidden = true
            resultsRoot.replaceChildren()

            renderHomeCarousels()
        }
    }
}

//Guide
function renderGuide(): void {
    const data = shopContent.guide
    const section = document.querySelector<HTMLElement>("#shopping-guide")
    const currentShop = shopData

    if (section && currentShop) {
        section.setAttribute("aria-labelledby", "shopping-guide-title")
        const container = document.createElement("div")
        container.className = "container"
        const sectionHeader = document.createElement("header")
        sectionHeader.className = "section__header"
        const sectionTitle = document.createElement("h2")
        sectionTitle.className = "section__title"
        sectionTitle.textContent = data.title
        sectionTitle.id = "shopping-guide-title"
        sectionHeader.append(sectionTitle)
        const sectionSubtitle = document.createElement("p")
        sectionSubtitle.className = "section__subtitle"
        sectionSubtitle.textContent = data.subtitle
        sectionHeader.append(sectionSubtitle)
        container.append(sectionHeader)
        const guide = document.createElement("div")
        guide.className = "guide"
        const cards = document.createElement("div")
        cards.className = "guide__cards"
        const schedule = currentShop.schedule.map(function (entry) {
            return entry.days + " از " + entry.time
        }).join(" و ")
        data.cards.forEach(function (item) {
            const card = document.createElement("article")
            card.className = "info-card"
            card.id = item.id
            let text = item.text
            if (item.id === "shipping") {
                text = "سفارش‌ها در بازه‌های دوساعته ارسال می‌شوند؛" + " " + schedule +
                    ". ارسال سفارش‌های بالای" + " " + persianNumberFormat.format(currentShop.freeDeliveryOver) +
                    " " + currentShop.currency + " " + "رایگان است."
            }
            const infoCardTitle = document.createElement("h3")
            infoCardTitle.className = "info-card__title"
            infoCardTitle.textContent = item.title
            const infoCardText = document.createElement("p")
            infoCardText.className = "info-card__text"
            infoCardText.textContent = text
            card.append(infoCardTitle, infoCardText)
            cards.append(card)
        })
        const faq = document.createElement("div")
        faq.className = "faq"
        faq.id = "faq"
        const faqTitle = document.createElement("h3")
        faqTitle.className = "faq__title"
        faqTitle.textContent = data.faqTitle
        faq.append(faqTitle)
        data.questions.forEach(function (item, index) {
            const details = document.createElement("details")
            details.className = "faq__item"
            details.setAttribute("name", "faq")
            let answer = item.answer
            if (index === 0) {
                answer = "ارسال برای سفارش‌های بالای" + " " + persianNumberFormat.format(currentShop.freeDeliveryOver) +
                    " " + currentShop.currency + " رایگان است و برای سایر سفارش‌ها" + " " +
                    persianNumberFormat.format(currentShop.deliveryFee) + " " + currentShop.currency + " " + "هزینه دارد."
            }
            const faqQuestion = document.createElement("summary")
            faqQuestion.className = "faq__question"
            faqQuestion.textContent = item.question
            const faqAnswer = document.createElement("p")
            faqAnswer.className = "faq__answer"
            faqAnswer.textContent = answer
            details.append(faqQuestion, faqAnswer)
            faq.append(details)
        })
        guide.append(cards, faq)
        container.append(guide)
        section.replaceChildren(container)
        section.hidden = false
    }
}

//Footer
function createFooterAbout(currentShop: Shop): HTMLElement {
    const about = document.createElement("section")
    about.className = "footer-column"
    about.setAttribute("aria-labelledby", "footer-about-title")
    const heading = document.createElement("h2")
    heading.className = "footer-column__title footer-brand"
    heading.textContent = shopName
    heading.id = "footer-about-title"
    about.append(heading)
    const brandLogo = document.querySelector<SVGSVGElement>(".brand__logo")

    if (brandLogo) {
        const logo = brandLogo.cloneNode(true)

        if (logo instanceof SVGSVGElement) {
            logo.removeAttribute("aria-labelledby")
            logo.removeAttribute("role")
            logo.setAttribute("aria-hidden", "true")

            const logoTitle = logo.querySelector<SVGTitleElement>("title")

            if (logoTitle) {
                logoTitle.remove()
            }

            logo.classList.replace("brand__logo", "footer-brand__logo")
            heading.prepend(logo)
        }
    }
    const footerColumnText = document.createElement("p")
    footerColumnText.className = "footer-column__text"
    footerColumnText.textContent = currentShop.about
    about.append(footerColumnText)
    const address = document.createElement("address")
    address.className = "footer-contact"
    const locationRow = document.createElement("p")
    locationRow.className = "footer-contact__item"
    const locationIcon = document.createElement("img")
    locationIcon.className = "footer-icon"
    locationIcon.src = "svg/map-pin.svg"
    locationIcon.alt = ""
    locationIcon.width = 18
    locationIcon.height = 18
    locationIcon.setAttribute("aria-hidden", "true")
    locationRow.append(locationIcon, document.createTextNode(currentShop.address))
    const phoneRow = document.createElement("p")
    phoneRow.className = "footer-contact__item"
    const phoneLink = document.createElement("a")
    phoneLink.className = "footer-contact__link"
    phoneLink.textContent = currentShop.phone.replaceAll("-", "‑")
    phoneLink.href = "tel:" + currentShop.phone.replaceAll("-", "")
    phoneLink.dir = "ltr"
    const phoneIcon = document.createElement("img")
    phoneIcon.className = "footer-icon"
    phoneIcon.src = "svg/phone.svg"
    phoneIcon.alt = ""
    phoneIcon.width = 18
    phoneIcon.height = 18
    phoneIcon.setAttribute("aria-hidden", "true")
    phoneRow.append(phoneIcon, phoneLink)
    address.append(locationRow, phoneRow)
    about.append(address)
    return about
}

function createFooterLinks(
    title: string,
    headingId: string,
    entries: Link[]
): HTMLElement {
    const column = document.createElement("nav")
    column.className = "footer-column"
    column.setAttribute("aria-labelledby", headingId)
    const heading = document.createElement("h2")
    heading.className = "footer-column__title"
    heading.id = headingId
    heading.textContent = title
    const list = document.createElement("ul")
    list.className = "footer-links"
    entries.forEach(function (entry) {
        const item = document.createElement("li")
        const link = document.createElement("a")
        link.className = "footer-link"
        link.href = entry.href
        link.addEventListener("click", navigate)
        const arrow = document.createElement("img")
        arrow.className = "footer-link__icon"
        arrow.src = "svg/caret-left.svg"
        arrow.alt = ""
        arrow.width = 13
        arrow.height = 13
        arrow.setAttribute("aria-hidden", "true")
        link.append(arrow, document.createTextNode(entry.label))
        item.append(link)
        list.append(item)
    })
    column.append(heading, list)
    return column
}

function createFooterHours(currentShop: Shop): HTMLElement {
    const hours = document.createElement("section")
    hours.className = "footer-column"
    hours.setAttribute("aria-labelledby", "footer-hours-title")
    const columnTitle = document.createElement("h2")
    columnTitle.className = "footer-column__title"
    columnTitle.textContent = "ساعت کاری"
    columnTitle.id = "footer-hours-title"
    hours.append(columnTitle)
    const schedule = document.createElement("ul")
    schedule.className = "footer-hours"
    currentShop.schedule.forEach(function (entry) {
        const item = document.createElement("li")
        item.className = "footer-hours__item"
        const footerIcon = document.createElement("img")
        footerIcon.className = "footer-icon"
        footerIcon.src = "svg/calendar-dots.svg"
        footerIcon.alt = ""
        footerIcon.width = 18
        footerIcon.height = 18
        footerIcon.setAttribute("aria-hidden", "true")
        const textNode = document.createElement("span")
        textNode.textContent = entry.days + ": " + entry.time
        item.append(footerIcon, textNode)
        schedule.append(item)
    })
    hours.append(schedule)
    return hours
}

function renderFooter(): void {
    const footer = document.querySelector<HTMLElement>("#footer")
    const currentShop = shopData

    if (footer && currentShop) {
        const categoryLinks = categories.map(function (category) {
            return {
                label: category.name,
                href: "#" + category.slug
            }
        })

        const helpTargets = ["#shipping", "#returns", "#faq"]

        const helpLinks = currentShop.help.map(function (entry, index) {
            return {
                label: entry.label,
                href: entry.href === "#" ? helpTargets[index] : entry.href
            }
        })

        const grid = document.createElement("div")
        grid.className = "site-footer__grid container"

        grid.append(
            createFooterAbout(currentShop),
            createFooterLinks("دسته‌بندی کالاها", "footer-categories-title", categoryLinks),
            createFooterLinks("راهنمای خرید", "footer-guide-title", helpLinks),
            createFooterHours(currentShop)
        )

        const bottom = document.createElement("div")
        bottom.className = "site-footer__bottom container"

        const copyright = document.createElement("p")
        copyright.className = "copyright"
        copyright.textContent = currentShop.copyright.replaceAll(currentShop.name, shopName)

        const backToTopLink = document.createElement("a")
        backToTopLink.className = "back-to-top"
        backToTopLink.textContent = "بازگشت به بالا"
        backToTopLink.href = "#top"
        backToTopLink.addEventListener("click", navigate)

        bottom.append(copyright, backToTopLink)

        const contactAnchor = document.createElement("span")
        contactAnchor.className = "category-anchor"
        contactAnchor.id = "contact"

        footer.replaceChildren(contactAnchor, grid, bottom)
        footer.hidden = false
    }
}
// closeMenu
function closeMenus(): void {
    document.querySelectorAll<HTMLDetailsElement>(
        ".mobile-menu, .mobile-category-menu"
    ).forEach(function (menu) {
        menu.open = false
    })
}
function navigate(event: MouseEvent): void {
    const anchor = event.currentTarget

    if (anchor instanceof HTMLAnchorElement) {
        const href = anchor.getAttribute("href")

        if (href !== null) {
            event.preventDefault()

            const category = categories.find(function (item) {
                return "#" + item.slug === href
            })

            if (category) {
                changeCategory(category)
            } else {
                showAll(href)
            }

            closeMenus()
        }
    }
}

function getSelectedCategory(): Category | null {
    const params = new URLSearchParams(location.search)
    const fragment = location.hash.slice(1)
    const slug = params.has("cat") ? params.get("cat") : fragment
    return categories.find(function (category) {
        return category.slug === slug
    }) || null
}

function updateCategoryLinks(activeCategory: Category | null): void {
    categories.forEach(function (category) {
        const links = document.querySelectorAll<HTMLAnchorElement>(
            "a[href=\"#" + category.slug + "\"]"
        )

        links.forEach(function (anchor) {
            if (activeCategory && activeCategory.id === category.id) {
                anchor.setAttribute("aria-current", "true")
            } else {
                anchor.removeAttribute("aria-current")
            }
        })
    })
}

function scrollToCurrentSection(): void {
    let target: HTMLElement | null

    if (getSelectedCategory()) {
        target = document.querySelector<HTMLElement>("#filtered-products")
    } else {
        target = document.getElementById(location.hash.slice(1))
    }

    if (target) {
        target.scrollIntoView({
            block: "start",
            inline: "start"
        })
    }
}

function followRoute(shouldScroll: boolean = false): void {
    if (isPageReady) {
        renderCatalog()
        if (shouldScroll) {
            scrollToCurrentSection()
        }
    }
}

function changeCategory(category: Category): void {
    const url = new URL(location.href)
    url.searchParams.set("cat", category.slug)
    url.hash = ""
    history.pushState(null, "", url)
    followRoute(true)
}

function showAll(href: string = "#categories"): void {
    const url = new URL(location.href)
    url.searchParams.delete("cat")
    url.hash = href.slice(1)
    history.pushState(null, "", url)
    const search = document.querySelector<HTMLInputElement>("#product-search")

    if (search) {
        search.value = ""
    }
    followRoute(true)
}

// Isloading
function setPageState(message: string, isLoading: boolean): void {


    if (pageStatus) {
        pageStatus.classList.add("page-status")
        pageStatus.hidden = false
        pageStatus.setAttribute("aria-busy", String(isLoading))

        const messageText = document.createElement("p")
        messageText.textContent = message

        pageStatus.replaceChildren(messageText)
    }
}

async function fetchJson<dataType>(fileName: string): Promise<dataType> {
    const response = await fetch(api + fileName)

    if (!response.ok) {
        throw new Error("HTTP " + response.status)
    }

    return response.json()
}

function renderPage(): void {
    renderHeader()
    renderHero()
    renderCategories()
    renderPromos()
    renderCatalog()
    renderGuide()
    renderFooter()
}


async function loadPage(): Promise<void> {
    isPageReady = false

    const search = document.querySelector<HTMLInputElement>("#product-search")

    if (search) {
        search.disabled = true
    }

    setPageState("در حال بارگذاری فروشگاه...", true)

    let slowTimer: number | undefined

    try {
        const allRequests = Promise.all([
            fetchJson<Product[]>("products.json"),
            fetchJson<Stock>("stock.json"),
            fetchJson<Offer[]>("offers.json"),
            fetchJson<Category[]>("categories.json"),
            fetchJson<Shop>("shop.json"),
            fetchJson<Home>("home.json")
        ])

        const slowConnection = new Promise<"slow">(function (resolve) {
            slowTimer = window.setTimeout(function () {
                resolve("slow")
            }, 3000)
        })

        let data = await Promise.race([allRequests, slowConnection])

        if (data === "slow") {
            setPageState(
                "اتصال کند است؛ هنوز در حال دریافت اطلاعات فروشگاه هستیم...",
                true
            )

            data = await allRequests
        }

        products = data[0]
        stockByProductId = data[1].items
        offers = data[2]
        categories = data[3]
        shopData = data[4]
        homeData = data[5]

        renderPage()
        isPageReady = true

        if (pageStatus) {
            pageStatus.hidden = true
        }

        if (location.hash || location.search) {
            scrollToCurrentSection()
        }
    } catch {
        let message = "دریافت اطلاعات فروشگاه انجام نشد. لطفاً صفحه را دوباره بارگذاری کنید."

        if (location.protocol === "file:") {
            message = "npm run dev را اجرا کنید."
        }

        setPageState(message, false)
    } finally {
        window.clearTimeout(slowTimer)
    }
}


function handleRouteChange(): void {
    followRoute(true)
}

window.addEventListener("hashchange", handleRouteChange)
window.addEventListener("popstate", handleRouteChange)
initializeHeader()
loadPage()

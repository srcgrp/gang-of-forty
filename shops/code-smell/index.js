"use strict"

const api = "../../api/"
const shopName = "سوپرمارکت بوی کد"
const persianNumberFormat = new Intl.NumberFormat("fa-IR")
const cartKey = "code-smell-shopping-cart"
let products = []
let categories = []
let stockByProductId = {}
let offers = []
let shopData = null
let homeData = null
let isPageReady = false
const cart = readCart()

//Cart 
function readCart() {
    try {
        return JSON.parse(localStorage.getItem(cartKey) || "{}")
    } catch {
        return {}
    }
}

function updateCartCount() {
    let count = 0
    Object.values(cart).forEach(function (quantity) {
        count += quantity
    })
    document.querySelector(".cart-button__badge").textContent = persianNumberFormat.format(count)
    document.querySelector(".cart-button").setAttribute(
        "aria-label", "سبد خرید:"+ " "+ persianNumberFormat.format(count) +" "+ "کالا"
    )
}

function addToCart(product) {
    cart[product.id] = (cart[product.id] || 0) + 1
    updateCartCount()
    localStorage.setItem(cartKey, JSON.stringify(cart))
}

// header
function initializeHeader() {
    document.querySelector(".brand").addEventListener("click", navigate)
    const brand = document.querySelector("#brand-text")
    const brandName = document.createElement("strong")
    brandName.className = "brand__name"
    brandName.textContent = shopName
    const brandTagline = document.createElement("span")
    brandTagline.className = "brand__tagline"
    brand.append(brandName, brandTagline)
    const searchContainer = document.querySelector("#search-root")
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
    searchContainer.append(label, searchIcon, searchInput)
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
    document.querySelector("#cart-button").append(
        cartButtonIcon,
        cartButtonLabel,
        cartButtonBadge
    )
    updateCartCount()
}

function createCategoryMenu(isMobile) {
    const item = document.createElement("li")
    item.className = "category-menu"
    let wrapper = item
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

function createMainMenu(isMobile) {
    const list = document.createElement("ul")
    list.className = "site-nav__list container"
    list.append(createCategoryMenu(isMobile))
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
    return list
}

function renderHeader() {
    document.querySelector("#announcement").textContent = shopData.notice
    document.querySelector(".brand__tagline").textContent = shopData.slogan
    document.querySelector("#site-nav").replaceChildren(
        createMainMenu(false)
    )
    const mobileMenu = document.querySelector("#mobile-menu")
    const summary = document.createElement("summary")
    summary.className = "menu-toggle"
    summary.textContent = "☰"
    summary.setAttribute("aria-label", "منوی اصلی")
    const mobileNav = document.createElement("nav")
    mobileNav.className = "mobile-nav"
    mobileNav.setAttribute("aria-label", "منوی اصلی موبایل")
    mobileNav.append(createMainMenu(true))
    mobileMenu.replaceChildren(summary, mobileNav)
    const search = document.querySelector("#product-search")
    search.disabled = false
    search.placeholder =
        "جستجو در میان"+" " +
        persianNumberFormat.format(products.length) +
        " "+"کالا..."
}


// Hero
function renderHero() {
    const section = document.querySelector("#hero")
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
        "ارسال در"+ " " + shopData.city,
        "ساعت فعالیت:"+" "+ shopData.hours.open +" "+ "تا"+" " + shopData.hours.close,
        "ارسال رایگان از"+" "+ persianNumberFormat.format(shopData.freeDeliveryOver) + " " + shopData.currency
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

// Categories
function renderCategories() {
    const section = document.querySelector("#categories")
    section.setAttribute("aria-labelledby", "categories-title")
    const container = document.createElement("div")
    container.className = "container"
    const sectionHeader = document.createElement("header")
    sectionHeader.className = "section__header"
    const sectionTitle = document.createElement("h2")
    sectionTitle.className = "section__title"
    sectionTitle.textContent = "دسته‌بندی کالاها"
    sectionTitle.id = "categories-title"
    sectionHeader.append(sectionTitle)
    const sectionSubtitle = document.createElement("p")
    sectionSubtitle.className = "section__subtitle"
    sectionSubtitle.textContent = "برای خرید راحتتر، دسته بندی مورد نظرتان را انتخاب کنید."
    sectionHeader.append(sectionSubtitle)
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
    reset.textContent = "نمایش همه دسته‌ها"
    reset.href = "#categories"
    reset.addEventListener("click", navigate)
    container.append(list, reset)
    section.replaceChildren(container)
    section.hidden = false
}

//Banner
function createSideBanner() {
    const side = document.createElement("article")
    side.className = "hero-side promo-side"
    const heading = document.createElement("h3")
    heading.className = "hero-side__title"
    heading.textContent = homeData.side.title
    const heroSideEmoji = document.createElement("span")
    heroSideEmoji.className = "hero-side__emoji"
    heroSideEmoji.textContent = homeData.side.emoji
    heroSideEmoji.setAttribute("aria-hidden", "true")
    heading.prepend(heroSideEmoji)
    const heroSideText = document.createElement("p")
    heroSideText.className = "hero-side__text"
    heroSideText.textContent = homeData.side.text
    const sideLink = document.createElement("a")
    sideLink.className = "button button--primary"
    sideLink.textContent = homeData.side.cta.label
    sideLink.href = homeData.side.cta.href
    sideLink.addEventListener("click", navigate)
    side.append(heading, heroSideText, sideLink)
    return side
}

function renderPromos() {
    const section = document.querySelector("#special-offers")
    section.setAttribute("aria-labelledby", "special-offers-title")
    const container = document.createElement("div")
    container.className = "container"
    const sectionHeader = document.createElement("header")
    sectionHeader.className = "section__header"
    const sectionTitle = document.createElement("h2")
    sectionTitle.className = "section__title"
    sectionTitle.textContent = "پیشنهاد ویژه"
    sectionTitle.id = "special-offers-title"
    sectionHeader.append(sectionTitle)
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
    grid.append(createSideBanner())
    container.append(grid)
    section.replaceChildren(container)
    section.hidden = false
}

//carousel
function getProductOffer(productId) {
    return offers.find(function (offer) {
        return offer.productId === productId
    })
}

function createProductMedia(product, offer, isUnavailable) {
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

function createProductPrice(product, offer) {
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
    priceUnit.textContent = shopData.currency
    currentPrice.append(priceUnit)
    price.append(currentPrice)
    return price
}

function createAddButton(product, isUnavailable) {
    const button = document.createElement("button")
    button.className = "button button--secondary button--block"
    button.type = "button"
    button.disabled = isUnavailable

    const buttonLabel = isUnavailable
        ? product.name + ": ناموجود"
        : "افزودن به سبد خرید:"+" " + product.name

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
        addToCart(product)
    })

    return button
}

function createProductCard(product, sectionId, index) {
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
    productCardCategory.textContent = category.name

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
function scrollCarousel(section, direction) {
    const cards = section.querySelectorAll(".product-grid > li")
    let target
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

function createCarouselControls(section, title) {
    const controls = document.createElement("nav")
    controls.className = "carousel-controls"
    controls.setAttribute("aria-label", "کنترل کاروسل " + title)
    const directions = ["start", "end"]
    directions.forEach(function (direction) {
        const control = document.createElement("a")
        control.href = "#" + section.id + "-item-1"
        const positionLabel = direction === "start" ? "ابتدای" : "انتهای"
        control.setAttribute("aria-label", positionLabel + " کاروسل " + title)
        control.title = control.getAttribute("aria-label")
        const arrowDirection = direction === "start" ? "right" : "left"
        const carouselArrow = document.createElement("img")
        carouselArrow.className = "carousel-arrow"
        carouselArrow.src = "svg/caret-" + arrowDirection + ".svg"
        carouselArrow.alt = ""
        carouselArrow.width = 13
        carouselArrow.height = 13
        carouselArrow.setAttribute("aria-hidden", "true")
        control.append(carouselArrow)
        control.addEventListener("click", function (event) {
            event.preventDefault()
            scrollCarousel(section, direction)
        })
        controls.append(control)
    })
    return controls
}
function createCarousel(carouselData, index = 0) {
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
    list.setAttribute("aria-label", "کاروسل"+" " + carouselData.title)
    list.setAttribute("aria-describedby", status.id)

    container.append(header, status, list)
    section.append(container)

    return section
}

function renderCarousel(section, selectedProducts) {
    const list = section.querySelector(".product-grid")
    const status = section.querySelector(".catalog-status")

    list.replaceChildren()

    selectedProducts.forEach(function (product, index) {
        list.append(createProductCard(product, section.id, index))
    })

    list.hidden = selectedProducts.length === 0
    status.textContent = selectedProducts.length ? "" : "کالایی برای نمایش پیدا نشد."
    status.hidden = selectedProducts.length > 0

    section.querySelectorAll(".carousel-controls a").forEach(function (control, index) {
        control.href = "#" + section.id + "-item-" + (index === 0 ? 1 : selectedProducts.length || 1)

        if (selectedProducts.length > 0) {
            control.removeAttribute("aria-disabled")
        } else {
            control.setAttribute("aria-disabled", "true")
        }

        control.tabIndex = selectedProducts.length ? 0 : -1
    })

    list.scrollLeft = 0
}
function getCarouselProducts(carouselData) {
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

function renderHomeCarousels() {
    const root = document.querySelector("#carousels-root")
    root.replaceChildren()
    homeData.carousels.forEach(function (carouselData, index) {
        const section = createCarousel(carouselData, index)
        renderCarousel(section, getCarouselProducts(carouselData))
        root.append(section)
    })
}

function renderFilteredProducts(activeCategory) {
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
    const summary = persianNumberFormat.format(selectedProducts.length) +" " +"کالا در دسته ی"+" " + activeCategory.name
    const summaryText = document.createElement("p")
    summaryText.className = "filter-summary"
    summaryText.textContent = summary
    const resetLink = document.createElement("a")
    resetLink.className = "button button--secondary"
    resetLink.textContent = "نمایش همه دسته‌ها"
    resetLink.href = "#categories"
    resetLink.addEventListener("click", navigate)
    summaryText.append(resetLink)
    section.querySelector(".container").prepend(summaryText)
    renderCarousel(section, selectedProducts)
    document.querySelector("#results-root").replaceChildren(section)
}

function renderCatalog() {
    const activeCategory = getSelectedCategory()
    const carouselsRoot = document.querySelector("#carousels-root")
    const resultsRoot = document.querySelector("#results-root")
    updateCategoryLinks(activeCategory)
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

//Guide
function renderGuide() {
    const data = shopContent.guide
    const section = document.querySelector("#shopping-guide")
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
    const schedule = shopData.schedule.map(function (entry) {
        return entry.days + " از " + entry.time
    }).join(" و ")
    data.cards.forEach(function (item) {
        const card = document.createElement("article")
        card.className = "info-card"
        card.id = item.id
        let text = item.text
        if (item.id === "shipping") {
            text = "سفارش‌ها در بازه‌های دوساعته ارسال می‌شوند؛" +" "+ schedule +
                ". ارسال سفارش‌های بالای" +" "+ persianNumberFormat.format(shopData.freeDeliveryOver) +
                " " + shopData.currency + " "+"رایگان است."
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
            answer = "ارسال برای سفارش‌های بالای" +" "+ persianNumberFormat.format(shopData.freeDeliveryOver) +
                " " + shopData.currency + " رایگان است و برای سایر سفارش‌ها"+ " "+
                persianNumberFormat.format(shopData.deliveryFee) + " " + shopData.currency + " "+"هزینه دارد."
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

//Footer
function createFooterAbout() {
    const about = document.createElement("section")
    about.className = "footer-column"
    about.setAttribute("aria-labelledby", "footer-about-title")
    const heading = document.createElement("h2")
    heading.className = "footer-column__title footer-brand"
    heading.textContent = shopName
    heading.id = "footer-about-title"
    about.append(heading)
    const logo = document.querySelector(".brand__logo").cloneNode(true)
    logo.removeAttribute("aria-labelledby")
    logo.removeAttribute("role")
    logo.setAttribute("aria-hidden", "true")
    logo.querySelector("title").remove()
    logo.classList.replace("brand__logo", "footer-brand__logo")
    heading.prepend(logo)
    const footerColumnText = document.createElement("p")
    footerColumnText.className = "footer-column__text"
    footerColumnText.textContent = shopData.about
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
    locationRow.append(locationIcon, document.createTextNode(shopData.address))
    const phoneRow = document.createElement("p")
    phoneRow.className = "footer-contact__item"
    const phoneLink = document.createElement("a")
    phoneLink.className = "footer-contact__link"
    phoneLink.textContent = shopData.phone.replaceAll("-", "‑")
    phoneLink.href = "tel:" + shopData.phone.replaceAll("-", "")
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

function createFooterLinks(title, headingId, entries) {
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

function createFooterHours() {
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
    shopData.schedule.forEach(function (entry) {
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

function renderFooter() {
    const categoryLinks = categories.map(function (category) {
        return {
            label: category.name,
            href: "#" + category.slug
        }
    })
    const helpTargets = ["#shipping", "#returns", "#faq"]
    const helpLinks = shopData.help.map(function (entry, index) {
        return {
            label: entry.label,
            href: entry.href === "#" ? helpTargets[index] : entry.href
        }
    })
    const footer = document.querySelector("#footer")
    const grid = document.createElement("div")
    grid.className = "site-footer__grid container"
    grid.append(
        createFooterAbout(),
        createFooterLinks("دسته‌بندی کالاها", "footer-categories-title", categoryLinks),
        createFooterLinks("راهنمای خرید", "footer-guide-title", helpLinks),
        createFooterHours()
    )
    const bottom = document.createElement("div")
    bottom.className = "site-footer__bottom container"
    const copyright = document.createElement("p")
    copyright.className = "copyright"
    copyright.textContent = shopData.copyright.replaceAll(shopData.name, shopName)
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

// closeMenu
function closeMenus() {
    document.querySelectorAll(".mobile-menu, .mobile-category-menu").forEach(function (menu) {
        menu.open = false
    })
}

function navigate(event) {
    const href = event.currentTarget.getAttribute("href")
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

function getSelectedCategory() {
    const params = new URLSearchParams(location.search)
    const fragment = location.hash.slice(1)
    const slug = params.has("cat") ? params.get("cat") : fragment
    return categories.find(function (category) {
        return category.slug === slug
    }) || null
}

function updateCategoryLinks(activeCategory) {
    categories.forEach(function (category) {
        document.querySelectorAll("a[href=\"#" + category.slug + "\"]").forEach(function (anchor) {
            if (activeCategory && activeCategory.id === category.id) {
                anchor.setAttribute("aria-current", "true")
            } else {
                anchor.removeAttribute("aria-current")
            }
        })
    })
}

function scrollToCurrentSection() {
    let target
    if (getSelectedCategory()) {
        target = document.querySelector("#filtered-products")
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

function followRoute(shouldScroll = false) {
    if (isPageReady) {
        renderCatalog()
        if (shouldScroll) {
            scrollToCurrentSection()
        }
    }
}

function changeCategory(category) {
    const url = new URL(location.href)
    url.searchParams.set("cat", category.slug)
    url.hash = ""
    history.pushState(null, "", url)
    followRoute(true)
}

function showAll(href = "#categories") {
    const url = new URL(location.href)
    url.searchParams.delete("cat")
    url.hash = href.slice(1)
    history.pushState(null, "", url)
    document.querySelector("#product-search").value = ""
    followRoute(true)
}

// Isloading
function setPageState(message, isLoading) {
    const status = document.querySelector("#page-status")
    status.classList.add("page-status")
    status.hidden = false
    status.setAttribute("aria-busy", String(isLoading))
    const messageText = document.createElement("p")
    messageText.textContent = message
    status.replaceChildren(messageText)
}

async function fetchJson(fileName) {
    const response = await fetch(api + fileName)
    if (!response.ok) {
        throw new Error("HTTP " + response.status)
    }
    return response.json()
}

function renderPage() {
    renderHeader()
    renderHero()
    renderCategories()
    renderPromos()
    renderCatalog()
    renderGuide()
    renderFooter()
}

async function loadPage() {
    isPageReady = false
    document.querySelector("#product-search").disabled = true
    setPageState("در حال بارگذاری فروشگاه...", true)
    let slowTimer
    try {
        const allRequests = Promise.all([
            fetchJson("products.json"),
            fetchJson("stock.json"),
            fetchJson("offers.json"),
            fetchJson("categories.json"),
            fetchJson("shop.json"),
            fetchJson("home.json")
        ])
        const slowConnection = new Promise(function (resolve) {
            slowTimer = setTimeout(function () {
                resolve("slow")
            }, 3000)
        })
        let data = await Promise.race([allRequests, slowConnection])
        if (data === "slow") {
            setPageState("اتصال کند است؛ هنوز در حال دریافت اطلاعات فروشگاه هستیم...", true)
            data = await allRequests
        }
        [products, stockByProductId, offers, categories, shopData, homeData] = data
        stockByProductId = stockByProductId.items
        renderPage()
        isPageReady = true
        document.querySelector("#page-status").hidden = true
        if (location.hash || location.search) {
            scrollToCurrentSection()
        }
    } catch {
        let message = "دریافت اطلاعات فروشگاه انجام نشد. لطفاً صفحه را دوباره بارگذاری کنید."
        if (location.protocol === "file:") {
            message = "برای دریافت اطلاعات، پروژه را با Live Server یا npx serve . اجرا کنید."
        }
        setPageState(message, false)
    } finally {
        clearTimeout(slowTimer)
    }
}


function handleRouteChange() {
    followRoute(true)
}

window.addEventListener("hashchange", handleRouteChange)
window.addEventListener("popstate", handleRouteChange)
initializeHeader()
loadPage()

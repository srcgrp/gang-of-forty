'use strict';

const API = '../../api/';
const SHOP_NAME = 'سوپرمارکت بوی کد';
const numberFormat = new Intl.NumberFormat('fa-IR');
const CART_KEY = 'code-smell-cart-v1';
let products = [];
let categories = [];
let stock = {};
let offersById = new Map();
let shop = null;
let home = null;
let ready = false;
let loading = false;
let cart = readCart();

function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = String(text);
    return node;
}

function emoji(value, className) {
    const node = element('span', className, value);
    node.setAttribute('aria-hidden', 'true');
    return node;
}

function image(filename, className, size, alt = '') {
    const node = element('img', className);
    node.src = filename;
    node.alt = alt;
    node.width = size;
    node.height = size;
    node.decoding = 'async';
    if (!alt) node.setAttribute('aria-hidden', 'true');
    return node;
}

function safeHref(value) {
    if (typeof value !== 'string' || !/^#[a-zA-Z0-9_-]*$/.test(value)) return '#categories';
    return value;
}

function link(label, href, className) {
    const node = element('a', className, label);
    node.href = safeHref(href);
    return node;
}

function categoryIcon(category, className) {
    const node = element('span', className);
    node.setAttribute('aria-hidden', 'true');
    if (/^#[0-9a-f]{6}$/i.test(category.color)) node.style.backgroundColor = category.color;
    node.append(emoji(category.emoji, 'category-icon__emoji'));
    return node;
}

function sectionHeader(title, id, subtitle = '') {
    const header = element('header', 'section__header');
    const heading = element('h2', 'section__title', title);
    heading.id = id;
    header.append(heading);
    if (subtitle) header.append(element('p', 'section__subtitle', subtitle));
    return header;
}

function readCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY) || '{}');
        if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return {};
        const result = {};
        Object.entries(saved).forEach(([id, count]) => {
            if (/^\d+$/.test(id) && Number.isSafeInteger(count) && count > 0) result[id] = count;
        });
        return result;
    } catch {
        return {};
    }
}

function persistCart() {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        return true;
    } catch {
        return false;
    }
}

function updateCart() {
    const count = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
    document.querySelector('.cart-button__badge').textContent = numberFormat.format(count);
    document.querySelector('.cart-button').setAttribute('aria-label', `سبد خرید: ${numberFormat.format(count)} کالا`);
}

function reconcileCart() {
    const next = {};
    products.forEach((product) => {
        const quantity = Math.min(cart[product.id] || 0, stock[product.id] || 0);
        if (quantity > 0) next[product.id] = quantity;
    });
    cart = next;
    persistCart();
    updateCart();
}

function announce(message) {
    document.querySelector('#cart-status').textContent = message;
}

function addToCart(product, button) {
    const available = stock[product.id] ?? 0;
    if ((cart[product.id] || 0) >= available) {
        announce(' موجودی این کالا تمام شده است.');
        return;
    }
    cart[product.id] = (cart[product.id] || 0) + 1;
    const saved = persistCart();
    updateCart();
    announce(`${product.name} به سبد خرید اضافه شد.${saved ? '' : ' ذخیره در سبد خرید ممکن نیست.'}`);
    button.setAttribute('aria-label', `افزودن به سبد خرید: ${product.name}؛ ${numberFormat.format(cart[product.id])} عدد در سبد`);
}

function initializeHeader() {
    const brand = document.querySelector('#brand-text');
    brand.append(element('strong', 'brand__name', SHOP_NAME));
    brand.append(element('span', 'brand__tagline'));
    const search = document.querySelector('#search-root');
    const label = element('label', 'sr-only', 'جستجوی کالا');
    label.htmlFor = 'product-search';
    const input = element('input', 'search__input');
    input.id = 'product-search';
    input.name = 'q';
    input.type = 'search';
    input.autocomplete = 'off';
    input.setAttribute('enterkeyhint', 'search');
    input.placeholder = 'جستجوی کالا...';
    input.disabled = true;
    input.addEventListener('input', () => { if (ready) renderCatalog(); });
    search.append(label, image('svg/magnifying-glass.svg', 'search__icon', 18), input);
    document.querySelector('#cart-button').append(
        image('svg/shopping-cart.svg', 'cart-button__icon', 20),
        element('span', 'cart-button__label', 'سبد خرید'),
        element('span', 'cart-button__badge', '۰')
    );
    const status = element('p', 'sr-only');
    status.id = 'cart-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    document.querySelector('#header-bar').append(status);
    updateCart();
}

function categoryMenu(mobile) {
    const item = element('li', 'category-menu');
    const wrapper = mobile ? element('details', 'mobile-category-menu') : item;
    const toggle = mobile
        ? element('summary', 'category-menu__toggle', 'دسته‌‌بندی کالاها')
        : link('دسته‌بندی کالاها', '#categories', 'category-menu__toggle');
    const arrow = image('svg/caret-left.svg', 'category-menu__chevron menu-chevron', 16);
    toggle.append(arrow);
    const list = element('ul', mobile ? 'mobile-categories' : 'category-menu__list');
    categories.forEach((category) => {
        const row = element('li');
        const anchor = link('', `#${category.slug}`, 'menu-link');
        anchor.append(categoryIcon(category, 'menu-link__icon category-visual'), document.createTextNode(category.name));
        row.append(anchor);
        list.append(row);
    });
    wrapper.append(toggle, list);
    if (mobile) item.append(wrapper);
    return item;
}

function mainMenu(mobile) {
    const list = element('ul', 'site-nav__list container');
    list.append(categoryMenu(mobile));
    shop.menu.forEach((entry) => {
        const item = element('li');
        item.append(link(entry.label, entry.href, 'site-nav__link'));
        list.append(item);
    });
    return list;
}

function renderHeader() {
    document.querySelector('#announcement').textContent = shop.notice;
    document.querySelector('.brand__name').textContent = SHOP_NAME;
    document.querySelector('.brand__tagline').textContent = shop.slogan;
    document.querySelector('.brand').setAttribute('aria-label', `${SHOP_NAME}، بازگشت به بالای صفحه`);
    document.title = `${SHOP_NAME} | خرید آنلاین کالاهای تازه`;
    document.querySelector('meta[name="description"]').content = shop.about;
    document.querySelector('meta[property="og:site_name"]').content = SHOP_NAME;
    document.querySelector('meta[property="og:title"]').content = SHOP_NAME;
    document.querySelector('meta[property="og:description"]').content = shop.about;
    document.querySelector('#site-nav').replaceChildren(mainMenu(false));
    const mobile = document.querySelector('#mobile-menu');
    const summary = element('summary', 'menu-toggle', '☰');
    summary.setAttribute('aria-label', 'منوی اصلی');
    const nav = element('nav', 'mobile-nav');
    nav.setAttribute('aria-label', 'منوی اصلی موبایل');
    nav.append(mainMenu(true));
    mobile.replaceChildren(summary, nav);
    const search = document.querySelector('#product-search');
    search.disabled = false;
    search.placeholder = `جستجو در میان ${numberFormat.format(products.length)} کالا...`;
}

function renderHero() {
    const section = document.querySelector('#hero');
    section.setAttribute('aria-labelledby', 'hero-title');
    const container = element('div', 'hero__inner container');
    const content = element('div', 'hero__content');
    const heading = element('h1', 'hero__title', home.hero.title);
    heading.id = 'hero-title';
    heading.prepend(emoji(home.hero.emoji, 'hero-title__emoji'), document.createTextNode(' '));
    const actions = element('div', 'hero__actions');
    actions.append(link(home.hero.cta.label, home.hero.cta.href, 'button button--primary'));
    actions.append(link('دسته‌بندی کالاها', '#categories', 'button button--secondary'));
    const features = element('ul', 'hero__features');
    const localTime = (value) => value.replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]);
    [
        `ارسال در ${shop.city}`,
        `ساعت فعالیت: ${localTime(shop.hours.open)} تا ${localTime(shop.hours.close)}`,
        `ارسال رایگان از ${numberFormat.format(shop.freeDeliveryOver)} ${shop.currency}`
    ].forEach((text) => features.append(element('li', '', text)));
    content.append(element('p', 'hero__eyebrow', SHOP_NAME), heading,
        element('p', 'hero__text', home.hero.text), actions, features);
    const media = element('div', 'hero__image-wrap');
    media.append(image('images/Golden%20Tote.webp', 'hero__image', 320));
    // Only the decorative illustration and logo belong to the local design.
    container.append(content, media);
    section.replaceChildren(container);
    section.hidden = false;
}

function sideBanner() {
    const side = element('article', 'hero-side promo-side');
    const heading = element('h3', 'hero-side__title', home.side.title);
    heading.prepend(emoji(home.side.emoji, 'hero-side__emoji'));
    side.append(heading, element('p', 'hero-side__text', home.side.text),
        link(home.side.cta.label, home.side.cta.href, 'button button--primary'));
    return side;
}

function renderCategories() {
    const section = document.querySelector('#categories');
    section.setAttribute('aria-labelledby', 'categories-title');
    const container = element('div', 'container');
    container.append(sectionHeader('دسته‌بندی کالاها', 'categories-title',
        'برای خرید روزانه، دسته بندی مورد نظر را انتخاب کنید.'));
    const list = element('ul', 'category-grid');
    categories.forEach((category) => {
        const item = element('li', 'category-card');
        item.id = `category-${category.slug}`;
        const anchor = link('', `#${category.slug}`, 'category-card__link');
        anchor.append(categoryIcon(category, 'category-card__icon category-visual'),
            element('h3', 'category-card__title', category.name),
            element('p', 'category-card__meta', 'دیدن کالاها ←'));
        item.append(anchor);
        list.append(item);
    });
    const reset = link('نمایش همه دسته‌ها', '#categories', 'button button--secondary category-reset');
    reset.dataset.resetCategory = 'true';
    container.append(list, reset);
    section.replaceChildren(container);
    section.hidden = false;
}

function renderPromos() {
    const section = document.querySelector('#special-offers');
    section.setAttribute('aria-labelledby', 'special-offers-title');
    const container = element('div', 'container');
    container.append(sectionHeader('پیشنهاد ویژه', 'special-offers-title'));
    const grid = element('div', 'promo-grid');
    home.promos.forEach((promo) => {
        const card = element('article', 'promo-card promo-card--api');
        if (/^#[0-9a-f]{6}$/i.test(promo.color)) card.style.backgroundColor = promo.color;
        const heading = element('h3', 'promo-card__title', promo.text);
        card.append(heading, link('مشاهده کالاها', promo.href, 'button button--dark'));
        card.append(emoji(promo.emoji, 'promo-card__art promo-card__emoji'));
        grid.append(card);
    });
    grid.append(sideBanner());
    container.append(grid);
    section.replaceChildren(container);
    section.hidden = false;
}

function renderGuide() {
    const data = SHOP_CONTENT.guide;
    const section = document.querySelector('#shopping-guide');
    section.setAttribute('aria-labelledby', 'shopping-guide-title');
    const container = element('div', 'container');
    container.append(sectionHeader(data.title, 'shopping-guide-title', data.subtitle));
    const guide = element('div', 'guide');
    const cards = element('div', 'guide__cards');
    data.cards.forEach((item) => {
        const card = element('article', 'info-card');
        card.id = item.id;
        const schedule = shop.schedule.map((entry) => `${entry.days} از ${entry.time}`).join(' و ');
        const text = item.id === 'shipping'
            ? `سفارش‌ها در بازه‌های دوساعته ارسال می‌شوند؛ ${schedule}. ارسال سفارش‌های بالای ${numberFormat.format(shop.freeDeliveryOver)} ${shop.currency} رایگان است.`
            : item.text;
        card.append(element('h3', 'info-card__title', item.title), element('p', 'info-card__text', text));
        cards.append(card);
    });
    const faq = element('div', 'faq');
    faq.id = 'faq';
    faq.append(element('h3', 'faq__title', data.faqTitle));
    data.questions.forEach((item, index) => {
        const details = element('details', 'faq__item');
        details.setAttribute('name', 'faq');
        const answer = index === 0
            ? `ارسال برای سفارش‌های بالای ${numberFormat.format(shop.freeDeliveryOver)} ${shop.currency} رایگان است و برای سایر سفارش‌ها ${numberFormat.format(shop.deliveryFee)} ${shop.currency} هزینه دارد.`
            : item.answer;
        details.append(element('summary', 'faq__question', item.question), element('p', 'faq__answer', answer));
        faq.append(details);
    });
    guide.append(cards, faq);
    container.append(guide);
    section.replaceChildren(container);
    section.hidden = false;
}

function footerColumn(tag, title, id) {
    const column = element(tag, 'footer-column');
    column.setAttribute('aria-labelledby', id);
    const heading = element('h2', 'footer-column__title', title);
    heading.id = id;
    column.append(heading);
    return column;
}

function footerLink(label, href) {
    const item = element('li');
    const anchor = link('', href, 'footer-link');
    anchor.append(image('svg/caret-left.svg', 'footer-link__icon', 13), document.createTextNode(label));
    item.append(anchor);
    return item;
}

function renderFooter() {
    const footer = document.querySelector('#footer');
    const grid = element('div', 'site-footer__grid container');
    const about = footerColumn('section', SHOP_NAME, 'footer-about-title');
    const heading = about.querySelector('h2');
    heading.classList.add('footer-brand');
    const logo = document.querySelector('.brand__logo').cloneNode(true);
    logo.removeAttribute('aria-labelledby');
    logo.removeAttribute('role');
    logo.setAttribute('aria-hidden', 'true');
    logo.querySelector('title').remove();
    logo.classList.replace('brand__logo', 'footer-brand__logo');
    heading.prepend(logo);
    about.append(element('p', 'footer-column__text', shop.about));
    if (shop.owner) about.append(element('p', 'footer-column__text', `مدیریت: ${shop.owner}`));
    const address = element('address', 'footer-contact');
    const location = element('p', 'footer-contact__item');
    location.append(image('svg/map-pin.svg', 'footer-icon', 18), document.createTextNode(shop.address));
    const telephone = element('p', 'footer-contact__item');
    const phone = element('a', 'footer-contact__link', shop.phone.replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]).replaceAll('-', '‑'));
    phone.href = `tel:${shop.phone.replace(/[^+\d]/g, '')}`;
    phone.dir = 'ltr';
    telephone.append(image('svg/phone.svg', 'footer-icon', 18), phone);
    address.append(location, telephone);
    about.append(address);
    const categoryColumn = footerColumn('nav', 'دسته‌بندی کالاها', 'footer-categories-title');
    const categoryList = element('ul', 'footer-links');
    categories.forEach((category) => categoryList.append(footerLink(category.name, `#${category.slug}`)));
    categoryColumn.append(categoryList);
    const help = footerColumn('nav', 'راهنمای خرید', 'footer-guide-title');
    const helpList = element('ul', 'footer-links');
    const localTargets = ['#shipping', '#returns', '#faq'];
    shop.help.forEach((entry, index) => helpList.append(footerLink(entry.label,
        entry.href === '#' ? localTargets[index] || '#shopping-guide' : entry.href)));
    help.append(helpList);
    const hours = footerColumn('section', 'ساعت کاری', 'footer-hours-title');
    const schedule = element('ul', 'footer-hours');
    shop.schedule.forEach((entry) => {
        const item = element('li', 'footer-hours__item');
        item.append(image('svg/calendar-dots.svg', 'footer-icon', 18), element('span', '', `${entry.days}: ${entry.time}`));
        schedule.append(item);
    });
    hours.append(schedule);
    grid.append(about, categoryColumn, help, hours);
    const bottom = element('div', 'site-footer__bottom container');
    bottom.append(element('p', 'copyright', shop.copyright.split(shop.name).join(SHOP_NAME)), link('بازگشت به بالا', '#top', 'back-to-top'));
    const contact = element('span', 'category-anchor');
    contact.id = 'contact';
    footer.replaceChildren(contact, grid, bottom);
    footer.hidden = false;
}
function createCard(product, sectionId, index) {
    const offer = offersById.get(product.id);
    const unavailable = (stock[product.id] ?? 0) === 0;
    const item = element('li');
    item.id = `${sectionId}-item-${index + 1}`;
    item.tabIndex = -1;
    const card = element('article', `product-card${unavailable ? ' product-card--unavailable' : ''}`);
    card.dataset.productId = product.id;
    const media = element('div', 'product-card__media');
    media.append(emoji(product.emoji, 'product-card__emoji'));
    if (offer) {
        const badge = element('span', 'badge product-card__badge', `${numberFormat.format(offer.percent)}٪ تخفیف`);
        badge.title = offer.label;
        media.append(badge);
    }
    if (unavailable) media.append(element('span', 'badge product-card__stock', 'ناموجود'));
    card.append(media);
    const category = categories.find((item) => item.id === product.categoryId);
    card.append(element('p', 'product-card__category', category ? category.name : 'کالا'));
    card.append(element('h3', 'product-card__title', product.name));
    card.append(element('p', 'product-card__unit', product.unit));
    const tags = element('p', 'product-card__tags', product.tags.join(' · '));
    tags.hidden = product.tags.length === 0;
    card.append(tags);
    const footer = element('div', 'product-card__footer');
    const price = element('p', 'price');
    if (offer) {
        const oldPrice = element('del', 'price__old');
        oldPrice.append(element('span', 'sr-only', 'قیمت قبلی: '));
        oldPrice.append(document.createTextNode(numberFormat.format(product.price)));
        price.append(oldPrice);
    }
    const finalPrice = offer ? Math.round(product.price * (100 - offer.percent) / 100) : product.price;
    const currentPrice = element('span', 'price__current');
    currentPrice.append(document.createTextNode(`${numberFormat.format(finalPrice)} `));
    currentPrice.append(element('span', 'price__unit', shop.currency));
    price.append(currentPrice);
    const button = element('button', 'button button--secondary button--block');
    button.type = 'button';
    button.disabled = unavailable;
    button.setAttribute('aria-label', unavailable ? `${product.name}: ناموجود` : `افزودن به سبد خرید: ${product.name}`);
    const plus = element('span', '', '+');
    plus.setAttribute('aria-hidden', 'true');
    button.append(plus, element('span', '', unavailable ? 'ناموجود' : 'افزودن به سبد خرید'));
    button.addEventListener('click', () => addToCart(product, button));
    footer.append(price, button);
    card.append(footer);
    item.append(card);
    return item;
}

function makeCarousel(spec, index = 0) {
    const section = element('section', `section${index % 2 === 0 ? ' section--muted' : ''}`);
    section.id = spec.id;
    section.dataset.carousel = 'true';
    section.setAttribute('aria-labelledby', `${spec.id}-title`);
    const container = element('div', 'container');
    const header = sectionHeader(spec.title, `${spec.id}-title`);
    if (spec.emoji) header.querySelector('h2').prepend(emoji(spec.emoji, 'carousel-title__emoji'), document.createTextNode(' '));
    header.classList.add('section__header--carousel');
    const row = element('div', 'carousel-heading-row');
    row.append(element('p', 'section__subtitle', spec.source === 'offers'
        ? 'قیمت‌های ویژه روی کالاهای پرمصرف.' : 'خرید روزانه، تازه و به‌صرفه.'));
    const controls = element('nav', 'carousel-controls');
    controls.setAttribute('aria-label', `کنترل کاروسل ${spec.title}`);
    ['start', 'end'].forEach((direction) => {
        const control = link('', `#${spec.id}-item-1`, '');
        control.dataset.carouselDirection = direction;
        control.setAttribute('aria-label', `${direction === 'start' ? 'ابتدای' : 'انتهای'} کاروسل ${spec.title}`);
        control.title = control.getAttribute('aria-label');
        control.append(image(`svg/caret-${direction === 'start' ? 'right' : 'left'}.svg`, 'carousel-arrow', 13));
        controls.append(control);
    });
    row.append(controls);
    header.append(row);
    const status = element('p', 'catalog-status');
    status.id = `${spec.id}-status`;
    status.setAttribute('role', 'status');
    const list = element('ul', 'product-grid');
    list.tabIndex = 0;
    list.setAttribute('aria-label', `کاروسل ${spec.title}`);
    list.setAttribute('aria-describedby', status.id);
    container.append(header);
    container.append(status, list);
    section.append(container);
    return section;
}

function renderCarousel(section, selection) {
    const list = section.querySelector('.product-grid');
    const status = section.querySelector('.catalog-status');
    const fragment = document.createDocumentFragment();
    selection.forEach((product, index) => fragment.append(createCard(product, section.id, index)));
    list.replaceChildren(fragment);
    list.hidden = selection.length === 0;
    list.setAttribute('aria-busy', 'false');
    status.textContent = selection.length ? '' : 'کالایی برای نمایش پیدا نشد.';
    status.hidden = selection.length > 0;
    section.querySelectorAll('.carousel-controls a').forEach((control, index) => {
        control.href = `#${section.id}-item-${index === 0 ? 1 : selection.length || 1}`;
        if (selection.length) control.removeAttribute('aria-disabled');
        else control.setAttribute('aria-disabled', 'true');
        control.tabIndex = selection.length ? 0 : -1;
    });
    list.scrollLeft = 0;
}

function getSelectedCategory() {
    const params = new URLSearchParams(location.search);
    const fragment = location.hash.slice(1).replace(/^category-/, '');
    const slug = params.has('cat') ? params.get('cat') : fragment;
    return categories.find((category) => category.slug === slug) || null;
}

function renderCatalog() {
    const active = getSelectedCategory();
    const query = document.querySelector('#product-search').value.trim();
    const matches = (product) => product.name.includes(query);
    const root = document.querySelector('#carousels-root');
    const results = document.querySelector('#results-root');
    root.hidden = Boolean(active || query);
    results.hidden = !active && !query;
    categories.forEach((category) => {
        document.querySelectorAll(`a[href="#${category.slug}"]`).forEach((anchor) => {
            if (active && active.id === category.id) anchor.setAttribute('aria-current', 'true');
            else anchor.removeAttribute('aria-current');
        });
    });
    if (active || query) {
        const spec = { id: 'filtered-products', title: active ? active.name : 'نتایج جستجو', emoji: active?.emoji };
        const section = makeCarousel(spec);
        const count = element('p', 'filter-summary');
        const selection = products.filter((product) => (!active || product.categoryId === active.id)
            && matches(product));
        count.textContent = `${numberFormat.format(selection.length)} کالا${active ? ` در دستهٔ ${active.name}` : ''}`;
        const reset = link('نمایش همه دسته‌ها', '#categories', 'button button--secondary');
        reset.dataset.resetCategory = 'true';
        count.append(reset);
        section.querySelector('.container').prepend(count);
        // Fragment anchors for categories that have no home carousel.
        const anchor = element('span', 'category-anchor');
        if (active && !home.carousels.some((entry) => entry.id === active.slug)) anchor.id = active.slug;
        section.prepend(anchor);
        results.replaceChildren(section);
        renderCarousel(section, selection);
    } else {
        results.replaceChildren();
        home.carousels.forEach((spec) => {
            const section = document.getElementById(spec.id);
            let selection = products;
            if (spec.source === 'offers') selection = selection.filter((product) => offersById.has(product.id));
            else if (spec.categoryId !== undefined) selection = selection.filter((product) => product.categoryId === spec.categoryId);
            else if (spec.source === 'fresh') selection = selection.filter((product) => (product.tags || []).includes('تازه'));
            renderCarousel(section, selection);
        });
    }
}

function followRoute(scroll = false) {
    if (!ready) return;
    renderCatalog();
    if (!scroll) return;
    requestAnimationFrame(() => {
        if (getSelectedCategory()) {
            document.querySelector('#filtered-products').scrollIntoView({ block: 'start' });
        } else {
            const id = location.hash.slice(1);
            const target = id ? document.getElementById(id) : null;
            if (target) target.scrollIntoView({ block: 'start', inline: 'start' });
        }
    });
}

function changeCategory(category) {
    const url = new URL(location.href);
    url.searchParams.set('cat', category.slug);
    url.hash = '';
    history.pushState({ category: category.slug }, '', url);
    followRoute(true);
}

function showAll(href = '#categories') {
    const url = new URL(location.href);
    url.searchParams.delete('cat');
    url.hash = safeHref(href).slice(1);
    history.pushState(null, '', url);
    document.querySelector('#product-search').value = '';
    followRoute(true);
}

function setPageState(message, busy, retry = false) {
    const status = document.querySelector('#page-status');
    status.classList.add('page-status');
    status.hidden = false;
    status.setAttribute('aria-busy', String(busy));
    status.replaceChildren(element('p', '', message));
    if (retry) {
        const button = element('button', 'button button--secondary', 'تلاش دوباره');
        button.type = 'button';
        button.addEventListener('click', loadPage);
        status.append(button);
    }
}

async function fetchJSON(filename, signal) {
    const response = await fetch(`${API}${filename}`, { signal });
    // fetch resolves on HTTP 404; explicitly check response.ok.
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

function validateData(data) {
    const validId = (id) => typeof id === 'string' && /^[a-z][a-z0-9-]*$/.test(id);
    const isText = (value) => typeof value === 'string';
    const isLink = (entry) => entry && isText(entry.label) && isText(entry.href);
    const [productData, stockData, offerData, categoryData, shopData, homeData] = data;
    if (!Array.isArray(productData) || !Array.isArray(offerData) || !Array.isArray(categoryData)
        || !stockData || !stockData.items || !shopData || !homeData) throw new Error('Invalid API data');
    if (!productData.every((product) => product && Number.isInteger(product.id) && Number.isInteger(product.categoryId)
        && isText(product.name) && isText(product.unit) && isText(product.emoji) && Number.isFinite(product.price) && product.price >= 0
        && Array.isArray(product.tags) && product.tags.every(isText))
        || !categoryData.every((category) => category && Number.isInteger(category.id) && validId(category.slug)
            && isText(category.name) && isText(category.emoji) && isText(category.color))
        || !offerData.every((offer) => offer && Number.isInteger(offer.productId) && Number.isFinite(offer.percent)
            && offer.percent >= 0 && offer.percent <= 100 && isText(offer.label))) throw new Error('Invalid product data');
    const categoryIds = new Set(categoryData.map((category) => category.id));
    const productIds = new Set(productData.map((product) => product.id));
    if (categoryIds.size !== categoryData.length || productIds.size !== productData.length
        || new Set(categoryData.map((category) => category.slug)).size !== categoryData.length
        || !productData.every((product) => categoryIds.has(product.categoryId) && Number.isInteger(stockData.items[product.id]) && stockData.items[product.id] >= 0)
        || !offerData.every((offer) => productIds.has(offer.productId))) throw new Error('Invalid API relationships');
    if (!['name', 'slogan', 'notice', 'about', 'address', 'phone', 'copyright', 'city', 'owner', 'currency'].every((key) => isText(shopData[key]))
        || !shopData.hours || !['open', 'close'].every((key) => isText(shopData.hours[key]))
        || !['deliveryFee', 'freeDeliveryOver'].every((key) => Number.isFinite(shopData[key]) && shopData[key] >= 0)
        || !Array.isArray(shopData.menu) || !shopData.menu.every(isLink)
        || !Array.isArray(shopData.help) || !shopData.help.every(isLink)
        || !Array.isArray(shopData.schedule) || !shopData.schedule.every((entry) => entry && isText(entry.days) && isText(entry.time))) {
        throw new Error('Invalid shop data');
    }
    if (![homeData.hero, homeData.side].every((banner) => banner && isText(banner.title) && isText(banner.text) && isText(banner.emoji) && isLink(banner.cta))
        || !Array.isArray(homeData.promos) || !homeData.promos.every((promo) => promo && isText(promo.text) && isText(promo.emoji) && isText(promo.href) && isText(promo.color))
        || !Array.isArray(homeData.carousels)) throw new Error('Invalid home data');
    const reserved = new Set(['top', 'main-content', 'hero', 'categories', 'special-offers', 'shopping-guide', 'footer', 'contact', 'filtered-products', 'shipping', 'returns', 'faq']);
    const ids = new Set();
    homeData.carousels.forEach((spec) => {
        if (!spec || !validId(spec.id) || !isText(spec.title) || (spec.emoji !== undefined && !isText(spec.emoji)) || reserved.has(spec.id) || ids.has(spec.id)
            || (spec.categoryId !== undefined && !categoryIds.has(spec.categoryId))) throw new Error('Invalid carousel data');
        ids.add(spec.id);
    });
}

async function loadPage() {
    if (loading) return;
    loading = true;
    ready = false;
    document.querySelector('#product-search').disabled = true;
    setPageState('در حال بارگذاری فروشگاه...', true);
    const controller = new AbortController();
    let slowTimer;
    try {
        // All six independent requests start together in this single Promise.all.
        const allRequests = Promise.all([
            fetchJSON('products.json', controller.signal),
            fetchJSON('stock.json', controller.signal),
            fetchJSON('offers.json', controller.signal),
            fetchJSON('categories.json', controller.signal),
            fetchJSON('shop.json', controller.signal),
            fetchJSON('home.json', controller.signal)
        ]);
        const SLOW = Symbol('slow');
        const slowConnection = new Promise((resolve) => {
            slowTimer = setTimeout(() => resolve(SLOW), 3000);
        });
        let data = await Promise.race([allRequests, slowConnection]);
        if (data === SLOW) {
            setPageState('اتصال کند است؛ هنوز در حال دریافت اطلاعات فروشگاه هستیم...', true);
            // A slow connection is not a failed request: keep waiting for success.
            data = await allRequests;
        }
        validateData(data);
        [products, stock, , categories, shop, home] = data;
        stock = stock.items;
        offersById = new Map(data[2].map((offer) => [offer.productId, offer]));
        reconcileCart();
        renderHeader();
        renderHero();
        renderCategories();
        renderPromos();
        renderGuide();
        renderFooter();
        const fragment = document.createDocumentFragment();
        home.carousels.forEach((spec, index) => fragment.append(makeCarousel(spec, index)));
        document.querySelector('#carousels-root').replaceChildren(fragment);
        ready = true;
        document.querySelector('#page-status').hidden = true;
        followRoute(Boolean(location.hash || new URLSearchParams(location.search).has('cat')));
    } catch {
        controller.abort();
        setPageState(location.protocol === 'file:'
            ? 'برای دریافت اطلاعات، فروشگاه را با Live Server یا npx serve . اجرا کنید.'
            : 'دریافت اطلاعات فروشگاه انجام نشد. اتصال اینترنت را بررسی کنید و دوباره تلاش کنید.', false, true);
    } finally {
        clearTimeout(slowTimer);
        loading = false;
    }
}

// Delegation also handles carousels and links added dynamically in the future.
document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor || !ready || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (anchor.dataset.carouselDirection) {
        event.preventDefault();
        if (anchor.getAttribute('aria-disabled') === 'true') return;
        const section = anchor.closest('[data-carousel]');
        const items = section.querySelectorAll('.product-grid > li');
        const target = anchor.dataset.carouselDirection === 'start' ? items[0] : items[items.length - 1];
        if (target) {
            target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest', inline: 'start' });
            target.focus({ preventScroll: true });
        }
        return;
    }
    const id = anchor.hash.slice(1).replace(/^category-/, '');
    const category = categories.find((entry) => entry.slug === id);
    if (category || anchor.dataset.resetCategory || id === 'categories' || id === 'top'
        || id === 'special-offers' || id === 'footer' || id === 'contact'
        || home.carousels.some((spec) => spec.id === id)) {
        event.preventDefault();
        if (category) changeCategory(category);
        else showAll(anchor.hash);
        document.querySelectorAll('.mobile-menu, .mobile-category-menu').forEach((menu) => { menu.open = false; });
    }
});
window.addEventListener('hashchange', () => followRoute(true));
window.addEventListener('popstate', () => followRoute(true));
window.addEventListener('storage', (event) => {
    if (event.key === CART_KEY || event.key === null) {
        cart = readCart();
        updateCart();
    }
});
initializeHeader();
loadPage();

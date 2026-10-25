import { el } from '../utils/utils.js';
import { showError, setBusy } from '../components/skeleton.js';
import { makeCard } from '../components/productcard.js';
import type { Category, ProductView } from '.././type.js';


const TILE_COUNT = 6; 

let allCategories: Category[] = [];
let allProducts: ProductView[] = [];

let lastFocused: HTMLElement | null = null;

const getModal = (): HTMLElement | null => document.querySelector<HTMLElement>('#cat-modal');


const renderModalProducts = (modal: HTMLElement, category: Category): void => {
    const title = modal.querySelector<HTMLElement>('.cat-modal__title');
    const grid = modal.querySelector<HTMLElement>('.cat-modal__grid');

    if (title && grid) {
        title.textContent = category.name;

        const products = allProducts.filter((product) => product.categoryId === category.id);

        if (products.length === 0) {
            showError(grid, 'محصولی در این دسته وجود ندارد.');
        } else {
            grid.textContent = '';
            grid.append(...products.map(makeCard));
            setBusy(grid, false);
        }
    }
};

const openModal = (category: Category): void => {
    const modal = getModal();

    if (modal) {
        if (modal.hidden) {
            lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        }

        renderModalProducts(modal, category);
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        modal.querySelector<HTMLElement>('.cat-modal__close')?.focus();
    }
};

const hideModal = (): void => {
    const modal = getModal();

    if (modal && !modal.hidden) {
        modal.hidden = true;
        document.body.style.overflow = '';
        lastFocused?.focus();
        lastFocused = null;
    }
};

const selectCategory = (category: Category): void => {
    const url = new URL(window.location.href);
    url.searchParams.set('cat', category.slug);
    history.pushState({ cat: category.slug }, '', url);

    document.querySelectorAll<HTMLInputElement>('.nav-toggle').forEach((toggle) => {
        toggle.checked = false;
    });

    openModal(category);
};

const closeModal = (): void => {
    if (history.state?.cat) {
        history.back();
    } else {
        const url = new URL(window.location.href);
        url.searchParams.delete('cat');
        history.replaceState(null, '', url);
        hideModal();
    }
};
const getRequestedSlug = (): string | null => {
    const fromQuery = new URLSearchParams(window.location.search).get('cat');

    if (fromQuery) {
        return fromQuery;
    }

    const fromHash = window.location.hash.slice(1);

    return fromHash && !document.getElementById(fromHash) ? fromHash : null;
};

const syncModalWithUrl = (): void => {
    const slug = new URLSearchParams(window.location.search).get('cat');
    const category = allCategories.find((item) => item.slug === slug);

    if (category) {
        openModal(category);
    } else {
        hideModal();
    }
};

const initModalControls = (): void => {
    const modal = getModal();

    if (modal) {
        modal.querySelectorAll<HTMLElement>('[data-close]').forEach((control) => {
            control.addEventListener('click', closeModal);
        });

        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !modal.hidden) {
                closeModal();
            }
        });

        window.addEventListener('popstate', syncModalWithUrl);
    }
};


const bindCategoryLink = (link: HTMLAnchorElement, category: Category): void => {
    link.href = `?cat=${(category.slug)}`;

    link.addEventListener('click', (event: MouseEvent) => {
        const isPlainClick =
            event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

        if (isPlainClick) {
            event.preventDefault();
            selectCategory(category);
        }
    });
};

const makeCategory = (category: Category): HTMLLIElement => {
    const li = el('li');
    const a = el('a', 'cat');
    bindCategoryLink(a, category);

    const icon = el('span', 'cat-img', category.emoji);
     if (category.color) {
        icon.style.setProperty('--tone', category.color);
    }
    icon.setAttribute('role', 'img');
    icon.setAttribute('aria-label', category.name);

    a.append(icon, el('strong', null, category.name));
    li.append(a);

    return li;
};

const makeSubMenu = (category: Category): HTMLLIElement => {
    const li = el('li');
    const a = el('a', null, category.name);
    bindCategoryLink(a, category);
    li.append(a);

    return li;
};

const fillLists = (
    selector: string,
    categories: Category[],
    build: (category: Category) => HTMLLIElement
): void => {
    document.querySelectorAll<HTMLElement>(selector).forEach((list) => {
        if (categories.length === 0) {
            showError(list, 'دسته‌بندی‌ای وجود ندارد.');
        } else {
            list.textContent = '';
            list.append(...categories.map(build));
            setBusy(list, false);
        }
    });
};

const initCategories = (categories: Category[], products: ProductView[]): void => {
    allCategories = categories;
    allProducts = products;

    fillLists('.cat-list', categories.slice(0, TILE_COUNT), makeCategory);
    fillLists('.sub-menu', categories, makeSubMenu);

    initModalControls();
    syncModalWithUrl();
};


export { initCategories};
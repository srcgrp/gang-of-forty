import { BASEURL } from '../config.js';
import { el } from '../utils/utils.js';
import { showError } from '../components/skeleton.js';
import { makeCard } from '../components/productcard.js';

const makeCategory = (category) => {
    const li = el("li")
    const a = el("a", "cat")
    a.setAttribute("href", `?cat=${category.slug}`)

    const span = el("span", "cat-img")
    span.setAttribute("role", "img")
    span.setAttribute("aria-label", category.name)
    span.textContent = category.emoji

    const strong = el("strong")
    strong.textContent = category.name

    a.append(span, strong)
    li.append(a)

    a.addEventListener("click", (e) => {
        e.preventDefault();
        selectCategory(category);
    });
    return li
}

const makeSubMenu = (category) => {
    const li = el("li")
    const a = el("a")
    a.setAttribute("href", `#${category.slug}`)
    a.textContent = category.name
    li.append(a)
    return li
}

const fetchJSON = async(endpoint, options = {}) => {
    const response = await fetch(`${BASEURL}${endpoint}`, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

const renderCategoriesInto = async(selector, builder) => {
    const categoryLists = document.querySelectorAll(selector);
    if (!categoryLists.length) return;

    categoryLists.forEach((list) =>
        showError(list, 'در حال بارگیری ...')
    );

    try {
        const categories = await fetchCategories();
        categoryLists.forEach((categoryList) => {
            categoryList.textContent = '';
            categories
                .slice(0, 6)
                .map(builder)
                .forEach((card) => categoryList.append(card));
        });
    } catch (error) {
        categoryLists.forEach((list) =>
            showError(list, 'خطا در دریافت دسته‌بندی‌ها. لطفاً دوباره تلاش کنید.')
        );
    }
};

const selectCategory = (category) => {
    const url = new URL(window.location);
    url.searchParams.set("cat", category.slug);
    history.pushState({ cat: category.slug }, "", url);
    openModal(category);
};

const openModal = async(category) => {
    const modal = document.querySelector("#cat-modal");
    const title = modal.querySelector(".cat-modal__title");
    const track = modal.querySelector(".cat-modal__grid");

    title.textContent = category.name;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    track.textContent = "";

    let timerId;
    const timeoutPromise = new Promise((_, reject) => {
        timerId = setTimeout(() => reject(new Error("SLOW_CONNECTION")), 3000);
    });

    try {
        const products = await Promise.race([fetchProducts(), timeoutPromise]);
        const filtered = products.filter((p) => p.categoryId === category.id);

        if (filtered.length === 0) {
            showError(track, "محصولی در این دسته وجود ندارد.");
            return;
        }

        track.append(...filtered.map(makeCard));
    } catch (err) {
        if (err.message === "SLOW_CONNECTION") {
            showError(track, "اتصال کند است. دوباره تلاش کنید.");
        } else {
            showError(track, "خطا در بارگیری.");
        }
    } finally {
        clearTimeout(timerId);
    }
};
const closeModal = () => {
    const modal = document.querySelector("#cat-modal");
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
};

const closeBtn = document.querySelector(".cat-modal__close")
closeBtn.addEventListener("click", closeModal)
const getAndShowCategories = () => renderCategoriesInto('.cat-list', makeCategory);
const getAndShowSubMenus = () => renderCategoriesInto('.sub-menu', makeSubMenu);
const fetchProducts = () => fetchJSON('/product.json');
const fetchCategories = () => fetchJSON('/categories.json');


export { getAndShowCategories, getAndShowSubMenus };
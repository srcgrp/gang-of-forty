import type { Category, LinkItem } from '../types';
import { getHtmlElement } from './getHtmlElement';

// Renders the category list from the template in the HTML.
// categoryData: array from categories.json.
// Each category gets an emoji, a name and a link to #<slug>.
export function renderCategories(categoryData: Category[]) {
    const categoryList = getHtmlElement<HTMLUListElement>(".categories ul");
    const template = getHtmlElement<HTMLTemplateElement>("#category-template");
    categoryData.forEach(category => {
        const clone = document.importNode(template.content, true);
        getHtmlElement<HTMLAnchorElement>("a", clone).setAttribute("href", `#${category.slug}`);
        getHtmlElement<HTMLSpanElement>("a span", clone).textContent = category.emoji;
        getHtmlElement<HTMLHeadingElement>("a h3", clone).textContent = category.name;
        categoryList.append(clone);
        
    });
}

// Builds an li with a link inside it.
// item: { label, href }
function createLinkItem(item: LinkItem) {
    const li: HTMLLIElement = document.createElement("li");
    const a: HTMLAnchorElement = document.createElement("a");
    a.textContent = item.label;
    a.href = item.href;
    li.append(a);
    return li;
}

// Fills the "all categories" submenu and the footer category list from categories.json.
// categoryData: array from categories.json.
export function renderCategoryLinks(categoryData: Category[]) {
    const links = categoryData.map(category => createLinkItem({ label: category.name, href: `#${category.slug}` }));
    getHtmlElement<HTMLUListElement>(".mega-menu").replaceChildren(...links);
    getHtmlElement<HTMLUListElement>("#quick-links + ul").replaceChildren(
        ...categoryData.map(category =>
            createLinkItem({ label: category.name, href: `#${category.slug}` })));
}

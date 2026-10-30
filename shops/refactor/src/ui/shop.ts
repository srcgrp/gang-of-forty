import type { AppData, Category, Link, ShopInfo } from '../types';
import { el, icon, link } from './dom';
import { money } from './format';

const column = (title: string, links: Link[]): HTMLElement => {
  const nav = el('nav'); nav.setAttribute('aria-label', title);
  const list = el('ul', 'footer-col-list');
  for (const item of links) { const li = el('li'); li.append(link(item.label, item.href)); list.append(li); }
  nav.append(el('h2', 'footer-col-title', title), list); return nav;
};
const renderHeader = (shop: ShopInfo, categories: Category[], count: number): void => {
  const notice = document.querySelector<HTMLParagraphElement>('#shop-notice');
  if (notice) notice.textContent = shop.notice;
  const slogan = document.querySelector<HTMLSpanElement>('#shop-slogan');
  if (slogan) slogan.textContent = shop.slogan;
  const nav = document.querySelector<HTMLUListElement>('#main-menu');
  if (nav) {
    const all = el('li', 'has-sub');
    const trigger = link('همه دسته‌ها', '#categories'); trigger.prepend(icon('i-grid'));
    const sub = el('ul', 'sub-menu');
    for (const category of categories) { const li = el('li'); li.append(link(category.name, `#${category.slug}`)); sub.append(li); }
    all.append(trigger, sub); nav.replaceChildren(all);
    for (const item of shop.menu) { const li = el('li'); li.append(link(item.label, item.href)); nav.append(li); }
  }
  const phone = document.querySelector<HTMLAnchorElement>('#header-phone');
  if (phone) { phone.href = `tel:${shop.phone.replace(/[^\d+]/g, '')}`; phone.replaceChildren(el('bdi', '', shop.phone)); }
  const search = document.querySelector<HTMLInputElement>('#q');
  if (search) search.placeholder = `جستجو در میان ${count.toLocaleString('fa-IR')} کالا…`;
};
const renderCategories = (categories: Category[]): void => {
  const root = document.querySelector<HTMLUListElement>('.cat-list');
  if (!root) return;
  root.replaceChildren(...categories.map((category): HTMLLIElement => {
    const li = el('li'); const anchor = link('', `#${category.slug}`, 'cat');
    anchor.dataset.category = category.slug;
    const emoji = el('span', 'cat-img', category.emoji); emoji.style.backgroundColor = category.color;
    emoji.setAttribute('aria-hidden', 'true'); anchor.append(emoji, el('strong', '', category.name)); li.append(anchor); return li;
  }));
};
const renderFooter = (shop: ShopInfo, categories: Category[]): void => {
  const cols = document.querySelector<HTMLDivElement>('.footer-cols');
  const hours = el('section'); hours.append(el('h2', 'footer-col-title', 'ساعت کاری'));
  const list = el('ul', 'footer-col-list');
  for (const entry of shop.schedule) { const li = el('li', '', `${entry.days}: `); li.append(el('bdi', '', entry.time)); list.append(li); }
  hours.append(list);
  cols?.replaceChildren(column('دسترسی سریع', shop.menu), column('دسته‌بندی‌ها', categories.map((c) => ({ label: c.name, href: `#${c.slug}` }))),
    column('راهنمای مشتریان', shop.help), hours);
  const contact = document.querySelector<HTMLDivElement>('#contact');
  const phone = el('a'); phone.href = `tel:${shop.phone.replace(/[^\d+]/g, '')}`;
  phone.append(el('span', '', 'تلفن: '), el('bdi', '', shop.phone));
  contact?.replaceChildren(el('h2', 'footer-col-title', 'تماس با ما'), phone, el('address', '', shop.address));
  document.querySelector<HTMLDivElement>('#about')?.replaceChildren(el('h2', 'footer-col-title', 'دربارهٔ ریفکتور'),
    el('p', 'footer-about-desc', `${shop.about} هزینهٔ ارسال ${money(shop.deliveryFee)}؛ خرید بالای ${money(shop.freeDeliveryOver)} با ارسال رایگان.`));
  const copyright = document.querySelector<HTMLParagraphElement>('.footer-copy-right');
  if (copyright) copyright.textContent = shop.copyright.replaceAll(shop.name, 'سوپرمارکت ریفکتور');
};
export const renderShop = (data: AppData): void => {
  renderHeader(data.shop, data.categories, data.products.length);
  renderCategories(data.categories); renderFooter(data.shop, data.categories);
};

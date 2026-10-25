import type { ShopData } from '../types';
export function renderShopInfo(data: ShopData): void {
  const { shop, categories } = data; const brand = document.querySelector<HTMLElement>('#shop-header-brand');
  if (brand) { brand.replaceChildren(); const name = document.createElement('h1'); name.id = 'shop-header-name'; name.textContent = shop.name; const slogan = document.createElement('small'); slogan.id = 'shop-header-slogan'; slogan.textContent = shop.slogan; brand.append(name, slogan); }
  const setText = (selector: string, value: string): void => { const node = document.querySelector<HTMLElement>(selector); if (node) node.textContent = value; };
  setText('#shop-about', shop.about); setText('#shop-address', shop.address); setText('#shop-phone', shop.phone); setText('#shop-copyright', shop.copyright);
  const shopName = document.querySelector<HTMLElement>('#shop-name'); if (shopName) { const heading = document.createElement('h3'); heading.className = 'footer-heading brand-title'; heading.textContent = shop.name; shopName.replaceChildren(heading); }
  renderCategoryLinks('#navbar-categories', categories, true); renderCategoryLinks('#footer-categories', categories, false);
  renderLinkList('#navbar-list', shop.menu, 'navbar-menu-item nav-link'); renderLinkList('#footer-help', shop.help, '');
  const schedule = document.querySelector<HTMLElement>('#shop-schedule'); if (schedule) { const fragment = document.createDocumentFragment(); shop.schedule.forEach((item) => { const p = document.createElement('p'); const strong = document.createElement('strong'); strong.textContent = `${item.days}:`; const time = document.createElement('span'); time.textContent = item.time; p.append(strong, ' ', time); fragment.append(p); }); schedule.replaceChildren(fragment); }
}
function renderCategoryLinks(selector: string, categories: ShopData['categories'], navbar: boolean): void {
  const list = document.querySelector<HTMLElement>(selector); if (!list) return; const fragment = document.createDocumentFragment();
  categories.forEach((category) => { const li = document.createElement('li'); const link = document.createElement('a'); link.href = `#${category.slug}`; link.textContent = navbar ? `${category.emoji} ${category.name}` : category.name; if (navbar) link.className = 'dropdown-item'; li.append(link); fragment.append(li); }); list.replaceChildren(fragment);
}
function renderLinkList(selector: string, items: Array<{ label: string; href: string }>, className: string): void {
  const list = document.querySelector<HTMLElement>(selector); if (!list) return; const fragment = document.createDocumentFragment();
  items.forEach((item) => { const li = document.createElement('li'); const link = document.createElement('a'); link.href = item.href; link.textContent = item.label; if (className) { li.className = className.split(' ')[0]; link.className = className.split(' ').slice(1).join(' '); } li.append(link); fragment.append(li); });
  if (selector === '#navbar-list') list.querySelectorAll('.navbar-menu-item').forEach((node) => node.remove()); list.append(fragment);
}

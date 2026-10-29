import type { Category, Shop, ShopLink } from '../types';

const setText = (selector: string, text: string): void => {
  const element = document.querySelector<HTMLElement>(selector);
  if (element) {
    element.textContent = text;
  }
};

const fillLinks = (containerId: string, links: ShopLink[]): void => {
  const container = document.querySelector<HTMLElement>(containerId);
  if (!container) return;
  container.replaceChildren();
  links.forEach((link) => {
    const item = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.label;
    item.appendChild(anchor);
    container.appendChild(item);
  });
};

const renderNotice = (shop: Shop): void => {
  setText('#news', shop.notice);
};

const renderSlogan = (shop: Shop): void => {
  setText('#tagline', shop.slogan);
};

const renderMainMenu = (shop: Shop): void => {
  const menu = document.querySelector<HTMLElement>('#btn-categories');
  if (!menu) return;

  menu
    .querySelectorAll<HTMLElement>(':scope > li:not(.has-dropdown)')
    .forEach((item) => {
      item.remove();
    });

  shop.menu.forEach((link) => {
    const item = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.label;
    item.appendChild(anchor);
    menu.appendChild(item);
  });
};

const renderFooter = (shop: Shop, categories: Category[]): void => {
  setText('#footer-about-text', shop.about);
  setText('#footer-address', shop.address);
  setText('#footer-phone', shop.phone);
  setText('#footer-copyright', shop.copyright);

  const hours = document.querySelector<HTMLElement>('#footer-hours');
  if (hours) {
    hours.replaceChildren();
    shop.schedule.forEach((slot) => {
      const line = document.createElement('p');
      line.textContent = `${slot.days}: ${slot.time}`;
      hours.appendChild(line);
    });
  }

  fillLinks('#footer-help-links', shop.help);

  fillLinks(
    '#footer-category-links',
    categories.map((category) => ({
      label: category.name,
      href: `#${category.slug}`,
    })),
  );
};

export const renderShop = (shop: Shop, categories: Category[]): void => {
  renderNotice(shop);
  renderSlogan(shop);
  renderMainMenu(shop);
  renderFooter(shop, categories);
};

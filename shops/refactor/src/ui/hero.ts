import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { A11y, Keyboard, Pagination, Autoplay } from 'swiper/modules';
import type { Banner, Home } from '../types';
import { el, link } from './dom';

let slider: Swiper | undefined;
const banner = (data: Banner, side = false): HTMLElement => {
  const article = el('article', side ? 'hero-side' : 'hero-main');
  if (!side) {
    const image = el('img', 'hero-main__image');
    image.src = `${import.meta.env.BASE_URL}img/bg.png`;
    image.alt = ''; image.width = 560; image.height = 400; article.append(image);
  }
  const content = el('div', side ? 'hero-side-content' : 'hero-main__content');
  const emoji = el('span', side ? 'side-icon' : 'hero-emoji', data.emoji);
  emoji.setAttribute('aria-hidden', 'true');
  content.append(emoji, el('h2', side ? 'side-title' : 'hero-title', data.title),
    el('p', side ? 'side-text' : 'hero-text', data.text), link(data.cta.label, data.cta.href, 'btn btn-primary'));
  article.append(content); return article;
};
export const renderHero = (home: Home): void => {
  const root = document.querySelector<HTMLDivElement>('#hero-grid');
  if (!root) return;
  slider?.destroy(true, true);
  const container = el('div', 'swiper'); container.dir = 'rtl';
  const wrapper = el('div', 'swiper-wrapper');
  for (const data of [home.hero, home.side]) {
    const slide = el('div', 'swiper-slide'); slide.append(banner(data)); wrapper.append(slide);
  }
  const pagination = el('div', 'swiper-pagination'); container.append(wrapper, pagination);
  root.replaceChildren(container, banner(home.side, true));
  slider = new Swiper(container, { modules: [A11y, Keyboard, Pagination, Autoplay],
    speed: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 350,
    keyboard: { enabled: true, onlyInViewport: true }, pagination: { el: pagination, clickable: true },
    autoplay: { delay: 3000, disableOnInteraction: false },
    a11y: { paginationBulletMessage: 'نمایش پیشنهاد {{index}}', slideLabelMessage: 'پیشنهاد {{index}} از {{slidesLength}}' } });
};
export const createPromos = (home: Home): HTMLElement => {
  const promos = el('div', 'hero-promos container');
  for (const promo of home.promos) {
    const item = link('', promo.href, 'hero-promo'); item.style.backgroundColor = promo.color;
    const emoji = el('span', '', promo.emoji); emoji.setAttribute('aria-hidden', 'true');
    item.append(emoji, el('span', '', promo.text)); promos.append(item);
  }
  return promos;
};
import type { Home } from '../types';
import { h, setText } from './dom';
import { createCarouselNav } from './carousel-nav';

const ASSET_BASE = `${import.meta.env.BASE_URL}assets/`;

function buildBasketSlide(): HTMLLIElement {
  const li = h('li', { className: 'hero-carousel__slide', id: 'banner-start', dataset: { variant: 'basket', state: 'active' } });
  const link = h('a', { className: 'hero-banner hero-banner--basket', href: '#fruits' });
  const wrap = h('div', { className: 'hero-carousel__basket-wrap' });
  wrap.setAttribute('aria-hidden', 'true');
  wrap.append(
    h('img', { className: 'hero-carousel__fruits', src: `${ASSET_BASE}images/promos/fruits.webp`, alt: '', loading: 'eager' }), 
    h('img', { className: 'hero-carousel__basket', src: `${ASSET_BASE}images/promos/basket.webp`, alt: '', loading: 'eager' })
  );
  const content = h('div', { className: 'hero-carousel__basket-content' });
  const title = h('h3', { className: 'hero-carousel__basket-title', textContent: 'پیشنهادهای ویژه هفته' });
  const arrow = h('span', { className: 'hero-carousel__basket-arrow', textContent: '←' });
  arrow.setAttribute('aria-hidden', 'true');
  title.appendChild(arrow);
  content.append(h('span', { className: 'hero-carousel__basket-eyebrow', textContent: '✦ تازه از مزرعه' }), title);
  link.append(wrap, content);
  li.appendChild(link);
  return li;
}

export function renderHero(home: Home | null, banners: string[]): void {
  const hero = home?.hero ?? {};
  setText('hero-title', hero.title ?? '');
  setText('hero-desc', hero.text ?? '');
  const cta = document.querySelector<HTMLAnchorElement>('#hero-cta');
  if (cta) {
    if (hero.cta?.label) {
      cta.href = hero.cta.href ?? '#fruits';
      cta.removeAttribute('aria-hidden');
      cta.removeAttribute('tabindex');
      setText('hero-cta-label', hero.cta.label);
    } else {
      cta.hidden = true;
    }
  }
  document.getElementById('hero-video')?.classList.remove('hero-video--skeleton');
  const track = document.getElementById('banner-track');
  if (!track) return;
  track.removeAttribute('aria-busy');
  track.replaceChildren(buildBasketSlide());
  banners.forEach((src, i) => {
    const li = h('li', { className: 'hero-carousel__slide' });
    if (i === banners.length - 1) li.id = 'banner-end';
    const a = h('a', { className: 'hero-banner', href: '#offers' });
    a.appendChild(h('img', { src, alt: `بنر ${i + 1}`, width: 800, height: 500, decoding: 'async', loading: 'lazy' }));
    li.appendChild(a);
    track.appendChild(li);
  });
  const carousel = track.parentElement;
  if (carousel && !carousel.querySelector('.hero-carousel__nav')) {
    const nav = createCarouselNav('#banner-start', '#banner-end', 'پیشنهادها');
    nav.className = 'hero-carousel__nav';
    nav.querySelectorAll<HTMLAnchorElement>('.carousel-nav__btn').forEach(btn => btn.className = 'hero-carousel__nav-btn');
    carousel.appendChild(nav);
  }
}
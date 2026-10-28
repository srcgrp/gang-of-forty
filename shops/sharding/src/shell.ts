import type {
  Shop, Home, HomeBanner, HomeHero, ShopLink, DeptMenuItem,
} from './types';
import { state } from './state';
import { h, setText, fillFromTemplate, createSvgIcon } from './dom';
import { priceFmt } from './utils';

// Links 
function renderLinks(
  el: HTMLElement,
  links: ShopLink[],
  opts: { as?: 'ul' | 'div'; activeClass?: boolean } = {},
): void {
  const { as = 'div', activeClass = false } = opts;
  el.replaceChildren();

  links.forEach((item, i) => {
    const a = h('a', { href: item.href, textContent: item.label });
    if (activeClass && item.active) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }

    if (as === 'ul') {
      const li = h('li');
      li.style.setProperty('--i', String(i));
      li.appendChild(a);
      el.appendChild(li);
    } else {
      el.appendChild(a);
    }
  });
}

// Mega menu 
function renderMegaMenu(items: DeptMenuItem[]): void {
  const ul = document.querySelector<HTMLUListElement>('#dept-menu');
  if (!ul) return;
  ul.replaceChildren();

  for (const item of items) {
    const li = h('li', {
      className: `dept-menu__item dept-menu__item--${item.modifier}`,
    });
    const link = h('a', {
      className: 'dept-menu__link',
      href: item.href,
      textContent: item.label,
    });

    const cols = h('div', { className: 'dept-sub__cols' });
    for (const col of item.columns) {
      const list = h('ul', { className: 'dept-sub__list' });
      for (const text of col.links) {
        list.appendChild(
          h('li', {}, h('a', { href: item.href, textContent: text })),
        );
      }
      cols.appendChild(
        h('div', {},
          h('h4', { className: 'dept-sub__title', textContent: col.title }),
          list,
        ),
      );
    }

    const sub = h('div', { className: `dept-sub dept-sub--${item.modifier}` }, cols);

    const media = h('span', { className: 'dept-promo__media' });
    media.setAttribute('aria-hidden', 'true');
    media.appendChild(
      h('img', {
        src: item.promo.image,
        alt: '',
        loading: 'lazy',
        decoding: 'async',
        width: 400,
        height: 600,
      }),
    );

    const promo = h(
      'a',
      { className: `dept-promo dept-promo--${item.modifier}`, href: item.href },
      media,
      h('span', { className: 'dept-promo__body' },
        h('span', { className: 'dept-promo__title', textContent: item.promo.title }),
        h('span', { className: 'dept-promo__desc', textContent: item.promo.desc }),
      ),
    );

    li.append(link, sub, promo);
    ul.appendChild(li);
  }
}

// Footer contact + schedule
function renderContact(shop: Shop): void {
  const ul = document.querySelector<HTMLUListElement>('#footer-contact-list');
  if (!ul) return;
  ul.replaceChildren();

  if (shop.phone) {
    const a = h('a', {
      href: `tel:${shop.phoneLink || shop.phone}`,
      textContent: shop.phone,
      dir: 'ltr',
    });
    ul.appendChild(h('li', {}, a));
  }
  if (shop.email) {
    const a = h('a', {
      href: `mailto:${shop.email}`,
      textContent: shop.email,
      dir: 'ltr',
    });
    ul.appendChild(h('li', {}, a));
  }
  if (shop.address) {
    ul.appendChild(h('li', { textContent: shop.address }));
  }
}

function renderSchedule(schedule: { days: string; time: string }[]): void {
  const el = document.getElementById('footer-schedule');
  if (!el) return;
  const frag = document.createDocumentFragment();
  schedule.forEach((item, i) => {
    if (i > 0) frag.appendChild(document.createElement('br'));
    frag.appendChild(document.createTextNode(item.days));
    frag.appendChild(document.createElement('br'));
    frag.appendChild(document.createTextNode(item.time));
  });
  el.replaceChildren(frag);
}

function homeBannerSlides(home: Home): HomeBanner[] {
  if (Array.isArray(home.banners) && home.banners.length) return home.banners;
  const slides: HomeBanner[] = [];
  if (home.side) {
    slides.push({
      text: home.side.title || home.side.text,
      emoji: home.side.emoji || '🛒',
      color: '#f3e5f5',
      href: home.side.cta?.href || '#',
    });
  }
  if (Array.isArray(home.promos)) slides.push(...home.promos);
  return slides;
}

// ─── Skeletons ────────────────────────────────
export function renderShellSkeletons(): void {
  fillFromTemplate('topbar-links', 'tpl-skeleton-topbar-link', 3);
  fillFromTemplate('nav-list', 'tpl-skeleton-nav-item', 7);
  fillFromTemplate('mobile-menu-list', 'tpl-skeleton-mobile-item', 7);
  fillFromTemplate('categories-list', 'tpl-skeleton-category', 10);
}

export function renderBannerSkeletons(): void {
  const track = document.getElementById('banner-track');
  if (!track) return;

  const count = 5;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const li = h('li', {
      className: 'hero-carousel__slide hero-carousel__slide--skeleton',
    });
    if (i === 0) li.id = 'banner-start';
    if (i === count - 1) li.id = 'banner-end';
    li.appendChild(h('span', { className: 'hero-banner' }));
    frag.appendChild(li);
  }
  track.appendChild(frag);
}

// ─── Full shell render ────────────────────────
export function renderShell(): void {
  const shop = state.shop;
  const home = state.home;
  if (!shop || !home) return;
  const categories = state.categories;
  const productCount = state.products.length;

  // Topbar
  const notice = document.getElementById('topbar-notice');
  if (notice) {
    notice.textContent = shop.notice;
    notice.classList.remove('skeleton-text', 'skeleton-text--topbar');
    notice.removeAttribute('aria-hidden');
  }
  const topbarLinks = document.getElementById('topbar-links');
  if (topbarLinks) {
    topbarLinks.removeAttribute('aria-busy');
    renderLinks(topbarLinks, shop.topbarLinks);
  }

  // Header
  const brand = document.querySelector<HTMLAnchorElement>('#header-brand');
  brand?.setAttribute('aria-label', `${shop.name} — صفحه اصلی`);
  setText('brand-name', shop.name);
  setText('brand-tagline', shop.slogan);

  const search = document.querySelector<HTMLInputElement>('#search-input');
  if (search) {
    search.placeholder =
      productCount > 0
        ? `جستجو در میان ${priceFmt.format(productCount)} کالا…`
        : (shop.searchPlaceholder || 'جستجوی محصول، برند یا دسته‌بندی…');
  }

  setText('label-location', shop.labels.location);
  setText('label-account', shop.labels.account);
  setText('label-cart', shop.labels.cart);

  // Nav
  setText('dept-btn-label', shop.labels.deptButton);

  const nav = document.querySelector<HTMLUListElement>('#nav-list');
  if (nav) {
    nav.removeAttribute('aria-busy');
    renderLinks(nav, shop.menu, { as: 'ul', activeClass: true });
  }

  setText('mobile-menu-title', shop.labels.mobileMenuTitle);

  const mobileList = document.querySelector<HTMLUListElement>('#mobile-menu-list');
  if (mobileList) {
    mobileList.removeAttribute('aria-busy');
    renderLinks(mobileList, shop.menu, { as: 'ul' });
  }

  renderMegaMenu(shop.deptMenu || []);

  // Hero
  const hero: HomeHero = home.hero || {};
  setText('hero-title', hero.title || '');
  setText('hero-desc', hero.desc || hero.text || '');

  const cta = document.querySelector<HTMLAnchorElement>('#hero-cta');
  if (cta) {
    const ctaHref =
      hero.ctaHref ||
      (hero.cta && typeof hero.cta === 'object' ? hero.cta.href : undefined) ||
      '#fruits';
    const ctaLabel =
      hero.ctaLabel ||
      (typeof hero.cta === 'string'
        ? hero.cta
        : typeof hero.cta === 'object'
          ? hero.cta.label
          : '');
    cta.href = ctaHref;
    cta.removeAttribute('aria-hidden');
    cta.removeAttribute('tabindex');
    setText('hero-cta-label', ctaLabel);
  }

  document.getElementById('hero-video')?.classList.remove('hero-video--skeleton');

  setText('categories-title', home.categoriesTitle || 'خرید از دسته‌بندی‌ها');

  // Banners
  const track = document.getElementById('banner-track');
  if (track) {
    const slides = homeBannerSlides(home);
    if (slides.length) {
      track.removeAttribute('aria-busy');
      track.replaceChildren();

      // ─── First slide: basket ───
      const basketLi = h('li', {
        className: 'hero-carousel__slide hero-carousel__slide--basket is-active',
        id: 'banner-start',
      });

      const basketLink = h('a', {
        className: 'hero-banner hero-banner--basket',
        href: '#fruits',
      });

      const basketWrap = h('div', { className: 'hero-carousel__basket-wrap' });
      basketWrap.setAttribute('aria-hidden', 'true');

      const fruitsImg = h('img', {
        className: 'hero-carousel__fruits',
        src: '/assets/images/promos/fruits.webp',
        alt: '',
        loading: 'eager',
      });

      const basketImg = h('img', {
        className: 'hero-carousel__basket',
        src: '/assets/images/promos/basket.webp',
        alt: '',
        loading: 'eager',
      });

      basketWrap.append(fruitsImg, basketImg);

      const basketContent = h('div', { className: 'hero-carousel__basket-content' });

      const eyebrow = h('span', {
        className: 'hero-carousel__basket-eyebrow',
        textContent: '✦ تازه از مزرعه',
      });

      const basketTitle = h('h3', {
        className: 'hero-carousel__basket-title',
        textContent: 'پیشنهادهای ویژه هفته',
      });
      const basketArrow = h('span', {
        className: 'hero-carousel__basket-arrow',
        textContent: '←',
        ariaHidden: 'true',
      });
      basketTitle.appendChild(basketArrow);
      basketContent.append(eyebrow, basketTitle);
      basketLink.append(basketWrap, basketContent);
      basketLi.appendChild(basketLink);
      track.appendChild(basketLi);

      // ─── Other slides ───
      slides.forEach((b, i) => {
        const li = h('li', { className: 'hero-carousel__slide' });
        li.style.setProperty('--i', String(i + 1));
        if (i === slides.length - 1) li.id = 'banner-end';

        const a = h('a', {
          className: b.image ? 'hero-banner' : 'hero-banner hero-banner--promo',
          href: b.href || '#',
        });

        if (b.image) {
          const img = h('img', {
            src: b.image,
            alt: b.alt || b.text || '',
            width: 800,
            height: 500,
            decoding: 'async',
            loading: 'lazy',
          });
          a.appendChild(img);
        } else {
          a.style.backgroundColor = b.color || '#e3f1e7';
          const emoji = h('span', {
            className: 'hero-banner__emoji',
            textContent: b.emoji || '✨',
          });
          emoji.setAttribute('aria-hidden', 'true');
          a.append(
            emoji,
            h('span', { className: 'hero-banner__text', textContent: b.text || '' }),
          );
        }

        li.appendChild(a);
        track.appendChild(li);
      });

      // ─── Nav buttons ───
      const carousel = track.parentElement;
      if (carousel && !carousel.querySelector('.hero-carousel__nav')) {
        const nav = h('nav', { className: 'hero-carousel__nav' });
        nav.setAttribute('aria-label', 'ناوبری کاروسل پیشنهادها');

        const btnStart = h('a', {
          href: '#banner-start',
          className:
            'carousel-nav__btn carousel-nav__btn--start hero-carousel__nav-btn hero-carousel__nav-btn--start',
        });
        btnStart.setAttribute('aria-label', 'رفتن به ابتدای پیشنهادها');
        btnStart.appendChild(
          createSvgIcon('M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z'),
        );

        const btnEnd = h('a', {
          href: '#banner-end',
          className:
            'carousel-nav__btn carousel-nav__btn--end hero-carousel__nav-btn hero-carousel__nav-btn--end',
        });
        btnEnd.setAttribute('aria-label', 'رفتن به انتهای پیشنهادها');
        btnEnd.appendChild(
          createSvgIcon('M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z'),
        );

        nav.append(btnStart, btnEnd);
        carousel.appendChild(nav);
      }
    }
  }

  // Footer
  const fBrand = document.querySelector<HTMLAnchorElement>('#footer-brand');
  fBrand?.setAttribute('aria-label', shop.name);
  setText('footer-brand-name', shop.name);
  setText('footer-brand-tagline', shop.slogan);
  setText('footer-about', shop.about);

  setText('footer-categories-title', 'دسته‌بندی‌ها');
  setText('footer-help-title', shop.labels.footerHelpTitle);
  setText('footer-contact-title', shop.labels.footerContactTitle);
  setText('footer-schedule-title', shop.labels.footerScheduleTitle);

  const helpList = document.querySelector<HTMLUListElement>('#footer-help-list');
  if (helpList) renderLinks(helpList, shop.help, { as: 'ul' });

  renderContact(shop);
  renderSchedule(shop.schedule);

  setText('footer-copyright', shop.copyright);
  setText('footer-top-label', shop.labels.footerTop);

  // Categories
  const catUl = document.querySelector<HTMLUListElement>('#categories-list');
  if (catUl) {
    catUl.replaceChildren();
    categories.forEach((cat, i) => {
      const li = h('li');
      li.style.setProperty('--i', String(i));
      const a = h('a', {
        className: 'category',
        href: `?cat=${encodeURIComponent(cat.slug)}#${cat.slug}`,
        dataset: { catSlug: cat.slug, categoryId: String(cat.id) },
      });
      if (i === 0) a.id = 'cat-start';
      if (i === categories.length - 1) a.id = 'cat-end';

      const imgWrap = h('span', { className: 'category__img' });
      if (cat.color) imgWrap.style.backgroundColor = cat.color;

      if (cat.image) {
        imgWrap.appendChild(
          h('img', {
            src: cat.image,
            alt: cat.name,
            loading: 'lazy',
            decoding: 'async',
            width: 200,
            height: 200,
          }),
        );
      } else {
        const emoji = h('span', {
          className: 'product__emoji',
          textContent: cat.emoji || '🛒',
        });
        emoji.setAttribute('aria-hidden', 'true');
        imgWrap.appendChild(emoji);
      }

      a.append(
        imgWrap,
        h('span', { className: 'category__name', textContent: cat.name }),
      );
      li.appendChild(a);
      catUl.appendChild(li);
    });
  }

  const footCats = document.querySelector<HTMLUListElement>('#footer-categories-list');
  if (footCats) {
    const links = categories.map((c) => ({
      label: c.name,
      href: `?cat=${encodeURIComponent(c.slug)}#${c.slug}`,
    }));
    renderLinks(footCats, links, { as: 'ul' });
  }

  document.title = `${shop.name} | ${shop.slogan}`;
}
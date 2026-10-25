import { showError, setBusy, fillContainer } from '../components/skeleton.js';
import { formatPrice } from '../utils/format.js';
import { makeCard } from '../components/productcard.js';
import initSwiper from "../vender/swiper/swiper.js"
import showAddToCartToast from "../vender/sweetAlert/sweetAlert.js"
import  celebrateAddToCart from "../vender/canvas-confetti/canvas-confetti.js"
import {
    el,
    saveToLocalStorage,
    getCountBasketFromLocalStorage
} from '../utils/utils.js';

import type { Home, Shop, MainCardProps, PromoItem, ProductView, Schedule, FooterLink } from '.././type.js';

const EDGE_GAP = 8;

const toFa = (n: number): string => n.toLocaleString('fa-IR');

const asset = (file: string): string => encodeURI(`${import.meta.env.BASE_URL}img/${file}`);

const createHeroSlider = (heroSlide: MainCardProps): HTMLElement => {
    const swiper = el('div', 'swiper');
    swiper.setAttribute('role', 'region');
    swiper.setAttribute('aria-label', 'پیشنهاد ویژه فروشگاه');

    const wrapper = el('div', 'swiper-wrapper');

    const slidesData: MainCardProps[] = [
    {
        ...heroSlide,
        image: '/img/bg.png',
    },
    {
        title: 'تخفیف شگفت‌انگیز فصل',
        text: 'تازه‌ترین سیفی‌جات و سبزیجات ارگانیک، با بالاترین کیفیت و بهترین قیمت.',
        emoji: '🥗',
        image: '/img/bg.png',
        cta: {
            label: 'مشاهده تخفیف‌ها',
            href: '#products',
        },
    },
    {
        title: 'ارسال سریع در تهران',
        text: 'تحویل سفارش‌ها در کمتر از ۲ ساعت، درب منزل با بسته‌بندی کاملاً بهداشتی.',
        emoji: '🚚',
        image:'/img/bg.png',
        cta: {
            label: 'خرید سریع',
            href: '#products',
        },
    },
];

    slidesData.forEach((slide) => {
        const item = el('div', 'swiper-slide');
        item.append(createMainCard(slide));
        wrapper.append(item);
    });

    swiper.append(wrapper);

    const pagination = el('div', 'swiper-pagination');
    swiper.append(pagination);

    return swiper;
};


const createMainCard=(props: MainCardProps): HTMLElement =>{
    const article = el('article', 'hero-main');

    const image = el('img', 'hero-main__image');
    image.src = props.image;
    image.alt = props.title;

    const content = el('div', 'hero-main__content');

    const emoji = el('span', 'hero-emoji', props.emoji);
    emoji.setAttribute('aria-hidden', 'true');

    const title = el('h2', 'hero-title', props.title);

    const text = el('p', 'hero-text', props.text);

    const button = el('a', 'btn btn-primary', props.cta.label);
    button.href = props.cta.href;

    content.append(emoji, title, text, button);

    article.append(image, content);

    return article;
}

const createSideCard = (slide: MainCardProps): HTMLElement => {
    const side = el('article', 'hero-side');
    
    side.style.backgroundImage = `url('./public/img/Fresh Dairy Platter with Discount Badge (1).png')`; 

    const content = el('div', 'hero-side-content');

    const iconWrapper = el('span', 'side-icon');
    iconWrapper.textContent = '🧀'; 
    
    const title = el('h2', 'side-title', slide.title);
    const text = el('p', 'side-text', slide.text);
    
    const button = el('a', 'btn btn-primary', slide.cta.label);
    button.href = slide.cta.href;

    content.append(
        iconWrapper,
        title,
        text,
        button
    );
    side.append(content);

    return side;
};

const makePromo = ({ href, bg, emoji, text }: PromoItem): HTMLLIElement => {
    const li = el('li');
    const link = el('a', 'promo');
    link.href = href;
    link.style.setProperty('--promo-bg', bg);

    const icon = el('span', 'promo-emoji', emoji);
    icon.setAttribute('aria-hidden', 'true');

    link.append(icon, el('span', 'promo-text', text));
    li.append(link);

    return li;
};
const renderPromos = (promos: PromoItem[]): void => {
    const section = document.querySelector<HTMLElement>('.promos');
    const list = section?.querySelector<HTMLElement>('.promo-list');

    if (section && list && promos.length > 0) {
        list.textContent = '';
        list.append(...promos.map(makePromo));
        section.hidden = false;
    }
};

const renderHero = (home: Home): void => {
    const heroGrid = document.querySelector<HTMLElement>('.hero-grid');

    if (heroGrid) {
        heroGrid.textContent = '';
        heroGrid.append(
            createHeroSlider(home.hero),
            createSideCard(home.side),
        );
        initSwiper();
    }
};

const getAndShowProducts = (
    trackSelector: string,
    categoryId: number,
    products: ProductView[]
): void => {
    const track = document.querySelector<HTMLElement>(trackSelector);

    if (!track) return;

    const filtered = products.filter(
        (product) => product.categoryId === categoryId
    );

    if (filtered.length === 0) {
        showError(track, 'محصولی برای نمایش وجود ندارد.');
    } else {
        fillContainer(track, filtered.map(makeCard));
        setBusy(track, false);
    }
};

const getAndShowAllProducts = (products: ProductView[]): void => {
    const track = document.querySelector<HTMLUListElement>(
        '.products-track-latest'
    );
    if (track) {

        const filteredProducts = products.filter(
            (product) => product.off !== undefined
        );

        if (!filteredProducts.length) {
            showError(
                track,
                'محصول تخفیف‌داری برای نمایش وجود ندارد.'
            );
        } else {

            fillContainer(track, filteredProducts.map(makeCard));
            setBusy(track, false);
        }
    }
};

const setupCarousel = (carousel: HTMLElement): void => {
    const track = carousel.querySelector<HTMLElement>('.track');
    const prev = carousel.querySelector<HTMLButtonElement>('[data-carousel="prev"]');
    const next = carousel.querySelector<HTMLButtonElement>('[data-carousel="next"]');

    if (track && prev && next) {
        prev.hidden = false;
        next.hidden = false;

        const getStep = (): number => {
            const card = track.querySelector<HTMLElement>('.card');
            const gap = parseFloat(getComputedStyle(track).columnGap) || 0;

            if (!card) {
                return track.clientWidth;
            }

            const cardWidth = card.offsetWidth + gap;

            return Math.max(1, Math.floor(track.clientWidth / cardWidth)) * cardWidth;
        };

        const direction = (): number => (getComputedStyle(track).direction === 'rtl' ? -1 : 1);

        const update = (): void => {
            const max = track.scrollWidth - track.clientWidth;
            const position = Math.abs(track.scrollLeft);

            const scrollable = max > 1;

            prev.hidden = !scrollable;
            next.hidden = !scrollable;
            prev.disabled = position <= 1;
            next.disabled = position >= max - 1;
        };

        const scrollByStep = (sign: number): void => {
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            track.scrollBy({
                left: sign * direction() * getStep(),
                behavior: reduceMotion ? 'auto' : 'smooth',
            });
        };
        const startOffset = (card: HTMLElement): number => {
            const trackRect = track.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();

            return direction() === -1 ? cardRect.right - trackRect.right : cardRect.left - trackRect.left;
        };

        const getCards = (): HTMLElement[] =>
            Array.from(track.querySelectorAll<HTMLElement>('.card:not(.skeleton)'));

        let urlTimer = 0;
        let urlPending = false;

        const writeUrl = (): void => {
            urlPending = false;

            const offsets = getCards().map((card) => Math.abs(startOffset(card) - direction() * EDGE_GAP));
            const first = offsets.indexOf(Math.min(...offsets));

            if (first === -1) return;

            const url = new URL(location.href);
            url.hash = `${track.id}-${first + 1}`;
            history.replaceState(history.state, '', url);
        };

        const scheduleUrl = (): void => {
            urlPending = true;
            clearTimeout(urlTimer);
            urlTimer = window.setTimeout(writeUrl, 150);
        };

        const restoreFromUrl = (): void => {
            const [, id, position] = location.hash.match(/^#(.+)-(\d+)$/) ?? [];
            const card = id === track.id ? getCards()[Number(position) - 1] : undefined;

            if (card) {
                track.scrollBy({ left: startOffset(card) - direction() * EDGE_GAP, behavior: 'auto' });
            }
        };

        prev.addEventListener('click', () => {
            scrollByStep(-1);
            scheduleUrl();
        });
        next.addEventListener('click', () => {
            scrollByStep(1);
            scheduleUrl();
        });

        let frame = 0;
        const scheduleUpdate = (): void => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);

            if (urlPending) scheduleUrl();
        };

        let restored = false;

        track.addEventListener('scroll', scheduleUpdate, { passive: true });
        new ResizeObserver(scheduleUpdate).observe(track);
        new MutationObserver(() => {
            scheduleUpdate();

            if (!restored && getCards().length > 0) {
                restored = true;
                restoreFromUrl();
            }
        }).observe(track, { childList: true });

        update();

    }
};

const initCarousels = (): void => {
    document.querySelectorAll<HTMLElement>('.carousel').forEach(setupCarousel);
};


const updateSearchPlaceholders = (count: number): void => {
    document.querySelectorAll<HTMLInputElement>('#q').forEach((input) => {
        input.placeholder = `جست و جو در میان ${toFa(count)} کالا`;
    });
};


const createLinkColumn = (id: string, title: string, links: FooterLink[]): HTMLElement => {
    const nav = el('nav');
    nav.setAttribute('aria-labelledby', id);

    const heading = el('h2', 'footer-col-title', title);
    heading.id = id;

    const list = el('ul', 'footer-col-list');

    links.forEach(({ href, label }) => {
        const li = el('li');
        const a = el('a', null, label);
        a.href = href;
        li.append(a);
        list.append(li);
    });

    nav.append(heading, list);

    return nav;
};

const createWorkingHours = (schedule: Schedule[]): HTMLElement => {
    const section = el('section');
    section.setAttribute('aria-labelledby', 'f-hours');

    const heading = el('h2', 'footer-col-title', 'ساعت کاری');
    heading.id = 'f-hours';

    const list = el('ul', 'footer-col-list');

    schedule.forEach(({ days, time }) => {
        const li = el('li');
        li.append(days, el('bdi', null, time));
        list.append(li);
    });

    section.append(heading, list);

    return section;
};

const createContactRow = (label: string, value: string, href?: string): HTMLElement => {
    const row = el('div', 'footer-contact-row');
    row.append(el('span', 'footer-contact-label', `${label}:`));

    const bdi = el('bdi', null, value);

    if (href) {
        const link = el('a', 'footer-contact-value');
        link.href = href;
        link.append(bdi);
        row.append(link);
    } else {
        const text = el('span', 'footer-contact-value');
        text.append(bdi);
        row.append(text);
    }

    return row;
};

const createAboutDesc = (shop: Shop): HTMLElement => {
    const paragraph = el('p', 'footer-about-desc');

    paragraph.append(
        `${shop.about} هزینه ارسال `,
        el('bdi', null, formatPrice(shop.deliveryFee)),
        ` ${shop.currency} است و برای خریدهای بالای `,
        el('bdi', null, toFa(shop.freeDeliveryOver / 1000)),
        ` هزار ${shop.currency}، ارسال رایگان است.`
    );

    return paragraph;
};

const renderFooter = (shop: Shop): void => {
    const footerCols = document.querySelector<HTMLElement>('.footer-cols');
    const footerContact = document.querySelector<HTMLElement>('.footer-contact');
    const footerAbout = document.querySelector<HTMLElement>('.footer-about');

    if (footerAbout && footerContact && footerCols) {
        footerAbout.querySelector('.footer-about-desc')?.remove();
        footerAbout.append(createAboutDesc(shop));


        footerContact.textContent = '';
        footerContact.append(
            createContactRow('تلفن', shop.phone, `tel:${shop.phone}`),
            createContactRow('آدرس', shop.address)
        );

        footerCols.textContent = '';
        footerCols.append(
            createLinkColumn('f-quick', 'دسترسی‌های سریع', shop.menu),
            createLinkColumn('f-help', 'راهنمای مشتریان', shop.help),
            createWorkingHours(shop.schedule)
        );
        setBusy(footerCols, false);
    }
};


const updateBadge = (): void => {
    const count = getCountBasketFromLocalStorage();
    document.querySelectorAll<HTMLElement>('.cart-badge').forEach((badge) => {
        badge.textContent = toFa(count);
        badge.closest('a')?.setAttribute('aria-label', `سبد خرید، ${toFa(count)} کالا`);
    });
};

const initAddToCart = (): void => {
    updateBadge()
    document.addEventListener("click", (e: MouseEvent) => {
        const target = e.target instanceof Element ? e.target : null;
        const button = target?.closest<HTMLButtonElement>(".act-btn.act-cart");

        if (button && !button.disabled) {
            saveToLocalStorage(getCountBasketFromLocalStorage() + 1)
            updateBadge();
            showAddToCartToast()
             celebrateAddToCart();
        }
    });
}

const initMouseDrag=(): void=> {
  document.querySelectorAll<HTMLElement>(".track").forEach((track) => {
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    track.addEventListener("mousedown", (e: MouseEvent) => {
      if (e.button !== 0) return;

      isDragging = true;
      startX = e.clientX;
      startScrollLeft = track.scrollLeft;
    });

    track.addEventListener("mousemove", (e: MouseEvent) => {
      if (!isDragging) return;

      e.preventDefault();

      const distance = e.clientX - startX;
      track.scrollLeft = startScrollLeft - distance;
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });

    track.addEventListener("dragstart", (e: DragEvent) => {
      e.preventDefault();
    });
  });
}


export {
      renderHero,
    renderFooter,
    getAndShowProducts,
    getAndShowAllProducts,
    updateSearchPlaceholders,
    initAddToCart,
    initCarousels,
    renderPromos,
    initMouseDrag

};

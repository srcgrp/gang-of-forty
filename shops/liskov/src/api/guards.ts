import type {
    Product,
    Category,
    Offer,
    Stock,
    Shop,
    Home,
    Banner,
    Promo,
    CarouselConfig,
} from '../types';

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isProduct(value: unknown): value is Product {
    return (
        isRecord(value) &&
        typeof value.id === 'number' &&
        typeof value.categoryId === 'number' &&
        typeof value.name === 'string' &&
        typeof value.emoji === 'string' &&
        typeof value.unit === 'string' &&
        typeof value.price === 'number' &&
        Array.isArray(value.tags) &&
        value.tags.every((tag: unknown): boolean => typeof tag === 'string')
    );
}

export function isCategory(value: unknown): value is Category {
    return (
        isRecord(value) &&
        typeof value.id === 'number' &&
        typeof value.slug === 'string' &&
        typeof value.name === 'string' &&
        typeof value.emoji === 'string' &&
        typeof value.color === 'string'
    );
}

export function isOffer(value: unknown): value is Offer {
    return (
        isRecord(value) &&
        typeof value.productId === 'number' &&
        typeof value.percent === 'number' &&
        typeof value.label === 'string'
    );
}

export function isStock(value: unknown): value is Stock {
    if (
        !isRecord(value) ||
        typeof value.updatedAt !== 'string' ||
        !isRecord(value.items)
    ) {
        return false;
    }

    return Object.values(value.items).every(
        (item: unknown): boolean => typeof item === 'number',
    );
}

export function isShop(value: unknown): value is Shop {
    return (
        isRecord(value) &&
        typeof value.name === 'string' &&
        typeof value.slogan === 'string' &&
        typeof value.owner === 'string' &&
        typeof value.city === 'string' &&
        typeof value.phone === 'string' &&
        isRecord(value.hours) &&
        typeof value.hours.open === 'string' &&
        typeof value.hours.close === 'string' &&
        typeof value.deliveryFee === 'number' &&
        typeof value.freeDeliveryOver === 'number' &&
        typeof value.currency === 'string' &&
        typeof value.notice === 'string' &&
        typeof value.about === 'string' &&
        typeof value.address === 'string' &&
        Array.isArray(value.schedule) &&
        value.schedule.every(
            (item: unknown): boolean =>
                isRecord(item) &&
                typeof item.days === 'string' &&
                typeof item.time === 'string',
        ) &&
        Array.isArray(value.menu) &&
        value.menu.every(
            (item: unknown): boolean =>
                isRecord(item) &&
                typeof item.href === 'string' &&
                typeof item.label === 'string',
        ) &&
        Array.isArray(value.help) &&
        value.help.every(
            (item: unknown): boolean =>
                isRecord(item) &&
                typeof item.href === 'string' &&
                typeof item.label === 'string',
        ) &&
        typeof value.copyright === 'string'
    );
}

export function isHome(value: unknown): value is Home {
    return (
        isRecord(value) &&
        isBanner(value.hero) &&
        isBanner(value.side) &&
        Array.isArray(value.promos) &&
        value.promos.every(isPromo) &&
        Array.isArray(value.carousels) &&
        value.carousels.every(isCarouselConfig)
    );
}

function isBanner(value: unknown): value is Banner {
    return (
        isRecord(value) &&
        typeof value.title === 'string' &&
        typeof value.text === 'string' &&
        typeof value.emoji === 'string' &&
        isRecord(value.cta) &&
        typeof value.cta.href === 'string' &&
        typeof value.cta.label === 'string'
    );
}

function isPromo(value: unknown): value is Promo {
    return (
        isRecord(value) &&
        typeof value.href === 'string' &&
        typeof value.text === 'string' &&
        typeof value.emoji === 'string' &&
        typeof value.color === 'string'
    );
}

function isCarouselConfig(value: unknown): value is CarouselConfig {
    return (
        isRecord(value) &&
        typeof value.id === 'string' &&
        typeof value.title === 'string' &&
        typeof value.emoji === 'string' &&
        (value.source === undefined || value.source === 'offers') &&
        (value.categoryId === undefined || typeof value.categoryId === 'number')
    );
}

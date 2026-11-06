import type { ShopLink, Shop, HomeBanner, HomePromo, CarouselConfig, Home } from '../../types'
import { isRecord, isString, isNumber, isPositiveId, isArrayOf } from './guards'

export function isShopLink(value: unknown): value is ShopLink {
    return isRecord(value) && isString(value.label) && isString(value.href)
}

export function isShop(value: unknown): value is Shop {
    return isRecord(value) &&
        isString(value.name) && isString(value.slogan) &&
        isString(value.owner) && isString(value.city) && isString(value.phone) &&
        isRecord(value.hours) && isString(value.hours.open) && isString(value.hours.close) &&
        isNumber(value.deliveryFee) && isNumber(value.freeDeliveryOver) &&
        isString(value.currency) && isString(value.notice) &&
        isString(value.about) && isString(value.address) &&
        isArrayOf(value.schedule, (entry): entry is { days: string; time: string } =>
            isRecord(entry) && isString(entry.days) && isString(entry.time)) &&
        isArrayOf(value.menu, isShopLink) && isArrayOf(value.help, isShopLink) &&
        isString(value.copyright)
}

export function isHomeBanner(value: unknown): value is HomeBanner {
    return isRecord(value) &&
        isString(value.title) && isString(value.text) &&
        isString(value.emoji) && isShopLink(value.cta)
}

export function isHomePromo(value: unknown): value is HomePromo {
    return isRecord(value) &&
        isString(value.text) && isString(value.emoji) &&
        isString(value.color) && isString(value.href)
}

export function isCarouselConfig(value: unknown): value is CarouselConfig {
    return isRecord(value) &&
        isString(value.id) && isString(value.title) && isString(value.emoji) &&
        (value.source === "offers" || (value.source === undefined && isPositiveId(value.categoryId)))
}

export function isHome(value: unknown): value is Home {
    return isRecord(value) && isHomeBanner(value.hero) &&
        isHomeBanner(value.side) &&
        isArrayOf(value.promos, isHomePromo) &&
        isArrayOf(value.carousels, isCarouselConfig)
}

import type {CarouselConfig, Offer, Product} from '../types';
import type {Context} from './context';

function isDefined<T>(value: T | undefined): value is T {
    return value !== undefined;
}

export function getCarouselProducts(
    carousel: CarouselConfig,
    context: Context,
): Product[] {
    if (carousel.source === 'offers') {
        return context.offers
            .map((offer: Offer) => context.productById.get(offer.productId))
            .filter(isDefined);
    }

    return context.products.filter(
        (product: Product): boolean =>
            product.categoryId === carousel.categoryId,
    );
}

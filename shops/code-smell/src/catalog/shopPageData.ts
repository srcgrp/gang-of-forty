import type { Carousel, CarouselWithProducts, ShopData } from "../types"
import { getVisibleCarousels } from "./catalogSelection"
import { getHomeCarousels } from "./getCarouselProducts"

function getHomeCarouselList(
    data: ShopData,
    categoryId: number | null
): Carousel[] {
    const category = data.categories.find(function (item) {
        return item.id === categoryId
    })

    return data.home.carousels.map(function (carousel) {
        if (category && carousel.categoryId !== undefined) {
            return {
                ...carousel,
                id: category.slug,
                title: category.name,
                emoji: category.emoji,
                categoryId: category.id
            }
        }

        return carousel
    })
}

export function getPageData(
    data: ShopData,
    catalogControls: {
        categoryId: number | null
        query: string
        onPick: (id: number | null) => void
        onQuery: (value: string) => void
    }
) {
    const { categoryId } = catalogControls
    const query = catalogControls.query.trim().toLowerCase()
    const products = query === ""
        ? data.products
        : data.products.filter(function (product) {
            return product.name.toLowerCase().includes(query)
        })
    let carousels: CarouselWithProducts[]

    if (query !== "" && categoryId !== null) {
        carousels = getVisibleCarousels({ ...data, products }, categoryId)
    } else {
        const carouselList: Carousel[] = query === ""
            ? getHomeCarouselList(data, categoryId)
            : [{ id: "search-results", title: "نتایج جستجو", emoji: "", source: "all" }]

        carousels = getHomeCarousels(
            carouselList,
            products,
            data.categories,
            data.offers,
            data.stock.items
        )
    }

    return { data, carousels, catalogControls }
}
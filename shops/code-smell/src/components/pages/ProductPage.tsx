import { Link, useParams } from "@tanstack/react-router"
import { getProductCardData } from "../../catalog/getProductCardData"
import { useCartStore } from "../../hooks/useCartStore"
import { useCatalog } from "../../hooks/useCatalog"
import AddToCartButton from "../AddToCartButton"
import Price from "../Price"
import Status from "../Status"

export default function ProductPage() {
    const { productId } = useParams({ from: "/product/$productId" })
    const { state, retry, catalogControls } = useCatalog()
    const add = useCartStore((store) => store.add)

    if (state.status !== "success") {
        return (
            <main id="main-content" tabIndex={-1}>
                <Status state={state} onRetry={retry} />
            </main>
        )
    }

    const { data } = state
    const selectedId = Number(productId)
    const selected = data.products.find((item) => item.id === selectedId)
    const product = selected
        ? getProductCardData(selected, data.categories, data.offers, data.stock.items)
        : null

    return (
        <main className="section section--muted" id="main-content" tabIndex={-1}>
            <div className="container">
                <header className="section__header">
                    <h1 className="section__title">{product?.name ?? "محصول پیدا نشد"}</h1>
                    <Link className="button button--secondary button--route" to="/" onClick={() => catalogControls.onQuery("")}>
                        بازگشت به صفحه ی اصلی
                    </Link>
                </header>
                {product && (
                    <article className="product-card">
                        <p className="product-card__unit">{product.unit}</p>
                        <div className="product-card__footer">
                            <Price
                                amount={product.finalPrice}
                                originalPrice={product.offer ? product.price : undefined}
                            />
                            <AddToCartButton
                                product={product}
                                onAdd={(id) => add(id, product.stockQuantity)}
                            />
                        </div>
                    </article>
                )}
            </div>
        </main>
    )
}

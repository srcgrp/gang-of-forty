import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { toCard } from "../catalog/catalog-logic";
import CatalogError from "../components/catalog/CatalogError";
import CatalogLoading from "../components/catalog/CatalogLoading";
import { useCartStore } from "../hooks/useCartStore";
import { useCatalog } from "../hooks/useCatalog";

export default function ProductPage() {
  const { productId } = useParams({ from: "/product/$productId" });
  const [attempt, setAttempt] = useState(0);
  const state = useCatalog(attempt);
  const add = useCartStore((store) => store.add);

  if (state.status === "loading") {
    return (
      <main className="route-page product-page">
        <PageNavigation />
        <CatalogLoading />
      </main>
    );
  }

  if (state.status === "error") {
    return (
      <main className="route-page product-page">
        <PageNavigation />
        <CatalogError message={state.message} onRetry={() => setAttempt((value) => value + 1)} />
      </main>
    );
  }

  const parsedId = Number(productId);
  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return <ProductNotFound />;
  }

  const product = state.data.products.find((item) => item.id === parsedId);
  if (!product) {
    return <ProductNotFound />;
  }

  const card = toCard(product, state.data.offers, state.data.stock.items);
  const category = state.data.categories.find((item) => item.id === product.categoryId);

  return (
    <main className="route-page product-page">
      <PageNavigation categorySlug={category?.slug} categoryName={category?.name} />
      <article className="product-detail">
        <div className="product-detail__media">
          <span className="product-detail__emoji" role="img" aria-label={product.name}>
            {product.emoji}
          </span>
        </div>
        <div className="product-detail__body">
          <div className="product-detail__badges">
            {card.discountPercent !== undefined && (
              <span className="badge-discount">{card.discountPercent.toLocaleString("fa-IR")}٪ تخفیف</span>
            )}
            {product.tags.map((tag) => (
              <span className="badge-offer-label" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <h1>{product.name}</h1>
          <p className="product-detail__unit">واحد: {product.unit}</p>
          {category && (
            <p className="product-detail__category">
              دسته‌بندی:{" "}
              <Link to="/plp/$carouselId" params={{ carouselId: category.slug }}
                search={{ sort: "default" }}>
                {category.name}
              </Link>
            </p>
          )}
          <div className="product-detail__pricing">
            {card.originalPrice !== undefined && (
              <span className="old-price">{card.originalPrice.toLocaleString("fa-IR")} تومان</span>
            )}
            <strong className="current-price">{card.price.toLocaleString("fa-IR")} تومان</strong>
          </div>
          {card.outOfStock ? (
            <p className="stock-message">ناموجود در انبار</p>
          ) : (
            <button
              className="checkout-btn product-detail__add"
              type="button"
              onClick={() => add(product, card.price)}
            >
              افزودن به سبد خرید
            </button>
          )}
        </div>
      </article>
    </main>
  );
}

function PageNavigation({
  categorySlug,
  categoryName,
}: {
  categorySlug?: string;
  categoryName?: string;
}) {
  return (
    <nav className="route-page__navigation" aria-label="مسیر صفحه">
      <Link to="/">صفحه اصلی</Link>
      {categorySlug && categoryName && (
        <Link to="/plp/$carouselId" params={{ carouselId: categorySlug }}
          search={{ sort: "default" }}>
          {categoryName}
        </Link>
      )}
      <Link to="/cart">سبد خرید</Link>
    </nav>
  );
}

function ProductNotFound() {
  return (
    <main className="route-page product-page">
      <h1>محصول پیدا نشد</h1>
      <p>محصول موردنظر در فروشگاه وجود ندارد.</p>
      <Link to="/">بازگشت به صفحه اصلی</Link>
    </main>
  );
}

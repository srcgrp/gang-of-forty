import { Link, useParams } from '@tanstack/react-router'
import { useCatalog } from '../../hooks/useCatalog'
import { useCartStore } from '../../hooks/useCartStore'

export default function ProductDetailPage() {
  const { productId } = useParams({
    from: '/product/$productId',
  })

  const { loadState } = useCatalog()
  const addItem = useCartStore((state) => state.addItem)

  if (loadState.status === 'loading') {
    return <p>در حال بارگذاری محصول...</p>
  }

  if (loadState.status === 'error') {
    return <p>خطا در بارگذاری محصولات.</p>
  }

  const products =
    loadState.status === 'success'
      ? loadState.products
      : []

  const product = products.find(
    (item) => item.id === productId,
  )

  if (!product) {
    return (
      <section>
        <h2>محصول پیدا نشد</h2>
        <Link to="/">بازگشت به صفحه اصلی</Link>
      </section>
    )
  }

  return (
    <section className="product-detail">
      <Link to="/">بازگشت به فروشگاه</Link>

      <h2>{product.title}</h2>

      <p>دسته‌بندی: {product.category}</p>
      <p>قیمت: {product.finalPrice.toLocaleString('fa-IR')} تومان</p>
      <p>موجودی: {product.stock}</p>

      <button
        type="button"
        disabled={product.stock <= 0}
        onClick={() => addItem(product)}
      >
        افزودن به سبد خرید
      </button>
    </section>
  )
}
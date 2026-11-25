import { useState } from 'react'
import confetti from 'canvas-confetti'
import type { ProductView } from '../../types'
import { useCartStore } from '../../hooks/useCartStore'
import { formatNumber } from '../format'
import Icon from '../Icon'
import Price from '../Price'
import QuantityPicker from './QuantityPicker'

type ProductInfoProps = {
  product: ProductView
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const add = useCartStore((s) => s.add)

  const inStock = product.stock > 0
  const discounted = product.percent > 0
  const savings = product.originalPrice - product.price

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i += 1) {
      add(product.id, product.stock)
    }
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.75 },
      zIndex: 2000,
    })
  }

  return (
    <div className="pd-info">
      <h1 className="pd-info__title">{product.name}</h1>
      <p className="pd-info__unit">واحد: {product.unit}</p>
      <div className="pd-info__price">
        <Price price={product.price} originalPrice={product.originalPrice} discounted={discounted} />
      </div>
      {discounted && (
        <p className="pd-info__savings">صرفه‌جویی: {formatNumber(savings)} تومان</p>
      )}
      <p className={`pd-info__stock${inStock ? '' : ' pd-info__stock--out'}`}>
        {inStock ? `${formatNumber(product.stock)} عدد در انبار موجود است` : 'فعلاً ناموجود است'}
      </p>
      <div className="pd-info__actions">
        <QuantityPicker
          value={quantity}
          onChange={setQuantity}
          max={product.stock}
          disabled={!inStock}
        />
        <button
          type="button"
          className="btn pd-add-btn"
          disabled={!inStock}
          aria-label={`افزودن ${product.name} به سبد خرید`}
          onClick={handleAddToCart}
        >
          <Icon name="cart" /> افزودن به سبد
        </button>
      </div>
    </div>
  )
}

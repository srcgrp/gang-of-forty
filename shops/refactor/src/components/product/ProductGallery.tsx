import type { ProductView } from '../../types'
import OfferBadge from '../OfferBadge'

type ProductGalleryProps = {
  product: ProductView
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const inStock = product.stock > 0
  const discounted = product.percent > 0

  return (
    <div className={`pd-gallery${inStock ? '' : ' pd-gallery--out'}`}>
      <span className="pd-gallery__emoji" aria-hidden="true">
        {product.emoji}
      </span>
      {discounted && <OfferBadge percent={product.percent} />}
      {!inStock && <span className="chip-out">ناموجود</span>}
    </div>
  )
}

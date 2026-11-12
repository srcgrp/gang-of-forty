import Price from './Price'
import OfferBadge from './OfferBadge'

type ProductCardProps = {
  id: string
  name: string
  emoji: string
  oldPrice: number
  price: number
  discount: number
}

export default function ProductCard({
  id,
  name,
  emoji,
  oldPrice,
  price,
  discount
}: ProductCardProps) {
  return (
    <li className="card" id={id}>
      <article>
        <div className="img fruit-icon">
          <span aria-hidden="true">{emoji}</span>
        </div>

        <h3>{name}</h3>

       <p>
        <s>{oldPrice.toLocaleString('fa-IR')}</s>
           {' '}
        <b>
           <Price value={price} />
        </b>
       </p>

        <OfferBadge discount={discount} />

        <button type="button">افزودن</button>
      </article>
    </li>
  )
}

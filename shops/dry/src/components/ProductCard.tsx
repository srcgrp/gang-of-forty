import type { Card } from '../shared/types.ts'
import { showToast } from '../features/toast/toastStore.ts'

type ProductCardProps = {
  card: Card
  onAdd: (id: number) => void
  anchorId?: string
}

export default function ProductCard({ card, onAdd, anchorId }: ProductCardProps) {
  return (
    <div id={anchorId} className={card.inStock ? 'product-card' : 'product-card out'}>
            {card.discount && <span className="discount">{card.discount}</span>}

            <button type="button" className="favorite" aria-label="علاقه مندی">
                 ♡
            </button>
            
            <div className="product-emoji">
                {card.image ? (
                    <img src={card.image} alt="" />
                ) : (
                    <span aria-hidden="true">{card.emoji}</span>
                )}
                               {!card.inStock && <span className="sold-out">ناموجود</span>}
            </div>

            <h3>{card.title}</h3>
            <p className="product-brand">{card.unit}</p>

            <div className="price">
                {card.oldPrice && <span className="old-price">{card.oldPrice}</span>}
                <span>{card.price}</span>
            </div>

            <button 
            type="button"
            className="add-btn"
            aria-label={`افزودن ${card.title} به سبد`}
            disabled={!card.inStock}
            onClick={() => {
                onAdd(card.id)
                showToast(`${card.title} به سبد اضافه شد`)
            }}
            >
                +
            </button>
        </div>
    )
}

import type { Card } from '../shared/types.ts'
import { showToast } from '../features/toast/toastStore.ts'
import { useFavorites } from '../hooks/useFavorites.ts'

type ProductCardProps = {
  card: Card
  onAdd: (id: number) => void
  anchorId?: string
}

export default function ProductCard({ card, onAdd, anchorId }: ProductCardProps) {
  const { favorites, toggle } = useFavorites()
  const liked = favorites.includes(card.id) 

  return (
    <div id={anchorId} className={card.inStock ? 'product-card' : 'product-card out'}>
            {card.discount && <span className="discount">{card.discount}</span>}

            <button
                type="button"
                className={liked ? 'favorite active' : 'favorite'}
                aria-label={liked ? `حذف ${card.title} از علاقه‌مندی‌ها` : `افزودن ${card.title} به علاقه‌مندی‌ها`}
                aria-pressed={liked}
                onClick={() => {
                    toggle(card.id)
                    showToast(liked
                        ? `${card.title} از علاقه‌مندی‌ها حذف شد`
                        : `${card.title} به علاقه‌مندی‌ها اضافه شد`)
                }}
            >
                {liked ? '♥' : '♡'}
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

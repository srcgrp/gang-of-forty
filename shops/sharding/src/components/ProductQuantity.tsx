type ProductQuantityProps = {
  name: string
  quantity: number
  max: number
  onAdd: () => void
  onRemove: () => void
}

export default function ProductQuantity({ name, quantity, max, onAdd, onRemove }: ProductQuantityProps) {
  return (
    <div className="product__qty">
      <button type="button" className="product__qty-btn" onClick={onRemove} aria-label={`کم کردن ${name}`}>−</button>
      <span className="product__qty-val" aria-live="polite">{quantity.toLocaleString('fa-IR')}</span>
      <button
        type="button"
        className="product__qty-btn"
        onClick={onAdd}
        disabled={quantity >= max}
        aria-label={`افزودن ${name}`}
      >
        +
      </button>
    </div>
  )
}

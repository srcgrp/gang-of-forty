type ProductStatusProps = {
  variant: 'empty' | 'error'
  title: string
  text: string
  onRetry?: () => void
}

export default function ProductStatus({ variant, title, text, onRetry }: ProductStatusProps) {
  return (
    <section className="product-shelf" aria-labelledby="status-title">
      <div className="container">
        <div className="product-shelf__inner">
          <div className="product-shelf__main">
            <div className="product-shelf__head">
              <h2 id="status-title" className="product-shelf__title">{title}</h2>
            </div>
            <div className="product-shelf__status" data-variant={variant} role="status" aria-live="polite">
              <p className="product-shelf__status-title">{title}</p>
              <p className="product-shelf__status-text">{text}</p>
              {variant === 'error' && onRetry && (
                <button
                  type="button"
                  className="product-shelf__status-retry"
                  onClick={onRetry}
                >
                  تلاش دوباره
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

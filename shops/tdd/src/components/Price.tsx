type PriceProps = {
    value: number
    offerPercent?: number
}

export default function Price({ value, offerPercent }: PriceProps) {
    const hasOffer = offerPercent !== undefined
    const finalPrice = hasOffer
        ? Math.round(value * (1 - offerPercent / 100))
        : value

    return (
        <div className="product-prices">
            {hasOffer && (
                <p className="previous-price">
                    قیمت قبلی: <del>{value.toLocaleString('fa-IR')} تومان</del>
                </p>
            )}
            <p className="current-price">
                {hasOffer ? 'قیمت با تخفیف: ' : 'قیمت: '}
                <strong>{finalPrice.toLocaleString('fa-IR')}</strong> تومان
            </p>
        </div>
    )
}

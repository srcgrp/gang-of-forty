type PriceProps = {
    amount: number
    originalPrice?: number
    currency?: string
}

export default function Price({
    amount,
    originalPrice,
    currency = "تومان"
}: PriceProps) {
    return (
        <p className="price">
            {originalPrice !== undefined && (
                <del className="price__old">
                    {originalPrice.toLocaleString("fa-IR")}
                </del>
            )}
            <span className="price__current">
                {amount.toLocaleString("fa-IR")}{" "}
                <span className="price__unit">{currency}</span>
            </span>
        </p>
    )
}
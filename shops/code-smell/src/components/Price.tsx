type PriceProps = {
    amount: number
    currency?: string
}

export default function Price({
    amount,
    currency = "تومان"
}: PriceProps) {
    return (
        <p className="price">
            <span className="price__current">
                {amount.toLocaleString("fa-IR")}{" "}
                <span className="price__unit">{currency}</span>
            </span>
        </p>
    )
}
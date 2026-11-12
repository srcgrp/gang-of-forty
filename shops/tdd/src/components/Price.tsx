export default function Price({ value }: { value: number }) {
    return (
        <div className="product-prices">
            <p className="current-price">
                قیمت: <strong>{value.toLocaleString('fa-IR')}</strong> تومان
            </p>
        </div>
    )
}

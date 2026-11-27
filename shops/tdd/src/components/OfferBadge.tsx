export default function OfferBadge({ percent }: { percent: number }) {
    return (
        <span className="discount-badge">
            {percent.toLocaleString('fa-IR')}٪ تخفیف
        </span>
    )
}

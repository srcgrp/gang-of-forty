import type { Offer } from "../types"

type OfferBadgeProps = {
    offer: Offer
}

export default function OfferBadge({ offer }: OfferBadgeProps) {
    return (
        <span className="badge product-card__badge">
            {offer.percent.toLocaleString("fa-IR") + "٪" + " " + "تخفیف"}
        </span>
    )
}
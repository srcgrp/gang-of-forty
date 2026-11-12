import { formatNumber } from "../format/formatting.ts";

type OfferBadgeProps = {
  text: string
  percent?: number
}

export default function OfferBadge({ text, percent }: OfferBadgeProps) {
  return (
    <p className="badge">
      {percent !== undefined ? (
        <>
          <span className="visually-hidden">{text}</span>{" "}
          {formatNumber(percent)}٪
        </>
      ) : (
        text
      )}
    </p>
  )
}
import type { Home } from "../types/shop.ts";

type PromoStripsProps = { home: Home };

export default function PromoStrips({ home }: PromoStripsProps) {
  return (
    <div className="adv" id="promos">
      {home.promos.map(function (item) {
        return (
          <a
            key={item.href + item.text}
            className="strip"
            href={item.href}
            style={{ backgroundColor: item.color }}
          >
            <span>{item.text}</span>
            <span className="strip-emoji">{item.emoji}</span>
          </a>
        );
      })}
    </div>
  );
}

import type { Promo } from "../shared/types";

type Props = { promos: Promo[]; onNavigate: () => void };
export default function Promos({ promos, onNavigate }: Props) {
  return (
    <div id="promos" className="promos">
      {promos.map(promo => (
        <a key={promo.href} className="promo" onClick={onNavigate} href={promo.href} style={{ backgroundColor: promo.color }}>
          <span className="promo-emoji" aria-hidden="true">{promo.emoji}</span>
          <span>{promo.text}</span>
        </a>
      ))}
    </div>
  );
}

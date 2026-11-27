import type { Promo } from "../types";

interface PromoSectionsProps { promos: Promo[] }

export default function PromoSections({ promos }: PromoSectionsProps) {
  return (
    <>
      {promos.map((promo) => {
        const promoId = promo.href.replace(/[^a-zA-Z0-9_-]/g, "-");
        return (
          <section className="advertisement anchor-section" id={`advertisement-${promoId}`}
            key={promo.href}>
            <a href={promo.href} style={{ backgroundColor: promo.color }}>
              <span className="advertisement__emoji" aria-hidden="true">{promo.emoji}</span>
              <span className="advertisement__text">{promo.text}</span>
            </a>
          </section>
        );
      })}
    </>
  );
}

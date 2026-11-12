import type { Promo } from "../types.ts";

type PromosProps = {
  promos: Promo[];
};

export default function Promos({ promos }: PromosProps) {
  return (
    <section className="banners" id="banners" aria-label="بنرهای تبلیغاتی">
      {promos.map((p) => (
        <a key={p.href} href={p.href}>
          {p.text} <span aria-hidden="true">{p.emoji}</span>
        </a>
      ))}
    </section>
  );
}
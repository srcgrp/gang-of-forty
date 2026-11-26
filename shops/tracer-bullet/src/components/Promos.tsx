import type { Promo } from "../types.ts";
import AppLink from "./AppLink.tsx";

type PromosProps = {
  promos: Promo[];
};

export default function Promos({ promos }: PromosProps) {
  return (
    <section className="banners" id="banners" aria-label="بنرهای تبلیغاتی">
      {promos.map((p) => (
        <AppLink key={p.href} href={p.href}>
          {p.text} <span aria-hidden="true">{p.emoji}</span>
        </AppLink>
      ))}
    </section>
  );
}
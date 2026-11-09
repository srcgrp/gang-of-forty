import Art from "./Art.tsx";
import { BANNERS } from "./sampleData.ts";

export default function Hero() {
  return (
    <section className="banner" id="home-banners">
      {BANNERS.map((b) => (
        <article key={b.variant} className={b.variant}>
          <div className={`banner-content ${b.variant}-content`}>
            <h2 className={`banner-title ${b.variant}-title`}>{b.title}</h2>
            <p className={`banner-details ${b.variant}-details`}>{b.text}</p>
            {b.cta && (
              <a
                className={`banner-button ${b.variant}-button`}
                href={b.cta.href}
              >
                {b.cta.label}
              </a>
            )}
          </div>
          <span className="banner-art">
            <Art value={b.emoji} alt={b.title} />
          </span>
        </article>
      ))}
    </section>
  );
}

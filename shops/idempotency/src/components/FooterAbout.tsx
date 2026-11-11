import type { Shop } from "../shared/types/shop";

type Props = {
  shop: Shop | null;
};

export default function FooterAbout({ shop }: Props) {
  return (
    <section id="about" className="footer-section">
      <h2 className="footer-title">
        <img
          src="./asset/icons/shop.png"
          alt=""
          aria-hidden="true"
          className="footer-title-icon"
        />
        درباره تازه‌خانه
      </h2>
      <p>
        {shop?.about ??
          "فروشگاهی برای خرید ساده، تازه و روزمره با حال‌وهوای ایرانی."}
      </p>

      <div className="footer-socials">
        {[
          ["تلگرام", "telegram.png"],
          ["اینستاگرام", "instagram.png"],
          ["واتساپ", "whatsapp.png"],
        ].map(([label, icon]) => (
          <a
            key={label}
            href="#contact"
            className="footer-social-link"
            aria-label={label}
          >
            <img src={`./asset/icons/${icon}`} alt="" aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}

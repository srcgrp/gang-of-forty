import type { Shop } from "../shared/types/shop";

type Props = {
  shop: Shop | null;
};

export default function FooterContact({ shop }: Props) {
  return (
    <section id="contact" className="footer-section">
      <h2 className="footer-title">
        <img
          src="./asset/icons/phone.png"
          alt=""
          aria-hidden="true"
          className="footer-title-icon"
        />
        تماس با ما
      </h2>

      <div className="footer-info">
        <img
          src="./asset/icons/clock.png"
          alt=""
          aria-hidden="true"
          className="footer-info-icon"
        />

        <div>
          <p>ساعات پاسخگویی:</p>

          {shop ? (
            shop.schedule.map((item) => (
              <p key={`${item.days}-${item.time}`}>
                {item.days}: {item.time}
              </p>
            ))
          ) : (
            <p>در حال دریافت ساعات پاسخگویی...</p>
          )}
        </div>
      </div>

      <p className="footer-phone">{shop?.phone ?? "۰۲۱-۱۲۳۴۵۶۷۸"}</p>

      <address className="footer-address">
        {shop?.address ?? "تهران، خیابان ولیعصر، پلاک ۱۲۳"}
      </address>
    </section>
  );
}

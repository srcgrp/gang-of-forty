export default function FooterAbout({ about }: { about: string }) {
  return (
        <div>
          <h2>سوپرمارکت آرمین</h2>
          <p id="foot-about">{about}</p>
          <address id="foot-contact">
            <a href="https://www.google.com/maps/search/?api=1&amp;query=%D8%AA%D9%87%D8%B1%D8%A7%D9%86%D8%8C%20%D9%85%DB%8C%D8%AF%D8%A7%D9%86%20%D9%88%D9%86%DA%A9%D8%8C%20%D9%BE%D9%84%D8%A7%DA%A9%2010" target="_blank" rel="noopener noreferrer">
              <svg className="icon" aria-hidden="true" focusable="false"><use href="#i-pin" /></svg>
              {" تهران، میدان ونک، پلاک 10"}
              <span className="sr-only">{" (نمایش در گوگل مپ، در تب جدید باز می‌شود)"}</span>
            </a>
            <a href="tel:+982112345678">
              <svg className="icon" aria-hidden="true" focusable="false"><use href="#i-phone" /></svg>
              <span className="sr-only">{"تلفن ثابت: "}</span>
              <bdi dir="ltr">۰۲۱-۱۲۳۴۵۶۷۸</bdi>
            </a>
            <a href="tel:+989121234567">
              <svg className="icon" aria-hidden="true" focusable="false"><use href="#i-smartphone" /></svg>
              <span className="sr-only">{"پشتیبانی موبایل: "}</span>
              <bdi dir="ltr">۰۹۱۲-۱۲۳-۴۵۶۷</bdi>
            </a>
            <a href="mailto:info@arminmarket.ir">
              <svg className="icon" aria-hidden="true" focusable="false"><use href="#i-mail" /></svg>
              <span className="sr-only">{"ایمیل: "}</span>
              <bdi dir="ltr">info@arminmarket.ir</bdi>
            </a>
          </address>
          <h3 className="foot-social__title" id="foot-social-t">ما را دنبال کنید</h3>
          <ul className="foot-social" id="foot-social" aria-labelledby="foot-social-t">
            <li>
              <a href="https://instagram.com/arminmarket">
                <svg className="icon" aria-hidden="true" focusable="false"><use href="#i-instagram" /></svg>
                {" اینستاگرام"}
              </a>
            </li>
            <li>
              <a href="https://t.me/arminmarket">
                <svg className="icon" aria-hidden="true" focusable="false"><use href="#i-telegram" /></svg>
                {" تلگرام"}
              </a>
            </li>
            <li>
              <a href="https://wa.me/989121234567">
                <svg className="icon" aria-hidden="true" focusable="false"><use href="#i-whatsapp" /></svg>
                {" واتس‌اپ"}
              </a>
            </li>
          </ul>
        </div>
  );
}
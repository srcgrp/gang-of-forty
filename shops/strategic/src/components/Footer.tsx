import CategoryLink, { type CategoryListProps } from './CategoryLink';
export default function Footer({ categories, categoryId, onPick }: CategoryListProps) {
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <h2>سوپرمارکت آرمین</h2>
            <p id="foot-about">از سال ۱۴۰۵ کنار شما هستیم؛ کالای تازه با قیمت منصفانه.</p>
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
          <nav aria-label="دسته‌ها در پاورقی">
            <h2>دسته‌ها</h2>
            <ul id="foot-cats">
              {categories.map(category => (
                <li key={category.id}>
                  <CategoryLink active={category.id === categoryId} category={category} onPick={onPick}>
                    {category.name}
                  </CategoryLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2>راهنما</h2>
            <ul id="foot-help">
              <li>شیوه ارسال</li>
              <li>بازگشت کالا</li>
              <li>پرسش‌های پرتکرار</li>
            </ul>
          </div>
          <div>
            <h2>ساعت کاری</h2>
            <ul id="foot-hours">
              <li>شنبه تا پنجشنبه: ۸ تا ۲۲</li>
              <li>جمعه: ۹ تا ۱۴</li>
            </ul>
          </div>
        </div>
        <div className="foot-bar">
          <p id="foot-copy">© ۱۴۰۵ تمامی حقوق برای سوپرمارکت آرمین محفوظ است.</p>
          <a href="#top">
            <svg className="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-up" /></svg>
            {" بازگشت به بالا"}
          </a>
        </div>
      </div>
    </footer>
  );
}
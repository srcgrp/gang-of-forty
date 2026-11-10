import BrandLogo from "./BrandLogo"

export default function FooterAbout() {
    const phoneNumber = "021-00000000"

    return (
        <section
            className="footer-column"
            aria-labelledby="footer-about-title"
        >
            <h2
                className="footer-column__title footer-brand"
                id="footer-about-title"
            >
                <BrandLogo className="footer-brand__logo" />
                سوپرمارکت بوی کد
            </h2>
            <p className="footer-column__text">
                کالاهای مورد نیاز روزانه‌تان را در فروشگاه بوی کد پیدا کنید.
            </p>
            <address className="footer-contact">
                <p className="footer-contact__item">
                    <img
                        className="footer-icon"
                        src="svg/map-pin.svg"
                        alt=""
                        width={18}
                        height={18}
                        aria-hidden="true"
                    />
                    آدرس فروشگاه
                </p>
                <p className="footer-contact__item">
                    <img
                        className="footer-icon"
                        src="svg/phone.svg"
                        alt=""
                        width={18}
                        height={18}
                        aria-hidden="true"
                    />
                    <a
                        className="footer-contact__link"
                        href={"tel:" + phoneNumber.replaceAll("-", "")}
                        dir="ltr"
                    >
                        {phoneNumber}
                    </a>
                </p>
            </address>
        </section>
    )
}
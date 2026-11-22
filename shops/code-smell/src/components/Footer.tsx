import type { Category, Link, Shop } from "../types"
import FooterAbout from "./FooterAbout"
import FooterLinks from "./FooterLinks"
import FooterHours from "./FooterHours"


type FooterProps = {
    categories: Category[]
    shop: Shop
    onPick: (id: number) => void
}

const helpLinks: Link[] = [
    { label: "شیوه ارسال", href: "#shipping" },
    { label: "بازگشت کالا", href: "#returns" },
    { label: "پرسش‌های پرتکرار", href: "#faq" }
]

export default function Footer({
    categories,
    shop,
    onPick
}: FooterProps) {
    const categoryLinks = categories.map(function (category) {
        return {
            label: category.name,
            href: "#products",
            categoryId: category.id
        }
    })

    return (
        <footer className="site-footer" id="footer">
            <span className="category-anchor" id="contact" />
            <div className="site-footer__grid container">
                <FooterAbout shop={shop} />
                <FooterLinks
                    title="دسته‌بندی کالاها"
                    headingId="footer-categories-title"
                    entries={categoryLinks}
                    onPick={onPick}
                />
                <FooterLinks
                    title="راهنمای خرید"
                    headingId="footer-guide-title"
                    entries={helpLinks}
                />
                <FooterHours schedule={shop.schedule} />
            </div>
            <div className="site-footer__bottom container">
                <p className="copyright">
                    {shop.copyright.replaceAll(
                        shop.name,
                        "سوپرمارکت بوی کد"
                    )}
                </p>
                <a className="back-to-top" href="#top">
                    بازگشت به بالا
                </a>
            </div>
        </footer>
    )
}
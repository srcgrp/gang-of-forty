import type { Category, Link, Shop } from "../types"
import FooterAbout from "./FooterAbout"
import FooterLinks from "./FooterLinks"
import FooterHours from "./FooterHours"

type FooterProps = {
    categories: Category[]
}

const helpLinks: Link[] = [
    { label: "شیوه ارسال", href: "#shipping" },
    { label: "بازگشت کالا", href: "#returns" },
    { label: "پرسش‌های پرتکرار", href: "#faq" }
]

const sampleSchedule: Shop["schedule"] = [
    { days: "شنبه تا پنج‌شنبه", time: "۸ تا ۲۲" },
    { days: "جمعه", time: "۹ تا ۱۴" }
]

export default function Footer({ categories }: FooterProps) {
    const categoryLinks: Link[] = categories.map(function (category) {
        return {
            label: category.name,
            href: "#" + category.slug
        }
    })

    return (
        <footer className="site-footer" id="footer">
            <span className="category-anchor" id="contact" />
            <div className="site-footer__grid container">
                <FooterAbout />
                <FooterLinks
                    title="دسته‌بندی کالاها"
                    headingId="footer-categories-title"
                    entries={categoryLinks}
                />
                <FooterLinks
                    title="راهنمای خرید"
                    headingId="footer-guide-title"
                    entries={helpLinks}
                />
                <FooterHours schedule={sampleSchedule} />
            </div>
            <div className="site-footer__bottom container">
                <p className="copyright">
                    تمامی حقوق سوپرمارکت بوی کد محفوظ است.
                </p>
                <a className="back-to-top" href="#top">
                    بازگشت به بالا
                </a>
            </div>
        </footer>
    )
}
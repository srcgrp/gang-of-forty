import type { Category, ShopDetails } from '../shared/types'

type FooterProps = {
    shop: ShopDetails
    categories: Category[]
    onPick: (id: number) => void
}

export default function Footer({ shop, categories, onPick }: FooterProps) {
    return (
        <footer id="contact">
            <section aria-labelledby="footer-about">
                <h2 id="footer-about">{shop.name}</h2>
                <p id="footer-about-text">{shop.about}</p>
                <address id="shop-address">
                    {shop.address}<br />
                    <a href={'tel:' + shop.phone.replace(/[^+0-9]/g, '')} dir="ltr">{shop.phone}</a>
                </address>
                <div id="shop-schedule" role="group" aria-label="ساعت کاری">
                    <h3>ساعت کاری</h3>
                    {shop.schedule.map(entry => <p key={entry.days}>{entry.days}: {entry.time}</p>)}
                </div>
            </section>
            <nav id="footer-categories" aria-label="دسته‌بندی‌های پایین صفحه">
                {categories.map(category => (
                    <a href="#category-products" key={category.id} onClick={() => onPick(category.id)}>
                        {category.name}
                    </a>
                ))}
            </nav>
            <nav aria-label="راهنمای فروشگاه">
                {shop.help.map(link => <a href={link.href} key={link.label}>{link.label}</a>)}
            </nav>
            <a className="back-to-top" href="#top">بازگشت به بالا <span aria-hidden="true">↑</span></a>
            <p id="shop-copyright">{shop.copyright.replaceAll(shop.name, 'سام مارکت')}</p>
        </footer>
    )
}

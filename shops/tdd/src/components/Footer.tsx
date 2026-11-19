import type { Category, ShopDetails } from '../shared/types'
import { Link } from '@tanstack/react-router'

type FooterProps = {
    shop: ShopDetails
    categories: Category[]
}

export default function Footer({ shop, categories }: FooterProps) {
    return (
        <footer id="contact">
            <section aria-labelledby="footer-about">
                <h2 id="footer-about">سام مارکت</h2>
                <p id="footer-about-text">{shop.about}</p>
                <address id="shop-address">
                    {shop.address}<br />
                    <a href={'tel:' + shop.phone.replace(/[^+0-9]/g, '')} dir="ltr">تماس با سام مارکت</a>
                </address>
                <div id="shop-schedule" role="group" aria-label="ساعت کاری">
                    <h3>ساعت کاری</h3>
                    {shop.schedule.map(entry => <p key={entry.days}>{entry.days}: {entry.time}</p>)}
                </div>
            </section>
            <nav id="footer-categories" aria-label="دسته‌بندی‌های پایین صفحه">
                {categories.map(category => (
                    <Link to="/plp/$carouselId" params={{ carouselId: category.slug }} search={{ sort: 'default' }} key={category.id}>
                        {category.name}
                    </Link>
                ))}
            </nav>
            <nav aria-label="راهنمای فروشگاه">
                {shop.help.map(link => link.href.startsWith('#')
                    ? <Link to="/" hash={link.href.slice(1)} key={link.label}>{link.label}</Link>
                    : <a href={link.href} key={link.label}>{link.label}</a>)}
            </nav>
            <Link className="back-to-top" to="." search hash="top">بازگشت به بالا <span aria-hidden="true">↑</span></Link>
            <p id="shop-copyright">{shop.copyright.replaceAll(shop.name, 'سام مارکت')}</p>
        </footer>
    )
}

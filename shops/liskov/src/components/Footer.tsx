import type {AppData} from '../types';

type FooterProps = {
    data: AppData;
};

const faNumber = new Intl.NumberFormat('fa-IR');

export default function Footer({data}: FooterProps) {
    const {shop, categories} = data;

    return (
        <footer className='footer' id='contact'>
            <div className='footer-main'>
                <div className='footer-column footer-about'>
                    <h2>سوپرمارکت شایان</h2>
                    <p>{shop.about}</p>

                    <p>
                        <span aria-hidden='true'>📍</span> {shop.address}
                    </p>

                    <p>
                        <span aria-hidden='true'>☎️</span>{' '}
                        <a href={`tel:${shop.phone}`}>
                            <bdi dir='ltr'>
                                {faNumber.format(Number(shop.phone))}
                            </bdi>
                        </a>
                    </p>
                </div>

                <nav className='footer-column' aria-label='دسته‌بندی‌ها'>
                    <h2>دسته‌ها</h2>
                    {categories.map((category) => (
                        <a key={category.id} href={`#${category.slug}`}>
                            {category.name}
                        </a>
                    ))}
                </nav>

                <nav className='footer-column' aria-label='راهنما'>
                    <h2>راهنما</h2>
                    {shop.help.map((item) => (
                        <a key={item.href} href={item.href}>
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className='footer-column'>
                    <h2>ساعت کاری</h2>
                    {shop.schedule.map((entry) => (
                        <p key={entry.days}>
                            {entry.days}: {entry.time}
                        </p>
                    ))}
                </div>
            </div>

            <div className='footer-bottom'>
                <p>{shop.copyright.replace(shop.name, 'سوپرمارکت شایان')}</p>

                <a href='#top'>↑ بازگشت به بالا</a>
            </div>
        </footer>
    );
}

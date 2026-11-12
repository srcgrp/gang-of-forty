import CartPanel from './CartPanel';

type HeaderProps = {
    itemCount: number;
};

export default function Header({itemCount}: HeaderProps) {
    return (
        <header className='header' id='top'>
            <div id='top-bar'>
                <p id='top-bar-text'></p>
            </div>

            <div className='header-main'>
                <a
                    id='main-logo'
                    href='#top'
                    aria-label='سوپرمارکت شایان، بازگشت به بالای صفحه'
                >
                    <span>سوپرمارکت شایان</span>
                </a>

                <input
                    type='search'
                    id='search'
                    name='search'
                    aria-label='جستجو'
                    placeholder='جستجو'
                />

                <CartPanel itemCount={itemCount} />
            </div>

            <nav className='main-nav' aria-label='منوی اصلی'>
                <ul className='main-nav-items' id='main-menu'>
                    <li className='all-categories-menu'>
                        <a className='categories-links' href='#all-categories'>
                            همه دسته‌ها
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

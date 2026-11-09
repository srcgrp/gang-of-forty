export default function CategoryNav() {
    return (
        <nav className="navbar" aria-label="منوی اصلی">
            <ul>
                <li className="all-categories">
                <a href="#">همه دسته‌ها</a>
                <ul className="mega-menu">
                </ul>
                </li>
                <li><a href="#special-products">پیشنهاد ویژه</a></li>
                <li><a href="#">میوه و سبزی</a></li>
                <li><a href="#dairy">لبنیات</a></li>
                <li><a href="#">نان تازه</a></li>
                <li><a href="#">تماس با ما</a></li>
            </ul>
        </nav>
    )
}
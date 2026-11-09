export default function Navigation(){
    return(
        <nav className="navigation" id="navigation">
        <ul className="nav">
            <li id="allcategory"><a href="#categories">همه دسته ها</a>
                <ul className="dropdown" id="menu-categories">
                    <li><a href="#categories" aria-label="دسته بندی ها"><span className="dropdown-emoji"></span>نان و خواربار</a></li>
                    <li><a href="#categories" aria-label="دسته بندی ها"><span className="dropdown-emoji">لبنیات</span></a></li>
                    <li><a href="#categories" aria-label="دسته بندی ها"><span className="dropdown-emoji">تنقلات</span></a></li>
                    <li><a href="#categories" aria-label="دسته بندی ها"><span className="dropdown-emoji">صبحانه</span></a></li>
                    <li><a href="#categories" aria-label="دسته بندی ها"><span className="dropdown-emoji">میوه و سبزی</span></a></li>
                    <li><a href="#categories" aria-label="دسته بندی ها"><span className="dropdown-emoji"></span>خشکبار و دسر </a></li>
                    <li><a href="#special-offer-nuts" aria-label="دسته بندی ها"><span className="dropdown-emoji">غذای اماده</span></a></li>
                    <li><a href="#categories" aria-label="دسته بندی ها"><span className="dropdown-emoji"></span>پک به صرفه</a></li>
                    <li><a href="#categories" aria-label="دسته بندی ها"><span className="dropdown-emoji"></span></a></li>
                </ul>
            </li>
            <li><a href="#categories">تنقلات</a></li>
            <li><a href="#categories">لبنیات  </a></li>
            <li><a href="#categories">میوه</a></li>
            <li><a href="#categories">خوارباو </a></li>
            <li><a href="#categories">نوشیدنی</a></li>
            <li><a href="#categories">صبحانه</a></li>
            <li><a href="#special-offer-nuts">خشکبار</a></li>
            <li><a href="#pack">پک به صرفه</a></li>

        </ul>
    </nav>

    )
}
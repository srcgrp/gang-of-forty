export default function Navigation(){
      const categories = [
    ["نان و خواربار", "#categories"],
    ["لبنیات", "#dairy"],
    ["تنقلات", "#categories"],
    ["صبحانه", "#categories"],
    ["میوه و سبزی", "#categories"],
    ["خشکبار و دسر", "#categories"],
    ["غذای آماده", "#special-offer-nuts"],
    ["پک به صرفه", "#categories"],
  ];
    return (
    <nav className="navigation" id="navigation">
      <ul className="nav">
        <li id="allcategory">
          <a href="#categories">همه دسته ها</a>
          <ul className="dropdown" id="menu-categories">
            {categories.map(([name, link]) => (
              <li key={name}>
                <a href={link}>
                  <span className="dropdown-label">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </li>

            <li><a href="#categories">تنقلات</a></li>
            <li><a href="#dairy">لبنیات  </a></li>
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
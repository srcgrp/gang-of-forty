import type { CSSProperties } from 'react';

function categoryColor(color: string): CSSProperties & { '--cat-bg': string } {
  return { '--cat-bg': color };
}

export default function CategoryNav() {
  return (
    <section id="categories" aria-labelledby="categories-t">
      <div className="sec-head"><h2 id="categories-t">دسته‌بندی‌ها</h2></div>
      <ul className="cats">
        <li>
          <a className="cat" href="./?category=fruits" data-route="">
            <span className="cat__icon-wrap" aria-hidden="true" style={categoryColor("#fde3dc")}>🍎</span>
            میوه و سبزی
          </a>
        </li>
        <li>
          <a className="cat" href="./?category=dairy" data-route="">
            <span className="cat__icon-wrap" aria-hidden="true" style={categoryColor("#e2eefc")}>🥛</span>
            لبنیات
          </a>
        </li>
        <li>
          <a className="cat" href="./?category=bakery" data-route="">
            <span className="cat__icon-wrap" aria-hidden="true" style={categoryColor("#fff0cc")}>🥖</span>
            نان و شیرینی
          </a>
        </li>
        <li>
          <a className="cat" href="./?category=pantry" data-route="">
            <span className="cat__icon-wrap" aria-hidden="true" style={categoryColor("#e3f1e7")}>🍚</span>
            خواربار
          </a>
        </li>
        <li>
          <a className="cat" href="./?category=drinks" data-route="">
            <span className="cat__icon-wrap" aria-hidden="true" style={categoryColor("#e0f5ef")}>🧃</span>
            نوشیدنی
          </a>
        </li>
        <li>
          <a className="cat" href="./?category=protein" data-route="">
            <span className="cat__icon-wrap" aria-hidden="true" style={categoryColor("#fbe0e6")}>🍗</span>
            پروتئین
          </a>
        </li>
        <li>
          <a className="cat" href="./?category=snacks" data-route="">
            <span className="cat__icon-wrap" aria-hidden="true" style={categoryColor("#f1e6fb")}>🍪</span>
            تنقلات
          </a>
        </li>
      </ul>
    </section>
  );
}
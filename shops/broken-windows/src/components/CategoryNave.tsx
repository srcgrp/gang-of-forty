import type { Category } from "../types"; // import only the type
import { Link } from "@tanstack/react-router";
type Props = { // the props this component receives
  categories: Category[]; // list of categories to draw
};

export default function CategoryNav({ categories }: Props) {
  return (
    <section className="categories" id="categories">
      <h2 className="items-header">دسته بندی ها</h2>
      <div className="all-items" id="categories-grid">
               { /* key must be unique among siblings, so React can track each tile*/ }

           {categories.map((c) => (
          <div className="items" key={c.id}>
         { /*A button, because this only does an action and does not navigate*/ }
        <Link to="/plp/$carouselId" params={{ carouselId: c.slug }} className="items-link">
  <span aria-hidden="true" className="items-icon">{c.emoji}</span>
  <p className="items-title">{c.name}</p>
</Link>
          </div>
        ))}
      </div>
    </section>
);
}
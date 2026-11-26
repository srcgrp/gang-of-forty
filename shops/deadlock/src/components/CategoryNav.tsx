import { Link } from "@tanstack/react-router";
import { CAROUSELS } from "../catalog/carousels";

const CATEGORIES = CAROUSELS.filter((item) => item.id !== "offers");

export default function CategoryNav() {
  return (
    <section className="category" id="categories">
      <h2 className="titels">دسته‌بندی‌ها</h2>
      <div className="carousel">
        {CATEGORIES.map((category) => (
          <Link
            key={category.id}
            to="/plp/$carouselId"
            params={{ carouselId: category.id }}
            search={{ sort: "default" }}
            className="Categories"
          >
            <span className="category-emoji" aria-hidden="true">{category.emoji}</span>
            <h3>{category.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

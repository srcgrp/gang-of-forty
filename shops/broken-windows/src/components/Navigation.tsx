
import type { Category } from "../types.ts";
import { Link } from "@tanstack/react-router";

type Props = {
  categories: Category[];}
export default function Navigation({ categories }: Props) {

    return (
    <nav className="navigation" id="navigation">
      <ul className="nav">
        <li id="allcategory">
          <a href="#categories">همه دسته ها</a>
        <ul className="dropdown" id="menu-categories">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  to="/plp/$carouselId"
                  params={{ carouselId: c.slug }}
                  search={{ sort: "default" }}
                >
                  <span className="dropdown-label">{c.name}</span>
    </Link>
  </li>
))}
 
</ul>
</li>
 {categories.map((c) => (
          <li key={c.id}>
            <Link
              to="/plp/$carouselId"
              params={{ carouselId: c.slug }}
              search={{ sort: "default" }}
            >
              {c.name}
              </Link>
        </li>
 ))}
        </ul>
    </nav>

    );
}
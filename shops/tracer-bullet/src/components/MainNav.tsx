import type { Category, Link } from "../types.ts";

type MainNavProps = {
  menu: Link[];
  categories: Category[];
};

export default function MainNav({ menu, categories }: MainNavProps) {
  return (
    <nav className="main-nav" aria-label="منوی اصلی">
      <ul>
        <li className="dropdown">
          <button type="button">همه دسته‌ها</button>
          <ul className="dropdown-menu">
            {categories.map((c) => (
              <li key={c.id}>
                <a href={`#${c.slug}`}>{c.name}</a>
              </li>
            ))}
          </ul>
        </li>
        {menu.map((m) => (
          <li key={m.href}>
            <a href={m.href}>{m.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
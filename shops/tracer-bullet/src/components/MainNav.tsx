import type { Category, Link } from "../types.ts";
import AppLink from "./AppLink.tsx";

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
                <AppLink href={`#${c.slug}`}>{c.name}</AppLink>
              </li>
            ))}
          </ul>
        </li>
        {menu.map((m) => (
          <li key={m.href}>
            <AppLink href={m.href}>{m.label}</AppLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

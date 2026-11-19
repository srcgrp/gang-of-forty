import { Link } from "@tanstack/react-router";
import type { Category } from "../types";

interface MegaMenuProps {
  categories: Category[];
}

export function MegaMenu({ categories }: MegaMenuProps) {
  return (
    <div className="mega">
      <button type="button" className="mega__trigger" aria-haspopup="true">
        <span className="mega__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" focusable="false">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <span>همه دسته‌ها</span>
      </button>
      <div className="mega__menu" role="menu" aria-label="دسته‌بندی‌ها">
        <ul className="mega__list">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                to="/plp/$carouselId"
                params={{ carouselId: cat.slug || String(cat.id) }}
                search={{ sort: "default" }}
                role="menuitem"
              >
                <span aria-hidden="true">{cat.emoji || "📦"}</span>
                {" " + cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

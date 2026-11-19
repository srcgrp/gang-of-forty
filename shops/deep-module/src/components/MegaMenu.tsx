import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Category } from "../types";

interface MegaMenuProps {
  categories: Category[];
}

export function MegaMenu({ categories }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 🔑 بستن با کلیک بیرون یا Esc
  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  // ... (بالای فایل و import ها)

  return (
    <div ref={ref} className={`mega ${open ? "mega--open" : ""}`}>
      <button
        type="button"
        className="mega__trigger"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="mega__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" focusable="false">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span>همه دسته‌ها</span>
      </button>

      {open && (
        <div
          id="mega-menu-panel"
          className="mega__menu"
          role="menu"
          aria-label="دسته‌بندی‌ها"
        >
          <ul className="mega__list">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to="/plp/$carouselId"
                  params={{ carouselId: cat.slug || String(cat.id) }}
                  search={{ sort: "default" }}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden="true">{cat.emoji || "📦"}</span> {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

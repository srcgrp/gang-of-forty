import type { Category, Link } from "../types.ts";
import foldersIcon from "../../png/folders-fill.png";
import handPointingIcon from "../../png/hand-pointing-fill.png";

type FooterListsProps = {
  categories: Category[];
  help: Link[];
};

export default function FooterLists({ categories, help }: FooterListsProps) {
  return (
    <nav className="footer-nav" aria-label="پیوندهای پایین صفحه">
      <div>
        <h2>
          <img className="icon-inline" src={foldersIcon} alt="" width="20" height="20" />
          دسته‌ها
        </h2>
        <ul className="footer-categories">
          {categories.map((c) => (
            <li key={c.id}>
              <a href={`#${c.slug}`}>{c.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>
          <img className="icon-inline" src={handPointingIcon} alt="" width="20" height="20" />
          راهنما
        </h2>
        <ul className="footer-help">
          {help.map((h) => (
            <li key={h.href}>
              <a href={h.href}>{h.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
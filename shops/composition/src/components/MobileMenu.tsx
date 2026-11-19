import type { MenuLink } from "../shared/types";
import SiteLink from "./SiteLink";
import menuIcon from "../../icons/menu-2.svg";

export default function MobileMenu({ menu }: { menu: MenuLink[] }) {
  return <details className="mobile-menu">
    <summary aria-label="باز و بسته کردن منوی اصلی">
      <img src={menuIcon} alt="" width="48" height="48" />
    </summary>
    <nav id="mobile-links" aria-label="منوی موبایل">
      {menu.map(link => <SiteLink key={link.href} href={link.href}>{link.label}</SiteLink>)}
    </nav>
  </details>;
}

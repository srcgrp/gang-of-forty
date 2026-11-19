import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

interface HeaderLogoProps {
  name?: string | undefined;
  slogan?: string | undefined;
}

export function HeaderLogo({ name, slogan }: HeaderLogoProps) {
  return (
    <Link to="/" className="header-logo" aria-label="صفحه اصلی سبزکاله">
      <span className="brand__icon" aria-hidden="true"><Logo size={40} /></span>
      <span className="brand__name">
        <strong>{name || "سبزکاله"}</strong>
        <small>{slogan || "تازه، روز، به‌روز"}</small>
      </span>
    </Link>
  );
}

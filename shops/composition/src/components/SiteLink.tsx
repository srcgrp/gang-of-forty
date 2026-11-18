import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";

type Props = {
  href: string; children: ReactNode; className?: string;
  style?: CSSProperties; onClick?: () => void;
};
export default function SiteLink({ href, children, ...props }: Props) {
  if (!href.startsWith("#")) return <a href={href} {...props}>{children}</a>;
  const id = href.slice(1);
  if (!id || id === "top" || id === "contact") {
    return <Link to="/" hash={id} {...props}>{children}</Link>;
  }
  return <Link to="/plp/$carouselId" params={{ carouselId: id }} {...props}>{children}</Link>;
}

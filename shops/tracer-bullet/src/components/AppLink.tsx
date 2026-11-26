import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

type AppLinkProps = { href: string; children: ReactNode };

export default function AppLink({ href, children }: AppLinkProps) {
  if (href.startsWith("#") && href.length > 1 && href !== "#contact") {
    return (
      <Link to="/plp/$carouselId" params={{ carouselId: href.slice(1) }} search={{ sort: "default" }}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        if (href === "#contact") {
          document.getElementById("contact")?.scrollIntoView();
        }
      }}
    >
      {children}
    </a>
  );
}
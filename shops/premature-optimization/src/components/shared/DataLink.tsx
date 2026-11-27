import type { ReactNode } from "react";
import AnchorLink from "./AnchorLink.tsx";
import PlpLink from "./PlpLink.tsx";

const PAGE_SECTIONS = new Set(["contact", "top"]);

type DataLinkProps = { href: string; className?: string; children: ReactNode };

export default function DataLink({ href, className, children }: DataLinkProps) {
  if (!href.startsWith("#")) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  const target = href.slice(1);
  if (PAGE_SECTIONS.has(target)) {
    return (
      <AnchorLink targetId={target} className={className}>
        {children}
      </AnchorLink>
    );
  }
  return (
    <PlpLink carouselId={target} className={className}>
      {children}
    </PlpLink>
  );
}

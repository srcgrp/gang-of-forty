import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

type PlpLinkProps = {
  carouselId: string;
  className?: string;
  children: ReactNode;
};

export default function PlpLink({
  carouselId,
  className,
  children,
}: PlpLinkProps) {
  return (
    <Link to="/plp/$carouselId" params={{ carouselId }} className={className}>
      {children}
    </Link>
  );
}

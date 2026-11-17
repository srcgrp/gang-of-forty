import type { MouseEvent, ReactNode } from "react";

type AnchorLinkProps = {
  targetId: string;
  className?: string;
  children: ReactNode;
};

export default function AnchorLink({
  targetId,
  className,
  children,
}: AnchorLinkProps) {
  function scrollToTarget(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const target = document.getElementById(targetId);
    target?.scrollIntoView();
    target?.focus({ preventScroll: true });
  }

  return (
    <a className={className} href={`#${targetId}`} onClick={scrollToTarget}>
      {children}
    </a>
  );
}

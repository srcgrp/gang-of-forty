import { Link } from "@tanstack/react-router";
import type { ComponentPropsWithoutRef } from "react";

export default function StoreLink({ href, ...props }: ComponentPropsWithoutRef<"a">) {
  if (!href?.startsWith("#")) return <a {...props} href={href} />;

  return (
    <Link {...props} to="/" hash={href.slice(1)} activeOptions={{ exact: true, includeHash: true }} activeProps={{}} />
  );
}

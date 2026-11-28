import { useLinkProps } from "@tanstack/react-router"
import type { ComponentProps } from "react"

type SectionLinkProps = ComponentProps<"a"> & { href: string }

function HomeSectionLink({ href, ...props }: SectionLinkProps) {
    const linkProps = useLinkProps({ ...props, to: "/", hash: href.slice(1) })
    return <a {...linkProps} aria-current={props["aria-current"]} />
}

export default function SectionLink(props: SectionLinkProps) {
    return props.href.startsWith("#") ? <HomeSectionLink {...props} /> : <a {...props} />
}
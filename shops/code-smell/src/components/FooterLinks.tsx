import type { Link } from "../types"

type FooterLinksProps = {
    title: string
    headingId: string
    entries: (Link & { categoryId?: number })[]
    onPick?: (id: number) => void
}

export default function FooterLinks({
    title,
    headingId,
    entries,
    onPick
}: FooterLinksProps) {
    return (
        <nav className="footer-column" aria-labelledby={headingId}>
            <h2 className="footer-column__title" id={headingId}>
                {title}
            </h2>
            <ul className="footer-links">
                {entries.map(function (entry) {
                    return (
                        <li key={entry.categoryId ?? entry.href}>
                            <a
                                className="footer-link"
                                href={entry.href}
                                onClick={function () {
                                    if (entry.categoryId !== undefined && onPick) {
                                        onPick(entry.categoryId)
                                    }
                                }}
                            >
                                <img
                                    className="footer-link__icon"
                                    src="svg/caret-left.svg"
                                    alt=""
                                    width={13}
                                    height={13}
                                    aria-hidden="true"
                                />
                                {entry.label}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
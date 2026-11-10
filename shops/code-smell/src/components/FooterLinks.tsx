import type { Link } from "../types"

type FooterLinksProps = {
    title: string
    headingId: string
    entries: Link[]
}

export default function FooterLinks({
    title,
    headingId,
    entries
}: FooterLinksProps) {
    return (
        <nav className="footer-column" aria-labelledby={headingId}>
            <h2 className="footer-column__title" id={headingId}>
                {title}
            </h2>
            <ul className="footer-links">
                {entries.map(function (entry) {
                    return (
                        <li key={entry.href}>
                            <a className="footer-link" href={entry.href}>
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
type BrandLogoProps = {
    className?: string
}

export default function BrandLogo({
    className = "brand__logo"
}: BrandLogoProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 320 160"
            aria-hidden="true"
        >
            <g
                fill="none"
                stroke="#ffb000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={14}
            >
                <polyline points="75,35 30,80 75,125" />
                <polyline points="125,35 112,60 125,85 112,110 125,130" />
                <polyline points="160,25 173,52 160,80 173,108 160,135" />
                <polyline points="195,35 208,60 195,85 208,110 195,130" />
                <polyline points="245,35 290,80 245,125" />
            </g>
        </svg>
    )
}
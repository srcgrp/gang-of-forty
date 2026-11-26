import type { ReactNode } from 'react'

export default function SpaceMarketLogo(): ReactNode {
  return (
    <svg
      className="space-market-mark"
      viewBox="35 10 100 78"
      aria-hidden="true"
    >
      <ellipse
        cx="86"
        cy="49"
        rx="43"
        ry="13"
        fill="none"
        stroke="var(--logo-ring)"
        strokeWidth="7"
        transform="rotate(-24 86 49)"
      />
      <circle cx="78" cy="49" r="27" fill="var(--logo-planet)" />
      <path
        d="M60 35 C67 27, 77 24, 87 26 C79 29, 71 34, 66 42 C63 46, 61 50, 60 55 C57 48, 57 41, 60 35Z"
        fill="var(--logo-highlight)"
        opacity=".9"
      />
      <path
        d="M48 60 C59 66, 76 67, 93 61 C102 58, 109 54, 113 49"
        fill="none"
        stroke="var(--logo-ring)"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  )
}

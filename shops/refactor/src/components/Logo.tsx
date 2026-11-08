const HEAD = { fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 32, fill: '#ffffff' }
const BODY = { fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 11.5, fill: '#ffffff' }

export default function Logo() {
  return (
    <svg className="logo" width={214} height={56} viewBox="0 0 214 56" aria-hidden="true">
      <g transform="translate(158 0)">
        <rect width="56" height="56" rx="16" fill="#0b7a54" />
        <path d="M16 25h24l-2.6 14a3.2 3.2 0 0 1-3.1 2.6H21.7a3.2 3.2 0 0 1-3.1-2.6z" fill="#fff" />
        <path d="M22 25l4-8M34 25l-4-8" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <g stroke="#ff7a1a" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M9.5 31a19 19 0 0 1 30.5-14.2" />
          <path d="M41.5 11.5l-.4 7.2-7.1-1.6" />
          <path d="M46.5 25a19 19 0 0 1-30.5 14.2" />
          <path d="M14.5 44.5l.4-7.2 7.1 1.6" />
        </g>
      </g>
      <text x="146" y="30" textAnchor="start" direction="rtl" style={HEAD}>ریفکتور</text>
      <text x="146" y="48" textAnchor="start" direction="rtl" style={BODY}>سوپرمارکت آنلاین</text>
    </svg>
  )
}

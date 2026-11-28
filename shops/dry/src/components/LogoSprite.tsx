export default function LogoSprite() {
  return (
    <svg className="svg-sprite" width="0" height="0" aria-hidden="true">
      <g id="logo-shapes" direction="ltr">
        <path d="M8 28h44l-6 26H14z" fill="currentColor" />
        <path
          d="M18 28c0-16 24-16 24 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="44" cy="14" r="7" fill="#C8A96A" />
        <text
          x="68" y="38" direction="ltr"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="32" fontWeight="800" letterSpacing="4"
          fill="currentColor"
        >
          MARTO
        </text>
        <text
          x="70" y="56" direction="ltr"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="12" letterSpacing="2"
          fill="currentColor"
        >
          Daily Market
        </text>
      </g>
    </svg>
  )
}
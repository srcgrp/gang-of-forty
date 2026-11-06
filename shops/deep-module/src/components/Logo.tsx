export function Logo({ size = 46 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        {/* گرادیان اصلی — سبز لیمویی به سبز تازه */}
        <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e9ff5c" />
          <stop offset="55%" stopColor="#d7ff00" />
          <stop offset="100%" stopColor="#8bdc65" />
        </linearGradient>
        {/* گرادیان برگ داخلی — از تیره به سبز */}
        <linearGradient id="logo-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a2410" />
          <stop offset="100%" stopColor="#2d3a10" />
        </linearGradient>
        {/* درخشش */}
        <radialGradient id="logo-shine" cx="0.3" cy="0.2" r="0.5">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* دایره پس‌زمینه با گرادیان */}
      <circle cx="32" cy="32" r="31" fill="url(#logo-bg)" />

      {/* درخشش بالای دایره */}
      <circle cx="32" cy="32" r="31" fill="url(#logo-shine)" />

      {/* برگ بزرگ */}
      <path
        d="M32 10 C 16 18, 12 36, 22 50 C 32 58, 48 52, 50 38 C 52 24, 44 14, 32 10 Z"
        fill="url(#logo-leaf)"
      />

      {/* رگبرگ اصلی */}
      <path
        d="M32 14 L 32 48"
        stroke="#d7ff00"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* رگبرگ‌های فرعی سمت چپ */}
      <path
        d="M32 22 L 22 26 M32 30 L 20 34 M32 38 L 23 42 M32 44 L 25 46"
        stroke="#d7ff00"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* رگبرگ‌های فرعی سمت راست */}
      <path
        d="M32 26 L 42 30 M32 34 L 44 38 M32 42 L 40 44"
        stroke="#d7ff00"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* جوانه کوچک بالای برگ */}
      <circle cx="42" cy="16" r="2.8" fill="#fff" opacity="0.95" />
      <circle cx="42" cy="16" r="1.2" fill="#d7ff00" />

      {/* نقطه‌های تزئینی */}
      <circle cx="18" cy="20" r="1.3" fill="#d7ff00" opacity="0.9" />
      <circle cx="46" cy="46" r="1.3" fill="#d7ff00" opacity="0.9" />
    </svg>
  );
}

export default function Brand() {
  return (
    <a
      className="brand"
      href="#top"
      aria-label="تازه‌خانه، بازگشت به بالای صفحه"
    >
      <svg
        className="brand-logo"
        viewBox="0 0 64 64"
        role="img"
        aria-labelledby="logo-title"
      >
        <title id="logo-title">لوگوی تازه‌خانه</title>
        <circle className="logo-bg-circle" cx="32" cy="32" r="30" />
        <path
          className="logo-arch"
          d="M 12 50 V 30 Q 12 20 22 20 Q 24 12 32 8 Q 40 12 42 20 Q 52 20 52 30 V 50"
        />
        <path
          className="logo-house"
          d="M 22 34 L 32 25 L 43 34 V 48 H 22 Z"
        />
        <rect
          className="logo-door"
          x="29"
          y="38"
          width="6"
          height="12"
          rx="1"
        />
        <ellipse
          className="logo-leaf-bottom"
          cx="35"
          cy="22"
          rx="4"
          ry="2.5"
          transform="rotate(-35 39 19)"
        />
        <ellipse
          className="logo-leaf-top"
          cx="38"
          cy="13"
          rx="4"
          ry="2.5"
          transform="rotate(-100 39 19)"
        />
      </svg>

      <span className="brand-name">تازه خانه</span>
    </a>
  );
}
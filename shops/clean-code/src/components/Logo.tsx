export default function Logo() {
  return (
    <svg
      className="logo"
      viewBox="0 0 64 64"
      role="img"
      aria-labelledby="logo-title"
    >
      <title id="logo-title">سوپرمارکت تمیز</title>
      <rect width="64" height="64" rx="14" fill="#de7272"></rect>
      <circle
        cx="32"
        cy="22"
        r="8"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
      ></circle>
      <rect x="20" y="22" width="24" height="10" fill="#de7272"></rect>
      <polygon points="15,30 49,30 44,52 20,52" fill="#ffffff"></polygon>
    </svg>
  );
}

export default function Logo() {
  return (
    <svg
      id="logo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 160"
      width="160"
      height="160"
      role="img"
      aria-label="rate-limit logo"
    >
      <rect width="160" height="160" rx="32" fill="#1E2749" />

      <circle cx="30" cy="32" r="2" fill="#E4D9FF" />
      <circle cx="126" cy="28" r="1.5" fill="#FAFAFF" />
      <circle cx="26" cy="124" r="1.5" fill="#FAFAFF" />
      <circle cx="132" cy="130" r="2" fill="#E4D9FF" />

      <g transform="translate(80 80) rotate(-20)">
        <path d="M -56 0 A 56 16 0 0 1 56 0" fill="none" stroke="#FAFAFF" strokeWidth="4" strokeLinecap="round" />
        <circle r="30" fill="#E4D9FF" />
        <path d="M -56 0 A 56 16 0 0 0 56 0" fill="none" stroke="#1E2749" strokeWidth="10" strokeLinecap="round" />
        <path d="M -56 0 A 56 16 0 0 0 56 0" fill="none" stroke="#FAFAFF" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}
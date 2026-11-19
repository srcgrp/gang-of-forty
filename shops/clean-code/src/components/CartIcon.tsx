export default function CartIcon() {
  return (
    <svg className="cart-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        d="M6 7h15l-1.5 9h-12z"
      ></path>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M6 7 5 4H2"
      ></path>
      <circle cx="9" cy="20" r="1.4" fill="currentColor"></circle>
      <circle cx="17" cy="20" r="1.4" fill="currentColor"></circle>
    </svg>
  );
}

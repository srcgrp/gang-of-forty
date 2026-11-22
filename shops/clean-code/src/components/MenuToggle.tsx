export default function MenuToggle() {
  return (
    <>
      <input className="nav-toggle" id="nav-toggle" type="checkbox" />
      <label className="menu-btn" htmlFor="nav-toggle">
        <span className="sr-only">منو</span>
        <svg className="icon-open" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 7h16M4 12h16M4 17h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>
        </svg>
        <svg className="icon-close" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 6 18 18M18 6 6 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>
        </svg>
      </label>
    </>
  );
}

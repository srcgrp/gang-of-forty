export default function SearchBox() {
  return (
    <form className="search" role="search" action="#" onSubmit={(e) => e.preventDefault()}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <label className="sr-only" htmlFor="search">جستجو در محصولات</label>
      <input id="search" type="search" placeholder="جستجوی محصول…" />
      <button className="sr-only" type="submit">جستجو</button>
    </form>
  )
}

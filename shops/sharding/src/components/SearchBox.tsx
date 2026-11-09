export default function SearchBox() {
  return (
    <form className="search" role="search" autoComplete="off">
      <label htmlFor="search-input" className="visually-hidden">جستجو در محصولات</label>
      <span className="search__icon" aria-hidden="true">
        <svg>
          <use href="./icons.svg#search" />
        </svg>
      </span>
      <input
        id="search-input"
        className="search__input"
        type="search"
        placeholder="جستجو در محصولات…"
      />
      <button type="submit" className="visually-hidden">جستجو</button>
    </form>
  )
}
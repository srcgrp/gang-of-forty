export default function HeaderSearch() {
  return (
    <form
      className="search"
      role="search"
      onSubmit={(event) => event.preventDefault()}
    >
      <label htmlFor="site-search">جستجو در تازه‌خانه</label>

      <div className="search-box">
        <input id="site-search" type="search" placeholder="جستجوی محصولات..." />
      </div>
    </form>
  );
}

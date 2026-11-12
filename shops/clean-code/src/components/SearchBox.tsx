export default function SearchBox() {
  return (
    <form className="search" action="#content" method="get" role="search">
      <label className="sr-only" htmlFor="q">
        جستجوی کالا
      </label>
      <input id="q" type="search" name="q" placeholder="جستجوی کالا" />
      <button type="submit">جستجو</button>
    </form>
  );
}

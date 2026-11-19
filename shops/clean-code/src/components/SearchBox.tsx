type SearchBoxProps = {
  query: string;
  onQuery: (value: string) => void;
};

export default function SearchBox({ query, onQuery }: SearchBoxProps) {
  return (
    <form
      className="search"
      action="#content"
      method="get"
      role="search"
      onSubmit={function (e) {
        e.preventDefault();
      }}
    >
      <label className="sr-only" htmlFor="q">
        جستجوی کالا
      </label>
      <input
        id="q"
        type="search"
        name="q"
        value={query}
        onChange={function (e) {
          onQuery(e.target.value);
        }}
        placeholder="جستجو..."
      />
      <button type="submit">جستجو</button>
    </form>
  );
}

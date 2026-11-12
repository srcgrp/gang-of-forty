type SearchBoxProps = {
  value: string;
  onQuery: (query: string) => void;
};

export default function SearchBox({ value, onQuery }: SearchBoxProps) {
  return (
    <div className="search" role="search">
      <label className="search-bar">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          type="text"
          inputMode="search"
          aria-label="جستجوی محصول"
          value={value}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="جستجو..."
        />
      </label>
    </div>
  );
}

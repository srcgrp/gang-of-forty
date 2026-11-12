type SearchBoxProps = {
    query: string
    onChange: (value: string) => void
}

export default function SearchBox({ query, onChange }: SearchBoxProps) {
    return (
        <form className="search" role="search" onSubmit={event => event.preventDefault()}>
            <label htmlFor="site-search">جست‌وجوی محصولات</label>
            <input
                id="site-search"
                name="q"
                type="search"
                value={query}
                placeholder="دنبال چه محصولی هستید؟"
                onChange={event => onChange(event.target.value)}
            />
            <button type="submit">جست‌وجو</button>
        </form>
    )
}

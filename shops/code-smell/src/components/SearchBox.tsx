import type { ChangeEvent } from "react"

export type SearchBoxProps = {
    query: string
    onQuery: (value: string) => void
}

export default function SearchBox({ query, onQuery }: SearchBoxProps) {
    return (
        <div className="search" id="search-root" role="search">
            <label className="sr-only" htmlFor="product-search">
                جستجوی کالا
            </label>
            <img
                className="search__icon"
                src="svg/magnifying-glass.svg"
                alt=""
                width={18}
                height={18}
                aria-hidden="true"
            />
            <input
                className="search__input"
                id="product-search"
                type="search"
                placeholder="جستجوی کالا..."
                value={query}
                onChange={function (event: ChangeEvent<HTMLInputElement>) {
                    onQuery(event.currentTarget.value)
                }}
            />
        </div>
    )
}
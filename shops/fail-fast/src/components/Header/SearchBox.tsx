import type { ReactNode } from 'react'

export default function SearchBox(): ReactNode {
  return (
    <div className="search-box" role="search">
      <label htmlFor="search" className="visually-hidden">
        جستجو در اسپیس مارکت
      </label>
      <input
        id="search"
        type="search"
        placeholder="جستجو در اسپیس مارکت..."
      />
      <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.8" cy="10.8" r="6.3" />
        <path d="m15.5 15.5 4.2 4.2" />
      </svg>
    </div>
  )
}

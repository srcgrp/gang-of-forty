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
      <span className="search-icon" id="search-icon" aria-hidden="true"></span>
    </div>
  )
}

import { useLocation, useNavigate } from '@tanstack/react-router'
import { useSearchStore } from '../hooks/useSearchStore'
import SearchBox from './SearchBox'

export default function HeaderSearch() {
  const query = useSearchStore((state) => state.query)
  const setQuery = useSearchStore((state) => state.setQuery)
  const pathname = useLocation({ select: (location) => location.pathname })
  const navigate = useNavigate()
  function change(value: string) {
    setQuery(value)
    if (pathname !== '/') void navigate({ to: '/' })
  }
  return <form className="search-box" role="search" onSubmit={(event) => {
    event.preventDefault()
    void navigate({ to: '/' })
  }}>
    <label htmlFor="search">جستجوی محصولات</label>
    <SearchBox value={query} onChange={change} />
    <button type="submit">جستجو</button>
  </form>
}

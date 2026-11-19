type SearchBoxProps = {
  value: string
  onChange: (value: string) => void
}

export default function SearchBox({
  value,
  onChange,
}: SearchBoxProps) {
  return (
    <input
      id="search"
      type="search"
      placeholder="جست‌وجوی محصول..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
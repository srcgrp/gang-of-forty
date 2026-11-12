type PriceProps = {
  value: number
}

export default function Price({ value }: PriceProps) {
  return (
    <span>
      {value.toLocaleString('fa-IR')} تومان
    </span>
  )
}

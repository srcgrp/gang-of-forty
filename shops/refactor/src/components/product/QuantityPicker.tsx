import { formatNumber } from '../format'

type QuantityPickerProps = {
  value: number
  onChange: (value: number) => void
  max: number
  disabled?: boolean
}

export default function QuantityPicker({
  value,
  onChange,
  max,
  disabled = false,
}: QuantityPickerProps) {
  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1)
    }
  }

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  return (
    <div className="pd-qty">
      <button
        type="button"
        className="pd-qty__btn"
        onClick={handleDecrement}
        disabled={disabled || value <= 1}
        aria-label="کاهش تعداد"
      >
        −
      </button>
      <span className="pd-qty__value" aria-live="polite">
        {formatNumber(value)}
      </span>
      <button
        type="button"
        className="pd-qty__btn"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="افزایش تعداد"
      >
        +
      </button>
    </div>
  )
}

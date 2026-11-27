import type { RefObject } from "react";

type Props = {
  id: string;
  label: string;
  value: string;
  error: string | undefined;
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
};

export default function FormField({
  id, label, value, error, inputRef, onChange, type = "text", autoComplete,
}: Props) {
  const errorId = `${id}-error`;
  const invalid = error !== undefined;
  return (
    <div className="checkout-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        ref={inputRef}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {invalid && <p id={errorId} className="checkout-error" role="alert">{error}</p>}
    </div>
  );
}
import type { Ref } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  error: string | undefined;
  inputRef: Ref<HTMLInputElement>;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
};

export default function FormField({
  id,
  label,
  value,
  error,
  inputRef,
  onChange,
  type = "text",
  autoComplete,
}: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        ref={inputRef}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error !== undefined}
        aria-describedby={error !== undefined ? errorId : undefined}
      />
      {error !== undefined && <p id={errorId}>{error}</p>}
    </div>
  );
}
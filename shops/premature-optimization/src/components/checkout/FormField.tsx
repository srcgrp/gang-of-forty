import type { ChangeEvent } from "react";

export type FieldElement = HTMLInputElement | HTMLTextAreaElement;

export type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  autoComplete: string;
  multiline?: boolean;
  type?: "text" | "tel";
  inputRef: (element: FieldElement | null) => void;
  onChange: (value: string) => void;
};

const TEXTAREA_ROWS = 3;

export default function FormField({
  id,
  label,
  value,
  error,
  autoComplete,
  multiline = false,
  type = "text",
  inputRef,
  onChange,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const hasError = error !== undefined;

  const controlProps = {
    id,
    ref: inputRef,
    className: "checkout-input",
    value,
    autoComplete,
    "aria-invalid": hasError,
    "aria-describedby": hasError ? errorId : undefined,
    onChange: (event: ChangeEvent<FieldElement>) =>
      onChange(event.target.value),
  };

  return (
    <div className="checkout-field">
      <label htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea {...controlProps} rows={TEXTAREA_ROWS} />
      ) : (
        <input {...controlProps} type={type} />
      )}
      {hasError && (
        <p className="checkout-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}

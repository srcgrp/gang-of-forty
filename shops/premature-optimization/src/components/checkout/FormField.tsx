type FieldElement = HTMLInputElement | HTMLTextAreaElement;

type FormFieldProps = {
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

  return (
    <div className="checkout-field">
      <label htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea
          id={id}
          ref={inputRef}
          className="checkout-input"
          rows={3}
          value={value}
          autoComplete={autoComplete}
          aria-invalid={error !== undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          id={id}
          ref={inputRef}
          className="checkout-input"
          type={type}
          value={value}
          autoComplete={autoComplete}
          aria-invalid={error !== undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {error && (
        <p className="checkout-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}

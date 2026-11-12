interface CatalogErrorProps {
  message: string;
  onRetry: () => void;
}

export default function CatalogError({ message, onRetry }: CatalogErrorProps) {
  return (
    <div className="product-error" role="alert">
      <span className="product-error__icon" aria-hidden="true">!</span>
      <p className="product-error__message">{message}</p>
      <button className="product-error__retry" type="button" onClick={onRetry}>
        تلاش مجدد
      </button>
    </div>
  );
}

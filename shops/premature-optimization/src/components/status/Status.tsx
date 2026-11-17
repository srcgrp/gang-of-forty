type StatusProps = { message: string; isError?: boolean; onRetry?: () => void };

export default function Status({
  message,
  isError = false,
  onRetry,
}: StatusProps) {
  return (
    <div
      className={isError ? "api-status api-status--error" : "api-status"}
      role={isError ? "alert" : "status"}
    >
      <p>{message}</p>
      {onRetry && (
        <button className="api-retry-button" type="button" onClick={onRetry}>
          تلاش دوباره
        </button>
      )}
    </div>
  );
}

import type { ReactNode } from "react";

type StatusProps = {
  message: string;
  isError?: boolean;
  onRetry?: () => void;
  children?: ReactNode;
};

export default function Status({
  message,
  isError = false,
  onRetry,
  children,
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
      {children}
    </div>
  );
}

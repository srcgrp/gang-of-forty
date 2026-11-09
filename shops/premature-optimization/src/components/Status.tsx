type StatusProps = { message: string; isError?: boolean };

export default function Status({ message, isError = false }: StatusProps) {
  return (
    <div
      className={isError ? "api-status api-status--error" : "api-status"}
      role={isError ? "alert" : "status"}
    >
      <p>{message}</p>
    </div>
  );
}

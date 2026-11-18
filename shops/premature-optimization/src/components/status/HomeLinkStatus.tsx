import { Link } from "@tanstack/react-router";
import Status from "./Status.tsx";

export default function HomeLinkStatus({ message }: { message: string }) {
  return (
    <Status message={message}>
      <Link className="api-retry-button" to="/">
        بازگشت به صفحه اصلی
      </Link>
    </Status>
  );
}

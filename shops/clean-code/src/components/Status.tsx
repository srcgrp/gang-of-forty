import type { LoadState } from "../types/load.ts";

type StatusProps = { state: LoadState };

export default function Status({ state }: StatusProps) {
  switch (state.status) {
    case "loading":
      return <p className="status">در حال بارگذاری...</p>;
    case "empty":
      return <p className="status">چیزی پیدا نشد.</p>;
    case "error":
      return <p className="status error">{state.message}</p>;
    case "success":
      return null;
    default: {
      const forgotten: never = state;
      throw new Error("forgotten state: " + forgotten);
    }
  }
}

import type { LoadState } from "../types.ts";

type StatusProps = {
  state: Exclude<LoadState, { status: "success" }>;
};

export default function Status({ state }: StatusProps) {
  switch (state.status) {
    case "loading":
      return <p role="status">درحال بارگذاری</p>;
    case "empty":
      return <p>محصولی بارگذاری نشده است</p>;
    case "error":
      return <p role="alert">{state.message}</p>;
  }
}
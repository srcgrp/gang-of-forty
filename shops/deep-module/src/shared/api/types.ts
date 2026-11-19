export type ApiErrorType =
  | "offline"
  | "timeout"
  | "network"
  | "http"
  | "parse"
  | "abort"
  | "unknown";

export type LoadState<T> =
  | { status: "loading" }
  | { status: "error"; message: string; kind: ApiErrorType }
  | { status: "success"; data: T };

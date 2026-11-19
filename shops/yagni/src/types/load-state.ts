export type LoadState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "empty"; data: T }
  | { status: "error"; message: string };

import type { LoadState, LoadedState } from "../types.ts"; // import only the types

type NotLoaded = Exclude<LoadState, LoadedState>; // every state except success: loading | empty | error

type Props = { state: NotLoaded }; // this component never receives data, only a status

export default function Status({ state }: Props) { // read the state from props
  switch (state.status) { // pick the message by the status field
    case "loading": // fetch started but not finished
      return <p className="status" role="status">در حال بارگذاری...</p>; // role="status": screen readers announce it politely
    case "empty": // files are fine but the product list is empty
      return <p className="status" role="status">متأسفیم، محصولات بارگذاری نشدند. لطفاً دوباره تلاش کنید.</p>; // message from DESIGN.md
    case "error": // network or a guard failed
      return <p className="status" role="alert">متأسفیم، محصولات بارگذاری نشدند.</p>; // role="alert": announced immediately
  }
}
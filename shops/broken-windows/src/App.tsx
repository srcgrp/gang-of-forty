
import type { LoadState } from "./types"; // all types used here
import { useState, useEffect } from "react";
import Status from "./components/Status"; 
import { loadShopData } from "./api/loadShop.ts";
import Storefront from "./components/StoreFront.tsx";
import { useThemeStore } from "./hooks/useThemeStore.ts";

export default function App() {
  const theme=useThemeStore((t)=>t.theme)
  const [state, setState] = useState<LoadState>({ status: "loading" }); // starts as loading, so the effect never has to set "loading" itself
   const [categoryId, setCategoryId] = useState<number | null>(null); // selected category, null = no filter
const [query, setQuery] = useState("");
const [attempt, setAttempt] = useState(0);
useEffect(() => { // runs once after the first render
  let ignore = false; // flag: becomes true when this run is cancelled
  loadShopData().then((result) => { // result is already a LoadState: success, empty or error
    if (ignore) return; // cancelled (StrictMode or unmount), throw this answer away
    setState(result); // store the answer; React re-renders
  });
  return () => { // cleanup: runs before the next run and on unmount
    ignore = true; // from now on the old run's answer is ignored
  };
}, [attempt]); // empty deps: only once

if (state.status !== "success")
  return (
  
    <div className="app" data-theme={theme}> 
    <Status
    state={state}
      onRetry={() => {
        setState({ status: "loading" });
        setAttempt((prev) => prev + 1);
      }}
      />
  </div>
    );


  

  function handlePick(id: number) {
    setCategoryId((prev) => (prev === id ? null : id));
  }
  return (
    <div className="app" data-theme={theme}> <Storefront
      data={state}
      categoryId={categoryId}
      query={query}
  onQuery={setQuery}
      onPick={handlePick}
    /></div>
   
  );
}
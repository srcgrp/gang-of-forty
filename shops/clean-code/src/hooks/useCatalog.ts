import { useEffect, useState } from "react";
import { loadShop } from "../api/load-shop.ts";
import type { LoadState } from "../types/load.ts";

const API = import.meta.env.VITE_API_URL ?? "";

export function useCatalog() {
  const [load, setLoad] = useState<LoadState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(
    function () {
      let ignore = false;
      loadShop(API)
        .then(function (shop) {
          if (ignore) return;
          if (shop.products.length === 0) {
            setLoad({ status: "empty" });
            return;
          }
          setLoad({ status: "success", ...shop });
        })
        .catch(function () {
          if (ignore) return;
          setLoad({
            status: "error",
            message: "بارگذاری نشد. لطفا صفحه را رفرش کنید.",
          });
        });
      return function () {
        ignore = true;
      };
    },
    [attempt],
  );

  function retry() {
    setLoad({ status: "loading" });
    setAttempt(function (n) {
      return n + 1;
    });
  }

  return { load, retry };
}

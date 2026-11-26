import { useEffect, useState } from "react";

export default function SaleCountdown() {
  const [left, setLeft] = useState(30);

  useEffect(
    function () {
      if (left <= 0) return;
      const id = window.setTimeout(function () {
        setLeft(function (s) {
          return s <= 1 ? 0 : s - 1;
        });
      }, 1000);
      return function () {
        window.clearTimeout(id);
      };
    },
    [left],
  );

  return (
    <p className="sale-countdown">
      پایان حراج تا {left.toLocaleString("fa-IR")} ثانیه
    </p>
  );
}

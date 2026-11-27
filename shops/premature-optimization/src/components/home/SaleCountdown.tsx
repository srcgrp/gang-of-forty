import { useEffect, useState } from "react";
import { toFaDigits } from "../../lib/toFa.ts";

const START = 60 * 60;

const two = (n: number) => toFaDigits(String(n).padStart(2, "0"));

export default function SaleCountdown() {
  const [left, setLeft] = useState(START);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("tick");
      setLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="sale-countdown-time" role="timer">
      {two(Math.floor(left / 3600))}:{two(Math.floor((left % 3600) / 60))}:
      {two(left % 60)}
    </p>
  );
}

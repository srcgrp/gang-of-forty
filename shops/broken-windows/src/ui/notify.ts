import confetti from "canvas-confetti";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf: Notyf = new Notyf({
    duration: 2000,
    position: { x: "left", y: "bottom" },
});

export function celebrateAdd(productName: string): void {
    notyf.success(productName + " به سبد اضافه شد");
    confetti({ particleCount: 60, spread: 70 });
}
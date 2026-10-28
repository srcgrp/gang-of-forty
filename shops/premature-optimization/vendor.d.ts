declare module "notyf" {
  export class Notyf {
    constructor(options?: unknown);
    success(message: string): void;
    error(message: string): void;
  }
}

declare module "notyf/notyf.min.css";

declare module "countup.js" {
  export interface CountUpOptions {
    startVal?: number;
    duration?: number;
    decimalPlaces?: number;
    useEasing?: boolean;
    useGrouping?: boolean;
    easingFn?: (t: number, b: number, c: number, d: number) => number;
    formattingFn?: (value: number) => string;
  }

  export class CountUp {
    constructor(target: string | HTMLElement, endVal: number, options?: CountUpOptions);
    start(callback?: () => void): void;
    update(endVal: number): void;
  }
}

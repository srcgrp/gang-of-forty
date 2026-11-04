declare module "notyf" {
  export class Notyf {
    constructor(options?: unknown);
    success(message: string): void;
    error(message: string): void;
  }
}

declare module "notyf/notyf.min.css";


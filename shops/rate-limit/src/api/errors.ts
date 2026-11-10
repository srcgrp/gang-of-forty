export class HttpError extends Error {
  url: string;
  status: number;

  constructor(url: string, status: number) {
    super(`${url} responded ${status}`);
    this.name = "HttpError";
    this.url = url;
    this.status = status;
  }
}

export class DataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataError";
  }
}

export function describeError(err: unknown): string {
  if (err instanceof HttpError) {
    return err.status === 404 ? "فایل داده پیدا نشد." : "سرور پاسخ درستی نداد.";
  }
  if (err instanceof DataError) return "داده‌های دریافتی خراب یا نامعتبر است.";
  return "ارتباط با سرور برقرار نشد.";
}

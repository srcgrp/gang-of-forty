import { USER_MESSAGES } from "./api-config";

export class ApiError extends Error {
  readonly detail: string;

  constructor(userMessage: string, detail: string) {
    super(userMessage);
    this.name = "ApiError";
    this.detail = detail;
  }
}

export async function getJSON(path: string): Promise<unknown> {
  let response: Response;

  try {
    response = await fetch(path);
  } catch {
    throw new ApiError(
      USER_MESSAGES.offline,
      `درخواست «${path}» به سرور نرسید (خطای شبکه).`,
    );
  }

  if (!response.ok) {
    throw new ApiError(
      USER_MESSAGES.unavailable,
      `فایل «${path}» دریافت نشد (وضعیت ${response.status}).`,
    );
  }

  try {
    return await response.json();
  } catch {
    throw new ApiError(
      USER_MESSAGES.badData,
      `فایل «${path}» JSON معتبر نیست.`,
    );
  }
}

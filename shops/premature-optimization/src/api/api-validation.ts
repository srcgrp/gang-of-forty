import { USER_MESSAGES } from "./api-config";
import { ApiError, getJSON } from "./api-client";

export async function getValidObject<T>(
  path: string,
  guard: (x: unknown) => x is T,
): Promise<T> {
  const data: unknown = await getJSON(path);

  if (!guard(data)) {
    throw new ApiError(
      USER_MESSAGES.badData,
      `ساختار داده‌ی «${path}» معتبر نیست.`,
    );
  }

  return data;
}

export async function getValidList<T>(
  path: string,
  guard: (x: unknown) => x is T,
): Promise<T[]> {
  const data: unknown = await getJSON(path);

  if (!Array.isArray(data)) {
    throw new ApiError(
      USER_MESSAGES.badData,
      `ساختار داده‌ی «${path}» معتبر نیست؛ یک آرایه انتظار می‌رفت.`,
    );
  }

  const items: unknown[] = data;
  const valid = items.filter(guard);
  const dropped = items.length - valid.length;

  if (dropped > 0) {
    console.warn(
      `«${path}»: ${dropped} مورد نامعتبر از ${items.length} مورد حذف شد.`,
    );
  }

  return valid;
}

import * as Types from "./types";

const API_BASE: string = "/api/";

export async function fetchApiFile<T>(file: Types.ApiFile): Promise<T> {
  const response = await fetch(`${API_BASE}${file}`);

  if (!response.ok) {
    throw new Error(`API "${file}" با وضعیت ${response.status} دریافت نشد.`);
  }

  const data: unknown = await response.json();
  return data as T;
}

const apiUrl = import.meta.env.VITE_API_URL?.trim();

export async function getJSON(file: string): Promise<unknown> {
  if (!apiUrl) throw new Error("تنظیم VITE_API_URL برای دریافت اطلاعات فروشگاه مشخص نشده است.");
  const response: Response = await fetch(apiUrl + "/" + file);
  if (!response.ok) {
    throw new Error("دریافت اطلاعات ناموفق بود: " + response.status);
  }
  const data: unknown = await response.json();
  return data;
}


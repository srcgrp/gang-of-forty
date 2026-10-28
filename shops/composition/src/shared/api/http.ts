const apiUrl: string = import.meta.env.VITE_API_URL || "../../api";

export async function getJSON(file: string): Promise<unknown> {
  const response: Response = await fetch(apiUrl + "/" + file);
  if (!response.ok) {
    throw new Error("دریافت اطلاعات ناموفق بود: " + response.status);
  }
  const data: unknown = await response.json();
  return data;
}


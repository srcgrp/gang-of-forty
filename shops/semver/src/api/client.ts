export const getJSON = async (url: string): Promise<unknown> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`خطا در دریافت ${url}: ${response.status}`);
  }
  return response.json();
};

export const fetchChecked = async <T>(
  url: string,
  guard: (x: unknown) => x is T,
): Promise<T> => {
  const data = await getJSON(url);
  if (!guard(data)) {
    throw new Error(`داده‌ی ${url} درست نیست`);
  }
  return data;
};

export const fetchList = async <T>(
  url: string,
  guard: (x: unknown) => x is T,
): Promise<T[]> => {
  const data = await getJSON(url);
  if (!Array.isArray(data)) {
    throw new Error(`${url} باید یک لیست باشد`);
  }
  const good = data.filter(guard);
  const bad = data.length - good.length;
  if (bad > 0) {
    console.warn(`${bad} مورد خراب از ${url} حذف شد`);
  }
  return good;
};

const API_BASE: string = "../../api/";

export async function getJSON(path: string): Promise<unknown> {
    let res: Response;
    try {
        res = await fetch(API_BASE + path);
    } catch {
        throw new Error("اتصال برقرار نشد: " + path);
    }
    if (!res.ok) {
        throw new Error("خطای سرور (" + res.status + ") برای " + path);
    }
    let data: unknown;
    try {
        data = await res.json();
    } catch {
        throw new Error(path + " فایل JSON معتبری نیست");
    }
    return data;
}
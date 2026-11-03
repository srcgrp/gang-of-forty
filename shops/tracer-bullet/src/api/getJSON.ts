function getApiBaseUrl(): string {
    const rawBaseUrl: unknown = import.meta.env.VITE_API_URL;

    if (typeof rawBaseUrl !== "string" || rawBaseUrl.trim() === "") {
        throw new Error("VITE_API_URL must be a non-empty string");
    }

    return rawBaseUrl.replace(/\/+$/, "");
}

export async function getJSON(path: string): Promise<unknown> {
    const baseUrl = getApiBaseUrl();
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const res = await fetch(`${baseUrl}${normalizedPath}`);

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }

    const data: unknown = await res.json();
    return data;
}
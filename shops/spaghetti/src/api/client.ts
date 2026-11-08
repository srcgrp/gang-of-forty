// src/api/client.ts

export const API_BASE = '/api';

export async function getJSON(path: string): Promise<unknown> {
    const fullPath = path.startsWith('http') || path.startsWith('/')
        ? path
        : `${API_BASE}/${path}`;

    const res = await fetch(fullPath);
    if (!res.ok) {
        throw new Error(`خطای دریافت داده از سرور: وضعیت ${res.status}`);
    }
    return res.json();
}

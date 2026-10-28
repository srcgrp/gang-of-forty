const API_BASE = '/api';

export async function getJSON(path: string): Promise<unknown> {
    const response = await fetch(`${API_BASE}/${path}`);

    if (!response.ok) {
        throw new Error(
            `دریافت اطلاعات ناموفق بود (${response.status}). لطفاً دوباره تلاش کنید.`,
        );
    }

    try {
        const data: unknown = await response.json();
        return data;
    } catch {
        throw new Error(
            'ساختار اطلاعات دریافتی معتبر نیست. لطفاً بعداً دوباره تلاش کنید.',
        );
    }
}

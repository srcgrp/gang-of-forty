const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function getJSON(path: string): Promise<unknown> {
    const response = await fetch(`${API_BASE_URL}/${path}`);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
}
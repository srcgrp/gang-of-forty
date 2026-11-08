export const getJSON = async (path: string): Promise<unknown> => {
    const base: unknown = import.meta.env.VITE_API_URL;
    if (typeof base !== 'string' || base.trim() === '') throw new Error('API address is missing');
    const response: Response = await fetch(base.replace(/\/$/, '') + '/' + path);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data: unknown = await response.json();
    return data;
};

const raw: unknown = import.meta.env.VITE_API_URL;

if (typeof raw !== 'string' || raw === '') {
    throw new Error('VITE_API_URL is missing. Check .env.development / .env.production');
}

export const API_URL: string = raw.replace(/\/+$/, '');
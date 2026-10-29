export class FetchError extends Error {
    kind: 'http' | 'shape';

    constructor(kind: 'http' | 'shape', message: string) {
        super(message);
        this.kind = kind;
    }
}

export async function getJSON(path: string): Promise<unknown> {
    const res: Response = await fetch(path);

    if (!res.ok) {
        throw new FetchError('http', `HTTP ${res.status}`);
    }

    try {
        const data: unknown = await res.json();
        return data;
    } catch {
        throw new FetchError('shape', 'Response is not valid JSON');
    }
}
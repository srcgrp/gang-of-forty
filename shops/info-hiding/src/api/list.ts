import { getJSON } from './http';

export const loadList = async <T>(
    path: string, guard: (value: unknown) => value is T
): Promise<T[]> => {
    const data: unknown = await getJSON(path);
    if (!Array.isArray(data)) throw new Error('Expected a list: ' + path);
    const rows: unknown[] = data;
    const valid = rows.filter(guard);
    const rejected = rows.length - valid.length;
    if (rejected > 0) console.warn(path + ': ' + rejected + ' invalid items skipped');
    return valid;
};

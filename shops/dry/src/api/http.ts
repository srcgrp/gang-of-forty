const API: string = '../../api/'

export async function getJSON(file: string): Promise<unknown> {
    const res: Response = await fetch(API + file)
    if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`)
        return res.json()
}
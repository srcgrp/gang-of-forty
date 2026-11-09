const apiBase: string = import.meta.env.VITE_API_URL

export async function getJSON(fileName: string): Promise<unknown> {
    const response = await fetch(apiBase + "/" + fileName)

    if (!response.ok) {
        throw new Error(fileName + ":" + " " + "HTTP" + " " + response.status)
    }

    const data: unknown = await response.json()
    return data
}
const apiBase: string = import.meta.env.VITE_API_URL

export async function getJSON(fileName: string): Promise<unknown> {
    const response = await fetch(apiBase + "/" + fileName)

    if (!response.ok) {
        throw new Error(fileName + ":" + " " + "HTTP" + " " + response.status)
    }

    try {
        const data: unknown = await response.json()
        return data
    } catch (error: unknown) {
        if (error instanceof SyntaxError) {
            throw new Error(
                "اطلاعات فایل" + " " + fileName + " " +
                "قابل خواندن نیست. لطفاً دوباره تلاش کنید."
            )
        } else {
            throw error
        }
    }
}
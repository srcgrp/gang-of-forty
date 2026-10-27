export async function getJSON(path: string): Promise<unknown> {
    const response = await fetch(path)
    await new Promise<void>(function (resolve) {
        setTimeout(resolve, 4000)
    })
    if (!response.ok) {
        throw new Error("دریافت اطلاعات انجام نشد. کد خطا: " + response.status)
    }

    const data: unknown = await response.json()
    return data
}
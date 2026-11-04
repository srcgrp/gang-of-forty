/**
 * API Client - The only layer allowed to use fetch.
 * All external data must be fetched through this module.
 */

/**
 * Fetches JSON data from the given path.
 * Returns unknown to force runtime validation by the caller.
 *
 * @param path - The URL or path to fetch JSON from
 * @returns Parsed JSON data as unknown
 * @throws Error if the request fails or JSON is invalid
 */
export async function getJSON(path: string): Promise<unknown> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}: ${response.statusText} — ${path}`
    );
  }

  try {
    return await response.json();
  } catch (parseError) {
    throw new Error(
      `Failed to parse JSON from ${path}: ${parseError instanceof Error ? parseError.message : String(parseError)}`
    );
  }
}

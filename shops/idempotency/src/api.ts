export async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
  }

  return response.json();
}

export async function getJSON(path: string) : Promise<unknown>{
  const response=await fetch(path);
  if(!response.ok){
        throw new Error(`Failed to fetch ${path}: HTTP ${response.status}`);
  }
  return response.json();
}
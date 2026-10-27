export async function getJSON(path: string) : Promise<unknown>{
  const response=await fetch(path);
  if(!response.ok){
        throw new Error(`Failed to fetch ${path}: HTTP ${response.status}`);
  }
  return response.json();
}
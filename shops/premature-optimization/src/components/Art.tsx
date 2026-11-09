export function assetUrl(path: string): string {
  return path.startsWith('/') ? `.${path}` : path
}

export default function Art({ value, alt }: { value: string; alt: string }) {
  return value.endsWith('.svg') ? <img src={assetUrl(value)} alt={alt} /> : <>{value}</>
}

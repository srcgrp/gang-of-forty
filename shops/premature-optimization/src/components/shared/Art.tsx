import { assetUrl } from "../../lib/assetUrl";

export function Art({ value, alt }: { value: string; alt: string }) {
  return value.endsWith('.svg') ? <img src={assetUrl(value)} alt={alt} /> : <>{value}</>
}

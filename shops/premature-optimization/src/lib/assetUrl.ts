export function assetUrl(path: string): string {
  return path.startsWith("/") ? `.${path}` : path;
}

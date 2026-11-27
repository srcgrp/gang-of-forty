import { assetUrl } from "../../lib/assetUrl";

type ArtProps = {
  value: string;
  alt: string;
  priority?: boolean;
};

export function Art({ value, alt, priority = false }: ArtProps) {
  return value.endsWith(".svg") ? (
    <img
      src={assetUrl(value)}
      alt={alt}
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  ) : (
    <>{value}</>
  );
}

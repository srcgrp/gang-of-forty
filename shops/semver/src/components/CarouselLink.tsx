import { Link } from "@tanstack/react-router";

type CarouselLinkProps = { carouselId: string; title: string };

export default function CarouselLink({ carouselId, title }: CarouselLinkProps) {
  return (
    <Link
      className="catalog-link carousel-link"
      to="/plp/$carouselId"
      params={{ carouselId }}
      search={{ sort: "default" }}
      aria-label={`مشاهده همه: ${title}`}
    >
      مشاهده همه
    </Link>
  );
}

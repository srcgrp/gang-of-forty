import flatbreadIcon from "../../icons/flatbread.svg";
import beansIcon from "../../icons/beans.svg";

type Props = { emoji: string };

export default function ProductImage({ emoji }: Props) {
  const icon = emoji === "🫓" ? flatbreadIcon : emoji === "🫘" ? beansIcon : null;
  return (
    <div className="product-image product-emoji" aria-hidden="true">
      {icon ? <img src={icon} alt="" width="72" height="72" /> : emoji}
    </div>
  );
}

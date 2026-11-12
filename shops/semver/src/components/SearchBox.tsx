import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";
import type { LoadState } from "../types";
import { formatPrice } from "../utils/format";
import { notyf } from "../utils/notify";
import "./SearchBox.css";

type SearchBoxProps = {
  query: string;
  onQueryChange: (query: string) => void;
  state: LoadState;
  onAdd: (id: number) => void;
  onRetry: () => void;
};

type PopupPosition = {
  left: number;
  top: number;
  width: number;
  maxHeight: number;
};

export default function SearchBox({
  query,
  onQueryChange,
  state,
  onAdd,
  onRetry,
}: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const [position, setPosition] = useState<PopupPosition | null>(null);
  const isOpen = Boolean(query.trim()) && focused;

  useLayoutEffect(() => {
    if (!isOpen) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      const rect = inputRef.current?.getBoundingClientRect();
      if (!rect) return;

      const width = Math.min(rect.width, window.innerWidth - 16);
      const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
      const top = rect.bottom + 6;
      const maxHeight = Math.max(0, Math.min(384, window.innerHeight - top - 8));
      setPosition({ left, top, width, maxHeight });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !inputRef.current?.contains(target) &&
        !popupRef.current?.contains(target)
      ) {
        setFocused(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isOpen]);

  const renderResults = () => {
    switch (state.status) {
      case "loading":
        return <p className="search-suggestions__message" role="status">در حال بارگذاری محصولات...</p>;
      case "empty":
        return <p className="search-suggestions__message">نتیجه‌ای برای «{query.trim()}» پیدا نشد.</p>;
      case "error":
        return (
          <div className="search-suggestions__message" role="alert">
            <p>خطا در بارگذاری اطلاعات: {state.message}</p>
            <button className="buynow-btn" type="button" onClick={onRetry}>
              تلاش دوباره
            </button>
          </div>
        );
      case "success":
        return (
          <ul className="search-suggestions__list">
            {state.products.map(({ product, offer, stock }) => {
              const isOutOfStock = stock === 0;
              const price = offer
                ? Math.round((product.price * (100 - offer.percent)) / 100)
                : product.price;

              return (
                <li className="search-suggestions__item" key={product.id}>
                  <span className="search-suggestions__emoji" aria-hidden="true">
                    {product.emoji || "📦"}
                  </span>
                  <span className="search-suggestions__details">
                    <strong>{product.name}</strong>
                    <span>{product.unit || ""}</span>
                    <span className="search-suggestions__price">{formatPrice(price)}</span>
                  </span>
                  <button
                    className="buynow-btn search-suggestions__add"
                    type="button"
                    aria-label={
                      isOutOfStock
                        ? `${product.name} ناموجود است`
                        : `افزودن ${product.name} به سبد خرید`
                    }
                    disabled={isOutOfStock}
                    onClick={() => {
                      onAdd(product.id);
                      notyf.success(`${product.name} با موفقیت به سبد خرید اضافه شد!`);
                      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
                    }}
                  >
                    {isOutOfStock ? "ناموجود" : "+"}
                  </button>
                </li>
              );
            })}
          </ul>
        );
      default: {
        const unreachable: never = state;
        return unreachable;
      }
    }
  };

  const popup = isOpen && position && typeof document !== "undefined"
    ? createPortal(
        <div
          ref={popupRef}
          id="search-suggestions"
          className="search-suggestions"
          role="region"
          aria-label="نتایج جستجو"
          onKeyDown={(event) => {
            if (event.key === "Escape") setFocused(false);
          }}
          style={{
            left: position.left,
            top: position.top,
            width: position.width,
            maxHeight: position.maxHeight,
          }}
        >
          {renderResults()}
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <input
        ref={inputRef}
        id="search-input"
        type="search"
        aria-label="جستجوی محصولات"
        aria-autocomplete="list"
        aria-controls={isOpen ? "search-suggestions" : undefined}
        aria-expanded={Boolean(isOpen && position)}
        placeholder="جستجـو کنیـد ..."
        value={query}
        onFocus={() => setFocused(true)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setFocused(false);
        }}
        onChange={(event) => {
          setFocused(true);
          onQueryChange(event.target.value);
        }}
      />
      {popup}
    </>
  );
}

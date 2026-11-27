import { useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useThemeStore } from "../hooks/useThemeStore";
import { useModalFocusTrap } from "../hooks/useModalFocusTrap";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  labelledBy: string;
  contentClassName?: string;
  children: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  labelledBy,
  contentClassName,
  children,
}: ModalProps) {
  const theme = useThemeStore((s) => s.theme);
  const contentRef = useRef<HTMLDivElement>(null);
  useModalFocusTrap(isOpen, onClose, contentRef);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal modal--open"
      data-theme={theme}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <div className="modal__overlay" onClick={onClose} />
      <div
        className={`modal__content${contentClassName ? ` ${contentClassName}` : ""}`}
        ref={contentRef}
        tabIndex={-1}
      >
        <div className="modal-sheet__handle" aria-hidden="true" />
        {children}
      </div>
    </div>,
    document.body,
  );
}

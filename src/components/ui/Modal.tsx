import { useEffect } from "react";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  dark?: boolean;
  children: ReactNode;
  className?: string;
};

export function Modal({ open, onClose, dark = false, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          className ||
          `flex max-h-[90vh] w-[520px] max-w-[90vw] flex-col items-start gap-5 overflow-y-auto rounded-3xl p-6 shadow-[0px_18px_24px_rgba(0,0,0,0.15)] ${
            dark ? "bg-[#1f1730]" : "bg-white"
          }`
        }
      >
        {children}
      </div>
    </div>
  );
}

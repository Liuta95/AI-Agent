import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode, RefObject } from "react";

type Placement = "bottom-start" | "top-start";

type PortalPopoverProps = {
  anchorRef: RefObject<HTMLElement | null>;
  open: boolean;
  onClose?: () => void;
  placement?: Placement;
  offset?: number;
  children: ReactNode;
};

export function PortalPopover({
  anchorRef,
  open,
  onClose,
  placement = "bottom-start",
  offset = 4,
  children,
}: PortalPopoverProps) {
  const [style, setStyle] = useState<CSSProperties>({});
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open || !anchorRef.current) return;

    function updatePosition() {
      const rect = anchorRef.current!.getBoundingClientRect();
      setStyle(
        placement === "top-start"
          ? { position: "fixed", left: rect.left, bottom: window.innerHeight - rect.top + offset, zIndex: 100 }
          : { position: "fixed", left: rect.left, top: rect.bottom + offset, zIndex: 100 },
      );
    }

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, anchorRef, placement, offset]);

  useEffect(() => {
    if (!open || !onClose) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (anchorRef.current?.contains(target)) return;
      if (contentRef.current?.contains(target)) return;
      onClose?.();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return createPortal(
    <div ref={contentRef} style={style}>
      {children}
    </div>,
    document.body,
  );
}

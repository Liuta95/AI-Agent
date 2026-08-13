import type { ReactNode } from "react";

type TabsProps = {
  children: ReactNode;
  className?: string;
};

export function Tabs({ children, className }: TabsProps) {
  return <div className={className || "flex items-center gap-2"}>{children}</div>;
}

type TabProps = {
  selected?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export function Tab({ selected = false, disabled = false, children, onClick, className }: TabProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center rounded-full px-3 py-1 text-sm font-normal leading-6 transition-colors ${
        disabled
          ? "cursor-not-allowed bg-[#e3e4e5] text-[#62606e]"
          : selected
            ? "bg-[#55456e] text-white"
            : "border border-[#e8eef4] bg-white text-text-primary hover:bg-[#e0d7ee]"
      } ${className || ""}`}
    >
      {children}
    </button>
  );
}

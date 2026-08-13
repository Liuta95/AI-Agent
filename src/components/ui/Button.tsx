import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  icon?: string;
  variant?: ButtonVariant;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-[#55456e] text-white",
  secondary: "border border-secondary-border text-secondary-text",
  ghost: "text-secondary-text",
};

export function Button({ children, icon, variant = "primary", type = "button", disabled, onClick, className }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={
        className ||
        `flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-2xl px-4 py-1.5 text-sm font-semibold leading-6 transition-opacity disabled:opacity-50 ${VARIANT_CLASSES[variant]}`
      }
    >
      {children}
      {icon && <img src={icon} alt="" className={`size-6 object-contain ${variant === "primary" ? "brightness-0 invert" : ""}`} />}
    </button>
  );
}

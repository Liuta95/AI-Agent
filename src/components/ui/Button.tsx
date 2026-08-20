import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  icon?: string;
  variant?: ButtonVariant;
  type?: "button" | "submit";
  disabled?: boolean;
  dark?: boolean;
  onClick?: () => void;
  className?: string;
};

function variantClasses(variant: ButtonVariant, dark: boolean) {
  if (variant === "primary") return dark ? "bg-[#9747ff] text-white" : "bg-[#55456e] text-white";
  if (variant === "secondary") {
    return dark ? "border border-[#9747ff] text-[#c4a1ff]" : "border border-secondary-border text-secondary-text";
  }
  return dark ? "text-[#c4a1ff]" : "text-secondary-text";
}

export function Button({
  children,
  icon,
  variant = "primary",
  type = "button",
  disabled,
  dark = false,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={
        className ||
        `flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-2xl px-4 py-1.5 text-sm font-semibold leading-6 transition-opacity disabled:opacity-50 ${variantClasses(variant, dark)}`
      }
    >
      {children}
      {icon && (
        <span className="flex size-6 shrink-0 items-center justify-center">
          <img
            src={icon}
            alt=""
            className={`h-4 w-4 object-contain ${variant === "primary" || dark ? "brightness-0 invert" : ""}`}
          />
        </span>
      )}
    </button>
  );
}

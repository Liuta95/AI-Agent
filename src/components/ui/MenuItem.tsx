import { Checkbox } from "./Checkbox";

type MenuItemProps = {
  icon?: string;
  label: string;
  description?: string;
  disabled?: boolean;
  checkbox?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  trailing?: string;
  onClick?: () => void;
  dark?: boolean;
  className?: string;
};

function rowClass(disabled: boolean, dark: boolean) {
  return `flex w-full items-center gap-2 rounded-lg px-4 py-2 outline-none transition-colors ${
    dark ? "bg-[#2e2b33]" : "bg-white"
  } ${
    disabled
      ? `cursor-not-allowed ${dark ? "bg-[#1c1b1f]" : "bg-[#e3e4e5]"}`
      : `cursor-pointer focus-within:border-[3px] focus-within:border-[#d1c4e6] ${
          dark ? "hover:bg-white/10" : "hover:bg-[#f5f2fa]"
        }`
  }`;
}

export function MenuItem({
  icon,
  label,
  description,
  disabled = false,
  checkbox = false,
  checked = false,
  onCheckedChange,
  trailing,
  onClick,
  dark = false,
  className,
}: MenuItemProps) {
  if (checkbox) {
    return (
      <div className={className || rowClass(disabled, dark)}>
        <Checkbox
          checked={checked}
          disabled={disabled}
          onChange={onCheckedChange}
          label={label}
          className={`flex flex-1 items-center gap-2 text-base font-normal leading-6 ${
            dark ? "text-white" : "text-text-primary"
          }`}
        />
        {trailing && (
          <span className={`shrink-0 text-sm leading-6 ${dark ? "text-[#b0b2be]" : "text-[#61647a]"}`}>
            {trailing}
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={className || `${rowClass(disabled, dark)} text-left`}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          className={`size-6 shrink-0 object-contain ${dark ? "brightness-0 invert" : ""}`}
        />
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className={`truncate text-base font-normal leading-6 ${
            disabled ? (dark ? "text-[#62606e]" : "text-[#62606e]") : dark ? "text-white" : "text-text-primary"
          }`}
        >
          {label}
        </span>
        {description && (
          <span
            className={`w-80 text-xs leading-4 ${
              disabled ? "text-[#b0b2be]" : dark ? "text-[#b0b2be]" : "text-text-secondary"
            }`}
          >
            {description}
          </span>
        )}
      </span>
    </button>
  );
}

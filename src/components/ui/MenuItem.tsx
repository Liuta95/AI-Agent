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
  className?: string;
};

function rowClass(disabled: boolean) {
  return `flex w-40 items-center gap-2 rounded-lg bg-white px-4 py-2 outline-none transition-colors ${
    disabled
      ? "cursor-not-allowed bg-[#e3e4e5]"
      : "cursor-pointer hover:bg-[#f5f2fa] focus-within:border-[3px] focus-within:border-[#d1c4e6]"
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
  className,
}: MenuItemProps) {
  if (checkbox) {
    return (
      <div className={className || rowClass(disabled)}>
        <Checkbox
          checked={checked}
          disabled={disabled}
          onChange={onCheckedChange}
          label={label}
          className="flex flex-1 items-center gap-2 text-base font-normal leading-6 text-text-primary"
        />
        {trailing && <span className="shrink-0 text-sm leading-6 text-[#61647a]">{trailing}</span>}
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={className || `${rowClass(disabled)} text-left`}
    >
      {icon && <img src={icon} alt="" className="size-6 shrink-0 object-contain" />}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className={`truncate text-base font-normal leading-6 ${
            disabled ? "text-[#62606e]" : "text-text-primary"
          }`}
        >
          {label}
        </span>
        {description && (
          <span className={`w-80 text-xs leading-4 ${disabled ? "text-[#b0b2be]" : "text-text-secondary"}`}>
            {description}
          </span>
        )}
      </span>
    </button>
  );
}

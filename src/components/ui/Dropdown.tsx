import chevronDownSmallIcon from "../../assets/icons/chevron-down-small.svg";

type DropdownOption = { label: string; value: string };

type DropdownProps = {
  label?: string;
  required?: boolean;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  icon?: string;
  className?: string;
};

export function Dropdown({
  label,
  required,
  options,
  value,
  onChange,
  placeholder,
  icon = chevronDownSmallIcon,
  className,
}: DropdownProps) {
  return (
    <label className={className || "flex w-full flex-col items-start gap-2"}>
      {label && (
        <span className="flex items-start gap-1 text-xs font-semibold leading-4 text-[#1c1b1f]">
          {label}
          {required && <span className="text-[#dd524c]">*</span>}
        </span>
      )}
      <span className="flex w-full items-center gap-1 rounded-3xl border border-input-border bg-white py-1.5 pl-3 pr-2">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="min-w-0 flex-1 appearance-none truncate bg-transparent text-sm font-normal leading-6 text-input-placeholder outline-none"
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="flex size-6 shrink-0 items-center justify-center">
          <img src={icon} alt="" className="h-[6.016px] w-[10.616px]" />
        </span>
      </span>
    </label>
  );
}

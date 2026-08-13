import { useEffect, useRef } from "react";
import checkIcon from "../../assets/icons/checkbox-check.svg";
import dashIcon from "../../assets/icons/checkbox-dash.svg";

type CheckboxProps = {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
};

export function Checkbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  error = false,
  label,
  onChange,
  className,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const selected = checked || indeterminate;

  return (
    <label
      className={
        className ||
        `inline-flex items-center gap-2 text-sm font-normal leading-6 ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        } ${error ? "text-[#dd524c]" : disabled ? "text-text-secondary" : "text-text-primary"}`
      }
    >
      <span className="relative inline-flex size-4 shrink-0 items-center justify-center rounded-[2px] focus-within:ring-2 focus-within:ring-[#d1c4e6] focus-within:ring-offset-2 focus-within:ring-offset-white">
        <input
          ref={inputRef}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          aria-invalid={error || undefined}
          className={`peer absolute inset-0 size-4 cursor-[inherit] appearance-none rounded-[2px] border bg-white outline-none transition-colors checked:bg-[#8d73b6] indeterminate:bg-[#8d73b6] enabled:hover:border-[#9747ff] checked:enabled:hover:bg-[#55456e] indeterminate:enabled:hover:bg-[#55456e] enabled:active:bg-[#f5f2fa] checked:enabled:active:bg-[#55456e] disabled:border-[#e8eef4] disabled:bg-white checked:disabled:bg-[#b0b2be] indeterminate:disabled:bg-[#b0b2be] ${
            error ? "border-[#dd524c]" : "border-[#7f829a]"
          }`}
        />
        {selected && (
          <img
            src={indeterminate ? dashIcon : checkIcon}
            alt=""
            className="pointer-events-none relative z-10 w-2.5"
          />
        )}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}

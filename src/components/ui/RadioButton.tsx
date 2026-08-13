type RadioButtonProps = {
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  name?: string;
  value?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
};

export function RadioButton({
  checked = false,
  disabled = false,
  error = false,
  label,
  name,
  value,
  onChange,
  className,
}: RadioButtonProps) {
  return (
    <label
      className={
        className ||
        `inline-flex items-center gap-2 text-sm font-normal leading-6 ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        } ${error ? "text-[#dd524c]" : disabled ? "text-text-secondary" : "text-text-primary"}`
      }
    >
      <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full focus-within:ring-2 focus-within:ring-[#d1c4e6] focus-within:ring-offset-2 focus-within:ring-offset-white">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          aria-invalid={error || undefined}
          className={`size-4 cursor-[inherit] appearance-none rounded-full border bg-white outline-none transition-colors enabled:hover:border-[5px] enabled:hover:border-[#9747ff] checked:border-[5px] checked:border-[#9747ff] checked:enabled:hover:border-[#9747ff] enabled:active:bg-[#f5f2fa] checked:enabled:active:border-[#62606e] disabled:border-[#e8eef4] checked:disabled:border-[5px] checked:disabled:border-[#e8eef4] ${
            error ? "border-[#dd524c]" : "border-[#7f829a]"
          }`}
        />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}

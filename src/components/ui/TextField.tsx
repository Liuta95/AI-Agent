type TextFieldProps = {
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  dark?: boolean;
  className?: string;
};

export function TextField({ label, required, value, onChange, placeholder, dark = false, className }: TextFieldProps) {
  return (
    <label className={className || "flex w-full flex-col items-start gap-2"}>
      {label && (
        <span className={`flex items-start gap-1 text-xs font-semibold leading-4 ${dark ? "text-white" : "text-[#1c1b1f]"}`}>
          {label}
          {required && <span className="text-[#dd524c]">*</span>}
        </span>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-3xl border py-1.5 pl-3 pr-2 text-sm font-normal leading-6 outline-none ${
          dark
            ? "border-[#62606e] bg-[#2e2b33] text-white placeholder:text-[#b0b2be]"
            : "border-input-border bg-white text-text-primary placeholder:text-input-placeholder"
        }`}
      />
    </label>
  );
}

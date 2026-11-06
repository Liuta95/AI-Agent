import { useId } from "react";

type TextFieldProps = {
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Validation message; when set the field is marked invalid and the message is announced. */
  error?: string;
  maxLength?: number;
  dark?: boolean;
  className?: string;
};

export function TextField({
  label,
  required,
  value,
  onChange,
  placeholder,
  error,
  maxLength,
  dark = false,
  className,
}: TextFieldProps) {
  const errorId = useId();
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
        maxLength={maxLength}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-3xl border py-1.5 pl-3 pr-2 text-sm font-normal leading-6 outline-none ${
          error
            ? "border-[#dd524c]"
            : dark
              ? "border-[#62606e]"
              : "border-input-border"
        } ${
          dark
            ? "bg-[#2e2b33] text-white placeholder:text-[#b0b2be]"
            : "bg-white text-text-primary placeholder:text-input-placeholder"
        }`}
      />
      {error && (
        <span id={errorId} role="alert" className={`text-xs font-normal leading-4 ${dark ? "text-[#ff8a84]" : "text-[#b3261e]"}`}>
          {error}
        </span>
      )}
    </label>
  );
}

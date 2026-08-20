import wandIcon from "../../assets/icons/wand-stars.svg";
import resizeIcon from "../../assets/icons/resize-window.svg";

type TextareaProps = {
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onAiAssist?: () => void;
  dark?: boolean;
  className?: string;
};

export function Textarea({
  label,
  required,
  value,
  onChange,
  placeholder,
  onAiAssist,
  dark = false,
  className,
}: TextareaProps) {
  return (
    <label className={className || "flex h-28 w-full flex-col items-start gap-2"}>
      {label && (
        <span className={`flex items-start gap-1 text-xs font-semibold leading-4 ${dark ? "text-white" : "text-[#1c1b1f]"}`}>
          {label}
          {required && <span className="text-[#dd524c]">*</span>}
        </span>
      )}
      <div className="relative w-full flex-1">
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`size-full resize-none rounded-xl border py-2 pl-3 pr-9 text-sm font-normal leading-6 outline-none ${
            dark
              ? "border-[#62606e] bg-[#2e2b33] text-white placeholder:text-[#b0b2be]"
              : "border-input-border bg-white text-text-primary placeholder:text-input-placeholder"
          }`}
        />
        {onAiAssist && (
          <button
            type="button"
            aria-label="AI assist"
            onClick={onAiAssist}
            className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center"
          >
            <img src={wandIcon} alt="" className={`h-[17px] w-[17px] ${dark ? "brightness-0 invert" : ""}`} />
          </button>
        )}
        <img
          src={resizeIcon}
          alt=""
          className={`pointer-events-none absolute bottom-1.5 right-1.5 h-[10.667px] w-[10.667px] ${
            dark ? "brightness-0 invert" : ""
          }`}
        />
      </div>
    </label>
  );
}

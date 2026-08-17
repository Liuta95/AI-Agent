import wandIcon from "../../assets/icons/wand-stars.svg";
import resizeIcon from "../../assets/icons/resize-window.svg";

type TextareaProps = {
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onAiAssist?: () => void;
  className?: string;
};

export function Textarea({ label, required, value, onChange, placeholder, onAiAssist, className }: TextareaProps) {
  return (
    <label className={className || "flex h-28 w-full flex-col items-start gap-2"}>
      {label && (
        <span className="flex items-start gap-1 text-xs font-semibold leading-4 text-[#1c1b1f]">
          {label}
          {required && <span className="text-[#dd524c]">*</span>}
        </span>
      )}
      <div className="relative w-full flex-1">
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="size-full resize-none rounded-xl border border-input-border bg-white py-2 pl-3 pr-9 text-sm font-normal leading-6 text-text-primary outline-none placeholder:text-input-placeholder"
        />
        {onAiAssist && (
          <button
            type="button"
            aria-label="AI assist"
            onClick={onAiAssist}
            className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center"
          >
            <img src={wandIcon} alt="" className="h-[17px] w-[17px]" />
          </button>
        )}
        <img
          src={resizeIcon}
          alt=""
          className="pointer-events-none absolute bottom-1.5 right-1.5 h-[10.667px] w-[10.667px]"
        />
      </div>
    </label>
  );
}

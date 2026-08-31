import loaderIcon from "../../assets/icons/loader.svg";
import closeIcon from "../../assets/icons/close-small.svg";
import { FileTypeIcon } from "./FileTypeIcon";

type FileChipState = "default" | "hover" | "error" | "disabled" | "uploading";

type FileChipProps = {
  fileName: string;
  state?: FileChipState;
  dark?: boolean;
  onRemove?: () => void;
  className?: string;
};

function stateClasses(state: FileChipState, dark: boolean) {
  if (state === "error") {
    return dark
      ? "bg-[#58231e] border-[#f09693]"
      : "bg-[#fef5f4] border-[#dd524c]";
  }
  if (state === "hover") {
    return dark ? "bg-[#1f1730] border-[#8d73b6]" : "bg-[#f5f2fa] border-[#6e598e]";
  }
  return dark ? "border-[#2e2b33]" : "border-input-border";
}

export function FileChip({
  fileName,
  state = "default",
  dark = false,
  onRemove,
  className,
}: FileChipProps) {
  const disabled = state === "disabled";
  const uploading = state === "uploading";
  const textColor = disabled
    ? dark
      ? "text-[#62606e]"
      : "text-[#b0b2be]"
    : dark
      ? "text-[#b0b2be]"
      : "text-[#61647a]";

  return (
    <div
      className={
        className ||
        `flex w-fit shrink-0 items-center gap-1.5 overflow-clip rounded-lg border px-2 py-1 ${stateClasses(state, dark)}`
      }
    >
      <span className="flex size-6 shrink-0 items-center justify-center">
        {uploading ? (
          <img src={loaderIcon} alt="" className="h-4 w-4 animate-spin" />
        ) : (
          <FileTypeIcon fileName={fileName} disabled={disabled} className="relative flex h-5 w-[19px] shrink-0 items-end justify-center" />
        )}
      </span>
      <p className={`whitespace-nowrap text-xs font-normal leading-4 ${textColor}`}>{fileName}</p>
      <button
        type="button"
        aria-label="Remove file"
        onClick={onRemove}
        disabled={disabled}
        className="flex size-6 shrink-0 items-center justify-center"
      >
        <img src={closeIcon} alt="" className="h-2.5 w-2.5" />
      </button>
    </div>
  );
}

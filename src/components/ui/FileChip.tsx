import docIcon from "../../assets/icons/doc-file.svg";
import docIconDisabled from "../../assets/icons/doc-file-disabled.svg";
import pictureIcon from "../../assets/icons/picture-file.svg";
import loaderIcon from "../../assets/icons/loader.svg";
import closeIcon from "../../assets/icons/close-small.svg";

type FileChipState = "default" | "hover" | "error" | "disabled" | "uploading";

type FileChipProps = {
  fileName: string;
  state?: FileChipState;
  kind?: "doc" | "picture";
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
  kind = "doc",
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
      {uploading ? (
        <img src={loaderIcon} alt="" className="size-6 shrink-0 animate-spin object-contain" />
      ) : kind === "picture" ? (
        <img src={pictureIcon} alt="" className="size-6 shrink-0 object-contain" />
      ) : (
        <img src={disabled ? docIconDisabled : docIcon} alt="" className="size-6 shrink-0 rounded object-contain" />
      )}
      <p className={`whitespace-nowrap text-xs font-normal leading-4 ${textColor}`}>{fileName}</p>
      <button type="button" aria-label="Remove file" onClick={onRemove} disabled={disabled} className="size-6 shrink-0">
        <img src={closeIcon} alt="" className="size-full object-contain" />
      </button>
    </div>
  );
}

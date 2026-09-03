import copyIcon from "../../assets/icons/copy.svg";

type UserMessageProps = {
  text: string;
  size?: "big" | "small";
  hovered?: boolean;
  dark?: boolean;
  className?: string;
};

export function UserMessage({ text, size = "big", hovered = false, dark = false, className }: UserMessageProps) {
  return (
    <div
      className={
        className ||
        // pl-[22%] mirrors the Figma spec's 160px inset on a 728px column proportionally, so the
        // bubble stays right-aligned without eating a fixed chunk of a narrow viewport.
        `flex w-full flex-col items-end gap-3 ${size === "small" ? "max-w-[568px]" : "pl-[22%]"}`
      }
    >
      <div
        className={`flex w-full items-center justify-end px-4 py-2 ${
          dark ? "bg-[#3a2f4d]" : "bg-[#f5f2fa]"
        } ${size === "small" ? "rounded-full" : "rounded-2xl"}`}
      >
        <p className={`min-w-0 flex-1 text-sm font-normal leading-6 ${dark ? "text-white" : "text-text-primary"}`}>
          {text}
        </p>
      </div>
      {hovered && (
        <div className="flex w-full items-center justify-end">
          <button
            type="button"
            aria-label="Copy message"
            className="flex size-6 shrink-0 items-center justify-center"
          >
            <img src={copyIcon} alt="" className={`h-[17px] w-3.5 ${dark ? "brightness-0 invert" : ""}`} />
          </button>
        </div>
      )}
    </div>
  );
}

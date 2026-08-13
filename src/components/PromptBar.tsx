import addIcon from "../assets/icons/add.svg";
import micIcon from "../assets/icons/mic.svg";
import sendIcon from "../assets/icons/send.svg";
import downloadIcon from "../assets/icons/download.svg";
import { FileChip } from "./ui/FileChip";

export type PromptBarState =
  | "default"
  | "hovered"
  | "focusedEmpty"
  | "focusedTyping"
  | "filled"
  | "multiline"
  | "withAttachment"
  | "dropFiles";

type Attachment = {
  fileName: string;
  state?: "default" | "hover" | "error" | "disabled" | "uploading";
  kind?: "doc" | "picture";
};

type PromptBarProps = {
  state?: PromptBarState;
  dark?: boolean;
  value?: string;
  placeholder?: string;
  attachments?: Attachment[];
  className?: string;
};

const CONTAINER_CLASSES: Record<PromptBarState, (dark: boolean) => string> = {
  default: (dark) => (dark ? "bg-[#2e2b33] border-[#62606e]" : "bg-white border-prompt-border"),
  hovered: (dark) =>
    dark
      ? "bg-[#2e2b33] border-[#c4a1ff] shadow-[0px_2px_5px_rgba(85,69,110,0.09)]"
      : "bg-white border-[#9747ff] shadow-[0px_2px_5px_rgba(85,69,110,0.09)]",
  focusedEmpty: (dark) => (dark ? "bg-[#2e2b33] border-[#8d73b6]" : "bg-white border-[#6e598e]"),
  focusedTyping: (dark) => (dark ? "bg-[#2e2b33] border-[#8d73b6]" : "bg-white border-[#6e598e]"),
  filled: (dark) => (dark ? "bg-[#2e2b33] border-[#62606e]" : "bg-white border-prompt-border"),
  multiline: (dark) => (dark ? "bg-[#2e2b33] border-[#8d73b6]" : "bg-white border-[#6e598e]"),
  withAttachment: (dark) => (dark ? "bg-[#2e2b33] border-[#8d73b6]" : "bg-white border-[#6e598e]"),
  dropFiles: () => "bg-white border-[#9747ff] border-dashed",
};

const DEFAULT_TEXT: Partial<Record<PromptBarState, string>> = {
  focusedTyping: "How do I create a reusable component?",
  filled: "How do I create a reusable component?",
  multiline:
    "Can you help me design a multi-step onboarding flow with smooth animations and transitions between screens? I need it to feel premium and modern.",
};

export function PromptBar({
  state = "default",
  dark = false,
  value,
  placeholder = "Ask me anything...",
  attachments = [],
  className,
}: PromptBarProps) {
  const isTyped = state === "focusedTyping" || state === "filled" || state === "multiline";
  const text = value ?? DEFAULT_TEXT[state] ?? placeholder;
  const textColor = isTyped
    ? dark
      ? "text-white"
      : "text-[#1c1b1f]"
    : dark
      ? "text-[#b0b2be]"
      : "text-input-placeholder";
  const sendActive = isTyped || state === "withAttachment";

  return (
    <div
      className={
        className ||
        `flex w-[728px] shrink-0 flex-col items-start justify-center rounded-field border p-0 ${CONTAINER_CLASSES[state](dark)} ${
          state === "dropFiles" ? "relative" : ""
        }`
      }
    >
      {state === "withAttachment" && attachments.length > 0 && (
        <div className="flex w-full items-start gap-2 overflow-clip pl-6 pt-4">
          {attachments.map((a) => (
            <FileChip key={a.fileName} fileName={a.fileName} state={a.state} kind={a.kind} dark={dark} />
          ))}
        </div>
      )}
      <div
        className={`flex w-full shrink-0 items-center gap-2.5 px-6 py-4 ${
          state === "dropFiles" ? "opacity-20" : ""
        }`}
      >
        <p className={`min-w-0 flex-1 text-base font-normal leading-normal ${textColor}`}>{text}</p>
      </div>
      <div className="flex w-full shrink-0 items-center justify-between py-2 pl-5 pr-6">
        <button
          type="button"
          aria-label="Add attachment"
          className="flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-3xl"
        >
          <img src={addIcon} alt="" className="size-6 object-contain" />
        </button>
        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            aria-label="Voice input"
            className="flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-3xl"
          >
            <img src={micIcon} alt="" className="size-6 object-contain" />
          </button>
          <button
            type="button"
            aria-label="Send message"
            className={`flex shrink-0 items-center justify-center overflow-clip rounded-full p-1 ${
              sendActive ? (dark ? "bg-[#1f1730]" : "bg-[#f5f2fa]") : ""
            }`}
          >
            <img src={sendIcon} alt="" className="size-6 object-contain" />
          </button>
        </div>
      </div>
      {state === "dropFiles" && (
        <div className="absolute inset-0 flex items-center justify-center gap-2.5">
          <img src={downloadIcon} alt="" className="size-6 object-contain" />
          <p className="text-base font-normal leading-normal text-[#6e598e]">Drop your files here.</p>
        </div>
      )}
    </div>
  );
}

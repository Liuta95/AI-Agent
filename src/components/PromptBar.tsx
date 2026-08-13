import addIcon from "../assets/icons/add.svg";
import micIcon from "../assets/icons/mic.svg";
import sendIcon from "../assets/icons/send.svg";

export function PromptBar() {
  return (
    <div className="flex w-[728px] shrink-0 flex-col items-start justify-center rounded-field border border-prompt-border bg-white">
      <div className="flex w-full shrink-0 items-center gap-2.5 px-6 py-4">
        <p className="min-w-0 flex-1 text-base font-normal leading-normal text-input-placeholder">
          Ask me anything...
        </p>
      </div>
      <div className="flex w-full shrink-0 items-center justify-between py-2 pl-5 pr-6">
        <button
          type="button"
          aria-label="Add attachment"
          className="flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-3xl"
        >
          <img src={addIcon} alt="" className="size-6" />
        </button>
        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            aria-label="Voice input"
            className="flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-3xl"
          >
            <img src={micIcon} alt="" className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Send message"
            className="flex shrink-0 items-center justify-center overflow-clip rounded-full p-1"
          >
            <img src={sendIcon} alt="" className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

type SuggestionCardState = "default" | "hover" | "selected";

type SuggestionCardProps = {
  icon: string;
  label: string;
  state?: SuggestionCardState;
  onClick?: () => void;
};

const STATE_CLASSES: Record<SuggestionCardState, string> = {
  default: "border border-input-border bg-white",
  hover: "bg-[#e0d7ee]",
  selected: "border border-secondary-border bg-[#f5f2fa]",
};

export function SuggestionCard({ icon, label, state = "default", onClick }: SuggestionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex shrink-0 items-center justify-center gap-2 overflow-clip rounded-2xl px-4 py-2 ${STATE_CLASSES[state]}`}
    >
      <span className="flex size-6 shrink-0 items-center justify-center">
        <img
          src={icon}
          alt=""
          className={`h-[18px] w-[18px] object-contain ${state === "selected" ? "brightness-[0.6]" : ""}`}
        />
      </span>
      <span
        className={`whitespace-nowrap text-center text-base font-normal leading-6 ${
          state === "selected" ? "text-secondary-text" : "text-text-primary"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

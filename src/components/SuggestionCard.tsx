type SuggestionCardState = "default" | "hover" | "selected";

type SuggestionCardProps = {
  icon: string;
  label: string;
  state?: SuggestionCardState;
};

const STATE_CLASSES: Record<SuggestionCardState, string> = {
  default: "border border-input-border bg-white",
  hover: "bg-[#e0d7ee]",
  selected: "border border-secondary-border bg-[#f5f2fa]",
};

export function SuggestionCard({ icon, label, state = "default" }: SuggestionCardProps) {
  return (
    <button
      type="button"
      className={`flex shrink-0 items-center justify-center gap-2 overflow-clip rounded-2xl px-4 py-2 ${STATE_CLASSES[state]}`}
    >
      <img
        src={icon}
        alt=""
        className={`size-6 object-contain ${state === "selected" ? "brightness-[0.6]" : ""}`}
      />
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

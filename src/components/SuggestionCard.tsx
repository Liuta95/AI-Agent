type SuggestionCardState = "default" | "hover" | "selected";

type SuggestionCardProps = {
  icon: string;
  label: string;
  state?: SuggestionCardState;
  dark?: boolean;
  onClick?: () => void;
};

function stateClasses(state: SuggestionCardState, dark: boolean) {
  if (state === "selected") {
    return dark ? "border border-[#9747ff] bg-[#2e2b33]" : "border border-secondary-border bg-[#f5f2fa]";
  }
  if (state === "hover") {
    return dark ? "bg-white/10" : "bg-[#e0d7ee]";
  }
  return dark ? "border border-[#62606e] bg-[#2e2b33]" : "border border-input-border bg-white";
}

export function SuggestionCard({ icon, label, state = "default", dark = false, onClick }: SuggestionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex shrink-0 items-center justify-center gap-2 overflow-clip rounded-2xl px-4 py-2 ${stateClasses(state, dark)}`}
    >
      <span className="flex size-6 shrink-0 items-center justify-center">
        <img
          src={icon}
          alt=""
          className={`h-[18px] w-[18px] object-contain ${
            dark ? "brightness-0 invert" : state === "selected" ? "brightness-[0.6]" : ""
          }`}
        />
      </span>
      <span
        className={`whitespace-nowrap text-center text-base font-normal leading-6 ${
          dark ? (state === "selected" ? "text-[#c4a1ff]" : "text-white") : state === "selected" ? "text-secondary-text" : "text-text-primary"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

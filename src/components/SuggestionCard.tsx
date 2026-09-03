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
    return dark ? "border border-[#b080ff] bg-[#3d3845]" : "border border-secondary-border bg-[#f5f2fa]";
  }
  if (state === "hover") {
    return dark ? "bg-[#3d3845]" : "bg-[#e0d7ee]";
  }
  return dark ? "border border-[#3d3845] bg-[#2e2b33]" : "border border-input-border bg-white";
}

export function SuggestionCard({ icon, label, state = "default", dark = false, onClick }: SuggestionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex max-w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-2xl px-4 py-2 ${stateClasses(state, dark)}`}
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
        className={`min-w-0 text-center text-base font-normal leading-6 ${
          dark ? "text-white" : state === "selected" ? "text-secondary-text" : "text-text-primary"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

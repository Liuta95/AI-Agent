type SuggestionCardProps = {
  icon: string;
  label: string;
};

export function SuggestionCard({ icon, label }: SuggestionCardProps) {
  return (
    <button
      type="button"
      className="flex shrink-0 items-center justify-center gap-2 overflow-clip rounded-2xl border border-input-border bg-white px-4 py-2"
    >
      <img src={icon} alt="" className="size-6" />
      <span className="whitespace-nowrap text-center text-base font-normal leading-6 text-text-primary">
        {label}
      </span>
    </button>
  );
}

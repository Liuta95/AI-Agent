type SourceChipState = "default" | "hover" | "active";

type SourceChipProps = {
  index: number;
  label: string;
  state?: SourceChipState;
  className?: string;
};

const STATE_CLASSES: Record<SourceChipState, { chip: string; badge: string; badgeText: string; label: string }> = {
  default: {
    chip: "bg-[#f9fafb] border-[#e3e4e5]",
    badge: "bg-white border-[#e3e4e5]",
    badgeText: "text-[#62606e]",
    label: "text-[#62606e]",
  },
  hover: {
    chip: "bg-[#e8eef4] border-[#b0b2be]",
    badge: "bg-white border-[#b0b2be]",
    badgeText: "text-[#62606e]",
    label: "text-[#62606e]",
  },
  active: {
    chip: "bg-[#f5f2fa] border-[#7821de]",
    badge: "bg-[#6e598e] border-[#6e598e]",
    badgeText: "text-white",
    label: "text-[#6e598e]",
  },
};

export function SourceChip({ index, label, state = "default", className }: SourceChipProps) {
  const styles = STATE_CLASSES[state];

  return (
    <div
      className={
        className ||
        `flex w-[222px] items-center gap-2 rounded-full border px-2 py-1 ${styles.chip}`
      }
    >
      <div className={`flex size-[18px] shrink-0 items-center justify-center rounded-full border ${styles.badge}`}>
        <p className={`text-[10px] font-bold uppercase leading-4 tracking-[0.5px] ${styles.badgeText}`}>
          {index}
        </p>
      </div>
      <p className={`min-w-0 flex-1 truncate text-xs font-normal leading-4 ${styles.label}`}>{label}</p>
    </div>
  );
}

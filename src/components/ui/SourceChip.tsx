import { useState } from "react";

type SourceChipState = "default" | "hover" | "active";

type SourceChipProps = {
  index: number;
  label: string;
  /** Forces a specific visual state (e.g. for static previews). Uncontrolled by default: the chip tracks its own hover/selected state. */
  state?: SourceChipState;
  dark?: boolean;
  className?: string;
  onOpen?: (index: number) => void;
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

const DARK_STATE_CLASSES: Record<SourceChipState, { chip: string; badge: string; badgeText: string; label: string }> = {
  default: {
    chip: "bg-[#2e2b33] border-[#62606e]",
    badge: "bg-[#1f1730] border-[#62606e]",
    badgeText: "text-[#b0b2be]",
    label: "text-[#b0b2be]",
  },
  hover: {
    chip: "bg-[#1f1730] border-[#9747ff]",
    badge: "bg-[#2e2b33] border-[#9747ff]",
    badgeText: "text-[#c4a1ff]",
    label: "text-[#c4a1ff]",
  },
  active: {
    chip: "bg-[#1f1730] border-[#9747ff]",
    badge: "bg-[#9747ff] border-[#9747ff]",
    badgeText: "text-white",
    label: "text-[#c4a1ff]",
  },
};

export function SourceChip({ index, label, state, dark = false, className, onOpen }: SourceChipProps) {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const resolvedState: SourceChipState = state ?? (selected ? "active" : hovered ? "hover" : "default");
  const styles = (dark ? DARK_STATE_CLASSES : STATE_CLASSES)[resolvedState];

  return (
    <button
      type="button"
      aria-pressed={selected}
      title={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={() => {
        setSelected((s) => !s);
        onOpen?.(index);
      }}
      className={
        className ||
        `flex w-[222px] items-center gap-2 rounded-full border px-2 py-1 outline-none transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#d1c4e6] ${styles.chip}`
      }
    >
      <div className={`flex size-[18px] shrink-0 items-center justify-center rounded-full border ${styles.badge}`}>
        <p className={`text-[10px] font-bold uppercase leading-4 tracking-[0.5px] ${styles.badgeText}`}>
          {index}
        </p>
      </div>
      <p className={`min-w-0 flex-1 truncate text-xs font-normal leading-4 ${styles.label}`}>{label}</p>
    </button>
  );
}

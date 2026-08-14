import { Tag } from "./Tag";
import thumb from "../../assets/images/daily-news-thumb.png";
import thumbSmall from "../../assets/images/daily-news-thumb-small.png";
import calendarIcon from "../../assets/icons/calendar-today.svg";
import pauseIcon from "../../assets/icons/pause.svg";
import editIcon from "../../assets/icons/edit-square.svg";
import moreIcon from "../../assets/icons/three-dots-horizontal.svg";

type DailyNewsCardState = "default" | "hover" | "focused" | "selected";

type DailyNewsCardProps = {
  state?: DailyNewsCardState;
  title?: string;
  subtitle?: string;
  description?: string;
  schedule?: string;
  tags?: string[];
  nextRun?: string;
  onPause?: () => void;
  onEdit?: () => void;
  onMore?: () => void;
  className?: string;
};

const STATE_CLASSES: Record<DailyNewsCardState, string> = {
  default: "border border-input-border",
  hover: "border border-input-border bg-[#f5f2fa]",
  focused: "border-[3px] border-[#d1c4e6] bg-[#f5f2fa]",
  selected: "border border-[#8d73b6] bg-[#f5f2fa]",
};

export function DailyNewsCard({
  state = "default",
  title = "Competitor tracking",
  subtitle = "Based on your recent request",
  description = "Track updates from competitors (OpenAI, Google, Anthropic) in the last 24 hours. Highlight product changes, pricing updates, and announcements.",
  schedule = "Daily 8:00 AM",
  tags = ["OpenAI", "Google", "Anthropic"],
  nextRun = "Next: 8:00 AM",
  onPause,
  onEdit,
  onMore,
  className,
}: DailyNewsCardProps) {
  return (
    <div
      className={
        className ||
        `flex w-full flex-col items-start gap-4 overflow-clip rounded-xl backdrop-blur-[8px] ${STATE_CLASSES[state]}`
      }
    >
      <div className="flex w-full flex-col items-start justify-center gap-3">
        <div className="h-[159px] w-full shrink-0">
          <img src={thumb} alt="" className="size-full object-cover" />
        </div>
        <div className="flex w-full flex-col items-start gap-2 px-4">
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-col items-start gap-0.5">
              <p className="text-base font-semibold leading-6 text-text-primary">{title}</p>
              <p className="text-xs font-normal leading-4 text-[#61647a]">{subtitle}</p>
            </div>
            <Tag color="purple">{schedule}</Tag>
          </div>
          <p className="text-sm font-normal leading-6 text-text-primary">{description}</p>
          <div className="flex items-start gap-2">
            {tags.map((tag) => (
              <Tag key={tag} color="pearl">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>
      <div className="flex h-14 w-full items-center justify-between border-t border-input-border px-4">
        <div className="flex items-center gap-2">
          <img src={calendarIcon} alt="" className="size-6 object-contain" />
          <p className="text-sm font-normal leading-6 text-text-secondary">{nextRun}</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Pause"
            onClick={onPause}
            className="flex w-9 shrink-0 items-center justify-center gap-1 overflow-clip rounded-3xl border border-secondary-border px-2 py-1.5"
          >
            <img src={pauseIcon} alt="" className="size-6 object-contain" />
          </button>
          <button
            type="button"
            aria-label="Edit"
            onClick={onEdit}
            className="flex w-9 shrink-0 items-center justify-center gap-1 overflow-clip rounded-3xl border border-secondary-border px-2 py-1.5"
          >
            <img src={editIcon} alt="" className="size-6 object-contain" />
          </button>
          <button
            type="button"
            aria-label="More options"
            onClick={onMore}
            className="flex w-9 shrink-0 items-center justify-center gap-1 overflow-clip rounded-3xl border border-secondary-border px-2 py-1.5"
          >
            <img src={moreIcon} alt="" className="size-6 object-contain" />
          </button>
        </div>
      </div>
    </div>
  );
}

type DailyNewsWidgetProps = {
  title?: string;
  description?: string;
  thumb?: string;
  onClick?: () => void;
  className?: string;
};

export function DailyNewsWidget({
  title = "Competitor tracking",
  description = "Daily updates on competitor and features.",
  thumb: thumbOverride,
  onClick,
  className,
}: DailyNewsWidgetProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        className ||
        "flex w-60 items-center justify-center gap-2 rounded-xl border border-input-border p-3 text-left backdrop-blur-[8px] transition-colors hover:bg-[#f5f2fa]"
      }
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg p-2">
        <img src={thumbOverride || thumbSmall} alt="" className="size-full rounded-lg object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
        <p className="text-xs font-semibold leading-4 text-text-primary">{title}</p>
        <p className="text-xs font-normal leading-4 text-[#61647a]">{description}</p>
      </div>
    </button>
  );
}

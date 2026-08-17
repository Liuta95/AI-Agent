import previewImage from "../../assets/images/template-card-preview.png";
import visibilityIcon from "../../assets/icons/visibility.svg";
import { Tag } from "./Tag";

type TemplateCardProps = {
  title?: string;
  category?: string;
  slideCount?: string;
  onPreview?: () => void;
  className?: string;
};

export function TemplateCard({
  title = "Modern Pitch Deck",
  category = "Pitch Deck",
  slideCount = "12 slides",
  onPreview,
  className,
}: TemplateCardProps) {
  return (
    <div
      className={
        className ||
        "flex w-[346px] flex-col items-start overflow-clip rounded-2xl border border-[#e3e4e5] bg-white shadow-[0px_4px_24px_0px_rgba(85,69,110,0.03)] transition-colors hover:bg-brand-tint"
      }
    >
      <div className="h-40 w-full shrink-0">
        <img src={previewImage} alt="" className="size-full object-cover" />
      </div>
      <div className="flex w-full shrink-0 flex-col items-start gap-3 p-4">
        <div className="flex w-full shrink-0 flex-col items-start gap-1">
          <p className="w-full truncate text-sm font-semibold leading-6 text-text-primary">{title}</p>
          <div className="flex items-center gap-2">
            <Tag color="purple">{category}</Tag>
            <p className="whitespace-nowrap text-xs font-normal leading-4 text-[#61647a]">{slideCount}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onPreview}
          className="flex shrink-0 items-center gap-1 overflow-clip rounded-3xl px-2 py-1"
        >
          <span className="flex size-6 shrink-0 items-center justify-center">
            <img src={visibilityIcon} alt="" className="h-[13px] w-[19.846px]" />
          </span>
          <span className="text-center text-xs font-semibold leading-6 text-secondary-text">Preview</span>
        </button>
      </div>
    </div>
  );
}

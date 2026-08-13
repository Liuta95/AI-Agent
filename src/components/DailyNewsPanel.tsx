import { DailyNewsWidget } from "./ui/DailyNewsCard";
import thumb1 from "../assets/images/news-thumb-1.png";
import thumb2 from "../assets/images/news-thumb-2.png";
import thumb3 from "../assets/images/news-thumb-3.png";
import thumb4 from "../assets/images/news-thumb-4.png";
import thumb5 from "../assets/images/news-thumb-5.png";
import thumb6 from "../assets/images/news-thumb-6.png";
import thumb7 from "../assets/images/news-thumb-7.png";
import thumb8 from "../assets/images/news-thumb-8.png";

const feeds = [
  { title: "Competitor tracking", description: "Daily updates on competitor and features.", thumb: thumb1 },
  { title: "Market analysis", description: "Comprehensive review of market trends and dynamics.", thumb: thumb2 },
  { title: "User feedback", description: "Regular collection and analysis of user feedback.", thumb: thumb3 },
  {
    title: "Feature prioritization",
    description: "Ranking features based on user needs and business value.",
    thumb: thumb4,
  },
  { title: "Performance metrics", description: "Daily monitoring of key performance indicators.", thumb: thumb5 },
  { title: "Roadmap planning", description: "Strategic planning for upcoming product releases.", thumb: thumb6 },
  {
    title: "Sales forecasting",
    description: "Projection of sales based on historical data and market conditions.",
    thumb: thumb7,
  },
  { title: "Marketing strategies", description: "Development of targeted marketing campaigns.", thumb: thumb8 },
  {
    title: "Customer support insights",
    description: "Analysis of customer inquiries for product improvement.",
    thumb: thumb1,
  },
  { title: "Competitor tracking", description: "Daily updates on competitor and features.", thumb: thumb1 },
];

type DailyNewsPanelProps = {
  onOpenFeed?: (title: string) => void;
  onViewAll?: () => void;
  className?: string;
};

export function DailyNewsPanel({ onOpenFeed, onViewAll, className }: DailyNewsPanelProps) {
  return (
    <div
      className={
        className ||
        "flex h-full w-72 shrink-0 flex-col items-center gap-4 overflow-y-auto border-l border-input-border p-6"
      }
    >
      {feeds.map((feed, i) => (
        <DailyNewsWidget
          key={i}
          title={feed.title}
          description={feed.description}
          thumb={feed.thumb}
          onClick={() => onOpenFeed?.(feed.title)}
        />
      ))}
      {onViewAll && (
        <button
          type="button"
          onClick={onViewAll}
          className="shrink-0 text-center text-xs font-semibold leading-6 text-secondary-text"
        >
          View all
        </button>
      )}
    </div>
  );
}

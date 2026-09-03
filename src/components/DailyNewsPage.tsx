import { useState } from "react";
import { Button } from "./ui/Button";
import { Tabs, Tab } from "./ui/Tabs";
import { Dropdown } from "./ui/Dropdown";
import { DailyNewsCard } from "./ui/DailyNewsCard";
import { PaginationBar } from "./ui/Pagination";
import addIcon from "../assets/icons/add.svg";
import searchIcon from "../assets/icons/search.svg";

const FILTERS = ["All feeds", "Competitors", "Market", "Product", "Performance"];

const SORT_OPTIONS = [
  { label: "Recent", value: "recent" },
  { label: "Oldest", value: "oldest" },
  { label: "Alphabetical", value: "alphabetical" },
];

const feeds = [
  {
    title: "Competitor tracking",
    subtitle: "Based on your recent request",
    description:
      "Track updates from competitors (OpenAI, Google, Anthropic) in the last 24 hours. Highlight product changes, pricing updates, and announcements.",
    schedule: "Daily 8:00 AM",
    tags: ["OpenAI", "Google", "Anthropic"],
    nextRun: "Next: 8:00 AM",
  },
  {
    title: "Market analysis",
    subtitle: "Comprehensive review of market trends and dynamics",
    description:
      "Weekly roundup of market movements, emerging trends, and competitive positioning across the AI industry.",
    schedule: "Weekly Mon 9:00 AM",
    tags: ["Market", "Trends"],
    nextRun: "Next: Mon 9:00 AM",
  },
  {
    title: "User feedback",
    subtitle: "Regular collection and analysis of user feedback",
    description: "Aggregated feedback from support tickets, surveys, and app store reviews, summarized daily.",
    schedule: "Daily 7:00 AM",
    tags: ["Support", "Product"],
    nextRun: "Next: 7:00 AM",
  },
  {
    title: "Feature prioritization",
    subtitle: "Ranking features based on user needs and business value",
    description: "A weighted breakdown of requested features by impact, effort, and customer demand.",
    schedule: "Weekly Fri 4:00 PM",
    tags: ["Product", "Roadmap"],
    nextRun: "Next: Fri 4:00 PM",
  },
  {
    title: "Performance metrics",
    subtitle: "Daily monitoring of key performance indicators",
    description: "Uptime, latency, and error-rate summary across all production services.",
    schedule: "Daily 6:00 AM",
    tags: ["Performance", "Infra"],
    nextRun: "Next: 6:00 AM",
  },
  {
    title: "Roadmap planning",
    subtitle: "Strategic planning for upcoming product releases",
    description: "Progress against the current quarter's roadmap milestones and blockers to watch.",
    schedule: "Weekly Wed 10:00 AM",
    tags: ["Product", "Roadmap"],
    nextRun: "Next: Wed 10:00 AM",
  },
  {
    title: "Sales forecasting",
    subtitle: "Projection of sales based on historical data and market conditions",
    description: "Updated pipeline projections compared against quota and prior quarter performance.",
    schedule: "Weekly Mon 8:00 AM",
    tags: ["Sales", "Market"],
    nextRun: "Next: Mon 8:00 AM",
  },
  {
    title: "Marketing strategies",
    subtitle: "Development of targeted marketing campaigns",
    description: "Campaign performance across channels with recommendations for budget reallocation.",
    schedule: "Weekly Thu 9:00 AM",
    tags: ["Marketing"],
    nextRun: "Next: Thu 9:00 AM",
  },
  {
    title: "Customer support insights",
    subtitle: "Analysis of customer inquiries for product improvement",
    description: "Top recurring support themes with suggested product or documentation fixes.",
    schedule: "Daily 8:30 AM",
    tags: ["Support"],
    nextRun: "Next: 8:30 AM",
  },
  {
    title: "Customer support insights",
    subtitle: "Analysis of customer inquiries for product improvement",
    description: "Top recurring support themes with suggested product or documentation fixes.",
    schedule: "Daily 8:30 AM",
    tags: ["Support"],
    nextRun: "Next: 8:30 AM",
  },
];

type DailyNewsPageProps = {
  dark?: boolean;
  onCreateFeed?: () => void;
  className?: string;
};

export function DailyNewsPage({ dark = false, onCreateFeed, className }: DailyNewsPageProps) {
  const [filter, setFilter] = useState(FILTERS[0]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <div
      className={
        className ||
        "scrollbar-thin flex h-full min-w-0 flex-1 flex-col items-center gap-10 overflow-y-auto px-4 pb-10 pt-10 sm:px-8 lg:px-12"
      }
    >
      <div className="flex w-full max-w-[1180px] flex-col items-center gap-4">
        <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-0 sm:pl-[135px]">
          <div className="flex flex-1 flex-col items-center gap-1 text-center">
            <h1 className={`text-[32px] font-semibold leading-[48px] ${dark ? "text-white" : "text-text-primary"}`}>
              Daily news
            </h1>
            <p className={`max-w-[818px] text-sm font-normal leading-6 ${dark ? "text-[#b0b2be]" : "text-[#6b6a65]"}`}>
              Get automated updates on topics you care about, delivered on your schedule.
            </p>
          </div>
          <Button icon={addIcon} dark={dark} onClick={onCreateFeed}>
            New feed
          </Button>
        </div>

        <div
          className={`flex w-full items-center gap-1 rounded-3xl border py-1.5 pl-3 pr-2 ${
            dark ? "border-[#62606e] bg-[#2e2b33]" : "border-input-border bg-white"
          }`}
        >
          <img src={searchIcon} alt="" className={`size-4 shrink-0 object-contain ${dark ? "brightness-0 invert" : ""}`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chats"
            className={`min-w-0 flex-1 bg-transparent text-sm font-normal leading-6 outline-none placeholder:text-current ${
              dark ? "text-[#b0b2be]" : "text-input-placeholder"
            }`}
          />
        </div>

        <div className="flex w-full items-center justify-between gap-3">
          <Tabs className="scrollbar-thin flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
            {FILTERS.map((f) => (
              <Tab key={f} selected={f === filter} dark={dark} onClick={() => setFilter(f)} className="shrink-0">
                {f}
              </Tab>
            ))}
          </Tabs>
          <Dropdown
            options={SORT_OPTIONS}
            value={sort}
            onChange={setSort}
            dark={dark}
            className="flex w-auto shrink-0 flex-col items-start gap-2"
          />
        </div>
      </div>

      <div className="grid w-full max-w-[1180px] grid-cols-1 gap-4 sm:grid-cols-2">
        {feeds.map((feed, i) => (
          <DailyNewsCard key={i} {...feed} dark={dark} />
        ))}
      </div>

      <PaginationBar
        page={page}
        pageCount={2}
        pageSize={pageSize}
        dark={dark}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        className={`w-full max-w-[1180px] flex-col items-start border-t py-3 ${
          dark ? "border-[#62606e] bg-[#1f1730]" : "border-input-border bg-white"
        }`}
      />
    </div>
  );
}

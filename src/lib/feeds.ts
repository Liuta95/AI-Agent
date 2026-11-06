export const CATEGORIES = [
  { label: "Competitors", value: "competitors" },
  { label: "Market", value: "market" },
  { label: "Product", value: "product" },
  { label: "Performance", value: "performance" },
];

export const FREQUENCIES = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

export const DELIVERY_TIMES = [
  { label: "8:00 AM", value: "08:00" },
  { label: "9:00 AM", value: "09:00" },
  { label: "12:00 PM", value: "12:00" },
  { label: "4:00 PM", value: "16:00" },
];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const FEED_NAME_MAX = 60;
export const FEED_PROMPT_MAX = 500;
export const FEED_PROMPT_MIN = 10;

export type NewFeed = {
  name: string;
  prompt: string;
  category: string;
  frequency: string;
  days: string[];
  deliveryTime: string;
};

export type FeedErrors = Partial<Record<"name" | "prompt" | "days", string>>;

/** Pure validation so the rules live in one place and are trivially testable. */
export function validateFeed(feed: NewFeed): FeedErrors {
  const errors: FeedErrors = {};
  const name = feed.name.trim();
  const prompt = feed.prompt.trim();

  if (!name) errors.name = "Give your feed a name, e.g. “Competitor launches”.";
  else if (name.length > FEED_NAME_MAX) errors.name = `Keep the name under ${FEED_NAME_MAX} characters.`;

  if (!prompt) errors.prompt = "Describe what this feed should monitor so it knows what to look for.";
  else if (prompt.length < FEED_PROMPT_MIN) {
    errors.prompt = `Add a little more detail — at least ${FEED_PROMPT_MIN} characters.`;
  } else if (prompt.length > FEED_PROMPT_MAX) errors.prompt = `Keep the prompt under ${FEED_PROMPT_MAX} characters.`;

  if (feed.frequency !== "monthly" && feed.days.length === 0) errors.days = "Pick at least one delivery day.";

  return errors;
}

export type FeedCardData = {
  title: string;
  subtitle: string;
  description: string;
  schedule: string;
  tags: string[];
  nextRun: string;
};

function labelFor(options: { label: string; value: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

function formatDays(days: string[]) {
  const ordered = DAYS.filter((d) => days.includes(d));
  if (ordered.length === 7) return "";
  if (ordered.length <= 3) return ordered.join(", ");
  return `${ordered.length} days/week`;
}

/** Turns a submitted feed into the props DailyNewsCard renders. */
export function feedToCard(feed: NewFeed): FeedCardData {
  const time = labelFor(DELIVERY_TIMES, feed.deliveryTime);
  const category = labelFor(CATEGORIES, feed.category);
  const frequency = labelFor(FREQUENCIES, feed.frequency);
  const days = feed.frequency === "monthly" ? "" : formatDays(feed.days);
  const schedule = [frequency, days, time].filter(Boolean).join(" ");

  return {
    title: feed.name.trim(),
    subtitle: "Created just now",
    description: feed.prompt.trim(),
    schedule,
    tags: [category],
    nextRun: `Next: ${time}`,
  };
}

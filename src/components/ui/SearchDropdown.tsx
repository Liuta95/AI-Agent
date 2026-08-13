import { MenuItem } from "./MenuItem";
import clockIcon from "../../assets/icons/clock.svg";
import starIcon from "../../assets/icons/star.svg";

type SearchDropdownProps = {
  recentSearches?: string[];
  suggested?: string[];
  onSelect?: (label: string) => void;
  dark?: boolean;
  className?: string;
};

export function SearchDropdown({
  recentSearches = ["knowledge base docs", "onboarding flow", "API rate limits"],
  suggested = ["Recent AI conversations", "Shared with me"],
  onSelect,
  dark = false,
  className,
}: SearchDropdownProps) {
  const hasRecent = recentSearches.length > 0;
  const hasSuggested = suggested.length > 0;

  return (
    <div
      className={
        className ||
        `flex w-[280px] flex-col items-start overflow-clip rounded-lg pb-2 shadow-[0px_2px_10px_0px_rgba(85,69,110,0.09)] ${
          dark ? "bg-[#2e2b33]" : "bg-white"
        }`
      }
    >
      {hasRecent && (
        <>
          <div className="flex w-full items-start px-4 pb-1 pt-2">
            <p className={`flex-1 text-xs font-normal leading-4 ${dark ? "text-[#b0b2be]" : "text-[#62606e]"}`}>
              Recent searches
            </p>
          </div>
          {recentSearches.map((label) => (
            <MenuItem key={label} icon={clockIcon} label={label} dark={dark} onClick={() => onSelect?.(label)} />
          ))}
        </>
      )}
      {hasRecent && hasSuggested && (
        <div className={`h-px w-full ${dark ? "bg-white/10" : "bg-input-border"}`} />
      )}
      {hasSuggested && (
        <>
          <div className="flex w-full items-start px-4 pb-1 pt-2">
            <p className={`flex-1 text-xs font-normal leading-4 ${dark ? "text-[#b0b2be]" : "text-[#62606e]"}`}>
              Suggested
            </p>
          </div>
          {suggested.map((label) => (
            <MenuItem key={label} icon={starIcon} label={label} dark={dark} onClick={() => onSelect?.(label)} />
          ))}
        </>
      )}
    </div>
  );
}

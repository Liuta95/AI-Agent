import starsIcon from "../assets/icons/stars.svg";
import dvrIcon from "../assets/icons/dvr.svg";
import globeQuestionIcon from "../assets/icons/globe-question.svg";
import ideaIcon from "../assets/icons/idea.svg";
import { PromptBar } from "./PromptBar";
import { SuggestionCard } from "./SuggestionCard";

const suggestions = [
  { icon: starsIcon, label: "Monitor AI releases" },
  { icon: dvrIcon, label: "Create a slide deck" },
  { icon: globeQuestionIcon, label: "Plan a trip" },
  { icon: ideaIcon, label: "Evaluate business idea" },
  { icon: starsIcon, label: "Write a usability test script for our latest workflow" },
];

type HomePageProps = {
  dark?: boolean;
  onSend?: (query: string) => void;
};

export function HomePage({ dark = false, onSend }: HomePageProps) {
  return (
    <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-center pb-3">
      <div className="flex w-[728px] shrink-0 flex-col items-start justify-center gap-8 pt-16">
        <div className="flex w-full shrink-0 flex-col items-center gap-1 whitespace-nowrap text-center">
          <p className={`text-[32px] font-semibold leading-[48px] ${dark ? "text-white" : "text-text-primary"}`}>
            Welcome, Anastasiia!
          </p>
          <p className={`text-base font-normal leading-6 ${dark ? "text-[#b0b2be]" : "text-text-secondary"}`}>
            Can I help you with anything?
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col items-start gap-3">
          <PromptBar dark={dark} onSend={(value) => onSend?.(value)} />
          <div className="flex w-full shrink-0 flex-wrap items-start gap-2">
            {suggestions.map((s, i) => (
              <SuggestionCard
                key={`${s.label}-${i}`}
                icon={s.icon}
                label={s.label}
                dark={dark}
                onClick={() => onSend?.(s.label)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

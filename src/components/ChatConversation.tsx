import { UserMessage } from "./ui/UserMessage";
import { ChatText, ChatActions } from "./ui/ChatItem";
import { SourceChip } from "./ui/SourceChip";
import { PromptBar } from "./PromptBar";

const SOURCES = [
  "Website_document-name-example_V1",
  "Website_document-name-example_V1",
  "Website_document-name-example_V1",
  "Website_document-name-example_V1",
  "Website_document-name-example_V1",
];

type ChatConversationProps = {
  query: string;
  dark?: boolean;
  className?: string;
};

export function ChatConversation({ query, dark = false, className }: ChatConversationProps) {
  return (
    <div
      className={
        className || "flex h-full flex-1 flex-col items-center justify-between overflow-hidden px-12 pb-3 pt-4"
      }
    >
      <div className="scrollbar-thin flex w-[728px] flex-1 flex-col items-start gap-4 overflow-y-auto">
        <UserMessage text={query} dark={dark} />
        <ChatText
          heading="Core idea"
          body="A reusable component is a UI building block you define once and use many times, with different content or settings instead of duplicating the design or code each time. In practice, that means creating one flexible source component, then controlling its variations through properties, variants, or inputs."
          subheading="Figma workflow"
          bullets={[
            {
              text: "Start by spotting patterns that repeat, such as buttons, inputs, cards, modals, or list items. Figma says components can be simple like shapes, buttons, and fields, or more complex like cards and menus, which makes them the right unit for reuse in a design system.",
            },
            {
              text: "A component becomes reusable when the stable structure stays the same, while the changing parts are exposed for editing. In React, that usually means props and composition; in Figma, that usually means variants and component properties.",
            },
          ]}
          dark={dark}
        />
        <ChatActions className="flex h-6 w-full items-center justify-between" dark={dark} />
        <div className="flex w-full flex-col items-start gap-1.5">
          <p className={`text-xs font-semibold leading-4 ${dark ? "text-[#b0b2be]" : "text-text-secondary"}`}>
            Sources
          </p>
          <div className="flex w-full flex-wrap items-center gap-2">
            {SOURCES.map((label, i) => (
              <SourceChip key={i} index={i + 1} label={label} dark={dark} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 w-[728px] shrink-0">
        <PromptBar dark={dark} />
      </div>
    </div>
  );
}

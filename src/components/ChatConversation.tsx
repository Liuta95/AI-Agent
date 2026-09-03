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

/** Keeps a long or short query readable inside a 2xl heading; mirrors the sidebar's chat-title truncation. */
function truncateForHeading(query: string, max = 64): string {
  const trimmed = query.trim().replace(/\s+/g, " ");
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max).trimEnd()}…`;
}

const RESPONSE_BODY =
  "This is a preview of how a Sidekick answer is structured — headings, supporting detail, and cited sources below. This build isn't connected to a live model yet, so the walkthrough itself isn't generated from your question; here's a sample of what a cited answer looks like once it is:";
const RESPONSE_SUBHEADING = "Example: keeping a Figma component reusable";
const RESPONSE_BULLETS = [
  "Start by spotting patterns that repeat, such as buttons, inputs, cards, modals, or list items. Figma says components can be simple like shapes, buttons, and fields, or more complex like cards and menus, which makes them the right unit for reuse in a design system.",
  "A component becomes reusable when the stable structure stays the same, while the changing parts are exposed for editing. In React, that usually means props and composition; in Figma, that usually means variants and component properties.",
];

type ChatConversationProps = {
  query: string;
  dark?: boolean;
  className?: string;
};

export function ChatConversation({ query, dark = false, className }: ChatConversationProps) {
  const queryLabel = truncateForHeading(query);
  const responseHeading = `Here's what I found for "${queryLabel}"`;
  // Plain-text mirror of the rendered response, so Copy/Download/Read-aloud act on exactly what's on screen.
  const responseText = [responseHeading, "", RESPONSE_BODY, "", RESPONSE_SUBHEADING, "", ...RESPONSE_BULLETS.map((b) => `• ${b}`)].join(
    "\n",
  );
  return (
    <div
      className={
        className ||
        "flex h-full min-w-0 flex-1 flex-col items-center justify-between overflow-hidden px-4 pb-3 pt-4 sm:px-8 lg:px-12"
      }
    >
      <div className="scrollbar-thin flex w-full max-w-[728px] flex-1 flex-col items-start gap-4 overflow-y-auto">
        <UserMessage text={query} dark={dark} />
        <ChatText
          heading={responseHeading}
          body={RESPONSE_BODY}
          subheading={RESPONSE_SUBHEADING}
          bullets={RESPONSE_BULLETS.map((text) => ({ text }))}
          dark={dark}
        />
        <ChatActions
          className="flex h-6 w-full items-center justify-between"
          responseText={responseText}
          dark={dark}
        />
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
      <div className="mt-4 w-full max-w-[728px] shrink-0">
        <PromptBar dark={dark} />
      </div>
    </div>
  );
}

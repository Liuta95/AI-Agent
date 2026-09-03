import { useEffect, useRef, useState, type ReactNode } from "react";
import copyIcon from "../../assets/icons/copy.svg";
import autorenewIcon from "../../assets/icons/autorenew.svg";
import downloadIcon from "../../assets/icons/download.svg";
import volumeUpIcon from "../../assets/icons/volume-up.svg";
import thumbUpIcon from "../../assets/icons/thumb-up.svg";
import thumbDownIcon from "../../assets/icons/thumb-down.svg";
import alertErrorIcon from "../../assets/icons/alert-error.svg";
import keyboardArrowUpIcon from "../../assets/icons/keyboard-arrow-up.svg";
import openInNewIcon from "../../assets/icons/open-in-new.svg";
import docSmallIcon from "../../assets/icons/doc-small.svg";
import chevronDownStroke from "../../assets/icons/chevron-down-stroke.svg";

type ChatTextProps = {
  heading?: string;
  body?: string;
  subheading?: string;
  bullets?: { term?: string; text: string }[];
  dark?: boolean;
  children?: ReactNode;
};

export function ChatText({ heading, body, subheading, bullets, dark = false, children }: ChatTextProps) {
  const textColor = dark ? "text-white" : "text-text-primary";
  return (
    <div className="flex w-[680px] flex-col items-start gap-2">
      <div className={`flex w-full flex-col items-start gap-3 ${textColor}`}>
        {heading && <p className="w-full text-2xl font-semibold leading-8">{heading}</p>}
        {body && <p className="w-full text-sm font-normal leading-6">{body}</p>}
      </div>
      {subheading && (
        <div className="flex w-full items-center justify-center pb-4 pt-6">
          <p className={`min-w-0 flex-1 text-base font-semibold leading-6 ${textColor}`}>{subheading}</p>
        </div>
      )}
      {bullets && bullets.length > 0 && (
        <ul className={`w-full list-disc pl-6 ${textColor}`}>
          {bullets.map((b, i) => (
            <li key={i} className="text-sm leading-6">
              {b.term && <span className="font-semibold">{b.term}: </span>}
              <span className="font-normal">{b.text}</span>
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}

type ChatActionsProps = {
  /** The response text these actions operate on — copied, downloaded, and read aloud. */
  responseText: string;
  onCopy?: () => void;
  /** Omit to leave Regenerate honestly disabled (no live model to regenerate from yet). */
  onRegenerate?: () => void;
  onDownload?: () => void;
  onThumbUp?: () => void;
  onThumbDown?: () => void;
  dark?: boolean;
  className?: string;
};

const ACTION_BUTTON_BASE =
  "flex size-6 shrink-0 items-center justify-center rounded-full outline-none transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#d1c4e6] disabled:cursor-not-allowed disabled:opacity-40";

export function ChatActions({
  responseText,
  onCopy,
  onRegenerate,
  onDownload,
  onThumbUp,
  onThumbDown,
  dark = false,
  className,
}: ChatActionsProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [speaking, setSpeaking] = useState(false);
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const copyTimeoutRef = useRef<number | null>(null);
  const speechSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(
    () => () => {
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
      if (speechSupported) window.speechSynthesis.cancel();
    },
    [speechSupported],
  );

  const iconClass = `object-contain ${dark ? "brightness-0 invert" : ""}`;
  const pressedPill = dark ? "bg-[#9747ff]" : "bg-[#6e598e]";
  const pressedIconClass = "object-contain brightness-0 invert";

  async function handleCopy() {
    if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
    try {
      await navigator.clipboard.writeText(responseText);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    onCopy?.();
    copyTimeoutRef.current = window.setTimeout(() => setCopyState("idle"), 2000);
  }

  function handleDownload() {
    const blob = new Blob([responseText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sidekick-response.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    onDownload?.();
  }

  function handleReadAloud() {
    if (!speechSupported) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(responseText);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }

  function handleVote(next: "up" | "down") {
    setVote((current) => (current === next ? null : next));
    if (next === "up") onThumbUp?.();
    else onThumbDown?.();
  }

  return (
    <div className={className || "flex h-6 w-[680px] items-center justify-between"}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={copyState === "failed" ? "Copy failed" : "Copy response"}
          title={copyState === "failed" ? "Couldn't copy — try again" : "Copy response"}
          onClick={handleCopy}
          className={ACTION_BUTTON_BASE}
        >
          {copyState === "copied" ? (
            <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 ${dark ? "text-[#c4a1ff]" : "text-[#7821de]"}`} fill="none" aria-hidden="true">
              <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : copyState === "failed" ? (
            <img src={alertErrorIcon} alt="" className="h-3.5 w-3.5 object-contain" />
          ) : (
            <img src={copyIcon} alt="" className={`h-[17px] w-3.5 ${iconClass}`} />
          )}
        </button>
        <button
          type="button"
          aria-label={onRegenerate ? "Regenerate" : "Regenerate (unavailable)"}
          title={onRegenerate ? "Regenerate" : "Regenerate isn't available yet — no live model is connected"}
          onClick={onRegenerate}
          disabled={!onRegenerate}
          className={ACTION_BUTTON_BASE}
        >
          <img src={autorenewIcon} alt="" className={`h-3.5 w-3.5 ${iconClass}`} />
        </button>
        <button
          type="button"
          aria-label="Download response"
          title="Download response as a text file"
          onClick={handleDownload}
          className={ACTION_BUTTON_BASE}
        >
          <img src={downloadIcon} alt="" className={`h-3.5 w-3.5 ${iconClass}`} />
        </button>
        <button
          type="button"
          aria-label={speaking ? "Stop reading aloud" : "Read aloud"}
          title={speechSupported ? (speaking ? "Stop reading aloud" : "Read aloud") : "Read aloud isn't supported in this browser"}
          onClick={handleReadAloud}
          disabled={!speechSupported}
          aria-pressed={speaking}
          className={`${ACTION_BUTTON_BASE} ${speaking ? pressedPill : ""}`}
        >
          <img src={volumeUpIcon} alt="" className={`h-[15.0385px] w-[15.3845px] ${speaking ? pressedIconClass : iconClass}`} />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Good response"
          title="Good response"
          aria-pressed={vote === "up"}
          onClick={() => handleVote("up")}
          className={`${ACTION_BUTTON_BASE} ${vote === "up" ? pressedPill : ""}`}
        >
          <img src={thumbUpIcon} alt="" className={`h-[17.1923px] w-[19px] ${vote === "up" ? pressedIconClass : iconClass}`} />
        </button>
        <button
          type="button"
          aria-label="Bad response"
          title="Bad response"
          aria-pressed={vote === "down"}
          onClick={() => handleVote("down")}
          className={`${ACTION_BUTTON_BASE} ${vote === "down" ? pressedPill : ""}`}
        >
          <img src={thumbDownIcon} alt="" className={`h-[17.1923px] w-[19px] ${vote === "down" ? pressedIconClass : iconClass}`} />
        </button>
      </div>
    </div>
  );
}

type RelatedItemsProps = {
  items: string[];
};

export function RelatedItems({ items }: RelatedItemsProps) {
  return (
    <div className="flex w-[680px] flex-col items-start gap-4">
      <div className="flex w-[680px] items-center gap-1">
        <span className="flex size-6 shrink-0 items-center justify-center">
          <img src={keyboardArrowUpIcon} alt="" className="h-[6.0155px] w-[10.6155px]" />
        </span>
        <p className="text-xs font-semibold leading-4 text-[#62606e]">Search related topics</p>
      </div>
      <div className="flex w-[680px] flex-col items-start gap-2">
        {items.map((item, i) => (
          <div key={item} className="flex items-start gap-1">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-[#f5f2fa]">
              <p className="text-xs font-semibold leading-4 text-[#62606e]">{i + 1}</p>
            </div>
            <div className="flex h-6 items-center gap-1 rounded-lg bg-[#f5f2fa] py-2 pl-1.5 pr-1">
              <p className="whitespace-nowrap text-sm font-normal leading-6 text-text-primary">{item}</p>
              <span className="flex size-4 shrink-0 items-center justify-center">
                <img src={openInNewIcon} alt="" className="h-[10.6667px] w-[10.6667px]" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type ReferencesProps = {
  items: string[];
  defaultOpen?: boolean;
};

export function References({ items, defaultOpen = true }: ReferencesProps) {
  return (
    <details open={defaultOpen} className="w-full">
      <summary className="flex w-full cursor-pointer list-none items-center gap-1">
        <p className="text-xs font-semibold leading-normal text-[#61647a]">References</p>
        <span className="flex size-6 shrink-0 items-center justify-center">
          <img src={chevronDownStroke} alt="" className="h-[11.2px] w-[6.2px] -rotate-90" />
        </span>
      </summary>
      <div className="mt-2 flex w-full flex-col items-start gap-2">
        {items.map((item, i) => (
          <div key={item} className="flex items-start gap-1">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-[#f5f2fa]">
              <p className="text-xs font-semibold leading-4 text-[#62606e]">{i + 1}</p>
            </div>
            <div className="flex h-6 items-center gap-1 rounded-lg bg-[#f5f2fa] py-2 pl-1.5 pr-1">
              <span className="flex size-4 shrink-0 items-center justify-center">
                <img src={docSmallIcon} alt="" className="h-3 w-[9.33px]" />
              </span>
              <p className="whitespace-nowrap text-sm font-normal leading-6 text-text-primary">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}

type DisclaimerProps = {
  text?: string;
};

export function Disclaimer({
  text = "Sidekick has access to a curated set of Deloitte content. The below response is generated by Azure OpenAI and not using Deloitte's internal data sources.",
}: DisclaimerProps) {
  return (
    <div className="flex w-[680px] items-start gap-1.5 rounded-xl bg-[#f8faff] p-4">
      <p className="flex-1 text-sm leading-6 text-[#1c1c1c]">
        <span className="font-bold">Disclaimer: </span>
        <span className="font-normal">{text}</span>
      </p>
    </div>
  );
}

type ImageGridProps = {
  images: string[];
};

export function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="flex w-[680px] flex-wrap items-start gap-2">
      {images.map((src, i) => (
        <div key={i} className="h-[200px] w-[201px] shrink-0 overflow-hidden rounded-lg bg-[#d9d9d9]">
          <img src={src} alt="" className="size-full object-cover" />
        </div>
      ))}
    </div>
  );
}

type SingleImageProps = {
  image: string;
};

export function SingleImage({ image }: SingleImageProps) {
  return (
    <div className="flex w-[680px] flex-col items-start gap-2">
      <div className="size-[408px] overflow-hidden rounded-lg bg-[#d9d9d9]">
        <img src={image} alt="" className="size-full object-cover" />
      </div>
    </div>
  );
}

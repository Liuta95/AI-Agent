import type { ReactNode } from "react";
import copyIcon from "../../assets/icons/copy.svg";
import autorenewIcon from "../../assets/icons/autorenew.svg";
import downloadIcon from "../../assets/icons/download.svg";
import volumeUpIcon from "../../assets/icons/volume-up.svg";
import thumbUpIcon from "../../assets/icons/thumb-up.svg";
import thumbDownIcon from "../../assets/icons/thumb-down.svg";
import keyboardArrowUpIcon from "../../assets/icons/keyboard-arrow-up.svg";
import openInNewIcon from "../../assets/icons/open-in-new.svg";
import docSmallIcon from "../../assets/icons/doc-small.svg";
import chevronDownStroke from "../../assets/icons/chevron-down-stroke.svg";

type ChatTextProps = {
  heading?: string;
  body?: string;
  subheading?: string;
  bullets?: { term?: string; text: string }[];
  children?: ReactNode;
};

export function ChatText({ heading, body, subheading, bullets, children }: ChatTextProps) {
  return (
    <div className="flex w-[680px] flex-col items-start gap-2">
      <div className="flex w-full flex-col items-start gap-3 text-text-primary">
        {heading && <p className="w-full text-2xl font-semibold leading-8">{heading}</p>}
        {body && <p className="w-full text-sm font-normal leading-6">{body}</p>}
      </div>
      {subheading && (
        <div className="flex w-full items-center justify-center pb-4 pt-6">
          <p className="min-w-0 flex-1 text-base font-semibold leading-6 text-text-primary">{subheading}</p>
        </div>
      )}
      {bullets && bullets.length > 0 && (
        <ul className="w-full list-disc pl-6 text-text-primary">
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
  onCopy?: () => void;
  onRegenerate?: () => void;
  onDownload?: () => void;
  onReadAloud?: () => void;
  onThumbUp?: () => void;
  onThumbDown?: () => void;
  className?: string;
};

export function ChatActions({
  onCopy,
  onRegenerate,
  onDownload,
  onReadAloud,
  onThumbUp,
  onThumbDown,
  className,
}: ChatActionsProps) {
  return (
    <div className={className || "flex h-6 w-[680px] items-center justify-between"}>
      <div className="flex items-center gap-2">
        <button type="button" aria-label="Copy" onClick={onCopy} className="flex size-6 shrink-0 items-center justify-center">
          <img src={copyIcon} alt="" className="h-[17px] w-3.5" />
        </button>
        <button type="button" aria-label="Regenerate" onClick={onRegenerate} className="flex size-6 shrink-0 items-center justify-center">
          <img src={autorenewIcon} alt="" className="h-3.5 w-3.5" />
        </button>
        <button type="button" aria-label="Download" onClick={onDownload} className="flex size-6 shrink-0 items-center justify-center">
          <img src={downloadIcon} alt="" className="h-3.5 w-3.5" />
        </button>
        <button type="button" aria-label="Read aloud" onClick={onReadAloud} className="flex size-6 shrink-0 items-center justify-center">
          <img src={volumeUpIcon} alt="" className="h-[15.0385px] w-[15.3845px]" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" aria-label="Good response" onClick={onThumbUp} className="flex size-6 shrink-0 items-center justify-center">
          <img src={thumbUpIcon} alt="" className="h-[17.1923px] w-[19px]" />
        </button>
        <button type="button" aria-label="Bad response" onClick={onThumbDown} className="flex size-6 shrink-0 items-center justify-center">
          <img src={thumbDownIcon} alt="" className="h-[17.1923px] w-[19px]" />
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

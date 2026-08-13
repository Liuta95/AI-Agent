import type { ReactNode } from "react";

type TagColor = "purple" | "lightBlue" | "mint" | "grey" | "pearl" | "orchid";

type TagProps = {
  color?: TagColor;
  children: ReactNode;
  className?: string;
};

const COLOR_CLASSES: Record<TagColor, string> = {
  purple: "bg-[#edecff] text-[#5e55d1]",
  lightBlue: "bg-[#eef4fe] text-[#006894]",
  mint: "bg-[#e0f7fa] text-[#0b7986]",
  grey: "bg-[#eceff3] text-[#61647a]",
  pearl: "bg-[#f6f8fa] text-[#61647a]",
  orchid: "bg-[#faecff] text-[#9b44c4]",
};

export function Tag({ color = "purple", children, className }: TagProps) {
  return (
    <span
      className={
        className ||
        `inline-flex h-6 shrink-0 items-center justify-center rounded-lg px-2 ${COLOR_CLASSES[color]}`
      }
    >
      <span className="whitespace-nowrap text-xs font-normal leading-4">{children}</span>
    </span>
  );
}

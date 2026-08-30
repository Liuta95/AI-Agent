const EXTENSION_COLORS: Record<string, string> = {
  pdf: "#DC3E15",
  doc: "#2B579A",
  docx: "#2B579A",
  rtf: "#2B579A",
  xls: "#217346",
  xlsx: "#217346",
  csv: "#217346",
  ppt: "#D24726",
  pptx: "#D24726",
  png: "#8D73B6",
  jpg: "#8D73B6",
  jpeg: "#8D73B6",
  gif: "#8D73B6",
  webp: "#8D73B6",
  svg: "#8D73B6",
  mp3: "#B080FF",
  wav: "#B080FF",
  mp4: "#6E598E",
  mov: "#6E598E",
};

const DISABLED_COLOR = "#B0B2BE";

export function fileTypeColor(fileName: string, disabled = false): string {
  if (disabled) return DISABLED_COLOR;
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  return EXTENSION_COLORS[ext] ?? "#61647A";
}

type FileTypeIconProps = {
  fileName: string;
  disabled?: boolean;
  className?: string;
};

export function FileTypeIcon({ fileName, disabled = false, className }: FileTypeIconProps) {
  const color = fileTypeColor(fileName, disabled);
  return (
    <svg
      viewBox="0 0 15 16"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8.586 0c.265 0 .519.105.707.293l3.414 3.414c.188.188.293.442.293.707V15.5c0 .276-.224.5-.5.5h-11c-.276 0-.5-.224-.5-.5V.5c0-.276.224-.5.5-.5h7.086Z"
        fill={color}
      />
      <path d="M8.586 0 12.707 4.121 12.707 4.414 9 4.414C8.448 4.414 8 3.966 8 3.414L8 0.293 8.586 0Z" fill="white" fillOpacity="0.3" />
    </svg>
  );
}

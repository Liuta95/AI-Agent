type FileTypeInfo = { label: string; color: string };

const FILE_TYPES: Record<string, FileTypeInfo> = {
  pdf: { label: "PDF", color: "#DC3E15" },
  doc: { label: "DOC", color: "#2B579A" },
  docx: { label: "DOC", color: "#2B579A" },
  rtf: { label: "RTF", color: "#2B579A" },
  xls: { label: "XLS", color: "#217346" },
  xlsx: { label: "XLS", color: "#217346" },
  csv: { label: "CSV", color: "#217346" },
  ppt: { label: "PPT", color: "#D24726" },
  pptx: { label: "PPT", color: "#D24726" },
  png: { label: "PNG", color: "#8D73B6" },
  jpg: { label: "JPG", color: "#8D73B6" },
  jpeg: { label: "JPG", color: "#8D73B6" },
  gif: { label: "GIF", color: "#8D73B6" },
  webp: { label: "IMG", color: "#8D73B6" },
  svg: { label: "SVG", color: "#8D73B6" },
  mp3: { label: "MP3", color: "#B080FF" },
  wav: { label: "WAV", color: "#B080FF" },
  mp4: { label: "MP4", color: "#6E598E" },
  mov: { label: "MOV", color: "#6E598E" },
  zip: { label: "ZIP", color: "#61647A" },
  txt: { label: "TXT", color: "#61647A" },
  json: { label: "JSN", color: "#61647A" },
};

const DISABLED_COLOR = "#B0B2BE";

function fileTypeInfo(fileName: string, disabled: boolean): FileTypeInfo {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  const known = FILE_TYPES[ext];
  const label = known?.label ?? (ext ? ext.slice(0, 3).toUpperCase() : "FILE");
  const color = disabled ? DISABLED_COLOR : (known?.color ?? "#61647A");
  return { label, color };
}

type FileTypeIconProps = {
  fileName: string;
  disabled?: boolean;
  className?: string;
};

export function FileTypeIcon({ fileName, disabled = false, className }: FileTypeIconProps) {
  const { label, color } = fileTypeInfo(fileName, disabled);
  return (
    <span className={className || "relative flex h-5 w-[19px] shrink-0 items-end justify-center"}>
      <svg viewBox="0 0 15 16" className="absolute inset-0 size-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M8.586 0c.265 0 .519.105.707.293l3.414 3.414c.188.188.293.442.293.707V15.5c0 .276-.224.5-.5.5h-11c-.276 0-.5-.224-.5-.5V.5c0-.276.224-.5.5-.5h7.086Z"
          fill={color}
        />
        <path
          d="M8.586 0 12.707 4.121 12.707 4.414 9 4.414C8.448 4.414 8 3.966 8 3.414L8 0.293 8.586 0Z"
          fill="white"
          fillOpacity="0.3"
        />
      </svg>
      <span
        className="relative z-10 mb-[2.5px] font-bold uppercase leading-none text-white"
        style={{ fontSize: "5px", letterSpacing: "0.2px" }}
      >
        {label}
      </span>
    </span>
  );
}

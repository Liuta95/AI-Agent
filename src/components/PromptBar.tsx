import { useRef, useState, type DragEvent, type KeyboardEvent } from "react";
import addIcon from "../assets/icons/add.svg";
import micIcon from "../assets/icons/mic.svg";
import sendIcon from "../assets/icons/send.svg";
import downloadIcon from "../assets/icons/download.svg";
import publishIcon from "../assets/icons/publish.svg";
import addPhotoIcon from "../assets/icons/add-photo-alternate.svg";
import dashboardAddIcon from "../assets/icons/dashboard-add.svg";
import workIcon from "../assets/icons/work.svg";
import linkIcon from "../assets/icons/link.svg";
import { FileChip } from "./ui/FileChip";
import { PopoverMenu, type PopoverMenuOption } from "./ui/PopoverMenu";
import { PortalPopover } from "./ui/PortalPopover";
import { VoiceInputModal } from "./ui/VoiceInputModal";
import { useSpeechRecognition, isSpeechRecognitionSupported } from "../hooks/useSpeechRecognition";

type Attachment = {
  id: string;
  file: File;
  uploading: boolean;
};

const UPLOAD_SIMULATION_MS = 1200;

type PromptBarProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSend?: (value: string, files: File[]) => void;
  placeholder?: string;
  dark?: boolean;
  className?: string;
};

export function PromptBar({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  onSend,
  placeholder = "Ask me anything...",
  dark = false,
  className,
}: PromptBarProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const dragCounter = useRef(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addMenuRef = useRef<HTMLDivElement>(null);

  const value = controlledValue ?? internalValue;
  const hasValue = value.trim().length > 0;
  const hasAttachments = attachments.length > 0;
  const isUploading = attachments.some((a) => a.uploading);
  const canSend = (hasValue || hasAttachments) && !isUploading;

  function setValue(next: string) {
    if (controlledValue === undefined) setInternalValue(next);
    onValueChange?.(next);
  }

  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const baseValueRef = useRef("");
  const { listening, start: startListening, stop: stopListening } = useSpeechRecognition({
    onTranscript: setLiveTranscript,
  });

  function handleMicClick() {
    baseValueRef.current = value;
    setLiveTranscript("");
    setVoiceModalOpen(true);
    startListening();
  }

  function handleVoiceCancel() {
    stopListening();
    setVoiceModalOpen(false);
    setLiveTranscript("");
  }

  function handleVoiceDone() {
    stopListening();
    const base = baseValueRef.current;
    const combined = liveTranscript.trim();
    if (combined) {
      setValue(base ? `${base} ${combined}` : combined);
      autoResize();
    }
    setVoiceModalOpen(false);
    setLiveTranscript("");
  }

  function addFiles(files: FileList | File[]) {
    const next = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
      file,
      uploading: true,
    }));
    setAttachments((prev) => [...prev, ...next]);
    for (const attachment of next) {
      setTimeout(() => {
        setAttachments((prev) =>
          prev.map((a) => (a.id === attachment.id ? { ...a, uploading: false } : a)),
        );
      }, UPLOAD_SIMULATION_MS);
    }
  }

  function removeAttachment(id: string) {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  }

  function handleSend() {
    if (!canSend) return;
    if (listening) stopListening();
    onSend?.(value, attachments.map((a) => a.file));
    if (controlledValue === undefined) setInternalValue("");
    setAttachments([]);
    requestAnimationFrame(autoResize);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleDragEnter(e: DragEvent<HTMLDivElement>) {
    if (!e.dataTransfer.types.includes("Files")) return;
    e.preventDefault();
    dragCounter.current += 1;
    setDragging(true);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    if (!e.dataTransfer.types.includes("Files")) return;
    e.preventDefault();
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    if (!e.dataTransfer.types.includes("Files")) return;
    e.preventDefault();
    dragCounter.current = Math.max(0, dragCounter.current - 1);
    if (dragCounter.current === 0) setDragging(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    dragCounter.current = 0;
    setDragging(false);
    if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
  }

  const borderClasses = dragging
    ? "border-dashed border-[#9747ff] bg-white"
    : focused
      ? dark
        ? "border-[#8d73b6] bg-[#2e2b33]"
        : "border-[#6e598e] bg-white"
      : hovered
        ? dark
          ? "border-[#c4a1ff] bg-[#2e2b33] shadow-[0px_2px_5px_rgba(85,69,110,0.09)]"
          : "border-[#9747ff] bg-white shadow-[0px_2px_5px_rgba(85,69,110,0.09)]"
        : dark
          ? "border-[#62606e] bg-[#2e2b33]"
          : "border-prompt-border bg-white";

  const textColor = hasValue ? (dark ? "text-white" : "text-[#1c1b1f]") : dark ? "text-[#b0b2be]" : "text-input-placeholder";

  const addMenuOptions: PopoverMenuOption[] = [
    {
      icon: publishIcon,
      label: "Upload file",
      description: "Great for most tasks",
      onClick: () => {
        setAddMenuOpen(false);
        fileInputRef.current?.click();
      },
    },
    {
      icon: addPhotoIcon,
      label: "Add image",
      description: "PNG, JPG, SVG",
      onClick: () => {
        setAddMenuOpen(false);
        fileInputRef.current?.click();
      },
    },
    {
      icon: dashboardAddIcon,
      label: "Create from template",
      description: "Start with a preset structure",
      onClick: () => setAddMenuOpen(false),
    },
    {
      icon: workIcon,
      label: "Start new project",
      description: "Organise into a project",
      onClick: () => setAddMenuOpen(false),
    },
    {
      icon: linkIcon,
      label: "Connect tool",
      description: "Browse integrations",
      onClick: () => setAddMenuOpen(false),
    },
  ];

  return (
    <div
      className={
        className ||
        `relative flex w-[728px] shrink-0 flex-col items-start justify-center rounded-field border p-0 ${borderClasses}`
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={`flex w-full flex-col ${dragging ? "opacity-20" : ""}`}>
        {hasAttachments && (
          <div className="flex w-full flex-wrap items-start gap-2 overflow-clip pl-6 pt-4">
            {attachments.map((a) => (
              <FileChip
                key={a.id}
                fileName={a.file.name}
                state={a.uploading ? "uploading" : "default"}
                dark={dark}
                onRemove={() => removeAttachment(a.id)}
              />
            ))}
          </div>
        )}
        <div className="flex w-full shrink-0 items-center gap-2.5 px-6 py-4">
          <textarea
            ref={textareaRef}
            value={value}
            placeholder={placeholder}
            rows={1}
            onChange={(e) => {
              setValue(e.target.value);
              autoResize();
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            className={`min-w-0 flex-1 resize-none overflow-hidden bg-transparent text-base font-normal leading-normal outline-none placeholder:text-current ${textColor}`}
          />
        </div>
        <div className="flex w-full shrink-0 items-center justify-between py-2 pl-5 pr-6">
          <div ref={addMenuRef} className="relative">
            <button
              type="button"
              aria-label="Add attachment"
              onClick={() => setAddMenuOpen((prev) => !prev)}
              className="flex size-6 shrink-0 items-center justify-center gap-1 overflow-clip rounded-3xl"
            >
              <img src={addIcon} alt="" className={`h-4 w-4 ${dark ? "brightness-0 invert" : ""}`} />
            </button>
            <PortalPopover
              anchorRef={addMenuRef}
              open={addMenuOpen}
              onClose={() => setAddMenuOpen(false)}
              placement="top-start"
            >
              <PopoverMenu options={addMenuOptions} dark={dark} />
            </PortalPopover>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              aria-label="Voice input"
              onClick={handleMicClick}
              disabled={!isSpeechRecognitionSupported}
              title={!isSpeechRecognitionSupported ? "Voice input isn't supported in this browser" : undefined}
              className="flex size-6 shrink-0 items-center justify-center gap-1 overflow-clip rounded-full transition-colors disabled:opacity-40"
            >
              <img src={micIcon} alt="" className={`h-[17.5px] w-3 ${dark ? "brightness-0 invert" : ""}`} />
            </button>
            <button
              type="button"
              aria-label="Send message"
              onClick={handleSend}
              disabled={!canSend}
              className={`flex size-6 shrink-0 items-center justify-center overflow-clip rounded-full p-1 disabled:opacity-50 ${
                canSend ? (dark ? "bg-[#1f1730]" : "bg-[#f5f2fa]") : ""
              }`}
            >
              <img src={sendIcon} alt="" className={`h-[13px] w-[15.423px] ${dark ? "brightness-0 invert" : ""}`} />
            </button>
          </div>
        </div>
      </div>
      {dragging && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2.5">
          <span className="flex size-6 shrink-0 items-center justify-center">
            <img src={downloadIcon} alt="" className="h-3.5 w-3.5" />
          </span>
          <p className="text-base font-normal leading-normal text-[#6e598e]">Drop your files here.</p>
        </div>
      )}
      <VoiceInputModal
        open={voiceModalOpen}
        transcript={liveTranscript}
        listening={listening}
        dark={dark}
        onCancel={handleVoiceCancel}
        onDone={handleVoiceDone}
      />
    </div>
  );
}

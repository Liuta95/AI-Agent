import { createPortal } from "react-dom";
import { useEffect } from "react";
import { LottieAnimation } from "./LottieAnimation";
import aiFlowAnimation from "../../assets/animations/ai-flow.json";

type VoiceInputModalProps = {
  open: boolean;
  transcript: string;
  listening: boolean;
  dark?: boolean;
  onCancel: () => void;
  onDone: () => void;
};

export function VoiceInputModal({ open, transcript, listening, dark = false, onCancel, onDone }: VoiceInputModalProps) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return createPortal(
    <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-10 ${dark ? "bg-[#1c1b1f]" : "bg-white"}`}>
      <button
        type="button"
        aria-label="Cancel"
        onClick={onCancel}
        className={`absolute right-6 top-6 flex size-10 items-center justify-center rounded-full text-2xl leading-none transition-colors ${
          dark ? "text-white hover:bg-white/10" : "text-text-primary hover:bg-black/5"
        }`}
      >
        ×
      </button>

      <div className="relative flex size-56 shrink-0 items-center justify-center">
        <LottieAnimation animationData={aiFlowAnimation} className="size-full" />
      </div>

      <div className="flex w-full max-w-[600px] flex-col items-center gap-2 px-6 text-center">
        <p className={`text-xl font-normal leading-8 ${dark ? "text-white" : "text-text-primary"}`}>
          {transcript || (listening ? "Listening..." : "Paused")}
        </p>
        {!listening && (
          <p className={`text-sm font-normal leading-6 ${dark ? "text-[#b0b2be]" : "text-text-secondary"}`}>
            Voice recognition stopped — press Done to use this text, or Cancel to discard it.
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className={`flex items-center gap-1 rounded-full border px-6 py-3 text-base font-semibold transition-colors ${
            dark ? "border-[#9747ff] text-[#c4a1ff] hover:bg-white/10" : "border-secondary-border text-secondary-text hover:bg-black/5"
          }`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onDone}
          className="flex items-center gap-1 rounded-full bg-[#55456e] px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
        >
          Done
        </button>
      </div>
    </div>,
    document.body,
  );
}

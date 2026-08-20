type ThemeToggleProps = {
  dark: boolean;
  onToggle: () => void;
  className?: string;
};

export function ThemeToggle({ dark, onToggle, className }: ThemeToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Toggle dark mode"
      onClick={onToggle}
      className={
        className ||
        `relative flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${
          dark ? "bg-[#9747ff]" : "bg-[#d9e3ed]"
        }`
      }
    >
      <span
        className={`block size-5 rounded-full bg-white shadow-sm transition-transform ${
          dark ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

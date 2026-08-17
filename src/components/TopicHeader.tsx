type TopicHeaderProps = {
  title: string;
  action?: { icon: string; label: string };
  dark?: boolean;
};

export function TopicHeader({ title, action, dark = false }: TopicHeaderProps) {
  return (
    <div className="flex h-6 w-full items-center justify-between rounded-xl py-1 pl-1 pr-2">
      <p className={`text-sm font-semibold leading-6 ${dark ? "text-white" : "text-text-primary"}`}>
        {title}
      </p>
      {action && (
        <button
          type="button"
          aria-label={action.label}
          className="flex size-6 shrink-0 items-center justify-center"
        >
          <img src={action.icon} alt="" className={`h-4 w-4 ${dark ? "brightness-0 invert" : ""}`} />
        </button>
      )}
    </div>
  );
}

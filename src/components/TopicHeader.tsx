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
        <button type="button" aria-label={action.label} className="size-6 shrink-0">
          <img src={action.icon} alt="" className={`size-6 ${dark ? "brightness-0 invert" : ""} object-contain`} />
        </button>
      )}
    </div>
  );
}

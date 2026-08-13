type TopicHeaderProps = {
  title: string;
  action?: { icon: string; label: string };
};

export function TopicHeader({ title, action }: TopicHeaderProps) {
  return (
    <div className="flex h-6 w-full items-center justify-between rounded-xl py-1 pl-1 pr-2">
      <p className="text-sm font-semibold leading-6 text-text-primary">{title}</p>
      {action && (
        <button type="button" aria-label={action.label} className="size-6 shrink-0">
          <img src={action.icon} alt="" className="size-6" />
        </button>
      )}
    </div>
  );
}

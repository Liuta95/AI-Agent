type SidebarMenuItemProps = {
  icon: string;
  label: string;
};

export function SidebarMenuItem({ icon, label }: SidebarMenuItemProps) {
  return (
    <div className="flex w-[206px] shrink-0 items-center gap-1 rounded-xl px-2 py-0.5 hover:bg-black/[0.03]">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <img src={icon} alt="" className="size-6 shrink-0" />
        <p className="min-w-0 flex-1 truncate text-sm font-normal leading-6 text-secondary-text">
          {label}
        </p>
      </div>
    </div>
  );
}

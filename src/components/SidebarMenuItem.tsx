type SidebarMenuItemState = "default" | "hover" | "selected";

type SidebarMenuItemProps = {
  icon: string;
  label: string;
  state?: SidebarMenuItemState;
  dark?: boolean;
};

function stateClasses(state: SidebarMenuItemState, dark: boolean) {
  if (state === "selected") {
    return dark ? "border border-white/20 bg-white/10" : "border border-[#d1c4e6] bg-[#edecff]";
  }
  if (state === "hover") {
    return dark ? "bg-white/10" : "bg-[#edecff]";
  }
  return "";
}

export function SidebarMenuItem({ icon, label, state = "default", dark = false }: SidebarMenuItemProps) {
  return (
    <div
      className={`flex w-[206px] shrink-0 items-center gap-1 rounded-xl px-2 py-0.5 ${stateClasses(state, dark)} ${
        state === "default" ? (dark ? "hover:bg-white/10" : "hover:bg-black/[0.03]") : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <img src={icon} alt="" className={`size-6 shrink-0 ${dark ? "brightness-0 invert" : ""}`} />
        <p
          className={`min-w-0 flex-1 truncate text-sm font-normal leading-6 ${
            dark ? "text-[#c4a1ff]" : "text-secondary-text"
          }`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

type SidebarMenuItemState = "default" | "hover" | "selected";

type SidebarMenuItemProps = {
  icon: string;
  label: string;
  state?: SidebarMenuItemState;
  dark?: boolean;
  onClick?: () => void;
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

export function SidebarMenuItem({ icon, label, state = "default", dark = false, onClick }: SidebarMenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-[206px] shrink-0 items-center gap-1 rounded-xl px-2 py-0.5 text-left ${stateClasses(state, dark)} ${
        state === "default" ? (dark ? "hover:bg-white/10" : "hover:bg-black/[0.03]") : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center">
          <img src={icon} alt="" className={`h-4 w-4 object-contain ${dark ? "brightness-0 invert" : ""}`} />
        </span>
        <p
          className={`min-w-0 flex-1 truncate text-sm font-normal leading-6 ${
            dark ? "text-[#c4a1ff]" : "text-secondary-text"
          }`}
        >
          {label}
        </p>
      </div>
    </button>
  );
}

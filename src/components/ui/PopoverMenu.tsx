import { MenuItem } from "./MenuItem";

export type PopoverMenuOption = {
  icon: string;
  label: string;
  description: string;
  onClick?: () => void;
};

type PopoverMenuProps = {
  options: PopoverMenuOption[];
  dark?: boolean;
  className?: string;
};

export function PopoverMenu({ options, dark = false, className }: PopoverMenuProps) {
  return (
    <div
      className={
        className ||
        `flex w-[280px] flex-col items-start overflow-clip rounded-xl border py-2 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)] ${
          dark ? "border-white/10 bg-[#2e2b33]" : "border-[#e3e4e5] bg-white"
        }`
      }
    >
      {options.map((option) => (
        <MenuItem
          key={option.label}
          icon={option.icon}
          label={option.label}
          description={option.description}
          onClick={option.onClick}
          dark={dark}
        />
      ))}
    </div>
  );
}

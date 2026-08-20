type DividerProps = {
  dark?: boolean;
};

export function Divider({ dark = false }: DividerProps) {
  return (
    <div className="flex w-full flex-col items-start py-1">
      <div className={`h-px w-full ${dark ? "bg-white/10" : "bg-white"}`} />
    </div>
  );
}

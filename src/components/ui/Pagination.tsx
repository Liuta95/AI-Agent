import firstPageIcon from "../../assets/icons/first-page.svg";
import chevronLeftIcon from "../../assets/icons/chevron-left.svg";
import chevronRightIcon from "../../assets/icons/chevron-right.svg";
import lastPageIcon from "../../assets/icons/last-page.svg";
import chevronDownSmallIcon from "../../assets/icons/chevron-down-small.svg";

type PageNumberProps = {
  page: number | string;
  active?: boolean;
  onClick?: () => void;
};

export function PageNumber({ page, active = false, onClick }: PageNumberProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex size-6 shrink-0 items-center justify-center rounded-[2px] text-[10px] font-bold uppercase tracking-[0.5px] outline-none transition-colors focus-visible:rounded-lg focus-visible:border-[3px] focus-visible:border-[#d1c4e6] ${
        active ? "rounded-lg bg-[#55456e] text-white" : "text-[#1c1b1f]"
      }`}
    >
      {page}
    </button>
  );
}

type IconButtonProps = {
  icon: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

function IconButton({ icon, label, onClick, disabled }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex shrink-0 items-center gap-1 overflow-clip rounded-3xl p-1 disabled:opacity-40"
    >
      <span className="flex size-6 shrink-0 items-center justify-center">
        <img src={icon} alt="" className="h-3 w-3 object-contain" />
      </span>
    </button>
  );
}

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  className?: string;
};

export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className={className || "flex items-center gap-3"}>
      <IconButton icon={firstPageIcon} label="First page" onClick={() => onPageChange?.(1)} disabled={page === 1} />
      <IconButton
        icon={chevronLeftIcon}
        label="Previous page"
        onClick={() => onPageChange?.(Math.max(1, page - 1))}
        disabled={page === 1}
      />
      {pages.map((p) => (
        <PageNumber key={p} page={p} active={p === page} onClick={() => onPageChange?.(p)} />
      ))}
      <IconButton
        icon={chevronRightIcon}
        label="Next page"
        onClick={() => onPageChange?.(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
      />
      <IconButton
        icon={lastPageIcon}
        label="Last page"
        onClick={() => onPageChange?.(pageCount)}
        disabled={page === pageCount}
      />
    </div>
  );
}

type PaginationBarProps = {
  page: number;
  pageCount: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
};

export function PaginationBar({
  page,
  pageCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  className,
}: PaginationBarProps) {
  return (
    <div className={className || "flex w-full flex-col items-start border-t border-[#e3e4e5] bg-white py-3"}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold leading-6 text-text-primary">Page</p>
            <input
              type="number"
              min={1}
              max={pageCount}
              value={page}
              onChange={(e) => onPageChange?.(Number(e.target.value))}
              className="w-9 rounded-3xl border border-input-border bg-white py-1.5 pl-3 pr-2 text-sm leading-6 text-text-primary"
            />
            <div className="flex h-6 items-center gap-1 text-right text-sm leading-6 text-text-primary">
              <p className="font-normal">of</p>
              <p className="font-semibold">{pageCount}</p>
            </div>
          </div>
          <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} />
        </div>
        <label className="flex items-center gap-1 rounded-3xl border border-input-border bg-white py-1.5 pl-3 pr-2 text-sm leading-6 text-input-placeholder">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            className="appearance-none bg-transparent outline-none"
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="flex size-6 shrink-0 items-center justify-center">
            <img src={chevronDownSmallIcon} alt="" className="h-[6.016px] w-[10.616px]" />
          </span>
        </label>
      </div>
    </div>
  );
}

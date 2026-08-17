import successIcon from "../../assets/icons/alert-success.svg";
import infoIcon from "../../assets/icons/alert-info.svg";
import warningIcon from "../../assets/icons/alert-warning.svg";
import errorIcon from "../../assets/icons/alert-error.svg";
import closeIcon from "../../assets/icons/close-small.svg";

type AlertType = "success" | "information" | "warning" | "error";

type AlertProps = {
  type?: AlertType;
  shadow?: boolean;
  message?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  onClose?: () => void;
  className?: string;
};

const TYPE_STYLES: Record<AlertType, { bg: string; border: string; icon: string }> = {
  success: { bg: "#f4faf2", border: "#cde7c7", icon: successIcon },
  information: { bg: "#eef4fe", border: "#bde4f3", icon: infoIcon },
  warning: { bg: "#fffcf0", border: "#faeebd", icon: warningIcon },
  error: { bg: "#fef5f4", border: "#fec4bf", icon: errorIcon },
};

export function Alert({
  type = "success",
  shadow = true,
  message = "Message for the banner goes here.",
  buttonLabel,
  onButtonClick,
  onClose,
  className,
}: AlertProps) {
  const styles = TYPE_STYLES[type];

  return (
    <div
      className={className || "flex w-full max-w-[600px] items-start gap-2 overflow-clip rounded-xl border px-4 py-2"}
      style={{
        backgroundColor: styles.bg,
        borderColor: styles.border,
        boxShadow: shadow ? "0px 6px 6px 0px rgba(150,176,202,0.44)" : undefined,
      }}
    >
      <span className="flex size-6 shrink-0 items-center justify-center">
        <img src={styles.icon} alt="" className="h-[18px] w-[18px] object-contain" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2">
        <p className="w-full text-sm font-normal leading-6 text-text-primary">{message}</p>
        {buttonLabel && (
          <button
            type="button"
            onClick={onButtonClick}
            className="flex shrink-0 items-center gap-1 overflow-clip rounded-xl px-2"
          >
            <span className="text-center text-xs font-semibold leading-6 text-[#006894]">{buttonLabel}</span>
          </button>
        )}
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={onClose}
        className="flex size-6 shrink-0 items-center justify-center"
      >
        <img src={closeIcon} alt="" className="h-2.5 w-2.5" />
      </button>
    </div>
  );
}

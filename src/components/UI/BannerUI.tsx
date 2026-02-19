import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import clsx from "clsx";

type BannerProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: "info" | "success" | "warning" | "danger";
};

const variantStyles = {
  info: {
    container: "border-indigo-200 bg-indigo-50",
    text: "text-indigo-900",
    icon: <Info className="h-5 w-5 text-indigo-600" />,
  },
  success: {
    container: "border-emerald-200 bg-emerald-50",
    text: "text-emerald-900",
    icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
  },
  warning: {
    container: "border-amber-200 bg-amber-50",
    text: "text-amber-900",
    icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
  },
  danger: {
    container: "border-red-200 bg-red-50",
    text: "text-red-900",
    icon: <XCircle className="h-5 w-5 text-red-600" />,
  },
};

export const Banner = ({
  title,
  description,
  icon,
  variant = "info",
}: BannerProps) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={clsx(
        "flex gap-4 rounded-xl border p-4 shadow-sm",
        styles.container
      )}
    >
      <div className="mt-0.5 shrink-0">{icon ?? styles.icon}</div>

      <div className="space-y-1">
        <h3 className={clsx("text-sm font-medium", styles.text)}>{title}</h3>

        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
    </div>
  );
};



import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description?: string;
  backTo?: string;
  backLabel?: string;
  action?: React.ReactNode;
};

export const PageHeader = ({
  title,
  description,
  backTo,
  backLabel = "Volver",
  action,
}: PageHeaderProps) => {
  return (
    <div className="space-y-4 mb-6 sm:mb-8">
      {/* Back button (si existe) */}
      {backTo && (
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
      )}

      {/* Header content */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-gray-600 max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Action button (si existe) */}
        {action && (
          <div className="shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};
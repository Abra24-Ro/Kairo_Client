import { AlertTriangle } from "lucide-react";

type ErrorUiProps = {
  message: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
};

export const ErrorUi = ({
  message,
  description,
  icon = <AlertTriangle className="h-12 w-12 text-red-500" />,
  action,
}: ErrorUiProps) => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm text-center">
          {/* Icon container */}
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              {icon}
            </div>
          </div>

          {/* Message */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {message}
          </h3>

          {/* Description (optional) */}
          {description && (
            <p className="text-sm text-gray-600 mb-6">
              {description}
            </p>
          )}

          {/* Action (optional) */}
          {action && (
            <div className="mt-6">
              {action}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  children: React.ReactNode;
}

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
      <span className="flex-1">{children}</span>
    </div>
  );
};
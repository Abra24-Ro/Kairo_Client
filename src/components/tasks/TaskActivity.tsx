import type { TaskStatus } from "@/types";
import { STATUS_META } from "@/utils/status_meta.task";

type TaskActivityProps = {
  completedBy: string;
  status: TaskStatus;
};

export const TaskActivity = ({ completedBy, status }: TaskActivityProps) => {
  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-400 mb-1">
        {STATUS_META[status].label}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">{completedBy}</span>{" "}
        {status === "completed"
          ? "completó la tarea"
          : `cambió el estado a ${STATUS_META[status].label}`}
      </p>
    </div>
  );
};
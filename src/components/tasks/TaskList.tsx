import type { TaskProject, TaskStatus, Project } from "@/types";
import { TaskCard } from "./TaskCard";
import { STATUS_META } from "@/utils/status_meta.task";
import { useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ListTodo, Inbox } from "lucide-react";
import { DropTask } from "./DropTask";
import { DragDropProvider } from "@dnd-kit/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateTaskStatus } from "@/api/TaskApi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

type TaskListProps = {
  tasks: TaskProject[];
  data: Project;
};

type HandleDragEnd = NonNullable<
  React.ComponentProps<typeof DragDropProvider>["onDragEnd"]
>;

type GroupedTasks = Record<TaskProject["status"], TaskProject[]>;

const initialStatusGroups: GroupedTasks = {
  pending: [],
  on_hold: [],
  in_progress: [],
  under_review: [],
  completed: [],
};

const statusOrder: TaskProject["status"][] = [
  "pending",
  "in_progress",
  "under_review",
  "on_hold",
  "completed",
];

export const TaskList = ({ tasks, data }: TaskListProps) => {
  const { data: user } = useAuth();
  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectEdit", projectId] });
      toast.success("Tarea actualizada");
    },
    onError: () => toast.error("Error al actualizar la tarea"),
  });

  const groupedTasks = tasks.reduce<GroupedTasks>((acc, task) => {
    acc[task.status].push(task);
    return acc;
  }, structuredClone(initialStatusGroups));

  const canEdit = useMemo(() => user?._id === data?.manager._id, [data, user]);

  const handleDragEnd: HandleDragEnd = (event) => {
    if (event.canceled) return;

    const taskId = String(event.operation.source?.id);
    const status = event.operation.target?.id as TaskStatus;

    if (!taskId || !status) return;

    mutate({ projectId, taskId, status });
    queryClient.setQueryData(["projectEdit", projectId], (oldData: Project) => {
      const updatedTasks = oldData.tasks.map((task: TaskProject) => {
        if (task._id === taskId) return { ...task, status };
        return task;
      });
      return { ...oldData, tasks: updatedTasks };
    });
  };

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListTodo className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Tablero de tareas
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100">
          <span className="text-sm font-medium text-gray-700">
            {tasks.length}
          </span>
          <span className="text-sm text-gray-500">
            {tasks.length === 1 ? "tarea" : "tareas"}
          </span>
        </div>
      </div>

      {/* Board */}
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-3">
          {statusOrder.map((status) => {
            const statusTasks = groupedTasks[status];
            const meta = STATUS_META[status];

            let badgeColor = "bg-gray-100 text-gray-600";
            if (meta.color.includes("blue"))
              badgeColor = "bg-blue-100 text-blue-700";
            if (meta.color.includes("yellow"))
              badgeColor = "bg-yellow-100 text-yellow-700";
            if (meta.color.includes("green"))
              badgeColor = "bg-green-100 text-green-700";
            if (meta.color.includes("red"))
              badgeColor = "bg-red-100 text-red-700";
            if (meta.color.includes("purple"))
              badgeColor = "bg-purple-100 text-purple-700";

            return (
              <div
                key={status}
                className="flex flex-col rounded-xl bg-gray-50 border border-gray-200"
              >
                {/* Column header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white rounded-t-xl">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {meta.label}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}
                  >
                    {statusTasks.length}
                  </span>
                </div>

                {/* Drop zone siempre visible arriba */}
                <div className="px-3 pt-3">
                  <DropTask status={status} />
                </div>

                {/* Tasks — sin altura fija, crece con el contenido */}
                <div className="flex flex-col p-3 pt-2 gap-2">
                  {statusTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="mb-2 p-2.5 rounded-full bg-gray-100">
                        <Inbox className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-xs font-medium text-gray-500">
                        Sin tareas
                      </p>
                    </div>
                  ) : (
                    statusTasks.map((task) => (
                      <TaskCard key={task._id} task={task} canEdit={canEdit} />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DragDropProvider>
    </section>
  );
};

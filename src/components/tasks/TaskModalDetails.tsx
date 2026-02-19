import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskById, updateTaskStatus } from "@/api/TaskApi";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { formatterDate } from "@/utils/formatterDate";
import {
  X,
  CalendarClock,
  ClipboardList,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { STATUS_META } from "@/utils/status_meta.task";
import type { TaskStatus } from "@/types";
import { ActivityTimeline } from "./ActivityTimeline";
import { NotesPanel } from "../notes/NotesPanel";

export const TaskModalDetails = () => {
  const [showActivity, setShowActivity] = useState(true);

  const { projectId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;
  const navigate = useNavigate();

  const showModal = Boolean(taskId);
  const closeModal = () => navigate(location.pathname, { replace: true });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId: projectId!, taskId }),
    enabled: !!taskId && !!projectId,
    retry: false,
    staleTime: 0,
    retryOnMount: false,
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectEdit", projectId] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      toast.success("Tarea actualizada");
      closeModal();
    },
    onError: () => toast.error("Error al actualizar la tarea"),
  });

  const handleUpdateTaskStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    mutate({
      projectId: projectId!,
      taskId: taskId!,
      status: e.target.value as TaskStatus,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!data || isError) return null;

  const statusMeta = STATUS_META[data.status];

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
            >
              <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-white shadow-xl flex flex-col max-h-[90vh]">
                {/* Header - Fijo */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <ClipboardList className="h-5 w-5 text-indigo-600 shrink-0" />
                    <Dialog.Title className="text-lg font-semibold text-gray-900 truncate">
                      {data.name}
                    </Dialog.Title>
                  </div>

                  <button
                    onClick={closeModal}
                    className="cursor-pointer p-2 rounded-md hover:bg-gray-100 transition shrink-0"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                {/* Body - Scrollable */}
                <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6">
                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <CalendarClock className="h-4 w-4" />
                      Creada {formatterDate(data.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarClock className="h-4 w-4" />
                      Actualizada {formatterDate(data.updatedAt)}
                    </span>
                  </div>

                  {/* Status */}
                  <section className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">
                      Estado
                    </p>
                    <div className="flex items-center gap-3">
                      <select
                        value={data.status}
                        disabled={isPending}
                        onChange={handleUpdateTaskStatus}
                        className="rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                      >
                        {Object.entries(STATUS_META).map(([key, value]) => (
                          <option key={key} value={key}>
                            {value.label}
                          </option>
                        ))}
                      </select>

                      <span
                        className={`text-xs font-medium ${statusMeta.color}`}
                      >
                        {statusMeta.label}
                      </span>
                    </div>
                  </section>

                  {/* Description */}
                  {data.description && (
                    <section className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700">
                        Descripción
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {data.description}
                      </p>
                    </section>
                  )}

                  {/* Activity */}
                  <section className="space-y-3">
                    <button
                      onClick={() => setShowActivity(!showActivity)}
                      className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-indigo-600 transition"
                    >
                      Historial de actividad
                      {showActivity ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>

                    {showActivity && (
                      <ActivityTimeline activities={data.completedBy} />
                    )}
                  </section>

                  {/* Notes */}
                  <NotesPanel notes={data.notes} />
                </div>

                {/* Footer - Fijo */}
                <div className="flex justify-end px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0">
                  <button
                    onClick={closeModal}
                    className="cursor-pointer rounded-lg bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
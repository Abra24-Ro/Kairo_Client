import { deleteTask } from "@/api/TaskApi";
import type { TaskProject } from "@/types";
import { Menu, Transition } from "@headlessui/react";
import {
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  Loader2,
  AlertTriangle,
  GripVertical,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useState, Fragment } from "react";
import { toast } from "sonner";
import { useDraggable } from "@dnd-kit/react";

type TaskCardProps = {
  task: TaskProject;
  canEdit: boolean;
};

export const TaskCard = ({ task, canEdit }: TaskCardProps) => {
  
  const { ref, handleRef, isDragging } = useDraggable({
    id: task._id,
  });

  const navigate = useNavigate();
  const { projectId } = useParams();
  const [openConfirm, setOpenConfirm] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectEdit", projectId] });
      toast.success("Tarea eliminada correctamente");
      setOpenConfirm(false);
    },
    onError: (error) => {
      toast.error(error.message || "Error al eliminar la tarea");
    },
  });

  const handleDelete = () => {
    mutate({ projectId: projectId!, taskId: task._id });
  };

  return (
    <>
      {/* Card */}
      <li
        ref={ref}
        className={`
          group relative bg-white border rounded-xl p-4 transition-all duration-200
          cursor-grab active:cursor-grabbing
          ${isDragging ? "opacity-80 scale-[0.98] shadow-lg border-indigo-300" : "border-gray-200 hover:shadow-md hover:border-gray-300"}
        `}
      >
        <div className="flex gap-3">
          {/* Drag handle */}
          <div ref={handleRef} className="pt-1 text-gray-400 group-hover:text-gray-600 cursor-grab active:cursor-grabbing">
            <GripVertical className="h-4 w-4" />
          </div>

          {/* Content */}
          <div className="flex-1 pr-6">
            <h3
              onClick={() => navigate(`?viewTask=${task._id}`)}
              className="cursor-pointer text-sm font-semibold text-gray-900 hover:text-indigo-600 transition line-clamp-2 mb-1"
            >
              {task.name}
            </h3>

            {task.description && (
              <p className="text-xs text-gray-500 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Menu */}
        <Menu as="div" className="absolute top-3 right-3">
          <Menu.Button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
            <MoreVertical className="h-4 w-4" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black/5 overflow-hidden z-50 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate(`?viewTask=${task._id}`)}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition ${
                        active ? "bg-gray-50 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      <Eye className="h-4 w-4" />
                      Ver detalles
                    </button>
                  )}
                </Menu.Item>

                {canEdit && (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => navigate(`?editTask=${task._id}`)}
                          className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition ${
                            active ? "bg-gray-50 text-gray-900" : "text-gray-700"
                          }`}
                        >
                          <Edit3 className="h-4 w-4" />
                          Editar tarea
                        </button>
                      )}
                    </Menu.Item>

                    <div className="border-t border-gray-100" />

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setOpenConfirm(true)}
                          className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition ${
                            active ? "bg-red-50 text-red-700" : "text-red-600"
                          }`}
                        >
                          <Trash2 className="h-4 w-4" />
                          Eliminar tarea
                        </button>
                      )}
                    </Menu.Item>
                  </>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </li>

      {/* Confirm Modal */}
      <Transition appear show={openConfirm} as={Fragment}>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

          <div className="relative bg-white rounded-xl w-full max-w-md shadow-xl">
            <div className="flex items-center gap-3 px-6 py-4 border-b">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold">Eliminar tarea</h2>
            </div>

            <div className="px-6 py-5">
              <p className="text-sm text-gray-600 mb-3">
                ¿Seguro que deseas eliminar esta tarea?
              </p>
              <p className="text-sm font-medium bg-gray-50 border rounded-lg px-3 py-2">
                {task.name}
              </p>
              <p className="text-xs text-gray-500 mt-3">
                Esta acción no se puede deshacer.
              </p>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t">
              <button
                onClick={() => setOpenConfirm(false)}
                disabled={isPending}
                className="cursor-pointer flex-1 px-4 py-2.5 text-sm border rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="cursor-pointer flex-1 px-4 py-2.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Eliminando...
                  </>
                ) : (
                  "Eliminar"
                )}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TaskForm } from "./TaskForm";
import { useForm } from "react-hook-form";
import type { TaskFormData } from "@/types";
import { X, Loader2, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/api/TaskApi";
import { toast } from "sonner";

export const AddTaskModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const show = queryParams.get("newTask") === "true";

  const params = useParams();
  const projectId = params.projectId!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleClose = () => {
    if (!isPending) {
      navigate(location.pathname, { replace: true });
      reset();
    }
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onError: (error) => {
      toast.error(error.message || "Error al crear la tarea");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectEdit", projectId] });
      toast.success("Tarea creada correctamente");
      reset();
      navigate(location.pathname, { replace: true });
    },
  });

  const handleCreateTask = (formData: TaskFormData) => {
    mutate({ formData, projectId });
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={isPending ? () => {} : handleClose}
      >
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
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
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                      <Plus className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <Dialog.Title className="text-lg font-semibold text-gray-900">
                        Nueva tarea
                      </Dialog.Title>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Agrega una tarea al proyecto
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={handleClose}
                    className="cursor-pointer p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Body */}
                <form
                  onSubmit={handleSubmit(handleCreateTask)}
                  noValidate
                  className="space-y-6"
                >
                  <div className="px-6 py-6">
                    <TaskForm register={register} errors={errors} />
                  </div>

                  {/* Footer */}
                  <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={handleClose}
                      className="cursor-pointer px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="cursor-pointer min-w-[140px] flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Creando...
                        </>
                      ) : (
                        "Crear tarea"
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
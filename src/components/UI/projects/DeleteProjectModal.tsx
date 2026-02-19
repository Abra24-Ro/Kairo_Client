import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import type { CheckPassword } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkPassword } from "@/api/AuthApi";
import { toast } from "sonner";
import { deleteProject } from "@/api/ProjectApi";
import { AlertTriangle, Lock, Loader2, X } from "lucide-react";

export const DeleteProjectModal = () => {
  const initialValues: CheckPassword = {
    password: "",
  };

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const deleteProjectId = queryParams.get("deleteProject")!;
  const show = Boolean(deleteProjectId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();

  const checkUserPasswordMutation = useMutation({
    mutationFn: checkPassword,
    onError: (error) => toast.error(error.message),
  });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success("Proyecto eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      reset();
    },
  });

  const isPending =
    checkUserPasswordMutation.isPending || deleteProjectMutation.isPending;

  const handleForm = async (formData: CheckPassword) => {
    await checkUserPasswordMutation.mutateAsync(formData);
    await deleteProjectMutation.mutateAsync(deleteProjectId);
    navigate(location.pathname, { replace: true });
  };

  const handleClose = () => {
    if (!isPending) {
      navigate(location.pathname, { replace: true });
      reset();
    }
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
              <Dialog.Panel className="w-full max-w-md rounded-xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <Dialog.Title className="text-lg font-semibold text-gray-900">
                      Eliminar Proyecto
                    </Dialog.Title>
                  </div>

                  <button
                    onClick={handleClose}
                    disabled={isPending}
                    className="cursor-pointer p-2 rounded-md hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                  <p className="text-sm text-gray-600 mb-6">
                    Esta acción es permanente y no se puede deshacer. Por favor,{" "}
                    <span className="font-semibold text-gray-900">
                      confirma tu contraseña
                    </span>{" "}
                    para continuar.
                  </p>

                  <form
                    onSubmit={handleSubmit(handleForm)}
                    className="space-y-5"
                    noValidate
                  >
                    {/* Password Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        <input
                          id="password"
                          type="password"
                          placeholder="Tu contraseña"
                          disabled={isPending}
                          className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                          {...register("password", {
                            required: "La contraseña es obligatoria",
                          })}
                        />
                      </div>
                      {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        disabled={isPending}
                        className="cursor-pointer flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isPending}
                        className="cursor-pointer flex-1 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300 flex items-center justify-center gap-2"
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
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

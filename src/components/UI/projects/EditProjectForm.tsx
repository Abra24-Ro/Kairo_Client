import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import type { Project, ProjectFormData } from "@/types";
import { PageHeader } from "./PageHeader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

type EditProjectFormProps = {
  data: ProjectFormData ;
  projectId: Project["_id"];

};

export const EditProjectForm = ({ data, projectId }: EditProjectFormProps) => {
  const navigate = useNavigate();
  const initialValues = {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: initialValues, // Esta es la clave - se actualiza cuando data cambia
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message || "Error al actualizar el proyecto");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });

      toast.success("Proyecto actualizado exitosamente");
      navigate("/");
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId,
    };
    mutate(data);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Editar proyecto"
        description="Actualiza la información básica del proyecto."
        backTo="/"
        backLabel="← Volver a proyectos"
      />

      <form
        onSubmit={handleSubmit(handleForm)}
        noValidate
        className="bg-white border border-gray-200 rounded-xl shadow-sm"
      >
        {/* Form body */}
        <div className="p-6 space-y-8">
          {/* Nombre del proyecto */}
          <div className="space-y-2">
            <label
              htmlFor="projectName"
              className="text-sm font-medium text-gray-700"
            >
              Nombre del proyecto
            </label>

            <input
              id="projectName"
              type="text"
              placeholder="Ej. Plataforma de gestión interna"
              className="
                w-full rounded-md border border-gray-300 px-3 py-2
                text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                transition
              "
              {...register("projectName", {
                required: "El nombre del proyecto es obligatorio",
              })}
            />

            {errors.projectName && (
              <ErrorMessage>{errors.projectName.message}</ErrorMessage>
            )}
          </div>

          {/* Nombre del cliente */}
          <div className="space-y-2">
            <label
              htmlFor="clientName"
              className="text-sm font-medium text-gray-700"
            >
              Nombre del cliente
            </label>

            <input
              id="clientName"
              type="text"
              placeholder="Ej. Empresa ABC"
              className="
                w-full rounded-md border border-gray-300 px-3 py-2
                text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                transition
              "
              {...register("clientName", {
                required: "El nombre del cliente es obligatorio",
              })}
            />

            {errors.clientName && (
              <ErrorMessage>{errors.clientName.message}</ErrorMessage>
            )}
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Descripción del proyecto
            </label>

            <textarea
              id="description"
              rows={4}
              placeholder="Describe brevemente el objetivo y alcance del proyecto"
              className="
                w-full rounded-md border border-gray-300 px-3 py-2
                text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                resize-none transition
              "
              {...register("description", {
                required: "Una descripción del proyecto es obligatoria",
              })}
            />

            {errors.description && (
              <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 rounded-b-xl">
          <button
            type="submit"
            disabled={isPending}
            className="
              cursor-pointer
              inline-flex items-center justify-center
              px-5 py-2.5 rounded-md text-sm font-medium
              bg-indigo-600 text-white
              hover:bg-indigo-500
              disabled:bg-indigo-400 disabled:cursor-not-allowed
              transition
            "
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
            {isPending ? "Actualizando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
};

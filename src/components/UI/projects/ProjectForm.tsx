import { ErrorMessage } from "@/components/UI/ErrorMessage";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ProjectFormData } from "@/types";

type ProjectFormProps = {
  register: UseFormRegister<ProjectFormData>;
  errors: FieldErrors<ProjectFormData>;
};

export const ProjectForm = ({ register, errors }: ProjectFormProps) => {
  return (
    <div className="space-y-6">
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
          {...register("description", {
            required: "Una descripción del proyecto es obligatoria",
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </div>
  );
};

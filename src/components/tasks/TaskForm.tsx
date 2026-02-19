import type { TaskFormData } from "@/types";
import { ErrorMessage } from "../UI/ErrorMessage";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type TaskFormProps = {
  errors: FieldErrors<TaskFormData>;
  register: UseFormRegister<TaskFormData>;
};

export const TaskForm = ({ errors, register }: TaskFormProps) => {
  return (
    <div className="space-y-6">
      {/* Nombre de la tarea */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-gray-700"
        >
          Nombre de la tarea
        </label>

        <input
          id="name"
          type="text"
          placeholder="Ej. Diseñar pantalla de login"
          className={`
            w-full rounded-md border px-3 py-2
            text-gray-900 placeholder-gray-400
            transition
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            ${
              errors.name
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300"
            }
          `}
          {...register("name", {
            required: "El nombre de la tarea es obligatorio",
          })}
        />

        {errors.name && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-700"
        >
          Descripción de la tarea
        </label>

        <textarea
          id="description"
          rows={4}
          placeholder="Describe brevemente qué se debe hacer en esta tarea"
          className={`
            w-full rounded-md border px-3 py-2
            text-gray-900 placeholder-gray-400
            resize-none transition
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            ${
              errors.description
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300"
            }
          `}
          {...register("description", {
            required: "La descripción de la tarea es obligatoria",
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </div>
  );
};

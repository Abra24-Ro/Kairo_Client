import type { NoteFormData } from "@/types";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../UI/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/NoteApi";
import { toast } from "sonner";
import { useLocation, useParams } from "react-router-dom";

export const AddNoteForm = () => {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTask")!;

  const initialValues: NoteFormData = {
    content: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success("Nota agregada exitosamente");

      queryClient.invalidateQueries({
        queryKey: ["task", taskId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddNote = (data: NoteFormData) => {
    
    mutate({
      formData: data,
      projectId,
      taskId,
    });
    reset();
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleAddNote)}
      className="w-full space-y-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      {/* Header */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Agregar nota
        </label>
        <p className="text-xs text-gray-500">
          Escribe un comentario o recordatorio sobre esta tarea
        </p>
      </div>

      {/* Input */}
      <textarea
        id="content"
        placeholder="Escribe tu nota aquí..."
        rows={3}
        className="
          w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        "
        {...register("content", {
          required: "Este campo es obligatorio",
        })}
      />

      {/* Error */}
      {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}

      {/* Footer */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="
            cursor-pointer
            inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2
            text-sm font-medium text-white transition
            hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isPending ? "Guardando..." : "Agregar nota"}
        </button>
      </div>
    </form>
  );
};

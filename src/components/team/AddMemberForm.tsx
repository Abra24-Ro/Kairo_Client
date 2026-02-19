import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage } from "../UI/ErrorMessage";
import type { TeamMemberForm } from "@/types";
import { Mail, Loader2, Search } from "lucide-react";
import { findUserByEmail } from "@/api/TeamApi";
import { SearchResult } from "./SearchResult";

export const AddMemberForm = () => {
  const initialValues: TeamMemberForm = {
    email: "",
  };

  const params = useParams();
  const projectId = params.projectId!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: findUserByEmail,
  });

  const handleSearchUser = async (formData: TeamMemberForm) => {
    const data = { projectId, formData };
    mutation.mutate(data);
  };

  const handleAddUser = () => {
    reset();
    mutation.reset();
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <form
        className="space-y-5"
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        {/* Input */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo electrónico
          </label>

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />

            <input
              id="email"
              type="email"
              placeholder="usuario@correo.com"
              disabled={mutation.isPending}
              className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
              {...register("email", {
                required: "El correo electrónico es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Correo electrónico no válido",
                },
              })}
            />
          </div>

          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Buscando...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Buscar usuario
            </>
          )}
        </button>
      </form>

      {/* Result */}
      {mutation.data && (
        <div className="pt-6 border-t border-gray-200">
          <SearchResult user={mutation.data} handleAddUser={handleAddUser} />
        </div>
      )}

      {/* Error */}
      {mutation.error && (
        <ErrorMessage>Usuario no encontrado</ErrorMessage>
      )}
    </div>
  );
};
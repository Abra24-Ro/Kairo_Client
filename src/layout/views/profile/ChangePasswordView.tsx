import { changePassword } from "@/api/ProfileApi";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import type { UpdateUserCurrentPassword } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { KeyRound, Lock, ShieldCheck, Loader2 } from "lucide-react";

export const ChangePasswordView = () => {
  const initialValues: UpdateUserCurrentPassword = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({ defaultValues: initialValues });

  const password = watch("password");

  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Contraseña actualizada correctamente");
      reset();
    },
    onError: (error) => {
      toast.error(error.message || "Error al actualizar la contraseña");
    },
  });

  const handleChangePassword = (formData: UpdateUserCurrentPassword) => {
    mutate(formData);
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cambiar Contraseña</h1>
        <p className="text-sm text-gray-600 mt-1">
          Utiliza este formulario para actualizar tu contraseña
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="space-y-6"
          noValidate
        >
          {/* Current Password */}
          <div className="space-y-2">
            <label
              htmlFor="current_password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña actual
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                id="current_password"
                type="password"
                placeholder="Tu contraseña actual"
                disabled={isPending}
                className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                {...register("current_password", {
                  required: "La contraseña actual es obligatoria",
                })}
              />
            </div>
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Nueva contraseña
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                disabled={isPending}
                className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                {...register("password", {
                  required: "La nueva contraseña es obligatoria",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener mínimo 8 caracteres",
                  },
                })}
              />
            </div>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmar contraseña
            </label>
            <div className="relative">
              <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                id="password_confirmation"
                type="password"
                placeholder="Repite tu nueva contraseña"
                disabled={isPending}
                className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                {...register("password_confirmation", {
                  required: "Debes confirmar la contraseña",
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                })}
              />
            </div>
            {errors.password_confirmation && (
              <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending || !isDirty}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Actualizando...
                </>
              ) : (
                "Cambiar contraseña"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
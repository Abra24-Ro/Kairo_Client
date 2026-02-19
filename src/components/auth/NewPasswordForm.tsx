import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../UI/ErrorMessage";
import type { ConfirmToken, NewPasswordFormAuth } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "@/api/AuthApi";
import { toast } from "sonner";
import { Lock, Loader2 } from "lucide-react";

interface NewPasswordFormProps {
  token: ConfirmToken["token"];
}

export const NewPasswordForm = ({ token }: NewPasswordFormProps) => {
  const navigate = useNavigate();

  const initialValues: NewPasswordFormAuth = {
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate, isPending } = useMutation({
    mutationFn: updatePasswordWithToken,
    onSuccess: () => {
      toast.success("Contraseña actualizada correctamente");
      reset();
      navigate("/auth");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleNewPassword = (formData: NewPasswordFormAuth) => {
    mutate({
      form: formData,
      token,
    });
  };

  const password = watch("password");

  return (
    <>
      {/* Header */}
      <div className="text-center space-y-1 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Establecer nueva contraseña
        </h1>
        <p className="text-sm text-gray-500">
          Crea una contraseña segura para tu cuenta
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleNewPassword)}
        noValidate
        className="space-y-6"
      >
        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Nueva contraseña
          </label>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />

            <input
              type="password"
              placeholder="********"
              className="
                w-full rounded-md border border-gray-300
                pl-10 pr-3 py-2.5 text-sm
                placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                transition
              "
              {...register("password", {
                required: "El Password es obligatorio",
                minLength: {
                  value: 8,
                  message: "Debe tener mínimo 8 caracteres",
                },
              })}
            />
          </div>

          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Confirmar contraseña
          </label>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />

            <input
              type="password"
              placeholder="********"
              className="
                w-full rounded-md border border-gray-300
                pl-10 pr-3 py-2.5 text-sm
                placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                transition
              "
              {...register("password_confirmation", {
                required: "Repetir Password es obligatorio",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />
          </div>

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isPending}
          className="
            w-full rounded-lg
            bg-indigo-600 py-2.5
            text-sm font-semibold text-white
            hover:bg-indigo-500
            active:bg-indigo-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
            transition
            shadow-sm hover:shadow-md
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2
          "
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "Establecer contraseña"
          )}
        </button>
      </form>
    </>
  );
};

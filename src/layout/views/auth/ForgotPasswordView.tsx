import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { useForm } from "react-hook-form";
import type { ForgotPasswordForm } from "@/types";
import { AuthFooterLink } from "@/components/UI/auth/AuthFooterLink";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/AuthApi";
import { toast } from "sonner";
import { Mail, Loader2 } from "lucide-react";

export const ForgotPasswordView = () => {
  const initialValues: ForgotPasswordForm = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Instrucciones enviadas correctamente");
      reset();
    },
  });

  const handleForgotPassword = (formData: ForgotPasswordForm) => {
    mutate(formData);
  };

  return (
    <>
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          ¿Olvidaste tu contraseña?
        </h1>
        <p className="text-sm text-gray-600">
          Ingresa tu correo y te enviaremos instrucciones para recuperarla
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        noValidate
        className="space-y-5"
      >
        {/* Email */}
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
              placeholder="tu@email.com"
              className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar instrucciones"
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8">
        <AuthFooterLink
          primary={{
            text: "¿Ya tienes una cuenta?",
            to: "/auth",
            toLabel: "Iniciar sesión",
          }}
        />
      </div>
    </>
  );
};
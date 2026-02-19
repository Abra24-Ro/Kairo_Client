import { AuthFooterLink } from "@/components/UI/auth/AuthFooterLink";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import type { UserLoginForm } from "@/types";
import { useForm } from "react-hook-form";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@/api/AuthApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const LoginView = () => {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate, isPending } = useMutation({
    mutationFn: authenticateUser,
    onSuccess: () => {
      toast.success("Inicio de sesión exitoso");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 100);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData);
  };

  return (
    <>
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido de nuevo
        </h1>
        <p className="text-sm text-gray-600">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
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
              disabled={isPending}
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

        {/* Password */}
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
              placeholder="••••••••"
              disabled={isPending}
              className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
            />
          </div>

          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Iniciando sesión...
            </>
          ) : (
            "Iniciar sesión"
          )}
        </button>
      </form>

      {/* Footer link */}
      <div className="mt-8">
        <AuthFooterLink
          primary={{
            text: "¿No tienes una cuenta?",
            to: "/auth/register",
            toLabel: "Registrarme",
          }}
          secondary={{
            text: "¿Olvidaste tu contraseña?",
            to: "/auth/forgot-password",
            toLabel: "Recuperar contraseña",
          }}
        />
      </div>
    </>
  );
};

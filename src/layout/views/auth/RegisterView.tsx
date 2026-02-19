import { AuthFooterLink } from "@/components/UI/auth/AuthFooterLink";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import type { UserRegisterForm } from "@/types";
import { useForm } from "react-hook-form";
import { Mail, User, Lock, ShieldCheck, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function RegisterView() {
  const initialValues: UserRegisterForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<UserRegisterForm>({ defaultValues: initialValues });

  const { mutate, isPending } = useMutation({
    mutationFn: createAccount,
    onError: () => {
      toast.error("Error al crear la cuenta");
    },
    onSuccess: () => {
      toast.success(
        "Cuenta creada exitosamente, revisa tu correo para confirmarla"
      );
      reset();
      navigate("/auth/confirm-account");
    },
  });

  const password = watch("password");

  const handleRegister = (formData: UserRegisterForm) => {
    mutate(formData);
  };

  return (
    <>
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Crear cuenta</h1>
        <p className="text-sm text-gray-600">
          Completa el formulario para comenzar
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
        noValidate
        className="space-y-5"
      >
        {/* Name */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre completo
          </label>

          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />

            <input
              id="name"
              type="text"
              placeholder="Tu nombre completo"
              className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              {...register("name", {
                required: "El nombre es obligatorio",
              })}
            />
          </div>

          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

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
              placeholder="Mínimo 8 caracteres"
              className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              {...register("password", {
                required: "La contraseña es obligatoria",
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
              placeholder="Repite tu contraseña"
              className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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

        {/* Button */}
        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creando cuenta...
            </>
          ) : (
            "Crear cuenta"
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
          secondary={{
            text: "¿Olvidaste tu contraseña?",
            to: "/auth/forgot-password",
            toLabel: "Recuperar contraseña",
          }}
        />
      </div>
    </>
  );
}
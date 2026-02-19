import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { RequestConfirmationCodeForm } from "@/types";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { requestNewCode } from "@/api/AuthApi";
import { toast } from "sonner";
import { Mail, Loader2, ArrowLeft } from "lucide-react";

export const RequestNewCodeView = () => {
  const initialValues: RequestConfirmationCodeForm = {
    email: "",
  };

  const navigate = useNavigate();
  
  const { mutate, isPending } = useMutation({
    mutationFn: requestNewCode,
    onSuccess: () => {
      toast.success("Código enviado correctamente");
      navigate("/auth/confirm-account");
    },
    onError: (error) => {
      toast.error(error.message || "Error al enviar el código");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestConfirmationCodeForm>({ defaultValues: initialValues });

  const handleRequestCode = (formData: RequestConfirmationCodeForm) =>
    mutate(formData);

  return (
    <>
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Solicitar código nuevo
        </h1>
        <p className="text-sm text-gray-600">
          Ingresa tu correo y te enviaremos un nuevo código de verificación
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleRequestCode)}
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
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando código...
            </>
          ) : (
            "Enviar código"
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500">
              ¿Ya tienes el código?
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Link
            to="/auth/confirm-account"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Confirmar cuenta
          </Link>

          <Link
            to="/auth"
            className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a iniciar sesión
          </Link>
        </div>
      </div>
    </>
  );
};
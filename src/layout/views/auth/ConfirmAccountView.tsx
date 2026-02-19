import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import type { ConfirmToken } from "@/types";
import { confirmAccount } from "@/api/AuthApi";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Loader2, ShieldCheck } from "lucide-react";

export const ConfirmAccountView = () => {
  const [token, setToken] = useState<ConfirmToken["token"]>("");

  const navigate = useNavigate();
  
  const { mutate, isPending } = useMutation({
    mutationFn: confirmAccount,
    onSuccess: () => {
      toast.success("Cuenta confirmada correctamente");
      navigate("/auth");
    },
    onError: (error) => {
      toast.error(error.message || "Código inválido o expirado");
    },
  });

  const handleChange = (value: ConfirmToken["token"]) => {
    setToken(value);
  };

  const handleComplete = (value: ConfirmToken["token"]) => {
    mutate({ token: value });
  };

  return (
    <>
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
            <ShieldCheck className="h-6 w-6 text-indigo-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Confirma tu cuenta
          </h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Ingresa el código de 6 dígitos que enviamos a tu correo electrónico
          </p>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 text-center">
            Código de verificación
          </label>

          {/* Pin Input */}
          <div className="flex justify-center gap-2">
            <PinInput
              otp
              value={token}
              onChange={handleChange}
              onComplete={handleComplete}
              isDisabled={isPending}
            >
              {[...Array(6)].map((_, i) => (
                <PinInputField
                  key={i}
                  className="w-12 h-14 rounded-lg border border-gray-300 text-center text-lg font-semibold text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              ))}
            </PinInput>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Revisa tu bandeja de entrada o la carpeta de spam
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          disabled={token.length < 6 || isPending}
          onClick={() => mutate({ token })}
          className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Confirmando...
            </>
          ) : (
            "Confirmar cuenta"
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
              ¿No recibiste el código?
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Link
            to="/auth/request-code"
            className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Solicitar código nuevo
          </Link>
        </div>
      </div>
    </>
  );
};
import { validateToken } from "@/api/AuthApi";
import type { ConfirmToken } from "@/types";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";

type NewPasswordTokenProps = {
  token: ConfirmToken["token"];
  setToken: React.Dispatch<React.SetStateAction<ConfirmToken["token"]>>;
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NewPasswordToken = ({
  token,
  setToken,
  setIsValidToken,
}: NewPasswordTokenProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: validateToken,
    onSuccess: () => {
      toast.success("Código validado correctamente");
      setIsValidToken(true);
    },
    onError: () => {
      toast.error("El código no es válido");
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
      <div className="text-center space-y-1 mb-6">
        <ShieldCheck className="mx-auto h-8 w-8 text-indigo-600" />
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Verifica tu código
        </h1>
        <p className="text-sm text-gray-500">
          Ingresa el código de 6 dígitos enviado a tu correo
        </p>
      </div>

      <form className="space-y-6 bg-white p-8 rounded-xl shadow-sm">
        <div className="flex justify-center gap-3">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
            otp
            isDisabled={isPending}
          >
            {[...Array(6)].map((_, i) => (
              <PinInputField
                key={i}
                className="
                  h-12 w-12
                  text-center text-lg font-semibold
                  rounded-lg border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                  transition
                "
              />
            ))}
          </PinInput>
        </div>

        {isPending && (
          <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Validando código...
          </div>
        )}
      </form>

      {/* Footer */}
      <nav className="mt-8 flex flex-col space-y-3 text-center">
        <Link
          to="/auth/forgot-password"
          className="
            text-sm text-indigo-600
            hover:text-indigo-500
            transition
            font-medium
          "
        >
          ¿No recibiste el código? Solicitar uno nuevo
        </Link>
      </nav>
    </>
  );
};

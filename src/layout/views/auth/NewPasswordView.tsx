import { NewPasswordForm } from "@/components/auth/NewPasswordForm";
import { NewPasswordToken } from "@/components/auth/NewPasswordToken";
import type { ConfirmToken } from "@/types";
import { useState } from "react";

export const NewPasswordView = () => {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Restablecer contraseña
        </h1>
        <p className="text-sm text-gray-600">
          {isValidToken 
            ? "Ingresa tu nueva contraseña" 
            : "Ingresa el código que recibiste por correo"
          }
        </p>
      </div>

      {/* Content */}
      {!isValidToken ? (
        <NewPasswordToken
          setIsValidToken={setIsValidToken}
          token={token}
          setToken={setToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
};
import api from "@/libs/axios";
import { isAxiosError } from "axios";
import {
  userSchema,
  type CheckPassword,
  type ConfirmToken,
  type ForgotPasswordForm,
  type NewPasswordFormAuth,
  type RequestConfirmationCodeForm,
  type UserLoginForm,
  type UserRegisterForm,
} from "@/types";

export const createAccount = async (form: UserRegisterForm) => {
  try {
    const { data } = await api.post<string>("/auth/create-account", form);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Error al crear la cuenta"
      );
    }
  }
};

export const confirmAccount = async (form: ConfirmToken) => {
  try {
    const { data } = await api.post<string>("/auth/confirm-account", form);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Error al confirmar la cuenta"
      );
    }
  }
};

export const requestNewCode = async (form: RequestConfirmationCodeForm) => {
  try {
    const { data } = await api.post<string>("/auth/request-code", form);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Error al confirmar la cuenta"
      );
    }
  }
};

export const authenticateUser = async (form: UserLoginForm) => {
  try {
    const { data } = await api.post<{ token: string }>("/auth/login", form);
    localStorage.setItem("AUTH_TOKEN_kairo", data.token);
    return data.token;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al iniciar sesión");
    }
  }
};

export const forgotPassword = async (form: ForgotPasswordForm) => {
  try {
    const { data } = await api.post<string>("/auth/forgot-password", form);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al iniciar sesión");
    }
  }
};

export const validateToken = async (form: ConfirmToken) => {
  try {
    const { data } = await api.post<string>("/auth/validate-token", form);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al iniciar sesión");
    }
  }
};

export const updatePasswordWithToken = async ({
  form,
  token,
}: {
  form: NewPasswordFormAuth;
  token: ConfirmToken["token"];
}) => {
  try {
    const { data } = await api.post<string>(
      `/auth/update-password/${token}`,
      form
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al iniciar sesión");
    }
  }
};

export const getUser = async () => {
  try {
    const { data } = await api("/auth/user");
    const response = userSchema.safeParse(data);
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al iniciar sesión");
    }
  }
};

export const checkPassword = async (formData: CheckPassword) => {
  try {
    const url = `/auth/check-password`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al iniciar sesión");
    }
  }
};

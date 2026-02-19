import api from "@/libs/axios";
import type { UpdateUserCurrentPassword, UserProfileForm } from "@/types";
import { isAxiosError } from "axios";

export const updateProfile = async (formData: UserProfileForm) => {
  try {
    const { data } = await api.put("/auth/profile", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
  }
};

export const changePassword = async (formData: UpdateUserCurrentPassword) => {
  try {
    const { data } = await api.post("/auth/update-password", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
  }
};

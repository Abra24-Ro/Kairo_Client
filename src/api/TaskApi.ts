import api from "@/libs/axios";
import {
  taskSchema,
  type Project,
  type Task,
  type TaskFormData,
} from "@/types";
import { isAxiosError } from "axios";

type TaskApi = {
  formData: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  status: Task["status"];
};

type CreateTaskResponse = {
  message: string;
  task: Task;
};

export const createTask = async ({
  formData,
  projectId,
}: Pick<TaskApi, "formData" | "projectId">) => {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post<CreateTaskResponse>(url, formData);

    return data.task;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error("Error inesperado al crear la tarea");
  }
};

export const getTaskById = async ({
  projectId,
  taskId,
}: Pick<TaskApi, "projectId" | "taskId">) => {
  if (!taskId || !projectId) {
    throw new Error("projectId y taskId son requeridos");
  }

  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api(url);
    const response = taskSchema.safeParse(data.task);

    if (!response.success) {
      throw new Error(response.error.message);
    }
    
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error("Error inesperado al obtener la tarea");
  }
};

export const updateTask = async ({
  projectId,
  taskId,
  formData,
}: Pick<TaskApi, "formData" | "projectId" | "taskId">) => {
  if (!taskId || !projectId) {
    throw new Error("projectId y taskId son requeridos");
  }

  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.put<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error("Error inesperado al editar la tarea");
  }
};

export const deleteTask = async ({
  projectId,
  taskId,
}: Pick<TaskApi, "projectId" | "taskId">) => {
  if (!taskId || !projectId) {
    throw new Error("projectId y taskId son requeridos");
  }

  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error("Error inesperado al eliminar la tarea");
  }
};

export const updateTaskStatus = async ({
  projectId,
  taskId,
  status,
}: Pick<TaskApi, "projectId" | "taskId" | "status">) => {
  if (!taskId || !projectId) {
    throw new Error("projectId y taskId son requeridos");
  }

  try {
    const url = `/projects/${projectId}/tasks/${taskId}/status`;
    const { data } = await api.post<string>(url, { status });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error("Error inesperado al actualizar el estado de la tarea");
  }
};

import {
  type ProjectFormData,
  type Project,
  dashboardProyectSchema,
  editProjectSchema,
  projectSchema,
} from "@/types";
import api from "@/libs/axios";
import { isAxiosError } from "axios";
import { z } from "zod";

type DashboardProject = z.infer<typeof dashboardProyectSchema>[number];

export const createProject = async (
  formData: ProjectFormData
): Promise<Project> => {
  try {
    const { data } = await api.post<Project>("/projects", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error inesperado al crear el proyecto");
  }
};

export const getProjects = async (): Promise<DashboardProject[]> => {
  try {
    const { data } = await api("/projects");

    const response = dashboardProyectSchema.safeParse(data.projects);

    if (!response.success) {
      throw new Error("Error de validación de datos");
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error inesperado al obtener los proyectos");
  }
};

export const getProjectById = async (id: Project["_id"]) => {
  try {
    const { data } = await api(`/projects/${id}`);

    const response = editProjectSchema.safeParse(data.project);

    if (!response.success) {
      throw new Error("Error de validación de datos");
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error inesperado al obtener el proyecto");
  }
};

export const getFullProyect = async (id: Project["_id"]) => {
  try {
    const { data } = await api(`/projects/${id}`);

    const response = projectSchema.safeParse(data.project);

    if (!response.success) {
      throw new Error("Error de validación de datos");
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error inesperado al obtener el proyecto");
  }
};

type ProjectApiType = {
  formData: ProjectFormData;
  projectId: Project["_id"];
};

export const updateProject = async ({
  formData,
  projectId,
}: ProjectApiType) => {
  try {
    const { data } = await api.put<string>(`/projects/${projectId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error inesperado al actualizar el proyecto");
  }
};

export const deleteProject = async (id: Project["_id"]) => {
  try {
    const { data } = await api.delete<string>(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error inesperado al eliminar el proyecto");
  }
};

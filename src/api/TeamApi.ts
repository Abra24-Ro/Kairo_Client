import api from "@/libs/axios";
import {
  type TeamMemberForm,
  type Project,
  type TeamMember,
  TeamMembersSchema,
} from "@/types";
import { isAxiosError } from "axios";

export const findUserByEmail = async ({
  projectId,
  formData,
}: {
  projectId: Project["_id"];
  formData: TeamMemberForm;
}) => {
  try {
    const { data } = await api.post(
      `/projects/${projectId}/team/find`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
  }
};

export const addUserToProject = async ({
  projectId,
  id,
}: {
  projectId: Project["_id"];
  id: TeamMember["_id"];
}) => {
  try {
    const { data } = await api.post(`/projects/${projectId}/team`, { id });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
  }
};

export const getProjectTeam = async ({
  projectId,
}: {
  projectId: Project["_id"];
}) => {
  try {
    const { data } = await api(`/projects/${projectId}/team`);
    const response = TeamMembersSchema.safeParse(data);
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
  }
};

export const removeUserFromProject = async ({
  projectId,
  id,
}: {
  projectId: Project["_id"];
  id: TeamMember["_id"];
}) => {
  try {
    const { data } = await api.delete(`/projects/${projectId}/team/${id}`);
    const response = TeamMembersSchema.safeParse(data);
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
  }
};

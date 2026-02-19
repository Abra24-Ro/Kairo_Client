import api from "@/libs/axios";
import type { Note, NoteFormData, Project, Task } from "@/types";
import { isAxiosError } from "axios";

type NoteApiType = {
  formData: NoteFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  noteId: Note["_id"];
};

export const createNote = async ({
  formData,
  projectId,
  taskId,
}: Pick<NoteApiType, "formData" | "projectId" | "taskId">) => {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/notes`;
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
  }
};

export const deleteNote = async ({
  projectId,
  taskId,
  noteId,
}: Pick<NoteApiType, "projectId" | "taskId" | "noteId">) => {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
    const { data } = await api.delete(url);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
  }
};

import type { TaskStatus } from "@/types";
import { STATUS_META } from "@/utils/status_meta.task";

/**
 * Mapea el color de un status a una clase de Tailwind para el dot del timeline
 * @param status - Estado de la tarea
 * @returns Clase de Tailwind para el color del dot
 */
export const getStatusDotColor = (status: TaskStatus): string => {
  const statusColor = STATUS_META[status].color;

  const colorMap: Record<string, string> = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    indigo: "bg-indigo-500",
  };

  for (const [key, className] of Object.entries(colorMap)) {
    if (statusColor.includes(key)) {
      return className;
    }
  }

  return "bg-gray-400";
};
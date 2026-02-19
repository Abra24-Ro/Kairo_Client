export const STATUS_META: Record<string, { label: string; color: string }> = {
    pending: {
      label: "Pendientes",
      color: "bg-gray-100 text-gray-700",
    },
    on_hold: {
      label: "En pausa",
      color: "bg-yellow-100 text-yellow-700",
    },
    in_progress: {
      label: "En progreso",
      color: "bg-blue-100 text-blue-700",
    },
    under_review: {
      label: "En revisión",
      color: "bg-purple-100 text-purple-700",
    },
    completed: {
      label: "Completadas",
      color: "bg-green-100 text-green-700",
    },
  };
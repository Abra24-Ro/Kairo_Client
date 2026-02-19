import { getFullProyect } from "@/api/ProjectApi";
import { AddTaskModal } from "@/components/tasks/AddTaskModal";
import { EditTaskData } from "@/components/tasks/EditTaskData";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskModalDetails } from "@/components/tasks/TaskModalDetails";
import { ErrorUi } from "@/components/UI/ErrorUi";
import { Loader } from "@/components/UI/Loader";
import { PageHeader } from "@/components/UI/projects/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { Plus, ClipboardList, Users, ShieldCheck, User } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { isManager } from "@/utils/policies";
import { useAuth } from "@/hooks/useAuth";

export const ProjectDetailsView = () => {
  const { data: user, isLoading: isLoadingAuth } = useAuth();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["projectEdit", projectId],
    queryFn: () => getFullProyect(projectId!),
    retry: false,
  });

  if (isLoading || isLoadingAuth) return <Loader />;
  if (error) return <ErrorUi message="No se pudo cargar el proyecto" />;
  if (!data || !user) return null;

  const hasTasks = data.tasks.length > 0;
  const isOwner = isManager(data.manager, user._id);

  
 
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <PageHeader
            title={data.projectName}
            description={data.description}
            backTo="/"
            backLabel="Volver a proyectos"
          />

          {/* Role Badge */}
          <div className="flex items-center gap-2 user-select-none">
            {isOwner ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                <ShieldCheck className="h-4 w-4" />
                Administrador
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                <User className="h-4 w-4" />
                Colaborador
              </span>
            )}
          </div>
        </div>

        {/* Tasks Section */}
        <section className="space-y-6">
          {/* Section Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm sm:text-base font-semibold text-gray-500 uppercase tracking-wider">
              Tareas del proyecto
            </h2>

            {/* Actions only for Owner */}
            {isOwner && hasTasks && (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("?newTask=true")}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition"
                >
                  <Plus className="h-4 w-4" />
                  Nueva tarea
                </button>

                <Link
                  to="team"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                >
                  <Users className="h-4 w-4" />
                  Equipo
                </Link>
              </div>
            )}
          </div>

          {/* Empty State */}
          {!hasTasks ? (
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex flex-col items-center text-center px-6 py-14">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
                  <ClipboardList className="h-8 w-8 text-indigo-400" />
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  No hay tareas todavía
                </h3>

                <p className="mt-2 max-w-md text-sm text-gray-500">
                  {isOwner
                    ? "Crea la primera tarea para comenzar a organizar el proyecto."
                    : "El administrador aún no ha creado tareas para este proyecto."}
                </p>

                {isOwner && (
                  <button
                    onClick={() => navigate("?newTask=true")}
                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-500 transition"
                  >
                    <Plus className="h-4 w-4" />
                    Crear primera tarea
                  </button>
                )}
              </div>
            </div>
          ) : (
            <TaskList data={data} tasks={data.tasks} />
          )}
        </section>
      </div>

      {/* Modals (solo lógica, no UI visible si no se usan) */}
      {isOwner && <AddTaskModal />}
      {isOwner && <EditTaskData />}
      <TaskModalDetails />
    </div>
  );
};
